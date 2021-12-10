const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        userName:{
            type: String,
            required: true,
            index: true
        },
        email:{
            type: String,
            required: true,
            index: true,
            unique: true 
        },
        password:{
            type: String,
            required: true
        }
    }
);

const User = mongoose.model('User', userSchema);

module.exports = {
    User
};