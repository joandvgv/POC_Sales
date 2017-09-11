var ProductController = require('../controllers/Product.js');

module.exports = function(app) {

    app.get('/product', function(req, res) {
        ProductController.findAll(req, res);
    });

    app.get('/product/:id', function(req, res) {
        ProductController.findOne(req, res);
    });

    app.post('/product', function(req, res) {
        ProductController.create(req.body, res);
    });

    app.delete('/product/:id', function(req, res) {
        ProductController.delete(req, res);
    });

    app.put('/product', function(req, res) {
        ProductController.update(req, res);
    });




}