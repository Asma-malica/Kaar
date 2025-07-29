// controllers/invoicecontrollers.js
import invoiceService from '../services/invoiceservices.js';

export const getInvoiceData = async (req, res) => {
  try {
    const { customerId } = req.body;
    if (!customerId) return res.status(400).json({ message: 'Customer ID is required' });

    const invoices = await invoiceService.fetchInvoiceData(customerId);
    return res.status(200).json(invoices);
  } catch (error) {
    console.error('Error fetching invoice data:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message || error });
  }
};

export const downloadInvoicePDF = async (req, res) => {
  try {
    const { invoiceNumber } = req.body;
    if (!invoiceNumber) return res.status(400).json({ message: 'Invoice Number is required' });

    const pdfBuffer = await invoiceService.fetchInvoicePDF(invoiceNumber);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=invoice_${invoiceNumber}.pdf`,
      'Content-Length': pdfBuffer.length
    });

    return res.send(pdfBuffer);
  } catch (error) {
    console.error('Error fetching invoice PDF:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message || error });
  }
};
