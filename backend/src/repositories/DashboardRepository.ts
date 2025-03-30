import { IDashboard } from '../models/Dashboard';
import { Dashboard } from '../models/Dashboard';
import mongoose from 'mongoose';

export interface IDashboardRepository {
  create(data: Partial<IDashboard>): Promise<IDashboard>;
  findAll(): Promise<IDashboard[]>;
  findById(id: string): Promise<IDashboard | null>;
  update(id: string, data: Partial<IDashboard>): Promise<IDashboard | null>;
  delete(id: string): Promise<boolean>;
  deleteAll(): Promise<boolean>;
}

export class DashboardRepository implements IDashboardRepository {
  async create(data: Partial<IDashboard>): Promise<IDashboard> {
    try {
      return await Dashboard.create(data);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        throw new Error('Invalid dashboard data');
      }
      throw error;
    }
  }

  async findAll(): Promise<IDashboard[]> {
    try {
      return await Dashboard.find();
    } catch (error) {
      throw new Error('Failed to fetch dashboards');
    }
  }

  async findById(id: string): Promise<IDashboard | null> {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
      }
      return await Dashboard.findById(id);
    } catch (error) {
      throw new Error('Failed to fetch dashboard');
    }
  }

  async update(id: string, data: Partial<IDashboard>): Promise<IDashboard | null> {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
      }
      return await Dashboard.findByIdAndUpdate(
        id,
        { $set: data },
        { 
          new: true,
          runValidators: true,
          upsert: false
        }
      );
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        throw new Error('Invalid dashboard data');
      }
      throw new Error('Failed to update dashboard');
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return false;
      }
      const result = await Dashboard.findByIdAndDelete(id);
      return result !== null;
    } catch (error) {
      throw new Error('Failed to delete dashboard');
    }
  }

  async deleteAll(): Promise<boolean> {
    try {
      const result = await Dashboard.deleteMany({});
      return result.deletedCount > 0;
    } catch (error) {
      throw new Error('Failed to delete all dashboards');
    }
  }
} 