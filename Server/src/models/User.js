const { ROLES } = require('../constants/roles.js')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ROLES,
        default: ROLES.CUSTOMER,
    },
});

module.exports = mongoose.model('User', userSchema);