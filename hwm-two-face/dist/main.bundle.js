/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/runtime/helpers/arrayLikeToArray.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/arrayWithHoles.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray */ "./node_modules/@babel/runtime/helpers/arrayLikeToArray.js");

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

module.exports = _arrayWithoutHoles;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/asyncToGenerator.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/defineProperty.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/iterableToArray.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArray.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

module.exports = _iterableToArray;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

module.exports = _iterableToArrayLimit;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/nonIterableRest.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableRest;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/nonIterableSpread.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableSpread.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableSpread;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/slicedToArray.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles */ "./node_modules/@babel/runtime/helpers/arrayWithHoles.js");

var iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit */ "./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js");

var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray */ "./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js");

var nonIterableRest = __webpack_require__(/*! ./nonIterableRest */ "./node_modules/@babel/runtime/helpers/nonIterableRest.js");

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/toConsumableArray.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toConsumableArray.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(/*! ./arrayWithoutHoles */ "./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js");

var iterableToArray = __webpack_require__(/*! ./iterableToArray */ "./node_modules/@babel/runtime/helpers/iterableToArray.js");

var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray */ "./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js");

var nonIterableSpread = __webpack_require__(/*! ./nonIterableSpread */ "./node_modules/@babel/runtime/helpers/nonIterableSpread.js");

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray */ "./node_modules/@babel/runtime/helpers/arrayLikeToArray.js");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray;

/***/ }),

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime.js");


/***/ }),

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    if (
      (utils.isBlob(requestData) || utils.isFile(requestData)) &&
      requestData.type
    ) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = unescape(encodeURIComponent(config.auth.password)) || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = [
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
  ];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys)
    .concat(directMergeKeys);

  var otherKeys = Object
    .keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, mergeDeepProperties);

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : undefined
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ }),

/***/ "./src/charactersFilm/PhotoChar.js":
/*!*****************************************!*\
  !*** ./src/charactersFilm/PhotoChar.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var photoCharacters = {
  "https://swapi.dev/api/people/9/": "./img/Biggs_Darklighter.png",
  "https://swapi.dev/api/people/1/": "./img/luke-skywalker.png",
  "https://swapi.dev/api/people/4/": "./img/dark_waider.png",
  "https://swapi.dev/api/people/3/": "./img/r2-d2.png",
  "https://swapi.dev/api/people/8/": "./img/r5-d4.jpg",
  "https://swapi.dev/api/people/2/": "./img/c-3po.png",
  "https://swapi.dev/api/people/13/": "./img/chewbacca.png",
  "https://swapi.dev/api/people/15/": "./img/greedo.jpg",
  "https://swapi.dev/api/people/19/": "./img/Jek_Tono_Porkins.png",
  "https://swapi.dev/api/people/5/": "./img/leila organa.png",
  "https://swapi.dev/api/people/12/": "./img/Tarkin-SWE.png",
  "https://swapi.dev/api/people/7/": "./img/Beru_Lars.jfif",
  "https://swapi.dev/api/people/14/": "./img/Han-Solo.png",
  "https://swapi.dev/api/people/16/": "./img/jabba-the-hutt-boba-fett-yoda.jpeg",
  "https://swapi.dev/api/people/6/": "./img/owen-lars.png",
  "https://swapi.dev/api/people/81/": "./img/RaymusAntilles.jpg",
  "https://swapi.dev/api/people/10/": "./img/wan-kenobi.png",
  "https://swapi.dev/api/people/18/": "./img/Wedge_Antilles.png",
  "https://swapi.dev/api/people/24/": "./img/bossk.png",
  "https://swapi.dev/api/people/26/": "./img/Character-Lobot.png",
  "https://swapi.dev/api/people/23/": "./img/ij-88-jabbapng.png",
  "https://swapi.dev/api/people/25/": "./img/lando-calrissian.jpg",
  "https://swapi.dev/api/people/21/": "./img/palpatine.png",
  "https://swapi.dev/api/people/20/": "./img/yoda.png",
  "https://swapi.dev/api/people/22/": "./img/boba-fett.png",
  "https://swapi.dev/api/people/55/": "./img/Adi Gallia.png",
  "https://swapi.dev/api/people/29/": "./img/ArvelCrynyd.png",
  "https://swapi.dev/api/people/46/": "./img/Ayla-Secura.png",
  "https://swapi.dev/api/people/45/": "./img/bib_fortuna.png",
  "https://swapi.dev/api/people/27/": "./img/ackbar.jpg",
  "https://swapi.dev/api/people/67/": "./img/dooku.png",
  "https://swapi.dev/api/people/54/": "./img/Eeth_Koth.png",
  "https://swapi.dev/api/people/79/": "./img/general-grievous.png",
  "https://swapi.dev/api/people/52/": "./img/Ki-Adi-Mundi.png",
  "https://swapi.dev/api/people/53/": "./img/Kit_Fisto.jfif",
  "https://swapi.dev/api/people/64/": "./img/Luminara-Unduli.png",
  "https://swapi.dev/api/people/51/": "./img/mace-windu.png",
  "https://swapi.dev/api/people/28/": "./img/Mon_Mothma.png",
  "https://swapi.dev/api/people/31/": "./img/nien-nunb.png",
  "https://swapi.dev/api/people/33/": "./img/Nute-Gunray.png",
  "https://swapi.dev/api/people/35/": "./img/Padmé-Amidala.png",
  "https://swapi.dev/api/people/58/": "./img/Plo-Koont.png",
  "https://swapi.dev/api/people/63/": "./img/Pogglethelesser_detail.png",
  "https://swapi.dev/api/people/75/": "./img/R4-P17-75006.png",
  "https://swapi.dev/api/people/78/": "./img/Shaakti_detail.png",
  "https://swapi.dev/api/people/82/": "./img/Sly-Moore.png",
  "https://swapi.dev/api/people/80/": "./img/tarfful_detail.png",
  "https://swapi.dev/api/people/83/": "./img/Tion_Medon.webp",
  "https://swapi.dev/api/people/11/": "./img/Anakin-Skywalker.png",
  "https://swapi.dev/api/people/68/": "./img/Bail_Organa.png",
  "https://swapi.dev/api/people/65/": "./img/Barriss-Offee.png",
  "https://swapi.dev/api/people/62/": "./img/cliegglars_detail.png",
  "https://swapi.dev/api/people/61/": "./img/Cordé.jpg",
  "https://swapi.dev/api/people/71/": "./img/dexterjettster_detail.png",
  "https://swapi.dev/api/people/66/": "./img/Dormé.jpg",
  "https://swapi.dev/api/people/60/": "./img/Gregar-Typho.png",
  "https://swapi.dev/api/people/69/": "./img/Jango Fett.png",
  "https://swapi.dev/api/people/36/": "./img/Jar-Jar-Binks.png",
  "https://swapi.dev/api/people/74/": "./img/Jocasta-Nu.png",
  "https://swapi.dev/api/people/72/": "./img/Lama_su.png",
  "https://swapi.dev/api/people/56/": "./img/Saesee-Tiin.png",
  "https://swapi.dev/api/people/77/": "./img/San_Hill.png",
  "https://swapi.dev/api/people/43/": "./img/Shmi-Skywalker.png",
  "https://swapi.dev/api/people/73/": "./img/Taun-We.png",
  "https://swapi.dev/api/people/76/": "./img/Wat_Tambor.png",
  "https://swapi.dev/api/people/40/": "./img/Watto.png",
  "https://swapi.dev/api/people/70/": "./img/Zam_Wesell.png",
  "https://swapi.dev/api/people/59/": "./img/Mas_Amedda.png",
  "https://swapi.dev/api/people/50/": "./img/BenQuadinarosHS-SWE.png",
  "https://swapi.dev/api/people/44/": "./img/Darth-Maul.png",
  "https://swapi.dev/api/people/48/": "./img/Dud_Bolt.jpg",
  "https://swapi.dev/api/people/49/": "./img/Gasganp.jpg",
  "https://swapi.dev/api/people/42/": "./img/Quarsh-Panaka.jpg",
  "https://swapi.dev/api/people/32/": "./img/Qui-Gon-Jinn.png",
  "https://swapi.dev/api/people/47/": "./img/RattsHS.jpg",
  "https://swapi.dev/api/people/39/": "./img/Ric_Olie.jpg",
  "https://swapi.dev/api/people/37/": "./img/Roos-Tarpals.png",
  "https://swapi.dev/api/people/38/": "./img/RugorNass-SWCT.png",
  "https://swapi.dev/api/people/41/": "./img/Sebulba.png",
  "https://swapi.dev/api/people/34/": "./img/Valorum-SWE.png",
  "https://swapi.dev/api/people/30/": "./img/wicket_w_warwick.png",
  "https://swapi.dev/api/people/57/": "./img/Yarael-Poof.png"
};
/* harmony default export */ __webpack_exports__["default"] = (photoCharacters);

