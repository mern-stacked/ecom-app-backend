const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');

// Import Models
const User = require('../models/users');

// Fetch all users
const fetchUsers = async (req, res, next) => {

    try{
       const users = await User.find();
       res.status(201).send(users);
    } catch(err){
       const error = new HttpError('No users found.');
       return next(error);
    }

}

// Register a user
const registerUser = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return next (
            new HttpError('Please fill in the required fields!', 422)
        );
    }

    const { name, email, passwordHash, phone, isAdmin, street, apartment, city, zip, country } = req.body;

    const user = new User({ name, email, passwordHash, phone, isAdmin, street, apartment, city, zip, country });

    try{
        await user.save();
        res.status(200).send(user);
    } catch (err) {
        const error = new HttpError('User Registeration Failed', 500, false);
        return next(error);
    }

}

exports.registerUser = registerUser;
exports.fetchUsers = fetchUsers;