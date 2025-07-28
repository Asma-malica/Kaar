import { fetchDeliveries } from '../services/deliveryservices.js';

export const getDeliveriesByCustomerId = async (req, res) => {
  const customerId = req.params.customerId;
  if (!customerId) return res.status(400).json({ error: 'Customer ID is required' });

  try {
    const deliveries = await fetchDeliveries(customerId);
    res.json({ deliveries });
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
