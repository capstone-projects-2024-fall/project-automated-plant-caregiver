import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'
import logo from './logo.png'

const Navbar = () => {
    return (
        <nav>
            <Link to="/Home"> {/* Make the image a clickable link */}
                <img src={logo} alt="Logo" className="logo" />
            </Link>
            <ul>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/chat">AI Chat</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
