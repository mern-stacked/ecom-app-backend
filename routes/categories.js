const express = require('express');
const categoryController = require('../controllers/categories');
const router = express.Router();

// Create Categories
router.post('/', categoryController.createCategories);

// List Categories
router.get('/list', categoryController.listCategories);

// List Category By Id
router.get('/list/:cid', categoryController.listCategoryById);

// Update Category By Id
router.put('/update/:cid', categoryController.updateCategory);

//Delete Category bu Id
router.delete('/delete/:cid', categoryController.deleteCategory);


module.exports = router;
