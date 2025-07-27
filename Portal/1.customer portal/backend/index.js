import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import loginRoute from './routes/login.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/login', loginRoute);

// Health check
app.get('/', (req, res) => {
  res.send('Customer Portal Backend is running');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
