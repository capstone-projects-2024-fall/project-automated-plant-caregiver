// DetailedView.js
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { addDays, subDays, startOfWeek, format } from 'date-fns';

const plantGreen = 'rgba(34, 139, 34, 0.7)';

const DetailedView = () => {
    const [focusedGraph, setFocusedGraph] = useState(null); // Track focused graph
    const [selectedDays, setSelectedDays] = useState({});
    const [applyMode, setApplyMode] = useState("water");
    const [currentDate, setCurrentDate] = useState(new Date());


    const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


    const chartSoilMoistureData = {
        labels,
        datasets: [
            {
                label: 'Soil Moisture (%)',
                data: [75, 73, 71, 69, 68, 67, 85],
                borderColor: plantGreen,
                backgroundColor: 'rgba(34, 139, 34, 0.2)',
                fill: true,
            },
        ],
    };

    const chartSunlightExposureData = {
        labels,
        datasets: [
            {
                label: 'Sunlight Exposure (Hours)',
                data: [6, 6, 6, 6, 6, 5, 5.5],
                borderColor: plantGreen,
                backgroundColor: 'rgba(34, 139, 34, 0.2)',
                fill: true,
            },
        ],
    };

    const handleGraphClick = (graphNumber) => {
        setFocusedGraph(focusedGraph === graphNumber ? null : graphNumber);
    };

    // Calendar functionality
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

    const handlePrevWeek = () => setCurrentDate(subDays(currentDate, 7));
    const handleNextWeek = () => setCurrentDate(addDays(currentDate, 7));

    const toggleDayMode = (day, mode) => {
        const dayKey = format(day, 'yyyy-MM-dd');
        setSelectedDays((prevSelected) => ({
            ...prevSelected,
            [dayKey]: {
                ...prevSelected[dayKey],
                [mode]: !prevSelected[dayKey]?.[mode],
            },
        }));
    };

    return (
        <div style={{ width: '90%', margin: 'auto', textAlign: 'center' }}>
            <h2>Detailed Plant Care View</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '40px' }}>
                {/* Chart 1: Soil Moisture */}
                <div
                    onClick={() => handleGraphClick(1)}
                    style={{
                        width: focusedGraph === 1 ? '45%' : '30%',
                        height: focusedGraph === 1 ? '400px' : '300px', 
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                    }}
                >
                    <Line data={chartSoilMoistureData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>

                {/* Chart 2: Sunlight Exposure */}
                <div
                    onClick={() => handleGraphClick(2)}
                    style={{
                        width: focusedGraph === 2 ? '45%' : '30%',
                        height: focusedGraph === 2 ? '400px' : '300px', 
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                    }}
                >
                    <Line data={chartSunlightExposureData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
            </div>

            {/* Larger Calendar */}
            <div className="calendar-container" style={{ width: '80%', margin: 'auto', fontSize: '1.2em' }}>
                <h4>Watering & Sun Schedule</h4>
                <div className="week-navigation">
                    <button onClick={handlePrevWeek}>{"<"}</button>
                    <button onClick={handleNextWeek}>{">"}</button>
                </div>
                <div className="week-calendar" style={{ display: 'flex', justifyContent: 'space-around' }}>
                    {weekDays.map((day) => (
                        <div key={day} className="calendar-day-row" style={{ textAlign: 'center', padding: '10px' }}>
                            <p className="day-label" style={{ fontSize: '1.2em' }}>{format(day, 'EEE MM/dd')}</p>
                            <div className="emoji-toggles" style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                                <div
                                    className={`emoji-toggle ${selectedDays[format(day, 'yyyy-MM-dd')]?.water ? 'visible' : ''}`}
                                    onClick={() => toggleDayMode(day, 'water')}
                                    style={{ fontSize: '1.5em', cursor: 'pointer' }}
                                >
                                    {selectedDays[format(day, 'yyyy-MM-dd')]?.water ? '💧' : ''}
                                </div>
                                <div
                                    className={`emoji-toggle ${selectedDays[format(day, 'yyyy-MM-dd')]?.sun ? 'visible' : ''}`}
                                    onClick={() => toggleDayMode(day, 'sun')}
                                    style={{ fontSize: '1.5em', cursor: 'pointer' }}
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

export default DetailedView;
