"use strict";
module.exports = function(sequelize, DataTypes) {
    const Invoice = sequelize.define("Invoice", {
        invoiceId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        total: { type: DataTypes.DECIMAL(10, 2), unique: true, allowNull: false },
        tax: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        subtotal: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
        clientId: { type: DataTypes.STRING, allowNull: true }
    }, {
        classMethods: {
            associate: function(models) {
                Invoice.belongsTo(models.Client, {
                    as: 'client',
                    through: {
                        model: models.Client
                    },
                    foreignKey: 'clientId'
                });
                Invoice.belongsTo(models.InvoiceDetail, {
                    as: 'products',
                    foreignKey: 'invoiceId',
                    sourceKey: 'invoiceId'
                });
            }
        },
    });
    return Invoice;
};