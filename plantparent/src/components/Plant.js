import React, { useEffect, useState } from 'react';
import fetchSensorData from './sensorData';
import './Home.css';
import plantImg from './plantTest.png';
import { addDays, subDays, startOfWeek, format } from 'date-fns';

const Plant = ({ plantId }) => {
    const [sensorData, setSensorData] = useState({ lux: null, soil_moisture: null, temp: null });
    const [error, setError] = useState(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDays, setSelectedDays] = useState({});
    const [applyMode, setApplyMode] = useState("water");
    const [plantName, setPlantName] = useState(`Plant ${plantId}`);
    const [isEditingName, setIsEditingName] = useState(false);

    // Fetch the most recent sensor data when the component mounts
    useEffect(() => {
        fetchSensorData(setSensorData, setError);
    }, []);

    const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

    const handlePrevWeek = () => setCurrentDate(subDays(currentDate, 7));
    const handleNextWeek = () => setCurrentDate(addDays(currentDate, 7));

    const toggleWater = (day) => {
        const dayKey = format(day, 'yyyy-MM-dd');
        setSelectedDays((prevSelected) => ({
            ...prevSelected,
            [dayKey]: {
                ...prevSelected[dayKey],
                water: !prevSelected[dayKey]?.water,
            },
        }));
    };

    const toggleSun = (day) => {
        const dayKey = format(day, 'yyyy-MM-dd');
        setSelectedDays((prevSelected) => ({
            ...prevSelected,
            [dayKey]: {
                ...prevSelected[dayKey],
                sun: !prevSelected[dayKey]?.sun,
            },
        }));
    };

    const applyAllDays = () => {
        const updatedDays = {};
        weekDays.forEach((day) => {
            const dayKey = format(day, 'yyyy-MM-dd');
            updatedDays[dayKey] = {
                ...selectedDays[dayKey],
                [applyMode]: true,
            };
        });
        setSelectedDays((prevSelected) => ({ ...prevSelected, ...updatedDays }));
    };

    const toggleApplyMode = () => {
        setApplyMode((prevMode) => (prevMode === "water" ? "sun" : "water"));
    };

    const handleNameChange = (e) => setPlantName(e.target.value);
    const saveName = () => setIsEditingName(false);

    return (
        <div className="plant-row">
            <div className="plant-info">
                <img src={plantImg} alt={`Plant ${plantId}`} className="plant-image" />
                <div className="sensor-data">
                    {isEditingName ? (
                        <div>
                            <input
                                type="text"
                                value={plantName}
                                onChange={handleNameChange}
                                onBlur={saveName}
                                autoFocus
                                className="name-input"
                            />
                        </div>
                    ) : (
                        <h3 onClick={() => setIsEditingName(true)}>{plantName}</h3>
                    )}
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

                <button
                    className="ai-chat-button"
                    onClick={() => {
                        window.location.href = '/ai-chat';
                    }}
                >
                    Chat with Your Plant
                </button>
            </div>

            <div className="plant-calendar">
                <h4>Watering & Sun Schedule</h4>
                <div className="week-navigation">
                    <button onClick={handlePrevWeek}>{"<"}</button>
                    <button onClick={applyAllDays} className="add-all-days">➕</button>
                    <button onClick={toggleApplyMode} className="toggle-mode">
                        {applyMode === "water" ? "💧" : "☀️"}
                    </button>
                    <button onClick={handleNextWeek}>{">"}</button>
                </div>
                <div className="week-calendar">
                    {weekDays.map((day) => (
                        <div key={day} className="calendar-day-row">
                            <p className="day-label">{format(day, 'EEE MM/dd')}</p>
                            <div className="emoji-toggles">
                                <div
                                    className={`emoji-toggle ${selectedDays[format(day, 'yyyy-MM-dd')]?.water ? 'visible' : ''}`}
                                    onClick={() => toggleWater(day)}
                                >
                                    {selectedDays[format(day, 'yyyy-MM-dd')]?.water ? '💧' : ''}
                                </div>
                                <div
                                    className={`emoji-toggle ${selectedDays[format(day, 'yyyy-MM-dd')]?.sun ? 'visible' : ''}`}
                                    onClick={() => toggleSun(day)}
                                >
                                    {selectedDays[format(day, 'yyyy-MM-dd')]?.sun ? '☀️' : ''}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Plant;
