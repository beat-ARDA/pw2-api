const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAll = async function (req, res) {
    try {
        const cursos = await prisma.curso.findMany();
        res.json(cursos);
    } catch (error) {
        console.error('Error al obtener cursos:', error);
        res.status(500).json({ error: 'Error al obtener cursos' });
    }
};

exports.getById = async function (req, res) {
    try {
        const { id } = req.params;
        const curso = await prisma.curso.findUnique({
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
        const cursos = await prisma.curso.findMany({
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

        const curso = await prisma.curso.create({
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
        const cursos = await prisma.curso.findMany();
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
        const curso = await prisma.curso.findUnique({
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

// Update
exports.updateCurso = async function (req, res) {
    try {
        const { id } = req.params;
        const { cost, descripcion, promedio, imagen, titulo, instructor } = req.body;

        const updatedCurso = await prisma.curso.update({
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

        const deletedCurso = await prisma.curso.update({
            where: { idCurso: parseInt(id) },
            data: { activo: false },
        });

        res.json(deletedCurso);
    } catch (error) {
        console.error('Error al eliminar el curso:', error);
        res.status(500).json({ error: 'Error al eliminar el curso' });
    }
};
