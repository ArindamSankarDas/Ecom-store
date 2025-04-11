import { prisma } from '../config/prismaConfig.js';

// create new message for the specified User
export async function createNewMessageFromUser(req, res, next) {
	try {
		console.log('hello');

		const { message } = req.body;
		if (!message) {
			return res
				.status(400)
				.json({ message: "Contact message can't be empty" });
		}

		const email = req.email;

		const foundUser = await prisma.users.findFirst({
			where: {
				email: email,
			},
		});

		if (!foundUser) {
			return res
				.status(404)
				.json({ message: 'User not found in the database' });
		}

		await prisma.messages.create({
			data: {
				usersId: foundUser.id,
				contactMessage: message,
			},
		});

		res.sendStatus(201);
	} catch (error) {
		next(error);
	}
}
