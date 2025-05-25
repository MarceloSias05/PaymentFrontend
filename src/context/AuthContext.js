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
        const initializeAuth = async () => {
            try {
                setLoading(true);
                
                const savedUser = authService.getCurrentUser();
                const hasToken = authService.isAuthenticated();
                
                console.log('Inicializando auth:', { savedUser, hasToken });
                
                if (savedUser && hasToken) {
                    // Intentar obtener datos actualizados del usuario
                    try {
                        const updatedUser = await authService.getUserProfile();
                        console.log('Datos actualizados del usuario:', updatedUser);
                        setUser(updatedUser);
                        setIsAuthenticated(true);
                    } catch (error) {
                        console.log('Error obteniendo perfil actualizado, usando datos guardados:', error);
                        // Si falla, usar los datos guardados
                        setUser(savedUser);
                        setIsAuthenticated(true);
                    }
                }
            } catch (error) {
                console.error('Error inicializando autenticación:', error);
                // Limpiar datos si hay error
                authService.logout();
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, []);

    const login = async (email, password) => {
        try {
            setLoading(true);
            
            // Usar el servicio de autenticación real
            const userData = await authService.login(email, password);
            
            console.log('Datos de usuario después del login:', userData);
            
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
            
            console.log('Resultado del registro:', result);
            
            // Después del registro exitoso, hacer login automático
            const loginResult = await authService.login(userData.email, userData.password);
            
            console.log('Datos después del login automático:', loginResult);
            
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

    const updateUser = (updatedUserData) => {
        setUser(prev => ({
            ...prev,
            ...updatedUserData
        }));
        
        // Actualizar también en localStorage
        const currentUser = authService.getCurrentUser();
        const newUserData = { ...currentUser, ...updatedUserData };
        localStorage.setItem('user', JSON.stringify(newUserData));
    };

    const value = {
        user,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
        updateUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};