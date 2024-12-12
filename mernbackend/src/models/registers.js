const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique:true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: {
        type: String,
        required: true,
        minlength: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const Register= new mongoose.model("Register",userSchema);
module.exports = Register;

