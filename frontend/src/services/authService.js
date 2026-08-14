import api from './api';

// Register a new user account
// POST /api/auth/register
// Body: { name, email, password }
// Response: { message, user: { _id, name, email, avatar } }
export const registerUser = async (name, email, password) => {
  const response = await api.post('/auth/register', { name, email, password });
  return response.data; // { message, user }
};

// Log in with email and password
// POST /api/auth/login
// Body: { email, password }
// Response: { message, user: { _id, name, email, avatar } }
// The backend also sets an httpOnly cookie named "accessToken"
export const loginUser = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data; // { message, user }
};

// Log out — backend clears the accessToken cookie
// POST /api/auth/logout
export const logoutUser = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};

// Get the currently logged-in user (used to restore session on page refresh)
// GET /api/auth/me
// Requires: accessToken cookie (sent automatically)
// Response: { message, user: { _id, name, email, avatar } }
export const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return response.data; // { message, user }
};
