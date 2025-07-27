import express from 'express';
import { handleCustomerLogin } from '../controllers/logincontrollers.js'; // ✅ extension required

const router = express.Router();

router.post('/', handleCustomerLogin);

export default router;
