const {Schema, model} = require('mongoose');

const {tableNamesEnum} = require('../configs');

const oAuthSchema = new Schema({
    access_token: {
        type: String,
        required: true,
        trim: true
    },
    refresh_token: {
        type: String,
        required: true,
        trim: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: tableNamesEnum.USER
    },
}, {timestamps: true});

module.exports = model(tableNamesEnum.O_AUTH, oAuthSchema);
