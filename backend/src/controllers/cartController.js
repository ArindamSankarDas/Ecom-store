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
			productName,
			productPrice,
			productQty,
			productCategory,
			productThumbnail,
		} = req.body;

		if (
			!(
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
		});

		if (!foundUser) return res.sendStatus(404);

		const cartItem = await prisma.cartItems.create({
			data: {
				usersId: foundUser.id,
				productName,
				productPrice,
				productQty,
				productCategory,
				productThumbnail,
			},
		});

		res.status(201).json(cartItem);
	} catch (error) {
		next(error);
	}
}
