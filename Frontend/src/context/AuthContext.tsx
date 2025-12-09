import React, { useState, useEffect, useContext } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types/hero';
import { authApi } from '../api/authApi';

type AuthContextType = {
    user: User | null;
    token: string | null;
    login: (username: string, password: string) => Promise<void>;
    register: (username: string, password: string, role: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = authApi.getUser();
        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(storedUser);
        }
    }, []);

    const login = async (username: string, password: string) => {
        const response = await authApi.login(username, password);
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setToken(token);
        setUser(user);
    };

    const register = async (username: string, password: string, role: string) => {
        const response = await authApi.register(username, password, role);
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setToken(token);
        setUser(user);
    };

    const logout = () => {
        authApi.logout();
        setToken(null);
        setUser(null);
    };

    const value: AuthContextType = {
        user,
        token,
        login,
        register,
        logout,
        isAuthenticated: !!token,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook utilitaire pour consommer le contexte de façon typée et sûre
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};