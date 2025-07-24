import express from 'express';
import * as invoicecontroller from '../controllers/invoicecontrollers.js';

const router = express.Router();

router.get('/invoice', invoicecontroller.getInvoicesByVendor);
router.get('/invoice/pdf/:belnr', invoicecontroller.getInvoicePdfByBelnr); 
export default router;
