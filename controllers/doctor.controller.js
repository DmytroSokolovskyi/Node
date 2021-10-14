const {Visits, Clients} = require('../dataBase');
const Client = require('../dataBase/Clients');

module.exports = {
    getVisits: async (req, res, next) => {
        try {
            const visits = await Visits.find();

            res.json(visits);
        } catch (e) {
            next(e);
        }
    },

    getClients: async (req, res, next) => {
        try {
            const visits = await Clients.find();

            res.json(visits);
        } catch (e) {
            next(e);
        }
    },

    getClientById: (req, res, next) => {
        try {
            const oneById = req.oneById;

            res.json(oneById);
        } catch (e) {
            next(e);
        }
    },

    createClient: async (req, res, next) => {
        try {
            const client = await Clients.create(req.body);

            res.json(client);
        } catch (e) {
            next(e);
        }
    },

    createVisit: async (req, res, next) => {
        try {
            const visits = await Visits.find();

            res.json(visits);
        } catch (e) {
            next(e);
        }
    },

    deleteClientById:async (req, res, next) => {
        try {
            const {client_id} = req.params;
            const delUser = await Client.findByIdAndDelete(client_id);

            res.json(delUser);
        } catch (e) {
            next(e);
        }
    },
};


// doctorRouter.get('/', () => 'all visits visit');
// doctorRouter.get('/client', () => 'all clients');
// doctorRouter.post('/client', () => 'create client');
// doctorRouter.post('/visit', () => 'create visit');
// doctorRouter.delete('/client', () => 'del client');
// doctorRouter.delete('/visit', () => 'del visit');
// doctorRouter.put('/client/:client_id', () => 'edit client');
// doctorRouter.put('/visit/:visit_id', () => 'edit visit');
