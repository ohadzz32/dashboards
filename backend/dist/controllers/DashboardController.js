"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const DashboardService_1 = require("../services/DashboardService");
class DashboardController {
    constructor(service) {
        this.service = service;
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dashboard = yield this.service.createDashboard(req.body);
                res.status(201).json(dashboard);
            }
            catch (error) {
                if (error instanceof DashboardService_1.DashboardValidationError) {
                    res.status(400).json({ error: error.message });
                    return;
                }
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dashboards = yield this.service.getAllDashboards();
                res.json(dashboards);
            }
            catch (error) {
                res.status(500).json({ error: 'Failed to fetch dashboards' });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dashboard = yield this.service.getDashboardById(req.params.id);
                if (!dashboard) {
                    res.status(404).json({ error: 'Dashboard not found' });
                    return;
                }
                res.json(dashboard);
            }
            catch (error) {
                res.status(500).json({ error: 'Failed to fetch dashboard' });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dashboard = yield this.service.updateDashboard(req.params.id, req.body);
                if (!dashboard) {
                    res.status(404).json({ error: 'Dashboard not found' });
                    return;
                }
                res.json(dashboard);
            }
            catch (error) {
                if (error instanceof DashboardService_1.DashboardValidationError) {
                    res.status(400).json({ error: error.message });
                    return;
                }
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.service.deleteDashboard(req.params.id);
                if (!success) {
                    res.status(404).json({ error: 'Dashboard not found' });
                    return;
                }
                res.status(204).send();
            }
            catch (error) {
                res.status(500).json({ error: 'Failed to delete dashboard' });
            }
        });
    }
    deleteAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.service.deleteAllDashboards();
                if (!result) {
                    res.status(404).json({ error: 'No dashboards found to delete' });
                    return;
                }
                res.status(200).json({ message: 'All dashboards deleted successfully' });
            }
            catch (error) {
                res.status(500).json({ error: 'Failed to delete dashboards' });
            }
        });
    }
}
exports.DashboardController = DashboardController;
