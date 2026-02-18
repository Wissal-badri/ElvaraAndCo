import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../services/api';
import { motion } from 'framer-motion';
import './Checkout.css';

const Checkout = () => {
    const { cart, total, clearCart } = useCart();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        customerName: '',
        customerPhone: '',
        shippingAddress: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!form.customerName.trim()) newErrors.customerName = 'Full name is required.';
        if (!form.customerPhone.trim()) newErrors.customerPhone = 'Phone number is required.';
        else if (!/^[0-9\s+\-()]{9,15}$/.test(form.customerPhone))
            newErrors.customerPhone = 'Enter a valid phone number.';
        if (!form.shippingAddress.trim()) newErrors.shippingAddress = 'Shipping address is required.';
        return newErrors;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        if (cart.length === 0) return;

        setLoading(true);
        try {
            const items = cart.map((item) => ({ productId: item.id, quantity: item.quantity }));
            await api.post('/orders', { ...form, items });
            clearCart();
            setSuccess(true);
        } catch (err) {
            setErrors({ submit: err.response?.data?.message || 'Failed to place order. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="checkout-page">
                <Navbar />
                <div className="container checkout-success">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                        <div className="success-icon">✓</div>
                        <h1>Order Confirmed</h1>
                        <p>Thank you for your order. Our team will contact you shortly to confirm delivery.</p>
                        <button className="btn-primary" onClick={() => navigate('/shop')}>Continue Shopping</button>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <Navbar />
            <div className="container" style={{ padding: '60px 20px' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '50px' }}>Secure Order</h1>

                <div className="checkout-layout">
                    {/* Form */}
                    <motion.div className="checkout-form-card" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <h2>Delivery Information</h2>
                        <form onSubmit={handleSubmit} className="checkout-form">
                            <div className="form-group">
                                <label htmlFor="customerName">Full Name *</label>
                                <input
                                    id="customerName"
                                    type="text"
                                    name="customerName"
                                    value={form.customerName}
                                    onChange={handleChange}
                                    placeholder="Your full name"
                                />
                                {errors.customerName && <span className="field-error">{errors.customerName}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="customerPhone">Phone Number *</label>
                                <input
                                    id="customerPhone"
                                    type="tel"
                                    name="customerPhone"
                                    value={form.customerPhone}
                                    onChange={handleChange}
                                    placeholder="+213 XXX XXX XXX"
                                />
                                {errors.customerPhone && <span className="field-error">{errors.customerPhone}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="shippingAddress">Shipping Address *</label>
                                <textarea
                                    id="shippingAddress"
                                    name="shippingAddress"
                                    value={form.shippingAddress}
                                    onChange={handleChange}
                                    placeholder="Street, City, Wilaya"
                                    rows={4}
                                />
                                {errors.shippingAddress && <span className="field-error">{errors.shippingAddress}</span>}
                            </div>

                            <div className="payment-note">
                                <span>💳</span>
                                <p>Payment method: <strong>Cash on Delivery</strong></p>
                            </div>

                            {errors.submit && <p className="login-error">{errors.submit}</p>}

                            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '16px' }} disabled={loading}>
                                {loading ? 'Placing Order...' : 'Place Order'}
                            </button>
                        </form>
                    </motion.div>

                    {/* Order Summary */}
                    <motion.div className="checkout-summary" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                        <h2>Your Selection</h2>
                        {cart.map((item) => (
                            <div key={item.id} className="checkout-item">
                                <span>{item.name} × {item.quantity}</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                        <div className="checkout-total">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
