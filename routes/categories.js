const express = require('express');
const { check } =  require('express-validator');

const categoryController = require('../controllers/categories');
const requireAuth = require('../middlewares/requireAuth');

const router = express.Router();

// Create Categories
router.post('/', requireAuth,
            [
                check('name')
                 .not()
                 .isEmpty(),
                check('icon')
                 .not()
                 .isEmpty(),
                check('color')
                 .not()
                 .isEmpty(),
                check('image')
                 .not()
                 .isEmpty(),
            ],
            categoryController.createCategories
           );

// List Categories
router.get('/list', categoryController.listCategories);

// List Category By Id
router.get('/list/:cid', categoryController.listCategoryById);

// Update Category By Id
router.put('/update/:cid', requireAuth, categoryController.updateCategory);

//Delete Category bu Id
router.delete('/delete/:cid', requireAuth, categoryController.deleteCategory);

module.exports = router;
