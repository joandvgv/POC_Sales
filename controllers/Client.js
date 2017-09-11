var Client = require('../models').Client;
var Invoice = require('../models').Invoice;
var InvoiceDetail = require('../models').InvoiceDetail;
var clientAttributes = ['clientId', 'firstName', 'lastName', 'address', 'phoneNumber', 'mobileNumber', 'pictureLocation']
module.exports = {
    create: function(client, res) {
        Client.create(client)
            .then((createdClient) => {

                res.json({ success: true, client: createdClient })
            })
            .catch((error) => {
                res.json({ success: false, error: "Client could no be added" });
            });
    },

    findOne: function(req, res) {
        Client.findOne({
                attributes: clientAttributes,
                where: { clientId: req.params.id },
                include: [{
                    model: Invoice,
                    as: 'purchases'
                }]
            })
            .then((client) => {
                res.json({ success: true, client: client });
            })
            .catch((error) => {
                console.log(error);
                res.json({ success: false, error: "Error finding client" });
            });
    },
    delete: function(req, res) {
        Client.findOne({ where: { clientId: req.params.id } }).then(client => {
            client.destroy()
                .then(() => res.json({ success: true }))
                .catch(error => res.json({ success: false, error: 'Client could not be deleted' }));

        }).catch(error => {
            res.json({ success: false, error: 'Client could not be found' });
        });
    },

    update: function(req, res) {
        Client.update(req.body, { where: { clientId: req.body.clientId } })
            .then((updated) => {
                if (updated[0] > 0)
                    res.json({ success: true });
                else
                    res.json({ success: false, error: "Client could not be found or no field was updated" });
            })
            .catch((error) => {
                res.json({ success: false, error: "Client could not be updated succesfully" });
            });
    },
    findAll: function(req, res) {
        Client.findAll({
                attributes: clientAttributes,
                include: [{
                    model: Invoice,
                    as: 'purchases'
                }]
            })
            .then((clients) => {
                res.json({ success: true, clients: clients });
            })
            .catch((error) => {
                res.json({ success: false, error: "Error finding clientes" });
            });
    }
};