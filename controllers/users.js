const UserLogin = require('../models/users');

exports.Login = async (req, res) => {

    const { email, password } = req.body;
    const userLoginModel = new UserLogin(email, password);

    try {
        const loginData = await userLoginModel.Login();
        res.json(loginData);
    } catch (error) { console.log(error) }
};