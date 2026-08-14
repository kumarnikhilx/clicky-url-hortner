import api from './api';

// Create a short URL
// POST /api/create
// Body: { url, slug? }  (slug is optional, only works for authenticated users)
// Response: { shortUrl: "http://localhost:3000/abc1234" }
// Works for both guests and logged-in users.
// If logged in, the URL is linked to the user's account.
export const createShortUrl = async (url, slug = '') => {
  const body = { url };

  // Only include slug if the user actually typed one
  if (slug && slug.trim() !== '') {
    body.slug = slug.trim();
  }

  const response = await api.post('/create', body);
  return response.data; // { shortUrl: "http://localhost:3000/abc1234" }
};

// Get all URLs created by the logged-in user
// POST /api/user/urls
// Requires: accessToken cookie (sent automatically)
// Response: { message: "success", urls: [ { _id, originalUrl, shortUrl, click, user_id } ] }
export const getUserUrls = async () => {
  const response = await api.post('/user/urls');
  return response.data; // { message, urls }
};
