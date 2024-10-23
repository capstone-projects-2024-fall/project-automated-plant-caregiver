const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Simple route to test the server
app.get('/', (req, res) => {
    res.send('Hello from the backend server!');
});

// Endpoint for mclass.js functionality
const mclass = require('../client/src/mclass');
app.get('/class', (req, res) => {
    res.json({ message: mclass() });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
