var Invoice = require('../models').Invoice;
var InvoiceDetail = require('../models').InvoiceDetail;
var Client = require('../models').Client;


module.exports = {
    create: function(invoice, res) {
        Invoice.create(invoice)
            .then((createdInvoice) => {

                let id = createdInvoice.get('invoiceId');

                invoice.invoiceDetail.forEach(function(detail) {
                    detail.invoiceId = id;
                }, this);

                var invoiceDetail = InvoiceDetail.bulkCreate(invoice.invoiceDetail)
                    .then((createdDetail) => {
                        res.json({ success: true, invoice: createdInvoice })
                    })
                    .catch((error) => {
                        Invoice.findOne({ where: { invoiceId: id } }).then(invoice => {
                            invoice.destroy()
                                .then(() => res.json({ success: true }))
                                .catch(error => res.json({ success: false, error: 'Invoice could not be added' }));

                        }).catch(error => {
                            res.json({ success: false, error: 'Invoice could not be added' });
                        });
                    });
            })
            .catch((error) => {
                res.json({ success: false, error: "Invoice could no be added" });
            });
    },

    findOne: function(req, res) {
        Invoice.findOne({
                where: { invoiceId: req.params.id },
                include: [{
                        model: Client,
                        as: 'client'
                    },
                    {
                        model: InvoiceDetail,
                        as: 'products'
                    }
                ]
            })
            .then(invoice =>
                res.json({ success: true, invoice: invoice }))
            .catch((error) => {
                res.json({ success: false, error: "Error finding invoice" });
            });
    },

    delete: function(req, res) {
        Invoice.findOne({ where: { invoiceId: req.params.id } }).then(invoice => {
            invoice.destroy()
                .then(() => res.json({ success: true }))
                .catch(error => res.json({ success: false, error: 'Invoice could not be deleted' }));

        }).catch(error => {
            res.json({ success: false, error: 'Invoice could not be found' });
        });
    },

    update: function(req, res) {
        Invoice.update(req.body, { where: { invoiceId: req.body.invoiceId } })
            .then((updated) => {
                if (updated[0] > 0)
                    res.json({ success: true });
                else
                    res.json({ success: false, error: "Invoice could not be found or no field was updated" });
            })
            .catch((error) => {
                res.json({ success: false, error: "Invoice could not be updated succesfully" });
            });
    },
    findAll: function(req, res) {
        Invoice.findAll({
                include: [{
                        model: Client,
                        as: 'client'
                    },
                    {
                        model: InvoiceDetail,
                        as: 'products'
                    }
                ]
            })
            .then((invoices) => {
                res.json({ success: true, invoices: invoices });
            })
            .catch((error) => {
                res.json({ success: false, error: "Error finding invoicees" });
            });
    }
};