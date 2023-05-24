'use strict';

const { Schema, model } = require('mongoose');

// Schéma pour les lignes de compte
const transactionSchema = new Schema({
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['debit', 'credit'],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentDate: {
      type: Date,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    isChecked: {
      type: Boolean,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    accountId: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
    },
  });

  const Transaction = model('Transaction', transactionSchema);

module.exports = Transaction;