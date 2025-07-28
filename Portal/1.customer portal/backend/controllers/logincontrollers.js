import { getCustomerData } from '../services/loginservices.js';

export const loginCustomer = async (req, res) => {
  const { CustomerId, Password } = req.body;

  if (!CustomerId || !Password) {
    return res.status(400).json({ message: 'CustomerId and Password are required.' });
  }

  try {
    const response = await getCustomerData(CustomerId, Password);

    if (response.status === 'S') {
      return res.status(200).json({
        message: response.message || 'Login successful',
        CustomerId,
        Password
      });
    } else {
      return res.status(401).json({
        message: response.message || 'Login failed'
      });
    }

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
