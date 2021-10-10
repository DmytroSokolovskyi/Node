const express = require('express');
const mongoose = require('mongoose');

const {config: {MONGO_CONNECT_URL, PORT}} = require('./configs');
const {userRouter, userAuthRouter} = require('./routes');

const app = express();

mongoose.connect(MONGO_CONNECT_URL);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/users', userRouter);
app.use('/auth', userAuthRouter);

app.listen(PORT, () => {
  console.log(`App work ${PORT}`);
});
