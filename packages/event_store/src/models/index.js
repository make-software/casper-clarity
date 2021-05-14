'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/db-config.json')[env];
const db = {};
  
let sequelize;

config.dialectOptions = {
    connectTimeout: 60000,
    supportBigNumbers: true
};

// A hacky way to figure out if the running process is the event handler
if (process.env.NODE_ADDRESS) {
    config.pool = {
        max: process.env.MAX_DATABASE_CONNECTIONS
            ? parseInt(process.env.MAX_DATABASE_CONNECTIONS)
            : 450,
        min: process.env.MIN_DATABASE_CONNECTIONS
            ? parseInt(process.env.MIN_DATABASE_CONNECTIONS)
            : 150,
        acquire: 60000 * 3,
        idle: 75000
    };
}

if (process.env['DATABASE_URI']) {
  sequelize = new Sequelize(process.env['DATABASE_URI'], config);
} else {
  sequelize = new Sequelize(config.uri, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
