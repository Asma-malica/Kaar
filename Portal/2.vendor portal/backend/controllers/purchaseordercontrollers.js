import { fetchPurchaseOrders } from '../services/purchaseorderservices.js';

export const getPurchaseOrders = async (req, res) => {
  const { VendorId } = req.body;

  if (!VendorId) {
    return res.status(400).json({ message: 'VendorId is required.' });
  }

  try {
    const poData = await fetchPurchaseOrders(VendorId);

    if (poData.length > 0) {
      return res.status(200).json({ message: 'Purchase Orders fetched successfully', data: poData });
    } else {
      return res.status(404).json({ message: 'No Purchase Orders found for this Vendor' });
    }
  } catch (error) {
    console.error('❗ Error fetching Purchase Orders:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
