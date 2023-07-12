const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');

// Import Models
const User = require('../models/users');

// Fetch all users
const fetchUsers = async (req, res, next) => {

    try{
       const users = await User.find().select('-password');
       res.status(201).send(users);
    } catch(err){
       const error = new HttpError('No users found.', 500, false );
       return next(error);
    }
}

// Fetch user by id
const fetchUserById = async (req, res, next) => {

    try{
       const users = await User.findById(req.params.uid).select('-password');
       res.status(201).send(users);
    } catch(err){
       const error = new HttpError('No users found.', 500, false );
       return next(error);
    }

}

// Register a user
const signUp = async (req, res, next) => {

    const errors = validationResult(req);
    const secret = process.env.SECRET_KEY;

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
        const token = jwt.sign({ userId: createdUser._id }, secret, { expiresIn: '1d'} );
        res.status(201).json( {  user: createdUser.toObject({ getters: true }), token } );
    } catch (err) {
        const error = new HttpError('User Registeration Failed', 500, false);
        return next(error);
    }

}

// Login a user
const login = async (req, res, next) => {

    const errors = validationResult(req);
    const secret = process.env.SECRET_KEY;

    if(!errors.isEmpty()){
        const error = new HttpError('Please fill in the required fields!', 422, false );
        return next(error);
    }

    const { email, password } = req.body;

    let userExists;
    try{
       userExists = await User.findOne({ email });
    } catch(err){
        const error = new HttpError('Unable to signin, Please try again later', 500, false);
        return next(error);
    }

    if(!userExists){
        const error = new HttpError('Invalid password or email', 422, false);
        return next(error);
    }

    try {
        await userExists.comparePassword(password);
        const token = jwt.sign({ userId: userExists._id }, secret, { expiresIn: '1d' } );
        res.status(201).json( {  user: userExists.toObject({ getters: true }), token } );
    } catch(err){
        const error = new HttpError('Invalid password or email', 500, false);
        return next(error);
    }
}

exports.signUp = signUp;
exports.login = login;
exports.fetchUsers = fetchUsers;
exports.fetchUserById = fetchUserById;