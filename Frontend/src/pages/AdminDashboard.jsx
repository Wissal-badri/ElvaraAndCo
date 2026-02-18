import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaSignOutAlt, FaBox, FaShoppingCart, FaTimes, FaCheck } from 'react-icons/fa';
import './AdminDashboard.css';

const TABS = ['Products', 'Orders'];

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Products');
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editProduct, setEditProduct] = useState(null);
    const [form, setForm] = useState({ name: '', description: '', price: '', category: '', stock: '', image: '' });
    const [formError, setFormError] = useState('');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!user) { navigate('/login'); return; }
        fetchData();
    }, [user]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [pRes, oRes] = await Promise.all([
                api.get('/products'),
                api.get('/orders'),
            ]);
            setProducts(pRes.data);
            setOrders(oRes.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const openAddModal = () => {
        setEditProduct(null);
        setForm({ name: '', description: '', price: '', category: '', stock: '', image: '' });
        setFormError('');
        setShowModal(true);
    };

    const openEditModal = (product) => {
        setEditProduct(product);
        setForm({
            name: product.name,
            description: product.description || '',
            price: product.price,
            category: product.category || '',
            stock: product.stock,
            image: product.image || '',
        });
        setFormError('');
        setShowModal(true);
    };

    const handleFormChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setFormError('');
    };

    const handleSaveProduct = async (e) => {
        e.preventDefault();
        if (!form.name || !form.price) { setFormError('Name and price are required.'); return; }
        setSaving(true);
        try {
            if (editProduct) {
                await api.put(`/products/${editProduct.id}`, form);
            } else {
                await api.post('/products', form);
            }
            setShowModal(false);
            fetchData();
        } catch (err) {
            setFormError(err.response?.data?.message || 'Failed to save product.');
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteProduct = async (id) => {
        if (!window.confirm('Delete this product?')) return;
        try {
            await api.delete(`/products/${id}`);
            fetchData();
        } catch (err) {
            alert('Failed to delete product.');
        }
    };

    const handleUpdateOrderStatus = async (orderId, status) => {
        try {
            await api.put(`/orders/${orderId}/status`, { status });
            fetchData();
        } catch (err) {
            alert('Failed to update order status.');
        }
    };

    const stats = {
        totalProducts: products.length,
        totalOrders: orders.length,
        pendingOrders: orders.filter(o => o.status === 'pending').length,
        revenue: orders.reduce((sum, o) => sum + Number(o.totalAmount || 0), 0),
    };

    return (
        <div className="admin-page">
            {/* Sidebar */}
            <aside className="admin-sidebar">
                <div className="sidebar-brand">ELVARA & CO.</div>
                <nav className="sidebar-nav">
                    {TABS.map(tab => (
                        <button
                            key={tab}
                            className={`sidebar-btn ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab === 'Products' ? <FaBox /> : <FaShoppingCart />}
                            {tab}
                        </button>
                    ))}
                </nav>
                <button className="sidebar-logout" onClick={() => { logout(); navigate('/login'); }}>
                    <FaSignOutAlt /> Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className="admin-main">
                <header className="admin-header">
                    <h1>{activeTab}</h1>
                    <span className="admin-welcome">Welcome, Admin</span>
                </header>

                {/* Stats Cards */}
                <div className="stats-grid">
                    {[
                        { label: 'Total Products', value: stats.totalProducts, icon: '📦' },
                        { label: 'Total Orders', value: stats.totalOrders, icon: '🛍️' },
                        { label: 'Pending Orders', value: stats.pendingOrders, icon: '⏳' },
                        { label: 'Total Revenue', value: `$${stats.revenue.toFixed(2)}`, icon: '💰' },
                    ].map((s, i) => (
                        <motion.div
                            key={s.label}
                            className="stat-card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <span className="stat-icon">{s.icon}</span>
                            <div>
                                <p className="stat-value">{s.value}</p>
                                <p className="stat-label">{s.label}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Products Tab */}
                {activeTab === 'Products' && (
                    <div className="tab-content">
                        <div className="tab-header">
                            <h2>Product Management</h2>
                            <button className="btn-primary add-btn" onClick={openAddModal}>
                                <FaPlus /> Add Product
                            </button>
                        </div>

                        {loading ? (
                            <p className="loading-text">Loading products...</p>
                        ) : products.length === 0 ? (
                            <div className="empty-state">
                                <p>No products yet. Add your first product!</p>
                                <button className="btn-primary" onClick={openAddModal}>Add Product</button>
                            </div>
                        ) : (
                            <div className="products-table-wrap">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Category</th>
                                            <th>Price</th>
                                            <th>Stock</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map(p => (
                                            <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                                <td>
                                                    {p.image
                                                        ? <img src={p.image} alt={p.name} className="table-img" />
                                                        : <div className="table-img-placeholder" />
                                                    }
                                                </td>
                                                <td className="product-name-cell">{p.name}</td>
                                                <td>{p.category || '—'}</td>
                                                <td className="price-cell">${Number(p.price).toFixed(2)}</td>
                                                <td>
                                                    <span className={`stock-badge ${p.stock > 0 ? 'in-stock' : 'no-stock'}`}>
                                                        {p.stock}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="action-btns">
                                                        <button className="action-btn edit" onClick={() => openEditModal(p)} title="Edit">
                                                            <FaEdit />
                                                        </button>
                                                        <button className="action-btn delete" onClick={() => handleDeleteProduct(p.id)} title="Delete">
                                                            <FaTrash />
                                                        </button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* Orders Tab */}
                {activeTab === 'Orders' && (
                    <div className="tab-content">
                        <div className="tab-header">
                            <h2>Orders Management</h2>
                        </div>

                        {loading ? (
                            <p className="loading-text">Loading orders...</p>
                        ) : orders.length === 0 ? (
                            <div className="empty-state">
                                <p>No orders yet.</p>
                            </div>
                        ) : (
                            <div className="products-table-wrap">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Customer</th>
                                            <th>Phone</th>
                                            <th>Total</th>
                                            <th>Status</th>
                                            <th>Date</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map(o => (
                                            <motion.tr key={o.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                                <td className="order-id">#{o.id.slice(0, 8)}</td>
                                                <td>{o.customerName}</td>
                                                <td>{o.customerPhone}</td>
                                                <td className="price-cell">${Number(o.totalAmount).toFixed(2)}</td>
                                                <td>
                                                    <span className={`status-badge status-${o.status}`}>{o.status}</span>
                                                </td>
                                                <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                                                <td>
                                                    <select
                                                        className="status-select"
                                                        value={o.status}
                                                        onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                                                    >
                                                        {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(s => (
                                                            <option key={s} value={s}>{s}</option>
                                                        ))}
                                                    </select>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </main>

            {/* Product Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowModal(false)}
                    >
                        <motion.div
                            className="modal-card"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="modal-header">
                                <h2>{editProduct ? 'Edit Product' : 'Add New Product'}</h2>
                                <button className="modal-close" onClick={() => setShowModal(false)}><FaTimes /></button>
                            </div>

                            <form onSubmit={handleSaveProduct} className="modal-form">
                                <div className="modal-grid">
                                    <div className="form-group">
                                        <label>Product Name *</label>
                                        <input name="name" value={form.name} onChange={handleFormChange} placeholder="e.g. Royal Velvet Dress" />
                                    </div>
                                    <div className="form-group">
                                        <label>Category</label>
                                        <input name="category" value={form.category} onChange={handleFormChange} placeholder="e.g. Dresses" />
                                    </div>
                                    <div className="form-group">
                                        <label>Price ($) *</label>
                                        <input name="price" type="number" step="0.01" value={form.price} onChange={handleFormChange} placeholder="0.00" />
                                    </div>
                                    <div className="form-group">
                                        <label>Stock</label>
                                        <input name="stock" type="number" value={form.stock} onChange={handleFormChange} placeholder="0" />
                                    </div>
                                    <div className="form-group full-width">
                                        <label>Image URL</label>
                                        <input name="image" value={form.image} onChange={handleFormChange} placeholder="https://..." />
                                    </div>
                                    <div className="form-group full-width">
                                        <label>Description</label>
                                        <textarea name="description" value={form.description} onChange={handleFormChange} rows={3} placeholder="Product description..." />
                                    </div>
                                </div>

                                {formError && <p className="login-error">{formError}</p>}

                                <div className="modal-actions">
                                    <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                    <button type="submit" className="btn-primary" disabled={saving}>
                                        {saving ? 'Saving...' : (editProduct ? 'Update Product' : 'Add Product')}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;
