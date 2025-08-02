import * as payslipService from '../services/payslipservices.js';

export async function getPayslip(req, res, next) {
  try {
    const { employeeId } = req.body;
    if (!employeeId) {
      return res.status(400).json({ error: 'employeeId is required in request body' });
    }

    const payslipData = await payslipService.getPayslipData(employeeId);
    res.json({ payslip: payslipData });

  } catch (error) {
    next(error);
  }
}

export async function getPayslipPdf(req, res, next) {
  try {
    const { employeeId } = req.body;
    if (!employeeId) {
      return res.status(400).json({ error: 'employeeId is required in request body' });
    }

    const base64Pdf = await payslipService.getPayslipPdf(employeeId);
    if (!base64Pdf) {
      return res.status(404).json({ error: 'Payslip PDF not found' });
    }

    const pdfBuffer = Buffer.from(base64Pdf, 'base64');

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=payslip_${employeeId}.pdf`);
    res.send(pdfBuffer);

  } catch (error) {
    next(error);
  }
}
