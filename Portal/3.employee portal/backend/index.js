import express from 'express';
import cors from 'cors';
import loginRoutes from './routes/login.js';
import profileRoutes from './routes/profile.js';
import leaveRoutes from './routes/leave.js';
import payslipRoutes from './routes/payslip.js';

const app = express();
const PORT = 3000;

// Middleware setup
app.use(cors());
app.use(express.json()); // Replaces body-parser
app.use(express.urlencoded({ extended: true }));

// Route setup
app.use('/api', loginRoutes);
app.use('/api', profileRoutes);
app.use('/api', leaveRoutes);
app.use('/api', payslipRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Employee Portal backend is running at http://localhost:${PORT}`);
});
