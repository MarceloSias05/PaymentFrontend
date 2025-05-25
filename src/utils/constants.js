// Application Constants

// API Configuration
export const API_CONFIG = {
    BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
    TIMEOUT: 30000,
    RETRY_ATTEMPTS: 3,
};

// Authentication
export const AUTH_CONFIG = {
    TOKEN_KEY: 'credifiel_token',
    USER_KEY: 'credifiel_user',
    REFRESH_TOKEN_KEY: 'credifiel_refresh_token',
    TOKEN_EXPIRY_BUFFER: 300000, // 5 minutes in milliseconds
};

// Routes
export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    DASHBOARD: '/dashboard',
    ANALYTICS: '/analytics',
    REPORTS: '/reports',
    SETTINGS: '/settings',
};

// Credifiel Business Constants (based on case study)
export const CREDIFIEL_DATA = {
    FOUNDING_YEAR: 2005,
    TOTAL_LOANS: 640000,
    TOTAL_CLIENTS: 320000,
    BRANCHES: 70,
    GOV_AGREEMENTS: 90,
    EMPLOYEES: 1500,
    PRESENCE_STATES: ['Puebla', 'Oaxaca', 'Guadalajara', 'Ciudad de México', 'Michoacán'],
};

// Banks and Financial Institutions
export const BANKS = {
    BBVA: {
        name: 'BBVA México',
        code: 'BBVA',
        strategies: 5,
        color: '#004481',
    },
    SANTANDER: {
        name: 'Santander',
        code: 'SANTANDER', 
        strategies: 4,
        color: '#EC0000',
    },
    BANORTE: {
        name: 'Banorte',
        code: 'BANORTE',
        strategies: 3,
        color: '#C8102E',
    },
    BANAMEX: {
        name: 'Banamex',
        code: 'BANAMEX',
        strategies: 3,
        color: '#DA020E',
    },
};

// Test credentials
export const TEST_CREDENTIALS = {
    ADMIN: {
        email: 'admin@credifiel.com',
        password: 'admin123',
        name: 'Administrador Credifiel',
        role: 'admin'
    },
    USER: {
        email: 'usuario@credifiel.com',
        password: 'usuario123',
        name: 'Usuario Credifiel',
        role: 'user'
    }
};