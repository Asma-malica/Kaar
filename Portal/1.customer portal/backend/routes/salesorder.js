import express from 'express';
import { getSalesOrdersByCustomerId } from '../controllers/salesordercontrollers.js';

const router = express.Router();

// GET endpoint is recommended for fetching data
router.post('/salesorder/:customerId', getSalesOrdersByCustomerId);

export default router;
