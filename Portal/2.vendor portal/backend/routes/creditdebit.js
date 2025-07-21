import express from 'express';
import { getCreditDebitMemos } from '../controllers/creditdebitcontrollers.js';

const router = express.Router();

router.post('/creditdebit', getCreditDebitMemos);

export default router;
