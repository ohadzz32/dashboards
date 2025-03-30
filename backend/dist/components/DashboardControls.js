"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const Container = styled_components_1.default.div `
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 10px;
`;
const Button = styled_components_1.default.button `
  padding: 8px 16px;
  border: 2px solid #0066cc;
  border-radius: 4px;
  background-color: ${props => props.active ? '#0066cc' : 'white'};
  color: ${props => props.active ? 'white' : '#0066cc'};
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    background-color: #0066cc;
    color: white;
  }
`;
const AddButton = (0, styled_components_1.default)(Button) `
  background-color: #4CAF50;
  border-color: #4CAF50;
  color: white;

  &:hover {
    background-color: #45a049;
    border-color: #45a049;
  }
`;
const DashboardControls = ({ displayMode, onModeChange, onAdd }) => {
    return (react_1.default.createElement(Container, null,
        react_1.default.createElement(Button, { active: displayMode === 'text', onClick: () => onModeChange('text') }, "TEXT"),
        react_1.default.createElement(Button, { active: displayMode === 'visual', onClick: () => onModeChange('visual') }, "VISUAL"),
        react_1.default.createElement(AddButton, { onClick: onAdd }, "+")));
};
exports.default = DashboardControls;