/***/ }),

/***/ "./src/charactersFilm/characters.css":
/*!*******************************************!*\
  !*** ./src/charactersFilm/characters.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/charactersFilm/characters.js":
/*!******************************************!*\
  !*** ./src/charactersFilm/characters.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

var BASE = "https://swapi.dev/api/";

function getInfo(numPage, info) {
  var request = axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(BASE + info + numPage);
  return request.then(function (res) {
    return res.data.results;
  })["catch"](function (err) {
    if (!request) {
      console.log("something wrong", err);
    }

    return [];
  });
}

/* harmony default export */ __webpack_exports__["default"] = ({
  getInfo: getInfo
});

/***/ }),

/***/ "./src/charactersFilm/controller.js":
/*!******************************************!*\
  !*** ./src/charactersFilm/controller.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _characters__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./characters */ "./src/charactersFilm/characters.js");
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view */ "./src/charactersFilm/view.js");
/* harmony import */ var _characters_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./characters.css */ "./src/charactersFilm/characters.css");
/* harmony import */ var _characters_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_characters_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _img_maxresdefault_jpg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./img/maxresdefault.jpg */ "./src/charactersFilm/img/maxresdefault.jpg");




var people = "people/?page=";
var btnInfo = document.getElementById("btn");
/* harmony default export */ __webpack_exports__["default"] = (function () {
  btnInfo.addEventListener("click", function () {
    var peopleId = document.getElementById("filmId").value;
    if (peopleId < 1 || peopleId > 9) return;
    _characters__WEBPACK_IMPORTED_MODULE_0__["default"].getInfo(peopleId, people).then(_view__WEBPACK_IMPORTED_MODULE_1__["default"]);
  });
});

/***/ }),

/***/ "./src/charactersFilm/img/Adi Gallia.png":
/*!***********************************************!*\
  !*** ./src/charactersFilm/img/Adi Gallia.png ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/Adi Gallia.png");

/***/ }),

/***/ "./src/charactersFilm/img/Anakin-Skywalker.png":
/*!*****************************************************!*\
  !*** ./src/charactersFilm/img/Anakin-Skywalker.png ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/Anakin-Skywalker.png");

/***/ }),

/***/ "./src/charactersFilm/img/ArvelCrynyd.png":
/*!************************************************!*\
  !*** ./src/charactersFilm/img/ArvelCrynyd.png ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/ArvelCrynyd.png");

/***/ }),

/***/ "./src/charactersFilm/img/Ayla-Secura.png":
/*!************************************************!*\
  !*** ./src/charactersFilm/img/Ayla-Secura.png ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/Ayla-Secura.png");

/***/ }),

/***/ "./src/charactersFilm/img/Bail_Organa.png":
/*!************************************************!*\
  !*** ./src/charactersFilm/img/Bail_Organa.png ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/Bail_Organa.png");

/***/ }),

/***/ "./src/charactersFilm/img/Barriss-Offee.png":
/*!**************************************************!*\
  !*** ./src/charactersFilm/img/Barriss-Offee.png ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/Barriss-Offee.png");

/***/ }),

/***/ "./src/charactersFilm/img/BenQuadinarosHS-SWE.png":
/*!********************************************************!*\
  !*** ./src/charactersFilm/img/BenQuadinarosHS-SWE.png ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/BenQuadinarosHS-SWE.png");

/***/ }),

/***/ "./src/charactersFilm/img/Beru_Lars.jfif":
/*!***********************************************!*\
  !*** ./src/charactersFilm/img/Beru_Lars.jfif ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/Beru_Lars.jfif");

/***/ }),

/***/ "./src/charactersFilm/img/Biggs_Darklighter.png":
/*!******************************************************!*\
  !*** ./src/charactersFilm/img/Biggs_Darklighter.png ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/Biggs_Darklighter.png");

/***/ }),

/***/ "./src/charactersFilm/img/Character-Lobot.png":
/*!****************************************************!*\
  !*** ./src/charactersFilm/img/Character-Lobot.png ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/Character-Lobot.png");

/***/ }),

/***/ "./src/charactersFilm/img/Cordé.jpg":
/*!******************************************!*\
  !*** ./src/charactersFilm/img/Cordé.jpg ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/Cordé.jpg");

/***/ }),

/***/ "./src/charactersFilm/img/Darth-Maul.png":
/*!***********************************************!*\
  !*** ./src/charactersFilm/img/Darth-Maul.png ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/Darth-Maul.png");

/***/ }),

/***/ "./src/charactersFilm/img/Dormé.jpg":
/*!******************************************!*\
  !*** ./src/charactersFilm/img/Dormé.jpg ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/Dormé.jpg");

/***/ }),

/***/ "./src/charactersFilm/img/Dud_Bolt.jpg":
/*!*********************************************!*\
  !*** ./src/charactersFilm/img/Dud_Bolt.jpg ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/Dud_Bolt.jpg");

/***/ }),

/***/ "./src/charactersFilm/img/Eeth_Koth.png":
/*!**********************************************!*\
  !*** ./src/charactersFilm/img/Eeth_Koth.png ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/Eeth_Koth.png");

/***/ }),

/***/ "./src/charactersFilm/img/Gasganp.jpg":
/*!********************************************!*\
  !*** ./src/charactersFilm/img/Gasganp.jpg ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/Gasganp.jpg");

/***/ }),

/***/ "./src/charactersFilm/img/Gregar-Typho.png":
/*!*************************************************!*\
  !*** ./src/charactersFilm/img/Gregar-Typho.png ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/Gregar-Typho.png");

/***/ }),

/***/ "./src/charactersFilm/img/Han-Solo.png":
/*!*********************************************!*\
  !*** ./src/charactersFilm/img/Han-Solo.png ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/Han-Solo.png");

/***/ }),

/***/ "./src/charactersFilm/img/Jango Fett.png":
/*!***********************************************!*\
  !*** ./src/charactersFilm/img/Jango Fett.png ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/Jango Fett.png");

/***/ }),

/***/ "./src/charactersFilm/img/Jar-Jar-Binks.png":
/*!**************************************************!*\
  !*** ./src/charactersFilm/img/Jar-Jar-Binks.png ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/Jar-Jar-Binks.png");

/***/ }),

/***/ "./src/charactersFilm/img/Jek_Tono_Porkins.png":
/*!*****************************************************!*\
  !*** ./src/charactersFilm/img/Jek_Tono_Porkins.png ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/Jek_Tono_Porkins.png");

/***/ }),

/***/ "./src/charactersFilm/img/Jocasta-Nu.png":
/*!***********************************************!*\
  !*** ./src/charactersFilm/img/Jocasta-Nu.png ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/Jocasta-Nu.png");

/***/ }),

/***/ "./src/charactersFilm/img/Ki-Adi-Mundi.png":
/*!*************************************************!*\
  !*** ./src/charactersFilm/img/Ki-Adi-Mundi.png ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/Ki-Adi-Mundi.png");

/***/ }),

/***/ "./src/charactersFilm/img/Kit_Fisto.jfif":
/*!***********************************************!*\
  !*** ./src/charactersFilm/img/Kit_Fisto.jfif ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/Kit_Fisto.jfif");

/***/ }),

/***/ "./src/charactersFilm/img/Lama_su.png":
/*!********************************************!*\
  !*** ./src/charactersFilm/img/Lama_su.png ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/Lama_su.png");

/***/ }),

/***/ "./src/charactersFilm/img/Luminara-Unduli.png":
/*!****************************************************!*\
  !*** ./src/charactersFilm/img/Luminara-Unduli.png ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/Luminara-Unduli.png");

/***/ }),

/***/ "./src/charactersFilm/img/Mas_Amedda.png":
/*!***********************************************!*\
  !*** ./src/charactersFilm/img/Mas_Amedda.png ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/Mas_Amedda.png");

/***/ }),

/***/ "./src/charactersFilm/img/Mon_Mothma.png":
/*!***********************************************!*\
  !*** ./src/charactersFilm/img/Mon_Mothma.png ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/Mon_Mothma.png");

/***/ }),

/***/ "./src/charactersFilm/img/Nute-Gunray.png":
/*!************************************************!*\
  !*** ./src/charactersFilm/img/Nute-Gunray.png ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/Nute-Gunray.png");

/***/ }),

/***/ "./src/charactersFilm/img/Padmé-Amidala.png":
/*!**************************************************!*\
  !*** ./src/charactersFilm/img/Padmé-Amidala.png ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/Padmé-Amidala.png");

/***/ }),

