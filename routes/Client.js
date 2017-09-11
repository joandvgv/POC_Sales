var ClientController = require('../controllers/Client.js');

module.exports = function(app) {

    app.get('/client', function(req, res) {
        ClientController.findAll(req, res);
    });

    app.get('/client/:id', function(req, res) {
        ClientController.findOne(req, res);
    });

    app.post('/client', function(req, res) {
        ClientController.create(req.body, res);
    });

    app.delete('/client/:id', function(req, res) {
        ClientController.delete(req, res);
    });

    app.put('/client', function(req, res) {
        ClientController.update(req, res);
    });




}