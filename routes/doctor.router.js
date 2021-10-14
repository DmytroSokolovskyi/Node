const doctorRouter = require('express').Router();

const {Clients} = require('../dataBase');
const {doctorController} = require('../controllers');
const {mainMiddleware} = require('../middlewares');
const {clientValidator} = require('../validators');

doctorRouter.get('/', doctorController.getVisits);
doctorRouter.get('/client', doctorController.getClients);
doctorRouter.post(
    '/client',
    mainMiddleware.validateBody(clientValidator.clientValidate),
    mainMiddleware.checkOne(Clients, 'phone'),
    doctorController.createClient
);
// todo createVisit
doctorRouter.post('/visit', doctorController.createVisit);
doctorRouter.delete(
    '/client/:client_id',
    mainMiddleware.validateId('client_id'),
    mainMiddleware.getOneById(Clients, 'client_id'),
    doctorController.deleteClientById
);
doctorRouter.delete('/visit', () => 'del visit');
doctorRouter.get(
    '/client/:client_id',
    mainMiddleware.validateId('client_id'),
    mainMiddleware.getOneById(Clients, 'client_id'),
    doctorController.getClientById
);
doctorRouter.put('/client/:client_id', () => 'edit client');
doctorRouter.put('/visit/:visit_id', () => 'edit visit');

module.exports = doctorRouter;
