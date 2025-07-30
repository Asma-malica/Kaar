import express from 'express';
import { fetchProfile } from '../controllers/profilecontrollers.js';

const router = express.Router();

// POST /api/employee/profile
router.post('/profile', fetchProfile);

export default router;
