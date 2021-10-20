const {Schema, model} = require('mongoose');

const {tableNamesEnum, tokenEnum} = require('../configs');

const actionTokenSchema = new Schema({
    action_token: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        enum: Object.values(tokenEnum),
        default: tokenEnum.ACTION
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: tableNamesEnum.USER
    },
}, {timestamps: true});

module.exports = model(tableNamesEnum.ACTION_TOKENS, actionTokenSchema);
