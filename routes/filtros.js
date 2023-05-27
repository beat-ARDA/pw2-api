const busquedaController = require('../controllers/busqueda');
const cursos1Controller = require('../controllers/obtenerCurMasReciente');
const cursos2Controller = require('../controllers/obtenerCurMasVendidos');

const express = require('express');
const router = express.Router();

router.get('/busqueda', busquedaController.buscarCursosPorNombre);
router.get('/MasReciente', cursos1Controller.getCursoMasReciente);
router.get('/MasVendidos', cursos2Controller.getCursoMasVendidos);

module.exports = router;