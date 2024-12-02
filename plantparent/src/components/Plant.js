import React, { useEffect, useState } from 'react';
import fetchSensorData from './sensorData';
import ChatBot from './ChatBot';
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
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);
    const [editingDay, setEditingDay] = useState(null);
    const [editAmount, setEditAmount] = useState(50);
    const [editTime, setEditTime] = useState("12:00");

    useEffect(() => {
        fetchSensorData(setSensorData, setError);
    }, []);

    const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

    const handlePrevWeek = () => setCurrentDate(subDays(currentDate, 7));
    const handleNextWeek = () => setCurrentDate(addDays(currentDate, 7));

    const toggleWater = (day) => {
        const dayKey = format(day, 'yyyy-MM-dd');
        setSelectedDays((prev) => {
            const updatedDays = { ...prev };
            if (updatedDays[dayKey]?.water) {
                updatedDays[dayKey] = { ...updatedDays[dayKey], water: false };
            } else {
                updatedDays[dayKey] = { ...updatedDays[dayKey], water: true };
            }
            if (!updatedDays[dayKey].water && !updatedDays[dayKey].sun) {
                delete updatedDays[dayKey]; // Remove day if empty
            }
            return updatedDays;
        });
    };

    const toggleSun = (day) => {
        const dayKey = format(day, 'yyyy-MM-dd');
        setSelectedDays((prev) => {
            const updatedDays = { ...prev };
            if (updatedDays[dayKey]?.sun) {
                updatedDays[dayKey] = { ...updatedDays[dayKey], sun: false };
            } else {
                updatedDays[dayKey] = { ...updatedDays[dayKey], sun: true };
            }
            if (!updatedDays[dayKey].water && !updatedDays[dayKey].sun) {
                delete updatedDays[dayKey]; // Remove day if empty
            }
            return updatedDays;
        });
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
        setSelectedDays((prev) => ({ ...prev, ...updatedDays }));
    };

    const deselectAllDays = () => {
        const updatedDays = {};
        weekDays.forEach((day) => {
            const dayKey = format(day, 'yyyy-MM-dd');
            if (selectedDays[dayKey]) {
                updatedDays[dayKey] = {
                    ...selectedDays[dayKey],
                    [applyMode]: false,
                };
                if (!updatedDays[dayKey].water && !updatedDays[dayKey].sun) {
                    delete updatedDays[dayKey];
                }
            }
        });
        setSelectedDays((prev) => ({ ...prev, ...updatedDays }));
    };

    const toggleApplyMode = () => setApplyMode((prevMode) => (prevMode === "water" ? "sun" : "water"));

    const openEditForm = (day) => {
        const dayKey = format(day, 'yyyy-MM-dd');
        const dayData = selectedDays[dayKey] || {};
        setEditingDay(day);
        setEditAmount(dayData.amount || 50);
        setEditTime(dayData.time || "12:00");
        setIsFlipped(true);
    };

    const saveDaySettings = () => {
        const dayKey = format(editingDay, 'yyyy-MM-dd');
        setSelectedDays((prev) => ({
            ...prev,
            [dayKey]: {
                ...prev[dayKey],
                water: editAmount > 0,
                sun: prev[dayKey]?.sun || false,
                amount: editAmount,
                time: editTime,
            },
        }));
        setIsFlipped(false);
    };

    const closeEditForm = () => setIsFlipped(false);

    const handleChatToggle = () => setIsChatOpen(!isChatOpen);

    return (
        <div className="plant-row">
            <div className="plant-info">
                <img src={plantImg} alt={`Plant ${plantId}`} className="plant-image" />
                <div className="sensor-data">
                    {isEditingName ? (
                        <input
                            type="text"
                            value={plantName}
                            onChange={(e) => setPlantName(e.target.value)}
                            onBlur={() => setIsEditingName(false)}
                            autoFocus
                            className="plant-name-input"
                        />
                    ) : (
                        <h3 onClick={() => setIsEditingName(true)}>{plantName}</h3>
                    )}
                    {error ? <p>{error}</p> : (
                        <>
                            <p>Light Level: {sensorData.lux ?? 'Loading...'} lux</p>
                            <p>Soil Moisture: {sensorData.soil_moisture ?? 'Loading...'}</p>
                            <p>Temperature: {sensorData.temp ?? 'Loading...'} °C</p>
                        </>
                    )}
                </div>

                <button className="ai-chat-button" onClick={handleChatToggle}>
                    {isChatOpen ? "Close Chat" : "Chat with Your Plant"}
                </button>
                <div className="chatbot-icon" onClick={handleChatToggle}>🤖</div>
            </div>

            <div className={`calendar-container ${isFlipped ? 'flip' : ''}`}>
                <div className="front">
                    <h4>Watering & Sun Schedule</h4>
                    <div className="week-navigation">
                        <button onClick={handlePrevWeek}>{"<"}</button>
                        <button onClick={applyAllDays}>➕ {applyMode === "water" ? "💧" : "☀️"}</button>
                        <button onClick={deselectAllDays}>➖ {applyMode === "water" ? "💧" : "☀️"}</button>
                        <button onClick={toggleApplyMode}>{applyMode === "water" ? "☀️" : "💧"}</button>
                        <button onClick={handleNextWeek}>{">"}</button>
                    </div>
                    <div className="week-calendar">
                        {weekDays.map((day) => {
                            const dayKey = format(day, 'yyyy-MM-dd');
                            const dayData = selectedDays[dayKey] || {};
                            return (
                                <div key={dayKey} className="calendar-day-row">
                                    {/* Only the day name triggers the flip */}
                                    <p onClick={() => openEditForm(day)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                                        {format(day, 'EEE MM/dd')}
                                    </p>
                                    <div className="emoji-toggles">
                                        {/* Toggle water and prevent propagation */}
                                        <span
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent flipping when toggling water
                                                toggleWater(day);
                                            }}
                                            style={{ opacity: dayData.water ? 1 : 0.3 }}
                                        >
                                            💧
                                        </span>
                                        {/* Toggle sun and prevent propagation */}
                                        <span
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent flipping when toggling sun
                                                toggleSun(day);
                                            }}
                                            style={{ opacity: dayData.sun ? 1 : 0.3 }}
                                        >
                                            ☀️
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {isFlipped && (
                    <div className="back">
                        <h4>Edit Water Schedule</h4>
                        <label>
                            Time:{" "}
                            <input
                                type="time"
                                value={editTime}
                                onChange={(e) => setEditTime(e.target.value)}
                            />
                        </label>
                        <label>
                            Amount:{" "}
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={editAmount}
                                onChange={(e) => setEditAmount(parseInt(e.target.value))}
                            />
                        </label>
                        <button onClick={saveDaySettings}>Save</button>
                        <button onClick={closeEditForm}>Cancel</button>
                    </div>
                )}
            </div>

            {isChatOpen && <ChatBot plantName={plantName} onClose={handleChatToggle} />}
        </div>
    );
};

export default Plant;