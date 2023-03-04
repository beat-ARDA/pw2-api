const User = require('../models/users');

exports.findUser = (req, res) => {
    res.status(200).send("respuesta usuario");
};