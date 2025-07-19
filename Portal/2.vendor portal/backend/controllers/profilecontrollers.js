import { fetchVendorProfile } from '../services/profileservices.js';

export const getVendorProfile = async (req, res) => {
  const { VendorId } = req.body;

  if (!VendorId) {
    return res.status(400).json({ message: 'VendorId is required.' });
  }

  try {
    const profileData = await fetchVendorProfile(VendorId);

    if (profileData) {
      return res.status(200).json({ message: 'Profile fetched successfully', data: profileData });
    } else {
      return res.status(404).json({ message: 'Vendor Profile not found' });
    }
  } catch (error) {
    console.error('❗ Error fetching profile:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
