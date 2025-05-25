import React, { createContext, useContext, useState, useEffect } from 'react';

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
        const savedUser = localStorage.getItem('credifiel_user');
        const savedToken = localStorage.getItem('credifiel_token');
        
        if (savedUser && savedToken) {
            setUser(JSON.parse(savedUser));
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            setLoading(true);
            
            // Simulación de API call - reemplazar con llamada real
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Credenciales inválidas');
            }

            const data = await response.json();
            
            // Guardar datos del usuario y token
            localStorage.setItem('credifiel_user', JSON.stringify(data.user));
            localStorage.setItem('credifiel_token', data.token);
            
            setUser(data.user);
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
            
            // Simulación de API call - reemplazar con llamada real
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error('Error al crear la cuenta');
            }

            const data = await response.json();
            
            // Auto-login después del registro
            localStorage.setItem('credifiel_user', JSON.stringify(data.user));
            localStorage.setItem('credifiel_token', data.token);
            
            setUser(data.user);
            setIsAuthenticated(true);
            
            return { success: true };
        } catch (error) {
            console.error('Error en registro:', error);
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('credifiel_user');
        localStorage.removeItem('credifiel_token');
        setUser(null);
        setIsAuthenticated(false);
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