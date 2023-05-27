const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const fs = require('fs');

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

        const course = await prisma.cursos.findUnique({
            where: { idCurso: parseInt(id) }
        });

        const levels = await prisma.nivelcurso.findMany({
            where: { curso: parseInt(id) }
        });

        const sections = await prisma.secciones.findMany({
            where: { curso_id: parseInt(id) }
        });

        sections.forEach((section) => {
            if (section.contenido) {
                section.contenido = Buffer.from(section.contenido).toString('base64');
            }
        });

        if (!course) {
            return res.status(404).json({ error: 'Curso no encontrado' });
        }
        res.json({ course, levels, sections });

    } catch (error) {
        console.error('Error al obtener curso por ID:', error);
        res.status(500).json({ error: 'Error al obtener curso por ID' });
    }
};

exports.createCourseAlumn = async function (req, res) {
    try {

        const { id } = req.params;

        const { alumno, cantidad_pagada, compro_completo, forma_pago, idLevels, idSeccions, levels, termino_curso } = req.body;

        const arrIdLevels = JSON.parse(idLevels);
        const arrIdSeccions = JSON.parse(idSeccions);
        const arrLevels = JSON.parse(levels);

        const courseStudent = await prisma.cursoalumno.findFirst({
            where: { curso: parseInt(id), alumno: parseInt(alumno) },
            // select: {
            //     curso: true, // Incluir la columna1 en los resultados
            //     alumno: true, // Incluir la columna2 en los resultados
            // },
        });

        const nivelescursoalumno = await prisma.nivelcursoalumno.findMany({
            where: { curso: parseInt(id), alumno: parseInt(alumno) },
        });

        const seccionescursoalumno = await prisma.seccioncursoalumno.findMany({
            where: { curso: parseInt(id), alumno: parseInt(alumno) },
        });

        const idsnca = nivelescursoalumno.map(registro => registro.idNivelCursoAlumno);
        const idssca = seccionescursoalumno.map(registro => registro.id_seccion_curso_alumno);

        // if (courseStudent) {
        //     let cantidad_pagada = 0;

        //     $cantidad_pagada = $cantidad_pagada + ;

        //     $CursoAlumno -> cantidad_pagada = floatval($CursoAlumno -> cantidad_pagada) + floatval($cantidad_pagada);
        // }

        //ELIMINAR 
        if (courseStudent)
            await prisma.cursoalumno.delete({
                where: {
                    idCursoAlumno: parseInt(courseStudent.idCursoAlumno), // ID del registro a eliminar
                }
            });

        prisma.nivelcursoalumno.deleteMany({
            where: {
                idNivelCursoAlumno: {
                    in: idsnca, // Condición de identificadores
                },
            },
        });

        prisma.seccioncursoalumno.deleteMany({
            where: {
                id_seccion_curso_alumno: {
                    in: idsnca, // Condición de identificadores
                },
            },
        });

        const create = await prisma.cursoalumno.create({
            data: {
                curso: parseInt(id),
                alumno: parseInt(alumno),
                compro_completo: parseInt(compro_completo),
                termino_curso: parseInt(termino_curso),
                forma_pago: forma_pago,
                cantidad_pagada: parseFloat(cantidad_pagada)
            }
        });

        arrIdLevels.map(async (idLevel) => {

            let idLevell = idLevel.idNivelCurso;

            const nca = await prisma.nivelcursoalumno.create({
                data: {
                    nivel: parseInt(idLevell),
                    alumno: parseInt(alumno),
                    termino: 0,
                    curso: parseFloat(id),
                }
            });

            arrIdSeccions.map(async (idSeccion) => {

                if (idSeccion.nivel == idLevell) {
                    await prisma.seccioncursoalumno.create({
                        data: {
                            nivel: parseInt(idLevell),
                            alumno: parseInt(alumno),
                            seccion: idSeccion.idSecciones,
                            curso: parseFloat(id),
                        }
                    });
                }
            });
        });

        res.json(create);

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

        const arreglo = Object.values(cursos);

        arreglo.forEach((course) => {
            course.imagen = Buffer.from(course.imagen).toString('base64');
        })

        res.json({ cursos: cursos });
    } catch (error) {
        console.error('Error al obtener cursos activos:', error);
        res.status(500).json({ error: 'Error al obtener cursos activos' });
    }
};

// Create
exports.createCurso = async function (req, res) {

    const imagePath = req.files.imagen[0].path;

    const imageBuffer = fs.readFileSync(imagePath);

    const { costo, titulo, descripcion, instructor, categorias, levels, sections } = req.body;

    let arrLevels = JSON.parse(levels);
    let arrSections = JSON.parse(sections);

    arrSections.forEach((section) => {
        if (section.contenido) {
            const binaryData = Buffer.from(section.contenido, 'base64');
            const path = 'uploads/video.mp4';
            fs.writeFile(path, binaryData, 'binary', function (err) {
                if (err) {
                    console.error('Error al mover el archivo:', err);
                    return;
                }
                console.log('Archivo movido correctamente');
                section.contenido = path;
            });
        }
        else if (section.archivo) {
            if (section.archivo) {
                const binaryData = Buffer.from(section.archivo, 'base64');

                section.archivo = binaryData;
            }
        }
    });

    try {

        const curso = await prisma.cursos.create({
            data: {
                cost: parseInt(costo),
                descripcion: descripcion,
                imagen: imageBuffer,
                titulo: titulo,
                instructor: parseInt(instructor)
            }
        });

        let idCurso = curso.idCurso;

        ////////////////////////////
        //         INSERTAR CATEGORIAS
        ///////////////////////////

        categorias.forEach(async (categoria) => {
            const cat = await prisma.categoriascursos.create({
                data: {
                    curso: parseInt(idCurso),
                    categoria: parseInt(categoria)
                }
            });
        });

        arrLevels.forEach(async (level) => {
            const nivel = await prisma.nivelcurso.create({
                data: {
                    curso: parseInt(idCurso),
                    costo: parseInt(level.costo),
                    titulo: level.titulo
                }
            });

            arrSections.forEach(async (section) => {
                if (level.idLevel == section.level) {
                    await prisma.secciones.create({
                        data: {
                            nivel: parseInt(nivel.idNivelCurso),
                            titulo: section.titulo,
                            contenido: section.archivo,
                            idUsuario: parseInt(instructor),
                            video: section.contenido,
                            link: section.link,
                            curso_id: parseInt(idCurso),
                            mime: section.mime,
                        }
                    });
                }
            });
        });

        res.status(200).json("curso creado correctamente");
    }
    catch (error) {
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
