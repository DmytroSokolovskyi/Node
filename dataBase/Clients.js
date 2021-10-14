const {Schema, model} = require('mongoose');

const {rolesEnum, tableNamesEnum} = require('../configs');

const clientsSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    surname: {
        type: String,
        // required: true,
        trim: true
    },
    phone: {
        type: String,
        // unique: true,
        // required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    role: {
        type: String,
        default: rolesEnum.CLIENT,
        enum: Object.values(rolesEnum)
    },
    doctor: {
        type: Schema.Types.ObjectId,
        ref: tableNamesEnum.DOCTORS
    },
    visits: {
        type: Schema.Types.ObjectId,
        ref: tableNamesEnum.VISITS
    },
    teethes: {
        type: Schema.Types.ObjectId,
        ref: tableNamesEnum.TEETHES
    }
}, {timestamps: true});

module.exports = model(tableNamesEnum.CLIENTS, clientsSchema);
