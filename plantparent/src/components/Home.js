import React, { useState } from 'react';
import Plant from './Plant';
import './Home.css';

const Home = () => {
    const [plants, setPlants] = useState([1, 2]);

    // Function to delete a plant by its ID
    const deletePlant = (id) => {
        setPlants((prevPlants) => prevPlants.filter((plantId) => plantId !== id));
    };

    // Function to add a new plant
    const addPlant = () => {
        setPlants((prevPlants) => [...prevPlants, prevPlants.length + 1]);
    };

    return (
        <div className="page">
            <div className="plant-grid">
                {plants.map((id) => (
                    <Plant key={id} plantId={id} deletePlant={deletePlant} />
                ))}
                <button className="add-plant" onClick={addPlant}>+</button>
            </div>
        </div>
    );
};

export default Home;