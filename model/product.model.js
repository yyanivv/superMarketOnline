const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: String,
    price: String,
    image: String,
    isActive: {type:Boolean, default: true},
    categories: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }
})

module.exports = ProductSchema;

