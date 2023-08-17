const { validationResult } =  require('express-validator');
const mongoose = require('mongoose');

// Import Custom Error Model
const HttpError = require('../models/http-error'); 

// Import Models
const Product = require('../models/products');
const Category = require('../models/category');

// Create a Product
const createProducts = async (req, res, next) => {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        const error = new HttpError('Please fill in the required fields', 422, false);
        return next(error);  
    }

    const file = req.file;

    if(!file) {
        const error = new HttpError('Please import the product image', 400, false);
        return next(error); 
    }

    const fileName = req.file.filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

    const { name, description, richDescription, images, brand, price, category, countInStock, rating, numReviews, isFeatured, dateCreated } = req.body;

    const categoryFound = await Category.findById(category);

    if(!categoryFound) {
        const error = new HttpError('Invalid Category', 400, false);
        return next(error);  

    }

    const product = new Product({ name, description, richDescription, image: `${basePath}${fileName}`, images, brand, price, category, countInStock, rating, numReviews, isFeatured, dateCreated }); 

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
  const { name, description, richDescription, images, brand, price, category, countInStock, rating, numReviews, isFeatured, dateCreated } = req.body;
 
  // Invalid Product Id
  if(!mongoose.isValidObjectId(ProductId)) {
    const error = new HttpError('Invalid Product Id', 400, false);
    return next(error); 
  }

  // Invalid Category
 const categoryFound = await Category.findById(category);
 if(!categoryFound) {
   const error = new HttpError('Invalid Category', 400, false);
   return next(error); 
 }
   // Invalid Product
   const product = await Product.findById(ProductId);
   if(!product) {
     const error = new HttpError('Invalid Product', 400, false);
     return next(error); 
   }

   //Update Image
   const file = req.file;
   let imagePath; 

   if(file){
     const fileName = file.filename;
     const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
     imagePath = `${basePath}${fileName}`
   } else {
    imagePath = product.image;
   }

  
    const updatedProduct = await Product.findByIdAndUpdate( ProductId,
    { name, description, richDescription, image: `${imagePath}`, images, brand, price, category, countInStock, rating, numReviews, isFeatured, dateCreated },
    { new: true });
      
    if(!updatedProduct) {
        return res.status(500).json({ success: false, message: 'The product cannot be updated.'})
    }   
    res.send(updateProduct);

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

 // Upload Multiple Gallery images 
  const uploadMultipleGalleryImages = async (req, res, next) => {

    const ProductId = req.params.pid;
   
        // Invalid Product Id
    //    if(!mongoose.isValidObjectId(req.params.id)) {
    //     const error = new HttpError('Invalid Product Id', 400, false);
    //     return next(error); 
    //   }

  const files = req.files;
  let imagesPath = [];
  const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

    if(files){
        files.map(file => {
            imagesPath.push(`${basePath}${file.filename}`)
        })
    }

    const product = await Product.findByIdAndUpdate( ProductId,
    { images: imagesPath },
    { new: true });

    if(!product) return res.status(500).json({ success: false, message: 'The product cannot be updated.'})
            
    res.send(product);

}


exports.createProducts = createProducts;
exports.listProducts = listProducts;
exports.listProductById = listProductById;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
exports.productCount = productCount;
exports.featuredProducts = featuredProducts;
exports.uploadMultipleGalleryImages = uploadMultipleGalleryImages;