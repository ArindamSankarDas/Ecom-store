import jwt from 'jsonwebtoken';
import { prisma } from '../config/prismaConfig.js';

export async function registerUser(req, res, next) {
	try {
		const { name, email, password } = req.body;

		if (!name || !email || !password) {
			return res.status(400).json({ msg: 'Details not given' });
		}

		const foundUser = await prisma.users.findFirst({
			where: { OR: [{ name }, { email }] },
		});

		if (foundUser) {
			return res.status(409).json({ msg: 'Email or User already Taken' });
		}

		await prisma.users.create({
			data: {
				name,
				email,
				password,
			},
		});

		req.body = { email, password };

		next();
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ msg: 'Internal Server Error', error: error.message });
	}
}

export async function loginUser(req, res) {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({ msg: 'Details not filled up' });
		}

		const foundUser = await prisma.users.findUnique({
			where: { email },
		});

		if (!foundUser) {
			return res.status(404).json({ msg: 'User not found' });
		}

		if (foundUser.password !== password) {
			return res.status(401).json({ msg: 'Invalid Password' });
		}

		const accessToken = jwt.sign(
			{
				email: foundUser.email,
				name: foundUser.name,
			},
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: '15m' }
		);

		const refreshToken = jwt.sign(
			{
				email: foundUser.email,
				name: foundUser.name,
			},
			process.env.REFRESH_TOKEN_SECRET,
			{ expiresIn: '30d' }
		);

		await prisma.users.update({
			where: { email: foundUser.email },
			data: { refreshToken },
		});

		res.cookie('jwt', refreshToken, {
			httpOnly: true,
			sameSite: 'None',
			secure: true,
			maxAge: 30 * 24 * 60 * 60 * 1000,
		});

		res.status(200).json({ accessToken });
	} catch (error) {
		console.log(error);
	}
}

export function refreshTokenUser(req, res) {
	const cookies = req.cookies;

	if (!cookies?.jwt) return res.sendStatus(406);

	const refreshToken = req.cookies.jwt;

	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET,
		function (err, decoded) {
			if (err) return res.sendStatus(406);

			const accessToken = jwt.sign(
				{ name: decoded.name },
				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: '15m' }
			);

			res.status(200).json({ accessToken });
		}
	);
}

export async function logoutUser(req, res) {
	try {
		const cookies = req.cookies;

		if (!cookies?.jwt) {
			return res.status(204).json({ msg: 'No Content' });
		}

		const refreshToken = cookies.jwt;

		const foundUser = await prisma.users.findFirst({
			where: { refreshToken },
		});

		if (!foundUser) {
			res.clearCookie('jwt', {
				httpOnly: true,
				sameSite: 'None',
				secure: true,
			});

			return res.sendStatus(204);
		}

		await prisma.users.update({
			where: { email: foundUser.email },
			data: { refreshToken: '' },
		});

		res.clearCookie('jwt', {
			httpOnly: true,
			sameSite: 'None',
			secure: true,
		});

		res.sendStatus(204);
	} catch (error) {
		console.error('Logout Error:', error);
		res.status(500).json({ msg: 'Internal Server Error' });
	}
}
