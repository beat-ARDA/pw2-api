const usersController = require('../controllers/users');
const express = require('express');
const router = express.Router();

router.post('/login', usersController.Login);
router.post('/register', usersController.Register);
router.get('/user/:id', usersController.GetUser);

module.exports = router;