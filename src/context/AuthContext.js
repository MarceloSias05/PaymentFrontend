import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../hooks/useApi';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Verificar si hay un usuario guardado en localStorage
        const savedUser = authService.getCurrentUser();
        const hasToken = authService.isAuthenticated();
        
        if (savedUser && hasToken) {
            setUser(savedUser);
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            setLoading(true);
            
            // Usar el servicio de autenticación real
            const userData = await authService.login(email, password);
            
            setUser(userData);
            setIsAuthenticated(true);
            
            return { success: true };
        } catch (error) {
            console.error('Error en login:', error);
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        try {
            setLoading(true);
            
            // Usar el servicio de registro real
            const result = await authService.register(userData);
            
            // Después del registro exitoso, hacer login automático
            const loginResult = await authService.login(userData.email, userData.password);
            
            setUser(loginResult);
            setIsAuthenticated(true);
            
            return { success: true };
        } catch (error) {
            console.error('Error en registro:', error);
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
        } catch (error) {
            console.error('Error en logout:', error);
        } finally {
            setUser(null);
            setIsAuthenticated(false);
        }
    };

    const value = {
        user,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};