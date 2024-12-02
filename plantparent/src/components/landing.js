import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSeedling, faCalendarAlt, faRobot, faComments } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import './landing.css';

const handleLoginSuccess = (response) => {
    console.log("Login Success:", response);
};

const handleLoginFailure = (error) => {
    console.error("Login Failed:", error);
};

function Landing() {
    return (
        <div className="page">
            {/* Hero Section */}
            <div className="hero">
                <h1>Welcome to Plant Parent 🌱</h1>
                <p>Your Automated Plant Caregiver</p>
            </div>

            {/* Login Section */}
            <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
                <section className="login-section">
                    <h2>Login or Sign Up</h2>
                    <GoogleLogin
                        onSuccess={handleLoginSuccess}
                        onError={handleLoginFailure}
                        render={(renderProps) => (
                            <button
                                className="google-button"
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                            >
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                                    alt="Google icon"
                                    className="google-icon"
                                />
                                Login with Google
                            </button>
                        )}
                    />
                    <button className="sign-up-button">Sign Up</button>
                </section>
            </GoogleOAuthProvider>

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