const express = require('express');
const categoryController = require('../controllers/categories');
const router = express.Router();

// Create Categories
router.post('/', categoryController.createCategories);

// List Categories
router.get('/list', categoryController.listCategories);

// List Category By Id
router.get('/list/:id', categoryController.listCategoriesById);

//Delete Category bu Id
router.delete('/:id', categoryController.deleteCategory);


module.exports = router;
