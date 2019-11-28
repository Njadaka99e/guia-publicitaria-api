const express = require('express');
const router = express.Router();

const {
  getSubCategorias,
  postSubcategoria,
  putSubCategoria,
  getSubcategoria,
  deleteSubCategoria
} = require('../controllers/subcategoriaController');

router
    .route('/')
    .get(getSubCategorias)
    .post(postSubcategoria);

router
    .route('/:id')
    .get(getSubcategoria)
    .put(putSubCategoria)
    .delete(deleteSubCategoria);

module.exports = router;