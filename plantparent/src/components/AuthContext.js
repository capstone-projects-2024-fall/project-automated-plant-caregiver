import React, { createContext, useState } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

// Provide the AuthContext
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        // Check initial login status from localStorage
        const user = JSON.parse(localStorage.getItem('user'));
        return !!user;
    });

    const login = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};