import { Router } from 'express';
import { DashboardController } from '../controllers/DashboardController';

export const createDashboardRoutes = (controller: DashboardController): Router => {
  const router = Router();

  router.post('/', (req, res) => controller.create(req, res));
  router.get('/', (req, res) => controller.getAll(req, res));
  router.get('/:id', (req, res) => controller.getById(req, res));
  router.put('/:id', (req, res) => controller.update(req, res));
  router.delete('/', (req, res) => controller.deleteAll(req, res));
  router.delete('/:id', (req, res) => controller.delete(req, res));

  return router;
}; 