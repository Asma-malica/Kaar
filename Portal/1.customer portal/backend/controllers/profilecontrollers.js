// controllers/profileControllers.js
import { getCustomerProfile } from '../services/profileservices.js';

export const fetchCustomerProfile = async (req, res) => {
  const { CustomerId } = req.body;

  if (!CustomerId) {
    return res.status(400).json({ message: 'CustomerId is required.' });
  }

  try {
    const profile = await getCustomerProfile(CustomerId);

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found.' });
    }

    return res.status(200).json({
      message: profile.MESSAGE || 'Profile fetched successfully',
      profile: {
        CustomerId: profile.CUSTOMER_ID,
        Name: profile.NAME,
        Country: profile.COUNTRY,
        City: profile.CITY,
        Pincode: profile.PINCODE,
        Street: profile.STREET,
        Email: profile.EMAIL,
        Phone: profile.PHONE
      }
    });
  } catch (err) {
    console.error('Profile fetch error:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
