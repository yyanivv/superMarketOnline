const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    createdOn: {type:Date, default: new Date()},
    cart: {
        products: [{
            products:  {type: Schema.Types.ObjectId, ref: 'Product'},
            quantity: Number,
            total: Number 
        }],
        createdOn: Date,
        price: Number,
    },
    payment_details: Object,
    shipping_details: {city:String,address:String}, //date:{type:Date, default: new Date()
    shipping_date: String
});

module.exports = OrderSchema;


