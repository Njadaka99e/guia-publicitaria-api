'use strict';
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Subcategoria', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    nombre: {
      type: DataTypes.STRING,
      unique: true,
      notNull: true,
      required: true
    },
    idCategoria: {
      // fk Categoria
      type: DataTypes.UUID
    }
  });
};
