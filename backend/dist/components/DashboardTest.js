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
const Dashboard_1 = __importDefault(require("./Dashboard"));
const Container = styled_components_1.default.div `
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;
const Controls = styled_components_1.default.div `
  margin: 20px 0;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
`;
const SliderGroup = styled_components_1.default.div `
  margin: 15px 0;
`;
const Label = styled_components_1.default.div `
  margin-bottom: 5px;
  font-weight: bold;
`;
const Slider = styled_components_1.default.input `
  width: 100%;
  margin: 10px 0;
`;
const Value = styled_components_1.default.span `
  margin-left: 10px;
  color: #666;
`;
const DashboardTest = () => {
    const [values, setValues] = (0, react_1.useState)({
        altitude: 1500,
        his: 180,
        adi: 0
    });
    const handleChange = (name) => (event) => {
        setValues(prev => (Object.assign(Object.assign({}, prev), { [name]: Number(event.target.value) })));
    };
    const handleAdd = () => {
        // You can implement any logic needed when the add button is clicked
        console.log('Add button clicked');
    };
    return (react_1.default.createElement(Container, null,
        react_1.default.createElement("h1", null, "\u05D1\u05D3\u05D9\u05E7\u05EA Dashboard"),
        react_1.default.createElement(Controls, null,
            react_1.default.createElement(SliderGroup, null,
                react_1.default.createElement(Label, null, "Altitude (0-3000)"),
                react_1.default.createElement(Slider, { type: "range", min: "0", max: "3000", value: values.altitude, onChange: handleChange('altitude') }),
                react_1.default.createElement(Value, null,
                    values.altitude,
                    " ft")),
            react_1.default.createElement(SliderGroup, null,
                react_1.default.createElement(Label, null, "HIS (0-360)"),
                react_1.default.createElement(Slider, { type: "range", min: "0", max: "360", value: values.his, onChange: handleChange('his') }),
                react_1.default.createElement(Value, null,
                    values.his,
                    "\u00B0")),
            react_1.default.createElement(SliderGroup, null,
                react_1.default.createElement(Label, null, "ADI (-100 to 100)"),
                react_1.default.createElement(Slider, { type: "range", min: "-100", max: "100", value: values.adi, onChange: handleChange('adi') }),
                react_1.default.createElement(Value, null,
                    values.adi,
                    "%"))),
        react_1.default.createElement(Dashboard_1.default, Object.assign({}, values, { onAdd: handleAdd }))));
};
exports.default = DashboardTest;
