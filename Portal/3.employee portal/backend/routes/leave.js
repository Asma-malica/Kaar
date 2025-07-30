import express from 'express';
import { fetchLeaveData } from '../controllers/leavecontrollers.js';
const router = express.Router();

router.post('/leave', fetchLeaveData);

export default router;
