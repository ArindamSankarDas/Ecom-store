import {
	molliePaymentService,
	molliePaymentStatus,
} from '../utils/paymentService.js';

import { prisma } from '../config/prismaConfig.js';

// new payment creation
export async function createNewPayment(req, res, next) {
	try {
		const { amount, items } = req.body;

		if (!amount && items.length !== 0) {
			return res
				.status(400)
				.json({ error: "Amount and Order items can't be empty" });
		}

		const orderId = Math.round(Math.random() * 100000);

		const payment = await molliePaymentService(
			amount,
			orderId,
			`${process.env.CLIENT_BASE_URL}/payment-status/${orderId}`,
			items
		);

		res.status(201).json(payment);
	} catch (error) {
		next(error);
	}
}

//payment webhook to process the mollie redirect
export async function paymentWebhook(req, res, next) {
	try {
		const { id } = req.body;

		if (!id) {
			return res.status(400).json({ message: 'Payment ID is required' });
		}

		const payment = await molliePaymentStatus(id);

		if (payment.status !== 'paid') {
			return res.status(500).json({ message: "Payment couldn't be processed" });
		}

		await prisma.payments.create({
			data: {
				id: payment.id,
				amount: parseFloat(payment.amount.value),
				currency: payment.amount.currency,
				profileId: payment.profileId,
				paymentStatus: payment.status,
			},
		});

		const updatedItems = payment.metadata.order_items.map(function (orderItem) {
			return {
				orderId: payment.metadata.order_id.toString(),
				paymentsId: payment.id,
				productName: orderItem.productName,
				productQuantity: orderItem.productQty,
				productPrice: orderItem.productPrice,
			};
		});

		await prisma.orders.createManyAndReturn({
			data: updatedItems,
		});

		await prisma.cartItems.deleteMany({});

		res.sendStatus(200);
	} catch (error) {
		next(error);
	}
}
