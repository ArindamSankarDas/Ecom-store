import jwt from 'jsonwebtoken';
import { prisma } from '../config/prismaConfig.js';

// to register the user
export async function registerUser(req, res, next) {
	try {
		const { name, email, password, confirmPassword } = req.body;

		if (!(name && email && password && confirmPassword)) {
			return res.status(400).json({
				message:
					'One of the above details, i.e, name, email, password, confirmPassword',
			});
		}

		const foundUser = await prisma.users.findFirst({
			where: { OR: [{ name }, { email }] },
		});

		if (foundUser) {
			return res.status(409).json({ msg: 'Email or Username already Taken' });
		}

		if (password !== confirmPassword) {
			return res.status(400).json({ message: "Both passwords don't match" });
		}

		await prisma.users.create({
			data: {
				name,
				email,
				password,
			},
		});

		// redirecting the email and password to the next middleware
		req.body = { email, password };

		next();
	} catch (error) {
		next(error);
	}
}

// to log the user in
export async function loginUser(req, res, next) {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({
				message: 'One of the above details, i.e, name and password',
			});
		}

		const foundUser = await prisma.users.findUnique({
			where: { email },
		});

		if (!foundUser) {
			return res.status(404).json({ message: 'User not found' });
		}

		if (foundUser.password !== password) {
			return res.status(401).json({ message: 'Invalid Password' });
		}

		const accessToken = jwt.sign(
			{
				email: foundUser.email,
			},
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: '15m' }
		);

		const refreshToken = jwt.sign(
			{
				email: foundUser.email,
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
		next(error);
	}
}

// to fetch new access token on expiry
export function refreshTokenUser(req, res) {
	const cookies = req.cookies;

	if (!cookies?.jwt) return res.sendStatus(406);

	const refreshToken = req.cookies.jwt;

	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET,
		function (err, decoded) {
			if (err)
				return res.status(401).json({
					message:
						'Has been logged out as credentials have expired. Please Log in again.',
				});

			const accessToken = jwt.sign(
				{ email: decoded.email },
				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: '15m' }
			);

			res.status(200).json({ accessToken });
		}
	);
}

// to log the user out
export async function logoutUser(req, res) {
	try {
		const cookies = req.cookies;

		if (!cookies?.jwt) {
			return res.status(204).json({ message: 'No existing cookie found' });
		}

		const refreshToken = cookies.jwt;

		const foundUser = await prisma.users.findFirst({
			where: { refreshToken },
		});

		if (!foundUser) {
			// clear the cookie by chance it was a prexisting one
			res.clearCookie('jwt', {
				httpOnly: true,
				sameSite: 'None',
				secure: true,
			});

			return res
				.sendStatus(204)
				.json({ message: 'Removed pre-existing Auth cookie' });
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

		res.status(204).json({ message: 'User is logged out' });
	} catch (error) {
		next(error);
	}
}
