const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


exports.getCursoMasReciente = async function (req, res) {
    try {
        const cursos = await prisma.curso.findMany({
            where: {
                activo: true
            },
            orderBy: {
                fecha_creacion: 'desc'
            },
            select: {
                idCurso: true,
                cost: true,
                descripcion: true,
                promedio: true,
                imagen: true,
                titulo: true,
                activo: true,
                instructor: true,
                fecha_creacion: true
            }
        });

        cursos.forEach((curso) => {
            curso.imagen = Buffer.from(curso.imagen).toString('base64');
        });

        res.json(cursos);
    } catch (error) {
        console.error('Error al obtener cursos:', error);
        res.status(500).json({ error: 'Error al obtener cursos' });
    }
};


