import { prisma } from '../config/prismaConfig.js';

export async function getUserCart(req, res, next) {
	try {
		const email = req.email;

		const foundUser = await prisma.users.findFirst({
			where: { email },
			select: {
				cart: {
					omit: { usersId: true },
				},
			},
		});

		res.status(200).json(foundUser);
	} catch (error) {
		next(error);
	}
}

export async function setUserCart(req, res, next) {
	try {
		const {
			productId,
			productName,
			productPrice,
			productQty,
			productCategory,
			productThumbnail,
		} = req.body;

		if (
			!(
				productId &&
				productName &&
				productQty &&
				productPrice &&
				productCategory &&
				productThumbnail
			)
		)
			return res.status(400).json({ msg: 'Details not given' });

		const email = req.email;

		const foundUser = await prisma.users.findFirst({
			where: { email },
			include: {
				cart: {
					select: { productQty: true, id: true },
					where: { productName },
				},
			},
		});

		if (!foundUser) return res.sendStatus(404);

		if (!foundUser.cart[0]) {
			const cartItem = await prisma.cartItems.create({
				data: {
					usersId: foundUser.id,
					productId,
					productName,
					productPrice,
					productQty,
					productCategory,
					productThumbnail,
				},
			});

			return res.status(201).json(cartItem);
		}

		const foundProductItem = await prisma.products.findFirst({
			where: { title: productName },
			select: { stock: true },
		});

		if (
			foundUser.cart[0].productQty + productQty > foundProductItem.stock ||
			foundUser.cart[0].productQty + productQty < 1
		) {
			return res.status(409).json({ msg: 'Invalid Input' });
		}

		const updateCartItem = await prisma.cartItems.update({
			where: { id: foundUser.cart[0].id },
			data: {
				productQty: foundUser.cart[0].productQty + productQty,
			},
			omit: { usersId: true },
		});

		return res.status(200).json(updateCartItem);
	} catch (error) {
		next(error);
	}
}

export async function deleteUserCart(req, res, next) {
	try {
		const { cartItemId } = req.body;

		if (!cartItemId) return res.status(400).json({ msg: 'Details not given' });

		await prisma.cartItems.delete({
			where: { id: cartItemId },
		});

		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
}
