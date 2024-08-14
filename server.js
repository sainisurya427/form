 // server.js
require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('./config/db');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for development purposes
app.use(cors());

// Body parser middleware
app.use(bodyParser.json());

// Serve static files (like index.html)
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/user', userRoutes);

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
