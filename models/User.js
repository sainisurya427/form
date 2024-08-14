// models/User.js
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
        match: /^[A-Za-z]+$/
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
        match: /^[A-Za-z]+$/
    },
    mobileNo: {
        type: String,
        required: true,
        match: /^\d{10}$/
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, 'Invalid email address']
    },
    address: {
        type: String,
        required: true,
        minlength: 5
    },
    street: {
        type: String,
        required: true,
        minlength: 2
    },
    city: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
        match: /^[A-Za-z\s]+$/
    },
    state: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
        match: /^[A-Za-z\s]+$/
    },
    country: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
        match: /^[A-Za-z\s]+$/
    },
    loginId: {
        type: String,
        required: true,
        minlength: 8,
        match: /^[A-Za-z0-9]+$/
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        validate: {
            validator: function(v) {
                return /[a-z]/.test(v) && /[A-Z]/.test(v) && /\d/.test(v) && /[@$!%*?&]/.test(v);
            },
            message: 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.'
        }
    },
    creationTime: {
        type: Date,
        default: Date.now
    },
    lastUpdatedOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);
