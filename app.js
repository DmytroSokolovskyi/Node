const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const {config, statusEnum} = require('./configs');
const {userRouter, userAuthRouter} = require('./routes');

const app = express();

mongoose.connect(config.MONGO_CONNECT_URL);

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
});
