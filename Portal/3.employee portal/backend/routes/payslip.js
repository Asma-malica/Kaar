import express from 'express';
import * as payslipController from '../controllers/payslipcontrollers.js';

const router = express.Router();

// POST /api/payslip/payslip   (You might want to consider fixing this to just '/' instead of '/payslip' inside this router)
router.post('/payslip', payslipController.getPayslip);

// POST /api/payslip/payslip/pdf
router.post('/payslip/pdf', payslipController.getPayslipPdf);

export default router;
