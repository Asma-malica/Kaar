import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import loginRoutes from './routes/login.js';
import profileRoutes from './routes/profile.js';
import rfqRoutes from './routes/rfq.js';
import purchaseOrderRoutes from './routes/purchaseorder.js';




const app = express();  // ✅ Initialize app first

app.use(cors());        // ✅ Then use middleware
app.use(bodyParser.json());

app.use('/api', loginRoutes);
app.use('/api', profileRoutes);
app.use('/api', rfqRoutes);
app.use('/api', purchaseOrderRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
