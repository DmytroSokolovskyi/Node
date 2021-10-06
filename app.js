const express = require('express');

const userRouter = require('./routes/user.router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/users', userRouter);

app.listen(5001, () => {
    console.log(`App work`);
});