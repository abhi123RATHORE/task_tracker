import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Response interceptor — extracts a user-friendly error message from backend
 * error responses. Backend returns { statusCode, message, timestamp }.
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const data = error?.response?.data;
    const fallback = error?.message || 'An unexpected error occurred';
    const message = data?.message || data?.error || fallback;
    // Attach cleaned message so callers can simply use `err.userMessage`
    error.userMessage = message;
    return Promise.reject(error);
  },
);

export default api;