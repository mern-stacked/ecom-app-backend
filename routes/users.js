const express = require('express');
const { check } = require('express-validator');

const userController = require('../controllers/users');
const router = express.Router();

// Fetch all users
router.get('/', userController.fetchUsers); 

// Register a new user
router.post('/register',
            [
                check('name')
                 .not()
                 .isEmpty(),
                check('email')
                  .not()
                  .isEmpty(),
                check('phone')
                  .not()
                  .isEmpty(),
                check('password')
                 .not()
                 .isEmpty(),
            ],
            userController.signUp);

module.exports = router;