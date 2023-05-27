const comentariosController = require('../controllers/comentarios.js');
const express = require('express');
const router = express.Router();

router.post('/comentarios/:id', comentariosController.createComment);
router.put('/comentarios/:id', comentariosController.updateComment);
router.delete('/comentarios/:id', comentariosController.deleteComment);
router.get('/comentarios/:id', comentariosController.getCommentById);
router.get('/comentarios', comentariosController.getAllComments);

module.exports = router;