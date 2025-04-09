import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import rootRoute from './routes/root.js';
import authRoute from './routes/auth.js';
import searchRoute from './routes/search.js';
import categoryRoute from './routes/category.js';
import cartRoute from './routes/cart.js';
import profileRoute from './routes/profile.js';
import paymentRoute from './routes/payment.js';

import requestLogger from './middlewares/requestLogger.js';
import errorLogger from './middlewares/errorLogger.js';

import corsOptions from './config/corsConfig.js';

import credentials from './middlewares/credentials.js';
import { connectDB } from './config/prismaConfig.js';

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
app.use(express.urlencoded({ extended: true }));

// cookie parsing
app.use(cookieParser());

// application routes
app.use('/auth', authRoute);
app.use('/profile', profileRoute);
app.use('/category', categoryRoute);
app.use('/search', searchRoute);
app.use('/cart', cartRoute);
app.use('/payments', paymentRoute);
app.use('/', rootRoute);

// handles 404 routes
app.all('*', (_req, _res, next) => {
	const err = new Error('NOT FOUND');

	err.statusCode = 404;

	next(err);
});

// global error handler
app.use(errorLogger);

// server starts listening on this port after database connection is established
connectDB().then(function () {
	app.listen(process.env.PORT, function (err) {
		if (err) {
			console.error(
				`An Error code of ${err.name} with the message ${err.message}`
			);
		}

		console.log(
			'Server is running on ' + 'http://localhost:' + process.env.PORT
		);
	});
});
