
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSeedling, faCalendarAlt, faRobot, faComments } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './landing.css';

const handleLoginSuccess = (response) => {
    console.log("Login Success:", response);
};

const handleLoginFailure = (error) => {
    console.error("Login Failed:", error);
};

function Landing() {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSignUpClick = () => {
        navigate('/AuthPage'); // Navigate to the AuthPage route
    };

    return (
        <div className="page">
            {/* Hero Section */}
            <div className="hero">
                <h1>Welcome to Plant Parent 🌱</h1>
                <p>Your Automated Plant Caregiver</p>
            </div>


            {/* How It Works Section */}
            <section className="how-it-works">
                <h2>How the Website Works</h2>
                <div className="steps">
                    <div className="step">
                        <FontAwesomeIcon icon={faUser} size="3x" color="#2c3e50" />
                        <p><strong>Login or Create an Account</strong></p>
                    </div>
                    <div className="step">
                        <FontAwesomeIcon icon={faSeedling} size="3x" color="#2c3e50" />
                        <p><strong>Add a Plant</strong></p>
                    </div>
                    <div className="step">
                        <FontAwesomeIcon icon={faCalendarAlt} size="3x" color="#2c3e50" />
                        <p><strong>Configure Watering Schedule</strong></p>
                    </div>
                    <div className="step">
                        <FontAwesomeIcon icon={faRobot} size="3x" color="#2c3e50" />
                        <p><strong>Ask Plant-Specific Questions</strong></p>
                    </div>
                    <div className="step">
                        <FontAwesomeIcon icon={faComments} size="3x" color="#2c3e50" />
                        <p><strong>Ask General Plant Care Questions</strong></p>
                    </div>
                </div>
            </section>

            {/* Tutorial Section */}
            <section className="tutorial-section">
                <h2>Getting Started: Tutorial</h2>
                <div className="tutorial-steps">
                    <div className="tutorial-step">
                        <h3>Step 1: Create Your Account</h3>
                        <p>Sign up or log in using your Google account to get started.</p>
                    </div>
                    <div className="tutorial-step">
                        <h3>Step 2: Add Your Plants</h3>
                        <p>Go to the "My Plants" section and add the plants you want to care for.</p>
                    </div>
                    <div className="tutorial-step">
                        <h3>Step 3: Configure Plant Care</h3>
                        <p>Set watering schedules, light preferences, and other parameters for your plants.</p>
                    </div>
                    <div className="tutorial-step">
                        <h3>Step 4: Use the Chat Features</h3>
                        <p>Ask questions about your plants or get general plant care tips from our chatbot.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Landing;