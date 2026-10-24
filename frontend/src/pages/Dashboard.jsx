import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
    FaThLarge, FaClipboardList, FaUser, FaSignOutAlt, FaSearch, FaBell,
    FaBars, FaPhone, FaChartLine, FaShoppingBag, FaDollarSign
} from 'react-icons/fa';
import '../Dashboard.css';
import logo from '../assets/UNTRESSED-logo.webp';
import wordmark from '../assets/UNTRESSED-wordmark.webp';
import orderService from '../services/orderService';

// Sub-components for different views
const DashboardHome = ({ orders, user }) => {
    // Calculate Stats
    const totalOrders = orders.length;
    const totalSpent = orders.reduce((acc, order) => acc + (order.totalPrice || 0), 0).toFixed(2);
    const pendingOrders = orders.filter(o => !o.isPaid).length; // Assuming isPaid false means pending/processing logic

    return (
        <>
            {/* Stats Row */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-header">
                        <span className="stat-title">Total Orders</span>
                        <FaShoppingBag className="stat-icon" />
                    </div>
                    <div className="stat-value">{totalOrders}</div>
                    <div className="stat-trend">
                        <span>↗ 0%</span> <span className="text-muted fw-normal ms-1">vs last month</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-header">
                        <span className="stat-title">Total Spent</span>
                        <FaDollarSign className="stat-icon" />
                    </div>
                    <div className="stat-value">${totalSpent}</div>
                    <div className="stat-trend">
                        <span>↗ 0%</span> <span className="text-muted fw-normal ms-1">vs last month</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-header">
                        <span className="stat-title">Pending Orders</span>
                        <FaClipboardList className="stat-icon" />
                    </div>
                    <div className="stat-value">{pendingOrders}</div>
                    <div className="stat-trend text-warning">
                        <span className="text-muted fw-normal">Action needed</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-header">
                        <span className="stat-title">Account Status</span>
                        <FaUser className="stat-icon" />
                    </div>
                    <div className="stat-value" style={{ fontSize: '1.5rem' }}>Active</div>
                    <div className="stat-trend">
                        <span className="text-muted fw-normal">Verified Member</span>
                    </div>
                </div>
            </div>

            {/* Recent Activity / Charts Placeholder */}
            <div className="section-grid">
                <div className="content-card">
                    <div className="content-card-header">
                        <h3 className="content-card-title">Recent Orders</h3>
                        <button className="week-dropdown">View All</button>
                    </div>
                    {/* Compact Order Table */}
                    {orders.length > 0 ? (
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="text-light-grey">
                                    <tr>
                                        <th className="border-0">Order ID</th>
                                        <th className="border-0">Date</th>
                                        <th className="border-0">Amount</th>
                                        <th className="border-0">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.slice(0, 5).map(order => (
                                        <tr key={order._id}>
                                            <td className="fw-bold text-dark">#{order._id.substring(order._id.length - 6).toUpperCase()}</td>
                                            <td className="text-muted">{new Date(order.createdAt).toLocaleDateString()}</td>
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
                    ) : (
                        <p className="text-muted text-center py-4">No recent orders found.</p>
                    )}
                </div>

                <div className="content-card">
                    <div className="content-card-header">
                        <h3 className="content-card-title">Profile Details</h3>
                        <button className="week-dropdown">Edit</button>
                    </div>
                    <div className="d-flex flex-column gap-3">
                        <div className="d-flex justify-content-between border-bottom pb-2">
                            <span className="text-muted">Name</span>
                            <span className="fw-medium">{user.name}</span>
                        </div>
                        <div className="d-flex justify-content-between border-bottom pb-2">
                            <span className="text-muted">Email</span>
                            <span className="fw-medium">{user.email}</span>
                        </div>
                        <div className="d-flex justify-content-between border-bottom pb-2">
                            <span className="text-muted">Phone</span>
                            <span className="fw-medium">{user.contact || 'N/A'}</span>
                        </div>
                        <div className="d-flex justify-content-between pb-2">
                            <span className="text-muted">Address</span>
                            <span className="fw-medium text-end" style={{ maxWidth: '200px' }}>{user.address || 'N/A'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const OrdersView = ({ orders }) => {
    return (
        <div className="content-card">
            <div className="content-card-header">
                <h3 className="content-card-title">All Orders</h3>
            </div>
            {orders.length === 0 ? (
                <div className="text-center py-5">
                    <p className="text-muted">No orders found.</p>
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-hover align-middle">
                        <thead className="bg-light">
                            <tr>
                                <th className="py-3 ps-4">Order ID</th>
                                <th className="py-3">Date</th>
                                <th className="py-3">Items</th>
                                <th className="py-3">Total</th>
                                <th className="py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td className="ps-4 fw-medium">#{order._id.substring(order._id.length - 6).toUpperCase()}</td>
                                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <div className="d-flex flex-column">
                                            {order.items.map((item, i) => (
                                                <small key={i} className="text-muted">• {item.title || item.name} (x{item.quantity})</small>
                                            ))}
                                        </div>
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
    )
}

function Dashboard() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            navigate('/');
            return;
        }
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        // Fetch Orders
        const fetchOrders = async () => {
            try {
                if (parsedUser.token) {
                    const data = await orderService.getMyOrders(parsedUser.token);
                    setOrders(data);
                }
            } catch (err) {
                console.error("Failed to fetch orders", err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        // Dispatch event if needed, or simple redirect
        window.location.href = '/';
    };

    if (loading) return <div className="d-flex justify-content-center align-items-center vh-100 bg-light">Loading Dashboard...</div>;

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <aside className={`dashboard-sidebar ${sidebarOpen ? 'mobile-open' : ''}`}>
                <div className="sidebar-logo d-flex align-items-center gap-2">
                    <img src={logo} alt="UNTRESSED Logo" style={{ height: '32px', width: 'auto' }} />
                    <img src={wordmark} alt="UNTRESSED" style={{ height: '18px', width: 'auto' }} />
                </div>

                <nav className="sidebar-menu">
                    <div
                        className={`sidebar-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('dashboard'); setSidebarOpen(false); }}
                    >
                        <FaThLarge className="sidebar-icon" />
                        <span>Dashboard</span>
                    </div>

                    <div
                        className={`sidebar-item ${activeTab === 'orders' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('orders'); setSidebarOpen(false); }}
                    >
                        <FaClipboardList className="sidebar-icon" />
                        <span>My Orders</span>
                    </div>

                    <div
                        className={`sidebar-item ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('dashboard'); setSidebarOpen(false); }} // Link Profile back to Dashboard Home or separate view if needed
                    >
                        <FaUser className="sidebar-icon" />
                        <span>Profile</span>
                    </div>
                </nav>

                <div className="p-3 border-top">
                    <div className="sidebar-item text-danger" onClick={handleLogout}>
                        <FaSignOutAlt className="sidebar-icon" />
                        <span>Logout</span>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="dashboard-main">
                {/* Top Nav */}
                <header className="dashboard-topnav">
                    <div className="d-flex align-items-center gap-3">
                        <button className="btn btn-light d-lg-none" onClick={() => setSidebarOpen(!sidebarOpen)}>
                            <FaBars />
                        </button>
                        <div className="search-bar-container d-none d-md-block">
                            <FaSearch className="search-icon" />
                            <input type="text" className="search-input" placeholder="Search orders, services..." />
                        </div>
                    </div>

                    <div className="user-controls">
                        <button className="notification-btn">
                            <FaBell />
                            <span className="notification-badge"></span>
                        </button>
                        <div className="d-flex align-items-center gap-2">
                            <img
                                src="https://ui-avatars.com/api/?name=User&background=random"
                                alt="User"
                                className="user-avatar"
                            />
                            <div className="d-none d-sm-block lh-1 text-end">
                                <span className="d-block fw-bold small text-dark">{user?.name}</span>
                                <span className="d-block text-muted" style={{ fontSize: '0.7rem' }}>{user?.role === 'admin' ? 'Administrator' : 'Customer'}</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Views */}
                <div className="dashboard-content-area">
                    {/* Header for View */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="fw-bold text-dark m-0">
                            {activeTab === 'dashboard' ? 'Dashboard' :
                                activeTab === 'orders' ? 'My Orders' : 'Profile'}
                        </h2>
                        {activeTab === 'dashboard' && (
                            <button className="btn btn-primary rounded-pill px-4" onClick={() => navigate('/cart')}>
                                + New Order
                            </button>
                        )}
                    </div>

                    {activeTab === 'dashboard' && <DashboardHome orders={orders} user={user} />}
                    {activeTab === 'orders' && <OrdersView orders={orders} />}

                </div>
            </main>

            {/* Overlay for mobile sidebar */}
            {sidebarOpen && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 bg-dark opacity-50 d-lg-none"
                    style={{ zIndex: 999 }}
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
}

export default Dashboard;
