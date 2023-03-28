const express = require('express');
const app = express();
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/user');
const cors = require('cors');
const { LogInPassword } = require('./models/users');

app.use(express.json());
app.use(cors({
    origin: '*'
}));
app.use('/api', productRoutes);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
