const { validationResult } =  require('express-validator');

const HttpError = require('../models/http-error'); 
const Category = require('../models/category')

// Create Categories
const createCategories = async (req, res, next) => {

    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return next (
            new HttpError('Inputs cannot be empty!', 422)
        );
    }
    
    const { name, icon, color, image } = req.body;  

    const category = new Category({ name, icon, color, image });
    
    try {
        const createdProduct = await category.save();
        res.status(201).json(createdProduct);
    } catch (err) {
        const error = new HttpError('Creation of a category failed', 500, false);
        return next(error);
    }
}


// List Categories
const listCategories = async (req, res, next) => {

    try{
        const categories = await Category.find()
        res.status(200).json(categories);
    } catch (err) {
        const error = new HttpError('Failed to fetch the categories', 500, false);
        return next(error);
    }
}

// List Category By Id
const listCategoryById = async (req, res, next) => {

    const categoryId = req.params.cid;

    try{
        const category = await Category.findById(categoryId);
        // check to find whether the category id entered exists or fake generated one
        if(category){
            res.send(category);  // If cid exists/ not fake, return that category
        } else {
            res.status(404).json({ // If cid doesnot exist / fake, throw error
                message: 'Category doesnot exist.',
                success: false,
          })
        }
     } catch (err) {  // If the categoryId not a mongo format id or shortened.
        const error = new HttpError('Category not found', 500, false);
        return next(error);
     }
}


//Update Category By Id   
const updateCategory = async (req, res, next) => {

    const categoryId = req.params.cid;
    const { name, icon, color } = req.body;

    try{
        const category = await Category.findByIdAndUpdate(categoryId, { name, icon, color }, { new: true });
        
        if(category){
            res.send(category);
        } else {
            res.status(404).json({
                message: 'No category found to update.',
                success: false,
           })
         }

    } catch (err) {
        const error = new HttpError('Category not found', 500, false);
        return next(error);
    }

}

// Delete Category By Id
const deleteCategory = async (req, res, next) => {

    const categoryId = req.params.cid;
    
    try{
        const category = await Category.findByIdAndRemove(categoryId);
        
        if(category){
            return res.status(200).json({
                success: true, 
                message: 'Delete Successfull'
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'No category found to delete'
            })
        }

    } catch(err){
        const error = new HttpError('Category not found', 500, false);
        return next(error);
    }
}

exports.createCategories = createCategories;
exports.listCategories = listCategories;
exports.listCategoryById = listCategoryById;
exports.updateCategory = updateCategory;
exports.deleteCategory = deleteCategory;