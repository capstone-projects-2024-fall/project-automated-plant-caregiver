import React, { useEffect, useState } from 'react';
import fetchSensorData from './sensorData';
import './Home.css';
import plantImg from './plantTest.png';
import { addDays, startOfWeek, format } from 'date-fns';

const Plant = ({ plantId }) => {
const [sensorData, setSensorData] = useState({ lux: null, soil_moisture: null, temp: null });
const [error, setError] = useState(null);
const [currentDate] = useState(new Date());
const [selectedDays, setSelectedDays] = useState({}); // Track selected days for watering

useEffect(() => {
    fetchSensorData(setSensorData, setError);
}, []);

const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

// Toggle selection of a day for watering
const toggleDay = (day) => {
    setSelectedDays((prevSelected) => ({
        ...prevSelected,
        [format(day, 'yyyy-MM-dd')]: !prevSelected[format(day, 'yyyy-MM-dd')],
    }));
};

return (
    <div className="plant-row">
        <div className="plant-info">
            <img src={plantImg} alt={`Plant ${plantId}`} className="plant-image" />
            <div className="sensor-data">
            <h3>Plant {plantId} Sensor Data</h3>
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

        <div className="plant-calendar">
            <h4>Watering Schedule</h4>
            <div className="week-calendar">
            {weekDays.map((day) => (
                <div
                key={day}
                className="calendar-day-row"
                onClick={() => toggleDay(day)}
                >
                <p>{format(day, 'EEEE')} - {format(day, 'MM/dd')}</p>
                {selectedDays[format(day, 'yyyy-MM-dd')] && (
                    <span className="raindrop-icon" role="img" aria-label="Watering Day">💧</span>
                )}
                </div>
            ))}
            </div>
        </div>
    </div>
    );
};

export default Plant;