'use strict';
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Categoria',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      nombre: {
        type: DataTypes.STRING,
        unique: true,
        notNull: true,
        required: true
      }
    },
    {
      name: {
        singular: 'Categoria',
        plural: 'Categorias'
      },
      tableName: 'Categoria'
    }
  );
};
