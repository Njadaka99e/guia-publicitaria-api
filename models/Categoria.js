'use strict';
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Categoria',
    {
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
