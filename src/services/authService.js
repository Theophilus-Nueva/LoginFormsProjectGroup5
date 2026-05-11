import axios from 'axios';

const API_URL = "https://loginformsprojectgroup5-backend-production.up.railway.app";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};