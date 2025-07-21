import { fetchCreditDebitMemos } from '../services/creditdebitservices.js';

export const getCreditDebitMemos = async (req, res) => {
  const { VendorId } = req.body;

  if (!VendorId) {
    return res.status(400).json({ message: 'VendorId is required' });
  }

  try {
    const data = await fetchCreditDebitMemos(VendorId);
    res.status(200).json({ message: 'Credit/Debit Memos fetched successfully', data });
  } catch (error) {
    console.error('❌ Error fetching Credit/Debit Memos:', error.message);
    res.status(500).json({ message: 'Failed to fetch Credit/Debit Memos', error: error.message });
  }
};
