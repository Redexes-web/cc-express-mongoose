'use strict';

const { Schema, model } = require('mongoose');
const { encryptEmail, decryptEmail } = require('../utils/crypto.js');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Le prénom ne peut pas être vide'],
    },
    email: {
      type: String,
      required: [true, "L'email ne peut pas être vide"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Le mot de passe ne peut pas être vide'],
    },
  },
  { timestamps: true }
);

const User = model('User', userSchema);

module.exports = User;
