import axios from 'axios';

const API_URL = "https://loginformsprojectgroup5-backend-production.up.railway.app";

export const loginUser = async (email, password, captchaToken) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, {
      email,
      password,
      captcha_token: captchaToken 
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (username, email, password, captchaToken) => {
  const response = await axios.post(`${API_URL}/api/auth/signup`, {
      username: username,
      email: email,
      password: password,
      captcha_token: captchaToken
  });
  return response.data;
};

export const verifyOtp = async (userId, code) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/verify-otp`, {
            user_id: userId,
            code: code
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};