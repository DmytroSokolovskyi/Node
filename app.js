const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
require('dotenv').config();

const { config, statusEnum, errorsEnum } = require('./configs');
const { userRouter, userAuthRouter } = require('./routes');
const startCron = require('./cron');
const { ErrorHandler } = require('./errors');
const {defaultData} = require('./util');

const app = express();

mongoose.connect(config.MONGO_CONNECT_URL);

app.use(helmet());
app.use(cors({origin: _configureCors}));
app.use(rateLimit({
    windowMS: 15 * 60 * 1000,
    max: 100
}));

if (config.NODE_ENV === 'dev') {
    const morgan = require('morgan');

    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/users', userRouter);
app.use('/auth', userAuthRouter);
// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || statusEnum.SERVER_ERROR)
        .json({
            msg: err.message
        });
});

app.listen(config.PORT, () => {
    console.log(`App work ${config.PORT}`);
    defaultData();
    startCron();
});

function _configureCors(origin, callback) {

    if (config.NODE_ENV === 'dev') {
        return callback(null, true);
    }

    const whitelist = config.ALLOWED_ORIGIN.split(';');

    if (whitelist.includes(origin)) {
        return callback(new ErrorHandler(errorsEnum.CORS_ERROR), false);
    }

    return callback(null, true);
}
