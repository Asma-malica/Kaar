import { fetchInvoices } from '../services/invoiceservices.js';

export const getInvoices = async (req, res) => {
  const { VendorId } = req.body;

  if (!VendorId) {
    return res.status(400).json({ message: 'VendorId is required' });
  }

  try {
    const data = await fetchInvoices(VendorId);
    res.status(200).json({ message: 'Invoices fetched successfully', data });
  } catch (error) {
    console.error('❌ Error fetching Invoices:', error.message);
    res.status(500).json({ message: 'Failed to fetch Invoices', error: error.message });
  }
};
