import React, { useState, useEffect } from 'react';
import orderService from '../services/orderService';
import { NavLink } from 'react-router-dom';

function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                if (!user || !user.token) {
                    setError('Please login to view orders.');
                    setLoading(false);
                    return;
                }

                const data = await orderService.getMyOrders(user.token);
                setOrders(data);
            } catch (err) {
                console.error(err);
                setError('Failed to load orders.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <div className="text-center py-5 mt-5">Loading...</div>;
    if (error) return <div className="text-center py-5 mt-5 text-danger">{error}</div>;

    return (
        <div className="container py-5 mt-5">
            <h2 className="fw-bold mb-4 text-center">My Order History</h2>
            {orders.length === 0 ? (
                <div className="text-center py-5 bg-light rounded">
                    <p className="text-muted">No orders found.</p>
                    <NavLink to="/cart" className="btn btn-dark">Start Shopping</NavLink>
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-hover align-middle shadow-sm rounded overflow-hidden">
                        <thead className="bg-light">
                            <tr>
                                <th className="py-3 ps-4">Order ID</th>
                                <th className="py-3">Date</th>
                                <th className="py-3">Services/Items</th>
                                <th className="py-3">Total</th>
                                <th className="py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td className="ps-4 fw-medium text-muted small">#{order._id.substring(order._id.length - 6).toUpperCase()}</td>
                                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <ul className="list-unstyled m-0 small">
                                            {order.items.map((item, index) => (
                                                <li key={index}>• {item.title || item.name} (x{item.quantity})</li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td className="fw-bold">${order.totalPrice}</td>
                                    <td>
                                        <span className={`badge rounded-pill ${order.isPaid ? 'bg-success' : 'bg-warning text-dark'}`}>
                                            {order.isPaid ? 'Paid' : 'Pending'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default MyOrders;
