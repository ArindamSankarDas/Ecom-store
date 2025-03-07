export const allowedOrigins = [
	'https://ecomstore.devsankar.online',
	'http://localhost:5173',
];

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
