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
      },
      imagenes: {
        type: DataTypes.ARRAY(DataTypes.STRING)
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
