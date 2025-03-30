"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDashboardRoutes = void 0;
const express_1 = require("express");
const createDashboardRoutes = (controller) => {
    const router = (0, express_1.Router)();
    router.post('/', (req, res) => controller.create(req, res));
    router.get('/', (req, res) => controller.getAll(req, res));
    router.get('/:id', (req, res) => controller.getById(req, res));
    router.put('/:id', (req, res) => controller.update(req, res));
    router.delete('/', (req, res) => controller.deleteAll(req, res));
    router.delete('/:id', (req, res) => controller.delete(req, res));
    return router;
};
exports.createDashboardRoutes = createDashboardRoutes;
