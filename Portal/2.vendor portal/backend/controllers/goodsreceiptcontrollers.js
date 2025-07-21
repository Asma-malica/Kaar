import { fetchGoodsReceipts } from '../services/goodsreceiptservices.js';

export const getGoodsReceipts = async (req, res) => {
  const { VendorId } = req.body;

  if (!VendorId) {
    return res.status(400).json({ message: 'VendorId is required' });
  }

  try {
    const data = await fetchGoodsReceipts(VendorId);
    res.status(200).json({ message: 'Goods Receipts fetched successfully', data });
  } catch (error) {
    console.error('❌ Error fetching Goods Receipts:', error.message);
    res.status(500).json({ message: 'Failed to fetch Goods Receipts', error: error.message });
  }
};
