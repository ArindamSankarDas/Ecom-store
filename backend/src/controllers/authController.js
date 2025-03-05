import usersData from '../utils/users.json' with { type: 'json' };
import jwt from 'jsonwebtoken';

import { writeFile } from 'node:fs';
import { join } from 'node:path';

export function registerUser(req, res, next){
	const { username, email, password } = req.body;
	
	if(!username || !email || !password){
		return res.status(400).json({msg: 'Details not given'});
	}
	
	const foundUser = usersData.users.some(function(user){
		return user.username === username || user.email || email;
	});
	

	if(foundUser){
		return res.status(409).json({msg: 'Email or User already Taken'});
	}

	usersData.users = [
		...usersData.users,
		{
			username,
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

	req.body = { username, password	};

	next();
}

export function loginUser(req, res){
	const { username, password } = req.body;

	if(!username || !password){
		return res.status(400).json({ msg: 'Details not filled up' });
	}

	const foundUser =	usersData.users.find(function(user){
		return user.username === username;	
	});

	if(!foundUser){
		return res.status(404).json({ msg: 'User not found' });
	}

	if(foundUser.password !== password){
		return res.status(401).json({ msg: 'Invalid Password' });
	}

	const accessToken = jwt.sign(
		{ username: foundUser.username},
		process.env.ACCESS_TOKEN_SECRET,
		{expiresIn: '15m'}
	);

	const refreshToken = jwt.sign(
		{ username: foundUser.username },
		process.env.REFRESH_TOKEN_SECRET,
		{expiresIn: '30d'}
	);	

	const otherUsers = usersData.users.filter(function(user){
		return foundUser.username !== user.username;
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
			{ username: decoded.username }, 
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
		}
	);

	res.sendStatus(204);
}