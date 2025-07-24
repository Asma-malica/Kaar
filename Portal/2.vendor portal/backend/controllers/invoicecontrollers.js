import invoiceService from '../services/invoiceservices.js';

export const getInvoicesByVendor = async (req, res) => {
  try {
    const vendorId = req.query.vendorId;
    if (!vendorId) {
      return res.status(400).json({ error: 'vendorId query parameter is required' });
    }
    const invoices = await invoiceService.fetchInvoicesByVendor(vendorId);
    res.json(invoices);
  } catch (error) {
    console.error('Error in invoice controller:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getInvoicePdfByBelnr = async (req, res) => {
  try {
    const belnr = req.params.belnr;
    if (!belnr) {
      return res.status(400).json({ error: 'belnr parameter is required' });
    }

    const pdfBuffer = await invoiceService.fetchInvoicePdfByBelnr(belnr);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=invoice_${belnr}.pdf`,
      'Content-Length': pdfBuffer.length
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.error('Error fetching invoice PDF:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
