import React, {useEffect, useState} from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import './Home.css';

const Home = () => {
  const handleLoginSuccess = (response) => {
    console.log("Login Success:", response);
  };

  const handleLoginFailure = (error) => {
    console.error("Login Failed:", error);
  };


  const [sensorData, setSensorData] = useState({ lux: null, soil_moisture: null });
  const [error, setError] = useState(null);


  const fetchSensorData = async () => {
    try {
      // Replace with your API Gateway endpoint
      const response = await fetch('https://your-api-id.execute-api.us-west-2.amazonaws.com/dev/sensors', {
        method: 'GET',
      });
      const data = await response.json();
      setSensorData(data);
    } catch (err) {
      console.error("Failed to fetch sensor data:", err);
      setError('Failed to load sensor data.');
    }
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div>
        {/* Navigation Bar */}
        <nav className="navbar">
          <h1>My PlantParent</h1>
          <div className="nav-links">
            <a href="#home">Chat </a>
            <a href="#about">Plant Module </a>
            <a href="#contact"> Search </a>
          </div>
        </nav>

        <header>
          <h1>Welcome to My PlantParent</h1>
          <p>Automated Help with Your Plants</p>
        </header>

        <section>
          <h2>Login or Sign Up</h2>

          {/* Login Button */}
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

          {/* Sign Up Button */}
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
                Sign Up with Google
              </button>
            )}
          />
        </section>

        {/* Display Sensor Data */}
        <section>
          <h2>Current Plant Sensor Data</h2>
          {error && <p>{error}</p>}
          {sensorData.lux !== null && sensorData.soil_moisture !== null ? (
            <div>
              <p><strong>Light Level:</strong> {sensorData.lux} lux</p>
              <p><strong>Soil Moisture:</strong> {sensorData.soil_moisture}</p>
            </div>
          ) : (
            <p>Loading sensor data...</p>
          )}
        </section>

      </div>
    </GoogleOAuthProvider>
  );
};

export default Home;
