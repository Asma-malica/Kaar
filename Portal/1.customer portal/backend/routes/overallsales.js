import express from 'express';
import { getOverallSalesByCustomerId } from '../controllers/overallsalescontrollers.js';

const router = express.Router();

// GET endpoint to fetch overall sales by customerId
router.post('/overallsales/:customerId', getOverallSalesByCustomerId);

export default router;
