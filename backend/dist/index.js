"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const DashboardRepository_1 = require("./repositories/DashboardRepository");
const DashboardService_1 = require("./services/DashboardService");
const DashboardController_1 = require("./controllers/DashboardController");
const DashboardRoutes_1 = require("./routes/DashboardRoutes");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use((0, cors_1.default)({
    origin: '*'
}));
app.use(express_1.default.json());
const repository = new DashboardRepository_1.DashboardRepository();
const service = new DashboardService_1.DashboardService(repository);
const controller = new DashboardController_1.DashboardController(service);
app.use('/api/dashboard', (0, DashboardRoutes_1.createDashboardRoutes)(controller));
mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dashboard')
    .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
    .catch((error) => {
    console.error('MongoDB connection error:', error);
});
