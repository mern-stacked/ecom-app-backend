const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const userSchema = Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    phone: { type: String, required: true },
    isAdmin: { type: Boolean, required: false },
    street: { type: String, default: '' },
    apartment: { type: String, default: '' },
    city: { type: String, default: '' },
    zip: { type: String, default: '' },
    country: { type: String, default: '' }
});

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
})

userSchema.set('toJSON', { virtuals: true });

// Preprocessing the password
userSchema.pre('save', function(next) {

    const user = this;

    if(!user.isModified('password')){
        return(next);
    }

    bcrypt.genSalt(10, (err, salt) => {

        if(err) { return next(err); }

        bcrypt.hash(user.password, salt, (err, hash) => {

            if(err) { return next(err); }

            user.password = hash;
            next();
        });
    });
});

// Compare the password generated during signup with the one while login 
userSchema.methods.comparePassword = function(candidatePassword) {

    const user = this;

    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {

            if(err) return reject(err);

            if(!isMatch) return reject(false)

            resolve(true);
        })
    });
}


module.exports = mongoose.model('User', userSchema);