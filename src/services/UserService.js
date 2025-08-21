import axios from "axios";

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';
const BASE_URL = 'http://localhost:9090';

export const storeToken = (token) => {
    if (!token) {
        console.error('Attempted to store null/undefined token');
        return;
    }
    localStorage.setItem(TOKEN_KEY, token);
    console.log('Token stored in localStorage:', token);
    // Set the default Authorization header for all future requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log('Authorization header set:', axios.defaults.headers.common['Authorization']);
};

export const storeUserData = (userData) => {
    if (!userData) {
        console.error('Attempted to store null/undefined user data');
        return;
    }
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
};

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

export const getUserData = () => {
    const userData = localStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
};

export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    // Remove the Authorization header
    delete axios.defaults.headers.common['Authorization'];
};

export const isAuthenticated = () => {
    return !!getToken();
};

export const login = async (formData) => {
    try {
        console.log('Sending login request with:', formData);
        const response = await axios.post(`${BASE_URL}/auth/signin`, formData);
        console.log('Raw login response:', response.data);
        
        if (response.data && response.data.token) {
            // Store token immediately upon successful login
            const token = response.data.token;
            console.log('Token received:', token);
            storeToken(token);
            return response;
        } else {
            console.error('Login response missing token:', response);
            throw new Error('Invalid login response format');
        }
    } catch (error) {
        console.error('Login request failed:', error);
        throw error;
    }
};

export const signUp = async (formData) => {
    try {
        console.log('Sending registration request with:', formData);
        const response = await axios.post(`${BASE_URL}/auth/signup`, formData);
        console.log('Registration response:', response);
        
        // If the backend sends a specific success message, it will be in response.data
        if (response.data && response.data.message) {
            return {
                status: response.status,
                message: response.data.message
            };
        }
        
        return response;
    } catch (error) {
        console.error('Registration error:', error.response || error);
        
        // If the backend sends a specific error message
        if (error.response?.data) {
            throw {
                status: error.response.status,
                message: error.response.data.message || error.response.data.error || error.response.data,
                errors: error.response.data.errors // For validation errors if any
            };
        }
        
        // For network errors or other issues
        throw {
            status: 500,
            message: 'Unable to connect to the server. Please try again later.'
        };
    }
};

// Get all users (admin only)
export const getAllUsers = () => {
    return axios.get(`${BASE_URL}/users`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });
};

// Update user (admin only)
export const updateUser = (userId, userData) => {
    return axios.put(`${BASE_URL}/users/${userId}`, userData, {
        headers: { 
            'Authorization': `Bearer ${getToken()}`,
            'Content-Type': 'application/json'
        }
    });
};

// Delete user (admin only)
export const deleteUser = (userId) => {
    return axios.delete(`${BASE_URL}/users/${userId}`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });
};

export function getUserId() {
    return localStorage.getItem('userId');
}

