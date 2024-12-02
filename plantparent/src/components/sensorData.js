const fetchSensorData = async (setSensorData, setError) => {
  try {
      const response = await fetch('https://so7bglvkza.execute-api.us-east-1.amazonaws.com/dev/sensorDataV2', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Received data:', data);

      // Assuming the API response is an array of sensor data
      setSensorData(data); // Set the entire data array
  } catch (err) {
      console.error('Failed to fetch sensor data:', err);
      setError('Failed to load sensor data.');
  }
};

export default fetchSensorData;
