// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
    // User endpoints
    REGISTER_USER: `${API_BASE_URL}/api/users`,
    LOGIN_USER: `${API_BASE_URL}/api/users/login`,
    GET_PROFILE: `${API_BASE_URL}/api/users/profile`,

    // Restaurant endpoints
    GET_RESTAURANTS: `${API_BASE_URL}/api/restaurants`,
    GET_RESTAURANT: (id) => `${API_BASE_URL}/api/restaurants/${id}`,
    CREATE_RESTAURANT: `${API_BASE_URL}/api/restaurants`,
    UPDATE_RESTAURANT: (id) => `${API_BASE_URL}/api/restaurants/${id}`,

    // Table endpoints
    GET_TABLES: (restaurantId) => `${API_BASE_URL}/api/tables/restaurant/${restaurantId}`,
    CREATE_TABLE: `${API_BASE_URL}/api/tables`,
    UPDATE_TABLE: (id) => `${API_BASE_URL}/api/tables/${id}`,
    DELETE_TABLE: (id) => `${API_BASE_URL}/api/tables/${id}`,

    // Reservation endpoints
    CREATE_RESERVATION: `${API_BASE_URL}/api/reservations`,
    GET_RESERVATIONS: `${API_BASE_URL}/api/reservations`,
    GET_RESERVATION: (id) => `${API_BASE_URL}/api/reservations/${id}`,
    UPDATE_RESERVATION: (id) => `${API_BASE_URL}/api/reservations/${id}`,
    DELETE_RESERVATION: (id) => `${API_BASE_URL}/api/reservations/${id}`,
    GET_RESTAURANT_RESERVATIONS: (restaurantId) => `${API_BASE_URL}/api/reservations/restaurant/${restaurantId}`,
};

export default API_BASE_URL;
