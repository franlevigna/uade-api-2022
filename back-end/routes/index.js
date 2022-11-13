// Controllers
const usersController = require('../controllers/user');

module.exports = (app) => {

    app.get('/profeflix/ping', (req, res) => res.status(200).send({
        message: 'Health check ping endpoint',
    }));

    // Routes of Web Services
    // Users login
    app.post('/users/create', usersController.create);
    app.post('/users/login', usersController.login);
};
