const express = require('express');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const app = express();
const port = 3001; 

// Global variables to store the latest sensor readings
let currentLux = 0;
let currentSoilMoisture = 0;

// Initialize Serial Connection
async function initializeSerial() {
    try {
        const serialPort = new SerialPort({
            path: 'COM5',  // Fixed COM port
            baudRate: 115200
        });

        const parser = serialPort.pipe(new ReadlineParser());

        // Track reading order
        let readingStep = 'lux'; // Alternate between 'lux' and 'soil'

        // Handle incoming data
        parser.on('data', (line) => {
            try {
                const value = parseFloat(line);
                if (!isNaN(value)) {
                    if (readingStep === 'lux') {
                        currentLux = value;
                        console.log(`Updated light level: ${currentLux} lux`);
                        readingStep = 'soil'; // Next reading is soil moisture
                    } else {
                        currentSoilMoisture = value;
                        console.log(`Updated soil moisture level: ${currentSoilMoisture}`);
                        readingStep = 'lux'; // Next reading is light level
                    }
                }
            } catch (error) {
                // Skip invalid data
            }
        });

        serialPort.on('error', (err) => {
            console.error('Serial port error:', err);
        });

        serialPort.on('open', () => {
            console.log('Serial port COM5 is open');
        });

    } catch (error) {
        console.error('Error initializing serial port:', error);
    }
}

// Enable CORS for development
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Middleware to parse JSON requests
app.use(express.json());

// Simple route to test the server
app.get('/', (req, res) => {
    res.send('Hello from the backend server!');
});

// Endpoint for light sensor data
app.get('/lightsensor', (req, res) => {
    res.json({
        lux: currentLux,
        timestamp: Date.now()
    });
});

// Endpoint for soil moisture sensor data
app.get('/soilmoisture', (req, res) => {
    res.json({
        soilMoisture: currentSoilMoisture,
        timestamp: Date.now()
    });
});

// Start the server and initialize serial connection
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    initializeSerial();
});
