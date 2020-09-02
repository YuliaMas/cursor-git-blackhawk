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

/***/ "./src/charactersFilm/PhotoChar.js":
/*!*****************************************!*\
  !*** ./src/charactersFilm/PhotoChar.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const photoCharacters = {
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
  "https://swapi.dev/api/people/16/":
    "./img/jabba-the-hutt-boba-fett-yoda.jpeg",
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
  "https://swapi.dev/api/people/57/": "./img/Yarael-Poof.png",
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


const BASE = "https://swapi.dev/api/";

function getInfo(numPage, info) {
  const request = axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(BASE + info + numPage);
  return request
    .then((res) => {
      return res.data.results;
    })
    .catch((err) => {
      if (!request) {
        console.log("something wrong", err);
      }
      return [];
    });
}

/* harmony default export */ __webpack_exports__["default"] = ({ getInfo });


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





const people = `people/?page=`;
const btnInfo = document.getElementById("btn");

/* harmony default export */ __webpack_exports__["default"] = (function () {
  btnInfo.addEventListener("click", () => {
    const peopleId = document.getElementById("filmId").value;
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




















































































const container = document.querySelector(".people");
const title = document.querySelector(".title");

function displayPeople(people = []) {
  container.innerHTML = "";
  title.innerText = "Characters";
  people.map((person) => {
    displayCharacterInfo(person);
  });
}

function displayCharacterInfo(person) {
  const personElement = document.createElement("div");
  personElement.className = "person around";
  const personIcon = document.createElement("div");
  personIcon.className = "icon";
  switch (person.gender) {
    case "male":
      person.gender += `  ♂`;
      break;
    case "female":
      person.gender += `  ♀`;
      break;
  }

  createInfoChar(personElement, person);
  findImg(person, personIcon);

  container.append(personElement);
  personElement.appendChild(personIcon);
}

function createInfoChar(element, person) {
  element.innerHTML = `
    <div>
      <h3> <span> Name: </span> ${person.name} </h3>
      <h4> <span> Birthday: </span> ${person["birth_year"]} </h4>
      <h4> <span> Gender: </span> ${person["gender"]} </h4>
     </div>
    `;
}

function findImg(characters, personIcon) {
  const image = document.createElement("img");
  image.className = "iconCharacter";

  for (let i = 0; i < Object.keys(_PhotoChar_js__WEBPACK_IMPORTED_MODULE_0__["default"]).length; i++) {
    const imageAdd = Object.values(_PhotoChar_js__WEBPACK_IMPORTED_MODULE_0__["default"])[i].replace("./img", "img");
    const httpsUrl = characters["url"].replace("http", "https");
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
/* harmony import */ var _chain_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chain.css */ "./src/hw11/chain.css");
/* harmony import */ var _chain_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_chain_css__WEBPACK_IMPORTED_MODULE_0__);

let data;
let signUp = "";

const phrase = [
  "Before I finish - 在我结束",
  "We'd better stop now - 我们最好别看",
  "I have attempted to explain here that... - 我试图在这里解释一下...",
  "That remains to be seen - 这还有待",
  "We agreed that... - ...我们同意",
  "It makes sense that... - ...是有通理的",
  "You are not alone - 你不是孤单一个人",
];

function random(array) {
  return array[Math.floor(Math.random() * array.length) | 0];
}

function getChars(length) {
  const min = 10000;
  let res = "";
  let signArr = [];
  const start = Date.now();
  return new Promise((resolve, reject) => {
    if (length <= 0) {
      reject();
    }
    let count = 0;
    const timerId = setInterval(() => {
      count++;
      let sign = parseInt(Date.now().toString().substr(-5));
      if (sign < min) {
        sign = sign + min;
      }
      signArr.push(sign);
      const charCode = String.fromCharCode(sign);
      res += charCode;
      if (count === length) {
        clearInterval(timerId);
        const end = Date.now();
        data = end - start;
        signUp = signArr.join(" - ");
        resolve(res);
      }
    }, 50);
  });
}

/* harmony default export */ __webpack_exports__["default"] = (function () {
  const setResult = async () => {
    const getLength = document.getElementById("length").value;
    try {
      const chars = await getChars(+getLength);
      const list = document.getElementById("list");
      const text = document.getElementById("text");
      const time = document.getElementById("time");
      const randomPhrase = document.getElementById("phraseRandom");
      list.innerHTML = `Translate:  ${signUp}`;
      text.innerHTML = `Result: ${chars}`;
      time.innerHTML = `Runtime: ${data}ms`;
      randomPhrase.innerHTML = `Phrase of the day: <span> ${random(
        phrase
      )} </span>`;
    } catch {
      text.innerHTML = "The number is smaller";
    }
  };

  const numberBtn = document.getElementById("btnChain");
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
function* createIdGenerator() {
  for (let i = 1; i < Infinity; i++) {
    yield i;
  }
}

function newFontGenerator(size) {
  const sensitiveKeyCode = {
    next(key) {
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
        value: size,
      };
    },
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






const fontGenerator = Object(_generator__WEBPACK_IMPORTED_MODULE_0__["newFontGenerator"])(14);
const idGenerator = Object(_generator__WEBPACK_IMPORTED_MODULE_0__["createIdGenerator"])();

const container = document.querySelector(".id-text");
const idGen = document.getElementById("id-gen");
const sizeIncrease = document.getElementById("sizeIncrease");
const sizeDecrease = document.getElementById("sizeDecrease");
const text = document.querySelector(".text");
const p = document.createElement("p");
p.className = "table";

/* harmony default export */ __webpack_exports__["default"] = (function () {
  function parallax(event) {
    this.querySelectorAll(".layer").forEach((layer) => {
      const speed = layer.getAttribute("data-speed");
      layer.style.transform = `translateX(${(event.clientX * speed) / 2000}px`;
    });
  }

  document.addEventListener("mousemove", parallax);

  const increase = () => {
    if (text.style.fontSize < "96px") {
      text.style.fontSize = `${fontGenerator.next("up").value}px`;
      p.style.fontSize = `${fontGenerator.next("up").value}px`;
    }
  };

  const decrease = () => {
    if (text.style.fontSize > "14px") {
      text.style.fontSize = `${fontGenerator.next("down").value}px`;
      p.style.fontSize = `${fontGenerator.next("down").value}px`;
    }
  };

  const blockID = () => {
    p.innerText = "";
    p.innerHTML = `${idGenerator.next().value}`;
    container.appendChild(p);
  };

  idGen.addEventListener("click", () => {
    blockID();
  });

  sizeIncrease.addEventListener("click", () => {
    increase();
  });

  sizeDecrease.addEventListener("click", () => {
    decrease();
  });

  document.addEventListener("keydown", (event) => {
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
const students = ["Саша", "Ігор", "Олена", "Іра", "Олексій", "Світлана"];
const themes = [
  "Диференційне рівняння",
  "Теорія автоматів",
  "Алгоритми і структури даних",
];
const marks = [4, 5, 5, 3, 4, 5];

// Розділіть студентів на пари(хлопець + дівчина) для работи над проєктом.
function getPairs(arr) {
  const studentsSort = [...arr].sort();
  const pairs = [];
  let i = 0;
  while (i < studentsSort.length) {
    pairs.push([studentsSort[i], studentsSort[i + 1]]);
    i += 2;
  }
  return pairs;
}

// Зіставте пари з getPairs() та теми проєктів, над якими студенти будуть працювати.
function getThemes(arrN, arrM) {
  const pairTheme = [...arrN];
  let themes = [...arrM];
  themes = themes.sort();
  let j = 0;
  pairTheme.forEach(() => {
    pairTheme[j] = pairTheme[j].join(" і ").split(" , ");
    j++;
  }, []);
  // for (let j = 0; j < pairs.length; j++) {
  //   const x = document.getElementById("demo");
  //   pairs[j] = pairs[j].join(" i ");
  //   x.innerHTML = arr1;
  // }
  let i = 0;
  pairTheme.forEach(() => {
    pairTheme[i].push(themes[i]);
    i++;
  }, []);
  return pairTheme;
}

// Зіставте оцінки(marks) зі студентом(students).
function getMark(arr, numArr) {
  let students = [...arr];
  let marks = [...numArr];
  let studentMark = [];
  for (let i = 0; i < students.length; i++) {
    studentMark.push([students[i], marks[i]]);
  }
  return studentMark;
}

// Рандомна оцінка від 1 до 5:
function randomMark() {
  const min = 1;
  const max = 6;
  return Math.floor(Math.random() * (max - min) + min);
}

// Поставте кожній парі випадкову оцінку(від 1 до 5) за проєкт.
function getRandomMark(array) {
  let projectMark = array.map((arr) => arr.slice());
  for (let i = 0; i < projectMark.length; i++) {
    projectMark[i].push(randomMark());
  }
  return projectMark;
}

const pairs = getPairs(students);
const pairTheme = getThemes(pairs, themes);
const markPupil = getMark(students, marks);
const projectMark = getRandomMark(pairTheme);


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



const card1 = document.querySelectorAll(".p1");
const card2 = document.querySelectorAll(".p2");
const card3 = document.querySelectorAll(".p3");
const card4 = document.querySelectorAll(".p4");

function setPairs(pairs) {
  let i = 0;
  for (let pair of pairs) {
    const pair = `${i + 1} пара: ${pairs[i].join(" , ")}`;
    card1[i].textContent = `${pair}`;
    i++;
  }
}

function setThemes(pairTheme) {
  let i = 0;
  for (let some of pairTheme) {
    const pairSomeone = `${i + 1} пара: ${pairTheme[i].join(" , ")}`;
    card2[i].textContent = `${pairSomeone}`;
    i++;
  }
}

function setEveryMark(markPupil) {
  let i = 0;
  for (let mark of markPupil) {
    const markEvery = `${i + 1}: ${markPupil[i].join(" , ")}`;
    card3[i].textContent = `${markEvery}`;
    i++;
  }
}

function setProjectMark(projectMark) {
  let i = 0;
  for (let mark of projectMark) {
    const project = `${i + 1} пара: ${projectMark[i].join(" , ")}`;
    card4[i].textContent = `${project}`;
    i++;
  }
}

const setCardsBtn = document.getElementById("setCardsBtn");

/* harmony default export */ __webpack_exports__["default"] = (function () {
  setCardsBtn.addEventListener("click", () => {
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
//1. повертає список предметів для конкретного студента
function getSubjects(student) {
  const subjects = Object.keys(student.subjects);
  return subjects.map(
    (subject) =>
      subject.slice(0, 1).toUpperCase() + subject.slice(1).replace("_", " ")
  );
}

// 2. поверне середню оцінку по усім предметам для переданого студента
function getAverageMark(student) {
  const marksObj = Object.values(student.subjects);
  const marks = [];
  let sumMarks = 0;
  let sumObj = 0;
  for (let mark of marksObj) {
    let sum = 0;
    sumObj = mark.reduce((acc, num) => {
      sum = acc + num;
      return sum;
    }, 0);
    marks.push(sumObj);
    sumMarks += mark.length;
  }
  return marks.reduce((acc, num) => acc + num, 0) / sumMarks;
}

// 3.повертає інформацію загального виду по переданому студенту
function getStudentInfo(student) {
  return {
    name: student.name,
    course: student.course,
    average: getAverageMark(student),
  };
}

// 4. повертає імена студентів у алфавітному порядку.
function getStudentsNames(students) {
  return students.map((student) => student.name).sort();
}

// 5. повертає кращого студента зі списку по показнику середньої оцінки.
function getBestStudent(students) {
  let bestAverMark;
  let bestStudent = null;
  const names = [];
  const average = [];
  for (let student of students) {
    average.push(getAverageMark(student));
    names.push(student.name);
  }

  bestAverMark = Math.max(...average);
  const obj = Object.assign(
    ...names.map((name, i) => ({ [name]: average[i] }))
  );

  for (const [key, value] of Object.entries(obj)) {
    if (value === bestAverMark) {
      bestStudent = `${key}`;
    }
  }
  return bestStudent;
}

// 6. повертає обє'кт, в якому ключі це букви у слові, а значення – кількість їх повторень.
function calculateWordLetters(string) {
  const word = string.split("");
  const obj = {};
  for (let i = 0; i < string.length; i++) {
    const letter = word[i];
    if (obj[letter]) {
      obj[letter] += 1;
    } else obj[letter] = 1;
  }
  return obj;
}

function getStringObject(obj) {
  let list = "";
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      list += `"${key}" :  ${obj[key]}, `;
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
const students = [
  {
    name: "Tanya",
    course: 3,
    subjects: {
      math: [4, 4, 3, 4],
      algorithms: [3, 3, 3, 4, 4, 4],
      data_science: [5, 5, 3, 4],
    },
  },
  {
    name: "Victor",
    course: 4,
    subjects: {
      physics: [5, 5, 5, 3],
      economics: [2, 3, 3, 3, 3, 5],
      geometry: [5, 5, 2, 3, 5],
    },
  },
  {
    name: "Anton",
    course: 2,
    subjects: {
      statistics: [4, 5, 5, 5, 5, 3, 4, 3, 4, 5],
      english: [5, 3],
      cosmology: [5, 5, 5, 5],
    },
  },
];

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




function task1() {
  const setSubject = document.querySelector(".subjects");
  if (!setSubject.childNodes.length) {
    for (let student of _students__WEBPACK_IMPORTED_MODULE_1__["default"]) {
      setSubject.innerHTML += `
          <div class="cards">
            <h3 class="cards__title">${student.name}</h3>
               <p class="cards-item">
                 ${Object(_studentData__WEBPACK_IMPORTED_MODULE_0__["getSubjects"])(student).join(" , </br>")}
               </p>
          </div>`;
    }
  }
}

function task2() {
  const setAverageMark = document.querySelector(".averMarks");
  if (!setAverageMark.childNodes.length) {
    for (let student of _students__WEBPACK_IMPORTED_MODULE_1__["default"]) {
      setAverageMark.innerHTML += `
          <div class="cards">
            <h3 class="cards__title">${student.name}</h3>
               <p class="cards-item">
                 ${Object(_studentData__WEBPACK_IMPORTED_MODULE_0__["getAverageMark"])(student).toFixed(2)}
               </p>
          </div>`;
    }
  }
}

function task3() {
  const setInfo = document.querySelector(".inform");
  if (!setInfo.childNodes.length) {
    for (let student of _students__WEBPACK_IMPORTED_MODULE_1__["default"]) {
      Object(_studentData__WEBPACK_IMPORTED_MODULE_0__["getStudentInfo"])(student);
      setInfo.innerHTML += `
          <div class="cards">
               <p class="cards-item">
               <span> student name:      ${student.name};        </span>
               <span>  course:            ${student.course};     </span>   
               <span>  average mark:      ${Object(_studentData__WEBPACK_IMPORTED_MODULE_0__["getAverageMark"])(student).toFixed(
                 2
               )}; </span>
               </p>
          </div>`;
    }
  }
}

function task4() {
  const setSortNames = document.querySelector(".sortNames");
  setSortNames.innerHTML = `
          <div class="cards">
               <p class="cards-item">
                 ${Object(_studentData__WEBPACK_IMPORTED_MODULE_0__["getStudentsNames"])(_students__WEBPACK_IMPORTED_MODULE_1__["default"]).join(" , ")}
               </p>
          </div>`;
}

function task5() {
  const setBestStudentName = document.querySelector(".bestStud");
  setBestStudentName.innerHTML = `
          <div class="cards">
               <p class="cards-item">
                 ${Object(_studentData__WEBPACK_IMPORTED_MODULE_0__["getBestStudent"])(_students__WEBPACK_IMPORTED_MODULE_1__["default"])}
               </p>
          </div>`;
}

function task6() {
  const getWord = document.querySelector("#word").value;
  const setCountLetters = document.querySelector(".letters");
  setCountLetters.innerHTML = `
          <div class="cards">
               <p class="cards-item">
                 ${Object(_studentData__WEBPACK_IMPORTED_MODULE_0__["getStringObject"])(Object(_studentData__WEBPACK_IMPORTED_MODULE_0__["calculateWordLetters"])(getWord))}
               </p>
          </div>`;
}

/* - - - - - - - - - - - - - - Buttons click - - - - - - - - - - - - - -*/
/* harmony default export */ __webpack_exports__["default"] = (function () {
  document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("click-1")) {
      `${task1()}`;
    }
    if (event.target.classList.contains("click-2")) {
      `${task2()}`;
    }
    if (event.target.classList.contains("click-3")) {
      `${task3()}`;
    }
    if (event.target.classList.contains("click-4")) {
      `${task4()}`;
    }
    if (event.target.classList.contains("click-5")) {
      `${task5()}`;
    }
    if (event.target.classList.contains("click-6")) {
      `${task6()}`;
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


const container = document.getElementById("container");
const randomColorBlocks = document.querySelector(".colorBlocks");
const stopButton = document.querySelector(".stop");
const setBlocks = document.querySelector(".newBlocks");
let timerId;

const setBg = (elem) => {
  elem.style.backgroundColor =
    "#" + Math.floor(Math.random() * 16777215).toString(16);
};

const setSquareContainer = () => {
  for (let i = 0; i < 25; i++) {
    container.insertAdjacentHTML("beforeend", `<div class="square"></div>`);
  }
};

const setRandomColor = () => {
  const divSquares = document.querySelectorAll(".square");
  divSquares.forEach((square) => setBg(square));
};

function stop() {
  clearInterval(timerId);
}

/* harmony default export */ __webpack_exports__["default"] = (function () {
  setBlocks.addEventListener("click", () => {
    setBlocks.setAttribute("disabled", "disabled");
    setSquareContainer();
  });

  randomColorBlocks.addEventListener("click", () => {
    randomColorBlocks.setAttribute("disabled", "disabled");
    timerId = setInterval(setRandomColor, 1000);
  });

  stopButton.addEventListener("click", () => {
    randomColorBlocks.removeAttribute("disabled");
    `${stop()}`;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9idWlsZEZ1bGxQYXRoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9jcmVhdGVFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9lbmhhbmNlRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL21lcmdlQ29uZmlnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9zZXR0bGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3RyYW5zZm9ybURhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYmluZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc3ByZWFkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyc0ZpbG0vUGhvdG9DaGFyLmpzIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9jaGFyYWN0ZXJzLmNzcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyc0ZpbG0vY2hhcmFjdGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyc0ZpbG0vY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyc0ZpbG0vaW1nL0FkaSBHYWxsaWEucG5nIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvQW5ha2luLVNreXdhbGtlci5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9BcnZlbENyeW55ZC5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9BeWxhLVNlY3VyYS5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9CYWlsX09yZ2FuYS5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9CYXJyaXNzLU9mZmVlLnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyc0ZpbG0vaW1nL0JlblF1YWRpbmFyb3NIUy1TV0UucG5nIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvQmVydV9MYXJzLmpmaWYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9CaWdnc19EYXJrbGlnaHRlci5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9DaGFyYWN0ZXItTG9ib3QucG5nIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvQ29yZMOpLmpwZyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyc0ZpbG0vaW1nL0RhcnRoLU1hdWwucG5nIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvRG9ybcOpLmpwZyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyc0ZpbG0vaW1nL0R1ZF9Cb2x0LmpwZyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyc0ZpbG0vaW1nL0VldGhfS290aC5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9HYXNnYW5wLmpwZyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyc0ZpbG0vaW1nL0dyZWdhci1UeXBoby5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9IYW4tU29sby5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9KYW5nbyBGZXR0LnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyc0ZpbG0vaW1nL0phci1KYXItQmlua3MucG5nIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvSmVrX1Rvbm9fUG9ya2lucy5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9Kb2Nhc3RhLU51LnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyc0ZpbG0vaW1nL0tpLUFkaS1NdW5kaS5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9LaXRfRmlzdG8uamZpZiIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyc0ZpbG0vaW1nL0xhbWFfc3UucG5nIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvTHVtaW5hcmEtVW5kdWxpLnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyc0ZpbG0vaW1nL01hc19BbWVkZGEucG5nIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvTW9uX01vdGhtYS5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9OdXRlLUd1bnJheS5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9QYWRtw6ktQW1pZGFsYS5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9QbG8tS29vbnQucG5nIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvUG9nZ2xldGhlbGVzc2VyX2RldGFpbC5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9RdWFyc2gtUGFuYWthLmpwZyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyc0ZpbG0vaW1nL1F1aS1Hb24tSmlubi5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9SNC1QMTctNzUwMDYucG5nIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvUmF0dHNIUy5qcGciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9SYXltdXNBbnRpbGxlcy5qcGciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9SaWNfT2xpZS5qcGciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9Sb29zLVRhcnBhbHMucG5nIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvUnVnb3JOYXNzLVNXQ1QucG5nIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvU2Flc2VlLVRpaW4ucG5nIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvU2FuX0hpbGwucG5nIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvU2VidWxiYS5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9TaGFha3RpX2RldGFpbC5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9TaG1pLVNreXdhbGtlci5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9TbHktTW9vcmUucG5nIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvVGFya2luLVNXRS5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9UYXVuLVdlLnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyc0ZpbG0vaW1nL1Rpb25fTWVkb24ud2VicCIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyc0ZpbG0vaW1nL1ZhbG9ydW0tU1dFLnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyc0ZpbG0vaW1nL1dhdF9UYW1ib3IucG5nIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvV2F0dG8ucG5nIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvV2VkZ2VfQW50aWxsZXMucG5nIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvWWFyYWVsLVBvb2YucG5nIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvWmFtX1dlc2VsbC5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9hY2tiYXIuanBnIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvYmliX2ZvcnR1bmEucG5nIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvYm9iYS1mZXR0LnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyc0ZpbG0vaW1nL2Jvc3NrLnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyc0ZpbG0vaW1nL2MtM3BvLnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyc0ZpbG0vaW1nL2NoZXdiYWNjYS5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9jbGllZ2dsYXJzX2RldGFpbC5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9kYXJrX3dhaWRlci5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9kZXh0ZXJqZXR0c3Rlcl9kZXRhaWwucG5nIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvZG9va3UucG5nIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvZ2VuZXJhbC1ncmlldm91cy5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9ncmVlZG8uanBnIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvaWotODgtamFiYmFwbmcucG5nIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvamFiYmEtdGhlLWh1dHQtYm9iYS1mZXR0LXlvZGEuanBlZyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyc0ZpbG0vaW1nL2xhbmRvLWNhbHJpc3NpYW4uanBnIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvbGVpbGEgb3JnYW5hLnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyc0ZpbG0vaW1nL2x1a2Utc2t5d2Fsa2VyLnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyc0ZpbG0vaW1nL21hY2Utd2luZHUucG5nIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvbWF4cmVzZGVmYXVsdC5qcGciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9uaWVuLW51bmIucG5nIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvb3dlbi1sYXJzLnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyc0ZpbG0vaW1nL3BhbHBhdGluZS5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9yMi1kMi5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9yNS1kNC5qcGciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy90YXJmZnVsX2RldGFpbC5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy93YW4ta2Vub2JpLnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyc0ZpbG0vaW1nL3dpY2tldF93X3dhcndpY2sucG5nIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcveW9kYS5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL3ZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2h3MTEvY2hhaW4uY3NzIiwid2VicGFjazovLy8uL3NyYy9odzExL3ZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2h3MTMvZ2VuZXJhdG9yLmNzcyIsIndlYnBhY2s6Ly8vLi9zcmMvaHcxMy9nZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2h3MTMvaW1nL0ZBVlBOR19za3ktYmx1ZS1jbG91ZC1kZXNrdG9wLXdhbGxwYXBlcl9aWmhXcGZBUS5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2h3MTMvaW1nL2Nsb3VkX1BORzI0LnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvaHcxMy9pbWcvbW91bnRhaW5fUE5HMi5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2h3MTMvdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaHc0L3N0dWRlbnRzLmNzcyIsIndlYnBhY2s6Ly8vLi9zcmMvaHc0L3N0dWRlbnRzQ2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaHc0L3ZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2h3Ni9zdHVkZW50LmNzcyIsIndlYnBhY2s6Ly8vLi9zcmMvaHc2L3N0dWRlbnREYXRhLmpzIiwid2VicGFjazovLy8uL3NyYy9odzYvc3R1ZGVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2h3Ni92aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9odzkvZ2VuQmxvY2tzLmNzcyIsIndlYnBhY2s6Ly8vLi9zcmMvaHc5L2dlbkJsb2Nrcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMx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O0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGFBQWE7QUFDeEIsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQ0FBbUMsT0FBTztBQUMxQztBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsU0FBUyxHQUFHLFNBQVM7QUFDNUMsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCw0QkFBNEI7QUFDNUIsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQSx1Q0FBdUMsT0FBTztBQUM5QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzlWQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDOztBQUVyQztBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixVQUFVOzs7Ozs7Ozs7Ozs7O0FDdkx0QztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlLDhFQUFlLEVBQUM7Ozs7Ozs7Ozs7OztBQ3RGL0IsdUM7Ozs7Ozs7Ozs7OztBQ0FBO0FBQUE7QUFBQTtBQUEwQjs7QUFFMUI7O0FBRUE7QUFDQSxrQkFBa0IsNENBQUs7QUFDdkI7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRWUsZ0VBQUMsVUFBVSxFQUFDOzs7Ozs7Ozs7Ozs7O0FDbEIzQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBdUM7QUFDSjtBQUNUO0FBQ087O0FBRWpDO0FBQ0E7O0FBRWU7QUFDZjtBQUNBO0FBQ0E7QUFDQSxJQUFJLG1EQUFXLGdDQUFnQyw2Q0FBYTtBQUM1RCxHQUFHO0FBQ0gsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ2REO0FBQWUscUZBQXNCLEU7Ozs7Ozs7Ozs7OztBQ0FyQztBQUFlLDJGQUE0QixFOzs7Ozs7Ozs7Ozs7QUNBM0M7QUFBZSxzRkFBdUIsRTs7Ozs7Ozs7Ozs7O0FDQXRDO0FBQWUsc0ZBQXVCLEU7Ozs7Ozs7Ozs7OztBQ0F0QztBQUFlLHNGQUF1QixFOzs7Ozs7Ozs7Ozs7QUNBdEM7QUFBZSx3RkFBeUIsRTs7Ozs7Ozs7Ozs7O0FDQXhDO0FBQWUsOEZBQStCLEU7Ozs7Ozs7Ozs7OztBQ0E5QztBQUFlLHFGQUFzQixFOzs7Ozs7Ozs7Ozs7QUNBckM7QUFBZSw0RkFBNkIsRTs7Ozs7Ozs7Ozs7O0FDQTVDO0FBQWUsMEZBQTJCLEU7Ozs7Ozs7Ozs7OztBQ0ExQztBQUFlLGdGQUFpQixFOzs7Ozs7Ozs7Ozs7QUNBaEM7QUFBZSxxRkFBc0IsRTs7Ozs7Ozs7Ozs7O0FDQXJDO0FBQWUsZ0ZBQWlCLEU7Ozs7Ozs7Ozs7OztBQ0FoQztBQUFlLG1GQUFvQixFOzs7Ozs7Ozs7Ozs7QUNBbkM7QUFBZSxvRkFBcUIsRTs7Ozs7Ozs7Ozs7O0FDQXBDO0FBQWUsa0ZBQW1CLEU7Ozs7Ozs7Ozs7OztBQ0FsQztBQUFlLHVGQUF3QixFOzs7Ozs7Ozs7Ozs7QUNBdkM7QUFBZSxtRkFBb0IsRTs7Ozs7Ozs7Ozs7O0FDQW5DO0FBQWUscUZBQXNCLEU7Ozs7Ozs7Ozs7OztBQ0FyQztBQUFlLHdGQUF5QixFOzs7Ozs7Ozs7Ozs7QUNBeEM7QUFBZSwyRkFBNEIsRTs7Ozs7Ozs7Ozs7O0FDQTNDO0FBQWUscUZBQXNCLEU7Ozs7Ozs7Ozs7OztBQ0FyQztBQUFlLHVGQUF3QixFOzs7Ozs7Ozs7Ozs7QUNBdkM7QUFBZSxxRkFBc0IsRTs7Ozs7Ozs7Ozs7O0FDQXJDO0FBQWUsa0ZBQW1CLEU7Ozs7Ozs7Ozs7OztBQ0FsQztBQUFlLDBGQUEyQixFOzs7Ozs7Ozs7Ozs7QUNBMUM7QUFBZSxxRkFBc0IsRTs7Ozs7Ozs7Ozs7O0FDQXJDO0FBQWUscUZBQXNCLEU7Ozs7Ozs7Ozs7OztBQ0FyQztBQUFlLHNGQUF1QixFOzs7Ozs7Ozs7Ozs7QUNBdEM7QUFBZSx3RkFBeUIsRTs7Ozs7Ozs7Ozs7O0FDQXhDO0FBQWUsb0ZBQXFCLEU7Ozs7Ozs7Ozs7OztBQ0FwQztBQUFlLGlHQUFrQyxFOzs7Ozs7Ozs7Ozs7QUNBakQ7QUFBZSx3RkFBeUIsRTs7Ozs7Ozs7Ozs7O0FDQXhDO0FBQWUsdUZBQXdCLEU7Ozs7Ozs7Ozs7OztBQ0F2QztBQUFlLHVGQUF3QixFOzs7Ozs7Ozs7Ozs7QUNBdkM7QUFBZSxrRkFBbUIsRTs7Ozs7Ozs7Ozs7O0FDQWxDO0FBQWUseUZBQTBCLEU7Ozs7Ozs7Ozs7OztBQ0F6QztBQUFlLG1GQUFvQixFOzs7Ozs7Ozs7Ozs7QUNBbkM7QUFBZSx1RkFBd0IsRTs7Ozs7Ozs7Ozs7O0FDQXZDO0FBQWUseUZBQTBCLEU7Ozs7Ozs7Ozs7OztBQ0F6QztBQUFlLHNGQUF1QixFOzs7Ozs7Ozs7Ozs7QUNBdEM7QUFBZSxtRkFBb0IsRTs7Ozs7Ozs7Ozs7O0FDQW5DO0FBQWUsa0ZBQW1CLEU7Ozs7Ozs7Ozs7OztBQ0FsQztBQUFlLHlGQUEwQixFOzs7Ozs7Ozs7Ozs7QUNBekM7QUFBZSx5RkFBMEIsRTs7Ozs7Ozs7Ozs7O0FDQXpDO0FBQWUsb0ZBQXFCLEU7Ozs7Ozs7Ozs7OztBQ0FwQztBQUFlLHFGQUFzQixFOzs7Ozs7Ozs7Ozs7QUNBckM7QUFBZSxrRkFBbUIsRTs7Ozs7Ozs7Ozs7O0FDQWxDO0FBQWUsc0ZBQXVCLEU7Ozs7Ozs7Ozs7OztBQ0F0QztBQUFlLHNGQUF1QixFOzs7Ozs7Ozs7Ozs7QUNBdEM7QUFBZSxxRkFBc0IsRTs7Ozs7Ozs7Ozs7O0FDQXJDO0FBQWUsZ0ZBQWlCLEU7Ozs7Ozs7Ozs7OztBQ0FoQztBQUFlLHlGQUEwQixFOzs7Ozs7Ozs7Ozs7QUNBekM7QUFBZSxzRkFBdUIsRTs7Ozs7Ozs7Ozs7O0FDQXRDO0FBQWUscUZBQXNCLEU7Ozs7Ozs7Ozs7OztBQ0FyQztBQUFlLGlGQUFrQixFOzs7Ozs7Ozs7Ozs7QUNBakM7QUFBZSxzRkFBdUIsRTs7Ozs7Ozs7Ozs7O0FDQXRDO0FBQWUsb0ZBQXFCLEU7Ozs7Ozs7Ozs7OztBQ0FwQztBQUFlLGdGQUFpQixFOzs7Ozs7Ozs7Ozs7QUNBaEM7QUFBZSxnRkFBaUIsRTs7Ozs7Ozs7Ozs7O0FDQWhDO0FBQWUsb0ZBQXFCLEU7Ozs7Ozs7Ozs7OztBQ0FwQztBQUFlLDRGQUE2QixFOzs7Ozs7Ozs7Ozs7QUNBNUM7QUFBZSxzRkFBdUIsRTs7Ozs7Ozs7Ozs7O0FDQXRDO0FBQWUsZ0dBQWlDLEU7Ozs7Ozs7Ozs7OztBQ0FoRDtBQUFlLGdGQUFpQixFOzs7Ozs7Ozs7Ozs7QUNBaEM7QUFBZSwyRkFBNEIsRTs7Ozs7Ozs7Ozs7O0FDQTNDO0FBQWUsaUZBQWtCLEU7Ozs7Ozs7Ozs7OztBQ0FqQztBQUFlLHlGQUEwQixFOzs7Ozs7Ozs7Ozs7QUNBekM7QUFBZSx5R0FBMEMsRTs7Ozs7Ozs7Ozs7O0FDQXpEO0FBQWUsMkZBQTRCLEU7Ozs7Ozs7Ozs7OztBQ0EzQztBQUFlLHVGQUF3QixFOzs7Ozs7Ozs7Ozs7QUNBdkM7QUFBZSx5RkFBMEIsRTs7Ozs7Ozs7Ozs7O0FDQXpDO0FBQWUscUZBQXNCLEU7Ozs7Ozs7Ozs7OztBQ0FyQztBQUFlLHdGQUF5QixFOzs7Ozs7Ozs7Ozs7QUNBeEM7QUFBZSxvRkFBcUIsRTs7Ozs7Ozs7Ozs7O0FDQXBDO0FBQWUsb0ZBQXFCLEU7Ozs7Ozs7Ozs7OztBQ0FwQztBQUFlLG9GQUFxQixFOzs7Ozs7Ozs7Ozs7QUNBcEM7QUFBZSxnRkFBaUIsRTs7Ozs7Ozs7Ozs7O0FDQWhDO0FBQWUsZ0ZBQWlCLEU7Ozs7Ozs7Ozs7OztBQ0FoQztBQUFlLHlGQUEwQixFOzs7Ozs7Ozs7Ozs7QUNBekM7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QUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLE9BQU8sT0FBTztBQUNkLEdBQUc7QUFDSCxDQUFDOzs7Ozs7Ozs7Ozs7O0FDM0NEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQXlEO0FBQ2pCO0FBQ0o7QUFDUTtBQUNOO0FBQ0c7O0FBRXpDLDBEQUFhO0FBQ2IsMEVBQWM7QUFDZCwwREFBUztBQUNULDhEQUFhO0FBQ2IseURBQVk7QUFDWix5REFBZSIsImZpbGUiOiJtYWluLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9heGlvcycpOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcclxudmFyIHNldHRsZSA9IHJlcXVpcmUoJy4vLi4vY29yZS9zZXR0bGUnKTtcclxudmFyIGNvb2tpZXMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29va2llcycpO1xyXG52YXIgYnVpbGRVUkwgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvYnVpbGRVUkwnKTtcclxudmFyIGJ1aWxkRnVsbFBhdGggPSByZXF1aXJlKCcuLi9jb3JlL2J1aWxkRnVsbFBhdGgnKTtcclxudmFyIHBhcnNlSGVhZGVycyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9wYXJzZUhlYWRlcnMnKTtcclxudmFyIGlzVVJMU2FtZU9yaWdpbiA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9pc1VSTFNhbWVPcmlnaW4nKTtcclxudmFyIGNyZWF0ZUVycm9yID0gcmVxdWlyZSgnLi4vY29yZS9jcmVhdGVFcnJvcicpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB4aHJBZGFwdGVyKGNvbmZpZykge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBkaXNwYXRjaFhoclJlcXVlc3QocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICB2YXIgcmVxdWVzdERhdGEgPSBjb25maWcuZGF0YTtcclxuICAgIHZhciByZXF1ZXN0SGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzO1xyXG5cclxuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKHJlcXVlc3REYXRhKSkge1xyXG4gICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddOyAvLyBMZXQgdGhlIGJyb3dzZXIgc2V0IGl0XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICAodXRpbHMuaXNCbG9iKHJlcXVlc3REYXRhKSB8fCB1dGlscy5pc0ZpbGUocmVxdWVzdERhdGEpKSAmJlxyXG4gICAgICByZXF1ZXN0RGF0YS50eXBlXHJcbiAgICApIHtcclxuICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzWydDb250ZW50LVR5cGUnXTsgLy8gTGV0IHRoZSBicm93c2VyIHNldCBpdFxyXG4gICAgfVxyXG5cclxuICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcblxyXG4gICAgLy8gSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvblxyXG4gICAgaWYgKGNvbmZpZy5hdXRoKSB7XHJcbiAgICAgIHZhciB1c2VybmFtZSA9IGNvbmZpZy5hdXRoLnVzZXJuYW1lIHx8ICcnO1xyXG4gICAgICB2YXIgcGFzc3dvcmQgPSB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoY29uZmlnLmF1dGgucGFzc3dvcmQpKSB8fCAnJztcclxuICAgICAgcmVxdWVzdEhlYWRlcnMuQXV0aG9yaXphdGlvbiA9ICdCYXNpYyAnICsgYnRvYSh1c2VybmFtZSArICc6JyArIHBhc3N3b3JkKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZnVsbFBhdGggPSBidWlsZEZ1bGxQYXRoKGNvbmZpZy5iYXNlVVJMLCBjb25maWcudXJsKTtcclxuICAgIHJlcXVlc3Qub3Blbihjb25maWcubWV0aG9kLnRvVXBwZXJDYXNlKCksIGJ1aWxkVVJMKGZ1bGxQYXRoLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplciksIHRydWUpO1xyXG5cclxuICAgIC8vIFNldCB0aGUgcmVxdWVzdCB0aW1lb3V0IGluIE1TXHJcbiAgICByZXF1ZXN0LnRpbWVvdXQgPSBjb25maWcudGltZW91dDtcclxuXHJcbiAgICAvLyBMaXN0ZW4gZm9yIHJlYWR5IHN0YXRlXHJcbiAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uIGhhbmRsZUxvYWQoKSB7XHJcbiAgICAgIGlmICghcmVxdWVzdCB8fCByZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFRoZSByZXF1ZXN0IGVycm9yZWQgb3V0IGFuZCB3ZSBkaWRuJ3QgZ2V0IGEgcmVzcG9uc2UsIHRoaXMgd2lsbCBiZVxyXG4gICAgICAvLyBoYW5kbGVkIGJ5IG9uZXJyb3IgaW5zdGVhZFxyXG4gICAgICAvLyBXaXRoIG9uZSBleGNlcHRpb246IHJlcXVlc3QgdGhhdCB1c2luZyBmaWxlOiBwcm90b2NvbCwgbW9zdCBicm93c2Vyc1xyXG4gICAgICAvLyB3aWxsIHJldHVybiBzdGF0dXMgYXMgMCBldmVuIHRob3VnaCBpdCdzIGEgc3VjY2Vzc2Z1bCByZXF1ZXN0XHJcbiAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCAmJiAhKHJlcXVlc3QucmVzcG9uc2VVUkwgJiYgcmVxdWVzdC5yZXNwb25zZVVSTC5pbmRleE9mKCdmaWxlOicpID09PSAwKSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gUHJlcGFyZSB0aGUgcmVzcG9uc2VcclxuICAgICAgdmFyIHJlc3BvbnNlSGVhZGVycyA9ICdnZXRBbGxSZXNwb25zZUhlYWRlcnMnIGluIHJlcXVlc3QgPyBwYXJzZUhlYWRlcnMocmVxdWVzdC5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSkgOiBudWxsO1xyXG4gICAgICB2YXIgcmVzcG9uc2VEYXRhID0gIWNvbmZpZy5yZXNwb25zZVR5cGUgfHwgY29uZmlnLnJlc3BvbnNlVHlwZSA9PT0gJ3RleHQnID8gcmVxdWVzdC5yZXNwb25zZVRleHQgOiByZXF1ZXN0LnJlc3BvbnNlO1xyXG4gICAgICB2YXIgcmVzcG9uc2UgPSB7XHJcbiAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLFxyXG4gICAgICAgIHN0YXR1czogcmVxdWVzdC5zdGF0dXMsXHJcbiAgICAgICAgc3RhdHVzVGV4dDogcmVxdWVzdC5zdGF0dXNUZXh0LFxyXG4gICAgICAgIGhlYWRlcnM6IHJlc3BvbnNlSGVhZGVycyxcclxuICAgICAgICBjb25maWc6IGNvbmZpZyxcclxuICAgICAgICByZXF1ZXN0OiByZXF1ZXN0XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSk7XHJcblxyXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XHJcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBIYW5kbGUgYnJvd3NlciByZXF1ZXN0IGNhbmNlbGxhdGlvbiAoYXMgb3Bwb3NlZCB0byBhIG1hbnVhbCBjYW5jZWxsYXRpb24pXHJcbiAgICByZXF1ZXN0Lm9uYWJvcnQgPSBmdW5jdGlvbiBoYW5kbGVBYm9ydCgpIHtcclxuICAgICAgaWYgKCFyZXF1ZXN0KSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ1JlcXVlc3QgYWJvcnRlZCcsIGNvbmZpZywgJ0VDT05OQUJPUlRFRCcsIHJlcXVlc3QpKTtcclxuXHJcbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcclxuICAgICAgcmVxdWVzdCA9IG51bGw7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEhhbmRsZSBsb3cgbGV2ZWwgbmV0d29yayBlcnJvcnNcclxuICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uIGhhbmRsZUVycm9yKCkge1xyXG4gICAgICAvLyBSZWFsIGVycm9ycyBhcmUgaGlkZGVuIGZyb20gdXMgYnkgdGhlIGJyb3dzZXJcclxuICAgICAgLy8gb25lcnJvciBzaG91bGQgb25seSBmaXJlIGlmIGl0J3MgYSBuZXR3b3JrIGVycm9yXHJcbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcignTmV0d29yayBFcnJvcicsIGNvbmZpZywgbnVsbCwgcmVxdWVzdCkpO1xyXG5cclxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxyXG4gICAgICByZXF1ZXN0ID0gbnVsbDtcclxuICAgIH07XHJcblxyXG4gICAgLy8gSGFuZGxlIHRpbWVvdXRcclxuICAgIHJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gaGFuZGxlVGltZW91dCgpIHtcclxuICAgICAgdmFyIHRpbWVvdXRFcnJvck1lc3NhZ2UgPSAndGltZW91dCBvZiAnICsgY29uZmlnLnRpbWVvdXQgKyAnbXMgZXhjZWVkZWQnO1xyXG4gICAgICBpZiAoY29uZmlnLnRpbWVvdXRFcnJvck1lc3NhZ2UpIHtcclxuICAgICAgICB0aW1lb3V0RXJyb3JNZXNzYWdlID0gY29uZmlnLnRpbWVvdXRFcnJvck1lc3NhZ2U7XHJcbiAgICAgIH1cclxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKHRpbWVvdXRFcnJvck1lc3NhZ2UsIGNvbmZpZywgJ0VDT05OQUJPUlRFRCcsXHJcbiAgICAgICAgcmVxdWVzdCkpO1xyXG5cclxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxyXG4gICAgICByZXF1ZXN0ID0gbnVsbDtcclxuICAgIH07XHJcblxyXG4gICAgLy8gQWRkIHhzcmYgaGVhZGVyXHJcbiAgICAvLyBUaGlzIGlzIG9ubHkgZG9uZSBpZiBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudC5cclxuICAgIC8vIFNwZWNpZmljYWxseSBub3QgaWYgd2UncmUgaW4gYSB3ZWIgd29ya2VyLCBvciByZWFjdC1uYXRpdmUuXHJcbiAgICBpZiAodXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSkge1xyXG4gICAgICAvLyBBZGQgeHNyZiBoZWFkZXJcclxuICAgICAgdmFyIHhzcmZWYWx1ZSA9IChjb25maWcud2l0aENyZWRlbnRpYWxzIHx8IGlzVVJMU2FtZU9yaWdpbihmdWxsUGF0aCkpICYmIGNvbmZpZy54c3JmQ29va2llTmFtZSA/XHJcbiAgICAgICAgY29va2llcy5yZWFkKGNvbmZpZy54c3JmQ29va2llTmFtZSkgOlxyXG4gICAgICAgIHVuZGVmaW5lZDtcclxuXHJcbiAgICAgIGlmICh4c3JmVmFsdWUpIHtcclxuICAgICAgICByZXF1ZXN0SGVhZGVyc1tjb25maWcueHNyZkhlYWRlck5hbWVdID0geHNyZlZhbHVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQWRkIGhlYWRlcnMgdG8gdGhlIHJlcXVlc3RcclxuICAgIGlmICgnc2V0UmVxdWVzdEhlYWRlcicgaW4gcmVxdWVzdCkge1xyXG4gICAgICB1dGlscy5mb3JFYWNoKHJlcXVlc3RIZWFkZXJzLCBmdW5jdGlvbiBzZXRSZXF1ZXN0SGVhZGVyKHZhbCwga2V5KSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiByZXF1ZXN0RGF0YSA9PT0gJ3VuZGVmaW5lZCcgJiYga2V5LnRvTG93ZXJDYXNlKCkgPT09ICdjb250ZW50LXR5cGUnKSB7XHJcbiAgICAgICAgICAvLyBSZW1vdmUgQ29udGVudC1UeXBlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXHJcbiAgICAgICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNba2V5XTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gT3RoZXJ3aXNlIGFkZCBoZWFkZXIgdG8gdGhlIHJlcXVlc3RcclxuICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBBZGQgd2l0aENyZWRlbnRpYWxzIHRvIHJlcXVlc3QgaWYgbmVlZGVkXHJcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMpKSB7XHJcbiAgICAgIHJlcXVlc3Qud2l0aENyZWRlbnRpYWxzID0gISFjb25maWcud2l0aENyZWRlbnRpYWxzO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEFkZCByZXNwb25zZVR5cGUgdG8gcmVxdWVzdCBpZiBuZWVkZWRcclxuICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSBjb25maWcucmVzcG9uc2VUeXBlO1xyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgLy8gRXhwZWN0ZWQgRE9NRXhjZXB0aW9uIHRocm93biBieSBicm93c2VycyBub3QgY29tcGF0aWJsZSBYTUxIdHRwUmVxdWVzdCBMZXZlbCAyLlxyXG4gICAgICAgIC8vIEJ1dCwgdGhpcyBjYW4gYmUgc3VwcHJlc3NlZCBmb3IgJ2pzb24nIHR5cGUgYXMgaXQgY2FuIGJlIHBhcnNlZCBieSBkZWZhdWx0ICd0cmFuc2Zvcm1SZXNwb25zZScgZnVuY3Rpb24uXHJcbiAgICAgICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUgIT09ICdqc29uJykge1xyXG4gICAgICAgICAgdGhyb3cgZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBIYW5kbGUgcHJvZ3Jlc3MgaWYgbmVlZGVkXHJcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE5vdCBhbGwgYnJvd3NlcnMgc3VwcG9ydCB1cGxvYWQgZXZlbnRzXHJcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nICYmIHJlcXVlc3QudXBsb2FkKSB7XHJcbiAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcclxuICAgICAgLy8gSGFuZGxlIGNhbmNlbGxhdGlvblxyXG4gICAgICBjb25maWcuY2FuY2VsVG9rZW4ucHJvbWlzZS50aGVuKGZ1bmN0aW9uIG9uQ2FuY2VsZWQoY2FuY2VsKSB7XHJcbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXF1ZXN0LmFib3J0KCk7XHJcbiAgICAgICAgcmVqZWN0KGNhbmNlbCk7XHJcbiAgICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxyXG4gICAgICAgIHJlcXVlc3QgPSBudWxsO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXJlcXVlc3REYXRhKSB7XHJcbiAgICAgIHJlcXVlc3REYXRhID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTZW5kIHRoZSByZXF1ZXN0XHJcbiAgICByZXF1ZXN0LnNlbmQocmVxdWVzdERhdGEpO1xyXG4gIH0pO1xyXG59O1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XHJcbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcclxudmFyIEF4aW9zID0gcmVxdWlyZSgnLi9jb3JlL0F4aW9zJyk7XHJcbnZhciBtZXJnZUNvbmZpZyA9IHJlcXVpcmUoJy4vY29yZS9tZXJnZUNvbmZpZycpO1xyXG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRzJyk7XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIEF4aW9zXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0Q29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXHJcbiAqIEByZXR1cm4ge0F4aW9zfSBBIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xyXG4gKi9cclxuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdENvbmZpZykge1xyXG4gIHZhciBjb250ZXh0ID0gbmV3IEF4aW9zKGRlZmF1bHRDb25maWcpO1xyXG4gIHZhciBpbnN0YW5jZSA9IGJpbmQoQXhpb3MucHJvdG90eXBlLnJlcXVlc3QsIGNvbnRleHQpO1xyXG5cclxuICAvLyBDb3B5IGF4aW9zLnByb3RvdHlwZSB0byBpbnN0YW5jZVxyXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgQXhpb3MucHJvdG90eXBlLCBjb250ZXh0KTtcclxuXHJcbiAgLy8gQ29weSBjb250ZXh0IHRvIGluc3RhbmNlXHJcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBjb250ZXh0KTtcclxuXHJcbiAgcmV0dXJuIGluc3RhbmNlO1xyXG59XHJcblxyXG4vLyBDcmVhdGUgdGhlIGRlZmF1bHQgaW5zdGFuY2UgdG8gYmUgZXhwb3J0ZWRcclxudmFyIGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMpO1xyXG5cclxuLy8gRXhwb3NlIEF4aW9zIGNsYXNzIHRvIGFsbG93IGNsYXNzIGluaGVyaXRhbmNlXHJcbmF4aW9zLkF4aW9zID0gQXhpb3M7XHJcblxyXG4vLyBGYWN0b3J5IGZvciBjcmVhdGluZyBuZXcgaW5zdGFuY2VzXHJcbmF4aW9zLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpbnN0YW5jZUNvbmZpZykge1xyXG4gIHJldHVybiBjcmVhdGVJbnN0YW5jZShtZXJnZUNvbmZpZyhheGlvcy5kZWZhdWx0cywgaW5zdGFuY2VDb25maWcpKTtcclxufTtcclxuXHJcbi8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxyXG5heGlvcy5DYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWwnKTtcclxuYXhpb3MuQ2FuY2VsVG9rZW4gPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWxUb2tlbicpO1xyXG5heGlvcy5pc0NhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL2lzQ2FuY2VsJyk7XHJcblxyXG4vLyBFeHBvc2UgYWxsL3NwcmVhZFxyXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcclxuICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xyXG59O1xyXG5heGlvcy5zcHJlYWQgPSByZXF1aXJlKCcuL2hlbHBlcnMvc3ByZWFkJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGF4aW9zO1xyXG5cclxuLy8gQWxsb3cgdXNlIG9mIGRlZmF1bHQgaW1wb3J0IHN5bnRheCBpbiBUeXBlU2NyaXB0XHJcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBheGlvcztcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIEEgYENhbmNlbGAgaXMgYW4gb2JqZWN0IHRoYXQgaXMgdGhyb3duIHdoZW4gYW4gb3BlcmF0aW9uIGlzIGNhbmNlbGVkLlxyXG4gKlxyXG4gKiBAY2xhc3NcclxuICogQHBhcmFtIHtzdHJpbmc9fSBtZXNzYWdlIFRoZSBtZXNzYWdlLlxyXG4gKi9cclxuZnVuY3Rpb24gQ2FuY2VsKG1lc3NhZ2UpIHtcclxuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xyXG59XHJcblxyXG5DYW5jZWwucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XHJcbiAgcmV0dXJuICdDYW5jZWwnICsgKHRoaXMubWVzc2FnZSA/ICc6ICcgKyB0aGlzLm1lc3NhZ2UgOiAnJyk7XHJcbn07XHJcblxyXG5DYW5jZWwucHJvdG90eXBlLl9fQ0FOQ0VMX18gPSB0cnVlO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWw7XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBDYW5jZWwgPSByZXF1aXJlKCcuL0NhbmNlbCcpO1xyXG5cclxuLyoqXHJcbiAqIEEgYENhbmNlbFRva2VuYCBpcyBhbiBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byByZXF1ZXN0IGNhbmNlbGxhdGlvbiBvZiBhbiBvcGVyYXRpb24uXHJcbiAqXHJcbiAqIEBjbGFzc1xyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBleGVjdXRvciBUaGUgZXhlY3V0b3IgZnVuY3Rpb24uXHJcbiAqL1xyXG5mdW5jdGlvbiBDYW5jZWxUb2tlbihleGVjdXRvcikge1xyXG4gIGlmICh0eXBlb2YgZXhlY3V0b3IgIT09ICdmdW5jdGlvbicpIHtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4ZWN1dG9yIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcclxuICB9XHJcblxyXG4gIHZhciByZXNvbHZlUHJvbWlzZTtcclxuICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiBwcm9taXNlRXhlY3V0b3IocmVzb2x2ZSkge1xyXG4gICAgcmVzb2x2ZVByb21pc2UgPSByZXNvbHZlO1xyXG4gIH0pO1xyXG5cclxuICB2YXIgdG9rZW4gPSB0aGlzO1xyXG4gIGV4ZWN1dG9yKGZ1bmN0aW9uIGNhbmNlbChtZXNzYWdlKSB7XHJcbiAgICBpZiAodG9rZW4ucmVhc29uKSB7XHJcbiAgICAgIC8vIENhbmNlbGxhdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHJlcXVlc3RlZFxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdG9rZW4ucmVhc29uID0gbmV3IENhbmNlbChtZXNzYWdlKTtcclxuICAgIHJlc29sdmVQcm9taXNlKHRva2VuLnJlYXNvbik7XHJcbiAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxyXG4gKi9cclxuQ2FuY2VsVG9rZW4ucHJvdG90eXBlLnRocm93SWZSZXF1ZXN0ZWQgPSBmdW5jdGlvbiB0aHJvd0lmUmVxdWVzdGVkKCkge1xyXG4gIGlmICh0aGlzLnJlYXNvbikge1xyXG4gICAgdGhyb3cgdGhpcy5yZWFzb247XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgYSBuZXcgYENhbmNlbFRva2VuYCBhbmQgYSBmdW5jdGlvbiB0aGF0LCB3aGVuIGNhbGxlZCxcclxuICogY2FuY2VscyB0aGUgYENhbmNlbFRva2VuYC5cclxuICovXHJcbkNhbmNlbFRva2VuLnNvdXJjZSA9IGZ1bmN0aW9uIHNvdXJjZSgpIHtcclxuICB2YXIgY2FuY2VsO1xyXG4gIHZhciB0b2tlbiA9IG5ldyBDYW5jZWxUb2tlbihmdW5jdGlvbiBleGVjdXRvcihjKSB7XHJcbiAgICBjYW5jZWwgPSBjO1xyXG4gIH0pO1xyXG4gIHJldHVybiB7XHJcbiAgICB0b2tlbjogdG9rZW4sXHJcbiAgICBjYW5jZWw6IGNhbmNlbFxyXG4gIH07XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbFRva2VuO1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQ2FuY2VsKHZhbHVlKSB7XHJcbiAgcmV0dXJuICEhKHZhbHVlICYmIHZhbHVlLl9fQ0FOQ0VMX18pO1xyXG59O1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XHJcbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvYnVpbGRVUkwnKTtcclxudmFyIEludGVyY2VwdG9yTWFuYWdlciA9IHJlcXVpcmUoJy4vSW50ZXJjZXB0b3JNYW5hZ2VyJyk7XHJcbnZhciBkaXNwYXRjaFJlcXVlc3QgPSByZXF1aXJlKCcuL2Rpc3BhdGNoUmVxdWVzdCcpO1xyXG52YXIgbWVyZ2VDb25maWcgPSByZXF1aXJlKCcuL21lcmdlQ29uZmlnJyk7XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZUNvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxyXG4gKi9cclxuZnVuY3Rpb24gQXhpb3MoaW5zdGFuY2VDb25maWcpIHtcclxuICB0aGlzLmRlZmF1bHRzID0gaW5zdGFuY2VDb25maWc7XHJcbiAgdGhpcy5pbnRlcmNlcHRvcnMgPSB7XHJcbiAgICByZXF1ZXN0OiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKCksXHJcbiAgICByZXNwb25zZTogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpXHJcbiAgfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIERpc3BhdGNoIGEgcmVxdWVzdFxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcgc3BlY2lmaWMgZm9yIHRoaXMgcmVxdWVzdCAobWVyZ2VkIHdpdGggdGhpcy5kZWZhdWx0cylcclxuICovXHJcbkF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0ID0gZnVuY3Rpb24gcmVxdWVzdChjb25maWcpIHtcclxuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cclxuICAvLyBBbGxvdyBmb3IgYXhpb3MoJ2V4YW1wbGUvdXJsJ1ssIGNvbmZpZ10pIGEgbGEgZmV0Y2ggQVBJXHJcbiAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XHJcbiAgICBjb25maWcgPSBhcmd1bWVudHNbMV0gfHwge307XHJcbiAgICBjb25maWcudXJsID0gYXJndW1lbnRzWzBdO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjb25maWcgPSBjb25maWcgfHwge307XHJcbiAgfVxyXG5cclxuICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xyXG5cclxuICAvLyBTZXQgY29uZmlnLm1ldGhvZFxyXG4gIGlmIChjb25maWcubWV0aG9kKSB7XHJcbiAgICBjb25maWcubWV0aG9kID0gY29uZmlnLm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xyXG4gIH0gZWxzZSBpZiAodGhpcy5kZWZhdWx0cy5tZXRob2QpIHtcclxuICAgIGNvbmZpZy5tZXRob2QgPSB0aGlzLmRlZmF1bHRzLm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjb25maWcubWV0aG9kID0gJ2dldCc7XHJcbiAgfVxyXG5cclxuICAvLyBIb29rIHVwIGludGVyY2VwdG9ycyBtaWRkbGV3YXJlXHJcbiAgdmFyIGNoYWluID0gW2Rpc3BhdGNoUmVxdWVzdCwgdW5kZWZpbmVkXTtcclxuICB2YXIgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShjb25maWcpO1xyXG5cclxuICB0aGlzLmludGVyY2VwdG9ycy5yZXF1ZXN0LmZvckVhY2goZnVuY3Rpb24gdW5zaGlmdFJlcXVlc3RJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcclxuICAgIGNoYWluLnVuc2hpZnQoaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XHJcbiAgfSk7XHJcblxyXG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLmZvckVhY2goZnVuY3Rpb24gcHVzaFJlc3BvbnNlSW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XHJcbiAgICBjaGFpbi5wdXNoKGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xyXG4gIH0pO1xyXG5cclxuICB3aGlsZSAoY2hhaW4ubGVuZ3RoKSB7XHJcbiAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKGNoYWluLnNoaWZ0KCksIGNoYWluLnNoaWZ0KCkpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHByb21pc2U7XHJcbn07XHJcblxyXG5BeGlvcy5wcm90b3R5cGUuZ2V0VXJpID0gZnVuY3Rpb24gZ2V0VXJpKGNvbmZpZykge1xyXG4gIGNvbmZpZyA9IG1lcmdlQ29uZmlnKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XHJcbiAgcmV0dXJuIGJ1aWxkVVJMKGNvbmZpZy51cmwsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKS5yZXBsYWNlKC9eXFw/LywgJycpO1xyXG59O1xyXG5cclxuLy8gUHJvdmlkZSBhbGlhc2VzIGZvciBzdXBwb3J0ZWQgcmVxdWVzdCBtZXRob2RzXHJcbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAnb3B0aW9ucyddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xyXG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXHJcbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGNvbmZpZykge1xyXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChtZXJnZUNvbmZpZyhjb25maWcgfHwge30sIHtcclxuICAgICAgbWV0aG9kOiBtZXRob2QsXHJcbiAgICAgIHVybDogdXJsXHJcbiAgICB9KSk7XHJcbiAgfTtcclxufSk7XHJcblxyXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xyXG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXHJcbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGRhdGEsIGNvbmZpZykge1xyXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChtZXJnZUNvbmZpZyhjb25maWcgfHwge30sIHtcclxuICAgICAgbWV0aG9kOiBtZXRob2QsXHJcbiAgICAgIHVybDogdXJsLFxyXG4gICAgICBkYXRhOiBkYXRhXHJcbiAgICB9KSk7XHJcbiAgfTtcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEF4aW9zO1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XHJcblxyXG5mdW5jdGlvbiBJbnRlcmNlcHRvck1hbmFnZXIoKSB7XHJcbiAgdGhpcy5oYW5kbGVycyA9IFtdO1xyXG59XHJcblxyXG4vKipcclxuICogQWRkIGEgbmV3IGludGVyY2VwdG9yIHRvIHRoZSBzdGFja1xyXG4gKlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdWxmaWxsZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgdGhlbmAgZm9yIGEgYFByb21pc2VgXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHJlamVjdGAgZm9yIGEgYFByb21pc2VgXHJcbiAqXHJcbiAqIEByZXR1cm4ge051bWJlcn0gQW4gSUQgdXNlZCB0byByZW1vdmUgaW50ZXJjZXB0b3IgbGF0ZXJcclxuICovXHJcbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpIHtcclxuICB0aGlzLmhhbmRsZXJzLnB1c2goe1xyXG4gICAgZnVsZmlsbGVkOiBmdWxmaWxsZWQsXHJcbiAgICByZWplY3RlZDogcmVqZWN0ZWRcclxuICB9KTtcclxuICByZXR1cm4gdGhpcy5oYW5kbGVycy5sZW5ndGggLSAxO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSBhbiBpbnRlcmNlcHRvciBmcm9tIHRoZSBzdGFja1xyXG4gKlxyXG4gKiBAcGFyYW0ge051bWJlcn0gaWQgVGhlIElEIHRoYXQgd2FzIHJldHVybmVkIGJ5IGB1c2VgXHJcbiAqL1xyXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmVqZWN0ID0gZnVuY3Rpb24gZWplY3QoaWQpIHtcclxuICBpZiAodGhpcy5oYW5kbGVyc1tpZF0pIHtcclxuICAgIHRoaXMuaGFuZGxlcnNbaWRdID0gbnVsbDtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogSXRlcmF0ZSBvdmVyIGFsbCB0aGUgcmVnaXN0ZXJlZCBpbnRlcmNlcHRvcnNcclxuICpcclxuICogVGhpcyBtZXRob2QgaXMgcGFydGljdWxhcmx5IHVzZWZ1bCBmb3Igc2tpcHBpbmcgb3ZlciBhbnlcclxuICogaW50ZXJjZXB0b3JzIHRoYXQgbWF5IGhhdmUgYmVjb21lIGBudWxsYCBjYWxsaW5nIGBlamVjdGAuXHJcbiAqXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGludGVyY2VwdG9yXHJcbiAqL1xyXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiBmb3JFYWNoKGZuKSB7XHJcbiAgdXRpbHMuZm9yRWFjaCh0aGlzLmhhbmRsZXJzLCBmdW5jdGlvbiBmb3JFYWNoSGFuZGxlcihoKSB7XHJcbiAgICBpZiAoaCAhPT0gbnVsbCkge1xyXG4gICAgICBmbihoKTtcclxuICAgIH1cclxuICB9KTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSW50ZXJjZXB0b3JNYW5hZ2VyO1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgaXNBYnNvbHV0ZVVSTCA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTCcpO1xyXG52YXIgY29tYmluZVVSTHMgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2NvbWJpbmVVUkxzJyk7XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBiYXNlVVJMIHdpdGggdGhlIHJlcXVlc3RlZFVSTCxcclxuICogb25seSB3aGVuIHRoZSByZXF1ZXN0ZWRVUkwgaXMgbm90IGFscmVhZHkgYW4gYWJzb2x1dGUgVVJMLlxyXG4gKiBJZiB0aGUgcmVxdWVzdFVSTCBpcyBhYnNvbHV0ZSwgdGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSByZXF1ZXN0ZWRVUkwgdW50b3VjaGVkLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcclxuICogQHBhcmFtIHtzdHJpbmd9IHJlcXVlc3RlZFVSTCBBYnNvbHV0ZSBvciByZWxhdGl2ZSBVUkwgdG8gY29tYmluZVxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgZnVsbCBwYXRoXHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1aWxkRnVsbFBhdGgoYmFzZVVSTCwgcmVxdWVzdGVkVVJMKSB7XHJcbiAgaWYgKGJhc2VVUkwgJiYgIWlzQWJzb2x1dGVVUkwocmVxdWVzdGVkVVJMKSkge1xyXG4gICAgcmV0dXJuIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCk7XHJcbiAgfVxyXG4gIHJldHVybiByZXF1ZXN0ZWRVUkw7XHJcbn07XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBlbmhhbmNlRXJyb3IgPSByZXF1aXJlKCcuL2VuaGFuY2VFcnJvcicpO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSwgY29uZmlnLCBlcnJvciBjb2RlLCByZXF1ZXN0IGFuZCByZXNwb25zZS5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2UuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cclxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cclxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cclxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxyXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBjcmVhdGVkIGVycm9yLlxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGVFcnJvcihtZXNzYWdlLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XHJcbiAgdmFyIGVycm9yID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xyXG4gIHJldHVybiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpO1xyXG59O1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XHJcbnZhciB0cmFuc2Zvcm1EYXRhID0gcmVxdWlyZSgnLi90cmFuc2Zvcm1EYXRhJyk7XHJcbnZhciBpc0NhbmNlbCA9IHJlcXVpcmUoJy4uL2NhbmNlbC9pc0NhbmNlbCcpO1xyXG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuLi9kZWZhdWx0cycpO1xyXG5cclxuLyoqXHJcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXHJcbiAqL1xyXG5mdW5jdGlvbiB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZykge1xyXG4gIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcclxuICAgIGNvbmZpZy5jYW5jZWxUb2tlbi50aHJvd0lmUmVxdWVzdGVkKCk7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogRGlzcGF0Y2ggYSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgdXNpbmcgdGhlIGNvbmZpZ3VyZWQgYWRhcHRlci5cclxuICpcclxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcclxuICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkaXNwYXRjaFJlcXVlc3QoY29uZmlnKSB7XHJcbiAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xyXG5cclxuICAvLyBFbnN1cmUgaGVhZGVycyBleGlzdFxyXG4gIGNvbmZpZy5oZWFkZXJzID0gY29uZmlnLmhlYWRlcnMgfHwge307XHJcblxyXG4gIC8vIFRyYW5zZm9ybSByZXF1ZXN0IGRhdGFcclxuICBjb25maWcuZGF0YSA9IHRyYW5zZm9ybURhdGEoXHJcbiAgICBjb25maWcuZGF0YSxcclxuICAgIGNvbmZpZy5oZWFkZXJzLFxyXG4gICAgY29uZmlnLnRyYW5zZm9ybVJlcXVlc3RcclxuICApO1xyXG5cclxuICAvLyBGbGF0dGVuIGhlYWRlcnNcclxuICBjb25maWcuaGVhZGVycyA9IHV0aWxzLm1lcmdlKFxyXG4gICAgY29uZmlnLmhlYWRlcnMuY29tbW9uIHx8IHt9LFxyXG4gICAgY29uZmlnLmhlYWRlcnNbY29uZmlnLm1ldGhvZF0gfHwge30sXHJcbiAgICBjb25maWcuaGVhZGVyc1xyXG4gICk7XHJcblxyXG4gIHV0aWxzLmZvckVhY2goXHJcbiAgICBbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdwb3N0JywgJ3B1dCcsICdwYXRjaCcsICdjb21tb24nXSxcclxuICAgIGZ1bmN0aW9uIGNsZWFuSGVhZGVyQ29uZmlnKG1ldGhvZCkge1xyXG4gICAgICBkZWxldGUgY29uZmlnLmhlYWRlcnNbbWV0aG9kXTtcclxuICAgIH1cclxuICApO1xyXG5cclxuICB2YXIgYWRhcHRlciA9IGNvbmZpZy5hZGFwdGVyIHx8IGRlZmF1bHRzLmFkYXB0ZXI7XHJcblxyXG4gIHJldHVybiBhZGFwdGVyKGNvbmZpZykudGhlbihmdW5jdGlvbiBvbkFkYXB0ZXJSZXNvbHV0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XHJcblxyXG4gICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcclxuICAgIHJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxyXG4gICAgICByZXNwb25zZS5kYXRhLFxyXG4gICAgICByZXNwb25zZS5oZWFkZXJzLFxyXG4gICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gIH0sIGZ1bmN0aW9uIG9uQWRhcHRlclJlamVjdGlvbihyZWFzb24pIHtcclxuICAgIGlmICghaXNDYW5jZWwocmVhc29uKSkge1xyXG4gICAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XHJcblxyXG4gICAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxyXG4gICAgICBpZiAocmVhc29uICYmIHJlYXNvbi5yZXNwb25zZSkge1xyXG4gICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShcclxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhLFxyXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmhlYWRlcnMsXHJcbiAgICAgICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XHJcbiAgfSk7XHJcbn07XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBVcGRhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIGNvbmZpZywgZXJyb3IgY29kZSwgYW5kIHJlc3BvbnNlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJvciBUaGUgZXJyb3IgdG8gdXBkYXRlLlxyXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cclxuICogQHJldHVybnMge0Vycm9yfSBUaGUgZXJyb3IuXHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xyXG4gIGVycm9yLmNvbmZpZyA9IGNvbmZpZztcclxuICBpZiAoY29kZSkge1xyXG4gICAgZXJyb3IuY29kZSA9IGNvZGU7XHJcbiAgfVxyXG5cclxuICBlcnJvci5yZXF1ZXN0ID0gcmVxdWVzdDtcclxuICBlcnJvci5yZXNwb25zZSA9IHJlc3BvbnNlO1xyXG4gIGVycm9yLmlzQXhpb3NFcnJvciA9IHRydWU7XHJcblxyXG4gIGVycm9yLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTigpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIC8vIFN0YW5kYXJkXHJcbiAgICAgIG1lc3NhZ2U6IHRoaXMubWVzc2FnZSxcclxuICAgICAgbmFtZTogdGhpcy5uYW1lLFxyXG4gICAgICAvLyBNaWNyb3NvZnRcclxuICAgICAgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb24sXHJcbiAgICAgIG51bWJlcjogdGhpcy5udW1iZXIsXHJcbiAgICAgIC8vIE1vemlsbGFcclxuICAgICAgZmlsZU5hbWU6IHRoaXMuZmlsZU5hbWUsXHJcbiAgICAgIGxpbmVOdW1iZXI6IHRoaXMubGluZU51bWJlcixcclxuICAgICAgY29sdW1uTnVtYmVyOiB0aGlzLmNvbHVtbk51bWJlcixcclxuICAgICAgc3RhY2s6IHRoaXMuc3RhY2ssXHJcbiAgICAgIC8vIEF4aW9zXHJcbiAgICAgIGNvbmZpZzogdGhpcy5jb25maWcsXHJcbiAgICAgIGNvZGU6IHRoaXMuY29kZVxyXG4gICAgfTtcclxuICB9O1xyXG4gIHJldHVybiBlcnJvcjtcclxufTtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcclxuXHJcbi8qKlxyXG4gKiBDb25maWctc3BlY2lmaWMgbWVyZ2UtZnVuY3Rpb24gd2hpY2ggY3JlYXRlcyBhIG5ldyBjb25maWctb2JqZWN0XHJcbiAqIGJ5IG1lcmdpbmcgdHdvIGNvbmZpZ3VyYXRpb24gb2JqZWN0cyB0b2dldGhlci5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzFcclxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzJcclxuICogQHJldHVybnMge09iamVjdH0gTmV3IG9iamVjdCByZXN1bHRpbmcgZnJvbSBtZXJnaW5nIGNvbmZpZzIgdG8gY29uZmlnMVxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtZXJnZUNvbmZpZyhjb25maWcxLCBjb25maWcyKSB7XHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXHJcbiAgY29uZmlnMiA9IGNvbmZpZzIgfHwge307XHJcbiAgdmFyIGNvbmZpZyA9IHt9O1xyXG5cclxuICB2YXIgdmFsdWVGcm9tQ29uZmlnMktleXMgPSBbJ3VybCcsICdtZXRob2QnLCAnZGF0YSddO1xyXG4gIHZhciBtZXJnZURlZXBQcm9wZXJ0aWVzS2V5cyA9IFsnaGVhZGVycycsICdhdXRoJywgJ3Byb3h5JywgJ3BhcmFtcyddO1xyXG4gIHZhciBkZWZhdWx0VG9Db25maWcyS2V5cyA9IFtcclxuICAgICdiYXNlVVJMJywgJ3RyYW5zZm9ybVJlcXVlc3QnLCAndHJhbnNmb3JtUmVzcG9uc2UnLCAncGFyYW1zU2VyaWFsaXplcicsXHJcbiAgICAndGltZW91dCcsICd0aW1lb3V0TWVzc2FnZScsICd3aXRoQ3JlZGVudGlhbHMnLCAnYWRhcHRlcicsICdyZXNwb25zZVR5cGUnLCAneHNyZkNvb2tpZU5hbWUnLFxyXG4gICAgJ3hzcmZIZWFkZXJOYW1lJywgJ29uVXBsb2FkUHJvZ3Jlc3MnLCAnb25Eb3dubG9hZFByb2dyZXNzJywgJ2RlY29tcHJlc3MnLFxyXG4gICAgJ21heENvbnRlbnRMZW5ndGgnLCAnbWF4Qm9keUxlbmd0aCcsICdtYXhSZWRpcmVjdHMnLCAndHJhbnNwb3J0JywgJ2h0dHBBZ2VudCcsXHJcbiAgICAnaHR0cHNBZ2VudCcsICdjYW5jZWxUb2tlbicsICdzb2NrZXRQYXRoJywgJ3Jlc3BvbnNlRW5jb2RpbmcnXHJcbiAgXTtcclxuICB2YXIgZGlyZWN0TWVyZ2VLZXlzID0gWyd2YWxpZGF0ZVN0YXR1cyddO1xyXG5cclxuICBmdW5jdGlvbiBnZXRNZXJnZWRWYWx1ZSh0YXJnZXQsIHNvdXJjZSkge1xyXG4gICAgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3QodGFyZ2V0KSAmJiB1dGlscy5pc1BsYWluT2JqZWN0KHNvdXJjZSkpIHtcclxuICAgICAgcmV0dXJuIHV0aWxzLm1lcmdlKHRhcmdldCwgc291cmNlKTtcclxuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNQbGFpbk9iamVjdChzb3VyY2UpKSB7XHJcbiAgICAgIHJldHVybiB1dGlscy5tZXJnZSh7fSwgc291cmNlKTtcclxuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNBcnJheShzb3VyY2UpKSB7XHJcbiAgICAgIHJldHVybiBzb3VyY2Uuc2xpY2UoKTtcclxuICAgIH1cclxuICAgIHJldHVybiBzb3VyY2U7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBtZXJnZURlZXBQcm9wZXJ0aWVzKHByb3ApIHtcclxuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnMltwcm9wXSkpIHtcclxuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUoY29uZmlnMVtwcm9wXSwgY29uZmlnMltwcm9wXSk7XHJcbiAgICB9IGVsc2UgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcxW3Byb3BdKSkge1xyXG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGNvbmZpZzFbcHJvcF0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXRpbHMuZm9yRWFjaCh2YWx1ZUZyb21Db25maWcyS2V5cywgZnVuY3Rpb24gdmFsdWVGcm9tQ29uZmlnMihwcm9wKSB7XHJcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzJbcHJvcF0pKSB7XHJcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgY29uZmlnMltwcm9wXSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIHV0aWxzLmZvckVhY2gobWVyZ2VEZWVwUHJvcGVydGllc0tleXMsIG1lcmdlRGVlcFByb3BlcnRpZXMpO1xyXG5cclxuICB1dGlscy5mb3JFYWNoKGRlZmF1bHRUb0NvbmZpZzJLZXlzLCBmdW5jdGlvbiBkZWZhdWx0VG9Db25maWcyKHByb3ApIHtcclxuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnMltwcm9wXSkpIHtcclxuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcyW3Byb3BdKTtcclxuICAgIH0gZWxzZSBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzFbcHJvcF0pKSB7XHJcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgY29uZmlnMVtwcm9wXSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIHV0aWxzLmZvckVhY2goZGlyZWN0TWVyZ2VLZXlzLCBmdW5jdGlvbiBtZXJnZShwcm9wKSB7XHJcbiAgICBpZiAocHJvcCBpbiBjb25maWcyKSB7XHJcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGdldE1lcmdlZFZhbHVlKGNvbmZpZzFbcHJvcF0sIGNvbmZpZzJbcHJvcF0pO1xyXG4gICAgfSBlbHNlIGlmIChwcm9wIGluIGNvbmZpZzEpIHtcclxuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcxW3Byb3BdKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgdmFyIGF4aW9zS2V5cyA9IHZhbHVlRnJvbUNvbmZpZzJLZXlzXHJcbiAgICAuY29uY2F0KG1lcmdlRGVlcFByb3BlcnRpZXNLZXlzKVxyXG4gICAgLmNvbmNhdChkZWZhdWx0VG9Db25maWcyS2V5cylcclxuICAgIC5jb25jYXQoZGlyZWN0TWVyZ2VLZXlzKTtcclxuXHJcbiAgdmFyIG90aGVyS2V5cyA9IE9iamVjdFxyXG4gICAgLmtleXMoY29uZmlnMSlcclxuICAgIC5jb25jYXQoT2JqZWN0LmtleXMoY29uZmlnMikpXHJcbiAgICAuZmlsdGVyKGZ1bmN0aW9uIGZpbHRlckF4aW9zS2V5cyhrZXkpIHtcclxuICAgICAgcmV0dXJuIGF4aW9zS2V5cy5pbmRleE9mKGtleSkgPT09IC0xO1xyXG4gICAgfSk7XHJcblxyXG4gIHV0aWxzLmZvckVhY2gob3RoZXJLZXlzLCBtZXJnZURlZXBQcm9wZXJ0aWVzKTtcclxuXHJcbiAgcmV0dXJuIGNvbmZpZztcclxufTtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIGNyZWF0ZUVycm9yID0gcmVxdWlyZSgnLi9jcmVhdGVFcnJvcicpO1xyXG5cclxuLyoqXHJcbiAqIFJlc29sdmUgb3IgcmVqZWN0IGEgUHJvbWlzZSBiYXNlZCBvbiByZXNwb25zZSBzdGF0dXMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmUgQSBmdW5jdGlvbiB0aGF0IHJlc29sdmVzIHRoZSBwcm9taXNlLlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3QgQSBmdW5jdGlvbiB0aGF0IHJlamVjdHMgdGhlIHByb21pc2UuXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKSB7XHJcbiAgdmFyIHZhbGlkYXRlU3RhdHVzID0gcmVzcG9uc2UuY29uZmlnLnZhbGlkYXRlU3RhdHVzO1xyXG4gIGlmICghcmVzcG9uc2Uuc3RhdHVzIHx8ICF2YWxpZGF0ZVN0YXR1cyB8fCB2YWxpZGF0ZVN0YXR1cyhyZXNwb25zZS5zdGF0dXMpKSB7XHJcbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcclxuICB9IGVsc2Uge1xyXG4gICAgcmVqZWN0KGNyZWF0ZUVycm9yKFxyXG4gICAgICAnUmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXMgY29kZSAnICsgcmVzcG9uc2Uuc3RhdHVzLFxyXG4gICAgICByZXNwb25zZS5jb25maWcsXHJcbiAgICAgIG51bGwsXHJcbiAgICAgIHJlc3BvbnNlLnJlcXVlc3QsXHJcbiAgICAgIHJlc3BvbnNlXHJcbiAgICApKTtcclxuICB9XHJcbn07XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcclxuXHJcbi8qKlxyXG4gKiBUcmFuc2Zvcm0gdGhlIGRhdGEgZm9yIGEgcmVxdWVzdCBvciBhIHJlc3BvbnNlXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gZGF0YSBUaGUgZGF0YSB0byBiZSB0cmFuc2Zvcm1lZFxyXG4gKiBAcGFyYW0ge0FycmF5fSBoZWFkZXJzIFRoZSBoZWFkZXJzIGZvciB0aGUgcmVxdWVzdCBvciByZXNwb25zZVxyXG4gKiBAcGFyYW0ge0FycmF5fEZ1bmN0aW9ufSBmbnMgQSBzaW5nbGUgZnVuY3Rpb24gb3IgQXJyYXkgb2YgZnVuY3Rpb25zXHJcbiAqIEByZXR1cm5zIHsqfSBUaGUgcmVzdWx0aW5nIHRyYW5zZm9ybWVkIGRhdGFcclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdHJhbnNmb3JtRGF0YShkYXRhLCBoZWFkZXJzLCBmbnMpIHtcclxuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cclxuICB1dGlscy5mb3JFYWNoKGZucywgZnVuY3Rpb24gdHJhbnNmb3JtKGZuKSB7XHJcbiAgICBkYXRhID0gZm4oZGF0YSwgaGVhZGVycyk7XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBkYXRhO1xyXG59O1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XHJcbnZhciBub3JtYWxpemVIZWFkZXJOYW1lID0gcmVxdWlyZSgnLi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUnKTtcclxuXHJcbnZhciBERUZBVUxUX0NPTlRFTlRfVFlQRSA9IHtcclxuICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcclxufTtcclxuXHJcbmZ1bmN0aW9uIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCB2YWx1ZSkge1xyXG4gIGlmICghdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVycykgJiYgdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVyc1snQ29udGVudC1UeXBlJ10pKSB7XHJcbiAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9IHZhbHVlO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0RGVmYXVsdEFkYXB0ZXIoKSB7XHJcbiAgdmFyIGFkYXB0ZXI7XHJcbiAgaWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIC8vIEZvciBicm93c2VycyB1c2UgWEhSIGFkYXB0ZXJcclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL3hocicpO1xyXG4gIH0gZWxzZSBpZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChwcm9jZXNzKSA9PT0gJ1tvYmplY3QgcHJvY2Vzc10nKSB7XHJcbiAgICAvLyBGb3Igbm9kZSB1c2UgSFRUUCBhZGFwdGVyXHJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy9odHRwJyk7XHJcbiAgfVxyXG4gIHJldHVybiBhZGFwdGVyO1xyXG59XHJcblxyXG52YXIgZGVmYXVsdHMgPSB7XHJcbiAgYWRhcHRlcjogZ2V0RGVmYXVsdEFkYXB0ZXIoKSxcclxuXHJcbiAgdHJhbnNmb3JtUmVxdWVzdDogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlcXVlc3QoZGF0YSwgaGVhZGVycykge1xyXG4gICAgbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCAnQWNjZXB0Jyk7XHJcbiAgICBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsICdDb250ZW50LVR5cGUnKTtcclxuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKGRhdGEpIHx8XHJcbiAgICAgIHV0aWxzLmlzQXJyYXlCdWZmZXIoZGF0YSkgfHxcclxuICAgICAgdXRpbHMuaXNCdWZmZXIoZGF0YSkgfHxcclxuICAgICAgdXRpbHMuaXNTdHJlYW0oZGF0YSkgfHxcclxuICAgICAgdXRpbHMuaXNGaWxlKGRhdGEpIHx8XHJcbiAgICAgIHV0aWxzLmlzQmxvYihkYXRhKVxyXG4gICAgKSB7XHJcbiAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfVxyXG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXJWaWV3KGRhdGEpKSB7XHJcbiAgICAgIHJldHVybiBkYXRhLmJ1ZmZlcjtcclxuICAgIH1cclxuICAgIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhkYXRhKSkge1xyXG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04Jyk7XHJcbiAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcbiAgICBpZiAodXRpbHMuaXNPYmplY3QoZGF0YSkpIHtcclxuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTgnKTtcclxuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGRhdGEpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRhdGE7XHJcbiAgfV0sXHJcblxyXG4gIHRyYW5zZm9ybVJlc3BvbnNlOiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVzcG9uc2UoZGF0YSkge1xyXG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXHJcbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgIH0gY2F0Y2ggKGUpIHsgLyogSWdub3JlICovIH1cclxuICAgIH1cclxuICAgIHJldHVybiBkYXRhO1xyXG4gIH1dLFxyXG5cclxuICAvKipcclxuICAgKiBBIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzIHRvIGFib3J0IGEgcmVxdWVzdC4gSWYgc2V0IHRvIDAgKGRlZmF1bHQpIGFcclxuICAgKiB0aW1lb3V0IGlzIG5vdCBjcmVhdGVkLlxyXG4gICAqL1xyXG4gIHRpbWVvdXQ6IDAsXHJcblxyXG4gIHhzcmZDb29raWVOYW1lOiAnWFNSRi1UT0tFTicsXHJcbiAgeHNyZkhlYWRlck5hbWU6ICdYLVhTUkYtVE9LRU4nLFxyXG5cclxuICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcclxuICBtYXhCb2R5TGVuZ3RoOiAtMSxcclxuXHJcbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xyXG4gICAgcmV0dXJuIHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwO1xyXG4gIH1cclxufTtcclxuXHJcbmRlZmF1bHRzLmhlYWRlcnMgPSB7XHJcbiAgY29tbW9uOiB7XHJcbiAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKidcclxuICB9XHJcbn07XHJcblxyXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XHJcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XHJcbn0pO1xyXG5cclxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcclxuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB1dGlscy5tZXJnZShERUZBVUxUX0NPTlRFTlRfVFlQRSk7XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBkZWZhdWx0cztcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoKSB7XHJcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xyXG4gIH07XHJcbn07XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcclxuXHJcbmZ1bmN0aW9uIGVuY29kZSh2YWwpIHtcclxuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkuXHJcbiAgICByZXBsYWNlKC8lM0EvZ2ksICc6JykuXHJcbiAgICByZXBsYWNlKC8lMjQvZywgJyQnKS5cclxuICAgIHJlcGxhY2UoLyUyQy9naSwgJywnKS5cclxuICAgIHJlcGxhY2UoLyUyMC9nLCAnKycpLlxyXG4gICAgcmVwbGFjZSgvJTVCL2dpLCAnWycpLlxyXG4gICAgcmVwbGFjZSgvJTVEL2dpLCAnXScpO1xyXG59XHJcblxyXG4vKipcclxuICogQnVpbGQgYSBVUkwgYnkgYXBwZW5kaW5nIHBhcmFtcyB0byB0aGUgZW5kXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIGJhc2Ugb2YgdGhlIHVybCAoZS5nLiwgaHR0cDovL3d3dy5nb29nbGUuY29tKVxyXG4gKiBAcGFyYW0ge29iamVjdH0gW3BhcmFtc10gVGhlIHBhcmFtcyB0byBiZSBhcHBlbmRlZFxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIHVybFxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWlsZFVSTCh1cmwsIHBhcmFtcywgcGFyYW1zU2VyaWFsaXplcikge1xyXG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xyXG4gIGlmICghcGFyYW1zKSB7XHJcbiAgICByZXR1cm4gdXJsO1xyXG4gIH1cclxuXHJcbiAgdmFyIHNlcmlhbGl6ZWRQYXJhbXM7XHJcbiAgaWYgKHBhcmFtc1NlcmlhbGl6ZXIpIHtcclxuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXNTZXJpYWxpemVyKHBhcmFtcyk7XHJcbiAgfSBlbHNlIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMpKSB7XHJcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zLnRvU3RyaW5nKCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHZhciBwYXJ0cyA9IFtdO1xyXG5cclxuICAgIHV0aWxzLmZvckVhY2gocGFyYW1zLCBmdW5jdGlvbiBzZXJpYWxpemUodmFsLCBrZXkpIHtcclxuICAgICAgaWYgKHZhbCA9PT0gbnVsbCB8fCB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHV0aWxzLmlzQXJyYXkodmFsKSkge1xyXG4gICAgICAgIGtleSA9IGtleSArICdbXSc7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFsID0gW3ZhbF07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHV0aWxzLmZvckVhY2godmFsLCBmdW5jdGlvbiBwYXJzZVZhbHVlKHYpIHtcclxuICAgICAgICBpZiAodXRpbHMuaXNEYXRlKHYpKSB7XHJcbiAgICAgICAgICB2ID0gdi50b0lTT1N0cmluZygpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodXRpbHMuaXNPYmplY3QodikpIHtcclxuICAgICAgICAgIHYgPSBKU09OLnN0cmluZ2lmeSh2KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcGFydHMucHVzaChlbmNvZGUoa2V5KSArICc9JyArIGVuY29kZSh2KSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcnRzLmpvaW4oJyYnKTtcclxuICB9XHJcblxyXG4gIGlmIChzZXJpYWxpemVkUGFyYW1zKSB7XHJcbiAgICB2YXIgaGFzaG1hcmtJbmRleCA9IHVybC5pbmRleE9mKCcjJyk7XHJcbiAgICBpZiAoaGFzaG1hcmtJbmRleCAhPT0gLTEpIHtcclxuICAgICAgdXJsID0gdXJsLnNsaWNlKDAsIGhhc2htYXJrSW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIHVybCArPSAodXJsLmluZGV4T2YoJz8nKSA9PT0gLTEgPyAnPycgOiAnJicpICsgc2VyaWFsaXplZFBhcmFtcztcclxuICB9XHJcblxyXG4gIHJldHVybiB1cmw7XHJcbn07XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIHNwZWNpZmllZCBVUkxzXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlVVJMIFRoZSBiYXNlIFVSTFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpdmVVUkwgVGhlIHJlbGF0aXZlIFVSTFxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgVVJMXHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlbGF0aXZlVVJMKSB7XHJcbiAgcmV0dXJuIHJlbGF0aXZlVVJMXHJcbiAgICA/IGJhc2VVUkwucmVwbGFjZSgvXFwvKyQvLCAnJykgKyAnLycgKyByZWxhdGl2ZVVSTC5yZXBsYWNlKC9eXFwvKy8sICcnKVxyXG4gICAgOiBiYXNlVVJMO1xyXG59O1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IChcclxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cclxuXHJcbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIHN1cHBvcnQgZG9jdW1lbnQuY29va2llXHJcbiAgICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShuYW1lLCB2YWx1ZSwgZXhwaXJlcywgcGF0aCwgZG9tYWluLCBzZWN1cmUpIHtcclxuICAgICAgICAgIHZhciBjb29raWUgPSBbXTtcclxuICAgICAgICAgIGNvb2tpZS5wdXNoKG5hbWUgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcclxuXHJcbiAgICAgICAgICBpZiAodXRpbHMuaXNOdW1iZXIoZXhwaXJlcykpIHtcclxuICAgICAgICAgICAgY29va2llLnB1c2goJ2V4cGlyZXM9JyArIG5ldyBEYXRlKGV4cGlyZXMpLnRvR01UU3RyaW5nKCkpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhwYXRoKSkge1xyXG4gICAgICAgICAgICBjb29raWUucHVzaCgncGF0aD0nICsgcGF0aCk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKGRvbWFpbikpIHtcclxuICAgICAgICAgICAgY29va2llLnB1c2goJ2RvbWFpbj0nICsgZG9tYWluKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoc2VjdXJlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdzZWN1cmUnKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWUuam9pbignOyAnKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZWFkOiBmdW5jdGlvbiByZWFkKG5hbWUpIHtcclxuICAgICAgICAgIHZhciBtYXRjaCA9IGRvY3VtZW50LmNvb2tpZS5tYXRjaChuZXcgUmVnRXhwKCcoXnw7XFxcXHMqKSgnICsgbmFtZSArICcpPShbXjtdKiknKSk7XHJcbiAgICAgICAgICByZXR1cm4gKG1hdGNoID8gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzNdKSA6IG51bGwpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKG5hbWUpIHtcclxuICAgICAgICAgIHRoaXMud3JpdGUobmFtZSwgJycsIERhdGUubm93KCkgLSA4NjQwMDAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgfSkoKSA6XHJcblxyXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudiAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cclxuICAgIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge30sXHJcbiAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHsgcmV0dXJuIG51bGw7IH0sXHJcbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxyXG4gICAgICB9O1xyXG4gICAgfSkoKVxyXG4pO1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vKipcclxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIFVSTCB0byB0ZXN0XHJcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNBYnNvbHV0ZVVSTCh1cmwpIHtcclxuICAvLyBBIFVSTCBpcyBjb25zaWRlcmVkIGFic29sdXRlIGlmIGl0IGJlZ2lucyB3aXRoIFwiPHNjaGVtZT46Ly9cIiBvciBcIi8vXCIgKHByb3RvY29sLXJlbGF0aXZlIFVSTCkuXHJcbiAgLy8gUkZDIDM5ODYgZGVmaW5lcyBzY2hlbWUgbmFtZSBhcyBhIHNlcXVlbmNlIG9mIGNoYXJhY3RlcnMgYmVnaW5uaW5nIHdpdGggYSBsZXR0ZXIgYW5kIGZvbGxvd2VkXHJcbiAgLy8gYnkgYW55IGNvbWJpbmF0aW9uIG9mIGxldHRlcnMsIGRpZ2l0cywgcGx1cywgcGVyaW9kLCBvciBoeXBoZW4uXHJcbiAgcmV0dXJuIC9eKFthLXpdW2EtelxcZFxcK1xcLVxcLl0qOik/XFwvXFwvL2kudGVzdCh1cmwpO1xyXG59O1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IChcclxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cclxuXHJcbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIGhhdmUgZnVsbCBzdXBwb3J0IG9mIHRoZSBBUElzIG5lZWRlZCB0byB0ZXN0XHJcbiAgLy8gd2hldGhlciB0aGUgcmVxdWVzdCBVUkwgaXMgb2YgdGhlIHNhbWUgb3JpZ2luIGFzIGN1cnJlbnQgbG9jYXRpb24uXHJcbiAgICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xyXG4gICAgICB2YXIgbXNpZSA9IC8obXNpZXx0cmlkZW50KS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XHJcbiAgICAgIHZhciB1cmxQYXJzaW5nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgICAgdmFyIG9yaWdpblVSTDtcclxuXHJcbiAgICAgIC8qKlxyXG4gICAgKiBQYXJzZSBhIFVSTCB0byBkaXNjb3ZlciBpdCdzIGNvbXBvbmVudHNcclxuICAgICpcclxuICAgICogQHBhcmFtIHtTdHJpbmd9IHVybCBUaGUgVVJMIHRvIGJlIHBhcnNlZFxyXG4gICAgKiBAcmV0dXJucyB7T2JqZWN0fVxyXG4gICAgKi9cclxuICAgICAgZnVuY3Rpb24gcmVzb2x2ZVVSTCh1cmwpIHtcclxuICAgICAgICB2YXIgaHJlZiA9IHVybDtcclxuXHJcbiAgICAgICAgaWYgKG1zaWUpIHtcclxuICAgICAgICAvLyBJRSBuZWVkcyBhdHRyaWJ1dGUgc2V0IHR3aWNlIHRvIG5vcm1hbGl6ZSBwcm9wZXJ0aWVzXHJcbiAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcclxuICAgICAgICAgIGhyZWYgPSB1cmxQYXJzaW5nTm9kZS5ocmVmO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XHJcblxyXG4gICAgICAgIC8vIHVybFBhcnNpbmdOb2RlIHByb3ZpZGVzIHRoZSBVcmxVdGlscyBpbnRlcmZhY2UgLSBodHRwOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsdXRpbHNcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgaHJlZjogdXJsUGFyc2luZ05vZGUuaHJlZixcclxuICAgICAgICAgIHByb3RvY29sOiB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbCA/IHVybFBhcnNpbmdOb2RlLnByb3RvY29sLnJlcGxhY2UoLzokLywgJycpIDogJycsXHJcbiAgICAgICAgICBob3N0OiB1cmxQYXJzaW5nTm9kZS5ob3N0LFxyXG4gICAgICAgICAgc2VhcmNoOiB1cmxQYXJzaW5nTm9kZS5zZWFyY2ggPyB1cmxQYXJzaW5nTm9kZS5zZWFyY2gucmVwbGFjZSgvXlxcPy8sICcnKSA6ICcnLFxyXG4gICAgICAgICAgaGFzaDogdXJsUGFyc2luZ05vZGUuaGFzaCA/IHVybFBhcnNpbmdOb2RlLmhhc2gucmVwbGFjZSgvXiMvLCAnJykgOiAnJyxcclxuICAgICAgICAgIGhvc3RuYW1lOiB1cmxQYXJzaW5nTm9kZS5ob3N0bmFtZSxcclxuICAgICAgICAgIHBvcnQ6IHVybFBhcnNpbmdOb2RlLnBvcnQsXHJcbiAgICAgICAgICBwYXRobmFtZTogKHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nKSA/XHJcbiAgICAgICAgICAgIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lIDpcclxuICAgICAgICAgICAgJy8nICsgdXJsUGFyc2luZ05vZGUucGF0aG5hbWVcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBvcmlnaW5VUkwgPSByZXNvbHZlVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcclxuXHJcbiAgICAgIC8qKlxyXG4gICAgKiBEZXRlcm1pbmUgaWYgYSBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiBhcyB0aGUgY3VycmVudCBsb2NhdGlvblxyXG4gICAgKlxyXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gcmVxdWVzdFVSTCBUaGUgVVJMIHRvIHRlc3RcclxuICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4sIG90aGVyd2lzZSBmYWxzZVxyXG4gICAgKi9cclxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbihyZXF1ZXN0VVJMKSB7XHJcbiAgICAgICAgdmFyIHBhcnNlZCA9ICh1dGlscy5pc1N0cmluZyhyZXF1ZXN0VVJMKSkgPyByZXNvbHZlVVJMKHJlcXVlc3RVUkwpIDogcmVxdWVzdFVSTDtcclxuICAgICAgICByZXR1cm4gKHBhcnNlZC5wcm90b2NvbCA9PT0gb3JpZ2luVVJMLnByb3RvY29sICYmXHJcbiAgICAgICAgICAgIHBhcnNlZC5ob3N0ID09PSBvcmlnaW5VUkwuaG9zdCk7XHJcbiAgICAgIH07XHJcbiAgICB9KSgpIDpcclxuXHJcbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52cyAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cclxuICAgIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XHJcbiAgICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH07XHJcbiAgICB9KSgpXHJcbik7XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgbm9ybWFsaXplZE5hbWUpIHtcclxuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMsIGZ1bmN0aW9uIHByb2Nlc3NIZWFkZXIodmFsdWUsIG5hbWUpIHtcclxuICAgIGlmIChuYW1lICE9PSBub3JtYWxpemVkTmFtZSAmJiBuYW1lLnRvVXBwZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWROYW1lLnRvVXBwZXJDYXNlKCkpIHtcclxuICAgICAgaGVhZGVyc1tub3JtYWxpemVkTmFtZV0gPSB2YWx1ZTtcclxuICAgICAgZGVsZXRlIGhlYWRlcnNbbmFtZV07XHJcbiAgICB9XHJcbiAgfSk7XHJcbn07XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcclxuXHJcbi8vIEhlYWRlcnMgd2hvc2UgZHVwbGljYXRlcyBhcmUgaWdub3JlZCBieSBub2RlXHJcbi8vIGMuZi4gaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9odHRwLmh0bWwjaHR0cF9tZXNzYWdlX2hlYWRlcnNcclxudmFyIGlnbm9yZUR1cGxpY2F0ZU9mID0gW1xyXG4gICdhZ2UnLCAnYXV0aG9yaXphdGlvbicsICdjb250ZW50LWxlbmd0aCcsICdjb250ZW50LXR5cGUnLCAnZXRhZycsXHJcbiAgJ2V4cGlyZXMnLCAnZnJvbScsICdob3N0JywgJ2lmLW1vZGlmaWVkLXNpbmNlJywgJ2lmLXVubW9kaWZpZWQtc2luY2UnLFxyXG4gICdsYXN0LW1vZGlmaWVkJywgJ2xvY2F0aW9uJywgJ21heC1mb3J3YXJkcycsICdwcm94eS1hdXRob3JpemF0aW9uJyxcclxuICAncmVmZXJlcicsICdyZXRyeS1hZnRlcicsICd1c2VyLWFnZW50J1xyXG5dO1xyXG5cclxuLyoqXHJcbiAqIFBhcnNlIGhlYWRlcnMgaW50byBhbiBvYmplY3RcclxuICpcclxuICogYGBgXHJcbiAqIERhdGU6IFdlZCwgMjcgQXVnIDIwMTQgMDg6NTg6NDkgR01UXHJcbiAqIENvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxyXG4gKiBDb25uZWN0aW9uOiBrZWVwLWFsaXZlXHJcbiAqIFRyYW5zZmVyLUVuY29kaW5nOiBjaHVua2VkXHJcbiAqIGBgYFxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVycyBIZWFkZXJzIG5lZWRpbmcgdG8gYmUgcGFyc2VkXHJcbiAqIEByZXR1cm5zIHtPYmplY3R9IEhlYWRlcnMgcGFyc2VkIGludG8gYW4gb2JqZWN0XHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNlSGVhZGVycyhoZWFkZXJzKSB7XHJcbiAgdmFyIHBhcnNlZCA9IHt9O1xyXG4gIHZhciBrZXk7XHJcbiAgdmFyIHZhbDtcclxuICB2YXIgaTtcclxuXHJcbiAgaWYgKCFoZWFkZXJzKSB7IHJldHVybiBwYXJzZWQ7IH1cclxuXHJcbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLnNwbGl0KCdcXG4nKSwgZnVuY3Rpb24gcGFyc2VyKGxpbmUpIHtcclxuICAgIGkgPSBsaW5lLmluZGV4T2YoJzonKTtcclxuICAgIGtleSA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoMCwgaSkpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICB2YWwgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKGkgKyAxKSk7XHJcblxyXG4gICAgaWYgKGtleSkge1xyXG4gICAgICBpZiAocGFyc2VkW2tleV0gJiYgaWdub3JlRHVwbGljYXRlT2YuaW5kZXhPZihrZXkpID49IDApIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGtleSA9PT0gJ3NldC1jb29raWUnKSB7XHJcbiAgICAgICAgcGFyc2VkW2tleV0gPSAocGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSA6IFtdKS5jb25jYXQoW3ZhbF0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHBhcnNlZFtrZXldID0gcGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSArICcsICcgKyB2YWwgOiB2YWw7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIHBhcnNlZDtcclxufTtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIFN5bnRhY3RpYyBzdWdhciBmb3IgaW52b2tpbmcgYSBmdW5jdGlvbiBhbmQgZXhwYW5kaW5nIGFuIGFycmF5IGZvciBhcmd1bWVudHMuXHJcbiAqXHJcbiAqIENvbW1vbiB1c2UgY2FzZSB3b3VsZCBiZSB0byB1c2UgYEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseWAuXHJcbiAqXHJcbiAqICBgYGBqc1xyXG4gKiAgZnVuY3Rpb24gZih4LCB5LCB6KSB7fVxyXG4gKiAgdmFyIGFyZ3MgPSBbMSwgMiwgM107XHJcbiAqICBmLmFwcGx5KG51bGwsIGFyZ3MpO1xyXG4gKiAgYGBgXHJcbiAqXHJcbiAqIFdpdGggYHNwcmVhZGAgdGhpcyBleGFtcGxlIGNhbiBiZSByZS13cml0dGVuLlxyXG4gKlxyXG4gKiAgYGBganNcclxuICogIHNwcmVhZChmdW5jdGlvbih4LCB5LCB6KSB7fSkoWzEsIDIsIDNdKTtcclxuICogIGBgYFxyXG4gKlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xyXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNwcmVhZChjYWxsYmFjaykge1xyXG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKGFycikge1xyXG4gICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFycik7XHJcbiAgfTtcclxufTtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xyXG5cclxuLypnbG9iYWwgdG9TdHJpbmc6dHJ1ZSovXHJcblxyXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xyXG5cclxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcclxuXHJcbi8qKlxyXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheVxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XHJcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5LCBvdGhlcndpc2UgZmFsc2VcclxuICovXHJcbmZ1bmN0aW9uIGlzQXJyYXkodmFsKSB7XHJcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcclxufVxyXG5cclxuLyoqXHJcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIHVuZGVmaW5lZFxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XHJcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQsIG90aGVyd2lzZSBmYWxzZVxyXG4gKi9cclxuZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsKSB7XHJcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnO1xyXG59XHJcblxyXG4vKipcclxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCdWZmZXJcclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXHJcbiAqL1xyXG5mdW5jdGlvbiBpc0J1ZmZlcih2YWwpIHtcclxuICByZXR1cm4gdmFsICE9PSBudWxsICYmICFpc1VuZGVmaW5lZCh2YWwpICYmIHZhbC5jb25zdHJ1Y3RvciAhPT0gbnVsbCAmJiAhaXNVbmRlZmluZWQodmFsLmNvbnN0cnVjdG9yKVxyXG4gICAgJiYgdHlwZW9mIHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiB2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIodmFsKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcclxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxyXG4gKi9cclxuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlcih2YWwpIHtcclxuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nO1xyXG59XHJcblxyXG4vKipcclxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGb3JtRGF0YVxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XHJcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEZvcm1EYXRhLCBvdGhlcndpc2UgZmFsc2VcclxuICovXHJcbmZ1bmN0aW9uIGlzRm9ybURhdGEodmFsKSB7XHJcbiAgcmV0dXJuICh0eXBlb2YgRm9ybURhdGEgIT09ICd1bmRlZmluZWQnKSAmJiAodmFsIGluc3RhbmNlb2YgRm9ybURhdGEpO1xyXG59XHJcblxyXG4vKipcclxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcclxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcclxuICovXHJcbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXJWaWV3KHZhbCkge1xyXG4gIHZhciByZXN1bHQ7XHJcbiAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnKSAmJiAoQXJyYXlCdWZmZXIuaXNWaWV3KSkge1xyXG4gICAgcmVzdWx0ID0gQXJyYXlCdWZmZXIuaXNWaWV3KHZhbCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJlc3VsdCA9ICh2YWwpICYmICh2YWwuYnVmZmVyKSAmJiAodmFsLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKTtcclxuICB9XHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuLyoqXHJcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyaW5nXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcclxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJpbmcsIG90aGVyd2lzZSBmYWxzZVxyXG4gKi9cclxuZnVuY3Rpb24gaXNTdHJpbmcodmFsKSB7XHJcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnO1xyXG59XHJcblxyXG4vKipcclxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBOdW1iZXJcclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIE51bWJlciwgb3RoZXJ3aXNlIGZhbHNlXHJcbiAqL1xyXG5mdW5jdGlvbiBpc051bWJlcih2YWwpIHtcclxuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ251bWJlcic7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBPYmplY3RcclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxyXG4gKi9cclxuZnVuY3Rpb24gaXNPYmplY3QodmFsKSB7XHJcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JztcclxufVxyXG5cclxuLyoqXHJcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgcGxhaW4gT2JqZWN0XHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcclxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHBsYWluIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXHJcbiAqL1xyXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbCkge1xyXG4gIGlmICh0b1N0cmluZy5jYWxsKHZhbCkgIT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICB2YXIgcHJvdG90eXBlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHZhbCk7XHJcbiAgcmV0dXJuIHByb3RvdHlwZSA9PT0gbnVsbCB8fCBwcm90b3R5cGUgPT09IE9iamVjdC5wcm90b3R5cGU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIERhdGVcclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIERhdGUsIG90aGVyd2lzZSBmYWxzZVxyXG4gKi9cclxuZnVuY3Rpb24gaXNEYXRlKHZhbCkge1xyXG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IERhdGVdJztcclxufVxyXG5cclxuLyoqXHJcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZVxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XHJcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXHJcbiAqL1xyXG5mdW5jdGlvbiBpc0ZpbGUodmFsKSB7XHJcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRmlsZV0nO1xyXG59XHJcblxyXG4vKipcclxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCbG9iXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcclxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCbG9iLCBvdGhlcndpc2UgZmFsc2VcclxuICovXHJcbmZ1bmN0aW9uIGlzQmxvYih2YWwpIHtcclxuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBCbG9iXSc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZ1bmN0aW9uXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcclxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGdW5jdGlvbiwgb3RoZXJ3aXNlIGZhbHNlXHJcbiAqL1xyXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbCkge1xyXG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmVhbVxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XHJcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyZWFtLCBvdGhlcndpc2UgZmFsc2VcclxuICovXHJcbmZ1bmN0aW9uIGlzU3RyZWFtKHZhbCkge1xyXG4gIHJldHVybiBpc09iamVjdCh2YWwpICYmIGlzRnVuY3Rpb24odmFsLnBpcGUpO1xyXG59XHJcblxyXG4vKipcclxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0XHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcclxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcclxuICovXHJcbmZ1bmN0aW9uIGlzVVJMU2VhcmNoUGFyYW1zKHZhbCkge1xyXG4gIHJldHVybiB0eXBlb2YgVVJMU2VhcmNoUGFyYW1zICE9PSAndW5kZWZpbmVkJyAmJiB2YWwgaW5zdGFuY2VvZiBVUkxTZWFyY2hQYXJhbXM7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUcmltIGV4Y2VzcyB3aGl0ZXNwYWNlIG9mZiB0aGUgYmVnaW5uaW5nIGFuZCBlbmQgb2YgYSBzdHJpbmdcclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgU3RyaW5nIHRvIHRyaW1cclxuICogQHJldHVybnMge1N0cmluZ30gVGhlIFN0cmluZyBmcmVlZCBvZiBleGNlc3Mgd2hpdGVzcGFjZVxyXG4gKi9cclxuZnVuY3Rpb24gdHJpbShzdHIpIHtcclxuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMqLywgJycpLnJlcGxhY2UoL1xccyokLywgJycpO1xyXG59XHJcblxyXG4vKipcclxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XHJcbiAqXHJcbiAqIFRoaXMgYWxsb3dzIGF4aW9zIHRvIHJ1biBpbiBhIHdlYiB3b3JrZXIsIGFuZCByZWFjdC1uYXRpdmUuXHJcbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cclxuICpcclxuICogd2ViIHdvcmtlcnM6XHJcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxyXG4gKiAgdHlwZW9mIGRvY3VtZW50IC0+IHVuZGVmaW5lZFxyXG4gKlxyXG4gKiByZWFjdC1uYXRpdmU6XHJcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnUmVhY3ROYXRpdmUnXHJcbiAqIG5hdGl2ZXNjcmlwdFxyXG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ05hdGl2ZVNjcmlwdCcgb3IgJ05TJ1xyXG4gKi9cclxuZnVuY3Rpb24gaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSB7XHJcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIChuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ1JlYWN0TmF0aXZlJyB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdOYXRpdmVTY3JpcHQnIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ05TJykpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbiAgcmV0dXJuIChcclxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXHJcbiAgICB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnXHJcbiAgKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEl0ZXJhdGUgb3ZlciBhbiBBcnJheSBvciBhbiBPYmplY3QgaW52b2tpbmcgYSBmdW5jdGlvbiBmb3IgZWFjaCBpdGVtLlxyXG4gKlxyXG4gKiBJZiBgb2JqYCBpcyBhbiBBcnJheSBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXHJcbiAqIHRoZSB2YWx1ZSwgaW5kZXgsIGFuZCBjb21wbGV0ZSBhcnJheSBmb3IgZWFjaCBpdGVtLlxyXG4gKlxyXG4gKiBJZiAnb2JqJyBpcyBhbiBPYmplY3QgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xyXG4gKiB0aGUgdmFsdWUsIGtleSwgYW5kIGNvbXBsZXRlIG9iamVjdCBmb3IgZWFjaCBwcm9wZXJ0eS5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IG9iaiBUaGUgb2JqZWN0IHRvIGl0ZXJhdGVcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIHRvIGludm9rZSBmb3IgZWFjaCBpdGVtXHJcbiAqL1xyXG5mdW5jdGlvbiBmb3JFYWNoKG9iaiwgZm4pIHtcclxuICAvLyBEb24ndCBib3RoZXIgaWYgbm8gdmFsdWUgcHJvdmlkZWRcclxuICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICAvLyBGb3JjZSBhbiBhcnJheSBpZiBub3QgYWxyZWFkeSBzb21ldGhpbmcgaXRlcmFibGVcclxuICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcclxuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xyXG4gICAgb2JqID0gW29ial07XHJcbiAgfVxyXG5cclxuICBpZiAoaXNBcnJheShvYmopKSB7XHJcbiAgICAvLyBJdGVyYXRlIG92ZXIgYXJyYXkgdmFsdWVzXHJcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgZm4uY2FsbChudWxsLCBvYmpbaV0sIGksIG9iaik7XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIEl0ZXJhdGUgb3ZlciBvYmplY3Qga2V5c1xyXG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xyXG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xyXG4gICAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2tleV0sIGtleSwgb2JqKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEFjY2VwdHMgdmFyYXJncyBleHBlY3RpbmcgZWFjaCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3QsIHRoZW5cclxuICogaW1tdXRhYmx5IG1lcmdlcyB0aGUgcHJvcGVydGllcyBvZiBlYWNoIG9iamVjdCBhbmQgcmV0dXJucyByZXN1bHQuXHJcbiAqXHJcbiAqIFdoZW4gbXVsdGlwbGUgb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIGtleSB0aGUgbGF0ZXIgb2JqZWN0IGluXHJcbiAqIHRoZSBhcmd1bWVudHMgbGlzdCB3aWxsIHRha2UgcHJlY2VkZW5jZS5cclxuICpcclxuICogRXhhbXBsZTpcclxuICpcclxuICogYGBganNcclxuICogdmFyIHJlc3VsdCA9IG1lcmdlKHtmb286IDEyM30sIHtmb286IDQ1Nn0pO1xyXG4gKiBjb25zb2xlLmxvZyhyZXN1bHQuZm9vKTsgLy8gb3V0cHV0cyA0NTZcclxuICogYGBgXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIE9iamVjdCB0byBtZXJnZVxyXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcclxuICovXHJcbmZ1bmN0aW9uIG1lcmdlKC8qIG9iajEsIG9iajIsIG9iajMsIC4uLiAqLykge1xyXG4gIHZhciByZXN1bHQgPSB7fTtcclxuICBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xyXG4gICAgaWYgKGlzUGxhaW5PYmplY3QocmVzdWx0W2tleV0pICYmIGlzUGxhaW5PYmplY3QodmFsKSkge1xyXG4gICAgICByZXN1bHRba2V5XSA9IG1lcmdlKHJlc3VsdFtrZXldLCB2YWwpO1xyXG4gICAgfSBlbHNlIGlmIChpc1BsYWluT2JqZWN0KHZhbCkpIHtcclxuICAgICAgcmVzdWx0W2tleV0gPSBtZXJnZSh7fSwgdmFsKTtcclxuICAgIH0gZWxzZSBpZiAoaXNBcnJheSh2YWwpKSB7XHJcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsLnNsaWNlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXN1bHRba2V5XSA9IHZhbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZvciAodmFyIGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgZm9yRWFjaChhcmd1bWVudHNbaV0sIGFzc2lnblZhbHVlKTtcclxuICB9XHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuLyoqXHJcbiAqIEV4dGVuZHMgb2JqZWN0IGEgYnkgbXV0YWJseSBhZGRpbmcgdG8gaXQgdGhlIHByb3BlcnRpZXMgb2Ygb2JqZWN0IGIuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBhIFRoZSBvYmplY3QgdG8gYmUgZXh0ZW5kZWRcclxuICogQHBhcmFtIHtPYmplY3R9IGIgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbVxyXG4gKiBAcGFyYW0ge09iamVjdH0gdGhpc0FyZyBUaGUgb2JqZWN0IHRvIGJpbmQgZnVuY3Rpb24gdG9cclxuICogQHJldHVybiB7T2JqZWN0fSBUaGUgcmVzdWx0aW5nIHZhbHVlIG9mIG9iamVjdCBhXHJcbiAqL1xyXG5mdW5jdGlvbiBleHRlbmQoYSwgYiwgdGhpc0FyZykge1xyXG4gIGZvckVhY2goYiwgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcclxuICAgIGlmICh0aGlzQXJnICYmIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgYVtrZXldID0gYmluZCh2YWwsIHRoaXNBcmcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYVtrZXldID0gdmFsO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIHJldHVybiBhO1xyXG59XHJcblxyXG4vKipcclxuICogUmVtb3ZlIGJ5dGUgb3JkZXIgbWFya2VyLiBUaGlzIGNhdGNoZXMgRUYgQkIgQkYgKHRoZSBVVEYtOCBCT00pXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50IHdpdGggQk9NXHJcbiAqIEByZXR1cm4ge3N0cmluZ30gY29udGVudCB2YWx1ZSB3aXRob3V0IEJPTVxyXG4gKi9cclxuZnVuY3Rpb24gc3RyaXBCT00oY29udGVudCkge1xyXG4gIGlmIChjb250ZW50LmNoYXJDb2RlQXQoMCkgPT09IDB4RkVGRikge1xyXG4gICAgY29udGVudCA9IGNvbnRlbnQuc2xpY2UoMSk7XHJcbiAgfVxyXG4gIHJldHVybiBjb250ZW50O1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBpc0FycmF5OiBpc0FycmF5LFxyXG4gIGlzQXJyYXlCdWZmZXI6IGlzQXJyYXlCdWZmZXIsXHJcbiAgaXNCdWZmZXI6IGlzQnVmZmVyLFxyXG4gIGlzRm9ybURhdGE6IGlzRm9ybURhdGEsXHJcbiAgaXNBcnJheUJ1ZmZlclZpZXc6IGlzQXJyYXlCdWZmZXJWaWV3LFxyXG4gIGlzU3RyaW5nOiBpc1N0cmluZyxcclxuICBpc051bWJlcjogaXNOdW1iZXIsXHJcbiAgaXNPYmplY3Q6IGlzT2JqZWN0LFxyXG4gIGlzUGxhaW5PYmplY3Q6IGlzUGxhaW5PYmplY3QsXHJcbiAgaXNVbmRlZmluZWQ6IGlzVW5kZWZpbmVkLFxyXG4gIGlzRGF0ZTogaXNEYXRlLFxyXG4gIGlzRmlsZTogaXNGaWxlLFxyXG4gIGlzQmxvYjogaXNCbG9iLFxyXG4gIGlzRnVuY3Rpb246IGlzRnVuY3Rpb24sXHJcbiAgaXNTdHJlYW06IGlzU3RyZWFtLFxyXG4gIGlzVVJMU2VhcmNoUGFyYW1zOiBpc1VSTFNlYXJjaFBhcmFtcyxcclxuICBpc1N0YW5kYXJkQnJvd3NlckVudjogaXNTdGFuZGFyZEJyb3dzZXJFbnYsXHJcbiAgZm9yRWFjaDogZm9yRWFjaCxcclxuICBtZXJnZTogbWVyZ2UsXHJcbiAgZXh0ZW5kOiBleHRlbmQsXHJcbiAgdHJpbTogdHJpbSxcclxuICBzdHJpcEJPTTogc3RyaXBCT01cclxufTtcclxuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXHJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcclxuXHJcbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxyXG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcclxuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxyXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxyXG5cclxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XHJcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XHJcblxyXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XHJcbn1cclxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xyXG59XHJcbihmdW5jdGlvbiAoKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcclxuICAgICAgICB9XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XHJcbiAgICB9XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xyXG4gICAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xyXG4gICAgfVxyXG59ICgpKVxyXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xyXG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcclxuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcclxuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xyXG4gICAgfVxyXG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcclxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xyXG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xyXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XHJcbiAgICB9XHJcbiAgICB0cnkge1xyXG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcclxuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xyXG4gICAgfSBjYXRjaChlKXtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xyXG4gICAgICAgIH0gY2F0Y2goZSl7XHJcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXHJcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XHJcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcclxuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcclxuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XHJcbiAgICB9XHJcbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXHJcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcclxuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XHJcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xyXG4gICAgfVxyXG4gICAgdHJ5IHtcclxuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXHJcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xyXG4gICAgfSBjYXRjaCAoZSl7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxyXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcclxuICAgICAgICB9IGNhdGNoIChlKXtcclxuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXHJcbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG59XHJcbnZhciBxdWV1ZSA9IFtdO1xyXG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcclxudmFyIGN1cnJlbnRRdWV1ZTtcclxudmFyIHF1ZXVlSW5kZXggPSAtMTtcclxuXHJcbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcclxuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGRyYWluaW5nID0gZmFsc2U7XHJcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xyXG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcclxuICAgIH1cclxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcclxuICAgICAgICBkcmFpblF1ZXVlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XHJcbiAgICBpZiAoZHJhaW5pbmcpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcclxuICAgIGRyYWluaW5nID0gdHJ1ZTtcclxuXHJcbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xyXG4gICAgd2hpbGUobGVuKSB7XHJcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XHJcbiAgICAgICAgcXVldWUgPSBbXTtcclxuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XHJcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xyXG4gICAgfVxyXG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcclxuICAgIGRyYWluaW5nID0gZmFsc2U7XHJcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XHJcbn1cclxuXHJcbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XHJcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XHJcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xyXG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcclxuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xyXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcclxuICAgIHRoaXMuZnVuID0gZnVuO1xyXG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xyXG59XHJcbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xyXG59O1xyXG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xyXG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xyXG5wcm9jZXNzLmVudiA9IHt9O1xyXG5wcm9jZXNzLmFyZ3YgPSBbXTtcclxucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXHJcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcclxuXHJcbmZ1bmN0aW9uIG5vb3AoKSB7fVxyXG5cclxucHJvY2Vzcy5vbiA9IG5vb3A7XHJcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xyXG5wcm9jZXNzLm9uY2UgPSBub29wO1xyXG5wcm9jZXNzLm9mZiA9IG5vb3A7XHJcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xyXG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XHJcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XHJcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcclxucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcclxuXHJcbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cclxuXHJcbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XHJcbn07XHJcblxyXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xyXG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcclxufTtcclxucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcclxuIiwiY29uc3QgcGhvdG9DaGFyYWN0ZXJzID0ge1xyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS85L1wiOiBcIi4vaW1nL0JpZ2dzX0RhcmtsaWdodGVyLnBuZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS8xL1wiOiBcIi4vaW1nL2x1a2Utc2t5d2Fsa2VyLnBuZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS80L1wiOiBcIi4vaW1nL2Rhcmtfd2FpZGVyLnBuZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS8zL1wiOiBcIi4vaW1nL3IyLWQyLnBuZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS84L1wiOiBcIi4vaW1nL3I1LWQ0LmpwZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS8yL1wiOiBcIi4vaW1nL2MtM3BvLnBuZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS8xMy9cIjogXCIuL2ltZy9jaGV3YmFjY2EucG5nXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzE1L1wiOiBcIi4vaW1nL2dyZWVkby5qcGdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvMTkvXCI6IFwiLi9pbWcvSmVrX1Rvbm9fUG9ya2lucy5wbmdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvNS9cIjogXCIuL2ltZy9sZWlsYSBvcmdhbmEucG5nXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzEyL1wiOiBcIi4vaW1nL1Rhcmtpbi1TV0UucG5nXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzcvXCI6IFwiLi9pbWcvQmVydV9MYXJzLmpmaWZcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvMTQvXCI6IFwiLi9pbWcvSGFuLVNvbG8ucG5nXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzE2L1wiOlxyXG4gICAgXCIuL2ltZy9qYWJiYS10aGUtaHV0dC1ib2JhLWZldHQteW9kYS5qcGVnXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzYvXCI6IFwiLi9pbWcvb3dlbi1sYXJzLnBuZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS84MS9cIjogXCIuL2ltZy9SYXltdXNBbnRpbGxlcy5qcGdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvMTAvXCI6IFwiLi9pbWcvd2FuLWtlbm9iaS5wbmdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvMTgvXCI6IFwiLi9pbWcvV2VkZ2VfQW50aWxsZXMucG5nXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzI0L1wiOiBcIi4vaW1nL2Jvc3NrLnBuZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS8yNi9cIjogXCIuL2ltZy9DaGFyYWN0ZXItTG9ib3QucG5nXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzIzL1wiOiBcIi4vaW1nL2lqLTg4LWphYmJhcG5nLnBuZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS8yNS9cIjogXCIuL2ltZy9sYW5kby1jYWxyaXNzaWFuLmpwZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS8yMS9cIjogXCIuL2ltZy9wYWxwYXRpbmUucG5nXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzIwL1wiOiBcIi4vaW1nL3lvZGEucG5nXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzIyL1wiOiBcIi4vaW1nL2JvYmEtZmV0dC5wbmdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvNTUvXCI6IFwiLi9pbWcvQWRpIEdhbGxpYS5wbmdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvMjkvXCI6IFwiLi9pbWcvQXJ2ZWxDcnlueWQucG5nXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzQ2L1wiOiBcIi4vaW1nL0F5bGEtU2VjdXJhLnBuZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS80NS9cIjogXCIuL2ltZy9iaWJfZm9ydHVuYS5wbmdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvMjcvXCI6IFwiLi9pbWcvYWNrYmFyLmpwZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS82Ny9cIjogXCIuL2ltZy9kb29rdS5wbmdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvNTQvXCI6IFwiLi9pbWcvRWV0aF9Lb3RoLnBuZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS83OS9cIjogXCIuL2ltZy9nZW5lcmFsLWdyaWV2b3VzLnBuZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS81Mi9cIjogXCIuL2ltZy9LaS1BZGktTXVuZGkucG5nXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzUzL1wiOiBcIi4vaW1nL0tpdF9GaXN0by5qZmlmXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzY0L1wiOiBcIi4vaW1nL0x1bWluYXJhLVVuZHVsaS5wbmdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvNTEvXCI6IFwiLi9pbWcvbWFjZS13aW5kdS5wbmdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvMjgvXCI6IFwiLi9pbWcvTW9uX01vdGhtYS5wbmdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvMzEvXCI6IFwiLi9pbWcvbmllbi1udW5iLnBuZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS8zMy9cIjogXCIuL2ltZy9OdXRlLUd1bnJheS5wbmdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvMzUvXCI6IFwiLi9pbWcvUGFkbcOpLUFtaWRhbGEucG5nXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzU4L1wiOiBcIi4vaW1nL1Bsby1Lb29udC5wbmdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvNjMvXCI6IFwiLi9pbWcvUG9nZ2xldGhlbGVzc2VyX2RldGFpbC5wbmdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvNzUvXCI6IFwiLi9pbWcvUjQtUDE3LTc1MDA2LnBuZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS83OC9cIjogXCIuL2ltZy9TaGFha3RpX2RldGFpbC5wbmdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvODIvXCI6IFwiLi9pbWcvU2x5LU1vb3JlLnBuZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS84MC9cIjogXCIuL2ltZy90YXJmZnVsX2RldGFpbC5wbmdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvODMvXCI6IFwiLi9pbWcvVGlvbl9NZWRvbi53ZWJwXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzExL1wiOiBcIi4vaW1nL0FuYWtpbi1Ta3l3YWxrZXIucG5nXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzY4L1wiOiBcIi4vaW1nL0JhaWxfT3JnYW5hLnBuZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS82NS9cIjogXCIuL2ltZy9CYXJyaXNzLU9mZmVlLnBuZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS82Mi9cIjogXCIuL2ltZy9jbGllZ2dsYXJzX2RldGFpbC5wbmdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvNjEvXCI6IFwiLi9pbWcvQ29yZMOpLmpwZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS83MS9cIjogXCIuL2ltZy9kZXh0ZXJqZXR0c3Rlcl9kZXRhaWwucG5nXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzY2L1wiOiBcIi4vaW1nL0Rvcm3DqS5qcGdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvNjAvXCI6IFwiLi9pbWcvR3JlZ2FyLVR5cGhvLnBuZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS82OS9cIjogXCIuL2ltZy9KYW5nbyBGZXR0LnBuZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS8zNi9cIjogXCIuL2ltZy9KYXItSmFyLUJpbmtzLnBuZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS83NC9cIjogXCIuL2ltZy9Kb2Nhc3RhLU51LnBuZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS83Mi9cIjogXCIuL2ltZy9MYW1hX3N1LnBuZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS81Ni9cIjogXCIuL2ltZy9TYWVzZWUtVGlpbi5wbmdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvNzcvXCI6IFwiLi9pbWcvU2FuX0hpbGwucG5nXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzQzL1wiOiBcIi4vaW1nL1NobWktU2t5d2Fsa2VyLnBuZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS83My9cIjogXCIuL2ltZy9UYXVuLVdlLnBuZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS83Ni9cIjogXCIuL2ltZy9XYXRfVGFtYm9yLnBuZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS80MC9cIjogXCIuL2ltZy9XYXR0by5wbmdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvNzAvXCI6IFwiLi9pbWcvWmFtX1dlc2VsbC5wbmdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvNTkvXCI6IFwiLi9pbWcvTWFzX0FtZWRkYS5wbmdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvNTAvXCI6IFwiLi9pbWcvQmVuUXVhZGluYXJvc0hTLVNXRS5wbmdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvNDQvXCI6IFwiLi9pbWcvRGFydGgtTWF1bC5wbmdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvNDgvXCI6IFwiLi9pbWcvRHVkX0JvbHQuanBnXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzQ5L1wiOiBcIi4vaW1nL0dhc2dhbnAuanBnXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzQyL1wiOiBcIi4vaW1nL1F1YXJzaC1QYW5ha2EuanBnXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzMyL1wiOiBcIi4vaW1nL1F1aS1Hb24tSmlubi5wbmdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvNDcvXCI6IFwiLi9pbWcvUmF0dHNIUy5qcGdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvMzkvXCI6IFwiLi9pbWcvUmljX09saWUuanBnXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzM3L1wiOiBcIi4vaW1nL1Jvb3MtVGFycGFscy5wbmdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvMzgvXCI6IFwiLi9pbWcvUnVnb3JOYXNzLVNXQ1QucG5nXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzQxL1wiOiBcIi4vaW1nL1NlYnVsYmEucG5nXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzM0L1wiOiBcIi4vaW1nL1ZhbG9ydW0tU1dFLnBuZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS8zMC9cIjogXCIuL2ltZy93aWNrZXRfd193YXJ3aWNrLnBuZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS81Ny9cIjogXCIuL2ltZy9ZYXJhZWwtUG9vZi5wbmdcIixcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHBob3RvQ2hhcmFjdGVycztcclxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwiaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xyXG5cclxuY29uc3QgQkFTRSA9IFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL1wiO1xyXG5cclxuZnVuY3Rpb24gZ2V0SW5mbyhudW1QYWdlLCBpbmZvKSB7XHJcbiAgY29uc3QgcmVxdWVzdCA9IGF4aW9zLmdldChCQVNFICsgaW5mbyArIG51bVBhZ2UpO1xyXG4gIHJldHVybiByZXF1ZXN0XHJcbiAgICAudGhlbigocmVzKSA9PiB7XHJcbiAgICAgIHJldHVybiByZXMuZGF0YS5yZXN1bHRzO1xyXG4gICAgfSlcclxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgIGlmICghcmVxdWVzdCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic29tZXRoaW5nIHdyb25nXCIsIGVycik7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHsgZ2V0SW5mbyB9O1xyXG4iLCJpbXBvcnQgY2hhcnNNb2R1bGUgZnJvbSBcIi4vY2hhcmFjdGVyc1wiO1xyXG5pbXBvcnQgZGlzcGxheVBlb3BsZSBmcm9tIFwiLi92aWV3XCI7XHJcbmltcG9ydCBcIi4vY2hhcmFjdGVycy5jc3NcIjtcclxuaW1wb3J0IFwiLi9pbWcvbWF4cmVzZGVmYXVsdC5qcGdcIjtcclxuXHJcbmNvbnN0IHBlb3BsZSA9IGBwZW9wbGUvP3BhZ2U9YDtcclxuY29uc3QgYnRuSW5mbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnRuXCIpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xyXG4gIGJ0bkluZm8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgIGNvbnN0IHBlb3BsZUlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmaWxtSWRcIikudmFsdWU7XHJcbiAgICBpZiAocGVvcGxlSWQgPCAxIHx8IHBlb3BsZUlkID4gOSkgcmV0dXJuO1xyXG4gICAgY2hhcnNNb2R1bGUuZ2V0SW5mbyhwZW9wbGVJZCwgcGVvcGxlKS50aGVuKGRpc3BsYXlQZW9wbGUpO1xyXG4gIH0pO1xyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvQWRpIEdhbGxpYS5wbmdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL0FuYWtpbi1Ta3l3YWxrZXIucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9BcnZlbENyeW55ZC5wbmdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL0F5bGEtU2VjdXJhLnBuZ1wiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvQmFpbF9PcmdhbmEucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9CYXJyaXNzLU9mZmVlLnBuZ1wiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvQmVuUXVhZGluYXJvc0hTLVNXRS5wbmdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL0JlcnVfTGFycy5qZmlmXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9CaWdnc19EYXJrbGlnaHRlci5wbmdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL0NoYXJhY3Rlci1Mb2JvdC5wbmdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL0NvcmTDqS5qcGdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL0RhcnRoLU1hdWwucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9Eb3Jtw6kuanBnXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9EdWRfQm9sdC5qcGdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL0VldGhfS290aC5wbmdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL0dhc2dhbnAuanBnXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9HcmVnYXItVHlwaG8ucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9IYW4tU29sby5wbmdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL0phbmdvIEZldHQucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9KYXItSmFyLUJpbmtzLnBuZ1wiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvSmVrX1Rvbm9fUG9ya2lucy5wbmdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL0pvY2FzdGEtTnUucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9LaS1BZGktTXVuZGkucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9LaXRfRmlzdG8uamZpZlwiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvTGFtYV9zdS5wbmdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL0x1bWluYXJhLVVuZHVsaS5wbmdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL01hc19BbWVkZGEucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9Nb25fTW90aG1hLnBuZ1wiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvTnV0ZS1HdW5yYXkucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9QYWRtw6ktQW1pZGFsYS5wbmdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL1Bsby1Lb29udC5wbmdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL1BvZ2dsZXRoZWxlc3Nlcl9kZXRhaWwucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9RdWFyc2gtUGFuYWthLmpwZ1wiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvUXVpLUdvbi1KaW5uLnBuZ1wiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvUjQtUDE3LTc1MDA2LnBuZ1wiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvUmF0dHNIUy5qcGdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL1JheW11c0FudGlsbGVzLmpwZ1wiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvUmljX09saWUuanBnXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9Sb29zLVRhcnBhbHMucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9SdWdvck5hc3MtU1dDVC5wbmdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL1NhZXNlZS1UaWluLnBuZ1wiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvU2FuX0hpbGwucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9TZWJ1bGJhLnBuZ1wiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvU2hhYWt0aV9kZXRhaWwucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9TaG1pLVNreXdhbGtlci5wbmdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL1NseS1Nb29yZS5wbmdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL1Rhcmtpbi1TV0UucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9UYXVuLVdlLnBuZ1wiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvVGlvbl9NZWRvbi53ZWJwXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9WYWxvcnVtLVNXRS5wbmdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL1dhdF9UYW1ib3IucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9XYXR0by5wbmdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL1dlZGdlX0FudGlsbGVzLnBuZ1wiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvWWFyYWVsLVBvb2YucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9aYW1fV2VzZWxsLnBuZ1wiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvYWNrYmFyLmpwZ1wiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvYmliX2ZvcnR1bmEucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9ib2JhLWZldHQucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9ib3Nzay5wbmdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL2MtM3BvLnBuZ1wiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvY2hld2JhY2NhLnBuZ1wiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvY2xpZWdnbGFyc19kZXRhaWwucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9kYXJrX3dhaWRlci5wbmdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL2RleHRlcmpldHRzdGVyX2RldGFpbC5wbmdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL2Rvb2t1LnBuZ1wiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvZ2VuZXJhbC1ncmlldm91cy5wbmdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL2dyZWVkby5qcGdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL2lqLTg4LWphYmJhcG5nLnBuZ1wiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvamFiYmEtdGhlLWh1dHQtYm9iYS1mZXR0LXlvZGEuanBlZ1wiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvbGFuZG8tY2Fscmlzc2lhbi5qcGdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL2xlaWxhIG9yZ2FuYS5wbmdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL2x1a2Utc2t5d2Fsa2VyLnBuZ1wiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvbWFjZS13aW5kdS5wbmdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL21heHJlc2RlZmF1bHQuanBnXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9uaWVuLW51bmIucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9vd2VuLWxhcnMucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9wYWxwYXRpbmUucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9yMi1kMi5wbmdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL3I1LWQ0LmpwZ1wiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvdGFyZmZ1bF9kZXRhaWwucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy93YW4ta2Vub2JpLnBuZ1wiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvd2lja2V0X3dfd2Fyd2ljay5wbmdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL3lvZGEucG5nXCI7IiwiaW1wb3J0IHBob3RvQ2hhcmFjdGVycyBmcm9tIFwiLi9QaG90b0NoYXIuanNcIjtcbmltcG9ydCBcIi4vaW1nL0JpZ2dzX0RhcmtsaWdodGVyLnBuZ1wiO1xuaW1wb3J0IFwiLi9pbWcvbHVrZS1za3l3YWxrZXIucG5nXCI7XG5pbXBvcnQgXCIuL2ltZy9kYXJrX3dhaWRlci5wbmdcIjtcbmltcG9ydCBcIi4vaW1nL3IyLWQyLnBuZ1wiO1xuaW1wb3J0IFwiLi9pbWcvcjUtZDQuanBnXCI7XG5pbXBvcnQgXCIuL2ltZy9jLTNwby5wbmdcIjtcbmltcG9ydCBcIi4vaW1nL2NoZXdiYWNjYS5wbmdcIjtcbmltcG9ydCBcIi4vaW1nL2dyZWVkby5qcGdcIjtcbmltcG9ydCBcIi4vaW1nL0pla19Ub25vX1BvcmtpbnMucG5nXCI7XG5pbXBvcnQgXCIuL2ltZy9sZWlsYSBvcmdhbmEucG5nXCI7XG5pbXBvcnQgXCIuL2ltZy9UYXJraW4tU1dFLnBuZ1wiO1xuaW1wb3J0IFwiLi9pbWcvQmVydV9MYXJzLmpmaWZcIjtcbmltcG9ydCBcIi4vaW1nL0hhbi1Tb2xvLnBuZ1wiO1xuaW1wb3J0IFwiLi9pbWcvamFiYmEtdGhlLWh1dHQtYm9iYS1mZXR0LXlvZGEuanBlZ1wiO1xuaW1wb3J0IFwiLi9pbWcvb3dlbi1sYXJzLnBuZ1wiO1xuaW1wb3J0IFwiLi9pbWcvUmF5bXVzQW50aWxsZXMuanBnXCI7XG5pbXBvcnQgXCIuL2ltZy93YW4ta2Vub2JpLnBuZ1wiO1xuaW1wb3J0IFwiLi9pbWcvV2VkZ2VfQW50aWxsZXMucG5nXCI7XG5pbXBvcnQgXCIuL2ltZy9ib3Nzay5wbmdcIjtcbmltcG9ydCBcIi4vaW1nL0NoYXJhY3Rlci1Mb2JvdC5wbmdcIjtcbmltcG9ydCBcIi4vaW1nL2lqLTg4LWphYmJhcG5nLnBuZ1wiO1xuaW1wb3J0IFwiLi9pbWcvbGFuZG8tY2Fscmlzc2lhbi5qcGdcIjtcbmltcG9ydCBcIi4vaW1nL3BhbHBhdGluZS5wbmdcIjtcbmltcG9ydCBcIi4vaW1nL3lvZGEucG5nXCI7XG5pbXBvcnQgXCIuL2ltZy9ib2JhLWZldHQucG5nXCI7XG5pbXBvcnQgXCIuL2ltZy9BZGkgR2FsbGlhLnBuZ1wiO1xuaW1wb3J0IFwiLi9pbWcvQXJ2ZWxDcnlueWQucG5nXCI7XG5pbXBvcnQgXCIuL2ltZy9BeWxhLVNlY3VyYS5wbmdcIjtcbmltcG9ydCBcIi4vaW1nL2JpYl9mb3J0dW5hLnBuZ1wiO1xuaW1wb3J0IFwiLi9pbWcvYWNrYmFyLmpwZ1wiO1xuaW1wb3J0IFwiLi9pbWcvZG9va3UucG5nXCI7XG5pbXBvcnQgXCIuL2ltZy9FZXRoX0tvdGgucG5nXCI7XG5pbXBvcnQgXCIuL2ltZy9nZW5lcmFsLWdyaWV2b3VzLnBuZ1wiO1xuaW1wb3J0IFwiLi9pbWcvS2ktQWRpLU11bmRpLnBuZ1wiO1xuaW1wb3J0IFwiLi9pbWcvS2l0X0Zpc3RvLmpmaWZcIjtcbmltcG9ydCBcIi4vaW1nL0x1bWluYXJhLVVuZHVsaS5wbmdcIjtcbmltcG9ydCBcIi4vaW1nL21hY2Utd2luZHUucG5nXCI7XG5pbXBvcnQgXCIuL2ltZy9Nb25fTW90aG1hLnBuZ1wiO1xuaW1wb3J0IFwiLi9pbWcvbmllbi1udW5iLnBuZ1wiO1xuaW1wb3J0IFwiLi9pbWcvTnV0ZS1HdW5yYXkucG5nXCI7XG5pbXBvcnQgXCIuL2ltZy9QYWRtw6ktQW1pZGFsYS5wbmdcIjtcbmltcG9ydCBcIi4vaW1nL1Bsby1Lb29udC5wbmdcIjtcbmltcG9ydCBcIi4vaW1nL1BvZ2dsZXRoZWxlc3Nlcl9kZXRhaWwucG5nXCI7XG5pbXBvcnQgXCIuL2ltZy9SNC1QMTctNzUwMDYucG5nXCI7XG5pbXBvcnQgXCIuL2ltZy9TaGFha3RpX2RldGFpbC5wbmdcIjtcbmltcG9ydCBcIi4vaW1nL1NseS1Nb29yZS5wbmdcIjtcbmltcG9ydCBcIi4vaW1nL3RhcmZmdWxfZGV0YWlsLnBuZ1wiO1xuaW1wb3J0IFwiLi9pbWcvVGlvbl9NZWRvbi53ZWJwXCI7XG5pbXBvcnQgXCIuL2ltZy9BbmFraW4tU2t5d2Fsa2VyLnBuZ1wiO1xuaW1wb3J0IFwiLi9pbWcvQmFpbF9PcmdhbmEucG5nXCI7XG5pbXBvcnQgXCIuL2ltZy9CYXJyaXNzLU9mZmVlLnBuZ1wiO1xuaW1wb3J0IFwiLi9pbWcvY2xpZWdnbGFyc19kZXRhaWwucG5nXCI7XG5pbXBvcnQgXCIuL2ltZy9Db3Jkw6kuanBnXCI7XG5pbXBvcnQgXCIuL2ltZy9kZXh0ZXJqZXR0c3Rlcl9kZXRhaWwucG5nXCI7XG5pbXBvcnQgXCIuL2ltZy9Eb3Jtw6kuanBnXCI7XG5pbXBvcnQgXCIuL2ltZy9HcmVnYXItVHlwaG8ucG5nXCI7XG5pbXBvcnQgXCIuL2ltZy9KYW5nbyBGZXR0LnBuZ1wiO1xuaW1wb3J0IFwiLi9pbWcvSmFyLUphci1CaW5rcy5wbmdcIjtcbmltcG9ydCBcIi4vaW1nL0pvY2FzdGEtTnUucG5nXCI7XG5pbXBvcnQgXCIuL2ltZy9MYW1hX3N1LnBuZ1wiO1xuaW1wb3J0IFwiLi9pbWcvU2Flc2VlLVRpaW4ucG5nXCI7XG5pbXBvcnQgXCIuL2ltZy9TYW5fSGlsbC5wbmdcIjtcbmltcG9ydCBcIi4vaW1nL1NobWktU2t5d2Fsa2VyLnBuZ1wiO1xuaW1wb3J0IFwiLi9pbWcvVGF1bi1XZS5wbmdcIjtcbmltcG9ydCBcIi4vaW1nL1dhdF9UYW1ib3IucG5nXCI7XG5pbXBvcnQgXCIuL2ltZy9XYXR0by5wbmdcIjtcbmltcG9ydCBcIi4vaW1nL1phbV9XZXNlbGwucG5nXCI7XG5pbXBvcnQgXCIuL2ltZy9NYXNfQW1lZGRhLnBuZ1wiO1xuaW1wb3J0IFwiLi9pbWcvQmVuUXVhZGluYXJvc0hTLVNXRS5wbmdcIjtcbmltcG9ydCBcIi4vaW1nL0RhcnRoLU1hdWwucG5nXCI7XG5pbXBvcnQgXCIuL2ltZy9EdWRfQm9sdC5qcGdcIjtcbmltcG9ydCBcIi4vaW1nL0dhc2dhbnAuanBnXCI7XG5pbXBvcnQgXCIuL2ltZy9RdWFyc2gtUGFuYWthLmpwZ1wiO1xuaW1wb3J0IFwiLi9pbWcvUXVpLUdvbi1KaW5uLnBuZ1wiO1xuaW1wb3J0IFwiLi9pbWcvUmF0dHNIUy5qcGdcIjtcbmltcG9ydCBcIi4vaW1nL1JpY19PbGllLmpwZ1wiO1xuaW1wb3J0IFwiLi9pbWcvUm9vcy1UYXJwYWxzLnBuZ1wiO1xuaW1wb3J0IFwiLi9pbWcvUnVnb3JOYXNzLVNXQ1QucG5nXCI7XG5pbXBvcnQgXCIuL2ltZy9TZWJ1bGJhLnBuZ1wiO1xuaW1wb3J0IFwiLi9pbWcvVmFsb3J1bS1TV0UucG5nXCI7XG5pbXBvcnQgXCIuL2ltZy93aWNrZXRfd193YXJ3aWNrLnBuZ1wiO1xuaW1wb3J0IFwiLi9pbWcvWWFyYWVsLVBvb2YucG5nXCI7XG5cbmNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGVvcGxlXCIpO1xuY29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRpdGxlXCIpO1xuXG5mdW5jdGlvbiBkaXNwbGF5UGVvcGxlKHBlb3BsZSA9IFtdKSB7XG4gIGNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICB0aXRsZS5pbm5lclRleHQgPSBcIkNoYXJhY3RlcnNcIjtcbiAgcGVvcGxlLm1hcCgocGVyc29uKSA9PiB7XG4gICAgZGlzcGxheUNoYXJhY3RlckluZm8ocGVyc29uKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlDaGFyYWN0ZXJJbmZvKHBlcnNvbikge1xuICBjb25zdCBwZXJzb25FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgcGVyc29uRWxlbWVudC5jbGFzc05hbWUgPSBcInBlcnNvbiBhcm91bmRcIjtcbiAgY29uc3QgcGVyc29uSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHBlcnNvbkljb24uY2xhc3NOYW1lID0gXCJpY29uXCI7XG4gIHN3aXRjaCAocGVyc29uLmdlbmRlcikge1xuICAgIGNhc2UgXCJtYWxlXCI6XG4gICAgICBwZXJzb24uZ2VuZGVyICs9IGAgIOKZgmA7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiZmVtYWxlXCI6XG4gICAgICBwZXJzb24uZ2VuZGVyICs9IGAgIOKZgGA7XG4gICAgICBicmVhaztcbiAgfVxuXG4gIGNyZWF0ZUluZm9DaGFyKHBlcnNvbkVsZW1lbnQsIHBlcnNvbik7XG4gIGZpbmRJbWcocGVyc29uLCBwZXJzb25JY29uKTtcblxuICBjb250YWluZXIuYXBwZW5kKHBlcnNvbkVsZW1lbnQpO1xuICBwZXJzb25FbGVtZW50LmFwcGVuZENoaWxkKHBlcnNvbkljb24pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVJbmZvQ2hhcihlbGVtZW50LCBwZXJzb24pIHtcbiAgZWxlbWVudC5pbm5lckhUTUwgPSBgXG4gICAgPGRpdj5cbiAgICAgIDxoMz4gPHNwYW4+IE5hbWU6IDwvc3Bhbj4gJHtwZXJzb24ubmFtZX0gPC9oMz5cbiAgICAgIDxoND4gPHNwYW4+IEJpcnRoZGF5OiA8L3NwYW4+ICR7cGVyc29uW1wiYmlydGhfeWVhclwiXX0gPC9oND5cbiAgICAgIDxoND4gPHNwYW4+IEdlbmRlcjogPC9zcGFuPiAke3BlcnNvbltcImdlbmRlclwiXX0gPC9oND5cbiAgICAgPC9kaXY+XG4gICAgYDtcbn1cblxuZnVuY3Rpb24gZmluZEltZyhjaGFyYWN0ZXJzLCBwZXJzb25JY29uKSB7XG4gIGNvbnN0IGltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgaW1hZ2UuY2xhc3NOYW1lID0gXCJpY29uQ2hhcmFjdGVyXCI7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBPYmplY3Qua2V5cyhwaG90b0NoYXJhY3RlcnMpLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgaW1hZ2VBZGQgPSBPYmplY3QudmFsdWVzKHBob3RvQ2hhcmFjdGVycylbaV0ucmVwbGFjZShcIi4vaW1nXCIsIFwiaW1nXCIpO1xuICAgIGNvbnN0IGh0dHBzVXJsID0gY2hhcmFjdGVyc1tcInVybFwiXS5yZXBsYWNlKFwiaHR0cFwiLCBcImh0dHBzXCIpO1xuICAgIGlmIChodHRwc1VybCA9PT0gT2JqZWN0LmtleXMocGhvdG9DaGFyYWN0ZXJzKVtpXSkge1xuICAgICAgaW1hZ2Uuc3JjID0gaW1hZ2VBZGQ7XG4gICAgICBwZXJzb25JY29uLmFwcGVuZENoaWxkKGltYWdlKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZGlzcGxheVBlb3BsZTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsImltcG9ydCBcIi4vY2hhaW4uY3NzXCI7XHJcbmxldCBkYXRhO1xyXG5sZXQgc2lnblVwID0gXCJcIjtcclxuXHJcbmNvbnN0IHBocmFzZSA9IFtcclxuICBcIkJlZm9yZSBJIGZpbmlzaCAtIOWcqOaIkee7k+adn1wiLFxyXG4gIFwiV2UnZCBiZXR0ZXIgc3RvcCBub3cgLSDmiJHku6zmnIDlpb3liKvnnItcIixcclxuICBcIkkgaGF2ZSBhdHRlbXB0ZWQgdG8gZXhwbGFpbiBoZXJlIHRoYXQuLi4gLSDmiJHor5Xlm77lnKjov5nph4zop6Pph4rkuIDkuIsuLi5cIixcclxuICBcIlRoYXQgcmVtYWlucyB0byBiZSBzZWVuIC0g6L+Z6L+Y5pyJ5b6FXCIsXHJcbiAgXCJXZSBhZ3JlZWQgdGhhdC4uLiAtIC4uLuaIkeS7rOWQjOaEj1wiLFxyXG4gIFwiSXQgbWFrZXMgc2Vuc2UgdGhhdC4uLiAtIC4uLuaYr+aciemAmueQhueahFwiLFxyXG4gIFwiWW91IGFyZSBub3QgYWxvbmUgLSDkvaDkuI3mmK/lraTljZXkuIDkuKrkurpcIixcclxuXTtcclxuXHJcbmZ1bmN0aW9uIHJhbmRvbShhcnJheSkge1xyXG4gIHJldHVybiBhcnJheVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhcnJheS5sZW5ndGgpIHwgMF07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldENoYXJzKGxlbmd0aCkge1xyXG4gIGNvbnN0IG1pbiA9IDEwMDAwO1xyXG4gIGxldCByZXMgPSBcIlwiO1xyXG4gIGxldCBzaWduQXJyID0gW107XHJcbiAgY29uc3Qgc3RhcnQgPSBEYXRlLm5vdygpO1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICBpZiAobGVuZ3RoIDw9IDApIHtcclxuICAgICAgcmVqZWN0KCk7XHJcbiAgICB9XHJcbiAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgY29uc3QgdGltZXJJZCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgY291bnQrKztcclxuICAgICAgbGV0IHNpZ24gPSBwYXJzZUludChEYXRlLm5vdygpLnRvU3RyaW5nKCkuc3Vic3RyKC01KSk7XHJcbiAgICAgIGlmIChzaWduIDwgbWluKSB7XHJcbiAgICAgICAgc2lnbiA9IHNpZ24gKyBtaW47XHJcbiAgICAgIH1cclxuICAgICAgc2lnbkFyci5wdXNoKHNpZ24pO1xyXG4gICAgICBjb25zdCBjaGFyQ29kZSA9IFN0cmluZy5mcm9tQ2hhckNvZGUoc2lnbik7XHJcbiAgICAgIHJlcyArPSBjaGFyQ29kZTtcclxuICAgICAgaWYgKGNvdW50ID09PSBsZW5ndGgpIHtcclxuICAgICAgICBjbGVhckludGVydmFsKHRpbWVySWQpO1xyXG4gICAgICAgIGNvbnN0IGVuZCA9IERhdGUubm93KCk7XHJcbiAgICAgICAgZGF0YSA9IGVuZCAtIHN0YXJ0O1xyXG4gICAgICAgIHNpZ25VcCA9IHNpZ25BcnIuam9pbihcIiAtIFwiKTtcclxuICAgICAgICByZXNvbHZlKHJlcyk7XHJcbiAgICAgIH1cclxuICAgIH0sIDUwKTtcclxuICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xyXG4gIGNvbnN0IHNldFJlc3VsdCA9IGFzeW5jICgpID0+IHtcclxuICAgIGNvbnN0IGdldExlbmd0aCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGVuZ3RoXCIpLnZhbHVlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgY2hhcnMgPSBhd2FpdCBnZXRDaGFycygrZ2V0TGVuZ3RoKTtcclxuICAgICAgY29uc3QgbGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGlzdFwiKTtcclxuICAgICAgY29uc3QgdGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGV4dFwiKTtcclxuICAgICAgY29uc3QgdGltZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGltZVwiKTtcclxuICAgICAgY29uc3QgcmFuZG9tUGhyYXNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwaHJhc2VSYW5kb21cIik7XHJcbiAgICAgIGxpc3QuaW5uZXJIVE1MID0gYFRyYW5zbGF0ZTogICR7c2lnblVwfWA7XHJcbiAgICAgIHRleHQuaW5uZXJIVE1MID0gYFJlc3VsdDogJHtjaGFyc31gO1xyXG4gICAgICB0aW1lLmlubmVySFRNTCA9IGBSdW50aW1lOiAke2RhdGF9bXNgO1xyXG4gICAgICByYW5kb21QaHJhc2UuaW5uZXJIVE1MID0gYFBocmFzZSBvZiB0aGUgZGF5OiA8c3Bhbj4gJHtyYW5kb20oXHJcbiAgICAgICAgcGhyYXNlXHJcbiAgICAgICl9IDwvc3Bhbj5gO1xyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIHRleHQuaW5uZXJIVE1MID0gXCJUaGUgbnVtYmVyIGlzIHNtYWxsZXJcIjtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdCBudW1iZXJCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ0bkNoYWluXCIpO1xyXG4gIG51bWJlckJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2V0UmVzdWx0KTtcclxufVxyXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCJleHBvcnQgZnVuY3Rpb24qIGNyZWF0ZUlkR2VuZXJhdG9yKCkge1xuICBmb3IgKGxldCBpID0gMTsgaSA8IEluZmluaXR5OyBpKyspIHtcbiAgICB5aWVsZCBpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBuZXdGb250R2VuZXJhdG9yKHNpemUpIHtcbiAgY29uc3Qgc2Vuc2l0aXZlS2V5Q29kZSA9IHtcbiAgICBuZXh0KGtleSkge1xuICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgY2FzZSBcInVwXCI6XG4gICAgICAgICAgc2l6ZSArPSAyO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiZG93blwiOlxuICAgICAgICAgIHNpemUgLT0gMjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBzaXplICs9IDA7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICBkb25lOiBmYWxzZSxcbiAgICAgICAgdmFsdWU6IHNpemUsXG4gICAgICB9O1xuICAgIH0sXG4gIH07XG4gIHJldHVybiBzZW5zaXRpdmVLZXlDb2RlO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9GQVZQTkdfc2t5LWJsdWUtY2xvdWQtZGVza3RvcC13YWxscGFwZXJfWlpoV3BmQVEucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9jbG91ZF9QTkcyNC5wbmdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL21vdW50YWluX1BORzIucG5nXCI7IiwiaW1wb3J0IHsgY3JlYXRlSWRHZW5lcmF0b3IsIG5ld0ZvbnRHZW5lcmF0b3IgfSBmcm9tIFwiLi9nZW5lcmF0b3JcIjtcbmltcG9ydCBcIi4vZ2VuZXJhdG9yLmNzc1wiO1xuaW1wb3J0IFwiLi9pbWcvRkFWUE5HX3NreS1ibHVlLWNsb3VkLWRlc2t0b3Atd2FsbHBhcGVyX1paaFdwZkFRLnBuZ1wiO1xuaW1wb3J0IFwiLi9pbWcvY2xvdWRfUE5HMjQucG5nXCI7XG5pbXBvcnQgXCIuL2ltZy9tb3VudGFpbl9QTkcyLnBuZ1wiO1xuXG5jb25zdCBmb250R2VuZXJhdG9yID0gbmV3Rm9udEdlbmVyYXRvcigxNCk7XG5jb25zdCBpZEdlbmVyYXRvciA9IGNyZWF0ZUlkR2VuZXJhdG9yKCk7XG5cbmNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaWQtdGV4dFwiKTtcbmNvbnN0IGlkR2VuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpZC1nZW5cIik7XG5jb25zdCBzaXplSW5jcmVhc2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNpemVJbmNyZWFzZVwiKTtcbmNvbnN0IHNpemVEZWNyZWFzZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2l6ZURlY3JlYXNlXCIpO1xuY29uc3QgdGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGV4dFwiKTtcbmNvbnN0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbnAuY2xhc3NOYW1lID0gXCJ0YWJsZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIHBhcmFsbGF4KGV2ZW50KSB7XG4gICAgdGhpcy5xdWVyeVNlbGVjdG9yQWxsKFwiLmxheWVyXCIpLmZvckVhY2goKGxheWVyKSA9PiB7XG4gICAgICBjb25zdCBzcGVlZCA9IGxheWVyLmdldEF0dHJpYnV0ZShcImRhdGEtc3BlZWRcIik7XG4gICAgICBsYXllci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgkeyhldmVudC5jbGllbnRYICogc3BlZWQpIC8gMjAwMH1weGA7XG4gICAgfSk7XG4gIH1cblxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHBhcmFsbGF4KTtcblxuICBjb25zdCBpbmNyZWFzZSA9ICgpID0+IHtcbiAgICBpZiAodGV4dC5zdHlsZS5mb250U2l6ZSA8IFwiOTZweFwiKSB7XG4gICAgICB0ZXh0LnN0eWxlLmZvbnRTaXplID0gYCR7Zm9udEdlbmVyYXRvci5uZXh0KFwidXBcIikudmFsdWV9cHhgO1xuICAgICAgcC5zdHlsZS5mb250U2l6ZSA9IGAke2ZvbnRHZW5lcmF0b3IubmV4dChcInVwXCIpLnZhbHVlfXB4YDtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZGVjcmVhc2UgPSAoKSA9PiB7XG4gICAgaWYgKHRleHQuc3R5bGUuZm9udFNpemUgPiBcIjE0cHhcIikge1xuICAgICAgdGV4dC5zdHlsZS5mb250U2l6ZSA9IGAke2ZvbnRHZW5lcmF0b3IubmV4dChcImRvd25cIikudmFsdWV9cHhgO1xuICAgICAgcC5zdHlsZS5mb250U2l6ZSA9IGAke2ZvbnRHZW5lcmF0b3IubmV4dChcImRvd25cIikudmFsdWV9cHhgO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBibG9ja0lEID0gKCkgPT4ge1xuICAgIHAuaW5uZXJUZXh0ID0gXCJcIjtcbiAgICBwLmlubmVySFRNTCA9IGAke2lkR2VuZXJhdG9yLm5leHQoKS52YWx1ZX1gO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwKTtcbiAgfTtcblxuICBpZEdlbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGJsb2NrSUQoKTtcbiAgfSk7XG5cbiAgc2l6ZUluY3JlYXNlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgaW5jcmVhc2UoKTtcbiAgfSk7XG5cbiAgc2l6ZURlY3JlYXNlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgZGVjcmVhc2UoKTtcbiAgfSk7XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGV2ZW50KSA9PiB7XG4gICAgc3dpdGNoIChldmVudC5jb2RlKSB7XG4gICAgICBjYXNlIFwiQXJyb3dVcFwiOlxuICAgICAgICBpbmNyZWFzZSgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJBcnJvd1JpZ2h0XCI6XG4gICAgICAgIGluY3JlYXNlKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIkFycm93RG93blwiOlxuICAgICAgICBkZWNyZWFzZSgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJBcnJvd0xlZnRcIjpcbiAgICAgICAgZGVjcmVhc2UoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiRW50ZXJcIjpcbiAgICAgICAgYmxvY2tJRCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJTcGFjZVwiOlxuICAgICAgICBibG9ja0lEKCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfSk7XG59XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCJjb25zdCBzdHVkZW50cyA9IFtcItCh0LDRiNCwXCIsIFwi0IbQs9C+0YBcIiwgXCLQntC70LXQvdCwXCIsIFwi0IbRgNCwXCIsIFwi0J7Qu9C10LrRgdGW0LlcIiwgXCLQodCy0ZbRgtC70LDQvdCwXCJdO1xyXG5jb25zdCB0aGVtZXMgPSBbXHJcbiAgXCLQlNC40YTQtdGA0LXQvdGG0ZbQudC90LUg0YDRltCy0L3Rj9C90L3Rj1wiLFxyXG4gIFwi0KLQtdC+0YDRltGPINCw0LLRgtC+0LzQsNGC0ZbQslwiLFxyXG4gIFwi0JDQu9Cz0L7RgNC40YLQvNC4INGWINGB0YLRgNGD0LrRgtGD0YDQuCDQtNCw0L3QuNGFXCIsXHJcbl07XHJcbmNvbnN0IG1hcmtzID0gWzQsIDUsIDUsIDMsIDQsIDVdO1xyXG5cclxuLy8g0KDQvtC30LTRltC70ZbRgtGMINGB0YLRg9C00LXQvdGC0ZbQsiDQvdCwINC/0LDRgNC4KNGF0LvQvtC/0LXRhtGMICsg0LTRltCy0YfQuNC90LApINC00LvRjyDRgNCw0LHQvtGC0Lgg0L3QsNC0INC/0YDQvtGU0LrRgtC+0LwuXHJcbmZ1bmN0aW9uIGdldFBhaXJzKGFycikge1xyXG4gIGNvbnN0IHN0dWRlbnRzU29ydCA9IFsuLi5hcnJdLnNvcnQoKTtcclxuICBjb25zdCBwYWlycyA9IFtdO1xyXG4gIGxldCBpID0gMDtcclxuICB3aGlsZSAoaSA8IHN0dWRlbnRzU29ydC5sZW5ndGgpIHtcclxuICAgIHBhaXJzLnB1c2goW3N0dWRlbnRzU29ydFtpXSwgc3R1ZGVudHNTb3J0W2kgKyAxXV0pO1xyXG4gICAgaSArPSAyO1xyXG4gIH1cclxuICByZXR1cm4gcGFpcnM7XHJcbn1cclxuXHJcbi8vINCX0ZbRgdGC0LDQstGC0LUg0L/QsNGA0Lgg0LcgZ2V0UGFpcnMoKSDRgtCwINGC0LXQvNC4INC/0YDQvtGU0LrRgtGW0LIsINC90LDQtCDRj9C60LjQvNC4INGB0YLRg9C00LXQvdGC0Lgg0LHRg9C00YPRgtGMINC/0YDQsNGG0Y7QstCw0YLQuC5cclxuZnVuY3Rpb24gZ2V0VGhlbWVzKGFyck4sIGFyck0pIHtcclxuICBjb25zdCBwYWlyVGhlbWUgPSBbLi4uYXJyTl07XHJcbiAgbGV0IHRoZW1lcyA9IFsuLi5hcnJNXTtcclxuICB0aGVtZXMgPSB0aGVtZXMuc29ydCgpO1xyXG4gIGxldCBqID0gMDtcclxuICBwYWlyVGhlbWUuZm9yRWFjaCgoKSA9PiB7XHJcbiAgICBwYWlyVGhlbWVbal0gPSBwYWlyVGhlbWVbal0uam9pbihcIiDRliBcIikuc3BsaXQoXCIgLCBcIik7XHJcbiAgICBqKys7XHJcbiAgfSwgW10pO1xyXG4gIC8vIGZvciAobGV0IGogPSAwOyBqIDwgcGFpcnMubGVuZ3RoOyBqKyspIHtcclxuICAvLyAgIGNvbnN0IHggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlbW9cIik7XHJcbiAgLy8gICBwYWlyc1tqXSA9IHBhaXJzW2pdLmpvaW4oXCIgaSBcIik7XHJcbiAgLy8gICB4LmlubmVySFRNTCA9IGFycjE7XHJcbiAgLy8gfVxyXG4gIGxldCBpID0gMDtcclxuICBwYWlyVGhlbWUuZm9yRWFjaCgoKSA9PiB7XHJcbiAgICBwYWlyVGhlbWVbaV0ucHVzaCh0aGVtZXNbaV0pO1xyXG4gICAgaSsrO1xyXG4gIH0sIFtdKTtcclxuICByZXR1cm4gcGFpclRoZW1lO1xyXG59XHJcblxyXG4vLyDQl9GW0YHRgtCw0LLRgtC1INC+0YbRltC90LrQuChtYXJrcykg0LfRliDRgdGC0YPQtNC10L3RgtC+0Lwoc3R1ZGVudHMpLlxyXG5mdW5jdGlvbiBnZXRNYXJrKGFyciwgbnVtQXJyKSB7XHJcbiAgbGV0IHN0dWRlbnRzID0gWy4uLmFycl07XHJcbiAgbGV0IG1hcmtzID0gWy4uLm51bUFycl07XHJcbiAgbGV0IHN0dWRlbnRNYXJrID0gW107XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHVkZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgc3R1ZGVudE1hcmsucHVzaChbc3R1ZGVudHNbaV0sIG1hcmtzW2ldXSk7XHJcbiAgfVxyXG4gIHJldHVybiBzdHVkZW50TWFyaztcclxufVxyXG5cclxuLy8g0KDQsNC90LTQvtC80L3QsCDQvtGG0ZbQvdC60LAg0LLRltC0IDEg0LTQviA1OlxyXG5mdW5jdGlvbiByYW5kb21NYXJrKCkge1xyXG4gIGNvbnN0IG1pbiA9IDE7XHJcbiAgY29uc3QgbWF4ID0gNjtcclxuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW4pO1xyXG59XHJcblxyXG4vLyDQn9C+0YHRgtCw0LLRgtC1INC60L7QttC90ZbQuSDQv9Cw0YDRliDQstC40L/QsNC00LrQvtCy0YMg0L7RhtGW0L3QutGDKNCy0ZbQtCAxINC00L4gNSkg0LfQsCDQv9GA0L7RlNC60YIuXHJcbmZ1bmN0aW9uIGdldFJhbmRvbU1hcmsoYXJyYXkpIHtcclxuICBsZXQgcHJvamVjdE1hcmsgPSBhcnJheS5tYXAoKGFycikgPT4gYXJyLnNsaWNlKCkpO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdE1hcmsubGVuZ3RoOyBpKyspIHtcclxuICAgIHByb2plY3RNYXJrW2ldLnB1c2gocmFuZG9tTWFyaygpKTtcclxuICB9XHJcbiAgcmV0dXJuIHByb2plY3RNYXJrO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcGFpcnMgPSBnZXRQYWlycyhzdHVkZW50cyk7XHJcbmV4cG9ydCBjb25zdCBwYWlyVGhlbWUgPSBnZXRUaGVtZXMocGFpcnMsIHRoZW1lcyk7XHJcbmV4cG9ydCBjb25zdCBtYXJrUHVwaWwgPSBnZXRNYXJrKHN0dWRlbnRzLCBtYXJrcyk7XHJcbmV4cG9ydCBjb25zdCBwcm9qZWN0TWFyayA9IGdldFJhbmRvbU1hcmsocGFpclRoZW1lKTtcclxuIiwiaW1wb3J0IHsgcGFpcnMsIHBhaXJUaGVtZSwgbWFya1B1cGlsLCBwcm9qZWN0TWFyayB9IGZyb20gXCIuL3N0dWRlbnRzQ2FyZFwiO1xyXG5pbXBvcnQgXCIuL3N0dWRlbnRzLmNzc1wiO1xyXG5cclxuY29uc3QgY2FyZDEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnAxXCIpO1xyXG5jb25zdCBjYXJkMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucDJcIik7XHJcbmNvbnN0IGNhcmQzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wM1wiKTtcclxuY29uc3QgY2FyZDQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnA0XCIpO1xyXG5cclxuZnVuY3Rpb24gc2V0UGFpcnMocGFpcnMpIHtcclxuICBsZXQgaSA9IDA7XHJcbiAgZm9yIChsZXQgcGFpciBvZiBwYWlycykge1xyXG4gICAgY29uc3QgcGFpciA9IGAke2kgKyAxfSDQv9Cw0YDQsDogJHtwYWlyc1tpXS5qb2luKFwiICwgXCIpfWA7XHJcbiAgICBjYXJkMVtpXS50ZXh0Q29udGVudCA9IGAke3BhaXJ9YDtcclxuICAgIGkrKztcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldFRoZW1lcyhwYWlyVGhlbWUpIHtcclxuICBsZXQgaSA9IDA7XHJcbiAgZm9yIChsZXQgc29tZSBvZiBwYWlyVGhlbWUpIHtcclxuICAgIGNvbnN0IHBhaXJTb21lb25lID0gYCR7aSArIDF9INC/0LDRgNCwOiAke3BhaXJUaGVtZVtpXS5qb2luKFwiICwgXCIpfWA7XHJcbiAgICBjYXJkMltpXS50ZXh0Q29udGVudCA9IGAke3BhaXJTb21lb25lfWA7XHJcbiAgICBpKys7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRFdmVyeU1hcmsobWFya1B1cGlsKSB7XHJcbiAgbGV0IGkgPSAwO1xyXG4gIGZvciAobGV0IG1hcmsgb2YgbWFya1B1cGlsKSB7XHJcbiAgICBjb25zdCBtYXJrRXZlcnkgPSBgJHtpICsgMX06ICR7bWFya1B1cGlsW2ldLmpvaW4oXCIgLCBcIil9YDtcclxuICAgIGNhcmQzW2ldLnRleHRDb250ZW50ID0gYCR7bWFya0V2ZXJ5fWA7XHJcbiAgICBpKys7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRQcm9qZWN0TWFyayhwcm9qZWN0TWFyaykge1xyXG4gIGxldCBpID0gMDtcclxuICBmb3IgKGxldCBtYXJrIG9mIHByb2plY3RNYXJrKSB7XHJcbiAgICBjb25zdCBwcm9qZWN0ID0gYCR7aSArIDF9INC/0LDRgNCwOiAke3Byb2plY3RNYXJrW2ldLmpvaW4oXCIgLCBcIil9YDtcclxuICAgIGNhcmQ0W2ldLnRleHRDb250ZW50ID0gYCR7cHJvamVjdH1gO1xyXG4gICAgaSsrO1xyXG4gIH1cclxufVxyXG5cclxuY29uc3Qgc2V0Q2FyZHNCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNldENhcmRzQnRuXCIpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xyXG4gIHNldENhcmRzQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICBjYXJkMS50ZXh0Q29udGVudCA9IHNldFBhaXJzKHBhaXJzKTtcclxuICAgIGNhcmQyLnRleHRDb250ZW50ID0gc2V0VGhlbWVzKHBhaXJUaGVtZSk7XHJcbiAgICBjYXJkMy50ZXh0Q29udGVudCA9IHNldEV2ZXJ5TWFyayhtYXJrUHVwaWwpO1xyXG4gICAgY2FyZDQudGV4dENvbnRlbnQgPSBzZXRQcm9qZWN0TWFyayhwcm9qZWN0TWFyayk7XHJcbiAgfSk7XHJcbn1cclxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwiLy8xLiDQv9C+0LLQtdGA0YLQsNGUINGB0L/QuNGB0L7QuiDQv9GA0LXQtNC80LXRgtGW0LIg0LTQu9GPINC60L7QvdC60YDQtdGC0L3QvtCz0L4g0YHRgtGD0LTQtdC90YLQsFxuZXhwb3J0IGZ1bmN0aW9uIGdldFN1YmplY3RzKHN0dWRlbnQpIHtcbiAgY29uc3Qgc3ViamVjdHMgPSBPYmplY3Qua2V5cyhzdHVkZW50LnN1YmplY3RzKTtcbiAgcmV0dXJuIHN1YmplY3RzLm1hcChcbiAgICAoc3ViamVjdCkgPT5cbiAgICAgIHN1YmplY3Quc2xpY2UoMCwgMSkudG9VcHBlckNhc2UoKSArIHN1YmplY3Quc2xpY2UoMSkucmVwbGFjZShcIl9cIiwgXCIgXCIpXG4gICk7XG59XG5cbi8vIDIuINC/0L7QstC10YDQvdC1INGB0LXRgNC10LTQvdGOINC+0YbRltC90LrRgyDQv9C+INGD0YHRltC8INC/0YDQtdC00LzQtdGC0LDQvCDQtNC70Y8g0L/QtdGA0LXQtNCw0L3QvtCz0L4g0YHRgtGD0LTQtdC90YLQsFxuZXhwb3J0IGZ1bmN0aW9uIGdldEF2ZXJhZ2VNYXJrKHN0dWRlbnQpIHtcbiAgY29uc3QgbWFya3NPYmogPSBPYmplY3QudmFsdWVzKHN0dWRlbnQuc3ViamVjdHMpO1xuICBjb25zdCBtYXJrcyA9IFtdO1xuICBsZXQgc3VtTWFya3MgPSAwO1xuICBsZXQgc3VtT2JqID0gMDtcbiAgZm9yIChsZXQgbWFyayBvZiBtYXJrc09iaikge1xuICAgIGxldCBzdW0gPSAwO1xuICAgIHN1bU9iaiA9IG1hcmsucmVkdWNlKChhY2MsIG51bSkgPT4ge1xuICAgICAgc3VtID0gYWNjICsgbnVtO1xuICAgICAgcmV0dXJuIHN1bTtcbiAgICB9LCAwKTtcbiAgICBtYXJrcy5wdXNoKHN1bU9iaik7XG4gICAgc3VtTWFya3MgKz0gbWFyay5sZW5ndGg7XG4gIH1cbiAgcmV0dXJuIG1hcmtzLnJlZHVjZSgoYWNjLCBudW0pID0+IGFjYyArIG51bSwgMCkgLyBzdW1NYXJrcztcbn1cblxuLy8gMy7Qv9C+0LLQtdGA0YLQsNGUINGW0L3RhNC+0YDQvNCw0YbRltGOINC30LDQs9Cw0LvRjNC90L7Qs9C+INCy0LjQtNGDINC/0L4g0L/QtdGA0LXQtNCw0L3QvtC80YMg0YHRgtGD0LTQtdC90YLRg1xuZXhwb3J0IGZ1bmN0aW9uIGdldFN0dWRlbnRJbmZvKHN0dWRlbnQpIHtcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBzdHVkZW50Lm5hbWUsXG4gICAgY291cnNlOiBzdHVkZW50LmNvdXJzZSxcbiAgICBhdmVyYWdlOiBnZXRBdmVyYWdlTWFyayhzdHVkZW50KSxcbiAgfTtcbn1cblxuLy8gNC4g0L/QvtCy0LXRgNGC0LDRlCDRltC80LXQvdCwINGB0YLRg9C00LXQvdGC0ZbQsiDRgyDQsNC70YTQsNCy0ZbRgtC90L7QvNGDINC/0L7RgNGP0LTQutGDLlxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0dWRlbnRzTmFtZXMoc3R1ZGVudHMpIHtcbiAgcmV0dXJuIHN0dWRlbnRzLm1hcCgoc3R1ZGVudCkgPT4gc3R1ZGVudC5uYW1lKS5zb3J0KCk7XG59XG5cbi8vIDUuINC/0L7QstC10YDRgtCw0ZQg0LrRgNCw0YnQvtCz0L4g0YHRgtGD0LTQtdC90YLQsCDQt9GWINGB0L/QuNGB0LrRgyDQv9C+INC/0L7QutCw0LfQvdC40LrRgyDRgdC10YDQtdC00L3RjNC+0Zcg0L7RhtGW0L3QutC4LlxuZXhwb3J0IGZ1bmN0aW9uIGdldEJlc3RTdHVkZW50KHN0dWRlbnRzKSB7XG4gIGxldCBiZXN0QXZlck1hcms7XG4gIGxldCBiZXN0U3R1ZGVudCA9IG51bGw7XG4gIGNvbnN0IG5hbWVzID0gW107XG4gIGNvbnN0IGF2ZXJhZ2UgPSBbXTtcbiAgZm9yIChsZXQgc3R1ZGVudCBvZiBzdHVkZW50cykge1xuICAgIGF2ZXJhZ2UucHVzaChnZXRBdmVyYWdlTWFyayhzdHVkZW50KSk7XG4gICAgbmFtZXMucHVzaChzdHVkZW50Lm5hbWUpO1xuICB9XG5cbiAgYmVzdEF2ZXJNYXJrID0gTWF0aC5tYXgoLi4uYXZlcmFnZSk7XG4gIGNvbnN0IG9iaiA9IE9iamVjdC5hc3NpZ24oXG4gICAgLi4ubmFtZXMubWFwKChuYW1lLCBpKSA9PiAoeyBbbmFtZV06IGF2ZXJhZ2VbaV0gfSkpXG4gICk7XG5cbiAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMob2JqKSkge1xuICAgIGlmICh2YWx1ZSA9PT0gYmVzdEF2ZXJNYXJrKSB7XG4gICAgICBiZXN0U3R1ZGVudCA9IGAke2tleX1gO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYmVzdFN0dWRlbnQ7XG59XG5cbi8vIDYuINC/0L7QstC10YDRgtCw0ZQg0L7QsdGUJ9C60YIsINCyINGP0LrQvtC80YMg0LrQu9GO0YfRliDRhtC1INCx0YPQutCy0Lgg0YMg0YHQu9C+0LLRliwg0LAg0LfQvdCw0YfQtdC90L3RjyDigJMg0LrRltC70YzQutGW0YHRgtGMINGX0YUg0L/QvtCy0YLQvtGA0LXQvdGMLlxuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZVdvcmRMZXR0ZXJzKHN0cmluZykge1xuICBjb25zdCB3b3JkID0gc3RyaW5nLnNwbGl0KFwiXCIpO1xuICBjb25zdCBvYmogPSB7fTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHJpbmcubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBsZXR0ZXIgPSB3b3JkW2ldO1xuICAgIGlmIChvYmpbbGV0dGVyXSkge1xuICAgICAgb2JqW2xldHRlcl0gKz0gMTtcbiAgICB9IGVsc2Ugb2JqW2xldHRlcl0gPSAxO1xuICB9XG4gIHJldHVybiBvYmo7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdHJpbmdPYmplY3Qob2JqKSB7XG4gIGxldCBsaXN0ID0gXCJcIjtcbiAgZm9yIChsZXQga2V5IGluIG9iaikge1xuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgbGlzdCArPSBgXCIke2tleX1cIiA6ICAke29ialtrZXldfSwgYDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGxpc3Q7XG59XG4iLCJleHBvcnQgY29uc3Qgc3R1ZGVudHMgPSBbXG4gIHtcbiAgICBuYW1lOiBcIlRhbnlhXCIsXG4gICAgY291cnNlOiAzLFxuICAgIHN1YmplY3RzOiB7XG4gICAgICBtYXRoOiBbNCwgNCwgMywgNF0sXG4gICAgICBhbGdvcml0aG1zOiBbMywgMywgMywgNCwgNCwgNF0sXG4gICAgICBkYXRhX3NjaWVuY2U6IFs1LCA1LCAzLCA0XSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJWaWN0b3JcIixcbiAgICBjb3Vyc2U6IDQsXG4gICAgc3ViamVjdHM6IHtcbiAgICAgIHBoeXNpY3M6IFs1LCA1LCA1LCAzXSxcbiAgICAgIGVjb25vbWljczogWzIsIDMsIDMsIDMsIDMsIDVdLFxuICAgICAgZ2VvbWV0cnk6IFs1LCA1LCAyLCAzLCA1XSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJBbnRvblwiLFxuICAgIGNvdXJzZTogMixcbiAgICBzdWJqZWN0czoge1xuICAgICAgc3RhdGlzdGljczogWzQsIDUsIDUsIDUsIDUsIDMsIDQsIDMsIDQsIDVdLFxuICAgICAgZW5nbGlzaDogWzUsIDNdLFxuICAgICAgY29zbW9sb2d5OiBbNSwgNSwgNSwgNV0sXG4gICAgfSxcbiAgfSxcbl07XG5cbmV4cG9ydCBkZWZhdWx0IHN0dWRlbnRzO1xuIiwiaW1wb3J0IHtcclxuICBnZXRTdWJqZWN0cyxcclxuICBnZXRBdmVyYWdlTWFyayxcclxuICBnZXRTdHVkZW50SW5mbyxcclxuICBnZXRTdHVkZW50c05hbWVzLFxyXG4gIGdldEJlc3RTdHVkZW50LFxyXG4gIGNhbGN1bGF0ZVdvcmRMZXR0ZXJzLFxyXG4gIGdldFN0cmluZ09iamVjdCxcclxufSBmcm9tIFwiLi9zdHVkZW50RGF0YVwiO1xyXG5pbXBvcnQgc3R1ZGVudHMgZnJvbSBcIi4vc3R1ZGVudHNcIjtcclxuaW1wb3J0IFwiLi9zdHVkZW50LmNzc1wiO1xyXG5cclxuZnVuY3Rpb24gdGFzazEoKSB7XHJcbiAgY29uc3Qgc2V0U3ViamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3ViamVjdHNcIik7XHJcbiAgaWYgKCFzZXRTdWJqZWN0LmNoaWxkTm9kZXMubGVuZ3RoKSB7XHJcbiAgICBmb3IgKGxldCBzdHVkZW50IG9mIHN0dWRlbnRzKSB7XHJcbiAgICAgIHNldFN1YmplY3QuaW5uZXJIVE1MICs9IGBcclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkc1wiPlxyXG4gICAgICAgICAgICA8aDMgY2xhc3M9XCJjYXJkc19fdGl0bGVcIj4ke3N0dWRlbnQubmFtZX08L2gzPlxyXG4gICAgICAgICAgICAgICA8cCBjbGFzcz1cImNhcmRzLWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAke2dldFN1YmplY3RzKHN0dWRlbnQpLmpvaW4oXCIgLCA8L2JyPlwiKX1cclxuICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgPC9kaXY+YDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRhc2syKCkge1xyXG4gIGNvbnN0IHNldEF2ZXJhZ2VNYXJrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hdmVyTWFya3NcIik7XHJcbiAgaWYgKCFzZXRBdmVyYWdlTWFyay5jaGlsZE5vZGVzLmxlbmd0aCkge1xyXG4gICAgZm9yIChsZXQgc3R1ZGVudCBvZiBzdHVkZW50cykge1xyXG4gICAgICBzZXRBdmVyYWdlTWFyay5pbm5lckhUTUwgKz0gYFxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRzXCI+XHJcbiAgICAgICAgICAgIDxoMyBjbGFzcz1cImNhcmRzX190aXRsZVwiPiR7c3R1ZGVudC5uYW1lfTwvaDM+XHJcbiAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiY2FyZHMtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICR7Z2V0QXZlcmFnZU1hcmsoc3R1ZGVudCkudG9GaXhlZCgyKX1cclxuICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgPC9kaXY+YDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRhc2szKCkge1xyXG4gIGNvbnN0IHNldEluZm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZm9ybVwiKTtcclxuICBpZiAoIXNldEluZm8uY2hpbGROb2Rlcy5sZW5ndGgpIHtcclxuICAgIGZvciAobGV0IHN0dWRlbnQgb2Ygc3R1ZGVudHMpIHtcclxuICAgICAgZ2V0U3R1ZGVudEluZm8oc3R1ZGVudCk7XHJcbiAgICAgIHNldEluZm8uaW5uZXJIVE1MICs9IGBcclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkc1wiPlxyXG4gICAgICAgICAgICAgICA8cCBjbGFzcz1cImNhcmRzLWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgPHNwYW4+IHN0dWRlbnQgbmFtZTogICAgICAke3N0dWRlbnQubmFtZX07ICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgIDxzcGFuPiAgY291cnNlOiAgICAgICAgICAgICR7c3R1ZGVudC5jb3Vyc2V9OyAgICAgPC9zcGFuPiAgIFxyXG4gICAgICAgICAgICAgICA8c3Bhbj4gIGF2ZXJhZ2UgbWFyazogICAgICAke2dldEF2ZXJhZ2VNYXJrKHN0dWRlbnQpLnRvRml4ZWQoXHJcbiAgICAgICAgICAgICAgICAgMlxyXG4gICAgICAgICAgICAgICApfTsgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICA8L2Rpdj5gO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdGFzazQoKSB7XHJcbiAgY29uc3Qgc2V0U29ydE5hbWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zb3J0TmFtZXNcIik7XHJcbiAgc2V0U29ydE5hbWVzLmlubmVySFRNTCA9IGBcclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkc1wiPlxyXG4gICAgICAgICAgICAgICA8cCBjbGFzcz1cImNhcmRzLWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAke2dldFN0dWRlbnRzTmFtZXMoc3R1ZGVudHMpLmpvaW4oXCIgLCBcIil9XHJcbiAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgIDwvZGl2PmA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRhc2s1KCkge1xyXG4gIGNvbnN0IHNldEJlc3RTdHVkZW50TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYmVzdFN0dWRcIik7XHJcbiAgc2V0QmVzdFN0dWRlbnROYW1lLmlubmVySFRNTCA9IGBcclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkc1wiPlxyXG4gICAgICAgICAgICAgICA8cCBjbGFzcz1cImNhcmRzLWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAke2dldEJlc3RTdHVkZW50KHN0dWRlbnRzKX1cclxuICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgPC9kaXY+YDtcclxufVxyXG5cclxuZnVuY3Rpb24gdGFzazYoKSB7XHJcbiAgY29uc3QgZ2V0V29yZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd29yZFwiKS52YWx1ZTtcclxuICBjb25zdCBzZXRDb3VudExldHRlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxldHRlcnNcIik7XHJcbiAgc2V0Q291bnRMZXR0ZXJzLmlubmVySFRNTCA9IGBcclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkc1wiPlxyXG4gICAgICAgICAgICAgICA8cCBjbGFzcz1cImNhcmRzLWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAke2dldFN0cmluZ09iamVjdChjYWxjdWxhdGVXb3JkTGV0dGVycyhnZXRXb3JkKSl9XHJcbiAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgIDwvZGl2PmA7XHJcbn1cclxuXHJcbi8qIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSBCdXR0b25zIGNsaWNrIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcclxuICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcclxuICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY2xpY2stMVwiKSkge1xyXG4gICAgICBgJHt0YXNrMSgpfWA7XHJcbiAgICB9XHJcbiAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImNsaWNrLTJcIikpIHtcclxuICAgICAgYCR7dGFzazIoKX1gO1xyXG4gICAgfVxyXG4gICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJjbGljay0zXCIpKSB7XHJcbiAgICAgIGAke3Rhc2szKCl9YDtcclxuICAgIH1cclxuICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY2xpY2stNFwiKSkge1xyXG4gICAgICBgJHt0YXNrNCgpfWA7XHJcbiAgICB9XHJcbiAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImNsaWNrLTVcIikpIHtcclxuICAgICAgYCR7dGFzazUoKX1gO1xyXG4gICAgfVxyXG4gICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJjbGljay02XCIpKSB7XHJcbiAgICAgIGAke3Rhc2s2KCl9YDtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCJpbXBvcnQgXCIuL2dlbkJsb2Nrcy5jc3NcIjtcclxuXHJcbmNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyXCIpO1xyXG5jb25zdCByYW5kb21Db2xvckJsb2NrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29sb3JCbG9ja3NcIik7XHJcbmNvbnN0IHN0b3BCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0b3BcIik7XHJcbmNvbnN0IHNldEJsb2NrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmV3QmxvY2tzXCIpO1xyXG5sZXQgdGltZXJJZDtcclxuXHJcbmNvbnN0IHNldEJnID0gKGVsZW0pID0+IHtcclxuICBlbGVtLnN0eWxlLmJhY2tncm91bmRDb2xvciA9XHJcbiAgICBcIiNcIiArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDE2Nzc3MjE1KS50b1N0cmluZygxNik7XHJcbn07XHJcblxyXG5jb25zdCBzZXRTcXVhcmVDb250YWluZXIgPSAoKSA9PiB7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAyNTsgaSsrKSB7XHJcbiAgICBjb250YWluZXIuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIGA8ZGl2IGNsYXNzPVwic3F1YXJlXCI+PC9kaXY+YCk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3Qgc2V0UmFuZG9tQ29sb3IgPSAoKSA9PiB7XHJcbiAgY29uc3QgZGl2U3F1YXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc3F1YXJlXCIpO1xyXG4gIGRpdlNxdWFyZXMuZm9yRWFjaCgoc3F1YXJlKSA9PiBzZXRCZyhzcXVhcmUpKTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIHN0b3AoKSB7XHJcbiAgY2xlYXJJbnRlcnZhbCh0aW1lcklkKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xyXG4gIHNldEJsb2Nrcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgc2V0QmxvY2tzLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwiZGlzYWJsZWRcIik7XHJcbiAgICBzZXRTcXVhcmVDb250YWluZXIoKTtcclxuICB9KTtcclxuXHJcbiAgcmFuZG9tQ29sb3JCbG9ja3MuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgIHJhbmRvbUNvbG9yQmxvY2tzLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwiZGlzYWJsZWRcIik7XHJcbiAgICB0aW1lcklkID0gc2V0SW50ZXJ2YWwoc2V0UmFuZG9tQ29sb3IsIDEwMDApO1xyXG4gIH0pO1xyXG5cclxuICBzdG9wQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICByYW5kb21Db2xvckJsb2Nrcy5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcclxuICAgIGAke3N0b3AoKX1gO1xyXG4gIH0pO1xyXG59XHJcbiIsImltcG9ydCBpbml0Q2hhcmFjdGVycyBmcm9tIFwiLi9jaGFyYWN0ZXJzRmlsbS9jb250cm9sbGVyXCI7XHJcbmltcG9ydCBpbml0R2VuZXJhdG9yIGZyb20gXCIuL2h3MTMvdmlld1wiO1xyXG5pbXBvcnQgaW5pdENoYWluIGZyb20gXCIuL2h3MTEvdmlld1wiO1xyXG5pbXBvcnQgaW5pdEdlbkJsb2NrcyBmcm9tIFwiLi9odzkvZ2VuQmxvY2tzXCI7XHJcbmltcG9ydCBpbml0U3R1ZGVudHMgZnJvbSBcIi4vaHc0L3ZpZXdcIjtcclxuaW1wb3J0IGluaXRTdHVkZW50RGF0YSBmcm9tIFwiLi9odzYvdmlld1wiO1xyXG5cclxuaW5pdEdlbmVyYXRvcigpO1xyXG5pbml0Q2hhcmFjdGVycygpO1xyXG5pbml0Q2hhaW4oKTtcclxuaW5pdEdlbkJsb2NrcygpO1xyXG5pbml0U3R1ZGVudHMoKTtcclxuaW5pdFN0dWRlbnREYXRhKCk7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=