const usersController = require('../controllers/users');
const express = require('express');
const router = express.Router();

router.post('/login', usersController.Login);
router.post('/register', usersController.Register);

module.exports = router;