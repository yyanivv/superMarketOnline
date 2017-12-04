const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    createdOn: {type:Date, default: new Date().toLocaleDateString()},
    cart: {
        products: [{
            products:  {type: Schema.Types.ObjectId, ref: 'Product'},
            quantity: String,
            total: String 
        }],
        createdOn: Date
    },
    price: String,
    payment_details: Object,
    shipping_details: {city:String,address:String,date:String}
});

module.exports = OrderSchema;
 
