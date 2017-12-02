"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Count Badge
var CountBadge = function CountBadge(props) {
  return _react2.default.createElement(
    "div",
    { className: "count-badge" },
    props.selectCount
  );
};

// Export
// Vendor Imports
exports.default = CountBadge;