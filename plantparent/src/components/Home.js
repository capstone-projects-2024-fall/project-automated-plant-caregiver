import React, { useEffect, useState } from 'react';
import fetchSensorData from './sensorData';
import './Home.css';
import plantImg from './plantTest.png';
import logo from './logo.png';

const Home = () => {
  const [sensorData, setSensorData] = useState({ lux: null, soil_moisture: null, temp: null });
  const [error, setError] = useState(null);
  const [userImage, setUserImage] = useState(null);

  const images = [
    { src: plantImg, alt: 'Plant 1' },
    { src: logo, alt: 'Plant 2' },
    ...(userImage ? [{ src: userImage, alt: 'User Uploaded Image' }] : []),
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserImage(imageUrl);
      setCurrentImageIndex(images.length); // Display uploaded image immediately
    }
  };

  useEffect(() => {
    fetchSensorData(setSensorData, setError);

    const interval = setInterval(() => fetchSensorData(setSensorData, setError), 5000); // 5 seconds

    return () => {
      clearInterval(interval);
      if (userImage) URL.revokeObjectURL(userImage);
    };
  }, [userImage]);

  return (
    <div className="page">
      {/* Left Side: Main Displayed Image */}
      <div className="left-half">
        <div className="image-container">
          <img src={images[currentImageIndex]?.src} alt={images[currentImageIndex]?.alt} className="displayed-image" />
        </div>
        <div className="info-container">
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
        </div>
      </div>

      {/* Right Side: Next Button and File Upload */}
      <div className="right-half">
        <button onClick={handleNextImage} className="next-button">Next</button>
        <input type="file" onChange={handleFileUpload} accept="image/*" className="upload-button" />
      </div>
    </div>
  );
};

export default Home;

