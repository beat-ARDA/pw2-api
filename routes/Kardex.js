const KardexController = require('../controllers/Kardex.js');
const express = require('express');
const router = express.Router();

router.get('/Kardex', KardexController.kardexSelect);


module.exports = router;