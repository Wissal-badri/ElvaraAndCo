const sequelize = require('../config/database');
const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const Review = require('./Review');

// Associations
Order.belongsToMany(Product, { through: OrderItem, foreignKey: 'OrderId' });
Product.belongsToMany(Order, { through: OrderItem, foreignKey: 'ProductId' });

Product.hasMany(Review, { foreignKey: 'ProductId', onDelete: 'CASCADE' });
Review.belongsTo(Product, { foreignKey: 'ProductId' });

module.exports = {
    sequelize,
    User,
    Product,
    Order,
    OrderItem,
    Review,
};
