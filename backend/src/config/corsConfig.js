// allowed web origins which can send cors request
export const allowedOrigins = ['https://ecomstore.arindamsankardas.dev']; // add a localhost when using in development mode

// cors options for the server.js
const corsOptions = {
	origin: function (origin, callback) {
		if (allowedOrigins.includes(origin)) {
			// use (!origin||allowedOrigins.includes(origin)) in development mode to allow undefined paths to access server resources like postman or any API client
			callback(null, true);
		} else {
			callback(null, false);
		}
	},
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
};

export default corsOptions;
