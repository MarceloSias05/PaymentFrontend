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
            
            // Simulación de API call para desarrollo
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Credenciales de prueba
            if (email === 'admin@credifiel.com' && password === 'admin123') {
                const userData = {
                    id: 1,
                    name: 'Administrador Credifiel',
                    email: email,
                    role: 'admin'
                };
                
                const token = 'mock-jwt-token-' + Date.now();
                
                // Guardar datos del usuario y token
                localStorage.setItem('credifiel_user', JSON.stringify(userData));
                localStorage.setItem('credifiel_token', token);
                
                setUser(userData);
                setIsAuthenticated(true);
                
                return { success: true };
            } else {
                throw new Error('Credenciales inválidas');
            }
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
            
            // Simulación de API call para desarrollo
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Validaciones básicas
            if (!userData.email || !userData.password || !userData.name) {
                throw new Error('Todos los campos son requeridos');
            }
            
            // Simular que algunos emails ya están registrados
            if (userData.email === 'existing@credifiel.com') {
                throw new Error('El email ya está registrado');
            }
            
            const newUser = {
                id: Date.now(),
                name: userData.name,
                email: userData.email,
                role: 'user'
            };
            
            const token = 'mock-jwt-token-' + Date.now();
            
            // Auto-login después del registro
            localStorage.setItem('credifiel_user', JSON.stringify(newUser));
            localStorage.setItem('credifiel_token', token);
            
            setUser(newUser);
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