const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OrderItem = sequelize.define('OrderItem', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    size: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    priceAtPurchase: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
});

module.exports = OrderItem;
