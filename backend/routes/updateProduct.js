const express = require('express');
const router = express.Router();
const Products = require('../models/Products');

router.put('/:id', async (req, res) => {
    try {
        const { code } = req.body;

        if (!Number.isInteger(code) || code < 0) {
            return res.status(400).json({ message: 'Code must be a positive integer or zero' });
        }

        const existingProduct = await Products.findOne({ code });
        if (existingProduct && existingProduct._id.toString() !== req.params.id) {
            return res.status(400).json({ message: 'Product with the same code already exists' });
        }

        const product = await Products.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!product) {
            console.log('Product not found');
            return res.status(404).send('Product not found');
        }

        console.log(`Product updated!`);
        res.send('Product updated successfully');
    } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).send(`Error updating product: ${err.message}`);
    }
});

module.exports = router;
