import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import rootRoute from './routes/root.js';
import authRoute from './routes/auth.js';
import searchRoute from './routes/search.js';
import categoryRoute from './routes/category.js';

import requestLogger from './middlewares/reqLogger.js';
import errorLogger from './middlewares/errLogger.js';

import corsOptions from './config/corsConfig.js';

import credentials from './middlewares/credentials.js';

// initialise the express application
const app = express();

// creates log for any know requests routes
app.use(requestLogger);

// set allowed credentials
app.use(credentials);

// handles cross-origin requests from browsers and other server services
app.use(cors(corsOptions));

// parses any incoming json request body
app.use(express.json());

// cookie parsing
app.use(cookieParser());

// application routes
app.use('/', rootRoute);
app.use('/category', categoryRoute);
app.use('/search', searchRoute);
app.use('/auth', authRoute);

// handles 404 routes
app.all('*', (_req, _res, next) => {
	const err = new Error('NOT FOUND');

	err.statusCode = 404;

	next(err);
});

// global error handler
app.use(errorLogger);

// server starts listening on this port
app.listen(process.env.PORT, function (err) {
	if (err) {
		console.error(
			`An Error code of ${err.name} with the message ${err.message}`
		);
	}

	console.log('Server is running on ' + 'http://localhost:' + process.env.PORT);
});
