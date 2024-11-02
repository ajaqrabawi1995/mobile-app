// routes/packageRoutes.js
import express from 'express';
import { getAllPackages } from '../controllers/packageController.js';

const router = express.Router();

router.get('/', getAllPackages); // Ensure this is set up correctly

export default router;
