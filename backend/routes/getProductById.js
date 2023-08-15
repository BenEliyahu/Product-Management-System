const express = require('express')
const router = express.Router()
let Products = require('../models/Products')


router.get('/:id', async (req, res) => {
    console.log(req.params.id)
    try {
        const product = await Products.findById(req.params.id)
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.json(product);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(`Error updating product: ${err.message}`);
    }

})
module.exports = router;