/***/ "./src/charactersFilm/img/Plo-Koont.png":
/*!**********************************************!*\
  !*** ./src/charactersFilm/img/Plo-Koont.png ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/Plo-Koont.png");

/***/ }),

/***/ "./src/charactersFilm/img/Pogglethelesser_detail.png":
/*!***********************************************************!*\
  !*** ./src/charactersFilm/img/Pogglethelesser_detail.png ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/Pogglethelesser_detail.png");

/***/ }),

/***/ "./src/charactersFilm/img/Quarsh-Panaka.jpg":
/*!**************************************************!*\
  !*** ./src/charactersFilm/img/Quarsh-Panaka.jpg ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/Quarsh-Panaka.jpg");

/***/ }),

/***/ "./src/charactersFilm/img/Qui-Gon-Jinn.png":
/*!*************************************************!*\
  !*** ./src/charactersFilm/img/Qui-Gon-Jinn.png ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/Qui-Gon-Jinn.png");

/***/ }),

/***/ "./src/charactersFilm/img/R4-P17-75006.png":
/*!*************************************************!*\
  !*** ./src/charactersFilm/img/R4-P17-75006.png ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/R4-P17-75006.png");

/***/ }),

/***/ "./src/charactersFilm/img/RattsHS.jpg":
/*!********************************************!*\
  !*** ./src/charactersFilm/img/RattsHS.jpg ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/RattsHS.jpg");

/***/ }),

/***/ "./src/charactersFilm/img/RaymusAntilles.jpg":
/*!***************************************************!*\
  !*** ./src/charactersFilm/img/RaymusAntilles.jpg ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/RaymusAntilles.jpg");

/***/ }),

/***/ "./src/charactersFilm/img/Ric_Olie.jpg":
/*!*********************************************!*\
  !*** ./src/charactersFilm/img/Ric_Olie.jpg ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/Ric_Olie.jpg");

/***/ }),

/***/ "./src/charactersFilm/img/Roos-Tarpals.png":
/*!*************************************************!*\
  !*** ./src/charactersFilm/img/Roos-Tarpals.png ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/Roos-Tarpals.png");

/***/ }),

/***/ "./src/charactersFilm/img/RugorNass-SWCT.png":
/*!***************************************************!*\
  !*** ./src/charactersFilm/img/RugorNass-SWCT.png ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/RugorNass-SWCT.png");

/***/ }),

/***/ "./src/charactersFilm/img/Saesee-Tiin.png":
/*!************************************************!*\
  !*** ./src/charactersFilm/img/Saesee-Tiin.png ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/Saesee-Tiin.png");

/***/ }),

/***/ "./src/charactersFilm/img/San_Hill.png":
/*!*********************************************!*\
  !*** ./src/charactersFilm/img/San_Hill.png ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/San_Hill.png");

/***/ }),

/***/ "./src/charactersFilm/img/Sebulba.png":
/*!********************************************!*\
  !*** ./src/charactersFilm/img/Sebulba.png ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/Sebulba.png");

/***/ }),

/***/ "./src/charactersFilm/img/Shaakti_detail.png":
/*!***************************************************!*\
  !*** ./src/charactersFilm/img/Shaakti_detail.png ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/Shaakti_detail.png");

/***/ }),

/***/ "./src/charactersFilm/img/Shmi-Skywalker.png":
/*!***************************************************!*\
  !*** ./src/charactersFilm/img/Shmi-Skywalker.png ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/Shmi-Skywalker.png");

/***/ }),

/***/ "./src/charactersFilm/img/Sly-Moore.png":
/*!**********************************************!*\
  !*** ./src/charactersFilm/img/Sly-Moore.png ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/Sly-Moore.png");

/***/ }),

/***/ "./src/charactersFilm/img/Tarkin-SWE.png":
/*!***********************************************!*\
  !*** ./src/charactersFilm/img/Tarkin-SWE.png ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/Tarkin-SWE.png");

/***/ }),

/***/ "./src/charactersFilm/img/Taun-We.png":
/*!********************************************!*\
  !*** ./src/charactersFilm/img/Taun-We.png ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/Taun-We.png");

/***/ }),

/***/ "./src/charactersFilm/img/Tion_Medon.webp":
/*!************************************************!*\
  !*** ./src/charactersFilm/img/Tion_Medon.webp ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/Tion_Medon.webp");

/***/ }),

/***/ "./src/charactersFilm/img/Valorum-SWE.png":
/*!************************************************!*\
  !*** ./src/charactersFilm/img/Valorum-SWE.png ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/Valorum-SWE.png");

/***/ }),

/***/ "./src/charactersFilm/img/Wat_Tambor.png":
/*!***********************************************!*\
  !*** ./src/charactersFilm/img/Wat_Tambor.png ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/Wat_Tambor.png");

/***/ }),

/***/ "./src/charactersFilm/img/Watto.png":
/*!******************************************!*\
  !*** ./src/charactersFilm/img/Watto.png ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/Watto.png");

/***/ }),

/***/ "./src/charactersFilm/img/Wedge_Antilles.png":
/*!***************************************************!*\
  !*** ./src/charactersFilm/img/Wedge_Antilles.png ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/Wedge_Antilles.png");

/***/ }),

/***/ "./src/charactersFilm/img/Yarael-Poof.png":
/*!************************************************!*\
  !*** ./src/charactersFilm/img/Yarael-Poof.png ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/Yarael-Poof.png");

/***/ }),

/***/ "./src/charactersFilm/img/Zam_Wesell.png":
/*!***********************************************!*\
  !*** ./src/charactersFilm/img/Zam_Wesell.png ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/Zam_Wesell.png");

/***/ }),

/***/ "./src/charactersFilm/img/ackbar.jpg":
/*!*******************************************!*\
  !*** ./src/charactersFilm/img/ackbar.jpg ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/ackbar.jpg");

/***/ }),

/***/ "./src/charactersFilm/img/bib_fortuna.png":
/*!************************************************!*\
  !*** ./src/charactersFilm/img/bib_fortuna.png ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/bib_fortuna.png");

/***/ }),

/***/ "./src/charactersFilm/img/boba-fett.png":
/*!**********************************************!*\
  !*** ./src/charactersFilm/img/boba-fett.png ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/boba-fett.png");

/***/ }),

/***/ "./src/charactersFilm/img/bossk.png":
/*!******************************************!*\
  !*** ./src/charactersFilm/img/bossk.png ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/bossk.png");

/***/ }),

/***/ "./src/charactersFilm/img/c-3po.png":
/*!******************************************!*\
  !*** ./src/charactersFilm/img/c-3po.png ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/c-3po.png");

/***/ }),

/***/ "./src/charactersFilm/img/chewbacca.png":
/*!**********************************************!*\
  !*** ./src/charactersFilm/img/chewbacca.png ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/chewbacca.png");

/***/ }),

/***/ "./src/charactersFilm/img/cliegglars_detail.png":
/*!******************************************************!*\
  !*** ./src/charactersFilm/img/cliegglars_detail.png ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/cliegglars_detail.png");

/***/ }),

/***/ "./src/charactersFilm/img/dark_waider.png":
/*!************************************************!*\
  !*** ./src/charactersFilm/img/dark_waider.png ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/dark_waider.png");

/***/ }),

/***/ "./src/charactersFilm/img/dexterjettster_detail.png":
/*!**********************************************************!*\
  !*** ./src/charactersFilm/img/dexterjettster_detail.png ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/dexterjettster_detail.png");

/***/ }),

/***/ "./src/charactersFilm/img/dooku.png":
/*!******************************************!*\
  !*** ./src/charactersFilm/img/dooku.png ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/dooku.png");

/***/ }),

/***/ "./src/charactersFilm/img/general-grievous.png":
/*!*****************************************************!*\
  !*** ./src/charactersFilm/img/general-grievous.png ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/general-grievous.png");

/***/ }),

/***/ "./src/charactersFilm/img/greedo.jpg":
/*!*******************************************!*\
  !*** ./src/charactersFilm/img/greedo.jpg ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/greedo.jpg");

/***/ }),

/***/ "./src/charactersFilm/img/ij-88-jabbapng.png":
/*!***************************************************!*\
  !*** ./src/charactersFilm/img/ij-88-jabbapng.png ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/ij-88-jabbapng.png");

/***/ }),

/***/ "./src/charactersFilm/img/jabba-the-hutt-boba-fett-yoda.jpeg":
/*!*******************************************************************!*\
  !*** ./src/charactersFilm/img/jabba-the-hutt-boba-fett-yoda.jpeg ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/jabba-the-hutt-boba-fett-yoda.jpeg");

/***/ }),

