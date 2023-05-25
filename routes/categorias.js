const categoriasController = require('../controllers/categorias.js');
const express = require('express');
const router = express.Router();

router.post('/categorias/register', categoriasController.Register);
router.put('/categorias/update/:id', categoriasController.Update);
router.delete('/categorias/delete/:id', categoriasController.Delete);
router.get('/categorias/:id', categoriasController.findById);
router.get('/categorias', categoriasController.getAll);


module.exports = router;