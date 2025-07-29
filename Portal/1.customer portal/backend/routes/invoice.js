// routes/invoice.js
import express from 'express';
import { getInvoiceData, downloadInvoicePDF } from '../controllers/invoicecontrollers.js';

const router = express.Router();

router.post('/invoices', getInvoiceData);          // Fetch invoice data
router.post('/invoices/pdf', downloadInvoicePDF);  // Download invoice PDF

export default router;
