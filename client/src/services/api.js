const API_URL = 'http://localhost:3000/api';

// Helper function to get token from localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Helper function to make API requests
const apiRequest = async (url, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }

  return data;
};

// Authentication APIs
export const register = async (userData) => {
  const data = await apiRequest(`${API_URL}/auth/register`, {
    method: 'POST',
    body: JSON.stringify(userData),
  });

  if (data.token) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }

  return data;
};

export const login = async (credentials) => {
  const data = await apiRequest(`${API_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

  if (data.token) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }

  return data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getProfile = async () => {
  return await apiRequest(`${API_URL}/auth/profile`);
};

// BMI Calculator API
export const calculateBMI = async (weight, height) => {
  return await apiRequest(`${API_URL}/bmi/calculate`, {
    method: 'POST',
    body: JSON.stringify({ weight, height }),
  });
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getToken();
};

// Get current user from localStorage
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};
