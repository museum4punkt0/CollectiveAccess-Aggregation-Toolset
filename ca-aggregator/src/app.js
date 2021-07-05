import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { collectDah } from './collectors/dah';

// basic settings for express server
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;

// JWT authentication
const apiTokenAuthentication = (req, res, next) => {
	if (!process.env.API_KEY || process.env.API_KEY === req.query.apiKey) {
		return next();
	}
	res.status(401).send('Invalid Api-Key provided');
};

const collectorHandler = collectorFn => {
	return async (_req, res, next) => {
		try {
			const result = await collectorFn();

			const responseData = { success: true };
			if (result.skipped) {
				responseData.skipped = {
					count: result.skipped.length,
					items: result.skipped.map(i => i.itemId)
				};
			}
			res.status(201).json(responseData);
		} catch (err) {
			next(err);
		}
	};
};

app.get('/', apiTokenAuthentication, (_req, res) =>
	res.send(
		`<h2>REST API to MongoDB</h2>`
	)
);


app.get('/fetch/dah', apiTokenAuthentication, collectorHandler(collectDah));

// Mongose for connection to MongoDB Atlas database
mongoose
	.connect(
		process.env.MONOGDB_CONNECTION
	)
	.then(() => {
		app.listen(port, () =>
			console.log(`App listening at ${port}!`)
		);
	})
	.catch(err => {
		console.log(err);
	});
