import { getVendorData } from '../services/loginservices.js';

export const loginVendor = async (req, res) => {
  const { VendorId, Password } = req.body;

  if (!VendorId || !Password) {
    return res.status(400).json({ message: 'VendorId and Password are required.' });
  }

  try {
    const vendorData = await getVendorData(VendorId, Password);

    if (vendorData) {
      return res.status(200).json({ message: 'Login successful', data: vendorData });
    } else {
      return res.status(401).json({ message: 'Invalid VendorId or Password' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
