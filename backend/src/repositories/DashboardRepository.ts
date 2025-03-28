import { IDashboard } from '../models/Dashboard';
import { Dashboard } from '../models/Dashboard';

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
    return await Dashboard.create(data);
  }

  async findAll(): Promise<IDashboard[]> {
    return await Dashboard.find();
  }

  async findById(id: string): Promise<IDashboard | null> {
    return await Dashboard.findById(id);
  }

  async update(id: string, data: Partial<IDashboard>): Promise<IDashboard | null> {
    return await Dashboard.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await Dashboard.findByIdAndDelete(id);
    return result !== null;
  }

  async deleteAll(): Promise<boolean> {
    const result = await Dashboard.deleteMany({});
    return result.deletedCount > 0;
  }
} 