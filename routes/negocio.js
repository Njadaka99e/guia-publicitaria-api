const express = require('express');
const router = express.Router();

const {
  getNegocios,
  postNegocio,
  putNegocio,
  getNegocio,
  deleteNegocio,
  putSubirImagen
} = require('../controllers/negocioController');

router
  .route('/')
  .get(getNegocios)
  .post(postNegocio);

router
  .route('/:id')
  .get(getNegocio)
  .put(putNegocio)
  .delete(deleteNegocio);

router
  .route('/:id/foto')
  .put(putSubirImagen);
  
module.exports = router;
