import mongoose, { Document } from 'mongoose';

export interface IDashboard extends Document {
  altitude: number;  // 0-3000
  his: number;      // 0-360
  adi: number;      // -100 to 100
}

const DashboardSchema = new mongoose.Schema({
  altitude: { 
    type: Number, 
    required: true,
    min: 0,
    max: 3000,
    validate: {
      validator: Number.isInteger,
      message: 'Altitude must be an integer'
    }
  },
  his: { 
    type: Number, 
    required: true,
    min: 0,
    max: 360,
    validate: {
      validator: Number.isInteger,
      message: 'HIS must be an integer'
    }
  },
  adi: { 
    type: Number, 
    required: true,
    min: -100,
    max: 100,
    validate: {
      validator: Number.isInteger,
      message: 'ADI must be an integer'
    }
  }
});

export const Dashboard = mongoose.model<IDashboard>('Dashboard', DashboardSchema); 