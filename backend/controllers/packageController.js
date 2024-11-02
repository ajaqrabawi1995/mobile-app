// backend/controllers/packageController.js
import Package from '../models/package.js';

export const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find().populate('items'); // Check if items are populated correctly
    res.json(packages);
  } catch (error) {
    console.error('Error fetching packages:', error); // Log the error for debugging
    res.status(500).json({ error: 'Error fetching packages' });
  }
};
