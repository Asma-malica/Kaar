import express from 'express';
import { loginEmployee } from '../controllers/logincontrollers.js';

const router = express.Router();

// POST /api/employee/login
router.post('/login', loginEmployee);

export default router;
