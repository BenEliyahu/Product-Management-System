const express = require('express');
const router = express.Router();
const Products = require('../models/Products');

router.post('/', async (req, res) => {
    const { name, code, description, type, marketingDate, image } = req.body;

    if (!Number.isInteger(code) || code < 0) {
        console.log('Failed to add product: Invalid code');
        return res.status(400).json({ message: 'Code must be a positive integer or zero' });
    }

    const existingProduct = await Products.findOne({ code });
    if (existingProduct) {
        console.log('Failed to add product: Product with the same code already exists');
        return res.status(400).json({ message: 'Product with the same code already exists' });
    }

    try {
        const product = new Products({
            name,
            code,
            description,
            type,
            marketingDate,
            image,
        });

        await product.save();
        console.log('Product added successfully:');
        res.status(201).send(product);
    } catch (err) {
        console.error('Failed to add product:', err);
        res.status(500).json({ error: 'Failed to create product. Please try again later.' });
    }
});

module.exports = router;
