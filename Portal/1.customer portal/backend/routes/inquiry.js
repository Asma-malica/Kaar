import express from 'express';
import { fetchInquiry } from '../controllers/inquirycontrollers.js';

const router = express.Router();

router.post('/inquiry/:customerId', fetchInquiry);

export default router;
