const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Crear un comentario
exports.createComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { texto, postId } = req.body;

        const comentario = await prisma.comentario.create({
            data: {
                texto,
                id,
                postId,
            },
        });

        res.status(201).json(comentario);
    } catch (error) {
        console.error('Error al crear el comentario:', error);
        res.status(500).json({ error: 'Error al crear el comentario' });
    }
};

// Obtener todos los comentarios
exports.getAllComments = async (req, res) => {
    try {
        const comentarios = await prisma.comentario.findMany();
        res.status(200).json(comentarios);
    } catch (error) {
        console.error('Error al obtener los comentarios:', error);
        res.status(500).json({ error: 'Error al obtener los comentarios' });
    }
};

// Obtener un comentario por su ID
exports.getCommentById = async (req, res) => {
    try {
        const { id } = req.params;

        const comentario = await prisma.comentario.findUnique({
            where: {
                id,
            },
        });

        if (!comentario) {
            return res.status(404).json({ error: 'Comentario no encontrado' });
        }

        res.status(200).json(comentario);
    } catch (error) {
        console.error('Error al obtener el comentario:', error);
        res.status(500).json({ error: 'Error al obtener el comentario' });
    }
};

// Actualizar un comentario
exports.updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { texto } = req.body;

        const comentario = await prisma.comentario.update({
            where: {
                id,
            },
            data: {
                texto,
            },
        });

        res.status(200).json(comentario);
    } catch (error) {
        console.error('Error al actualizar el comentario:', error);
        res.status(500).json({ error: 'Error al actualizar el comentario' });
    }
};

// Eliminar un comentario
exports.deleteComment = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.comentario.delete({
            where: {
                id,
            },
        });

        res.status(200).json({ message: 'Comentario eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el comentario:', error);
        res.status(500).json({ error: 'Error al eliminar el comentario' });
    }
};
