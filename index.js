const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users.js');
const categoriasRoutes = require('./routes/categorias.js')
const cursoRoutes = require('./routes/cursos.js')
const comentariosRoutes = require('./routes/comentarios.js')

const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/api', productRoutes);
app.use('/api', userRoutes);
app.use('/api', categoriasRoutes);
app.use('/api', cursoRoutes);
app.use('/api', comentariosRoutes);
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    res.json({ message: '¡Hola desde tu API!' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
