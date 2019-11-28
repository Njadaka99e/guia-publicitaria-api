const db = require('../models');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const path = require('path');
const _ = require('lodash');

// @desc      Obtener todos las subcategorias
// @route     GET /api/v1/subcategoria
// @access    Public
exports.getSubCategorias = asyncHandler(async (req, res, next) => {
  const subCategorias = await db.Subcategoria.findAll();
  res
      .status(200)
      .json(subCategorias);
  next(err)
});

// @desc      Crear negocio
// @route     POST /api/v1/subcategoria
// @access    Private
exports.postSubcategoria = asyncHandler(async (req, res, next) => {
  const [subCategoria, created] = await db.Subcategoria.findOrCreate({
    where: { nombre: req.body.nombre },
    defaults: {
      nombre: req.body.nombre,
      defaults: { nombre: req.body.nombre, updatedAt: Date.now() }
    }
  });
  if (!created) return next(new ErrorResponse(404, 'La subcategoria ya existe'));
  res.status(200).json({ success: created });
  next(err);
});

// @desc      Obtener una sola subcategoria
// @route     GET /api/v1/subcategoria/:id
// @access    Private
exports.getSubcategoria = asyncHandler(async (req, res, next) => {
  const subcategoria = await db.Subcategoria.findByPk(req.params.id);
  if (subcategoria) res.status(200).json({ success: true, data: subcategoria });
  next(err);
});

// @desc      Actualizar subcategoria
// @route     PUT /api/v1/subcategoria/:id
// @access    Private
exports.putSubCategoria = asyncHandler(async (req, res, next) => {
  const Subcategoria = await db.Subcategoria.findOne({
    where: { nombre: req.body.nombre }
  });
  if (Subcategoria !== null)
    return next(
        new ErrorResponse(404, 'Ya existe una subcategoria con ese nombre')
    );
  const editado = await db.Subcategoria.update(req.body, {
    where: { id: req.params.id }
  });
  if (editado) res.status(200).json({ success: true });
  next(err);
});

// @desc      Eliminar subcategoria
// @route     DELETE /api/v1/subcategoria/:id
// @access    Private
exports.deleteSubCategoria = asyncHandler(async (req, res, next) => {
  const eliminado = await db.Subcategoria.destroy({
    where: { id: req.params.id }
  });
  if (eliminado) res.status(200).json({ success: true });
  next(err);
});
