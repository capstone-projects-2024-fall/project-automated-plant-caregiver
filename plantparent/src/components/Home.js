import React, { useEffect, useState } from 'react';
import fetchSensorData from '../sensorData';  // Import the fetch function
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

  return (
      <div className='page'>

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
  );
};

export default Home;
