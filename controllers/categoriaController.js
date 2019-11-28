const db = require('../models');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const path = require('path');
const _ = require('lodash');

// @desc      Obtener todos las categorias
// @route     GET /api/v1/categoria
// @access    Public
exports.getCategorias = asyncHandler(async (req, res, next) => {
  const categoria = await db.Categoria.findAll();
  res.status(200).json(categoria);
  next(err);
});

// @desc      Crear negocio
// @route     POST /api/v1/categoria
// @access    Private
exports.postCategoria = asyncHandler(async (req, res, next) => {
  const [categoria, created] = await db.Categoria.findOrCreate({
    where: { nombre: req.body.nombre },
    defaults: { nombre: req.body.nombre, updatedAt: Date.now() }
  });
  if (!created) return next(new ErrorResponse(404, 'La categoria ya existe'));
  res.status(200).json({ success: created });
  next(err);
});

// @desc      Obtener una sola categoria
// @route     GET /api/v1/categoria/:id
// @access    Private
exports.getCategoria = asyncHandler(async (req, res, next) => {
  const categoria = await db.Categoria.findByPk(req.params.id);
  if (categoria) res.status(200).json({ success: true, data: categoria });
  next(err);
});

// @desc      Actualizar categoria
// @route     PUT /api/v1/categoria/:id
// @access    Private
exports.putCategoria = asyncHandler(async (req, res, next) => {
  const categoria = await db.Categoria.findOne({
    where: { nombre: req.body.nombre }
  });
  if (categoria !== null)
    return next(
      new ErrorResponse(404, 'Ya existe una categoria con ese nombre')
    );
  const editado = await db.Categoria.update(req.body, {
    where: { id: req.params.id }
  });
  if (editado) res.status(200).json({ success: true });
  next(err);
});

// @desc      Eliminar categoria
// @route     DELETE /api/v1/categoria/:id
// @access    Private
exports.deleteCategoria = asyncHandler(async (req, res, next) => {
  const eliminado = await db.Categoria.destroy({
    where: { id: req.params.id }
  });
  if (eliminado) res.status(200).json({ success: true });
  next(err);
});
