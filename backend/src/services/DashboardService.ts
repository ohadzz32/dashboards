import { IDashboard } from '../models/Dashboard';
import { IDashboardRepository } from '../repositories/DashboardRepository';

export interface IDashboardService {
  createDashboard(data: Partial<IDashboard>): Promise<IDashboard>;
  getAllDashboards(): Promise<IDashboard[]>;
  getDashboardById(id: string): Promise<IDashboard | null>;
  updateDashboard(id: string, data: Partial<IDashboard>): Promise<IDashboard | null>;
  deleteDashboard(id: string): Promise<boolean>;
  deleteAllDashboards(): Promise<boolean>;
}

export class DashboardValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DashboardValidationError';
  }
}

export class DashboardService implements IDashboardService {
  constructor(private readonly repository: IDashboardRepository) {}

  private validateDashboard(data: Partial<IDashboard>): void {
    if (typeof data.altitude !== 'number') {
      throw new DashboardValidationError('Altitude must be a number');
    }
    if (typeof data.his !== 'number') {
      throw new DashboardValidationError('HIS must be a number');
    }
    if (typeof data.adi !== 'number') {
      throw new DashboardValidationError('ADI must be a number');
    }
    if (data.altitude < 0) {
      throw new DashboardValidationError('Altitude cannot be negative');
    }
    if (data.his < 0 || data.his > 360) {
      throw new DashboardValidationError('HIS must be between 0 and 360 degrees');
    }
    if (data.adi < -100 || data.adi > 100) {
      throw new DashboardValidationError('ADI must be between -100 and 100');
    }
  }

  async createDashboard(data: Partial<IDashboard>): Promise<IDashboard> {
    this.validateDashboard(data);
    return await this.repository.create(data);
  }

  async getAllDashboards(): Promise<IDashboard[]> {
    return await this.repository.findAll();
  }

  async getDashboardById(id: string): Promise<IDashboard | null> {
    return await this.repository.findById(id);
  }

  async updateDashboard(id: string, data: Partial<IDashboard>): Promise<IDashboard | null> {
    if (Object.keys(data).length === 0) {
      throw new DashboardValidationError('No valid fields to update');
    }
    this.validateDashboard(data);
    return await this.repository.update(id, data);
  }

  async deleteDashboard(id: string): Promise<boolean> {
    return await this.repository.delete(id);
  }

  async deleteAllDashboards(): Promise<boolean> {
    return await this.repository.deleteAll();
  }
} 