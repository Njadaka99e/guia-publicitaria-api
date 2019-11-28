const express = require('express');
const router = express.Router();
const {
  getCategoria,
  postCategoria,
  getCategorias,
  putCategoria,
  deleteCategoria
} = require('../controllers/categoriaController');

router
  .route('/')
  .get(getCategorias)
  .post(postCategoria);

router
  .route('/:id')
  .get(getCategoria)
  .put(putCategoria)
  .delete(deleteCategoria);

module.exports = router;
