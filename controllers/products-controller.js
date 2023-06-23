const Product = require('../models/products');

// Create a Product
const createProducts = async (req, res, next) => {

    const { name, image, countInStock } = req.body;

    const product = new Product({
        name,
        image,
        countInStock
    }); 

    product.save().then((createProduct) => {
        res.status(201).json(createProduct)
    }).catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        })
    })

}

// List Products
const listProducts = async (req, res, next) => {
   
   let products; 

   try{
     products = await Product.find()
     res.status(200).json(products);
   }catch(err){
    res.status(500).json({
        error: err,
        success: false
    })
   }

}

exports.createProducts = createProducts;
exports.listProducts = listProducts;