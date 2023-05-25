'use strict';

const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
	name: {
		type: String,
		required: [true, 'Vous devez saisir un nom de catégorie'],
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: [true, 'Vous devez être connecté pour créer une catégorie'],
	},
});


const Category = model('Category', categorySchema);

module.exports = Category;
