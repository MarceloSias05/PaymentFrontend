import axios from 'axios';

const API_URL = 'http://localhost:8000/api/auth/';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token expiration and refreshing
apiClient.interceptors.response.use(
  response => {
    return response;
  }, 
  async error => {
    const originalRequest = error.config;
    
    // If 401 Unauthorized and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh the token
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          // No refresh token available, logout
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          window.location.href = '/login';
          return Promise.reject(error);
        }
        
        const response = await axios.post(`${API_URL}token/refresh/`, {
          refresh: refreshToken
        });
        
        if (response.data.access) {
          // Store the new access token
          localStorage.setItem('accessToken', response.data.access);
          
          // Update the original request with the new token
          originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;
          
          // Retry the original request
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // If refreshing fails, logout
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// Auth service
export const authService = {
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_URL}login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.detail || 'Error en la autenticación');
      }
      
      const data = await response.json();
      console.log('Datos recibidos del login:', data);
      
      // Guardar tokens
      if (data.access) {
        localStorage.setItem('accessToken', data.access);
      }
      
      if (data.refresh) {
        localStorage.setItem('refreshToken', data.refresh);
      }
  
      // Extraer información del usuario de la respuesta
      let userData = {
        id: data.user_id || data.user?.id,
        username: data.username || data.user?.username,
        email: data.email || data.user?.email || email,
        name: data.name || data.user?.name || data.first_name || data.user?.first_name || data.username || data.user?.username,
        first_name: data.first_name || data.user?.first_name,
        last_name: data.last_name || data.user?.last_name,
        role: data.role || data.user?.role || 'user',
        discipline: data.discipline || data.user?.discipline,
        is_active: data.is_active || data.user?.is_active || true,
        date_joined: data.date_joined || data.user?.date_joined,
        last_login: data.last_login || data.user?.last_login,
        // Campos adicionales que puedan venir del backend
        phone: data.phone || data.user?.phone,
        avatar: data.avatar || data.user?.avatar,
        department: data.department || data.user?.department,
        position: data.position || data.user?.position,
      };

      // Construir nombre completo si no existe
      if (!userData.name && userData.first_name) {
        userData.name = `${userData.first_name} ${userData.last_name || ''}`.trim();
      }
      
      console.log('userData procesada:', userData);
      
      // Guardar datos del usuario en localStorage
      localStorage.setItem('user', JSON.stringify(userData));
  
      return userData;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  },

  register: async (userData) => {
    try {
      console.log('🚀 Intentando registro:', { 
        url: `${API_URL}register/`, 
        userData 
      });
      
      const response = await fetch(`${API_URL}register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      console.log('📡 Register Response status:', response.status);
      
      const responseText = await response.text();
      console.log('📡 Register Response text:', responseText);
      
      if (!response.ok) {
        let errorData;
        try {
          errorData = JSON.parse(responseText);
          console.error('❌ Register Error parsed:', errorData);
        } catch (parseError) {
          console.error('❌ Register Error - No se pudo parsear JSON:', responseText);
          throw new Error(`Error ${response.status}: ${responseText}`);
        }
        throw new Error(errorData.error || errorData.detail || JSON.stringify(errorData) || 'Error en el registro');
      }
      
      let data;
      try {
        data = JSON.parse(responseText);
        console.log('✅ Register exitoso:', data);
      } catch (parseError) {
        console.error('❌ Register - Respuesta no es JSON válido:', responseText);
        throw new Error('Respuesta no válida del servidor');
      }
      
      return data;
    } catch (error) {
      console.error('❌ Error completo en registro:', error);
      throw error;
    }
  },

  logout: async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    const accessToken = localStorage.getItem("accessToken"); 
    
    try {
      await fetch(`${API_URL}logout/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`, 
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });
    } catch (apiError) {
      console.error('Error al comunicar logout al servidor:', apiError);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
    
    return { success: true };
  },
  
  getCurrentUser: () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        console.log('Usuario obtenido del localStorage:', user);
        return user;
      } catch (error) {
        console.error('Error parseando datos de usuario:', error);
        return null;
      }
    }
    return null;
  },
  
  isAuthenticated: () => {
    const token = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user');
    return !!(token && user);
  },
  
  getUserRole: () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        return user.role || 'user';
      } catch (error) {
        console.error('Error obteniendo rol del usuario:', error);
        return 'user';
      }
    }
    return 'user';
  },
  
  // Método para obtener perfil del usuario
  getUserProfile: async () => {
    try {
      const response = await apiClient.get('profile/');
      
      // Actualizar localStorage con datos frescos
      const updatedUser = response.data;
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return updatedUser;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      // Si falla, retornar datos del localStorage
      return authService.getCurrentUser();
    }
  },

  // Método para actualizar perfil del usuario
  updateUserProfile: async (userData) => {
    try {
      const response = await apiClient.put('profile/update/', userData);
      
      // Actualizar localStorage con datos actualizados
      const updatedUser = response.data;
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return updatedUser;
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  },

  // Método para cambiar contraseña
  changePassword: async (passwordData) => {
    try {
      const response = await apiClient.post('change-password/', passwordData);
      return response.data;
    } catch (error) {
      console.error("Error changing password:", error);
      throw error;
    }
  },

  // Método para solicitar reset de contraseña
  requestPasswordReset: async (email) => {
    try {
      const response = await apiClient.post('password-reset/', { email });
      return response.data;
    } catch (error) {
      console.error("Error requesting password reset:", error);
      throw error;
    }
  },

  // Método para obtener lista de usuarios (si el usuario tiene permisos)
  getUsersList: async () => {
    try {
      const response = await apiClient.get('users/');
      return response.data;
    } catch (error) {
      console.error("Error fetching users list:", error);
      throw error;
    }
  },
};

export default apiClient;