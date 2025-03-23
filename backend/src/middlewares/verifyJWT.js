import jwt from 'jsonwebtoken';

// to check if the access token sent with the request is valid or not
function verifyJWT(req, res, next) {
	const authorization = req.headers['authorization'];

	if (!authorization) return res.sendStatus(401);

	const token = authorization.split(' ')[1];

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
		if (err) return res.sendStatus(403);

		req.email = decoded.email;

		next();
	});
}

export default verifyJWT;
