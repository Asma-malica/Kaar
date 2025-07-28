import { fetchSalesOrders } from '../services/salesorderservices.js';

export const getSalesOrdersByCustomerId = async (req, res) => {
  const customerId = req.params.customerId;
  if (!customerId) return res.status(400).json({ error: 'Customer ID is required' });

  try {
    const orders = await fetchSalesOrders(customerId);
    res.json({ salesOrders: orders });
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
