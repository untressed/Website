import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '';

// Validate promo code
const validatePromoCode = async (code) => {
    try {
        const response = await axios.post(`${API_URL}/api/promo/validate`, { code });
        return response.data;
    } catch (error) {
        throw error.response?.data || { success: false, message: 'Failed to validate promo code' };
    }
};

// Get all promo codes (admin only)
const getAllPromoCodes = async (token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const response = await axios.get(`${API_URL}/api/promo`, config);
        return response.data;
    } catch (error) {
        throw error.response?.data || { success: false, message: 'Failed to fetch promo codes' };
    }
};

// Create promo code (admin only)
const createPromoCode = async (data, token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const response = await axios.post(`${API_URL}/api/promo`, data, config);
        return response.data;
    } catch (error) {
        throw error.response?.data || { success: false, message: 'Failed to create promo code' };
    }
};

// Update promo code (admin only)
const updatePromoCode = async (id, data, token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const response = await axios.put(`${API_URL}/api/promo/${id}`, data, config);
        return response.data;
    } catch (error) {
        throw error.response?.data || { success: false, message: 'Failed to update promo code' };
    }
};

// Delete promo code (admin only)
const deletePromoCode = async (id, token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const response = await axios.delete(`${API_URL}/api/promo/${id}`, config);
        return response.data;
    } catch (error) {
        throw error.response?.data || { success: false, message: 'Failed to delete promo code' };
    }
};

const promoService = {
    validatePromoCode,
    getAllPromoCodes,
    createPromoCode,
    updatePromoCode,
    deletePromoCode
};

export default promoService;
