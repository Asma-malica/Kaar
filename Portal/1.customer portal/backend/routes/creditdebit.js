import express from 'express';
import { getCreditDebitMemosByCustomerId } from '../controllers/creditdebitcontrollers.js';

const router = express.Router();

// GET endpoint: /api/creditdebit/:customerId
router.post('/creditdebit/:customerId', getCreditDebitMemosByCustomerId);

export default router;
