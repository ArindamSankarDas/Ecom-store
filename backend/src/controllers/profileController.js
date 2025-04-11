import { prisma } from '../config/prismaConfig.js';
import { compareHashedPWD } from '../utils/passwordHash.js';

// retrieve current user details
export async function getCurrentUserDetails(req, res, next) {
	try {
		const email = req.email;

		const foundUser = await prisma.users.findFirst({
			where: { email },
			select: {
				name: true,
				email: true,
			},
		});

		if (!foundUser) {
			return res
				.status(404)
				.json({ message: 'Current not found in the database' });
		}

		res.status(200).json(foundUser);
	} catch (error) {
		next(error);
	}
}

// update current user
export async function updateCurrentUserDetails(req, res, next) {
	try {
		const { name } = req.body;

		if (!name) {
			return res.status(400).json({ message: 'Details not given' });
		}

		const email = req.email;

		const foundUser = await prisma.users.findFirst({
			where: { email },
			select: { name: true },
		});

		if (!foundUser) {
			return res
				.status(404)
				.json({ message: "Couldn't find the user to update the details of" });
		}

		if (foundUser.name === name) {
			return res.status(400).json({ message: 'Details are still the same' });
		}

		await prisma.users.update({
			where: { email },
			data: {
				name,
			},
		});

		res.status(200).json({ message: 'Username has been updated' });
	} catch (error) {
		next(error);
	}
}

// update current user password
export async function updateCurrentPasswordDetails(req, res, next) {
	try {
		const { password, currentPassword } = req.body;

		if (!(password && currentPassword)) {
			return res
				.status(400)
				.json({ message: 'New password or Current Password may be missing' });
		}

		const email = req.email;

		const foundUser = await prisma.users.findFirst({
			where: { email },
			select: { password: true },
		});

		if (!foundUser) {
			return res
				.status(404)
				.json({ message: "Couldn't find the user to update the password of" });
		}

		if (!compareHashedPWD(foundUser.password, currentPassword)) {
			return res
				.status(400)
				.json({ message: 'Current password did not match' });
		}

		const hashedPassword = await createHashPWD(password);

		await prisma.users.update({
			where: { email },
			data: {
				password: hashedPassword,
			},
		});

		res.status(200).json({ message: 'Password updated' });
	} catch (error) {
		next(error);
	}
}

// delete current user
export async function deleteCurrentUser(req, res, next) {
	try {
		const { password } = req.body;

		if (!password) {
			return res.status(400).json({ message: 'Password is required' });
		}

		const email = req.email;

		const foundUser = await prisma.users.findFirst({
			where: { email },
			select: { password: true, id: true },
		});

		if (!foundUser) {
			return res
				.status(404)
				.json({ message: "Couldn't find the user to delete" });
		}

		if (!compareHashedPWD(foundUser.password, password)) {
			return res
				.status(400)
				.json({ message: 'Current password did not match' });
		}

		await prisma.users.delete({
			where: { id: foundUser.id },
		});

		return res.status(200).json({ message: 'User deleted successfully' });
	} catch (error) {
		next(error);
	}
}
