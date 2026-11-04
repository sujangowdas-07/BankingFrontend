import api from './api';
import { mockUsers } from './mockData';

const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  async login(customerId, password) {
    if (USE_MOCK_API) {
      await delay(800); // Simulate network delay
      
      const user = mockUsers.find(
        u => u.customerId === customerId && u.password === password
      );
      
      if (user) {
        const { password: _, ...userWithoutPassword } = user;
        const token = `mock-token-${Date.now()}`;
        
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        
        return {
          success: true,
          data: {
            user: userWithoutPassword,
            token
          }
        };
      } else {
        throw new Error('Invalid customer ID or password');
      }
    } else {
      try {
        const response = await api.post('/auth/login', { customerId, password });
        
        if (response.data.token) {
          localStorage.setItem('authToken', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        
        return {
          success: true,
          data: response.data
        };
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Login failed');
      }
    }
  },

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated() {
    return !!localStorage.getItem('authToken');
  }
};
