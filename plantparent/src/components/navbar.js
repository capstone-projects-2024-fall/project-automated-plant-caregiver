import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react'; // Import the useAuthenticator hook
import './navbar.css';
import logo from './logo.png';

const Navbar = () => {
    const { signOut, user } = useAuthenticator((context) => [context.user]); // Access the signOut method and user information

    return (
        <nav>
            <Link to="/Home"> {/* Make the image a clickable link */}
                <img src={logo} alt="Logo" className="logo" />
            </Link>
            <div className="nav-links">
                <Link to="/landing">Home</Link>
                <Link to="/Home">Plant</Link>
                <Link to="/about">About</Link>
                <Link to="/chat">AI Chat</Link>
                {!user ? (
                    <Link to="/AuthPage">Login</Link> // Show login if not signed in
                ) : (
                    <button onClick={signOut} className="sign-out-button">Sign Out</button> // Show Sign Out button if signed in
                )}
            </div>
        </nav>
    );
};

export default Navbar;
