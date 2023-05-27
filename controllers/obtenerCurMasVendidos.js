const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


exports.getCursoMasVendidos = async function (req, res) {
    try {
        const cursos = await prisma.cursos.findMany({
            select: {
                idCurso: true,
                cost: true,
                descripcion: true,
                promedio: true,
                imagen: true,
                titulo: true,
                activo: true,
                instructor: true,
                fecha_creacion: true,
                cantidadVendida: {
                    count: true,
                    _sum: {
                        cursoalumno: {
                            curso: true
                        }
                    }
                }
            },
            where: {
                activo: true
            },
            orderBy: {
                cantidadVendida: {
                    _count: 'desc'
                }
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