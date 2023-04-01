const { UserLogin, UserRegister, User } = require('../models/users');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

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

exports.GetUser = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const user = new User(id);

    try {
        let response = await user.GetUser();
        res.json(response);
    } catch (error) {
        console.log(error);
    }
}