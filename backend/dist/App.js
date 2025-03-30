"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const Dashboard_1 = __importDefault(require("./components/Dashboard"));
const AppContainer = styled_components_1.default.div `
  min-height: 100vh;
  padding: 20px;
  background-color: #f5f5f5;
`;
const Title = styled_components_1.default.h1 `
  text-align: center;
  color: #333;
  margin-bottom: 30px;
`;
function App() {
    const [dashboards, setDashboards] = (0, react_1.useState)([
        {
            id: 1,
            altitude: 1500,
            his: 180,
            adi: 50
        }
    ]);
    const handleAddDashboard = () => {
        setDashboards([
            ...dashboards,
            {
                id: dashboards.length + 1,
                altitude: 0,
                his: 0,
                adi: 0
            }
        ]);
    };
    return (react_1.default.createElement(AppContainer, null,
        react_1.default.createElement(Title, null, "Dashboard Application"),
        dashboards.map(dashboard => (react_1.default.createElement(Dashboard_1.default, { key: dashboard.id, altitude: dashboard.altitude, his: dashboard.his, adi: dashboard.adi, onAdd: handleAddDashboard })))));
}
exports.default = App;
