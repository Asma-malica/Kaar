import { getLeaveData } from '../services/leaveservices.js';

export const fetchLeaveData = async (req, res) => {
  const { empId } = req.body;

  if (!empId) {
    return res.status(400).json({ message: 'Employee ID is required.' });
  }

  try {
    const leaveData = await getLeaveData(empId);
    if (!leaveData) {
      return res.status(404).json({ message: 'No leave data found.' });
    }
    res.status(200).json({ message: 'Leave data retrieved successfully.', leaveData });
  } catch (error) {
    console.error('Error fetching leave data:', error);
    res.status(500).json({ message: 'Server error' });
  }
};