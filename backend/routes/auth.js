// routes/auth.js
import express from 'express';
import { signUp, signIn } from '../controllers/authController.js';

const router = express.Router();

// Sign Up route
router.post('/signup', signUp);

// Sign In route
router.post('/signin', signIn);

export default router;
