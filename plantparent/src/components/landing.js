import React, { useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import awsconfig from '../aws-exports';
import '@aws-amplify/ui-react/styles.css';
import './landing.css';

// Configure Amplify
Amplify.configure(awsconfig);

function Landing() {
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = async () => {
            try {
                const user = await Amplify.Auth.currentAuthenticatedUser();
                if (user) {
                    navigate('/home');
                }
            } catch (error) {
                console.log('No authenticated user, staying on login page.');
            }
        };

        checkUser();
    }, [navigate]);

    return (
        <div className="page">
            {/* Hero Section */}
            <div className="hero">
                <h1>Welcome to Plant Parent 🌱</h1>
                <p>Your Automated Plant Caregiver</p>
            </div>

            {/* Main Content with Authentication */}
            <Authenticator>
                {({ signOut, user }) => (
                    <>
                        <section className="login-section">
                            {!user ? (
                                <div>
                                    <h2>Login or Sign Up</h2>
                                    <p>Please log in to access the features.</p>
                                </div>
                            ) : (
                                <div className="welcome-section">
                                    <p>Welcome, {user?.username}!</p>
                                    <button onClick={signOut} className="sign-out-button">Sign Out</button>
                                </div>
                            )}
                        </section>

                        {/* Render Remaining Content Regardless of Login State */}
                        <div className="content">
                            {/* How It Works Section */}
                            <section className="how-it-works">
                                <h2>How the Website Works</h2>
                                <div className="steps">
                                    <div className="step">
                                        <p><strong>Login or Create an Account</strong></p>
                                    </div>
                                    <div className="step">
                                        <p><strong>Add a Plant</strong></p>
                                    </div>
                                    <div className="step">
                                        <p><strong>Configure Watering Schedule</strong></p>
                                    </div>
                                    <div className="step">
                                        <p><strong>Ask Plant-Specific Questions</strong></p>
                                    </div>
                                    <div className="step">
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
                                        <p>Sign up or log in using the button above.</p>
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
                    </>
                )}
            </Authenticator>
        </div>
    );
}

export default Landing;
