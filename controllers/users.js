const { UserLogin, UserRegister, User } = require('../models/users');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.users.findFirst({
            where: {
                email: email,
                pass: password // ID del usuario que deseas encontrar
            },
            select: {
                userId: true,
                attemps: true
            },
        });

        let response = {
            "message": 'Credenciales correctas!', "userId": user.userId
        }

        res.json(response);

    } catch (error) { console.log(error) }
};

exports.Register = async (req, res) => {
    const { firstNames, lastNames, birthDate, imageProfile, email, pass, userType, gender, image } = req.body;

    const image_ = new Blob(image);

    console.log(image_);

    // try {
    //     let response = await userRegisterModel.Register();
    //     res.json(response);
    // } catch (error) { console.log(error) }
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