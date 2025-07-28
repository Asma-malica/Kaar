// logincontrollers.js
import { getVendorData } from '../services/loginservices.js';

export const loginVendor = async (req, res) => {
  const { VendorId, Password } = req.body;

  if (!VendorId || !Password) {
    return res.status(400).json({ message: 'VendorId and Password are required.' });
  }

  try {
    const vendor = await getVendorData(VendorId, Password);

    if (!vendor) {
      return res.status(401).json({ message: 'Invalid Vendor ID or Password' });
    }

    return res.status(200).json({ message: 'Login successful', vendor });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};