/***/ "./src/charactersFilm/img/lando-calrissian.jpg":
/*!*****************************************************!*\
  !*** ./src/charactersFilm/img/lando-calrissian.jpg ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/lando-calrissian.jpg");

/***/ }),

/***/ "./src/charactersFilm/img/leila organa.png":
/*!*************************************************!*\
  !*** ./src/charactersFilm/img/leila organa.png ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/leila organa.png");

/***/ }),

/***/ "./src/charactersFilm/img/luke-skywalker.png":
/*!***************************************************!*\
  !*** ./src/charactersFilm/img/luke-skywalker.png ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/luke-skywalker.png");

/***/ }),

/***/ "./src/charactersFilm/img/mace-windu.png":
/*!***********************************************!*\
  !*** ./src/charactersFilm/img/mace-windu.png ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/mace-windu.png");

/***/ }),

/***/ "./src/charactersFilm/img/maxresdefault.jpg":
/*!**************************************************!*\
  !*** ./src/charactersFilm/img/maxresdefault.jpg ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/maxresdefault.jpg");

/***/ }),

/***/ "./src/charactersFilm/img/nien-nunb.png":
/*!**********************************************!*\
  !*** ./src/charactersFilm/img/nien-nunb.png ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/nien-nunb.png");

/***/ }),

/***/ "./src/charactersFilm/img/owen-lars.png":
/*!**********************************************!*\
  !*** ./src/charactersFilm/img/owen-lars.png ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/owen-lars.png");

/***/ }),

/***/ "./src/charactersFilm/img/palpatine.png":
/*!**********************************************!*\
  !*** ./src/charactersFilm/img/palpatine.png ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/palpatine.png");

/***/ }),

/***/ "./src/charactersFilm/img/r2-d2.png":
/*!******************************************!*\
  !*** ./src/charactersFilm/img/r2-d2.png ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/r2-d2.png");

/***/ }),

/***/ "./src/charactersFilm/img/r5-d4.jpg":
/*!******************************************!*\
  !*** ./src/charactersFilm/img/r5-d4.jpg ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/r5-d4.jpg");

/***/ }),

/***/ "./src/charactersFilm/img/tarfful_detail.png":
/*!***************************************************!*\
  !*** ./src/charactersFilm/img/tarfful_detail.png ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/tarfful_detail.png");

/***/ }),

/***/ "./src/charactersFilm/img/wan-kenobi.png":
/*!***********************************************!*\
  !*** ./src/charactersFilm/img/wan-kenobi.png ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/wan-kenobi.png");

/***/ }),

/***/ "./src/charactersFilm/img/wicket_w_warwick.png":
/*!*****************************************************!*\
  !*** ./src/charactersFilm/img/wicket_w_warwick.png ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/wicket_w_warwick.png");

/***/ }),

/***/ "./src/charactersFilm/img/yoda.png":
/*!*****************************************!*\
  !*** ./src/charactersFilm/img/yoda.png ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/yoda.png");

/***/ }),

/***/ "./src/charactersFilm/view.js":
/*!************************************!*\
  !*** ./src/charactersFilm/view.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PhotoChar_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PhotoChar.js */ "./src/charactersFilm/PhotoChar.js");
