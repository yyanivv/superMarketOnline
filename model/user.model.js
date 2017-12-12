const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    username: String, //email
    role: {type: String, default: 'customer'},
    password: String,
    city: String,
    address: String,
    isActive: {type:Boolean, default: true},
    orders: [{type: Schema.Types.ObjectId, ref: 'Order'}],
    accessToken: String,
    refreshToken: String,
    profile: Object
})

module.exports = UserSchema;
