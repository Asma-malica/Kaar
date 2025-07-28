import { getInquiryList } from '../services/inquiryservices.js';

export const fetchInquiry = async (req, res) => {
  const { customerId } = req.params;

  if (!customerId) {
    return res.status(400).json({ message: 'Customer ID is required' });
  }

  try {
    const inquiries = await getInquiryList(customerId);
    return res.status(200).json({ message: 'Inquiry fetched successfully', inquiries });
  } catch (error) {
    console.error('Inquiry Fetch Error:', error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
