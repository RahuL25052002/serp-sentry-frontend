import axios from "axios";
import { getToken } from "./UserService";


const API_URL = "http://localhost:8080";

// Function to get userId from JWT token


// Get all notifications for the current user
export function getAllNotifications() {
    const userId = getUserId();
    return axios.get(`${API_URL}/notifications/${userId}`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });
}

// Get unread notifications count
export function getUnreadCount() {
    const userId = getUserId();
    return axios.get(`${API_URL}/notifications/user/${userId}/unread/count`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });
}

// Mark a single notification as read
export function markAsRead(notificationId) {
    const userId = getUserId();
    return axios.put(`${API_URL}/notifications/${notificationId}/read`, {
        userId: userId
    }, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });
}

// Mark all notifications as read
export function markAllAsRead() {
    const userId = getUserId();
    return axios.put(`${API_URL}/notifications/read-all`, {
        userId: userId
    }, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });
}

// Delete a single notification
export function deleteNotification(notificationId) {
    const userId = getUserId();
    return axios.delete(`${API_URL}/notifications/${userId}/${notificationId}`, {
        headers: { 'Authorization': `Bearer ${getToken()}` },
        data: { userId: userId }
    });
}

// Delete all notifications
export function deleteAllNotifications() {
    const userId = getUserId();
    return axios.delete(`${API_URL}/notifications/${userId}`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });
}

// Get notifications by type (BIRTHDAY, ANNIVERSARY, etc.)
export function getNotificationsByType(type) {
    const userId = getUserId();
    return axios.get(`${API_URL}/notifications/user/${userId}/type/${type}`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });
}

// Get notifications within a date range
export function getNotificationsByDateRange(startDate, endDate) {
    const userId = getUserId();
    return axios.get(`${API_URL}/notifications/user/${userId}/range`, {
        params: {
            startDate,
            endDate
        },
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });
} 

function getUserId() {
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