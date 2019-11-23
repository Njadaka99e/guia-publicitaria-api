'use strict';

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Negocio', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      unique: true
    },
    descripcion: {
      type: DataTypes.STRING(1234),
      allowNull: false,
      required: true
    },
    direccion: {
      type: DataTypes.STRING(1234),
      allowNull: false,
      required: true
    },
    telefonos: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    imagenes: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    localizacion: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [12.16384, -86.34745]
    }
  });
};
