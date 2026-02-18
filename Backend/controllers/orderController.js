const { Order, OrderItem, Product } = require('../models');

// POST /api/orders  — public, cash on delivery
const createOrder = async (req, res) => {
    try {
        const { customerName, customerPhone, shippingAddress, items } = req.body;

        if (!customerName || !customerPhone || !shippingAddress || !items || items.length === 0)
            return res.status(400).json({ message: 'All fields and at least one item are required.' });

        // Phone validation
        const phoneRegex = /^[0-9]{9,15}$/;
        if (!phoneRegex.test(customerPhone.replace(/\s/g, '')))
            return res.status(400).json({ message: 'Invalid phone number format.' });

        let totalAmount = 0;
        const orderItems = [];

        for (const item of items) {
            const product = await Product.findByPk(item.productId);
            if (!product) return res.status(404).json({ message: `Product ${item.productId} not found.` });
            if (product.stock < item.quantity)
                return res.status(400).json({ message: `Insufficient stock for ${product.name}.` });

            totalAmount += product.price * item.quantity;
            orderItems.push({ product, quantity: item.quantity, priceAtPurchase: product.price });
        }

        const order = await Order.create({ customerName, customerPhone, shippingAddress, totalAmount });

        for (const oi of orderItems) {
            await OrderItem.create({
                OrderId: order.id,
                ProductId: oi.product.id,
                quantity: oi.quantity,
                priceAtPurchase: oi.priceAtPurchase,
            });
            // Decrement stock
            await oi.product.update({ stock: oi.product.stock - oi.quantity });
        }

        res.status(201).json({ message: 'Order placed successfully!', orderId: order.id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
};

// GET /api/admin/orders  — admin only
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [{ model: Product, through: { attributes: ['quantity', 'priceAtPurchase'] } }],
            order: [['createdAt', 'DESC']],
        });
        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
};

// PUT /api/admin/orders/:id  — update status
const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found.' });
        await order.update({ status: req.body.status });
        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
};

module.exports = { createOrder, getAllOrders, updateOrderStatus };
