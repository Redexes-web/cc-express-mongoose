'use strict';

const { Schema, model } = require('mongoose');

// Schéma pour les lignes de compte
const transactionSchema = new Schema({
    label: {
      type: String,
      required: [true, 'Vous devez saisir un libellé']
      
    },
    type: {
      type: String,
      enum: ['debit', 'credit'],
      required: [true, 'Vous devez saisir un type de transaction']
    },
    amount: {
      type: Number,
      required: [true, 'Vous devez saisir un montant']
    },
    paymentDate: {
      type: Date,
      required: [true, 'Vous devez saisir une date de paiement']
    },
    paymentMethod: {
      type: String,
      required: [true, 'Vous devez saisir une méthode de paiement'],
      enum: {
        values: ['cash', 'card', 'transfer', 'check'],
        message: 'La méthode de paiement doit être cash, card, transfer ou check',
      }
    },
    isChecked: {
      type: Boolean,
      required: [true, 'Vous devez saisir un statut de transaction']
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Vous devez saisir une catégorie']
    },
    accountId: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      required: [true, 'Vous devez saisir un compte']
    },
  });

  const Transaction = model('Transaction', transactionSchema);

module.exports = Transaction;