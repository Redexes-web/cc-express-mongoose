'use strict';

const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
	name: {
		type: String,
		required: [true, 'Vous devez saisir un nom de catégorie'],
	},
});

const Category = model('Category', categorySchema);

module.exports = Category;
