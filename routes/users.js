const express = require('express');
const { check } = require('express-validator');

const userController = require('../controllers/users');
const requireAuth = require('../middlewares/requireAuth');

const router = express.Router();

// Fetch all users
router.get('/', requireAuth, userController.fetchUsers); 

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

// Login a new user
router.post('/login', 
            [
              check('email')
                .not()
                .isEmpty(),
              check('password')
              .not()
              .isEmpty(),
            ],
userController.login);

module.exports = router;