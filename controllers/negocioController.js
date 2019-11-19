const db = require('../models');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');

exports.getNegocios = asyncHandler(async (req, res, next) => {
  const negocios = await db.Negocio.findAndCountAll();
  res
    .status(200)
    .json({ success: true, count: negocios.count, data: negocios.rows });
});

exports.postNegocio = asyncHandler(async (req, res, next) => {
  const [negocio, created] = await db.Negocio.findOrCreate({
    where: { nombre: req.body.nombre },
    defaults: {
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      direccion: req.body.direccion,
      telefonos: req.body.telefonos,
      imagenes: req.body.imagenes,
      localizacion: req.body.localizacion,
      updatedAt: Date.now()
    }
  });
  if (!created) return next(new ErrorResponse(404, 'El negocio ya existe'));
  res.status(200).json({ success: created});
});

exports.getNegocio = asyncHandler(async (req, res, next) => {
  const negocio = await db.Negocio.findByPk(req.params.id);
  if (negocio) res.status(200).json({ success: true, data: negocio });
  next(err);
});

exports.putNegocio = asyncHandler(async (req, res, next) => {
  const negocio = await db.Negocio.findOne({
    where: { nombre: req.body.nombre }
  });
  console.log(negocio);
  if (negocio !== null)
    return next(new ErrorResponse(404, 'Ya existe un negocio con este nombre'));
  const [editado] = await db.Negocio.update(req.body, {
    where: { id: req.params.id }
  });
  if (editado) res.status(200).json({ success: true });
  next(err);
});

exports.deleteNegocio = asyncHandler(async (req, res, next) => {
  const eliminado = await db.Negocio.destroy({ where: { id: req.params.id } });
  console.log(eliminado);
  if (eliminado) res.status(200).json({ success: true });
  next(err);
});
