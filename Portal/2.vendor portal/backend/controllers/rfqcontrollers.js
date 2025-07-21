import { fetchVendorRFQ } from '../services/rfqservices.js';

export const getVendorRFQ = async (req, res) => {
  const { VendorId } = req.body;

  if (!VendorId) {
    return res.status(400).json({ message: 'VendorId is required.' });
  }

  try {
    const rfqData = await fetchVendorRFQ(VendorId);

    if (rfqData.length > 0) {
      return res.status(200).json({ message: 'RFQ data fetched successfully', data: rfqData });
    } else {
      return res.status(404).json({ message: 'No RFQ data found for this VendorId' });
    }
  } catch (error) {
    console.error('❗ Error fetching RFQ:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
