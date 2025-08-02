import express from 'express';
import cors from 'cors';
import loginRoutes from './routes/login.js';   // Your other route files; keep if applicable
import profileRoutes from './routes/profile.js';
import leaveRoutes from './routes/leave.js';
import payslipRoutes from './routes/payslip.js';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount routes
app.use('/api', loginRoutes);
app.use('/api', profileRoutes);
app.use('/api', leaveRoutes);
app.use('/api', payslipRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('🚀 Employee Portal backend is running');
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