/* harmony import */ var _img_Biggs_Darklighter_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./img/Biggs_Darklighter.png */ "./src/charactersFilm/img/Biggs_Darklighter.png");
/* harmony import */ var _img_luke_skywalker_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./img/luke-skywalker.png */ "./src/charactersFilm/img/luke-skywalker.png");
/* harmony import */ var _img_dark_waider_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./img/dark_waider.png */ "./src/charactersFilm/img/dark_waider.png");
/* harmony import */ var _img_r2_d2_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./img/r2-d2.png */ "./src/charactersFilm/img/r2-d2.png");
/* harmony import */ var _img_r5_d4_jpg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./img/r5-d4.jpg */ "./src/charactersFilm/img/r5-d4.jpg");
/* harmony import */ var _img_c_3po_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./img/c-3po.png */ "./src/charactersFilm/img/c-3po.png");
/* harmony import */ var _img_chewbacca_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./img/chewbacca.png */ "./src/charactersFilm/img/chewbacca.png");
/* harmony import */ var _img_greedo_jpg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./img/greedo.jpg */ "./src/charactersFilm/img/greedo.jpg");
/* harmony import */ var _img_Jek_Tono_Porkins_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./img/Jek_Tono_Porkins.png */ "./src/charactersFilm/img/Jek_Tono_Porkins.png");
/* harmony import */ var _img_leila_organa_png__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./img/leila organa.png */ "./src/charactersFilm/img/leila organa.png");
/* harmony import */ var _img_Tarkin_SWE_png__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./img/Tarkin-SWE.png */ "./src/charactersFilm/img/Tarkin-SWE.png");
/* harmony import */ var _img_Beru_Lars_jfif__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./img/Beru_Lars.jfif */ "./src/charactersFilm/img/Beru_Lars.jfif");
/* harmony import */ var _img_Han_Solo_png__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./img/Han-Solo.png */ "./src/charactersFilm/img/Han-Solo.png");
/* harmony import */ var _img_jabba_the_hutt_boba_fett_yoda_jpeg__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./img/jabba-the-hutt-boba-fett-yoda.jpeg */ "./src/charactersFilm/img/jabba-the-hutt-boba-fett-yoda.jpeg");
/* harmony import */ var _img_owen_lars_png__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./img/owen-lars.png */ "./src/charactersFilm/img/owen-lars.png");
/* harmony import */ var _img_RaymusAntilles_jpg__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./img/RaymusAntilles.jpg */ "./src/charactersFilm/img/RaymusAntilles.jpg");
/* harmony import */ var _img_wan_kenobi_png__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./img/wan-kenobi.png */ "./src/charactersFilm/img/wan-kenobi.png");
/* harmony import */ var _img_Wedge_Antilles_png__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./img/Wedge_Antilles.png */ "./src/charactersFilm/img/Wedge_Antilles.png");
/* harmony import */ var _img_bossk_png__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./img/bossk.png */ "./src/charactersFilm/img/bossk.png");
/* harmony import */ var _img_Character_Lobot_png__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./img/Character-Lobot.png */ "./src/charactersFilm/img/Character-Lobot.png");
/* harmony import */ var _img_ij_88_jabbapng_png__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./img/ij-88-jabbapng.png */ "./src/charactersFilm/img/ij-88-jabbapng.png");
/* harmony import */ var _img_lando_calrissian_jpg__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./img/lando-calrissian.jpg */ "./src/charactersFilm/img/lando-calrissian.jpg");
/* harmony import */ var _img_palpatine_png__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./img/palpatine.png */ "./src/charactersFilm/img/palpatine.png");
/* harmony import */ var _img_yoda_png__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./img/yoda.png */ "./src/charactersFilm/img/yoda.png");
/* harmony import */ var _img_boba_fett_png__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./img/boba-fett.png */ "./src/charactersFilm/img/boba-fett.png");
/* harmony import */ var _img_Adi_Gallia_png__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./img/Adi Gallia.png */ "./src/charactersFilm/img/Adi Gallia.png");
/* harmony import */ var _img_ArvelCrynyd_png__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./img/ArvelCrynyd.png */ "./src/charactersFilm/img/ArvelCrynyd.png");
/* harmony import */ var _img_Ayla_Secura_png__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./img/Ayla-Secura.png */ "./src/charactersFilm/img/Ayla-Secura.png");
/* harmony import */ var _img_bib_fortuna_png__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./img/bib_fortuna.png */ "./src/charactersFilm/img/bib_fortuna.png");
/* harmony import */ var _img_ackbar_jpg__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./img/ackbar.jpg */ "./src/charactersFilm/img/ackbar.jpg");
/* harmony import */ var _img_dooku_png__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./img/dooku.png */ "./src/charactersFilm/img/dooku.png");
/* harmony import */ var _img_Eeth_Koth_png__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./img/Eeth_Koth.png */ "./src/charactersFilm/img/Eeth_Koth.png");
/* harmony import */ var _img_general_grievous_png__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./img/general-grievous.png */ "./src/charactersFilm/img/general-grievous.png");
/* harmony import */ var _img_Ki_Adi_Mundi_png__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./img/Ki-Adi-Mundi.png */ "./src/charactersFilm/img/Ki-Adi-Mundi.png");
/* harmony import */ var _img_Kit_Fisto_jfif__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./img/Kit_Fisto.jfif */ "./src/charactersFilm/img/Kit_Fisto.jfif");
/* harmony import */ var _img_Luminara_Unduli_png__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./img/Luminara-Unduli.png */ "./src/charactersFilm/img/Luminara-Unduli.png");
/* harmony import */ var _img_mace_windu_png__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./img/mace-windu.png */ "./src/charactersFilm/img/mace-windu.png");
/* harmony import */ var _img_Mon_Mothma_png__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./img/Mon_Mothma.png */ "./src/charactersFilm/img/Mon_Mothma.png");
/* harmony import */ var _img_nien_nunb_png__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./img/nien-nunb.png */ "./src/charactersFilm/img/nien-nunb.png");
/* harmony import */ var _img_Nute_Gunray_png__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./img/Nute-Gunray.png */ "./src/charactersFilm/img/Nute-Gunray.png");
/* harmony import */ var _img_Padm_Amidala_png__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./img/Padmé-Amidala.png */ "./src/charactersFilm/img/Padmé-Amidala.png");
/* harmony import */ var _img_Plo_Koont_png__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./img/Plo-Koont.png */ "./src/charactersFilm/img/Plo-Koont.png");
/* harmony import */ var _img_Pogglethelesser_detail_png__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./img/Pogglethelesser_detail.png */ "./src/charactersFilm/img/Pogglethelesser_detail.png");
/* harmony import */ var _img_R4_P17_75006_png__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./img/R4-P17-75006.png */ "./src/charactersFilm/img/R4-P17-75006.png");
/* harmony import */ var _img_Shaakti_detail_png__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./img/Shaakti_detail.png */ "./src/charactersFilm/img/Shaakti_detail.png");
/* harmony import */ var _img_Sly_Moore_png__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./img/Sly-Moore.png */ "./src/charactersFilm/img/Sly-Moore.png");
/* harmony import */ var _img_tarfful_detail_png__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./img/tarfful_detail.png */ "./src/charactersFilm/img/tarfful_detail.png");
/* harmony import */ var _img_Tion_Medon_webp__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./img/Tion_Medon.webp */ "./src/charactersFilm/img/Tion_Medon.webp");
/* harmony import */ var _img_Anakin_Skywalker_png__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./img/Anakin-Skywalker.png */ "./src/charactersFilm/img/Anakin-Skywalker.png");
/* harmony import */ var _img_Bail_Organa_png__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./img/Bail_Organa.png */ "./src/charactersFilm/img/Bail_Organa.png");
/* harmony import */ var _img_Barriss_Offee_png__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./img/Barriss-Offee.png */ "./src/charactersFilm/img/Barriss-Offee.png");
/* harmony import */ var _img_cliegglars_detail_png__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./img/cliegglars_detail.png */ "./src/charactersFilm/img/cliegglars_detail.png");
/* harmony import */ var _img_Cord_jpg__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./img/Cordé.jpg */ "./src/charactersFilm/img/Cordé.jpg");
/* harmony import */ var _img_dexterjettster_detail_png__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./img/dexterjettster_detail.png */ "./src/charactersFilm/img/dexterjettster_detail.png");
/* harmony import */ var _img_Dorm_jpg__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./img/Dormé.jpg */ "./src/charactersFilm/img/Dormé.jpg");
/* harmony import */ var _img_Gregar_Typho_png__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./img/Gregar-Typho.png */ "./src/charactersFilm/img/Gregar-Typho.png");
/* harmony import */ var _img_Jango_Fett_png__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./img/Jango Fett.png */ "./src/charactersFilm/img/Jango Fett.png");
/* harmony import */ var _img_Jar_Jar_Binks_png__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./img/Jar-Jar-Binks.png */ "./src/charactersFilm/img/Jar-Jar-Binks.png");
/* harmony import */ var _img_Jocasta_Nu_png__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./img/Jocasta-Nu.png */ "./src/charactersFilm/img/Jocasta-Nu.png");
/* harmony import */ var _img_Lama_su_png__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./img/Lama_su.png */ "./src/charactersFilm/img/Lama_su.png");
/* harmony import */ var _img_Saesee_Tiin_png__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./img/Saesee-Tiin.png */ "./src/charactersFilm/img/Saesee-Tiin.png");
/* harmony import */ var _img_San_Hill_png__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ./img/San_Hill.png */ "./src/charactersFilm/img/San_Hill.png");
/* harmony import */ var _img_Shmi_Skywalker_png__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ./img/Shmi-Skywalker.png */ "./src/charactersFilm/img/Shmi-Skywalker.png");
/* harmony import */ var _img_Taun_We_png__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! ./img/Taun-We.png */ "./src/charactersFilm/img/Taun-We.png");
/* harmony import */ var _img_Wat_Tambor_png__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! ./img/Wat_Tambor.png */ "./src/charactersFilm/img/Wat_Tambor.png");
/* harmony import */ var _img_Watto_png__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! ./img/Watto.png */ "./src/charactersFilm/img/Watto.png");
/* harmony import */ var _img_Zam_Wesell_png__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! ./img/Zam_Wesell.png */ "./src/charactersFilm/img/Zam_Wesell.png");
/* harmony import */ var _img_Mas_Amedda_png__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! ./img/Mas_Amedda.png */ "./src/charactersFilm/img/Mas_Amedda.png");
/* harmony import */ var _img_BenQuadinarosHS_SWE_png__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! ./img/BenQuadinarosHS-SWE.png */ "./src/charactersFilm/img/BenQuadinarosHS-SWE.png");
/* harmony import */ var _img_Darth_Maul_png__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(/*! ./img/Darth-Maul.png */ "./src/charactersFilm/img/Darth-Maul.png");
/* harmony import */ var _img_Dud_Bolt_jpg__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(/*! ./img/Dud_Bolt.jpg */ "./src/charactersFilm/img/Dud_Bolt.jpg");
/* harmony import */ var _img_Gasganp_jpg__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(/*! ./img/Gasganp.jpg */ "./src/charactersFilm/img/Gasganp.jpg");
/* harmony import */ var _img_Quarsh_Panaka_jpg__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(/*! ./img/Quarsh-Panaka.jpg */ "./src/charactersFilm/img/Quarsh-Panaka.jpg");
/* harmony import */ var _img_Qui_Gon_Jinn_png__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__(/*! ./img/Qui-Gon-Jinn.png */ "./src/charactersFilm/img/Qui-Gon-Jinn.png");
/* harmony import */ var _img_RattsHS_jpg__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(/*! ./img/RattsHS.jpg */ "./src/charactersFilm/img/RattsHS.jpg");
/* harmony import */ var _img_Ric_Olie_jpg__WEBPACK_IMPORTED_MODULE_76__ = __webpack_require__(/*! ./img/Ric_Olie.jpg */ "./src/charactersFilm/img/Ric_Olie.jpg");
/* harmony import */ var _img_Roos_Tarpals_png__WEBPACK_IMPORTED_MODULE_77__ = __webpack_require__(/*! ./img/Roos-Tarpals.png */ "./src/charactersFilm/img/Roos-Tarpals.png");
/* harmony import */ var _img_RugorNass_SWCT_png__WEBPACK_IMPORTED_MODULE_78__ = __webpack_require__(/*! ./img/RugorNass-SWCT.png */ "./src/charactersFilm/img/RugorNass-SWCT.png");
/* harmony import */ var _img_Sebulba_png__WEBPACK_IMPORTED_MODULE_79__ = __webpack_require__(/*! ./img/Sebulba.png */ "./src/charactersFilm/img/Sebulba.png");
/* harmony import */ var _img_Valorum_SWE_png__WEBPACK_IMPORTED_MODULE_80__ = __webpack_require__(/*! ./img/Valorum-SWE.png */ "./src/charactersFilm/img/Valorum-SWE.png");
/* harmony import */ var _img_wicket_w_warwick_png__WEBPACK_IMPORTED_MODULE_81__ = __webpack_require__(/*! ./img/wicket_w_warwick.png */ "./src/charactersFilm/img/wicket_w_warwick.png");
/* harmony import */ var _img_Yarael_Poof_png__WEBPACK_IMPORTED_MODULE_82__ = __webpack_require__(/*! ./img/Yarael-Poof.png */ "./src/charactersFilm/img/Yarael-Poof.png");



















































































var container = document.querySelector(".people");
var title = document.querySelector(".title");

function displayPeople() {
  var people = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  container.innerHTML = "";
  title.innerText = "Characters";
  people.map(function (person) {
    displayCharacterInfo(person);
  });
}

function displayCharacterInfo(person) {
  var personElement = document.createElement("div");
  personElement.className = "person around";
  var personIcon = document.createElement("div");
  personIcon.className = "icon";

  switch (person.gender) {
    case "male":
      person.gender += "  \u2642";
      break;

    case "female":
      person.gender += "  \u2640";
      break;
  }

  createInfoChar(personElement, person);
  findImg(person, personIcon);
  container.append(personElement);
  personElement.appendChild(personIcon);
}

