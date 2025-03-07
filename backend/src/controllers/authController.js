import usersData from '../utils/users.json' with { type: 'json' };
import jwt from 'jsonwebtoken';

import { writeFile } from 'node:fs';
import { join } from 'node:path';

export function registerUser(req, res, next){
	const { name, email, password } = req.body;
	
	if(!name || !email || !password){
		return res.status(400).json({msg: 'Details not given'});
	}
	
	const foundUser = usersData.users.some(function(user){
		return user.name === name || user.email || email;
	});
	

	if(foundUser){
		return res.status(409).json({msg: 'Email or User already Taken'});
	}

	usersData.users = [
		...usersData.users,
		{
			name,
			email,
			password
		}
	];

	writeFile(
		join(import.meta.dirname, '..', 'utils', 'users.json'), 
		JSON.stringify(usersData),
		function(err){
			if (err) throw new Error(err);
		}
	);

	req.body = { name, password	};

	next();
}

export function loginUser(req, res){
	const { email, password } = req.body;

	if(!email || !password){
		return res.status(400).json({ msg: 'Details not filled up' });
	}

	const foundUser =	usersData.users.find(function(user){
		return user.email === email;	
	});

	if(!foundUser){
		return res.status(404).json({ msg: 'User not found' });
	}

	if(foundUser.password !== password){
		return res.status(401).json({ msg: 'Invalid Password' });
	}

	const accessToken = jwt.sign(
		{ 
			email: foundUser.email,
			name: foundUser.name
		},
		process.env.ACCESS_TOKEN_SECRET,
		{expiresIn: '15m'}
	);

	const refreshToken = jwt.sign(
		{ 
			email: foundUser.email,
			name: foundUser.name
		 },
		process.env.REFRESH_TOKEN_SECRET,
		{expiresIn: '30d'}
	);	

	const otherUsers = usersData.users.filter(function(user){
		return foundUser.email !== user.email;
	});

	const currentUser = {
		...foundUser,
		refreshToken
	}
	
	usersData.users = [
		...otherUsers,
		currentUser
	]

	writeFile(
		join(import.meta.dirname, '..', 'utils', 'users.json'),
		JSON.stringify(usersData),
		function(err){
			if(err) throw new Error(err);
		}
	)

	res.cookie(
		'jwt', 
		refreshToken, 
		{
			httpOnly: true, 
			sameSite: 'None',
			secure: true,
			maxAge: 30 * 24 * 60 * 60 * 1000
		}
	);

	res.status(201).json({ accessToken });
}

export function refreshTokenUser(req, res){
	const cookies = req.cookies;

	if(!cookies?.jwt) return res.sendStatus(406);

	const refreshToken = req.cookies.jwt;

	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, function (err, decoded) {
		if(err) return res.sendStatus(406);

		const accessToken = jwt.sign(
			{ name: decoded.name }, 
			process.env.ACCESS_TOKEN_SECRET, 
			{ expiresIn: "15m" }
		);

		res.status(200).json({ accessToken });	
	} )
}

export function logoutUser(req, res){
	const cookies = req.cookies;

	if (!cookies?.jwt) {
		return res.status(204).json({ msg: 'No Content' });
	}

	const refreshToken = cookies.jwt;

	const foundUser = usersData.users.find(function(user){
		return user.refreshToken === refreshToken;
	});

	if(!foundUser){
		res.clearCookie(
			'jwt', 
			{ 
				httpOnly: true, 
				sameSite: 'None',
				secure: true
			}
		);

		return res.sendStatus(204);
	}

	const otherUsers = usersData.users.filter(function (user) {
		return user.refreshToken !== foundUser.refreshToken;
	});

	delete foundUser.refreshToken;

	usersData.users = [
		...otherUsers,
		{...foundUser}
	]

	writeFile(
		join(import.meta.dirname, '..', 'utils', 'users.json'), 
		JSON.stringify(usersData), 
		function (err) {
			if(err) throw new Error(err);
		}
	);

	res.clearCookie(
		'jwt', 
		{ 
			httpOnly: true, 
			sameSite: 'None',
			secure: true
		}
	);

	res.sendStatus(204);
}