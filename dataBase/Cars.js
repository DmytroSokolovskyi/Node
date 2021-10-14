const {Schema, model} = require('mongoose');

const {carsModelEnum, tableNamesEnum} = require('../configs');

const carsSchema = new Schema({
    model: {
        type: String,
        enum: Object.values(carsModelEnum),
        required: true
    },
    year: {
        type: Number,
        required: true,
        trim: true
    },
    price: {
        type: String,
        required: true,
        trim: true,
    }
}, {timestamps: true});

module.exports = model(tableNamesEnum.CARS, carsSchema);
