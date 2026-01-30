import { STORAGE_KEYS } from './constants';

/**
 * Get authentication token from localStorage
 */
export const getToken = () => {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
};

/**
 * Set authentication token in localStorage
 */
export const setToken = (token) => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
};

/**
 * Remove authentication token from localStorage
 */
export const removeToken = () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
};

/**
 * Get user data from localStorage
 */
export const getUser = () => {
    const userData = localStorage.getItem(STORAGE_KEYS.USER);
    return userData ? JSON.parse(userData) : null;
};

/**
 * Set user data in localStorage
 */
export const setUser = (user) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

/**
 * Remove user data from localStorage
 */
export const removeUser = () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
    return !!getToken();
};

/**
 * Clear all auth data
 */
export const clearAuth = () => {
    removeToken();
    removeUser();
};
