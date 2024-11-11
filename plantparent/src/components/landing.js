import React from 'react';
import './landing.css'
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react'; 
import awsconfig from '../aws-exports';
import '@aws-amplify/ui-react/styles.css'; 

// Configure Amplify
Amplify.configure(awsconfig);

function Landing() {
    return (    
      <div className='page'>

        <h1>Welcome to My PlantParent</h1>
        <p>Automated Help with Your Plants</p>

      
      </div>
        <Authenticator>
            {({ signOut, user }) => (
                <div>
                    <h1>Welcome to My PlantParent</h1>
                    <p>Automated Help with Your Plants</p>
                    <p>Welcome, {user?.username}</p>
                    <button onClick={signOut}>Sign Out</button>
                </div>
            )}
        </Authenticator>
    );
}

export default Landing;
