// routes/login.js
import express from 'express';
import { loginCustomer } from '../controllers/logincontrollers.js';

const router = express.Router();

router.post('/login', loginCustomer);

export default router;
