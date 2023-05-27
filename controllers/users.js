const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

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

    // Los archivos adjuntos se encuentran en req.files
    const imagePath = req.files.imageProfile[0].path;

    const imageBuffer = fs.readFileSync(imagePath);

    const { firstNames, lastNames, birthDate, imageProfile, email, pass, userType, gender, image } = req.body;

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
};

exports.UpdateUser = async (req, res) => {

    const imagePath = req.files['imagen-perfil'][0].path;

    const imageBuffer = fs.readFileSync(imagePath);

    const { id } = req.params;

    const { nombresPerfil, apellidosPerfil, correoPerfil, fechaNacimientoPerfil, pass } = req.body;

    parseInt(id);

    try {
        await prisma.users.update({
            where: {
                userId: parseInt(id)
            },
            data: {
                email: correoPerfil,
                pass: pass,
                userType: req.body['tipo-usuario-perfil'],
                firstNames: nombresPerfil,
                lastNames: apellidosPerfil,
                imageProfile: imageBuffer,
                gender: req.body['genero-perfil'],
                birthdate: new Date(fechaNacimientoPerfil)
            }
        });

        let response = {
            "status": 200,
            "message": 'Usuario actalizado con exito!'
        }

        res.json(response);

    } catch (error) { console.log(error) }
};