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
const DashboardVisual_1 = __importDefault(require("./DashboardVisual"));
const DashboardText_1 = __importDefault(require("./DashboardText"));
const DashboardControls_1 = __importDefault(require("./DashboardControls"));
const Container = styled_components_1.default.div `
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;
`;
const Dashboard = ({ altitude, his, adi, onAdd }) => {
    const [displayMode, setDisplayMode] = (0, react_1.useState)('visual');
    return (react_1.default.createElement(Container, null,
        displayMode === 'visual' ? (react_1.default.createElement(DashboardVisual_1.default, { altitude: altitude, his: his, adi: adi })) : (react_1.default.createElement(DashboardText_1.default, { altitude: altitude, his: his, adi: adi })),
        react_1.default.createElement(DashboardControls_1.default, { displayMode: displayMode, onModeChange: setDisplayMode, onAdd: onAdd })));
};
exports.default = Dashboard;
