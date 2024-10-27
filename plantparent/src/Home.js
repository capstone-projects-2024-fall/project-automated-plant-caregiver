import React, { useEffect, useState } from 'react';
import fetchSensorData from './sensorData';  // Import the fetch function
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import './Home.css';

const Home = () => {
  const [sensorData, setSensorData] = useState({ lux: null, soil_moisture: null, temp: null });
  const [error, setError] = useState(null);

  // Fetch sensor data when the component mounts
  useEffect(() => {
    fetchSensorData(setSensorData, setError);  // Call the fetch function and pass the state handlers

    // Set up interval to fetch data periodically 
    const interval = setInterval(() => fetchSensorData(setSensorData, setError), 5000000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const handleLoginSuccess = (response) => {
    console.log("Login Success:", response);
  };

  const handleLoginFailure = (error) => {
    console.error("Login Failed:", error);
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div>
        {/* Navigation Bar */}
        <nav className="navbar">
          <h1>My PlantParent</h1>
          <div className="nav-links">
            <a href="#home">Chat</a>
            <a href="#about">Plant Module</a>
            <a href="#contact">Search</a>
          </div>
        </nav>

        <header>
          <h1>Welcome to My PlantParent</h1>
          <p>Automated Help with Your Plants</p>
        </header>

        <section>
          <h2>Login or Sign Up</h2>

        </section>

        {/* Display Sensor Data */}
        <section>
          <h2>Current Plant Sensor Data</h2>
          {error ? (
            <p>{error}</p>
          ) : (
            <>
              <p><strong>Light Level:</strong> {sensorData.lux !== null ? `${sensorData.lux} lux` : 'Loading...'}</p>
              <p><strong>Soil Moisture:</strong> {sensorData.soil_moisture !== null ? sensorData.soil_moisture : 'Loading...'}</p>
              <p><strong>Temperature:</strong> {sensorData.temp !== null ? `${sensorData.temp} °C` : 'Loading...'}</p>
            </>
          )}
        </section>

      </div>
    </GoogleOAuthProvider>
  );
};

export default Home;
