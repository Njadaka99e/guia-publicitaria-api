'use strict';
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Telefono', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    telefono: {
      type: DataTypes.STRING,
      notNull: true,
      required: true
    },
    idNegocio: {
      //fk Negocio
      type: DataTypes.UUID,
      required: true,
      notNull: true
    }
  });
};