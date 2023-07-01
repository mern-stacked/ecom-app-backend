const Product = require('../models/products');
const Category = require('../models/category');

// Create a Product
const createProducts = async (req, res, next) => {

    const { name, description, richDescription, image, images, brand, price, category, countInStock, rating, numReviews, isFeatured, dateCreated } = req.body;

    const categoryFound = await Category.findById(category);
    if(!categoryFound) return res.status(500).send('Invalid Category');

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
     const products = await Product.find().populate('category');
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
     res.status(200).json(product);
   }catch(err){
    res.status(500).json({
        error: err,
        success: false
    })
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
         {
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
        },
        { new: true });
      
      if(product){
          res.send(product);
      } else {
          res.status(404).json({
          success: false,
          message: 'No category found to update.'
      })
  }

  } catch (err) {
      res.status(500).json({
          error: err,
          success: false
      })
  }

}


exports.createProducts = createProducts;
exports.listProducts = listProducts;
exports.listProductById = listProductById;
exports.updateProduct = updateProduct;