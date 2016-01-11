'use strict';

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'bluebird', 'superagent', 'superagent-retry'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('bluebird'), require('superagent'), require('superagent-retry'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.bluebird, global.superagent, global.superagentRetry);
    global.index = mod.exports;
  }
})(this, function (exports, _bluebird, _superagent, _superagentRetry) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.get = get;
  exports.post = post;
  exports.put = put;
  exports.patch = patch;
  exports.del = del;
  exports.multipart = multipart;

  var _bluebird2 = _interopRequireDefault(_bluebird);

  var _superagent2 = _interopRequireDefault(_superagent);

  var _superagentRetry2 = _interopRequireDefault(_superagentRetry);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  _bluebird2.default.config({
    cancellation: true
  });

  (0, _superagentRetry2.default)(_superagent2.default);

  function get(url) {
    var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var _ref$headers = _ref.headers;
    var headers = _ref$headers === undefined ? {} : _ref$headers;
    var _ref$query = _ref.query;
    var query = _ref$query === undefined ? {} : _ref$query;
    var _ref$progress = _ref.progress;
    var progress = _ref$progress === undefined ? function () {} : _ref$progress;
    var _ref$retries = _ref.retries;
    var retries = _ref$retries === undefined ? 0 : _ref$retries;
    return new _bluebird2.default(function (res, rej, onCancel) {
      var req = _superagent2.default.get(url).on('progress', progress).set(headers).query(query).retry(retries).end(function (err, response) {
        if (err) rej(err);else res(response);
      });

      onCancel(req.abort);
    });
  }

  function post(url) {
    var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var _ref2 = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    var _ref2$headers = _ref2.headers;
    var headers = _ref2$headers === undefined ? {} : _ref2$headers;
    var _ref2$query = _ref2.query;
    var query = _ref2$query === undefined ? {} : _ref2$query;
    var _ref2$progress = _ref2.progress;
    var progress = _ref2$progress === undefined ? function () {} : _ref2$progress;
    var _ref2$retries = _ref2.retries;
    var retries = _ref2$retries === undefined ? 0 : _ref2$retries;
    return new _bluebird2.default(function (res, rej, onCancel) {
      var req = _superagent2.default.post(url).on('progress', progress).set(headers).query(query).send(data).retry(retries).end(function (err, response) {
        if (err) rej(err);else res(response);
      });

      onCancel(req.abort);
    });
  }

  function put(url) {
    var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var _ref3 = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    var _ref3$headers = _ref3.headers;
    var headers = _ref3$headers === undefined ? {} : _ref3$headers;
    var _ref3$query = _ref3.query;
    var query = _ref3$query === undefined ? {} : _ref3$query;
    var _ref3$progress = _ref3.progress;
    var progress = _ref3$progress === undefined ? function () {} : _ref3$progress;
    var _ref3$retries = _ref3.retries;
    var retries = _ref3$retries === undefined ? 0 : _ref3$retries;
    return new _bluebird2.default(function (res, rej, onCancel) {
      var req = _superagent2.default.put(url).on('progress', progress).set(headers).query(query).send(data).retry(retries).end(function (err, response) {
        if (err) rej(err);else res(response);
      });

      onCancel(req.abort);
    });
  }

  function patch(url) {
    var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var _ref4 = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    var _ref4$headers = _ref4.headers;
    var headers = _ref4$headers === undefined ? {} : _ref4$headers;
    var _ref4$query = _ref4.query;
    var query = _ref4$query === undefined ? {} : _ref4$query;
    var _ref4$progress = _ref4.progress;
    var progress = _ref4$progress === undefined ? function () {} : _ref4$progress;
    var _ref4$retries = _ref4.retries;
    var retries = _ref4$retries === undefined ? 0 : _ref4$retries;
    return new _bluebird2.default(function (res, rej, onCancel) {
      var req = _superagent2.default.patch(url).on('progress', progress).set(headers).query(query).send(data).retry(retries).end(function (err, response) {
        if (err) rej(err);else res(response);
      });

      onCancel(req.abort);
    });
  }

  function del(url) {
    var _ref5 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var _ref5$headers = _ref5.headers;
    var headers = _ref5$headers === undefined ? {} : _ref5$headers;
    var _ref5$query = _ref5.query;
    var query = _ref5$query === undefined ? {} : _ref5$query;
    var _ref5$progress = _ref5.progress;
    var progress = _ref5$progress === undefined ? function () {} : _ref5$progress;
    var _ref5$retries = _ref5.retries;
    var retries = _ref5$retries === undefined ? 0 : _ref5$retries;
    return new _bluebird2.default(function (res, rej, onCancel) {
      var req = _superagent2.default.delete(url).on('progress', progress).set(headers).query(query).retry(retries).end(function (err, response) {
        if (err) rej(err);else res(response);
      });

      onCancel(req.abort);
    });
  }

  function multipart(url) {
    var _ref6 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var _ref6$attachments = _ref6.attachments;
    var attachments = _ref6$attachments === undefined ? [] : _ref6$attachments;
    var _ref6$fields = _ref6.fields;
    var fields = _ref6$fields === undefined ? [] : _ref6$fields;

    var _ref7 = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    var _ref7$headers = _ref7.headers;
    var headers = _ref7$headers === undefined ? {} : _ref7$headers;
    var _ref7$query = _ref7.query;
    var query = _ref7$query === undefined ? {} : _ref7$query;
    var _ref7$progress = _ref7.progress;
    var progress = _ref7$progress === undefined ? function () {} : _ref7$progress;
    var _ref7$retries = _ref7.retries;
    var retries = _ref7$retries === undefined ? 0 : _ref7$retries;
    return new _bluebird2.default(function (res, rej, onCancel) {
      var req = _superagent2.default.post(url).on('progress', progress).set(headers).query(query).retry(retries);

      attachments.forEach(function (attachment) {
        return req.attach.apply(req, _toConsumableArray(attachment));
      });
      fields.forEach(function (field) {
        return req.field.apply(req, _toConsumableArray(field));
      });
      req.end(function (err, response) {
        if (err) rej(err);else res(response);
      });
      onCancel(req.abort);
    });
  }
});