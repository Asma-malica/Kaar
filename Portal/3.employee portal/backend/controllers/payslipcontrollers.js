import * as payslipService from '../services/payslipservices.js';

export async function getPayslipData(req, res) {
  const { employeeId } = req.body;

  if (!employeeId || typeof employeeId !== 'string' || !employeeId.trim()) {
    return res.status(400).json({ error: 'Missing or invalid employeeId in request body' });
  }

  try {
    const data = await payslipService.fetchPayslipData(employeeId.trim());
    res.json({ employeeId: employeeId.trim(), payslipData: data });
  } catch (error) {
    console.error('Error in getPayslipData:', error.message);
    res.status(500).json({ error: error.message });
  }
}

export async function getPayslipPdf(req, res) {
  const { employeeId } = req.body;

  if (!employeeId || typeof employeeId !== 'string' || !employeeId.trim()) {
    return res.status(400).json({ error: 'Missing or invalid employeeId in request body' });
  }

  try {
    const base64Pdf = await payslipService.fetchPayslipPdf(employeeId.trim());
    res.json({ employeeId: employeeId.trim(), payslipPdfBase64: base64Pdf });
  } catch (error) {
    console.error('Error in getPayslipPdf:', error.message);
    res.status(500).json({ error: error.message });
  }
}
