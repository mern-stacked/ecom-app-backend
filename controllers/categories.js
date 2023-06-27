const Category = require('../models/category')

// Create Categories
const createCategories = async (req, res, next) => {
    
    const { name, icon, color } = req.body;
    const category = new Category({ name, icon, color })
    
    try {
        const createdProduct = await category.save();
        res.status(201).json(createdProduct);
    } catch (err) {
        res.status(500).json({
            error: err,
            success: false
        })
    }
}


// List Categories
const listCategories = async (req, res, next) => {

    try{
        const categories = await Category.find()
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({
            error: err,
            success: false  
        })
    }
}

// List Category By Id
const listCategoryById = async (req, res, next) => {

    const categoryId = req.params.id;

    try{
        const category = await Category.findById(categoryId);
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({
            error: err,
            success: false  
        })
    }
}


//Update Category By Id   
const updateCategory = async (req, res, next) => {

    const categoryId = req.params.id;
    const { name, icon, color } = req.body;

    try{
        const category = await Category.findByIdAndUpdate(categoryId, { name, icon, color }, { new: true });
        
        if(category){
            res.send(category);
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

// Delete Category By Id
const deleteCategory = async (req, res, next) => {

    const categoryId = req.params.id;
    
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
        res.status(500).json({
            error: err,
            success: false
        })
    }
}

exports.createCategories = createCategories;
exports.listCategories = listCategories;
exports.listCategoryById = listCategoryById;
exports.updateCategory = updateCategory;
exports.deleteCategory = deleteCategory;