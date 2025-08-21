import axios from 'axios';
import { getToken } from './UserService';  // Make sure this import is correct

const BASE_URL = 'http://localhost:9090';

export async function getAllProjects() {
  const token = getToken();
  const response = await axios.get(`${BASE_URL}/user/projects`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function createProject(project) {
  const token = getToken();
  const response = await axios.post(`${BASE_URL}/user/projects`, project, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
}

export const getIndividualByEmail = async (email) => {
  try {
    const token = getToken();
    const response = await axios.get(`${BASE_URL}/user/projects/email`, {
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

// Fixed getProjectsByUserId function
export const getProjectsByUserId = async (userId) => {
  try {
    console.log('Fetching projects for userId:', userId); // Debug log
    
    if (!userId) {
      throw new Error('User ID is required');
    }
    
    // Ensure userId is a number and construct proper URL
    const numericUserId = Number(userId);
    if (isNaN(numericUserId)) {
      throw new Error('Invalid user ID format');
    }
    
    const url = `${BASE_URL}/user/projects/user/${numericUserId}`;
    console.log('Constructed URL:', url); // Debug log
    
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    });
    
    console.log('Projects API response:', response.data); // Debug log
    return response.data;
  } catch (error) {
    console.error("Failed to fetch projects for user:", error);
    
    // Log more details about the error
    if (error.response) {
      console.error('Error status:', error.response.status);
      console.error('Error data:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    
    throw error;
  }
};

// Get project by ID
export const getProjectById = async (projectId) => {
  try {
    const token = getToken();
    const response = await axios.get(`${BASE_URL}/user/projects/${projectId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch project by ID:", error);
    throw error;
  }
};

// Update an existing project
export const updateProject = async (projectId, projectData) => {
  try {
    const token = getToken();
    const response = await axios.put(`${BASE_URL}/user/projects/${projectId}`, projectData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.error("Failed to update project:", error);
    throw error;
  }
};

// Delete a project
export const deleteProject = async (projectId) => {
  try {
    const token = getToken();
    const response = await axios.delete(`${BASE_URL}/user/projects/${projectId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Failed to delete project:", error);
    throw error;
  }
};