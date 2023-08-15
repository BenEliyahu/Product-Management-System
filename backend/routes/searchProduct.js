const express = require('express');
const router = express.Router();
const Products = require('../models/Products');

router.get('/:search', async (req, res) => {
    const searchQuery = req.params.search;
    
    try {
        const products = await Products.find({
            name: { $regex: new RegExp(searchQuery, 'i') } 
        });
        
        if (products.length === 0) {
            return res.json([{ _id: "no-matching-item", name: "No matching items found" }]);
        }
        
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: `Error searching for products: ${err.message}` });
    }
});


module.exports = router;
