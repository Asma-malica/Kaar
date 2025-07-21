import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import loginRoutes from './routes/login.js';
import profileRoutes from './routes/profile.js';
import rfqRoutes from './routes/rfq.js';
import purchaseOrderRoutes from './routes/purchaseorder.js';
import goodsReceiptRoutes from './routes/goodsreceipt.js';
import invoiceRoutes from './routes/invoice.js';
import paymentRoutes from './routes/payment.js';
import creditDebitRoutes from './routes/creditdebit.js';

const app = express();  // ✅ Initialize app first

app.use(cors());        // ✅ Then use middleware
app.use(bodyParser.json());

app.use('/api', loginRoutes);
app.use('/api', profileRoutes);
app.use('/api', rfqRoutes);
app.use('/api', purchaseOrderRoutes);
app.use('/api', goodsReceiptRoutes);
app.use('/api', invoiceRoutes);
app.use('/api', paymentRoutes);
app.use('/api', creditDebitRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
