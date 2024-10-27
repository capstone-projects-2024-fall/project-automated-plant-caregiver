// fetchSensorData.js

const fetchSensorData = async (setSensorData, setError) => {
    try {
      const response = await fetch('https://zxk89h80gg.execute-api.us-east-1.amazonaws.com/dev/data', {
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
  
      // Assuming you want the latest entry (last element in the array)
      const latestData = data[data.length - 1];  // Get the last element of the array
      setSensorData(latestData);  // Set only the latest data
    } catch (err) {
      console.error("Failed to fetch sensor data:", err);
      setError('Failed to load sensor data.');
    }
  };
  
  export default fetchSensorData;
  