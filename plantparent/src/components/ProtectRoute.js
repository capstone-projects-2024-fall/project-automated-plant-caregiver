import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user')); // Check if user is stored

    if (!user) {
        alert('You need to log in to access this page.');
        return <Navigate to="/" />; // Redirect to landing or login page
    }

    return children; // Render the child components if user is logged in
};

export default ProtectRoute;
