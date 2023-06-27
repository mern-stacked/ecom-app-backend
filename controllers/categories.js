const Category = require('../models/category')

// List Categories
const listCategories = async (req, res, next) => {

    try{
        const products = await Category.find()
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({
            error: err,
            success: false  
        })
    }
}

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

// Delete Category By Id
const deleteCategory = async (req, res, next) => {

    const categoryId = req.params.id;
    
    try{
        const category = await Category.findByIdAndRemove(categoryId);
        
        if(category){
            return res.status(200).json({
                success: true, 
                message: 'The category is deleted'
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

exports.listCategories = listCategories;
exports.createCategories = createCategories;
exports.deleteCategory = deleteCategory;