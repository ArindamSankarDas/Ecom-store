// allowed web origins which can send cors request
export const allowedOrigins = [
	'https://ecomstore.arindamsankardas.dev',
	'http://localhost:5173',
];

// cors options for the server.js
const corsOptions = {
	origin: function (origin, callback) {
		if (!origin || allowedOrigins.includes(origin)) {
			callback(null, true);
		} else {
			callback(null, false);
		}
	},
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
};

export default corsOptions;
