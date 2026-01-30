import { API_BASE_URL } from './constants';
import { getToken } from './auth';

/**
 * Custom API client with authentication support
 */
class ApiClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const token = getToken();

        const config = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        };

        // Add authorization header if token exists
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        // Handle FormData (for file uploads)
        if (options.body instanceof FormData) {
            delete config.headers['Content-Type'];
        }

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    get(endpoint, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: 'GET',
        });
    }

    post(endpoint, body, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: 'POST',
            body: body instanceof FormData ? body : JSON.stringify(body),
        });
    }

    put(endpoint, body, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: 'PUT',
            body: body instanceof FormData ? body : JSON.stringify(body),
        });
    }

    delete(endpoint, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: 'DELETE',
        });
    }
}

// Create and export API client instance
const api = new ApiClient(API_BASE_URL);
export default api;
