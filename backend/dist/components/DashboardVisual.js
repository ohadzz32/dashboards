"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const Container = styled_components_1.default.div `
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;
// מד גובה
const AltitudeGauge = styled_components_1.default.div `
  width: 60px;
  height: 200px;
  border: 2px solid #333;
  position: relative;
  margin: 20px;
`;
const AltitudeScale = styled_components_1.default.div `
  position: absolute;
  right: -40px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const ScaleNumber = styled_components_1.default.span `
  font-size: 12px;
  color: #333;
`;
const AltitudeIndicator = styled_components_1.default.div `
  width: 100%;
  height: ${(props) => props.height}%;
  background: blue;
  position: absolute;
  bottom: 0;
  transition: height 0.3s ease;
`;
// מצפן
const CompassGauge = styled_components_1.default.div `
  width: 150px;
  height: 150px;
  border: 2px solid #333;
  border-radius: 50%;
  position: relative;
  margin: 20px;
`;
const CompassArrow = styled_components_1.default.div `
  width: 4px;
  height: 70px;
  background: blue;
  position: absolute;
  left: 50%;
  bottom: 50%;
  transform-origin: bottom center;
  transform: translateX(-50%) rotate(${(props) => props.rotation}deg);
  transition: transform 0.3s ease;
`;
const FixedArrow = styled_components_1.default.div `
  width: 4px;
  height: 40px;
  background-color: black;
  position: absolute;
  left: 50%;
  top: 5px;
  transform: translateX(-50%);
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 15px solid black;
  }
`;
const CenterDot = styled_components_1.default.div `
  width: 8px;
  height: 8px;
  background: #333;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
const CompassNumber = styled_components_1.default.span `
  position: absolute;
  left: 50%;
  top: 10px;
  transform-origin: center 65px;
  transform: translateX(-50%) rotate(${(props) => props.rotation}deg);
  font-size: 12px;
  color: #333;
`;
// מד ADI
const ADIGauge = styled_components_1.default.div `
  width: 150px;
  height: 150px;
  border: 2px solid #333;
  border-radius: 50%;
  position: relative;
  margin: 20px;
  overflow: hidden;
`;
const ADIIndicator = styled_components_1.default.div `
  width: 100%;
  height: 100%;
  background: ${(props) => props.percentage && props.percentage >= 0 ? '#0066cc' : '#4CAF50'};
  opacity: ${(props) => props.percentage ? Math.abs(props.percentage) / 100 : 0};
  transition: all 0.3s ease;
`;
const DashboardVisual = ({ altitude, his, adi }) => {
    // נרמול הערכים עם וידוא טווחים
    const normalizedAltitude = Math.min(Math.max((altitude / 3000) * 100, 0), 100);
    const normalizedHIS = ((his % 360) + 360) % 360;
    const normalizedADI = Math.min(Math.max(adi, -100), 100);
    return (react_1.default.createElement(Container, null,
        react_1.default.createElement(AltitudeGauge, null,
            react_1.default.createElement(AltitudeScale, null,
                react_1.default.createElement(ScaleNumber, null, "3000"),
                react_1.default.createElement(ScaleNumber, null, "2000"),
                react_1.default.createElement(ScaleNumber, null, "1000"),
                react_1.default.createElement(ScaleNumber, null, "0")),
            react_1.default.createElement(AltitudeIndicator, { height: normalizedAltitude })),
        react_1.default.createElement(CompassGauge, null,
            react_1.default.createElement(CompassNumber, { rotation: 0 }, "0"),
            react_1.default.createElement(CompassNumber, { rotation: 90 }, "90"),
            react_1.default.createElement(CompassNumber, { rotation: 180 }, "180"),
            react_1.default.createElement(CompassNumber, { rotation: 270 }, "270"),
            react_1.default.createElement(FixedArrow, null),
            react_1.default.createElement(CompassArrow, { rotation: normalizedHIS }),
            react_1.default.createElement(CenterDot, null)),
        react_1.default.createElement(ADIGauge, null,
            react_1.default.createElement(ADIIndicator, { percentage: normalizedADI }))));
};
exports.default = DashboardVisual;
