const express = require('express');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const { Configuration, OpenAIApi } = require('openai'); // Import OpenAI API
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = 3001;

// Load OpenAI API key from environment variables
const openai = new OpenAIApi(
    new Configuration({
        apiKey: process.env.OPENAI_API_KEY, // Ensure your .env file has this key
    })
);

// Global variable to store the latest sensor reading
let currentLux = 0;

// Initialize Serial Connection
async function initializeSerial() {
    try {
        const serialPort = new SerialPort({
            path: 'COM5',  // Adjust the COM port if needed
            baudRate: 115200
        });

        const parser = serialPort.pipe(new ReadlineParser());

        // Handle incoming data
        parser.on('data', (line) => {
            try {
                const value = parseFloat(line);
                if (!isNaN(value) && value >= 0) {
                    currentLux = value;
                    console.log(`Updated light level: ${currentLux} lux`);
                }
            } catch (error) {
                console.error('Error parsing data:', error);
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

// Endpoint for mclass.js functionality
const mclass = require('./client/src/mclass');
app.get('/class', (req, res) => {
    res.json({ message: mclass() });
});

// ChatBot Endpoint
app.post('/api/chat', async (req, res) => {
    const { message, plantName } = req.body;
    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        console.log(`Received message: ${message}`);
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `You are a plant care expert. The plant's name is ${plantName}. Answer the question: ${message}`,
            max_tokens: 150,
            temperature: 0.7,
        });

        const botResponse = response.data.choices[0]?.text.trim();
        console.log(`Bot response: ${botResponse}`);
        res.json({ response: botResponse });
    } catch (error) {
        console.error('Error in chatbot response:', error);
        res.status(500).json({ error: 'Failed to get response from AI' });
    }
});

// Start the server and initialize serial connection
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    initializeSerial();
});