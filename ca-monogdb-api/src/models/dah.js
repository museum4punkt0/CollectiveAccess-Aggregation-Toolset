import mongoose, { Schema } from 'mongoose';

// sample schema definition for DAHObject - replace with your data model

export const ObjectSchema = new Schema({
	id: {
		type: String,
		required: true
	},
	// define your schema
});

export const DAHObject = mongoose.model('Object', ObjectSchema);

