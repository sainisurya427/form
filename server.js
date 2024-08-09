 

// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const app = express();
// const port = 3000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.static(__dirname)); // Serve static files

// // MongoDB connection
// // const dbURI = 'mongodb+srv://sssaini427:eUcyhWUTvdZwDjY0@saurabh.j5d6osx.mongodb.net/?retryWrites=true&w=majority&appName=Saurabh';
// const dbURI = 'mongodb+srv://saurabh:ssbhageriya427@saurabh.j5d6osx.mongodb.net/mydata';
// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.error('MongoDB connection error:', err));

// // Mongoose Schema
// const userSchema = new mongoose.Schema({
//     firstName: { 
//         type: String, 
//         required: true, 
//         match: /^[A-Za-z]+$/  // Only alphabetic characters
//     },
//     lastName: { 
//         type: String, 
//         required: true, 
//         match: /^[A-Za-z]+$/  // Only alphabetic characters
//     },
//     mobileNo: { 
//         type: String, 
//         required: true, 
//         match: /^\d{10}$/  // 10 digit number
//     },
//     emailId: { 
//         type: String, 
//         required: true, 
//         match: /^\S+@\S+\.\S+$/  // Basic email format
//     },
//     address: { 
//         type: String, 
//         match: /^[A-Za-z\s]*$/  // Only alphabetic characters and spaces
//     },
//     street: { 
//         type: String, 
//         match: /^[A-Za-z\s]*$/  // Only alphabetic characters and spaces
//     },
//     city: { 
//         type: String, 
//         match: /^[A-Za-z\s]*$/  // Only alphabetic characters and spaces
//     },
//     state: { 
//         type: String, 
//         match: /^[A-Za-z\s]*$/  // Only alphabetic characters and spaces
//     },
//     country: { 
//         type: String, 
//         match: /^[A-Za-z\s]*$/  // Only alphabetic characters and spaces
//     },
//     loginId: { 
//         type: String, 
//         required: true, 
//         match: /^[a-zA-Z0-9]{8,}$/  // Alphanumeric and at least 8 characters long
//     },
//     password: { 
//         type: String, 
//         required: true, 
//         match: /^[a-zA-Z0-9](?=.*\d).{8,10}$/  // Password with at least one lowercase, one uppercase, and one digit, at least 8 characters long
//     },
//     creationTime: { 
//         type: Date, 
//         default: Date.now 
//     },
//     lastUpdatedOn: { 
//         type: Date, 
//         default: Date.now 
//     }
// });

// const User = mongoose.model('User', userSchema);

// // Routes
// app.post('/api/user', async (req, res) => {
//     try {
//         const user = new User(req.body);
//         await user.save();
//         res.status(201).send(user);
//     } catch (err) {
//         console.error('Error saving user:', err);
//         res.status(400).send(err);
//     }
// });

// app.get('/api/users', async (req, res) => {
//     try {
//         const users = await User.find();
//         res.status(200).send(users);
//     } catch (err) {
//         console.error('Error loading users:', err);
//         res.status(400).send(err);
//     }
// });

// // Start server
// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });



const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// MongoDB connection
const dbURI = 'mongodb+srv://sssaini427:eUcyhWUTvdZwDjY0@saurabh.j5d6osx.mongodb.net/?retryWrites=true&w=majority&appName=Saurabh';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Mongoose Schema with custom error messages
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: [true, 'First name is required'], match: [/^[a-zA-Z]+$/, 'First name must contain only letters'] },
    lastName: { type: String, required: [true, 'Last name is required'], match: [/^[a-zA-Z]+$/, 'Last name must contain only letters'] },
    mobileNo: { type: String, required: [true, 'Mobile number is required'], match: [/^\d{10}$/, 'Mobile number must be a 10-digit number'] },
    emailId: { type: String, required: [true, 'Email ID is required'], match: [/^\S+@\S+\.\S+$/, 'Email ID must be a valid email address'] },
    address: { type: String, match: [/^[a-zA-Z\s]*$/, 'Address must contain only letters and spaces'] },
    street: { type: String, match: [/^[a-zA-Z\s]*$/, 'Street must contain only letters and spaces'] },
    city: { type: String, match: [/^[a-zA-Z\s]*$/, 'City must contain only letters and spaces'] },
    state: { type: String, match: [/^[a-zA-Z\s]*$/, 'State must contain only letters and spaces'] },
    country: { type: String, match: [/^[a-zA-Z\s]*$/, 'Country must contain only letters and spaces'] },
    loginId: { type: String, required: [true, 'Login ID is required'], match: [/^[a-zA-Z0-9]{6,10}$/, 'Login ID must be at least 8 characters long and contain only letters and numbers'] },
    password: { type: String, required: [true, 'Password is required'], match:[/^[a-zA-Z0-9]{8,12}$/ , 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number'] },
    creationTime: { type: Date, default: Date.now },
    lastUpdatedOn: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Routes
app.post('/api/user', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (err) {
        console.error('Error saving user:', err);
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map(e => e.message);
            res.status(400).send({ message: 'Validation error', errors });
        } else {
            res.status(400).send({ message: 'Error saving user', error: err.message });
        }
    }
});

app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (err) {
        console.error('Error loading users:', err);
        res.status(400).send({ message: 'Error loading users', error: err.message });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});