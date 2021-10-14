const {Schema, model} = require('mongoose');

const {userRolesEnum, tableNamesEnum} = require('../configs');

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
        required: true,
        trim: true,
        select: false
    },
    auth: {
        type: Boolean,
        default: false
    },
    cars: [{
        type: Schema.Types.ObjectId,
        ref: tableNamesEnum.CARS
    }],
    role: {
        type: String,
        default: userRolesEnum.USER,
        enum: Object.values(userRolesEnum)
    }
}, {timestamps: true});

module.exports = model(tableNamesEnum.USER, userSchema);
