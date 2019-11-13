'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require('../config/config');
const db = {};

console.log(config);

const sequelize = new Sequelize(
  config.db.database,
  config.db.username,
  config.db.password,
  {
    define: {
      freezeTableName: true
    },
    host: config.db.host,
    dialect: 'postgres'
  }
);

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Associations
// Negocio *-* Subcategoria
db.Negocio.belongsToMany(db.Subcategoria, {
  through: db.NegocioSubcategoria,
  foreignKey: 'idNegocio'
});
db.Subcategoria.belongsToMany(db.Negocio, {
  through: db.NegocioSubcategoria,
  foreignKey: 'idSubcategoria'
});
//Negocio
db.Negocio.hasMany(db.Telefono, { foreignKey: 'idNegocio' });
db.Negocio.hasMany(db.NegocioImagen, { foreignKey: 'idNegocio' });
// Categoria
db.Categoria.hasMany(db.Subcategoria, { foreignKey: 'idCategoria' });

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = db;
