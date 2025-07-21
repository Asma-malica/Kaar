import express from 'express';
import { getGoodsReceipts } from '../controllers/goodsreceiptcontrollers.js';

const router = express.Router();

router.post('/goodsreceipt', getGoodsReceipts);

export default router;
