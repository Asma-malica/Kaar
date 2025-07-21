import express from 'express';
import { getPurchaseOrders } from '../controllers/purchaseordercontrollers.js';

const router = express.Router();

router.post('/purchaseorders', getPurchaseOrders);

export default router;
