const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: String,
    price: String,
    image: String,
    isActive: Boolean,
    categories: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }
})

module.exports = ProductSchema;
