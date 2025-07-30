import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import loginRoutes from './routes/login.js';
import profileRoutes from './routes/profile.js';
import leaveRoutes from './routes/leave.js';


const app = express();
const PORT = 3000; // Change to your preferred port

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Route setup
app.use('/api', loginRoutes);
app.use('/api', profileRoutes);
app.use('/api', leaveRoutes);


// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Employee Portal backend is running at http://localhost:${PORT}`);
});
