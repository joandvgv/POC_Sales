var Product = require('../models').Product;
var productAttributes = ['productId', 'name', 'description', 'price', 'tax', 'totalPrice', 'pictureLocation'];

module.exports = {
    create: function(product, res) {
        Product.create(product)
            .then((createdProduct) => {

                res.json({ success: true, product: createdProduct })
            })
            .catch((error) => {
                res.json({ success: false, error: "Product could no be added" });
            });
    },

    findOne: function(req, res) {
        Product.findOne({
                attributes: productAttributes,
                where: { productId: req.params.id }
            })
            .then((product) => {
                res.json({ success: true, product: product })
            })
            .catch((error) => {
                res.json({ success: false, error: "Error finding product" });
            });
    },

    delete: function(req, res) {
        Product.findOne({ where: { productId: req.params.id } }).then(product => {
            product.destroy()
                .then(() => res.json({ success: true }))
                .catch(error => res.json({ success: false, error: 'Product could not be deleted' }));

        }).catch(error => {
            res.json({ success: false, error: 'Product could not be found' });
        });
    },

    update: function(req, res) {
        Product.update(req.body, { where: { productId: req.body.productId } })
            .then((updated) => {
                if (updated[0] > 0)
                    res.json({ success: true });
                else
                    res.json({ success: false, error: "Product could not be found or no field was updated" });
            })
            .catch((error) => {
                res.json({ success: false, error: "Product could not be updated succesfully" });
            });
    },
    findAll: function(req, res) {
        Product.findAll({ attributes: productAttributes })
            .then((products) => {
                res.json({ success: true, products: products });
            })
            .catch((error) => {
                res.json({ success: false, error: "Error finding productes" });
            });
    }
};