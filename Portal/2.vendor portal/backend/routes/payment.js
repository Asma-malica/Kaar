import express from 'express';
import { getPayments } from '../controllers/paymentcontrollers.js';

const router = express.Router();

router.post('/payment', getPayments);

export default router;
