const sequelize = require('../config/database');
const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const OrderItem = require('./OrderItem');

// Associations
Order.belongsToMany(Product, { through: OrderItem, foreignKey: 'OrderId' });
Product.belongsToMany(Order, { through: OrderItem, foreignKey: 'ProductId' });

module.exports = {
    sequelize,
    User,
    Product,
    Order,
    OrderItem,
};
