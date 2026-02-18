const { Product } = require('../models');

// GET /api/products
const getAllProducts = async (req, res) => {
    try {
        const { category } = req.query;
        const where = category ? { category } : {};
        const products = await Product.findAll({ where });
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
};

// GET /api/products/:id
const getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found.' });
        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
};

// POST /api/admin/products
const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock, image } = req.body;
        if (!name || !price) return res.status(400).json({ message: 'Name and price are required.' });
        const product = await Product.create({ name, description, price, category, stock, image });
        res.status(201).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
};

// PUT /api/admin/products/:id
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found.' });
        await product.update(req.body);
        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
};

// DELETE /api/admin/products/:id
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found.' });
        await product.destroy();
        res.json({ message: 'Product deleted.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
};

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
