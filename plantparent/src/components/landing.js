import React, { useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react'; 
import { useNavigate } from 'react-router-dom'; // For navigation
import awsconfig from '../aws-exports';
import '@aws-amplify/ui-react/styles.css'; 

// Configure Amplify
Amplify.configure(awsconfig);

function Landing() {
    const navigate = useNavigate(); // Initialize the navigation function

    return (
        <Authenticator>
            {({ signOut, user }) => {
                // Redirect after login
                if (user) {
                    navigate('/home'); // Redirect to /home immediately
                }

                return (
                    <div>
                        <h1>Welcome to My PlantParent</h1>
                        <p>Automated Help with Your Plants</p>
                        <p>Welcome, {user?.username}</p>
                        <button onClick={signOut}>Sign Out</button>
                    </div>
                );
            }}
        </Authenticator>
    );
}

export default Landing;
