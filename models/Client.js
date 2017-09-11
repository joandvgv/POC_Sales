"use strict";
module.exports = function(sequelize, DataTypes) {
    const Client = sequelize.define("Client", {
        clientId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        firstName: { type: DataTypes.STRING, unique: true, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: false },
        address: { type: DataTypes.STRING, allowNull: true },
        phoneNumber: { type: DataTypes.STRING, allowNull: true },
        mobileNumber: { type: DataTypes.STRING, allowNull: true, unique: true },
        pictureLocation: { type: DataTypes.STRING, allowNull: true }
    }, {
        classMethods: {
            associate: function(models) {
                Client.hasMany(models.Invoice, {
                    as: 'purchases',
                    foreignKey: 'clientId',
                    sourceKey: 'clientId'
                });
            }
        }
    })
    return Client;
};