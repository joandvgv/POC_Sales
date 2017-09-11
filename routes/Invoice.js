var InvoiceController = require('../controllers/Invoice.js');

module.exports = function(app) {

    app.get('/invoice', function(req, res) {
        InvoiceController.findAll(req, res);
    });

    app.get('/invoice/:id', function(req, res) {
        InvoiceController.findOne(req, res);
    });

    app.post('/invoice', function(req, res) {
        InvoiceController.create(req.body, res);
    });

    app.delete('/invoice/:id', function(req, res) {
        InvoiceController.delete(req, res);
    });

    app.put('/invoice', function(req, res) {
        InvoiceController.update(req, res);
    });




}