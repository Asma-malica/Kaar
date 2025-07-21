import { fetchPayments } from '../services/paymentservices.js';

export const getPayments = async (req, res) => {
  const { VendorId } = req.body;

  if (!VendorId) {
    return res.status(400).json({ message: 'VendorId is required' });
  }

  try {
    const data = await fetchPayments(VendorId);
    res.status(200).json({ message: 'Payments fetched successfully', data });
  } catch (error) {
    console.error('❌ Error fetching payments:', error.message);
    res.status(500).json({ message: 'Failed to fetch payments', error: error.message });
  }
};
