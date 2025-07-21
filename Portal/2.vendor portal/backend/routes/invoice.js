import express from 'express';
import { getInvoices } from '../controllers/invoicecontrollers.js';

const router = express.Router();

router.post('/invoice', getInvoices);

export default router;

