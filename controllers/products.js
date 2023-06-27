const Product = require('../models/products');

// Create a Product
const createProducts = async (req, res, next) => {

    const { name, description, richDescription, image, images, brand, price, category, countInStock, rating, numReviews, isFeatured, dateCreated } = req.body;

    if(!category) return res.status(500).send('Invalid Category');
    
    const product = new Product({
        name,
        description,
        richDescription,
        image,
        images,
        brand,
        price,
        category,
        countInStock,
        rating,
        numReviews,
        isFeatured,
        dateCreated,
    }); 

    
    try{
       await product.save();
       res.status(200).json(product) 
    } catch (err) {
      res.status(500).json({
          error: err,
          success: false
      })
    }

}

// List Products
const listProducts = async (req, res, next) => {

   try{
     let products = await Product.find();
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