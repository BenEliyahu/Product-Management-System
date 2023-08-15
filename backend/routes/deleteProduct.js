const express = require('express');
const router = express.Router();
const Products = require('../models/Products');

router.delete('/:id', async (req, res) => {
    try {
        const product = await Products.findByIdAndDelete(req.params.id);
        if (!product) {
            console.log('Product not found');
            return res.status(404).send('Product not found');
        }

        console.log('Product deleted:');
        res.send('Product deleted');
    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).send('Error deleting product');
    }
});

module.exports = router;
