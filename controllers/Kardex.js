const { PrismaClient, sql } = require('@prisma/client');
const prisma = new PrismaClient();


exports.sp_ObtenerKardex = async function (req, res) {
    const { _alumno, _fecha_inicio, _fecha_fin, _categoria, _cursos_terminados, _cursos_activos } = req.body;
    try {
        const kardex = await prisma.kardex.findMany({
            where: {
                alumno: _alumno,
                categoria: {
                    equals: _categoria,
                    equals: -1,
                },
                termino_curso: {
                    equals: _cursos_terminados,
                    equals: -1,
                },
                activo: {
                    equals: _cursos_activos,
                    equals: -1,
                },
                OR: [
                    {
                        fecha_registro: {
                            equals: null,
                            lte: _fecha_fin,
                        },
                    },
                    {
                        fecha_registro: {
                            equals: null,
                            gte: _fecha_inicio,
                        },
                    },
                    {
                        fecha_registro: {
                            gte: _fecha_inicio,
                            lte: _fecha_fin,
                        },
                    },
                ],
            },
            select: {
                idCurso: true,
                alumno: true,
                imagen: true,
                titulo: true,
                promedio: true,
                nombre_instructor: true,
                fecha_registro: true,
                ultimo_ingreso: true,
                fecha_terminacion: true,
            },
        });
        kardex.forEach((curso) => {
            curso.imagen = Buffer.from(curso.imagen).toString('base64');
        });
        res.json(kardex);
    } catch (error) {
        console.error(error);
        throw new Error('Error retrieving kardex');
    }
};

exports.kardexSelect = async function (req, res) {
    const { id } = req.param;
    try {
        const cursosConAlumnos = await prisma.cursos.findMany({
            where: {
                cursoalumno: {
                    some: {
                        alumno: id,
                    },
                },
            },
            include: {
                cursoalumno: true,
                users: true,
            },
        });
        cursosConAlumnos.forEach((curso) => {
            curso.imagen = Buffer.from(curso.imagen).toString('base64');
            
        });
        res.json(cursosConAlumnos);
    } catch (error) {
        console.error(error);
        throw new Error('Error retrieving kardex');
    }
}