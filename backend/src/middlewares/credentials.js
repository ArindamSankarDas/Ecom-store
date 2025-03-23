import { allowedOrigins } from '../config/corsConfig.js';

// to allow specific origins to send credentials like cookies in a request
export default function credentials(req, res, next) {
	const origin = req.headers.origin;

	if (allowedOrigins.includes(origin)) {
		res.header('Access-Control-Allow-Credentials', true);
	}

	next();
}
