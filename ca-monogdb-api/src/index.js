import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import mongoose from 'mongoose';
import { resolvers } from './models/resolvers';
import { typeDefs } from './models/typeDefs';

require('dotenv').config();

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log('Connected to MongoDB');
});

const mongodbUser = process.env.MONGODB_USER;
const mongodbName = process.env.MONGODB_NAME;
const port = process.env.PORT || 3001;

const JWT_SECRET = process.env.JWT_SECRET;

const startServer = async () => {
	const app = express();

	const server = new ApolloServer({
		typeDefs,
		resolvers,
		introspection: true,
		playground: true
	});

	server.applyMiddleware({ app });

	await mongoose.connect(
		`mongodb+srv://express:${mongodbUser}.mongodb.net/${mongodbName}?retryWrites=true&w=majority`,
		{ useNewUrlParser: true }
	);

	app.listen({ port }, () =>
		console.log(`Server ready at http://localhost:${port}/graphql`)
	);
	app.get('/', (req, res) => {
		res.send('api hub');
	});
};
startServer();
