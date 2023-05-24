'use strict';

const { Schema, model } = require('mongoose');

const accountSchema = new Schema({
	bankName: {
		type: String,
		required: true,
	},
	customName: {
		type: String,
		required: true,
	},
	lastUpdated: {
		type: Date,
		required: true,
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
});

const Account = model('Account', accountSchema);

module.exports = Account;
