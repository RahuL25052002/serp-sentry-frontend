import axios from 'axios';
import { getToken } from './UserService';

const BASE_URL = 'http://localhost:9090';

export async function getIndividualById(id) {
  const res = await fetch(`${BASE_URL}/individuals/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
    }
  });
  if (!res.ok) throw new Error('Failed to fetch user');
  return await res.json();
}

export async function getUserByEmail(email) {
  console.log('Calling getUserByEmail with email:', email);
  console.log('Full URL:', `${BASE_URL}/individuals/email?email=${encodeURIComponent(email)}`);
  
  const res = await fetch(`${BASE_URL}/individuals/email?email=${encodeURIComponent(email)}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
    }
  });
  
  console.log('Response status:', res.status);
  console.log('Response headers:', res.headers);
  
  if (!res.ok) {
    const errorText = await res.text();
    console.error('Error response:', errorText);
    throw new Error(`Failed to fetch user by email: ${res.status} - ${errorText}`);
  }
  
  const data = await res.json();
  console.log('Success response:', data);
  return data;
} 

// Add this function to your existing IndividualService.js file



// Your existing functions here...

// Add this new function to get user by email
export const getIndividualByEmail = async (email) => {
  try {
    const token = getToken();
    const response = await axios.get(`${BASE_URL}/individuals/email`, {
      params: {
        email: email
      },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user by email:", error);
    throw error;
  }
};