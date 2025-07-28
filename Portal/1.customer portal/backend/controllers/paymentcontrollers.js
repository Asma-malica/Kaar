import { fetchPayments } from '../services/paymentservices.js';

export const getPaymentsByCustomerId = async (req, res) => {
  const customerId = req.params.customerId;

  if (!customerId) {
    return res.status(400).json({ error: 'Customer ID is required' });
  }

  try {
    const payments = await fetchPayments(customerId);
    res.json({ payments });
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
