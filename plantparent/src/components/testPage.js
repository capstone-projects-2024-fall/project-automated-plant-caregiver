import React, { useEffect, useState } from 'react';
import fetchSensorData from './sensorData'; // Adjust path if needed

function TestPage() {
    const [sensorData, setSensorData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data when the component loads
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await fetchSensorData(setSensorData, setError);
            setLoading(false);
        };

        fetchData();
    }, []);

    return (
        <div className="page" style={styles.page}>
            <h1 style={styles.title}>Sensor Data Dashboard</h1>
            <button
                onClick={async () => {
                    setLoading(true);
                    await fetchSensorData(setSensorData, setError);
                    setLoading(false);
                }}
                style={styles.refreshButton}
            >
                Refresh Data
            </button>
            {loading && <p style={styles.loading}>Loading data...</p>}
            {error && <p style={styles.error}>{error}</p>}
            {!loading && !error && sensorData.length > 0 && (
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.tableHeader}>Timestamp</th>
                            <th style={styles.tableHeader}>Temperature (°C)</th>
                            <th style={styles.tableHeader}>Soil Moisture (%)</th>
                            <th style={styles.tableHeader}>Lux</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sensorData.map((item, index) => (
                            <tr key={index} style={styles.tableRow}>
                                <td style={styles.tableCell}>{item.timestamp}</td>
                                <td style={styles.tableCell}>{item.temp}</td>
                                <td style={styles.tableCell}>{item.soil_moisture}</td>
                                <td style={styles.tableCell}>{item.lux}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {!loading && !error && sensorData.length === 0 && (
                <p style={styles.noData}>No sensor data available.</p>
            )}
        </div>
    );
}

const styles = { /* same as before */ };

export default TestPage;
