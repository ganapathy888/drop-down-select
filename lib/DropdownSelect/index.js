'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AsyncDropdownSelect = undefined;

var _SimpleSelect = require('./SimpleSelect');

var _SimpleSelect2 = _interopRequireDefault(_SimpleSelect);

var _AsyncSelect = require('./AsyncSelect');

var _AsyncSelect2 = _interopRequireDefault(_AsyncSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AsyncDropdownSelect = _AsyncSelect2.default;

exports.default = _SimpleSelect2.default;
exports.AsyncDropdownSelect = AsyncDropdownSelect;