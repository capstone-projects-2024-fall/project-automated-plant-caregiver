import React, { useEffect, useState } from 'react';
import './landing.css'
const handleLoginSuccess = (response) => {
    console.log("Login Success:", response);
  };

  const handleLoginFailure = (error) => {
    console.error("Login Failed:", error);
  };


function Landing() {
    return (
    
      <div className='page'>

        <h1>Welcome to My PlantParent</h1>
        <p>Automated Help with Your Plants</p>

      </div>
    );
  }
  export default Landing;