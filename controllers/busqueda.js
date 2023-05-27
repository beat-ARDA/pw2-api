const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


exports.buscarCursosPorNombre = async function (req,res) {
    const {nombre} = req.body; 
    try {
        const cursos = await prisma.cursos.findMany({
            where: {
                titulo: {
                    contains: nombre
                }
            }
        });
        cursos.forEach((curso) => {
            curso.imagen = Buffer.from(curso.imagen).toString('base64');
        });
        res.json(cursos);
        
    } catch (error) {
        throw new Error('Error al buscar cursos por nombre');
    }
};
