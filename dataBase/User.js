const {Schema, model} = require('mongoose');

const userRoles = require('../configs/user-roles-enum');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    auth: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: userRoles.USER,
        enum: Object.values(userRoles)
    }
}, {timestamps: true});

module.exports = model('user', userSchema);
