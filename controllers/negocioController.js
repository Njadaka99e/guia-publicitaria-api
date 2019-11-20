const db = require('../models');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const path = require('path');

// @desc      Obtener todos los negocios
// @route     GET /api/v1/negocio
// @access    Public
exports.getNegocios = asyncHandler(async (req, res, next) => {
  const negocios = await db.Negocio.findAndCountAll();
  res
    .status(200)
    .json({ success: true, count: negocios.count, data: negocios.rows });
});

// @desc      Crear negocio
// @route     POST /api/v1/negocio
// @access    Private
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
  res.status(200).json({ success: created });
});

// @desc      Obtener un solo negocio
// @route     GET /api/v1/negocio/:id
// @access    Public
exports.getNegocio = asyncHandler(async (req, res, next) => {
  const negocio = await db.Negocio.findByPk(req.params.id);
  if (negocio) res.status(200).json({ success: true, data: negocio });
  next(err);
});

// @desc      Actualizar negocio
// @route     PUT /api/v1/negocio/:id
// @access    Private
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

// @desc      Eliminar negocio
// @route     DELETE /api/v1/negocio/:id
// @access    Private
exports.deleteNegocio = asyncHandler(async (req, res, next) => {
  const eliminado = await db.Negocio.destroy({ where: { id: req.params.id } });
  console.log(eliminado);
  if (eliminado) res.status(200).json({ success: true });
  next(err);
});

// @desc      Subir una foto para negocio
// @route     PUT /api/v1/negocio/:id/foto
// @access    Private
exports.putSubirImagen = asyncHandler(async (req, res, next) => {
  const negocio = await db.Negocio.findByPk(req.params.id);
  // if (negocio) res.status(200).json({ success: true, data: negocio });
  // Validar de que haya imagenes en la variable 'fotos'
  if (!req.files) {
    return next(new ErrorResponse(400, 'Porfavor suba un archivo'));
  }
  let fotos = req.files.fotos;
  // Validaciones antes de subir imagen
  fotos.forEach(foto => {
    // Validar que la imagen es  una foto
    if (!foto.mimetype.startsWith('image')) {
      return next(new ErrorResponse(400, 'Porfavor suba una imagen'));
    }
    // Validar que la imagen no sobrepase el limite de tamaño
    if (foto.size > process.env.MAX_FILE_UPLOAD) {
      return next(
        new ErrorResponse(
          400,
          `Porfavor suba una imagen menor que ${process.env.MAX_FILE_UPLOAD}`
        )
      );
    }
  });
  // Subir las imagenes
  let data = [];
  fotos.forEach(foto => {
    foto.name = `foto_${negocio.id}_${Date.now()}_${foto.name}`;
    console.log(foto.name);
    foto.mv(`${process.env.FILE_UPLOAD_PATH}/${foto.name}`, err => {
      if (err){
        console.log(err);
        return next(new ErrorResponse(500, 'Error al subir archivos'));
      }
    });
    data.push(foto.name);
  });
  console.log(data);
  const [editado] = await db.Negocio.update(
    { imagenes: data },
    {
      where: { id: req.params.id }
    }
  );
  console.log(editado);
  if (editado) res.status(200).json({ success: true, data });
  next(err);
});
