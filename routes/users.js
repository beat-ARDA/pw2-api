const usersController = require('../controllers/users');
const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

router.post('/login', usersController.Login);
router.post('/register', upload.fields([{ name: 'imageProfile' }, { name: 'jsonData' }]), usersController.Register);
router.get('/user/:id', usersController.GetUser);
router.put('/user/:id', usersController.UpdateUser);

module.exports = router;