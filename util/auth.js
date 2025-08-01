import axios from 'axios';
import { BASE_URL } from '../constants/box';

export async function register(name, email, password) {
  const url = `${BASE_URL}/auth/register`;
  
  try {
    const response = await axios.post(url, {
      email,
      password,
      name
    });

    if (response.status >= 200 && response.status < 300) {
      return {
        success: true,
        message: response.data.message || 'Registration successful!',
      };
    } else {
      throw new Error(response.data.message || 'Registration failed. Please try again.');
    }
  } catch (error) {
    if (error.response) {
      const serverMessage = error.response.data?.message || error.response.data?.error;
      if (error.response.status === 409) {
        throw new Error('Email already registered. Please use a different email.');
      } else if (error.response.status === 400) {
        throw new Error(serverMessage || 'Invalid registration data. Please check your information.');
      } else {
        throw new Error(serverMessage || `Registration failed (Status: ${error.response.status})`);
      }
    } else if (error.request) {
      throw new Error('No response from server. Please check your network connection.');
    } else {
      throw new Error(error.message || 'Registration failed. Please try again.');
    }
  }
}

export async function login(email, password) {
  const url = `${BASE_URL}/auth/login`;
  
  if (!email || !password) {
    throw new Error('Email and password are required');
  }
  
  try {
    const response = await axios.post(url, {
      email,
      password
    });

    if (response.status >= 200 && response.status < 300) {
      if (!response.data.access_token) {
        throw new Error('Authentication token missing in response');
      }
      
      return response.data.access_token;
    } else {
      throw new Error(response.data.message || `Login failed with status ${response.status}`);
    }
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      let errorMessage = 'Login failed. Please try again.';
      
      switch (status) {
        case 401:
          errorMessage = 'Invalid email or password';
          break;
        case 403:
          errorMessage = 'Account disabled. Please contact support.';
          break;
        case 429:
          errorMessage = 'Too many login attempts. Please try again later.';
          break;
        case 500:
          errorMessage = 'Server error. Please try again later.';
          break;
        default:
          // Intentar obtener mensaje de error del servidor
          errorMessage = error.response.data?.message || error.response.data?.error || `Login failed with status ${status}`;
      }
      
      throw new Error(errorMessage);
    } else if (error.request) {
      throw new Error('No response from server. Please check your network connection.');
    } else {
      throw new Error(error.message || 'Login request failed. Please try again.');
    }
  }
}

export async function logout(token) {
  try {
    const url = `${BASE_URL}/auth/logout`;
    const response = await axios.post(
      url, 
      null, // Body vacío
      {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
    );

    if (response.status >= 200 && response.status < 300) {
      return response.status;
    } else {
      throw new Error(`Logout failed with status: ${response.status}`);
    }
  } catch (error) {
    if (error.response) {
      throw new Error(`Server responded with status: ${error.response.status}`);
    } else if (error.request) {
      throw new Error('No response received from server');
    } else {
      throw new Error(`Request setup error: ${error.message}`);
    }
  }
}