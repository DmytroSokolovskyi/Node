const clientRouter = require('express').Router();

clientRouter.post('/', () => {});
clientRouter.get('/doctors', () => {});
clientRouter.get('/visits', () => {});
clientRouter.put('/:user_id', () => {});
clientRouter.delete('/:user_id', () => {});

module.exports = clientRouter;
