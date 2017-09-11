"use strict";
module.exports = function(sequelize, DataTypes) {
    const InvoiceDetail = sequelize.define("InvoiceDetail", {
        invoiceId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Invoice",
                key: 'invoiceId'
            },
            primaryKey: true
        },
        productId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Product",
                key: 'productId'
            },
            primaryKey: true
        },
        total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        quantity: { type: DataTypes.INTEGER, allowNull: false }
    }, {
        classMethods: {
            associate: function(models) {
                InvoiceDetail.belongsToMany(models.Product, {
                    as: 'Details',
                    through: {
                        model: models.Product
                    },
                    foreignKey: 'invoiceId'
                });
            }
        },
    });
    return InvoiceDetail;
};