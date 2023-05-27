const cursosController = require('../controllers/cursos');
const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({
    storage,
    limits: {
        fieldSize: 25 * 1024 * 1024, // 10 MB
    },
});

router.get('/curso', cursosController.getAll);
router.get('/curso/mostrar/active', cursosController.getActive);
router.get('/curso/:id', cursosController.getById);
router.post('/curso-alumn/:id', upload.fields([{ name: 'imagen' }]), cursosController.createCourseAlumn);
router.post('/curso/register', cursosController.Register);
router.post('/curso/crear-curso', upload.fields([{ name: 'imagen' }]), cursosController.createCurso);
router.post('/curso/', cursosController.Register);
router.put('/curso/update/:id', cursosController.updateCurso);
router.delete('/curso/delete/:id', cursosController.deleteCurso);


module.exports = router;