import axios from 'axios';

// Create a single Axios instance used throughout the entire app.
// baseURL is read from the .env file — never hardcoded.
// withCredentials: true tells the browser to send the httpOnly
// accessToken cookie automatically on every request.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export default api;
