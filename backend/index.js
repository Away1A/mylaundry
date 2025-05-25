import express from 'express';
import dotenv from 'dotenv';
import { setupSwagger } from './swagger.js';
import apiRoutes from './routes/api/index.js'; // 🔥 Import router utama

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Swagger setup
setupSwagger(app);

// Prefix all API routes with `/api`
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
