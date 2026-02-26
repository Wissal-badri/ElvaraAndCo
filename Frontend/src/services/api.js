import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const UPLOADS_URL = BASE_URL.replace('/api', '/uploads');

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * Convert a stored image value (filename OR full URL) to a full URL.
 * @param {string|null} image - filename like "elvara-product-xxx.png" or full http URL
 * @returns {string|null}
 */
export const getImageUrl = (image) => {
    if (!image) return null;
    if (image.startsWith('http')) return image;
    return `${UPLOADS_URL}/${image}`;
};

export default api;

