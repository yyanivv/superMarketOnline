const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: String,
    isActive: {type:Boolean, default: true}
})

module.exports = CategorySchema;