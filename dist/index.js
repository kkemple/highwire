'use strict';

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'lodash.assign', './http-methods'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, require('lodash.assign'), require('./http-methods'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, global.lodash, global.httpMethods);
    global.index = mod.exports;
  }
})(this, function (module, _lodash, _httpMethods) {
  var _lodash2 = _interopRequireDefault(_lodash);

  var httpMethods = _interopRequireWildcard(_httpMethods);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function createHighwire() {
    return (0, _lodash2.default)({}, httpMethods);
  }

  module.exports = createHighwire;
});