'use strict';

const { Schema, model } = require('mongoose');

// Schéma pour les lignes de compte
const transactionSchema = new Schema({
	label: {
		type: String,
		required: [true, 'Vous devez saisir un libellé'],
		minlength: [3, 'Le libellé doit avoir au moins 2 caractères'],
		maxlength: [50, 'Le libellé doit avoir au maximum 50 caractères'],
	},
	type: {
		type: String,
		enum: ['debit', 'credit'],
		required: [
			true,
			'Vous devez saisir un type de transaction (debit ou credit)',
		],
	},
	amount: {
		type: Number,
		required: [true, 'Vous devez saisir un montant'],
	},
	paymentDate: {
		type: Date,
		required: [true, 'Vous devez saisir une date de paiement'],
	},
	paymentMethod: {
		type: String,
		required: [true, 'Vous devez saisir une méthode de paiement'],
		enum: {
			values: ['cash', 'card', 'transfer', 'check'],
			message: 'La méthode de paiement doit être cash, card, transfer ou check',
		},
	},
	isChecked: {
		type: Boolean,
		default: false,
		required: [true, 'Vous devez saisir un statut de transaction'],
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: 'Category',
		required: [true, 'Vous devez saisir une catégorie'],
	},
	accountId: {
		type: Schema.Types.ObjectId,
		ref: 'Account',
		required: [true, 'Vous devez saisir un compte'],
	},
});

const Transaction = model('Transaction', transactionSchema);

module.exports = Transaction;
