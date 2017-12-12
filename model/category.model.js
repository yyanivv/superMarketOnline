const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
	name: String,
	image: String,
	products: [{type: Schema.Types.ObjectId, ref: 'Product'}]
});

module.exports = CategorySchema;