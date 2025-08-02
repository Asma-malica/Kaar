import express from 'express';
import { getPayslipData, getPayslipPdf } from '../controllers/payslipcontrollers.js';

const router = express.Router();

router.post('/payslip', getPayslipData);
router.post('/payslip/pdf', getPayslipPdf);

export default router;
