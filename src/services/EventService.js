import axios from "axios";
import { getToken } from "./UserService";

const API_URL = "http://localhost:8080";

export function getAllEvents() {
    console.log(getToken());
    return axios.get(`${API_URL}/events/${getUserId()}`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });
}

export function deleteEvent(eventId) {
    return axios.delete(`${API_URL}/events/${getUserId()}/${eventId}`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });
}

export function deleteAllEvents() {
    return axios.delete(`${API_URL}/events/${getUserId()}`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });
}

export function updateEvent(eventId, eventData) {
    return axios.put(`${API_URL}/events/${getUserId()}/${eventId}`, eventData, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });
}

export function createEvent(eventData) {
    return axios.post(`${API_URL}/events/${getUserId()}`, eventData, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });
}

export function getEvent(eventId) {
    return axios.get(`${API_URL}/events/${getUserId()}/${eventId}`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });
}

// Helper function to get userId from JWT token
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