const express = require("express");
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const { OpenAI } = require("openai"); // Correct import for v4.0+
require("dotenv").config(); // Load environment variables
const multer = require("multer");   // Including photo upload support
const upload = multer({ storage: multer.memoryStorage() });


const app = express();
const port = 3001;

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Ensure this key is in your .env file
});

// Global variable to store the latest sensor reading
let currentLux = 0;

// Initialize Serial Connection
async function initializeSerial() {
    try {
        const serialPort = new SerialPort({
            path: "COM5", // Adjust the COM port if needed
            baudRate: 115200,
        });

        const parser = serialPort.pipe(new ReadlineParser());

        // Handle incoming data
        parser.on("data", (line) => {
            try {
                const value = parseFloat(line);
                if (!isNaN(value) && value >= 0) {
                    currentLux = value;
                    console.log(`Updated light level: ${currentLux} lux`);
                }
            } catch (error) {
                console.error("Error parsing data:", error);
            }
        });

        serialPort.on("error", (err) => {
            console.error("Serial port error:", err);
        });

        serialPort.on("open", () => {
            console.log("Serial port COM5 is open");
        });
    } catch (error) {
        console.error("Error initializing serial port:", error);
    }
}

// Enable CORS for development
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Middleware to parse JSON requests
app.use(express.json());

// Simple route to test the server
app.get("/", (req, res) => {
    res.send("Hello from the backend server!");
});

// Endpoint for light sensor data
app.get("/lightsensor", (req, res) => {
    res.json({
        lux: currentLux,
        timestamp: Date.now(),
    });
});

// Endpoint for mclass.js functionality
const mclass = require("./client/src/mclass");
app.get("/class", (req, res) => {
    res.json({ message: mclass() });
});

// ChatBot Endpoint
app.post("/api/chat", upload.single("photo"), async (req, res) => {
    const { message, plantName } = req.body;
    const photo = req.file; // Uploaded photo

    if (!message && !photo) {
        return res.status(400).json({ error: "Message or photo is required" });
    }

    let botMessage = "";

    if (photo) {
        botMessage = `I see the photo you uploaded for ${plantName}. It looks great!`;
        console.log(`Received photo: ${photo.originalname}`);
    } else {
        try {
            console.log(`Received message: ${message}`);
            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: `You are a plant care expert. The plant's name is ${plantName}.` },
                    { role: "user", content: message },
                ],
                max_tokens: 50,
                temperature: 0.7,
            });

            botMessage = response.choices[0]?.message.content.trim();
        } catch (error) {
            console.error("Error in chatbot response:", error.message || error);
            return res.status(500).json({ error: "Failed to get response from AI" });
        }
    }

    res.json({ response: botMessage });
});

// Start the server and initialize serial connection
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    initializeSerial();
});
