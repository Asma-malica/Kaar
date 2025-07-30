import { getProfileData } from '../services/profileservices.js';

export const fetchProfile = async (req, res) => {
  const { empId } = req.body;

  if (!empId) {
    return res.status(400).json({ message: 'Employee ID is required.' });
  }

  try {
    const profile = await getProfileData(empId);

    if (!profile || !profile.E_PROFILE_DATA) {
      return res.status(404).json({ message: profile?.E_MESSAGE || 'Profile not found.' });
    }

    return res.status(200).json({
      message: profile.E_MESSAGE,
      profile: profile.E_PROFILE_DATA
    });
  } catch (error) {
    console.error('Profile Fetch Error:', error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
