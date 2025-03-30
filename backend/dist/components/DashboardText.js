"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const Container = styled_components_1.default.div `
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;
const ValueDisplay = styled_components_1.default.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;
const Label = styled_components_1.default.span `
  font-weight: bold;
  color: #333;
`;
const Value = styled_components_1.default.span `
  color: #0066cc;
  font-family: monospace;
`;
const DashboardText = ({ altitude, his, adi }) => {
    return (react_1.default.createElement(Container, null,
        react_1.default.createElement(ValueDisplay, null,
            react_1.default.createElement(Label, null, "Altitude:"),
            react_1.default.createElement(Value, null,
                altitude.toFixed(2),
                " meters")),
        react_1.default.createElement(ValueDisplay, null,
            react_1.default.createElement(Label, null, "HIS:"),
            react_1.default.createElement(Value, null,
                his.toFixed(2),
                "\u00B0")),
        react_1.default.createElement(ValueDisplay, null,
            react_1.default.createElement(Label, null, "ADI:"),
            react_1.default.createElement(Value, null,
                adi.toFixed(2),
                "%"))));
};
exports.default = DashboardText;
