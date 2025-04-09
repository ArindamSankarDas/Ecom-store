import {
	molliePaymentService,
	molliePaymentStatus,
} from '../utils/paymentService.js';

import { prisma } from '../config/prismaConfig.js';

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

export async function paymentStatus(req, res, next) {
	try {
		const { orderId } = req.params;

		if (!orderId) {
			return res.sendStatus(400);
		}

		const paymentStatus = await prisma.orders.findFirst({
			where: { id: parseInt(orderId) },
		});

		console.log(paymentStatus);

		res.status(200).json({ status: paymentStatus });
	} catch (error) {
		next(error);
	}
}

export async function paymentWebhook(req, res, next) {
	try {
		const { id } = req.body;

		if (!id) {
			return res.status(400).json({ message: 'Payment ID is required' });
		}

		const molliePaymentInfo = await molliePaymentStatus(id);

		if (molliePaymentInfo.status !== 'paid')
			res.status(500).json({ message: "Payment couldn't be processed" });

		const payment = await prisma.payments.create({
			data: {
				id: molliePaymentInfo.id,
				amount: parseFloat(molliePaymentInfo.amount.value),
				currency: molliePaymentInfo.amount.currency,
				profileId: molliePaymentInfo.profileId,
				paymentStatus: molliePaymentInfo.status,
			},
		});

		const updatedItems = molliePaymentInfo.metadata.order_items.map(function (
			orderItem
		) {
			return {
				id: molliePaymentInfo.metadata.order_id,
				paymentsId: molliePaymentInfo.id,
				productName: orderItem.productName,
				productQuantity: orderItem.productQty,
				productPrice: orderItem.productPrice,
			};
		});

		await prisma.orders.createMany({
			data: [...updatedItems],
		});

		res.status(200).json({ message: 'Order Placed', paymentId: payment.id });
	} catch (error) {
		next(error);
	}
}
