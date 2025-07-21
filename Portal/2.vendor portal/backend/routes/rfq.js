import express from 'express';
import { getVendorRFQ } from '../controllers/rfqcontrollers.js';

const router = express.Router();

// POST /api/rfq
router.post('/rfq', getVendorRFQ);

export default router;
