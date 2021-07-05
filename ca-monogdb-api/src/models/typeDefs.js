import { gql } from 'apollo-server-express';

// sample type definition - replace with your data model

export const typeDefs = gql`
	type Query {
		objects: [DAHObject!]!
	}

	type DAHObject {
		id: String!,
	}
`;
