const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    phone: { type: String, required: true },
    isAdmin: { type: Boolean, required: false },
    street: { type: String, default: '' },
    apartment: { type: String, default: '' },
    city: { type: String, default: '' },
    zip: { type: String, default: '' },
    country: { type: String, default: '' }
});

productSchema.virtual('id').get(function () {
    return this._id.toHexString();
})

productSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', userSchema);