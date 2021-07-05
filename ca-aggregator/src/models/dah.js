import mongoose, { Schema } from 'mongoose';

// Example for item type specific schema

export const EntitySchema = new Schema({
    id: Number,
    name: String,
    nameSort: String
});

export const Entity = mongoose.model('Object', EntitySchema);
