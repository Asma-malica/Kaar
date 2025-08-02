import express from 'express';
import * as payslipController from '../controllers/payslipcontrollers.js';

const router = express.Router();

router.post('/payslip', payslipController.getPayslip);
router.post('/payslip/pdf', payslipController.getPayslipPdf);

export default router;
