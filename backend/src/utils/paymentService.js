import { createMollieClient } from '@mollie/api-client';

export const mollieClient = createMollieClient({
	apiKey: process.env.MOLLIE_API_KEY,
});

export async function molliePaymentService(
	amount,
	description,
	redirectUrl,
	items
) {
	try {
		const payment = await mollieClient.payments.create({
			amount: {
				currency: 'EUR',
				value: `${parseFloat(amount).toFixed(2)}`,
			},
			description: `Order: ${description}`,
			redirectUrl,
			webhookUrl:
				'https://f4cb-2405-201-a805-c1ad-58d6-15da-9fc2-3027.ngrok-free.app/payments/webhook',
			metadata: {
				order_id: description,
				order_items: items,
			},
		});

		return payment;
	} catch (error) {
		throw error;
	}
}

export async function molliePaymentStatus(paymentId) {
	try {
		const paymentStatus = await mollieClient.payments.get(paymentId);

		return paymentStatus;
	} catch (error) {
		throw error;
	}
}
