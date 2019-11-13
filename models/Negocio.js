'use strict';
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Negocio', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      notNull: true,
      required: true
    },
    descripcion: {
      type: DataTypes.STRING(1234),
      notNull: true,
      required: true
    },
    direccion: {
      type: DataTypes.STRING(1234),
      notNull: true,
      required: true
    },
    localizacion: {
      type: DataTypes.GEOMETRY('POINT', 4326)
    }
  });
};
