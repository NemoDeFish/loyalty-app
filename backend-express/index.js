const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const IP = '192.168.68.112'; // Replace with your local IP address

// Middleware
app.use(cors());
// app.use(cors({ origin: '*' })); // Allow all origins
app.use(express.json());

// Use routes
app.use('/api/users', userRoutes);


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

// Routes
app.get('/', (req, res) => {
  res.send('Loyalty Backend is running!');
});

// Start the server
app.listen(PORT, IP, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});