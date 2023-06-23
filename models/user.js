const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = Schema({

});

module.exports = mongoose.model('User', userSchema);