import axios from 'axios';
import type { AuthResponse, User } from '../types/hero';

const API_BASE_URL = 'http://localhost:5000/api';

export const authApi = {
    login: (username: string, password: string) =>
        axios.post<AuthResponse>(`${API_BASE_URL}/auth/login`, { username, password }),

    register: (username: string, password: string, role: string) =>
        axios.post<AuthResponse>(`${API_BASE_URL}/auth/register`, { username, password, role }),

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getUser: (): User | null => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON. parse(userStr) : null;
    },

    isAuthenticated: () => !!localStorage.getItem('token'),
};