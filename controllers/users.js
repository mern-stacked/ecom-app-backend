const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');

// Import Models
const User = require('../models/users');

// Fetch all users
const fetchUsers = async (req, res, next) => {

    try{
       const users = await User.find();
       res.status(201).send(users);
    } catch(err){
       const error = new HttpError('No users found.', 500, false );
       return next(error);
    }

}

// Register a user
const signUp = async (req, res, next) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return next (
            new HttpError('Please fill in the required fields!', 422, false )
        );
    }

    const { name, email, password, phone, isAdmin, street, apartment, city, zip, country } = req.body;

    let userExists;
    try{
       userExists = await User.findOne({ email });
    } catch(err){
        const error = new HttpError('Registration failed', 500, false);
        return next(error);
    }

    if(userExists){
        const error = new HttpError('User exists already, Please Login instead', 422, false);
        return next(error);
    }

    const createdUser = new User({ name, email, password, phone, isAdmin, street, apartment, city, zip, country });

    try{
        await createdUser.save();
        const token = jwt.sign({ userId: createdUser._id }, 'MY_SECRET_KEY' );
        res.status(201).json( {  user: createdUser.toObject({ getters: true }), token } );
    } catch (err) {
        const error = new HttpError('User Registeration Failed', 500, false);
        return next(error);
    }

}

exports.signUp = signUp;
exports.fetchUsers = fetchUsers;