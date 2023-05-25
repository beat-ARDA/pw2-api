const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const categoria = prisma.categoria;

exports.getAll = async function (req, res) {

    try {
        const categorias = await categoria.findMany();
        res.json(categorias);
    } catch (error) {
        console.error('Error al listar categorías:', error);
        res.status(500).json({ error: 'Error al listar categorías' });
    }
}

exports.findById = async function (req, res) {
    try {
        const { id } = req.params;
        const categoriaEncontrada = await categoria.findUnique({
            where: { idCategoria: id }
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

exports.Register = async function (req, res) {
    try {
        const { descripcion, nombre } = req.body;

        // Crear la nueva categoría en la base de datos
        const nuevaCategoria = await categoria.create({
            data: {
                descripcion,
                nombre,
                fecha: new Date()
            }
        });

        res.json(nuevaCategoria);
    } catch (error) {
        console.error('Error al crear la categoría:', error);
        res.status(500).json({ error: 'Error al crear la categoría' });
    }
}

exports.Update = async function (req, res) {
    try {
        const { id } = req.params;
        const { descripcion, nombre } = req.body;

        // Actualizar la categoría en la base de datos
        const categoriaActualizada = await categoria.update({
            where: { idCategoria: id },
            data: {
                descripcion,
                nombre
            }
        });

        res.json(categoriaActualizada);
    } catch (error) {
        console.error('Error al actualizar la categoría:', error);
        res.status(500).json({ error: 'Error al actualizar la categoría' });
    }
}

exports.Delete = async function (req, res) {
    try {
        const { id } = req.params;

        // Realizar la baja lógica de la categoría en la base de datos
        const categoriaEliminada = await categoria.update({
            where: { idCategoria: id },
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



