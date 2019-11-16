const express = require('express');
const router = express.Router();

const {
  getNegocios,
  postNegocio,
  putNegocio,
  getNegocio,
  deleteNegocio
} = require('../controllers/negocio');

router
  .route('/')
  .get(getNegocios)
  .post(postNegocio);

router
  .route('/:id')
  .get(getNegocio)
  .put(putNegocio)
  .delete(deleteNegocio);

module.exports = router;
