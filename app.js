const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const {config} = require('./configs');
const {adminRouter, clientRouter, doctorRouter} = require('./routes');

const app = express();

mongoose.connect(config.MONGO_CONNECT_URL);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/admin', adminRouter);
app.use('/client', clientRouter);
app.use('/doctor', doctorRouter);
// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            msg: err.message
        });
});

app.listen(config.PORT, () => {
    console.log(`App work ${config.PORT}`);
});
