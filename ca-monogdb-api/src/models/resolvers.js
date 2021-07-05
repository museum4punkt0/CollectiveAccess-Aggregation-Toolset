import { DAHObject } from './dah';

// sample resolver - replace with your data model

export const resolvers = {
	Query: {
		objects: async () => {
			const objects = await DAHObject.find({}, {}, { lean: true });
			return objects.map(obj => {
				return {
					...obj
				};
			});
		}
	}
};
