const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // Log to console for dev
  console.log(err.name);

  // Sequelize mal formato de uuid
  if (err.name === 'SequelizeDatabaseError') {
    const message = `El recurso no se encuentra`;
    error = new ErrorResponse(404, message);
  }

  // Sequelize no existe el registro
  if (err.name === 'ReferenceError') {
    const message = `El recurso no existe`;
    error = new ErrorResponse(404, message);
  }

  // Sequelize nombre del Negocio debe ser unique
  if (err.name === 'SequelizeUniqueConstraintError') {
    const message = 'El nombre del negocio ya existe';
    error = new ErrorResponse(404, message);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
};

module.exports = errorHandler;
