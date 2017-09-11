"use strict";
module.exports = function(sequelize, DataTypes) {
    const Product = sequelize.define("Product", {
        productId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: false },
        price: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
        totalPrice: { type: DataTypes.DECIMAL(11, 2), allowNull: true },
        tax: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
        pictureLocation: { type: DataTypes.STRING, allowNull: true }
    });
    return Product;
};