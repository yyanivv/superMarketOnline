const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    createdOn: String,
    nickname: String,
    description: String,
    products: [
        {
            products: {type: Schema.Types.ObjectId, ref: 'Product'},
            price: String,
            quantity: String,
            total: String
        }
    ],
    total_price: String,
    payment_details: Object,
    users: {type: Schema.Types.ObjectId, ref: 'User'}
    
});

module.exports = CartSchema;
