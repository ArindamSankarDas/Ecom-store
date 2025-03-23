import { prisma } from '../config/prismaConfig.js';

// retrieve current user cart data
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

		if (!foundUser) {
			return res.status(404).json({
				message: "Couldn't find the user to fetch the cart details from",
			});
		}

		res.status(200).json(foundUser);
	} catch (error) {
		next(error);
	}
}

// updating current user cart data
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
			return res.status(400).json({
				message:
					'Maybe one of the current details is missing like name,id, category, etc.',
			});

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

		if (!foundUser) {
			return res
				.status(404)
				.json({ message: "Couldn't find user to set the cart data to" });
		}

		// to check if the cart item does not exist and create it in the user's list
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

		// fetch the product item to check with cartItem
		const foundProductItem = await prisma.products.findFirst({
			where: { title: productName },
			select: { stock: true },
		});

		// if the passed quantity are in accordance to the total product stock
		if (
			foundUser.cart[0].productQty + productQty > foundProductItem.stock ||
			foundUser.cart[0].productQty + productQty < 1
		) {
			return res.status(409).json({
				message: 'Quantity greater than available stock or less than 1',
			});
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

// deleting cart item from the user's list
export async function deleteUserCartItem(req, res, next) {
	try {
		const { cartItemId } = req.body;

		if (!cartItemId)
			return res.status(400).json({ message: 'The cart item id is missing' });

		await prisma.cartItems.delete({
			where: { id: cartItemId },
		});

		res.status(200).json({ message: 'Cart Item deleted' });
	} catch (error) {
		next(error);
	}
}
