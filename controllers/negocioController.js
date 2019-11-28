const db = require('../models');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const path = require('path');
const _ = require('lodash');

// @desc      Obtener todos los negocios
// @route     GET /api/v1/negocio
// @access    Public
exports.getNegocios = asyncHandler(async (req, res, next) => {
  const negocios = await db.Negocio.findAll();
  res
    .status(200)
    .json(negocios );
  next(err)
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
  next(err)
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
  if (eliminado) res.status(200).json({ success: true });
  next(err);
});

// @desc      Subir una foto para negocio
// @route     PUT /api/v1/negocio/:id/foto
// @access    Private
exports.putSubirImagen = asyncHandler(async (req, res, next) => {
  const negocio = await db.Negocio.findByPk(req.params.id);
  let data = negocio.imagenes;
  // Validar de que haya imagenes en la variable 'fotos'
  if (!req.files) {
    return next(new ErrorResponse(400, 'Porfavor suba un archivo'));
  }

  // Validar si se subio solamente un arhcivo
  let isSingleFile = false;
  _.forEach(_.keysIn(req.files.fotos), key => {
    if (key === 'name') isSingleFile = true;
  });

  // Si se subio solo un archivo
  if (isSingleFile) {
    let foto = req.files.fotos;
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
    foto.name = `foto_${negocio.id}_${Date.now()}_${foto.name}`;
    foto.mv(`${process.env.FILE_UPLOAD_PATH}/${foto.name}`, err => {
      if (err){
        console.log(err);
        return next(new ErrorResponse(500, 'Error al subir archivos'));
      }
    });
    data.push(foto.name);
  } // Si se subio mas de un archivo 
  else {
    _.forEach(_.keysIn(req.files.fotos), (key) => {
      let foto = req.files.fotos[key];
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
  
    // Subir las imagenes a uploads
    _.forEach(_.keysIn(req.files.fotos), (key) => {
      let foto = req.files.fotos[key];
      foto.name = `foto_${negocio.id}_${Date.now()}_${foto.name}`;
      foto.mv(`${process.env.FILE_UPLOAD_PATH}/${foto.name}`, err => {
        if (err){
          console.log(err);
          return next(new ErrorResponse(500, 'Error al subir archivos'));
        }
      });
      data.push(foto.name);
    });
  }

  // Actualizar la base de datos con las nuevas imagenes
  const [editado] = await db.Negocio.update(
    { imagenes: data },
    {
      where: { id: req.params.id }
    }
  );
  if (editado) res.status(200).json({ success: true, data });
  next(err);
});
