const express = require('express')
const router = express.Router()
let Products = require('../models/Products')


router.get('/', async(req, res)=>{
    try{
        const response = await Products.find()
        res.json(response)
    }
    catch(err){
        res.status(500).send(`Error adding product: ${err.message}`);
    }

})
module.exports = router;