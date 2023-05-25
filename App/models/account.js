'use strict';

const { Schema, model } = require('mongoose');

const accountSchema = new Schema({
	bankName: {
		type: String,
		required: [true, 'Veillez saisir le nom de la banque'],
	},
	customName: {
		type: String,
		required: [true, 'Veillez saisir le nom du compte'],
        maxlength: [50, 'Le nom du compte doit avoir au maximum 50 caractères'],
	},
	lastUpdated: {
		type: Date,
		required: [true, 'Veillez saisir la date de mise à jour'],
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: [true, 'Veillez saisir un utilisateur'],
	},
});

const Account = model('Account', accountSchema);

module.exports = Account;
