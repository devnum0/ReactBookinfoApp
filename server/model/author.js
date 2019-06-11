const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorScheme = new Schema({
    name: String,
    age: Number,
});

module.exports = mongoose.model('Author', authorScheme);