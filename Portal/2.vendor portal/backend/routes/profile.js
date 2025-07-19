import express from 'express';
import { getVendorProfile } from '../controllers/profilecontrollers.js';

const router = express.Router();

router.post('/profile', getVendorProfile);

export default router;
