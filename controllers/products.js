const { validationResult } =  require('express-validator');

const HttpError = require('../models/http-error'); 

const Product = require('../models/products');
const Category = require('../models/category');

// Create a Product
const createProducts = async (req, res, next) => {

    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return next (
            new HttpError('Inputs cannot be empty!', 422)
        );
    }

    const { name, description, richDescription, image, images, brand, price, category, countInStock, rating, numReviews, isFeatured, dateCreated } = req.body;

    const categoryFound = await Category.findById(category);

    if(!categoryFound) {
        const error = new HttpError('Invalid Category', 500, false);
        return next(error);    }

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
       const error = new HttpError('Creation of a Product failed', 500, false);
        return next(error);
    }

}

// List Products
const listProducts = async (req, res, next) => {

   let categoryFilter = {}; 
   // filter and fetch products by category using query params
   if(req.query.categories){
    categoryFilter = { category: req.query.categories.split(',') }
   }

   try{
     const products = await Product.find(categoryFilter).populate('category');
     res.status(200).json(products);
   }catch(err){
    res.status(500).json({
        error: err,
        success: false
    })
   }

}

// List Products By Id
const listProductById = async (req, res, next) => {

    const productId = req.params.pid;

   try{
     const product = await Product.findById(productId).populate('category');
     // check to find whether the product id entered exists or fake generated one
     if(product){
        res.send(product);  // If pid exists/ not fake, return that product
    } else {
        res.status(404).json({ // If pid doesnot exist / fake, throw error
            message: 'Product doesnot exist.',
            success: false,
      })
    }
   } catch(err){
        const error = new HttpError('Product not found', 500, false);
        return next(error);
   }

}

//Update Product By Id   
const updateProduct = async (req, res, next) => {

  const ProductId = req.params.pid;
  const { name, description, richDescription, image, images, brand, price, category, countInStock, rating, numReviews, isFeatured, dateCreated } = req.body;

  const categoryFound = await Category.findById(category);
  if(!categoryFound) return res.status(500).send('Invalid Category');

  try{
      const product = await Product.findByIdAndUpdate( ProductId,
         { name, description, richDescription, image, images, brand, price, category, countInStock, rating, numReviews, isFeatured, dateCreated },
         { new: true });
      
      if(product){
          res.send(product);
      } else {
          res.status(404).json({
          success: false,
          message: 'No product found to update.'
      })
  }

  } catch (err) {
        const error = new HttpError('Product not found', 500, false);
        return next(error);
  }

}

// Delete Product By Id
const deleteProduct = async (req, res, next) => {

    const productId = req.params.pid;
    
    try{
        const product = await Product.findByIdAndRemove(productId);
        
        if(product){
            return res.status(200).json({
                success: true, 
                message: 'Delete Successfull'
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'No product found to delete'
            })
        }

    } catch(err){
        const error = new HttpError('Product not found', 500, false);
        return next(error);
    }
}

// Fetch Product Count
const productCount = async (req, res, next) => {

    try{
        const productCount = await Product.countDocuments();

        if(productCount){
            res.status(200).send({productCount})
        }

    } catch(err) {
        const error = new HttpError('No Products Found', 500, false);
        return next(error);
    }
 
 }

 // Fetch featured product
const featuredProducts = async (req, res, next) => {

    const count = req.params.count ? req.params.count : 0;

    try{
        const featProducts = await Product.find({ isFeatured : true }).limit(+count);

        if(featProducts){
            res.status(200).send({featProducts})
        }
        
    } catch(err) {
        const error = new HttpError('No Featured Products Found', 500, false);
        return next(error);
    }
 
 }

exports.createProducts = createProducts;
exports.listProducts = listProducts;
exports.listProductById = listProductById;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
exports.productCount = productCount;
exports.featuredProducts = featuredProducts;