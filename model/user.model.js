const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: String,
    last_name: String,
    user_name: String, //email
    role: String,
    password: String,
    city: String,
    address: String,
    isActive: Boolean
})

module.exports = UserSchema;


