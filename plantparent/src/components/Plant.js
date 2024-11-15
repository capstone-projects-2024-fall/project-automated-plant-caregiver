import React, { useEffect, useState } from 'react';
import fetchSensorData from './sensorData';
import ChatBot from './ChatBot'; // Import the ChatBot component
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
    const [showModal, setShowModal] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false); // State for chatbot
    const [editingDay, setEditingDay] = useState(null);
    const [editAmount, setEditAmount] = useState(0);
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

    const openModal = (day) => {
        const dayKey = format(day, 'yyyy-MM-dd');
        const dayData = selectedDays[dayKey] || {};
        setEditingDay(day);
        setEditAmount(dayData.amount || 0);
        setEditTime(dayData.time || "12:00");
        setShowModal(true);
    };

    const saveDaySettings = () => {
        const dayKey = format(editingDay, 'yyyy-MM-dd');
        setSelectedDays((prevSelected) => ({
            ...prevSelected,
            [dayKey]: {
                ...prevSelected[dayKey],
                water: editAmount > 0,
                amount: editAmount,
                time: editTime,
            },
        }));
        closeModal();
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingDay(null);
    };

    const selectAllDays = () => {
        setSelectedDays((prevSelected) => {
            const updatedDays = { ...prevSelected };
            weekDays.forEach((day) => {
                const dayKey = format(day, 'yyyy-MM-dd');
                if (applyMode === "water") {
                    updatedDays[dayKey] = {
                        ...updatedDays[dayKey],
                        water: true,
                        amount: 50,
                        time: "12:00",
                    };
                } else if (applyMode === "sun") {
                    updatedDays[dayKey] = {
                        ...updatedDays[dayKey],
                        sun: true,
                    };
                }
            });
            return updatedDays;
        });
    };

    const deselectAllDays = () => setSelectedDays({});

    const toggleApplyMode = () => setApplyMode((prevMode) => (prevMode === "water" ? "sun" : "water"));

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
            </div>

            <div className="plant-calendar">
                <div className="week-navigation">
                    <button onClick={handlePrevWeek}>{"<"}</button>
                    <button onClick={selectAllDays}>➕</button>
                    <button onClick={deselectAllDays}>➖</button>
                    <button onClick={toggleApplyMode}>{applyMode === "water" ? "💧" : "☀️"}</button>
                    <button onClick={handleNextWeek}>{">"}</button>
                </div>

                <div className="week-calendar">
                    {weekDays.map((day) => {
                        const dayKey = format(day, 'yyyy-MM-dd');
                        const dayData = selectedDays[dayKey] || {};

                        return (
                            <div key={dayKey} className="calendar-day-row" onClick={() => openModal(day)}>
                                <p className="day-label">{format(day, 'EEE MM/dd')}</p>
                                <div className="emoji-toggles">
                                    {dayData.water && <span>💧 {dayData.amount}%</span>}
                                    {dayData.sun && <span>☀️</span>}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {showModal && (
                <div className="modal">
                    <button className="close-button" onClick={closeModal}>✖</button>
                    <h4>Edit Watering Schedule</h4>
                    <label>
                        Time:
                        <input type="time" value={editTime} onChange={(e) => setEditTime(e.target.value)} />
                    </label>
                    <label>
                        Water Amount:
                        <input type="range" min="0" max="100" value={editAmount} onChange={(e) => setEditAmount(parseInt(e.target.value))} />
                        <span>{editAmount}%</span>
                    </label>
                    <div className="buttons">
                        <button onClick={saveDaySettings}>Save</button>
                        <button onClick={closeModal}>Cancel</button>
                    </div>
                </div>
            )}

            {/* Chatbot Icon */}
            <div className="chatbot-icon" onClick={handleChatToggle}>🤖 Chat</div>
            {isChatOpen && <ChatBot plantName={plantName} onClose={handleChatToggle} />}
        </div>
    );
};

export default Plant;