function createInfoChar(element, person) {
  element.innerHTML = "\n    <div>\n      <h3> <span> Name: </span> ".concat(person.name, " </h3>\n      <h4> <span> Birthday: </span> ").concat(person["birth_year"], " </h4>\n      <h4> <span> Gender: </span> ").concat(person["gender"], " </h4>\n     </div>\n    ");
}

function findImg(characters, personIcon) {
  var image = document.createElement("img");
  image.className = "iconCharacter";

  for (var i = 0; i < Object.keys(_PhotoChar_js__WEBPACK_IMPORTED_MODULE_0__["default"]).length; i++) {
    var imageAdd = Object.values(_PhotoChar_js__WEBPACK_IMPORTED_MODULE_0__["default"])[i].replace("./img", "img");
    var httpsUrl = characters["url"].replace("http", "https");

    if (httpsUrl === Object.keys(_PhotoChar_js__WEBPACK_IMPORTED_MODULE_0__["default"])[i]) {
      image.src = imageAdd;
      personIcon.appendChild(image);
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (displayPeople);

/***/ }),

/***/ "./src/hw11/chain.css":
/*!****************************!*\
  !*** ./src/hw11/chain.css ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/hw11/view.js":
/*!**************************!*\
  !*** ./src/hw11/view.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _chain_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chain.css */ "./src/hw11/chain.css");
/* harmony import */ var _chain_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_chain_css__WEBPACK_IMPORTED_MODULE_2__);



var data;
var signUp = "";
var phrase = ["Before I finish - 在我结束", "We'd better stop now - 我们最好别看", "I have attempted to explain here that... - 我试图在这里解释一下...", "That remains to be seen - 这还有待", "We agreed that... - ...我们同意", "It makes sense that... - ...是有通理的", "You are not alone - 你不是孤单一个人"];

function random(array) {
  return array[Math.floor(Math.random() * array.length) | 0];
}

function getChars(length) {
  var min = 10000;
  var res = "";
  var signArr = [];
  var start = Date.now();
  return new Promise(function (resolve, reject) {
    if (length <= 0) {
      reject();
    }

    var count = 0;
    var timerId = setInterval(function () {
      count++;
      var sign = parseInt(Date.now().toString().substr(-5));

      if (sign < min) {
        sign = sign + min;
      }

      signArr.push(sign);
      var charCode = String.fromCharCode(sign);
      res += charCode;

      if (count === length) {
        clearInterval(timerId);
        var end = Date.now();
        data = end - start;
        signUp = signArr.join(" - ");
        resolve(res);
      }
    }, 50);
  });
}

/* harmony default export */ __webpack_exports__["default"] = (function () {
  var setResult = /*#__PURE__*/function () {
    var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      var getLength, chars, list, _text, time, randomPhrase;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              getLength = document.getElementById("length").value;
              _context.prev = 1;
              _context.next = 4;
              return getChars(+getLength);

            case 4:
              chars = _context.sent;
              list = document.getElementById("list");
              _text = document.getElementById("text");
              time = document.getElementById("time");
              randomPhrase = document.getElementById("phraseRandom");
              list.innerHTML = "Translate:  ".concat(signUp);
              _text.innerHTML = "Result: ".concat(chars);
              time.innerHTML = "Runtime: ".concat(data, "ms");
              randomPhrase.innerHTML = "Phrase of the day: <span> ".concat(random(phrase), " </span>");
              _context.next = 18;
              break;

            case 15:
              _context.prev = 15;
              _context.t0 = _context["catch"](1);
              text.innerHTML = "The number is smaller";

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 15]]);
    }));

    return function setResult() {
      return _ref.apply(this, arguments);
    };
  }();

  var numberBtn = document.getElementById("btnChain");
  numberBtn.addEventListener("click", setResult);
});

/***/ }),

/***/ "./src/hw13/generator.css":
/*!********************************!*\
  !*** ./src/hw13/generator.css ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/hw13/generator.js":
/*!*******************************!*\
  !*** ./src/hw13/generator.js ***!
  \*******************************/
/*! exports provided: createIdGenerator, newFontGenerator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createIdGenerator", function() { return createIdGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "newFontGenerator", function() { return newFontGenerator; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);


var _marked = /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(createIdGenerator);

function createIdGenerator() {
  var i;
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function createIdGenerator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          i = 1;

        case 1:
          if (!(i < Infinity)) {
            _context.next = 7;
            break;
          }

          _context.next = 4;
          return i;

        case 4:
          i++;
          _context.next = 1;
          break;

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}
function newFontGenerator(size) {
  var sensitiveKeyCode = {
    next: function next(key) {
      switch (key) {
        case "up":
          size += 2;
          break;

        case "down":
          size -= 2;
          break;

        default:
          size += 0;
          break;
      }

      return {
        done: false,
        value: size
      };
    }
  };
  return sensitiveKeyCode;
}

/***/ }),

/***/ "./src/hw13/img/FAVPNG_sky-blue-cloud-desktop-wallpaper_ZZhWpfAQ.png":
/*!***************************************************************************!*\
  !*** ./src/hw13/img/FAVPNG_sky-blue-cloud-desktop-wallpaper_ZZhWpfAQ.png ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/FAVPNG_sky-blue-cloud-desktop-wallpaper_ZZhWpfAQ.png");

/***/ }),

/***/ "./src/hw13/img/cloud_PNG24.png":
/*!**************************************!*\
  !*** ./src/hw13/img/cloud_PNG24.png ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/cloud_PNG24.png");

/***/ }),

/***/ "./src/hw13/img/mountain_PNG2.png":
/*!****************************************!*\
  !*** ./src/hw13/img/mountain_PNG2.png ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("./img/mountain_PNG2.png");

/***/ }),

/***/ "./src/hw13/view.js":
/*!**************************!*\
  !*** ./src/hw13/view.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _generator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./generator */ "./src/hw13/generator.js");
/* harmony import */ var _generator_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./generator.css */ "./src/hw13/generator.css");
/* harmony import */ var _generator_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_generator_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _img_FAVPNG_sky_blue_cloud_desktop_wallpaper_ZZhWpfAQ_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./img/FAVPNG_sky-blue-cloud-desktop-wallpaper_ZZhWpfAQ.png */ "./src/hw13/img/FAVPNG_sky-blue-cloud-desktop-wallpaper_ZZhWpfAQ.png");
/* harmony import */ var _img_cloud_PNG24_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./img/cloud_PNG24.png */ "./src/hw13/img/cloud_PNG24.png");
/* harmony import */ var _img_mountain_PNG2_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./img/mountain_PNG2.png */ "./src/hw13/img/mountain_PNG2.png");





var fontGenerator = Object(_generator__WEBPACK_IMPORTED_MODULE_0__["newFontGenerator"])(14);
var idGenerator = Object(_generator__WEBPACK_IMPORTED_MODULE_0__["createIdGenerator"])();
var container = document.querySelector(".id-text");
var idGen = document.getElementById("id-gen");
var sizeIncrease = document.getElementById("sizeIncrease");
var sizeDecrease = document.getElementById("sizeDecrease");
var text = document.querySelector(".text");
var p = document.createElement("p");
p.className = "table";
/* harmony default export */ __webpack_exports__["default"] = (function () {
  function parallax(event) {
    this.querySelectorAll(".layer").forEach(function (layer) {
      var speed = layer.getAttribute("data-speed");
      layer.style.transform = "translateX(".concat(event.clientX * speed / 2000, "px");
    });
  }

  document.addEventListener("mousemove", parallax);

  var increase = function increase() {
    if (text.style.fontSize < "96px") {
      text.style.fontSize = "".concat(fontGenerator.next("up").value, "px");
      p.style.fontSize = "".concat(fontGenerator.next("up").value, "px");
    }
  };

  var decrease = function decrease() {
    if (text.style.fontSize > "14px") {
      text.style.fontSize = "".concat(fontGenerator.next("down").value, "px");
      p.style.fontSize = "".concat(fontGenerator.next("down").value, "px");
    }
  };

  var blockID = function blockID() {
    p.innerText = "";
    p.innerHTML = "".concat(idGenerator.next().value);
    container.appendChild(p);
  };

  idGen.addEventListener("click", function () {
    blockID();
  });
  sizeIncrease.addEventListener("click", function () {
    increase();
  });
  sizeDecrease.addEventListener("click", function () {
    decrease();
  });
  document.addEventListener("keydown", function (event) {
    switch (event.code) {
      case "ArrowUp":
        increase();
        break;

      case "ArrowRight":
        increase();
        break;

      case "ArrowDown":
        decrease();
        break;

      case "ArrowLeft":
        decrease();
        break;

      case "Enter":
        blockID();
        break;

      case "Space":
        blockID();
        break;
    }
  });
});

/***/ }),

