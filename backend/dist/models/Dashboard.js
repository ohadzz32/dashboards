"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dashboard = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const DashboardSchema = new mongoose_1.default.Schema({
    altitude: {
        type: Number,
        required: true,
        min: 0,
        max: 3000,
        validate: {
            validator: Number.isInteger,
            message: 'Altitude must be an integer'
        }
    },
    his: {
        type: Number,
        required: true,
        min: 0,
        max: 360,
        validate: {
            validator: Number.isInteger,
            message: 'HIS must be an integer'
        }
    },
    adi: {
        type: Number,
        required: true,
        min: -100,
        max: 100,
        validate: {
            validator: Number.isInteger,
            message: 'ADI must be an integer'
        }
    }
});
exports.Dashboard = mongoose_1.default.model('Dashboard', DashboardSchema);
