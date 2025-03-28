import { Request, Response } from 'express';
import { IDashboardService, DashboardValidationError } from '../services/DashboardService';

export class DashboardController {
  constructor(private readonly service: IDashboardService) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const dashboard = await this.service.createDashboard(req.body);
      res.status(201).json(dashboard);
    } catch (error) {
      if (error instanceof DashboardValidationError) {
        res.status(400).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const dashboards = await this.service.getAllDashboards();
      res.json(dashboards);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch dashboards' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const dashboard = await this.service.getDashboardById(req.params.id);
      if (!dashboard) {
        res.status(404).json({ error: 'Dashboard not found' });
        return;
      }
      res.json(dashboard);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch dashboard' });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const dashboard = await this.service.updateDashboard(req.params.id, req.body);
      if (!dashboard) {
        res.status(404).json({ error: 'Dashboard not found' });
        return;
      }
      res.json(dashboard);
    } catch (error) {
      if (error instanceof DashboardValidationError) {
        res.status(400).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const success = await this.service.deleteDashboard(req.params.id);
      if (!success) {
        res.status(404).json({ error: 'Dashboard not found' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete dashboard' });
    }
  }

  async deleteAll(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.service.deleteAllDashboards();
      if (!result) {
        res.status(404).json({ error: 'No dashboards found to delete' });
        return;
      }
      res.status(200).json({ message: 'All dashboards deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete dashboards' });
    }
  }
} 