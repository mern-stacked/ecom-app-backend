const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    countInStock: { type: Number, require: true }
})

module.exports = mongoose.model('Product', productSchema);