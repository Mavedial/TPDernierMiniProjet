import axios from 'axios';
import type { Hero } from '../types/hero';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
});

// Intercepteur pour ajouter le token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const heroApi = {
    getAll: (params?:  { univers?: string; research?: string; ordre?: string }) =>
        api.get<Hero[]>('/heroes', { params }),

    getById: (id: number) => api.get<Hero>(`/heroes/${id}`),

    create: (formData: FormData) =>
        api.post<Hero>('/heroes', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }),

    update: (id: number, formData: FormData) =>
        api.put<Hero>(`/heroes/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }),

    delete: (id: number) => api.delete(`/heroes/${id}`),
};