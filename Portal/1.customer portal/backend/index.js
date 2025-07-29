// index.js
import express from 'express';
import loginRoutes from './routes/login.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import profileRoutes from './routes/profile.js';
import inquiryRoutes from './routes/inquiry.js';
import salesorderRoutes from './routes/salesorder.js';
import deliveryRoutes from './routes/delivery.js';
import paymentRoutes from './routes/payment.js';
import creditdebitRoutes from './routes/creditdebit.js';
import overallsalesRoutes from './routes/overallsales.js';
import invoiceRoutes from'./routes/invoice.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', loginRoutes);
app.use('/api', profileRoutes);
app.use('/api', inquiryRoutes);
app.use('/api', salesorderRoutes);
app.use('/api', deliveryRoutes);
app.use('/api', paymentRoutes);
app.use('/api', creditdebitRoutes); 
app.use('/api', overallsalesRoutes); 
app.use('/api', invoiceRoutes);

app.listen(PORT, () => {
  console.log(`Customer Portal Backend running at http://localhost:${PORT}`);
});
