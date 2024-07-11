import React, { createContext, useState } from 'react';

// Create AuthContext
export const AuthContext = createContext({
    isLoggedIn: false,
    token: null,
    login: null, 
    logout: null
});

// Create AuthContextProvider component
export const AuthContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Initial state for simplicity
    const [token, setToken] = useState(localStorage.getItem("token") || "")

    const login = () => {
        setIsLoggedIn(true); 
        setToken(localStorage.getItem("token"))
        // Implement your login logic here
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken("");
        setIsLoggedIn(false); // Implement your logout logic here
        
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};