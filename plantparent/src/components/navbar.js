import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import logo from './logo.png';
import { AuthContext } from './AuthContext'; // Import AuthContext

const Navbar = () => {
    const { isLoggedIn, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Call logout from AuthContext
        navigate('/'); // Redirect to landing page
    };

    return (
        <nav>
            <Link to="/Home">
                <img src={logo} alt="Logo" className="logo" />
            </Link>
            <div className="nav-links">
                <Link to="/landing">Home</Link>
                <Link to="/Home">Plant</Link>
                <Link to="/about">About</Link>
                <Link to="/chat">AI Chat</Link>
                {!isLoggedIn ? (
                    <Link to="/AuthPage">Login</Link>
                ) : (
                    <>
                        <Link to="/profile">Profile</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;