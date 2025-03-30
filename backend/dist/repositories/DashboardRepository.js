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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardRepository = void 0;
const Dashboard_1 = require("../models/Dashboard");
const mongoose_1 = __importDefault(require("mongoose"));
class DashboardRepository {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Dashboard_1.Dashboard.create(data);
            }
            catch (error) {
                if (error instanceof mongoose_1.default.Error.ValidationError) {
                    throw new Error('Invalid dashboard data');
                }
                throw error;
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Dashboard_1.Dashboard.find();
            }
            catch (error) {
                throw new Error('Failed to fetch dashboards');
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                    return null;
                }
                return yield Dashboard_1.Dashboard.findById(id);
            }
            catch (error) {
                throw new Error('Failed to fetch dashboard');
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                    return null;
                }
                return yield Dashboard_1.Dashboard.findByIdAndUpdate(id, { $set: data }, {
                    new: true,
                    runValidators: true,
                    upsert: false
                });
            }
            catch (error) {
                if (error instanceof mongoose_1.default.Error.ValidationError) {
                    throw new Error('Invalid dashboard data');
                }
                throw new Error('Failed to update dashboard');
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                    return false;
                }
                const result = yield Dashboard_1.Dashboard.findByIdAndDelete(id);
                return result !== null;
            }
            catch (error) {
                throw new Error('Failed to delete dashboard');
            }
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Dashboard_1.Dashboard.deleteMany({});
                return result.deletedCount > 0;
            }
            catch (error) {
                throw new Error('Failed to delete all dashboards');
            }
        });
    }
}
exports.DashboardRepository = DashboardRepository;
