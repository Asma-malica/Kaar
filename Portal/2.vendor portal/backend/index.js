import express from 'express';
import bodyParser from 'body-parser';
import loginRoutes from './routes/login.js';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/api', loginRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
