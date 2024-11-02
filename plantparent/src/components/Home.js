import React, { useState } from 'react';
import Plant from './Plant'; // Importing the correct file name for the plant component
import './Home.css';

const Home = () => {
  const [plants, setPlants] = useState([1, 2]); // Initial state with two plants

  const addPlant = () => {
    setPlants((prevPlants) => [...prevPlants, prevPlants.length + 1]);
  };

  return (
    <div className="page">
      <div className="plant-grid">
        {plants.map((id) => (
          <Plant key={id} plantId={id} />
        ))}
        <div className="add-plant" onClick={addPlant}>
          <p>+</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
