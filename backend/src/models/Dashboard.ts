import mongoose, { Document } from 'mongoose';

export interface IDashboard extends Document {
  altitude: number;
  his: number;
  adi: number;
}

const DashboardSchema = new mongoose.Schema({
  altitude: { type: Number, required: true },
  his: { type: Number, required: true },
  adi: { type: Number, required: true }
});

export const Dashboard = mongoose.model<IDashboard>('Dashboard', DashboardSchema); 