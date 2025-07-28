// routes/profile.js
import express from 'express';
import { fetchCustomerProfile } from '../controllers/profilecontrollers.js';

const router = express.Router();

router.post('/profile', fetchCustomerProfile);

export default router;
