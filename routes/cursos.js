const cursosController = require('../controllers/cursos');
const express = require('express');
const router = express.Router();

router.get('/curso', cursosController.getAll);
router.get('/curso/active', cursosController.getActive);
router.get('/curso/:id', cursosController.getById);
router.post('/curso/register', cursosController.Register);
router.put('/curso/update/:id', cursosController.updateCurso);
router.delete('/curso/delete/:id', cursosController.deleteCurso);


module.exports = router;