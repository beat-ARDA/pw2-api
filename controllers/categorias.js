const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const categoria = prisma.categorias;

exports.getAll = async function (req, res) {

    try {
        const categorias = await categoria.findMany();
        res.json(categorias);
    } catch (error) {
        console.error('Error al listar categorías:', error);
        res.status(500).json({ error: 'Error al listar categorías' });
    }
}

exports.findById = async (req, res)=> {
    const { id } = req.params;
    try {
        const categoriaEncontrada = await categoria.findUnique({
            where: { idCategoria: parseInt(id)}
        });

        if (!categoriaEncontrada) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }

        res.json(categoriaEncontrada);
    } catch (error) {
        console.error('Error al buscar la categoría:', error);
        res.status(500).json({ error: 'Error al buscar la categoría' });
    }
}

exports.Register = async (req, res) => {
    var nombre = req.body.nombre;
    var descripcion = req.body.descripcion;
    console.log(nombre , descripcion);

    try {

        await categoria.create({
            data: {
                nombre: nombre,
                descripcion: descripcion
            }
        });

        let response = { "status": 200, "message": 'Usuario registrado con exito!' }

        res.json(response);
    }
    catch (error) { console.log(error) }
    finally { await prisma.$disconnect(); }
}


exports.Update = async function (req, res) {
    try {
        const { id } = req.params;
        const { descripcion, nombre } = req.body;

        // Actualizar la categoría en la base de datos
        const categoriaActualizada = await categoria.update({
            where: { idCategoria: parseInt(id) },
            data: {
                descripcion,
                nombre
            }
        });

        res.json(categoriaActualizada);
    } catch (error) {
        console.error('Error al actualizar la categoría:', error);
        res.status(500).json({ error: 'Error al actualizar la categoría' });
    } finally { await prisma.$disconnect(); }
}

exports.Delete = async function (req, res) {
    try {
        const { id } = req.params;

        // Realizar la baja lógica de la categoría en la base de datos
        const categoriaEliminada = await categoria.update({
            where: { idCategoria: parseInt(id)},
            data: {
                activo: false
            }
        });

        res.json({ message: 'Categoría eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar la categoría:', error);
        res.status(500).json({ error: 'Error al eliminar la categoría' });
    }
}