/***/ "./src/hw4/students.css":
/*!******************************!*\
  !*** ./src/hw4/students.css ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/hw4/studentsCard.js":
/*!*********************************!*\
  !*** ./src/hw4/studentsCard.js ***!
  \*********************************/
/*! exports provided: pairs, pairTheme, markPupil, projectMark */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pairs", function() { return pairs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pairTheme", function() { return pairTheme; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "markPupil", function() { return markPupil; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "projectMark", function() { return projectMark; });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__);

var students = ["Саша", "Ігор", "Олена", "Іра", "Олексій", "Світлана"];
var themes = ["Диференційне рівняння", "Теорія автоматів", "Алгоритми і структури даних"];
var marks = [4, 5, 5, 3, 4, 5]; // Розділіть студентів на пари(хлопець + дівчина) для работи над проєктом.

function getPairs(arr) {
  var studentsSort = _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(arr).sort();

  var pairs = [];
  var i = 0;

  while (i < studentsSort.length) {
    pairs.push([studentsSort[i], studentsSort[i + 1]]);
    i += 2;
  }

  return pairs;
} // Зіставте пари з getPairs() та теми проєктів, над якими студенти будуть працювати.


function getThemes(arrN, arrM) {
  var pairTheme = _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(arrN);

  var themes = _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(arrM);

  themes = themes.sort();
  var j = 0;
  pairTheme.forEach(function () {
    pairTheme[j] = pairTheme[j].join(" і ").split(" , ");
    j++;
  }, []); // for (let j = 0; j < pairs.length; j++) {
  //   const x = document.getElementById("demo");
  //   pairs[j] = pairs[j].join(" i ");
  //   x.innerHTML = arr1;
  // }

  var i = 0;
  pairTheme.forEach(function () {
    pairTheme[i].push(themes[i]);
    i++;
  }, []);
  return pairTheme;
} // Зіставте оцінки(marks) зі студентом(students).


function getMark(arr, numArr) {
  var students = _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(arr);

  var marks = _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(numArr);

  var studentMark = [];

  for (var i = 0; i < students.length; i++) {
    studentMark.push([students[i], marks[i]]);
  }

  return studentMark;
} // Рандомна оцінка від 1 до 5:


function randomMark() {
  var min = 1;
  var max = 6;
  return Math.floor(Math.random() * (max - min) + min);
} // Поставте кожній парі випадкову оцінку(від 1 до 5) за проєкт.


function getRandomMark(array) {
  var projectMark = array.map(function (arr) {
    return arr.slice();
  });

  for (var i = 0; i < projectMark.length; i++) {
    projectMark[i].push(randomMark());
  }

  return projectMark;
}

var pairs = getPairs(students);
var pairTheme = getThemes(pairs, themes);
var markPupil = getMark(students, marks);
var projectMark = getRandomMark(pairTheme);

/***/ }),

/***/ "./src/hw4/view.js":
/*!*************************!*\
  !*** ./src/hw4/view.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _studentsCard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./studentsCard */ "./src/hw4/studentsCard.js");
/* harmony import */ var _students_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./students.css */ "./src/hw4/students.css");
/* harmony import */ var _students_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_students_css__WEBPACK_IMPORTED_MODULE_1__);
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



var card1 = document.querySelectorAll(".p1");
var card2 = document.querySelectorAll(".p2");
var card3 = document.querySelectorAll(".p3");
var card4 = document.querySelectorAll(".p4");

function setPairs(pairs) {
  var i = 0;

  var _iterator = _createForOfIteratorHelper(pairs),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var pair = _step.value;
      var pairStud = "".concat(i + 1, " \u043F\u0430\u0440\u0430: ").concat(pairs[i].join(" , "));
      card1[i].textContent = "".concat(pairStud);
      i++;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}

function setThemes(pairTheme) {
  var i = 0;

  var _iterator2 = _createForOfIteratorHelper(pairTheme),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var some = _step2.value;
      var pairSomeone = "".concat(i + 1, " \u043F\u0430\u0440\u0430: ").concat(pairTheme[i].join(" , "));
      card2[i].textContent = "".concat(pairSomeone);
      i++;
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
}

function setEveryMark(markPupil) {
  var i = 0;

  var _iterator3 = _createForOfIteratorHelper(markPupil),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var mark = _step3.value;
      var markEvery = "".concat(i + 1, ": ").concat(markPupil[i].join(" , "));
      card3[i].textContent = "".concat(markEvery);
      i++;
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
}

function setProjectMark(projectMark) {
  var i = 0;

  var _iterator4 = _createForOfIteratorHelper(projectMark),
      _step4;

  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var mark = _step4.value;
      var project = "".concat(i + 1, " \u043F\u0430\u0440\u0430: ").concat(projectMark[i].join(" , "));
      card4[i].textContent = "".concat(project);
      i++;
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
}

var setCardsBtn = document.getElementById("setCardsBtn");
/* harmony default export */ __webpack_exports__["default"] = (function () {
  setCardsBtn.addEventListener("click", function () {
    card1.textContent = setPairs(_studentsCard__WEBPACK_IMPORTED_MODULE_0__["pairs"]);
    card2.textContent = setThemes(_studentsCard__WEBPACK_IMPORTED_MODULE_0__["pairTheme"]);
    card3.textContent = setEveryMark(_studentsCard__WEBPACK_IMPORTED_MODULE_0__["markPupil"]);
    card4.textContent = setProjectMark(_studentsCard__WEBPACK_IMPORTED_MODULE_0__["projectMark"]);
  });
});

/***/ }),

/***/ "./src/hw6/student.css":
/*!*****************************!*\
  !*** ./src/hw6/student.css ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/hw6/studentData.js":
/*!********************************!*\
  !*** ./src/hw6/studentData.js ***!
  \********************************/
/*! exports provided: getSubjects, getAverageMark, getStudentInfo, getStudentsNames, getBestStudent, calculateWordLetters, getStringObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSubjects", function() { return getSubjects; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAverageMark", function() { return getAverageMark; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStudentInfo", function() { return getStudentInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStudentsNames", function() { return getStudentsNames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBestStudent", function() { return getBestStudent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculateWordLetters", function() { return calculateWordLetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStringObject", function() { return getStringObject; });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__);




function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

//1. повертає список предметів для конкретного студента
function getSubjects(student) {
  var subjects = Object.keys(student.subjects);
  return subjects.map(function (subject) {
    return subject.slice(0, 1).toUpperCase() + subject.slice(1).replace("_", " ");
  });
} // 2. поверне середню оцінку по усім предметам для переданого студента

function getAverageMark(student) {
  var marksObj = Object.values(student.subjects);
  var marks = [];
  var sumMarks = 0;
  var sumObj = 0;

  var _loop = function _loop() {
    var mark = _marksObj[_i];
    var sum = 0;
    sumObj = mark.reduce(function (acc, num) {
      sum = acc + num;
      return sum;
    }, 0);
    marks.push(sumObj);
    sumMarks += mark.length;
  };

  for (var _i = 0, _marksObj = marksObj; _i < _marksObj.length; _i++) {
    _loop();
  }

  return marks.reduce(function (acc, num) {
    return acc + num;
  }, 0) / sumMarks;
} // 3.повертає інформацію загального виду по переданому студенту

function getStudentInfo(student) {
  return {
    name: student.name,
    course: student.course,
    average: getAverageMark(student)
  };
} // 4. повертає імена студентів у алфавітному порядку.

function getStudentsNames(students) {
  return students.map(function (student) {
    return student.name;
  }).sort();
} // 5. повертає кращого студента зі списку по показнику середньої оцінки.

function getBestStudent(students) {
  var bestAverMark;
  var bestStudent = null;
  var names = [];
  var average = [];

  var _iterator = _createForOfIteratorHelper(students),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var student = _step.value;
      average.push(getAverageMark(student));
      names.push(student.name);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  bestAverMark = Math.max.apply(Math, average);
  var obj = Object.assign.apply(Object, _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2___default()(names.map(function (name, i) {
    return _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()({}, name, average[i]);
  })));

  for (var _i2 = 0, _Object$entries = Object.entries(obj); _i2 < _Object$entries.length; _i2++) {
    var _Object$entries$_i = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_Object$entries[_i2], 2),
        key = _Object$entries$_i[0],
        value = _Object$entries$_i[1];

    if (value === bestAverMark) {
      bestStudent = "".concat(key);
    }
  }

  return bestStudent;
} // 6. повертає обє'кт, в якому ключі це букви у слові, а значення – кількість їх повторень.

function calculateWordLetters(string) {
  var word = string.split("");
  var obj = {};

  for (var i = 0; i < string.length; i++) {
    var letter = word[i];

    if (obj[letter]) {
      obj[letter] += 1;
    } else obj[letter] = 1;
  }

  return obj;
}
function getStringObject(obj) {
  var list = "";

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      list += "\"".concat(key, "\" :  ").concat(obj[key], ", ");
    }
  }

  return list;
}

/***/ }),

