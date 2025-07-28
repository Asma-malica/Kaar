import { fetchCreditDebitMemos } from '../services/creditdebitservices.js';

export const getCreditDebitMemosByCustomerId = async (req, res) => {
  const customerId = req.params.customerId;

  if (!customerId) {
    return res.status(400).json({ error: 'Customer ID is required' });
  }

  try {
    const memos = await fetchCreditDebitMemos(customerId);
    res.json({ memos });
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
