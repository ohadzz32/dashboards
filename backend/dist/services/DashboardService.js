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
exports.DashboardService = exports.DashboardValidationError = void 0;
class DashboardValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DashboardValidationError';
    }
}
exports.DashboardValidationError = DashboardValidationError;
class DashboardService {
    constructor(repository) {
        this.repository = repository;
    }
    validateDashboard(data, isUpdate = false) {
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
    createDashboard(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.validateDashboard(data, false);
                return yield this.repository.create(data);
            }
            catch (error) {
                if (error instanceof DashboardValidationError) {
                    throw error;
                }
                throw new Error('Failed to create dashboard');
            }
        });
    }
    getAllDashboards() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.findAll();
            }
            catch (error) {
                throw new Error('Failed to fetch all dashboards');
            }
        });
    }
    getDashboardById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.findById(id);
            }
            catch (error) {
                throw new Error('Failed to fetch dashboard');
            }
        });
    }
    updateDashboard(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validate the update data
                this.validateDashboard(data, true);
                // Create a clean update object with only the fields we want to update
                const updateData = {};
                if (typeof data.altitude === 'number')
                    updateData.altitude = data.altitude;
                if (typeof data.his === 'number')
                    updateData.his = data.his;
                if (typeof data.adi === 'number')
                    updateData.adi = data.adi;
                // Perform the update
                const updated = yield this.repository.update(id, updateData);
                if (!updated) {
                    throw new Error('Dashboard not found');
                }
                return updated;
            }
            catch (error) {
                if (error instanceof DashboardValidationError) {
                    throw error;
                }
                throw new Error('Failed to update dashboard');
            }
        });
    }
    deleteDashboard(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.delete(id);
            }
            catch (error) {
                throw new Error('Failed to delete dashboard');
            }
        });
    }
    deleteAllDashboards() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.deleteAll();
            }
            catch (error) {
                throw new Error('Failed to delete all dashboards');
            }
        });
    }
}
exports.DashboardService = DashboardService;
