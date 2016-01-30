(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', './get', './post', './put', './patch', './delete', './multipart'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, require('./get'), require('./post'), require('./put'), require('./patch'), require('./delete'), require('./multipart'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, global.get, global.post, global.put, global.patch, global._delete, global.multipart);
    global.index = mod.exports;
  }
})(this, function (module, _get, _post, _put, _patch, _delete, _multipart) {
  'use strict';

  var _get2 = _interopRequireDefault(_get);

  var _post2 = _interopRequireDefault(_post);

  var _put2 = _interopRequireDefault(_put);

  var _patch2 = _interopRequireDefault(_patch);

  var _delete2 = _interopRequireDefault(_delete);

  var _multipart2 = _interopRequireDefault(_multipart);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function createHighwire() {
    return {
      get: _get2.default,
      post: _post2.default,
      put: _put2.default,
      patch: _patch2.default,
      del: _delete2.default,
      multipart: _multipart2.default
    };
  }

  module.exports = createHighwire;
});