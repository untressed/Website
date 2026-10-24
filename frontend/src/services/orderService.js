import axios from 'axios';

const API_URL = '/api/orders/';

// Create new order
const createOrder = async (orderData, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    const response = await axios.post(API_URL, orderData, config);

    return response.data;
};

// Get user orders
const getMyOrders = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(API_URL + 'myorders', config);

    return response.data;
};

// Verify payment
const verifyPayment = async (paymentData) => {
    const response = await axios.post(API_URL + 'verify', paymentData);
    return response.data;
};

const orderService = {
    createOrder,
    getMyOrders,
    verifyPayment,
};

export default orderService;
