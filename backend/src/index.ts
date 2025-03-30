import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { DashboardRepository } from './repositories/DashboardRepository';
import { DashboardService } from './services/DashboardService';
import { DashboardController } from './controllers/DashboardController';
import { createDashboardRoutes } from './routes/DashboardRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
  origin: '*'
}));
app.use(express.json());

const repository = new DashboardRepository();
const service = new DashboardService(repository);
const controller = new DashboardController(service);

app.use('/api/dashboard', createDashboardRoutes(controller));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dashboard')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  }); 