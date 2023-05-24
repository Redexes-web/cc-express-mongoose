'use strict';

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

const mongoUri = config.use_env_variable ? process.env[config.use_env_variable] : config.database_url;

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
const dbConnection = mongoose.connection;
dbConnection.on('error', console.error.bind(console, 'Erreur lors de la connexion à la base de données :'));
dbConnection.once('open', function() {
  console.log('Connexion réussie à la base de données.');
});

fs.readdirSync(__dirname)
	.filter((file) => {
		return (
			file.indexOf('.') !== 0 &&
			file !== basename &&
			file.slice(-3) === '.js' &&
			file.indexOf('.test.js') === -1
		);
	})
	.forEach((file) => {
		const model = require(path.join(__dirname, file));
		db[model.modelName] = model;
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.mongoose = mongoose;

module.exports = db;