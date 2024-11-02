// Import required modules
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import packageRoutes from './routes/packageRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import orderRoutes from './routes/orderRoutes.js'; 
import authRoutes from './routes/auth.js'
// Initialize environment variables
dotenv.config();

const app = express();

// Middleware

app.use(express.json());
app.use(express.static('uploads')); // Serve static files from the "uploads" directory
app.use(cors());
// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/VEGIES')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

app.use('/api/items', itemRoutes); // Add item management routes
app.use('/api/packages', packageRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes)
// Define the port
const PORT = 3001;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




