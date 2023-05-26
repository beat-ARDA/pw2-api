const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAll = async function (req, res) {
    try {
        const cursos = await prisma.cursos.findMany();
        res.json(cursos);
    } catch (error) {
        console.error('Error al obtener cursos:', error);
        res.status(500).json({ error: 'Error al obtener cursos' });
    }
};

exports.getById = async function (req, res) {
    try {
        const { id } = req.params;
        const curso = await prisma.cursos.findUnique({
            where: { idCurso: parseInt(id) },
        });

        if (!curso) {
            return res.status(404).json({ error: 'Curso no encontrado' });
        }

        res.json(curso);
    } catch (error) {
        console.error('Error al obtener curso por ID:', error);
        res.status(500).json({ error: 'Error al obtener curso por ID' });
    }
};

exports.getActive = async function (req, res) {
    try {
        const cursos = await prisma.cursos.findMany({
            where: { activo: true },
        });

        res.json(cursos);
    } catch (error) {
        console.error('Error al obtener cursos activos:', error);
        res.status(500).json({ error: 'Error al obtener cursos activos' });
    }
};

// Create
exports.createCurso = async function (req, res) {
    try {
        const { cost, descripcion, promedio, imagen, titulo, instructor } = req.body;

        const curso = await prisma.cursos.create({
            data: {
                cost,
                descripcion,
                promedio,
                imagen,
                titulo,
                activo: true,
                instructor,
            },
        });

        res.json(curso);
    } catch (error) {
        console.error('Error al crear el curso:', error);
        res.status(500).json({ error: 'Error al crear el curso' });
    }
};

// Read All
exports.getAllCursos = async function (req, res) {
    try {
        const cursos = await prisma.cursos.findMany();
        res.json(cursos);
    } catch (error) {
        console.error('Error al obtener cursos:', error);
        res.status(500).json({ error: 'Error al obtener cursos' });
    }
};

// Read by ID
exports.getCursoById = async function (req, res) {
    try {
        const { id } = req.params;
        const curso = await prisma.cursos.findUnique({
            where: { idCurso: parseInt(id) },
        });

        if (!curso) {
            return res.status(404).json({ error: 'Curso no encontrado' });
        }

        res.json(curso);
    } catch (error) {
        console.error('Error al obtener curso por ID:', error);
        res.status(500).json({ error: 'Error al obtener curso por ID' });
    }
};

//Register
exports.Register = async (req, res) => {
    const { firstNames, lastNames, birthDate, imageProfile, email, pass, userType, gender } = req.body;

    const imageBuffer = Buffer.from(imageProfile, 'base64');

    // Crear un objeto Blob
    //const imageBlob = new Blob([imageBuffer]);

    try {

        await prisma.cursos.create({
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

// Update
exports.updateCurso = async function (req, res) {
    try {
        const { id } = req.params;
        const { cost, descripcion, promedio, imagen, titulo, instructor } = req.body;

        const updatedCurso = await prisma.cursos.update({
            where: { idCurso: parseInt(id) },
            data: {
                cost,
                descripcion,
                promedio,
                imagen,
                titulo,
                instructor,
            },
        });

        res.json(updatedCurso);
    } catch (error) {
        console.error('Error al actualizar el curso:', error);
        res.status(500).json({ error: 'Error al actualizar el curso' });
    }
};

// Delete (Soft Delete)
exports.deleteCurso = async function (req, res) {
    try {
        const { id } = req.params;

        const deletedCurso = await prisma.cursos.update({
            where: { idCurso: parseInt(id) },
            data: { activo: false },
        });

        res.json(deletedCurso);
    } catch (error) {
        console.error('Error al eliminar el curso:', error);
        res.status(500).json({ error: 'Error al eliminar el curso' });
    }
};
