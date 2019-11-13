'use strict';
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('NegocioImagen', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    ruta: {
      type: DataTypes.STRING(1234),
      unique: true,
      required: true,
      notNull: true
    },
    idNegocio: {
      // fk Negocio
      type: DataTypes.UUID,
      notNull: true,
      required: true
    }
  });
};
