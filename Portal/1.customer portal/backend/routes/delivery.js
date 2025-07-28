import express from 'express';
import { getDeliveriesByCustomerId } from '../controllers/deliverycontrollers.js';

const router = express.Router();

router.post('/delivery/:customerId', getDeliveriesByCustomerId);

export default router;