/***/ "./src/hw6/students.js":
/*!*****************************!*\
  !*** ./src/hw6/students.js ***!
  \*****************************/
/*! exports provided: students, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "students", function() { return students; });
var students = [{
  name: "Tanya",
  course: 3,
  subjects: {
    math: [4, 4, 3, 4],
    algorithms: [3, 3, 3, 4, 4, 4],
    data_science: [5, 5, 3, 4]
  }
}, {
  name: "Victor",
  course: 4,
  subjects: {
    physics: [5, 5, 5, 3],
    economics: [2, 3, 3, 3, 3, 5],
    geometry: [5, 5, 2, 3, 5]
  }
}, {
  name: "Anton",
  course: 2,
  subjects: {
    statistics: [4, 5, 5, 5, 5, 3, 4, 3, 4, 5],
    english: [5, 3],
    cosmology: [5, 5, 5, 5]
  }
}];
/* harmony default export */ __webpack_exports__["default"] = (students);

/***/ }),

/***/ "./src/hw6/view.js":
/*!*************************!*\
  !*** ./src/hw6/view.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _studentData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./studentData */ "./src/hw6/studentData.js");
/* harmony import */ var _students__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./students */ "./src/hw6/students.js");
/* harmony import */ var _student_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./student.css */ "./src/hw6/student.css");
/* harmony import */ var _student_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_student_css__WEBPACK_IMPORTED_MODULE_2__);
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }





function task1() {
  var setSubject = document.querySelector(".subjects");

  if (!setSubject.childNodes.length) {
    var _iterator = _createForOfIteratorHelper(_students__WEBPACK_IMPORTED_MODULE_1__["default"]),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var student = _step.value;
        setSubject.innerHTML += "\n          <div class=\"cards\">\n            <h3 class=\"cards__title\">".concat(student.name, "</h3>\n               <p class=\"cards-item\">\n                 ").concat(Object(_studentData__WEBPACK_IMPORTED_MODULE_0__["getSubjects"])(student).join(" , </br>"), "\n               </p>\n          </div>");
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
}

function task2() {
  var setAverageMark = document.querySelector(".averMarks");

  if (!setAverageMark.childNodes.length) {
    var _iterator2 = _createForOfIteratorHelper(_students__WEBPACK_IMPORTED_MODULE_1__["default"]),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var student = _step2.value;
        setAverageMark.innerHTML += "\n          <div class=\"cards\">\n            <h3 class=\"cards__title\">".concat(student.name, "</h3>\n               <p class=\"cards-item\">\n                 ").concat(Object(_studentData__WEBPACK_IMPORTED_MODULE_0__["getAverageMark"])(student).toFixed(2), "\n               </p>\n          </div>");
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }
}

function task3() {
  var setInfo = document.querySelector(".inform");

  if (!setInfo.childNodes.length) {
    var _iterator3 = _createForOfIteratorHelper(_students__WEBPACK_IMPORTED_MODULE_1__["default"]),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var student = _step3.value;
        Object(_studentData__WEBPACK_IMPORTED_MODULE_0__["getStudentInfo"])(student);
        setInfo.innerHTML += "\n          <div class=\"cards\">\n               <p class=\"cards-item\">\n               <span> student name:      ".concat(student.name, ";        </span>\n               <span>  course:            ").concat(student.course, ";     </span>   \n               <span>  average mark:      ").concat(Object(_studentData__WEBPACK_IMPORTED_MODULE_0__["getAverageMark"])(student).toFixed(2), "; </span>\n               </p>\n          </div>");
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  }
}

function task4() {
  var setSortNames = document.querySelector(".sortNames");
  setSortNames.innerHTML = "\n          <div class=\"cards\">\n               <p class=\"cards-item\">\n                 ".concat(Object(_studentData__WEBPACK_IMPORTED_MODULE_0__["getStudentsNames"])(_students__WEBPACK_IMPORTED_MODULE_1__["default"]).join(" , "), "\n               </p>\n          </div>");
}

function task5() {
  var setBestStudentName = document.querySelector(".bestStud");
  setBestStudentName.innerHTML = "\n          <div class=\"cards\">\n               <p class=\"cards-item\">\n                 ".concat(Object(_studentData__WEBPACK_IMPORTED_MODULE_0__["getBestStudent"])(_students__WEBPACK_IMPORTED_MODULE_1__["default"]), "\n               </p>\n          </div>");
}

function task6() {
  var getWord = document.querySelector("#word").value;
  var setCountLetters = document.querySelector(".letters");
  setCountLetters.innerHTML = "\n          <div class=\"cards\">\n               <p class=\"cards-item\">\n                 ".concat(Object(_studentData__WEBPACK_IMPORTED_MODULE_0__["getStringObject"])(Object(_studentData__WEBPACK_IMPORTED_MODULE_0__["calculateWordLetters"])(getWord)), "\n               </p>\n          </div>");
}
/* - - - - - - - - - - - - - - Buttons click - - - - - - - - - - - - - -*/


/* harmony default export */ __webpack_exports__["default"] = (function () {
  document.body.addEventListener("click", function (event) {
    if (event.target.classList.contains("click-1")) {
      "".concat(task1());
    }

    if (event.target.classList.contains("click-2")) {
      "".concat(task2());
    }

    if (event.target.classList.contains("click-3")) {
      "".concat(task3());
    }

    if (event.target.classList.contains("click-4")) {
      "".concat(task4());
    }

    if (event.target.classList.contains("click-5")) {
      "".concat(task5());
    }

    if (event.target.classList.contains("click-6")) {
      "".concat(task6());
    }
  });
});

/***/ }),

/***/ "./src/hw9/genBlocks.css":
/*!*******************************!*\
  !*** ./src/hw9/genBlocks.css ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/hw9/genBlocks.js":
/*!******************************!*\
  !*** ./src/hw9/genBlocks.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _genBlocks_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./genBlocks.css */ "./src/hw9/genBlocks.css");
/* harmony import */ var _genBlocks_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_genBlocks_css__WEBPACK_IMPORTED_MODULE_0__);

var container = document.getElementById("container");
var randomColorBlocks = document.querySelector(".colorBlocks");
var stopButton = document.querySelector(".stop");
var setBlocks = document.querySelector(".newBlocks");
var timerId;

var setBg = function setBg(elem) {
  elem.style.backgroundColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
};

var setSquareContainer = function setSquareContainer() {
  for (var i = 0; i < 25; i++) {
    container.insertAdjacentHTML("beforeend", "<div class=\"square\"></div>");
  }
};

var setRandomColor = function setRandomColor() {
  var divSquares = document.querySelectorAll(".square");
  divSquares.forEach(function (square) {
    return setBg(square);
  });
};

function stop() {
  clearInterval(timerId);
}

/* harmony default export */ __webpack_exports__["default"] = (function () {
  setBlocks.addEventListener("click", function () {
    setBlocks.setAttribute("disabled", "disabled");
    setSquareContainer();
  });
  randomColorBlocks.addEventListener("click", function () {
    randomColorBlocks.setAttribute("disabled", "disabled");
    timerId = setInterval(setRandomColor, 1000);
  });
  stopButton.addEventListener("click", function () {
    randomColorBlocks.removeAttribute("disabled");
    "".concat(stop());
  });
});

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _charactersFilm_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./charactersFilm/controller */ "./src/charactersFilm/controller.js");
/* harmony import */ var _hw13_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hw13/view */ "./src/hw13/view.js");
/* harmony import */ var _hw11_view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hw11/view */ "./src/hw11/view.js");
/* harmony import */ var _hw9_genBlocks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./hw9/genBlocks */ "./src/hw9/genBlocks.js");
/* harmony import */ var _hw4_view__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./hw4/view */ "./src/hw4/view.js");
/* harmony import */ var _hw6_view__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./hw6/view */ "./src/hw6/view.js");






Object(_hw13_view__WEBPACK_IMPORTED_MODULE_1__["default"])();
Object(_charactersFilm_controller__WEBPACK_IMPORTED_MODULE_0__["default"])();
Object(_hw11_view__WEBPACK_IMPORTED_MODULE_2__["default"])();
Object(_hw9_genBlocks__WEBPACK_IMPORTED_MODULE_3__["default"])();
Object(_hw4_view__WEBPACK_IMPORTED_MODULE_4__["default"])();
Object(_hw6_view__WEBPACK_IMPORTED_MODULE_5__["default"])();

/***/ })

/******/ });
//# sourceMappingURL=main.bundle.js.map