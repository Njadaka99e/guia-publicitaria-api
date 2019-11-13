'use strict';
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('NegocioSubcategoria', {
    idNegocio: {
      // fk ck Negocio
      type: DataTypes.UUID,
      required: true,
      notNull: true,
    },
    idSubcategoria: {
      // fk ck Subcategoria
      type: DataTypes.UUID,
      required: true,
      notNull: true,
    }
  });
};
