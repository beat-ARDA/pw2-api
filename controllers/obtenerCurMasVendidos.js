const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


exports.getCursoMasVendidos = async function (req, res) {
    try {
        const cursosMasVendidos = await prisma.cursos.findMany({
            select: {
                idCurso: true,
                cantidadVendida: {
                    count: { curso: true }
                },
                cost: true,
                descripcion: true,
                promedio: true,
                imagen: true,
                titulo: true,
                activo: true,
                instructor: true,
                fecha_creacion: true
            },
            where: {
                activo: 1
            },
            groupBy: {
                idCurso: true,
                cost: true,
                descripcion: true,
                promedio: true,
                imagen: true,
                titulo: true,
                activo: true,
                instructor: true,
                fecha_creacion: true
            },
            orderBy: {
                cantidadVendida: {
                    desc: true
                }
            }
        });



        res.json(cursosMasVendidos);
    } catch (error) {
        console.error('Error al obtener cursos:', error);
        res.status(500).json({ error: 'Error al obtener cursos' });
    }
};