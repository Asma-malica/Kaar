import { loginCustomer } from '../services/loginservices.js'; // ✅ extension required

export const handleCustomerLogin = (req, res) => {
  const { customerId, password } = req.body;

  if (!customerId || !password) {
    return res.status(400).json({ message: 'Customer ID and Password are required.' });
  }

  loginCustomer(customerId, password, (error, soapResponse) => {
    if (error) {
      return res.status(500).json({ message: 'Error calling SAP RFC', error: error.message });
    }

    res.status(200).send(soapResponse);
  });
};
