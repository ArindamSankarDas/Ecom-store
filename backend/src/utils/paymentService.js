import { createMollieClient } from '@mollie/api-client';

export const mollieClient = createMollieClient({
	apiKey: process.env.MOLLIE_API_KEY,
});

// creates a new test payment using mollie
export async function molliePaymentService(
	amount,
	description,
	redirectUrl,
	items
) {
	try {
		// Use your own ngrok site in the .env file
		const payment = await mollieClient.payments.create({
			amount: {
				currency: 'EUR',
				value: `${parseFloat(amount).toFixed(2)}`,
			},
			description: `Order: ${description}`,
			redirectUrl,
			webhookUrl: `${process.env.NGROK_FORWARDING}/payments/webhook`,
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

// to check payment status with paymentId
export async function molliePaymentStatus(paymentId) {
	try {
		const paymentStatus = await mollieClient.payments.get(paymentId);

		return paymentStatus;
	} catch (error) {
		throw error;
	}
}
