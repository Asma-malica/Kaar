import { fetchOverallSales } from '../services/overallsalesservices.js';

export const getOverallSalesByCustomerId = async (req, res) => {
  const customerId = req.params.customerId;
  if (!customerId) return res.status(400).json({ error: 'Customer ID is required' });

  try {
    const overallSales = await fetchOverallSales(customerId);
    res.json({ overallSales });
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
