const {Schema, model} = require('mongoose');

const {rolesEnum, tableNamesEnum} = require('../configs');

const doctorsSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    surname: {
        type: String,
        trim: true
    },
    phone: {
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
    role: {
        type: String,
        default: rolesEnum.CLIENT,
        enum: Object.values(rolesEnum)
    },
    clients: [{
        type: Schema.Types.ObjectId,
        ref : tableNamesEnum.CLIENTS
    }]
}, {timestamps: true});

module.exports = model(tableNamesEnum.DOCTORS, doctorsSchema);
