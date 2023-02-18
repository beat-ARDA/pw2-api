const express = require('express');
const app = express();
const productRoutes = require('./routes/products');

app.use(express.json());
app.use('/api', productRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
