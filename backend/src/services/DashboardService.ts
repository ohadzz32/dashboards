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

  private validateDashboard(data: Partial<IDashboard>, isUpdate: boolean = false): void {
    // For updates, we don't need all fields
    if (!isUpdate && (!data.altitude || !data.his || !data.adi)) {
      throw new DashboardValidationError('All fields (altitude, his, adi) are required for creation');
    }

    // Validate altitude if provided
    if (data.altitude !== undefined) {
      if (typeof data.altitude !== 'number') {
        throw new DashboardValidationError('Altitude must be a number');
      }
      if (data.altitude < 0) {
        throw new DashboardValidationError('Altitude cannot be negative');
      }
    }

    // Validate HIS if provided
    if (data.his !== undefined) {
      if (typeof data.his !== 'number') {
        throw new DashboardValidationError('HIS must be a number');
      }
      if (data.his < 0 || data.his > 360) {
        throw new DashboardValidationError('HIS must be between 0 and 360 degrees');
      }
    }

    // Validate ADI if provided
    if (data.adi !== undefined) {
      if (typeof data.adi !== 'number') {
        throw new DashboardValidationError('ADI must be a number');
      }
      if (data.adi < -100 || data.adi > 100) {
        throw new DashboardValidationError('ADI must be between -100 and 100');
      }
    }
  }

  async createDashboard(data: Partial<IDashboard>): Promise<IDashboard> {
    try {
      this.validateDashboard(data, false);
      return await this.repository.create(data);
    } catch (error) {
      if (error instanceof DashboardValidationError) {
        throw error;
      }
      throw new Error('Failed to create dashboard');
    }
  }

  async getAllDashboards(): Promise<IDashboard[]> {
    try {
      return await this.repository.findAll();
    } catch (error) {
      throw new Error('Failed to fetch all dashboards');
    }
  }

  async getDashboardById(id: string): Promise<IDashboard | null> {
    try {
      return await this.repository.findById(id);
    } catch (error) {
      throw new Error('Failed to fetch dashboard');
    }
  }

  async updateDashboard(id: string, data: Partial<IDashboard>): Promise<IDashboard | null> {
    try {
      // Validate the update data
      this.validateDashboard(data, true);

      // Create a clean update object with only the fields we want to update
      const updateData: Partial<IDashboard> = {};
      if (typeof data.altitude === 'number') updateData.altitude = data.altitude;
      if (typeof data.his === 'number') updateData.his = data.his;
      if (typeof data.adi === 'number') updateData.adi = data.adi;

      // Perform the update
      const updated = await this.repository.update(id, updateData);
      if (!updated) {
        throw new Error('Dashboard not found');
      }

      return updated;
    } catch (error) {
      if (error instanceof DashboardValidationError) {
        throw error;
      }
      throw new Error('Failed to update dashboard');
    }
  }

  async deleteDashboard(id: string): Promise<boolean> {
    try {
      return await this.repository.delete(id);
    } catch (error) {
      throw new Error('Failed to delete dashboard');
    }
  }

  async deleteAllDashboards(): Promise<boolean> {
    try {
      return await this.repository.deleteAll();
    } catch (error) {
      throw new Error('Failed to delete all dashboards');
    }
  }
} 