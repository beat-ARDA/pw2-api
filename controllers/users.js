const { UserLogin, UserRegister } = require('../models/users');
const User = require('../models/usersZared');
//const multer = require('multer');

//const upload = multer({ dest: 'uploads/' });

exports.Login = async (req, res) => {

    const { email, password } = req.body;
    const userLoginModel = new UserLogin(email, password);

    try {
        const loginData = await userLoginModel.Login();
        res.json(loginData);
    } catch (error) { console.log(error) }
};

exports.Register = async (req, res) => {
    const { firstNames, lastNames, birthDate, imageProfile, email, pass, userType, gender } = req.body;
    const userRegisterModel = new UserRegister(firstNames, lastNames, birthDate, imageProfile, email, pass, userType, gender);

    try {
        let response = await userRegisterModel.Register();
        res.json(response);
    } catch (error) { console.log(error) }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, pass, userType, firstNames, lastNames, imageProfile, gender, birthDate, borroImagen } = req.body;

        const user = new User();
        await user.update(id, email, pass, userType, firstNames, lastNames, imageProfile, gender, birthDate, borroImagen);

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating user' });
    }
}


// Definir el controlador para obtener los datos de un usuario
exports.getUser = async (req, res, next) => {
    try {
        const user = new User();
        // Obtener el ID del usuario de los parámetros de la URL
        const userId = req.params.id;

        // Consultar la base de datos para encontrar el usuario con el ID correspondiente
        const userdata = await user.getById(userId);

        // Si el usuario no existe, lanzar un error 404
        if (!userdata) {
            throw createError(404, 'User not found');
        }

        // Devolver los datos del usuario como respuesta JSON
        res.json(userdata);
    } catch (error) {
        // Si hay un error, pasar al siguiente middleware para manejarlo
        next(error);
    }
};

