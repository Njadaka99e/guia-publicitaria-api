const express = require('express');
const router = express.Router();

const { getNegocios, postNegocio } = require('../controllers/negocio');

router
  .route('/')
  .get(getNegocios)
  .post(postNegocio);

router
  .route('/:id')
  .get()
  .put()
  .delete();

module.exports = router;
