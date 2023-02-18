const Product = require('../models/products');

exports.findAll = (req, res) => {
    const products = Product.findAll();
    res.json(products);
};

exports.findById = (req, res) => {
    const id = req.params.id;
    const product = Product.findById(id);
    res.json(product);
};

exports.create = (req, res) => {
    const data = req.body;
    const product = Product.create(data);
    res.json(product);
};

exports.update = (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const product = Product.update(id, data);
    res.json(product);
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Product.delete(id);
    res.json({ message: 'Producto eliminado con éxito' });
};