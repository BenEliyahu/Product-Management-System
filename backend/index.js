require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const getProducts = require('./routes/getProducts')
const createProduct = require('./routes/createProduct')
const updateProduct = require('./routes/updateProduct')
const deleteProduct = require('./routes/deleteProduct')
const getProductById = require('./routes/getProductById')
const searchProduct = require('./routes/searchProduct')
const cors = require("cors");

app.use(cors());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
app.use(express.json())

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});



app.use('/product', getProducts)
app.use('/product', createProduct)
app.use('/product', updateProduct)
app.use('/product', deleteProduct)
app.use('/searchProduct', searchProduct)
app.use('/product', getProductById)





app.listen(3100, ()=>console.log('server started in port 3100'))