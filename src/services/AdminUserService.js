import axios from "axios";
import { getToken } from "./UserService";


const BASE_URL = 'http://localhost:9090';

// Configure axios defaults for admin endpoints
const adminApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Function to get admin ID from token
function getAdminId() {
    const token = getToken();
    if (!token) return null;
    
    // Decode JWT token to get userId
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload).userId;
} 

// Add token to every request
adminApi.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Get all users
export const getAllUsers = async () => {
    try {
        const adminId = getAdminId();
        const response = await adminApi.get(`/admin/users/${adminId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

// Get user by ID
export const getUserById = async (userId) => {
    try {
        const adminId = getAdminId();
        const response = await adminApi.get(`/users/admin/${adminId}/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching user ${userId}:`, error);
        throw error;
    }
};

// Create new user
export const createUser = async (userData) => {
    try {
        const adminId = getAdminId();
        const response = await adminApi.post(`/users/admin/${adminId}`, userData);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

// Update user
export const updateUser = async (userId, userData) => {
    try {
        const adminId = getAdminId();
        const response = await adminApi.put(`/user/${userId}`, userData);
        return response.data;
    } catch (error) {
        console.error(`Error updating user ${userId}:`, error);
        throw error;
    }
};

// Delete user
export const deleteUser = async (userId) => {
    try {
        const adminId = getAdminId();
        await adminApi.delete(`/admin/users/${userId}`);
    } catch (error) {
        console.error(`Error deleting user ${userId}:`, error);
        throw error;
    }
};

// Change user role
export const changeUserRole = async (userId, newRole) => {
    try {
        const adminId = getAdminId();
        const response = await adminApi.patch(`/users/admin/${adminId}/user/${userId}/role`, { role: newRole });
        return response.data;
    } catch (error) {
        console.error(`Error changing role for user ${userId}:`, error);
        throw error;
    }
};

// Reset user password
export const resetUserPassword = async (userId) => {
    try {
        const adminId = getAdminId();
        const response = await adminApi.post(`/users/admin/${adminId}/user/${userId}/reset-password`);
        return response.data;
    } catch (error) {
        console.error(`Error resetting password for user ${userId}:`, error);
        throw error;
    }
};

// Get user statistics
export const getUserStatistics = async () => {
    try {
        const adminId = getAdminId();
        const response = await adminApi.get(`/users/admin/${adminId}/statistics`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user statistics:', error);
        throw error;
    }
};

// Search users
export const searchUsers = async (searchParams) => {
    try {
        const adminId = getAdminId();
        const response = await adminApi.get(`/users/admin/${adminId}/search`, { params: searchParams });
        return response.data;
    } catch (error) {
        console.error('Error searching users:', error);
        throw error;
    }
};

// Export users data
export const exportUsersData = async (format = 'csv') => {
    try {
        const adminId = getAdminId();
        const response = await adminApi.get(`/users/admin/${adminId}/export`, {
            params: { format },
            responseType: 'blob'
        });
        return response.data;
    } catch (error) {
        console.error('Error exporting users data:', error);
        throw error;
    }
}; 

// Get recent activity for admin dashboard
export const getRecentActivity = async () => {
    try {
      const adminId = getAdminId();
      const response = await adminApi.get(`/admin/users/recent-projects`);
      
      const recentUsers = response.data || [];
      const userCount = recentUsers.length;
  
      return {
        users: recentUsers,
        count: userCount
      };
    } catch (error) {
      console.error('Error fetching recent activity:', error);
      throw error;
    }
  };
  
// Get current customers count
export const getCurrentCustomersCount = async () => {
  try {
    const response = await adminApi.get('/admin/users/current-customers');
    return response.data;
  } catch (error) {
    console.error('Error fetching current customers count:', error);
    throw error;
  }
};


// Get user registrations per month
export const getUserRegistrationsPerMonth = async () => {
  try {
    const response = await adminApi.get(`/admin/users/registrations-per-month`);
    return response.data;  // expected format: [{month: "2025-08", count: 30}, ...]
  } catch (error) {
    console.error('Error fetching user registrations per month:', error);
    throw error;
  }
};
