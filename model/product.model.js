const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
	name: String,
  	price: Number,
  	image: String,
    isActive: {type: Boolean, default: true}
});

module.exports = ProductSchema;

