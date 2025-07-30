import { getEmployeeData } from '../services/loginservices.js';

export const loginEmployee = async (req, res) => {
  const { empId, password } = req.body;

  if (!empId || !password) {
    return res.status(400).json({ message: 'Employee ID and Password are required.' });
  }

  try {
    const employee = await getEmployeeData(empId, password);

    if (!employee || employee.status !== 'SUCCESS') {
      return res.status(401).json({ message: employee?.message || 'Invalid credentials' });
    }

    return res.status(200).json({ message: 'Login successful', employee });
  } catch (error) {
    console.error('Login Error:', error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
