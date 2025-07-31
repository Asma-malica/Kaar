import * as payslipService from '../services/payslipservices.js';

export async function getPayslip(req, res) {
  try {
    const empId = req.body.empId;
    if (!empId) {
      return res.status(400).json({ error: 'empId is required' });
    }

    const data = await payslipService.fetchPayslip(empId);
    res.json({ payslip: data });
  } catch (error) {
    console.error('Error fetching payslip data:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

// Send PDF inline so Postman or browser displays it immediately after Send
export async function getPayslipPdf(req, res) {
  try {
    const empId = req.body.empId;
    if (!empId) {
      return res.status(400).json({ error: 'empId is required' });
    }

    const base64pdf = await payslipService.fetchPayslipPdf(empId);
    const pdfBuffer = Buffer.from(base64pdf, 'base64');

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="payslip.pdf"');
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Error fetching payslip PDF:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
