const { UserLogin, UserRegister, User } = require('../models/users');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64String = reader.result.split(',')[1];
            resolve(base64String);
        };

        reader.onerror = (error) => {
            reject(error);
        };

        reader.readAsDataURL(blob);
    });
}

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
    const { firstNames, lastNames, birthDate, imageProfile, email, pass, userType, gender } = req.body;

    const imageBuffer = Buffer.from(imageProfile, 'base64');

    // Crear un objeto Blob
    //const imageBlob = new Blob([imageBuffer]);

    try {

        await prisma.users.create({
            data: {
                email: email,
                pass: pass,
                userType: userType,
                firstNames: firstNames,
                lastNames: lastNames,
                imageProfile: imageBuffer,
                gender: gender,
                birthdate: new Date(birthDate)
            }
        });

        let response = { "status": 200, "message": 'Usuario registrado con exito!' }

        res.json(response);
    }
    catch (error) { console.log(error) }
    finally { await prisma.$disconnect(); }
};

exports.GetUser = async (req, res) => {

    const { id } = req.params;

    parseInt(id);

    try {
        const user = await prisma.users.findFirst({
            where: {
                userId: parseInt(id)
            },
            select: {
                userId: true,
                email: true,
                pass: true,
                userType: true,
                firstNames: true,
                lastNames: true,
                imageProfile: true,
                gender: true,
                birthdate: true,
                registrationDate: true,
                dateUpdate: true,
                attemps: true
            },
        });

        user.imageProfile = Buffer.from(user.imageProfile).toString('base64');

        let response = {
            "user": user
        }

        res.json(response);

    } catch (error) { console.log(error) }

    // console.log(id);
    // const user = new User(id);

    // try {
    //     let response = await user.GetUser();
    //     res.json(response);
    // } catch (error) {
    //     console.log(error);
    // }
}