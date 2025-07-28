import express from 'express';
import { getPaymentsByCustomerId } from '../controllers/paymentcontrollers.js';

const router = express.Router();

// GET endpoint to fetch payments by customerId
router.post('/payment/:customerId', getPaymentsByCustomerId);

export default router;
