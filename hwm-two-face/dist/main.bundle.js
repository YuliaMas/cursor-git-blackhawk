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



Object(_hw13_view__WEBPACK_IMPORTED_MODULE_1__["default"])();
Object(_charactersFilm_controller__WEBPACK_IMPORTED_MODULE_0__["default"])();


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9idWlsZEZ1bGxQYXRoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9jcmVhdGVFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9lbmhhbmNlRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL21lcmdlQ29uZmlnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9zZXR0bGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3RyYW5zZm9ybURhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYmluZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc3ByZWFkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyc0ZpbG0vUGhvdG9DaGFyLmpzIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9jaGFyYWN0ZXJzLmNzcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyc0ZpbG0vY2hhcmFjdGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyc0ZpbG0vY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyc0ZpbG0vaW1nL0FkaSBHYWxsaWEucG5nIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvQW5ha2luLVNreXdhbGtlci5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9BcnZlbENyeW55ZC5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9BeWxhLVNlY3VyYS5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9CYWlsX09yZ2FuYS5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9CYXJyaXNzLU9mZmVlLnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyc0ZpbG0vaW1nL0JlblF1YWRpbmFyb3NIUy1TV0UucG5nIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvQmVydV9MYXJzLmpmaWYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9CaWdnc19EYXJrbGlnaHRlci5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9DaGFyYWN0ZXItTG9ib3QucG5nIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvQ29yZMOpLmpwZyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyc0ZpbG0vaW1nL0RhcnRoLU1hdWwucG5nIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvRG9ybcOpLmpwZyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyc0ZpbG0vaW1nL0R1ZF9Cb2x0LmpwZyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyc0ZpbG0vaW1nL0VldGhfS290aC5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9HYXNnYW5wLmpwZyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyc0ZpbG0vaW1nL0dyZWdhci1UeXBoby5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9IYW4tU29sby5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9KYW5nbyBGZXR0LnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyc0ZpbG0vaW1nL0phci1KYXItQmlua3MucG5nIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvSmVrX1Rvbm9fUG9ya2lucy5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9Kb2Nhc3RhLU51LnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyc0ZpbG0vaW1nL0tpLUFkaS1NdW5kaS5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9LaXRfRmlzdG8uamZpZiIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyc0ZpbG0vaW1nL0xhbWFfc3UucG5nIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvTHVtaW5hcmEtVW5kdWxpLnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyc0ZpbG0vaW1nL01hc19BbWVkZGEucG5nIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvTW9uX01vdGhtYS5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9OdXRlLUd1bnJheS5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9QYWRtw6ktQW1pZGFsYS5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9QbG8tS29vbnQucG5nIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvUG9nZ2xldGhlbGVzc2VyX2RldGFpbC5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9RdWFyc2gtUGFuYWthLmpwZyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyc0ZpbG0vaW1nL1F1aS1Hb24tSmlubi5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9SNC1QMTctNzUwMDYucG5nIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvUmF0dHNIUy5qcGciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9SYXltdXNBbnRpbGxlcy5qcGciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9SaWNfT2xpZS5qcGciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9Sb29zLVRhcnBhbHMucG5nIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvUnVnb3JOYXNzLVNXQ1QucG5nIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvU2Flc2VlLVRpaW4ucG5nIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvU2FuX0hpbGwucG5nIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvU2VidWxiYS5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9TaGFha3RpX2RldGFpbC5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9TaG1pLVNreXdhbGtlci5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9TbHktTW9vcmUucG5nIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvVGFya2luLVNXRS5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9UYXVuLVdlLnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyc0ZpbG0vaW1nL1Rpb25fTWVkb24ud2VicCIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyc0ZpbG0vaW1nL1ZhbG9ydW0tU1dFLnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyc0ZpbG0vaW1nL1dhdF9UYW1ib3IucG5nIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvV2F0dG8ucG5nIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvV2VkZ2VfQW50aWxsZXMucG5nIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvWWFyYWVsLVBvb2YucG5nIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvWmFtX1dlc2VsbC5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9hY2tiYXIuanBnIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvYmliX2ZvcnR1bmEucG5nIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvYm9iYS1mZXR0LnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyc0ZpbG0vaW1nL2Jvc3NrLnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyc0ZpbG0vaW1nL2MtM3BvLnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyc0ZpbG0vaW1nL2NoZXdiYWNjYS5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9jbGllZ2dsYXJzX2RldGFpbC5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9kYXJrX3dhaWRlci5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9kZXh0ZXJqZXR0c3Rlcl9kZXRhaWwucG5nIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvZG9va3UucG5nIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvZ2VuZXJhbC1ncmlldm91cy5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9ncmVlZG8uanBnIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvaWotODgtamFiYmFwbmcucG5nIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvamFiYmEtdGhlLWh1dHQtYm9iYS1mZXR0LXlvZGEuanBlZyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyc0ZpbG0vaW1nL2xhbmRvLWNhbHJpc3NpYW4uanBnIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvbGVpbGEgb3JnYW5hLnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyc0ZpbG0vaW1nL2x1a2Utc2t5d2Fsa2VyLnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyc0ZpbG0vaW1nL21hY2Utd2luZHUucG5nIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvbWF4cmVzZGVmYXVsdC5qcGciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9uaWVuLW51bmIucG5nIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcvb3dlbi1sYXJzLnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyc0ZpbG0vaW1nL3BhbHBhdGluZS5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9yMi1kMi5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy9yNS1kNC5qcGciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy90YXJmZnVsX2RldGFpbC5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL2ltZy93YW4ta2Vub2JpLnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyc0ZpbG0vaW1nL3dpY2tldF93X3dhcndpY2sucG5nIiwid2VicGFjazovLy8uL3NyYy9jaGFyYWN0ZXJzRmlsbS9pbWcveW9kYS5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoYXJhY3RlcnNGaWxtL3ZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2h3MTMvZ2VuZXJhdG9yLmNzcyIsIndlYnBhY2s6Ly8vLi9zcmMvaHcxMy9nZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2h3MTMvaW1nL0ZBVlBOR19za3ktYmx1ZS1jbG91ZC1kZXNrdG9wLXdhbGxwYXBlcl9aWmhXcGZBUS5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2h3MTMvaW1nL2Nsb3VkX1BORzI0LnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvaHcxMy9pbWcvbW91bnRhaW5fUE5HMi5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2h3MTMvdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLGlCQUFpQixtQkFBTyxDQUFDLHNEQUFhLEU7Ozs7Ozs7Ozs7OztBQ0F6Qjs7QUFFYixZQUFZLG1CQUFPLENB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QTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGFBQWE7QUFDeEIsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQ0FBbUMsT0FBTztBQUMxQztBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsU0FBUyxHQUFHLFNBQVM7QUFDNUMsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCw0QkFBNEI7QUFDNUIsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQSx1Q0FBdUMsT0FBTztBQUM5QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzlWQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDOztBQUVyQztBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixVQUFVOzs7Ozs7Ozs7Ozs7O0FDdkx0QztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlLDhFQUFlLEVBQUM7Ozs7Ozs7Ozs7OztBQ3RGL0IsdUM7Ozs7Ozs7Ozs7OztBQ0FBO0FBQUE7QUFBQTtBQUEwQjs7QUFFMUI7O0FBRUE7QUFDQSxrQkFBa0IsNENBQUs7QUFDdkI7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRWUsZ0VBQUMsVUFBVSxFQUFDOzs7Ozs7Ozs7Ozs7O0FDbEIzQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBdUM7QUFDSjtBQUNUO0FBQ087O0FBRWpDO0FBQ0E7O0FBRWU7QUFDZjtBQUNBO0FBQ0E7QUFDQSxJQUFJLG1EQUFXLGdDQUFnQyw2Q0FBYTtBQUM1RCxHQUFHO0FBQ0gsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ2REO0FBQWUscUZBQXNCLEU7Ozs7Ozs7Ozs7OztBQ0FyQztBQUFlLDJGQUE0QixFOzs7Ozs7Ozs7Ozs7QUNBM0M7QUFBZSxzRkFBdUIsRTs7Ozs7Ozs7Ozs7O0FDQXRDO0FBQWUsc0ZBQXVCLEU7Ozs7Ozs7Ozs7OztBQ0F0QztBQUFlLHNGQUF1QixFOzs7Ozs7Ozs7Ozs7QUNBdEM7QUFBZSx3RkFBeUIsRTs7Ozs7Ozs7Ozs7O0FDQXhDO0FBQWUsOEZBQStCLEU7Ozs7Ozs7Ozs7OztBQ0E5QztBQUFlLHFGQUFzQixFOzs7Ozs7Ozs7Ozs7QUNBckM7QUFBZSw0RkFBNkIsRTs7Ozs7Ozs7Ozs7O0FDQTVDO0FBQWUsMEZBQTJCLEU7Ozs7Ozs7Ozs7OztBQ0ExQztBQUFlLGdGQUFpQixFOzs7Ozs7Ozs7Ozs7QUNBaEM7QUFBZSxxRkFBc0IsRTs7Ozs7Ozs7Ozs7O0FDQXJDO0FBQWUsZ0ZBQWlCLEU7Ozs7Ozs7Ozs7OztBQ0FoQztBQUFlLG1GQUFvQixFOzs7Ozs7Ozs7Ozs7QUNBbkM7QUFBZSxvRkFBcUIsRTs7Ozs7Ozs7Ozs7O0FDQXBDO0FBQWUsa0ZBQW1CLEU7Ozs7Ozs7Ozs7OztBQ0FsQztBQUFlLHVGQUF3QixFOzs7Ozs7Ozs7Ozs7QUNBdkM7QUFBZSxtRkFBb0IsRTs7Ozs7Ozs7Ozs7O0FDQW5DO0FBQWUscUZBQXNCLEU7Ozs7Ozs7Ozs7OztBQ0FyQztBQUFlLHdGQUF5QixFOzs7Ozs7Ozs7Ozs7QUNBeEM7QUFBZSwyRkFBNEIsRTs7Ozs7Ozs7Ozs7O0FDQTNDO0FBQWUscUZBQXNCLEU7Ozs7Ozs7Ozs7OztBQ0FyQztBQUFlLHVGQUF3QixFOzs7Ozs7Ozs7Ozs7QUNBdkM7QUFBZSxxRkFBc0IsRTs7Ozs7Ozs7Ozs7O0FDQXJDO0FBQWUsa0ZBQW1CLEU7Ozs7Ozs7Ozs7OztBQ0FsQztBQUFlLDBGQUEyQixFOzs7Ozs7Ozs7Ozs7QUNBMUM7QUFBZSxxRkFBc0IsRTs7Ozs7Ozs7Ozs7O0FDQXJDO0FBQWUscUZBQXNCLEU7Ozs7Ozs7Ozs7OztBQ0FyQztBQUFlLHNGQUF1QixFOzs7Ozs7Ozs7Ozs7QUNBdEM7QUFBZSx3RkFBeUIsRTs7Ozs7Ozs7Ozs7O0FDQXhDO0FBQWUsb0ZBQXFCLEU7Ozs7Ozs7Ozs7OztBQ0FwQztBQUFlLGlHQUFrQyxFOzs7Ozs7Ozs7Ozs7QUNBakQ7QUFBZSx3RkFBeUIsRTs7Ozs7Ozs7Ozs7O0FDQXhDO0FBQWUsdUZBQXdCLEU7Ozs7Ozs7Ozs7OztBQ0F2QztBQUFlLHVGQUF3QixFOzs7Ozs7Ozs7Ozs7QUNBdkM7QUFBZSxrRkFBbUIsRTs7Ozs7Ozs7Ozs7O0FDQWxDO0FBQWUseUZBQTBCLEU7Ozs7Ozs7Ozs7OztBQ0F6QztBQUFlLG1GQUFvQixFOzs7Ozs7Ozs7Ozs7QUNBbkM7QUFBZSx1RkFBd0IsRTs7Ozs7Ozs7Ozs7O0FDQXZDO0FBQWUseUZBQTBCLEU7Ozs7Ozs7Ozs7OztBQ0F6QztBQUFlLHNGQUF1QixFOzs7Ozs7Ozs7Ozs7QUNBdEM7QUFBZSxtRkFBb0IsRTs7Ozs7Ozs7Ozs7O0FDQW5DO0FBQWUsa0ZBQW1CLEU7Ozs7Ozs7Ozs7OztBQ0FsQztBQUFlLHlGQUEwQixFOzs7Ozs7Ozs7Ozs7QUNBekM7QUFBZSx5RkFBMEIsRTs7Ozs7Ozs7Ozs7O0FDQXpDO0FBQWUsb0ZBQXFCLEU7Ozs7Ozs7Ozs7OztBQ0FwQztBQUFlLHFGQUFzQixFOzs7Ozs7Ozs7Ozs7QUNBckM7QUFBZSxrRkFBbUIsRTs7Ozs7Ozs7Ozs7O0FDQWxDO0FBQWUsc0ZBQXVCLEU7Ozs7Ozs7Ozs7OztBQ0F0QztBQUFlLHNGQUF1QixFOzs7Ozs7Ozs7Ozs7QUNBdEM7QUFBZSxxRkFBc0IsRTs7Ozs7Ozs7Ozs7O0FDQXJDO0FBQWUsZ0ZBQWlCLEU7Ozs7Ozs7Ozs7OztBQ0FoQztBQUFlLHlGQUEwQixFOzs7Ozs7Ozs7Ozs7QUNBekM7QUFBZSxzRkFBdUIsRTs7Ozs7Ozs7Ozs7O0FDQXRDO0FBQWUscUZBQXNCLEU7Ozs7Ozs7Ozs7OztBQ0FyQztBQUFlLGlGQUFrQixFOzs7Ozs7Ozs7Ozs7QUNBakM7QUFBZSxzRkFBdUIsRTs7Ozs7Ozs7Ozs7O0FDQXRDO0FBQWUsb0ZBQXFCLEU7Ozs7Ozs7Ozs7OztBQ0FwQztBQUFlLGdGQUFpQixFOzs7Ozs7Ozs7Ozs7QUNBaEM7QUFBZSxnRkFBaUIsRTs7Ozs7Ozs7Ozs7O0FDQWhDO0FBQWUsb0ZBQXFCLEU7Ozs7Ozs7Ozs7OztBQ0FwQztBQUFlLDRGQUE2QixFOzs7Ozs7Ozs7Ozs7QUNBNUM7QUFBZSxzRkFBdUIsRTs7Ozs7Ozs7Ozs7O0FDQXRDO0FBQWUsZ0dBQWlD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QUE7QUFBeUQ7QUFDakI7O0FBRXhDLDBEQUFhO0FBQ2IsMEVBQWMiLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvYXhpb3MnKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XHJcbnZhciBzZXR0bGUgPSByZXF1aXJlKCcuLy4uL2NvcmUvc2V0dGxlJyk7XHJcbnZhciBjb29raWVzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2Nvb2tpZXMnKTtcclxudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2J1aWxkVVJMJyk7XHJcbnZhciBidWlsZEZ1bGxQYXRoID0gcmVxdWlyZSgnLi4vY29yZS9idWlsZEZ1bGxQYXRoJyk7XHJcbnZhciBwYXJzZUhlYWRlcnMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvcGFyc2VIZWFkZXJzJyk7XHJcbnZhciBpc1VSTFNhbWVPcmlnaW4gPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luJyk7XHJcbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4uL2NvcmUvY3JlYXRlRXJyb3InKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24geGhyQWRhcHRlcihjb25maWcpIHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gZGlzcGF0Y2hYaHJSZXF1ZXN0KHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgdmFyIHJlcXVlc3REYXRhID0gY29uZmlnLmRhdGE7XHJcbiAgICB2YXIgcmVxdWVzdEhlYWRlcnMgPSBjb25maWcuaGVhZGVycztcclxuXHJcbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShyZXF1ZXN0RGF0YSkpIHtcclxuICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzWydDb250ZW50LVR5cGUnXTsgLy8gTGV0IHRoZSBicm93c2VyIHNldCBpdFxyXG4gICAgfVxyXG5cclxuICAgIGlmIChcclxuICAgICAgKHV0aWxzLmlzQmxvYihyZXF1ZXN0RGF0YSkgfHwgdXRpbHMuaXNGaWxlKHJlcXVlc3REYXRhKSkgJiZcclxuICAgICAgcmVxdWVzdERhdGEudHlwZVxyXG4gICAgKSB7XHJcbiAgICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1snQ29udGVudC1UeXBlJ107IC8vIExldCB0aGUgYnJvd3NlciBzZXQgaXRcclxuICAgIH1cclxuXHJcbiAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cclxuICAgIC8vIEhUVFAgYmFzaWMgYXV0aGVudGljYXRpb25cclxuICAgIGlmIChjb25maWcuYXV0aCkge1xyXG4gICAgICB2YXIgdXNlcm5hbWUgPSBjb25maWcuYXV0aC51c2VybmFtZSB8fCAnJztcclxuICAgICAgdmFyIHBhc3N3b3JkID0gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KGNvbmZpZy5hdXRoLnBhc3N3b3JkKSkgfHwgJyc7XHJcbiAgICAgIHJlcXVlc3RIZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnQmFzaWMgJyArIGJ0b2EodXNlcm5hbWUgKyAnOicgKyBwYXNzd29yZCk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGZ1bGxQYXRoID0gYnVpbGRGdWxsUGF0aChjb25maWcuYmFzZVVSTCwgY29uZmlnLnVybCk7XHJcbiAgICByZXF1ZXN0Lm9wZW4oY29uZmlnLm1ldGhvZC50b1VwcGVyQ2FzZSgpLCBidWlsZFVSTChmdWxsUGF0aCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpLCB0cnVlKTtcclxuXHJcbiAgICAvLyBTZXQgdGhlIHJlcXVlc3QgdGltZW91dCBpbiBNU1xyXG4gICAgcmVxdWVzdC50aW1lb3V0ID0gY29uZmlnLnRpbWVvdXQ7XHJcblxyXG4gICAgLy8gTGlzdGVuIGZvciByZWFkeSBzdGF0ZVxyXG4gICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiBoYW5kbGVMb2FkKCkge1xyXG4gICAgICBpZiAoIXJlcXVlc3QgfHwgcmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBUaGUgcmVxdWVzdCBlcnJvcmVkIG91dCBhbmQgd2UgZGlkbid0IGdldCBhIHJlc3BvbnNlLCB0aGlzIHdpbGwgYmVcclxuICAgICAgLy8gaGFuZGxlZCBieSBvbmVycm9yIGluc3RlYWRcclxuICAgICAgLy8gV2l0aCBvbmUgZXhjZXB0aW9uOiByZXF1ZXN0IHRoYXQgdXNpbmcgZmlsZTogcHJvdG9jb2wsIG1vc3QgYnJvd3NlcnNcclxuICAgICAgLy8gd2lsbCByZXR1cm4gc3RhdHVzIGFzIDAgZXZlbiB0aG91Z2ggaXQncyBhIHN1Y2Nlc3NmdWwgcmVxdWVzdFxyXG4gICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDAgJiYgIShyZXF1ZXN0LnJlc3BvbnNlVVJMICYmIHJlcXVlc3QucmVzcG9uc2VVUkwuaW5kZXhPZignZmlsZTonKSA9PT0gMCkpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFByZXBhcmUgdGhlIHJlc3BvbnNlXHJcbiAgICAgIHZhciByZXNwb25zZUhlYWRlcnMgPSAnZ2V0QWxsUmVzcG9uc2VIZWFkZXJzJyBpbiByZXF1ZXN0ID8gcGFyc2VIZWFkZXJzKHJlcXVlc3QuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpIDogbnVsbDtcclxuICAgICAgdmFyIHJlc3BvbnNlRGF0YSA9ICFjb25maWcucmVzcG9uc2VUeXBlIHx8IGNvbmZpZy5yZXNwb25zZVR5cGUgPT09ICd0ZXh0JyA/IHJlcXVlc3QucmVzcG9uc2VUZXh0IDogcmVxdWVzdC5yZXNwb25zZTtcclxuICAgICAgdmFyIHJlc3BvbnNlID0ge1xyXG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcclxuICAgICAgICBzdGF0dXM6IHJlcXVlc3Quc3RhdHVzLFxyXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlcXVlc3Quc3RhdHVzVGV4dCxcclxuICAgICAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXHJcbiAgICAgICAgY29uZmlnOiBjb25maWcsXHJcbiAgICAgICAgcmVxdWVzdDogcmVxdWVzdFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpO1xyXG5cclxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxyXG4gICAgICByZXF1ZXN0ID0gbnVsbDtcclxuICAgIH07XHJcblxyXG4gICAgLy8gSGFuZGxlIGJyb3dzZXIgcmVxdWVzdCBjYW5jZWxsYXRpb24gKGFzIG9wcG9zZWQgdG8gYSBtYW51YWwgY2FuY2VsbGF0aW9uKVxyXG4gICAgcmVxdWVzdC5vbmFib3J0ID0gZnVuY3Rpb24gaGFuZGxlQWJvcnQoKSB7XHJcbiAgICAgIGlmICghcmVxdWVzdCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCdSZXF1ZXN0IGFib3J0ZWQnLCBjb25maWcsICdFQ09OTkFCT1JURUQnLCByZXF1ZXN0KSk7XHJcblxyXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XHJcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBIYW5kbGUgbG93IGxldmVsIG5ldHdvcmsgZXJyb3JzXHJcbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcigpIHtcclxuICAgICAgLy8gUmVhbCBlcnJvcnMgYXJlIGhpZGRlbiBmcm9tIHVzIGJ5IHRoZSBicm93c2VyXHJcbiAgICAgIC8vIG9uZXJyb3Igc2hvdWxkIG9ubHkgZmlyZSBpZiBpdCdzIGEgbmV0d29yayBlcnJvclxyXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ05ldHdvcmsgRXJyb3InLCBjb25maWcsIG51bGwsIHJlcXVlc3QpKTtcclxuXHJcbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcclxuICAgICAgcmVxdWVzdCA9IG51bGw7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEhhbmRsZSB0aW1lb3V0XHJcbiAgICByZXF1ZXN0Lm9udGltZW91dCA9IGZ1bmN0aW9uIGhhbmRsZVRpbWVvdXQoKSB7XHJcbiAgICAgIHZhciB0aW1lb3V0RXJyb3JNZXNzYWdlID0gJ3RpbWVvdXQgb2YgJyArIGNvbmZpZy50aW1lb3V0ICsgJ21zIGV4Y2VlZGVkJztcclxuICAgICAgaWYgKGNvbmZpZy50aW1lb3V0RXJyb3JNZXNzYWdlKSB7XHJcbiAgICAgICAgdGltZW91dEVycm9yTWVzc2FnZSA9IGNvbmZpZy50aW1lb3V0RXJyb3JNZXNzYWdlO1xyXG4gICAgICB9XHJcbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcih0aW1lb3V0RXJyb3JNZXNzYWdlLCBjb25maWcsICdFQ09OTkFCT1JURUQnLFxyXG4gICAgICAgIHJlcXVlc3QpKTtcclxuXHJcbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcclxuICAgICAgcmVxdWVzdCA9IG51bGw7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEFkZCB4c3JmIGhlYWRlclxyXG4gICAgLy8gVGhpcyBpcyBvbmx5IGRvbmUgaWYgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnQuXHJcbiAgICAvLyBTcGVjaWZpY2FsbHkgbm90IGlmIHdlJ3JlIGluIGEgd2ViIHdvcmtlciwgb3IgcmVhY3QtbmF0aXZlLlxyXG4gICAgaWYgKHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkpIHtcclxuICAgICAgLy8gQWRkIHhzcmYgaGVhZGVyXHJcbiAgICAgIHZhciB4c3JmVmFsdWUgPSAoY29uZmlnLndpdGhDcmVkZW50aWFscyB8fCBpc1VSTFNhbWVPcmlnaW4oZnVsbFBhdGgpKSAmJiBjb25maWcueHNyZkNvb2tpZU5hbWUgP1xyXG4gICAgICAgIGNvb2tpZXMucmVhZChjb25maWcueHNyZkNvb2tpZU5hbWUpIDpcclxuICAgICAgICB1bmRlZmluZWQ7XHJcblxyXG4gICAgICBpZiAoeHNyZlZhbHVlKSB7XHJcbiAgICAgICAgcmVxdWVzdEhlYWRlcnNbY29uZmlnLnhzcmZIZWFkZXJOYW1lXSA9IHhzcmZWYWx1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEFkZCBoZWFkZXJzIHRvIHRoZSByZXF1ZXN0XHJcbiAgICBpZiAoJ3NldFJlcXVlc3RIZWFkZXInIGluIHJlcXVlc3QpIHtcclxuICAgICAgdXRpbHMuZm9yRWFjaChyZXF1ZXN0SGVhZGVycywgZnVuY3Rpb24gc2V0UmVxdWVzdEhlYWRlcih2YWwsIGtleSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgcmVxdWVzdERhdGEgPT09ICd1bmRlZmluZWQnICYmIGtleS50b0xvd2VyQ2FzZSgpID09PSAnY29udGVudC10eXBlJykge1xyXG4gICAgICAgICAgLy8gUmVtb3ZlIENvbnRlbnQtVHlwZSBpZiBkYXRhIGlzIHVuZGVmaW5lZFxyXG4gICAgICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzW2tleV07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIE90aGVyd2lzZSBhZGQgaGVhZGVyIHRvIHRoZSByZXF1ZXN0XHJcbiAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoa2V5LCB2YWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQWRkIHdpdGhDcmVkZW50aWFscyB0byByZXF1ZXN0IGlmIG5lZWRlZFxyXG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcud2l0aENyZWRlbnRpYWxzKSkge1xyXG4gICAgICByZXF1ZXN0LndpdGhDcmVkZW50aWFscyA9ICEhY29uZmlnLndpdGhDcmVkZW50aWFscztcclxuICAgIH1cclxuXHJcbiAgICAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXHJcbiAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gY29uZmlnLnJlc3BvbnNlVHlwZTtcclxuICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIC8vIEV4cGVjdGVkIERPTUV4Y2VwdGlvbiB0aHJvd24gYnkgYnJvd3NlcnMgbm90IGNvbXBhdGlibGUgWE1MSHR0cFJlcXVlc3QgTGV2ZWwgMi5cclxuICAgICAgICAvLyBCdXQsIHRoaXMgY2FuIGJlIHN1cHByZXNzZWQgZm9yICdqc29uJyB0eXBlIGFzIGl0IGNhbiBiZSBwYXJzZWQgYnkgZGVmYXVsdCAndHJhbnNmb3JtUmVzcG9uc2UnIGZ1bmN0aW9uLlxyXG4gICAgICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlICE9PSAnanNvbicpIHtcclxuICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSGFuZGxlIHByb2dyZXNzIGlmIG5lZWRlZFxyXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25Eb3dubG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25Eb3dubG9hZFByb2dyZXNzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBOb3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgdXBsb2FkIGV2ZW50c1xyXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25VcGxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJyAmJiByZXF1ZXN0LnVwbG9hZCkge1xyXG4gICAgICByZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XHJcbiAgICAgIC8vIEhhbmRsZSBjYW5jZWxsYXRpb25cclxuICAgICAgY29uZmlnLmNhbmNlbFRva2VuLnByb21pc2UudGhlbihmdW5jdGlvbiBvbkNhbmNlbGVkKGNhbmNlbCkge1xyXG4gICAgICAgIGlmICghcmVxdWVzdCkge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVxdWVzdC5hYm9ydCgpO1xyXG4gICAgICAgIHJlamVjdChjYW5jZWwpO1xyXG4gICAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcclxuICAgICAgICByZXF1ZXN0ID0gbnVsbDtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFyZXF1ZXN0RGF0YSkge1xyXG4gICAgICByZXF1ZXN0RGF0YSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2VuZCB0aGUgcmVxdWVzdFxyXG4gICAgcmVxdWVzdC5zZW5kKHJlcXVlc3REYXRhKTtcclxuICB9KTtcclxufTtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xyXG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XHJcbnZhciBBeGlvcyA9IHJlcXVpcmUoJy4vY29yZS9BeGlvcycpO1xyXG52YXIgbWVyZ2VDb25maWcgPSByZXF1aXJlKCcuL2NvcmUvbWVyZ2VDb25maWcnKTtcclxudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBBeGlvc1xyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gZGVmYXVsdENvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxyXG4gKiBAcmV0dXJuIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcclxuICovXHJcbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRDb25maWcpIHtcclxuICB2YXIgY29udGV4dCA9IG5ldyBBeGlvcyhkZWZhdWx0Q29uZmlnKTtcclxuICB2YXIgaW5zdGFuY2UgPSBiaW5kKEF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0LCBjb250ZXh0KTtcclxuXHJcbiAgLy8gQ29weSBheGlvcy5wcm90b3R5cGUgdG8gaW5zdGFuY2VcclxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIEF4aW9zLnByb3RvdHlwZSwgY29udGV4dCk7XHJcblxyXG4gIC8vIENvcHkgY29udGV4dCB0byBpbnN0YW5jZVxyXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgY29udGV4dCk7XHJcblxyXG4gIHJldHVybiBpbnN0YW5jZTtcclxufVxyXG5cclxuLy8gQ3JlYXRlIHRoZSBkZWZhdWx0IGluc3RhbmNlIHRvIGJlIGV4cG9ydGVkXHJcbnZhciBheGlvcyA9IGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRzKTtcclxuXHJcbi8vIEV4cG9zZSBBeGlvcyBjbGFzcyB0byBhbGxvdyBjbGFzcyBpbmhlcml0YW5jZVxyXG5heGlvcy5BeGlvcyA9IEF4aW9zO1xyXG5cclxuLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbmV3IGluc3RhbmNlc1xyXG5heGlvcy5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaW5zdGFuY2VDb25maWcpIHtcclxuICByZXR1cm4gY3JlYXRlSW5zdGFuY2UobWVyZ2VDb25maWcoYXhpb3MuZGVmYXVsdHMsIGluc3RhbmNlQ29uZmlnKSk7XHJcbn07XHJcblxyXG4vLyBFeHBvc2UgQ2FuY2VsICYgQ2FuY2VsVG9rZW5cclxuYXhpb3MuQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsJyk7XHJcbmF4aW9zLkNhbmNlbFRva2VuID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsVG9rZW4nKTtcclxuYXhpb3MuaXNDYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9pc0NhbmNlbCcpO1xyXG5cclxuLy8gRXhwb3NlIGFsbC9zcHJlYWRcclxuYXhpb3MuYWxsID0gZnVuY3Rpb24gYWxsKHByb21pc2VzKSB7XHJcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcclxufTtcclxuYXhpb3Muc3ByZWFkID0gcmVxdWlyZSgnLi9oZWxwZXJzL3NwcmVhZCcpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBheGlvcztcclxuXHJcbi8vIEFsbG93IHVzZSBvZiBkZWZhdWx0IGltcG9ydCBzeW50YXggaW4gVHlwZVNjcmlwdFxyXG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gYXhpb3M7XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBBIGBDYW5jZWxgIGlzIGFuIG9iamVjdCB0aGF0IGlzIHRocm93biB3aGVuIGFuIG9wZXJhdGlvbiBpcyBjYW5jZWxlZC5cclxuICpcclxuICogQGNsYXNzXHJcbiAqIEBwYXJhbSB7c3RyaW5nPX0gbWVzc2FnZSBUaGUgbWVzc2FnZS5cclxuICovXHJcbmZ1bmN0aW9uIENhbmNlbChtZXNzYWdlKSB7XHJcbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcclxufVxyXG5cclxuQ2FuY2VsLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xyXG4gIHJldHVybiAnQ2FuY2VsJyArICh0aGlzLm1lc3NhZ2UgPyAnOiAnICsgdGhpcy5tZXNzYWdlIDogJycpO1xyXG59O1xyXG5cclxuQ2FuY2VsLnByb3RvdHlwZS5fX0NBTkNFTF9fID0gdHJ1ZTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsO1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgQ2FuY2VsID0gcmVxdWlyZSgnLi9DYW5jZWwnKTtcclxuXHJcbi8qKlxyXG4gKiBBIGBDYW5jZWxUb2tlbmAgaXMgYW4gb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVxdWVzdCBjYW5jZWxsYXRpb24gb2YgYW4gb3BlcmF0aW9uLlxyXG4gKlxyXG4gKiBAY2xhc3NcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXhlY3V0b3IgVGhlIGV4ZWN1dG9yIGZ1bmN0aW9uLlxyXG4gKi9cclxuZnVuY3Rpb24gQ2FuY2VsVG9rZW4oZXhlY3V0b3IpIHtcclxuICBpZiAodHlwZW9mIGV4ZWN1dG9yICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleGVjdXRvciBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XHJcbiAgfVxyXG5cclxuICB2YXIgcmVzb2x2ZVByb21pc2U7XHJcbiAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gcHJvbWlzZUV4ZWN1dG9yKHJlc29sdmUpIHtcclxuICAgIHJlc29sdmVQcm9taXNlID0gcmVzb2x2ZTtcclxuICB9KTtcclxuXHJcbiAgdmFyIHRva2VuID0gdGhpcztcclxuICBleGVjdXRvcihmdW5jdGlvbiBjYW5jZWwobWVzc2FnZSkge1xyXG4gICAgaWYgKHRva2VuLnJlYXNvbikge1xyXG4gICAgICAvLyBDYW5jZWxsYXRpb24gaGFzIGFscmVhZHkgYmVlbiByZXF1ZXN0ZWRcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRva2VuLnJlYXNvbiA9IG5ldyBDYW5jZWwobWVzc2FnZSk7XHJcbiAgICByZXNvbHZlUHJvbWlzZSh0b2tlbi5yZWFzb24pO1xyXG4gIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cclxuICovXHJcbkNhbmNlbFRva2VuLnByb3RvdHlwZS50aHJvd0lmUmVxdWVzdGVkID0gZnVuY3Rpb24gdGhyb3dJZlJlcXVlc3RlZCgpIHtcclxuICBpZiAodGhpcy5yZWFzb24pIHtcclxuICAgIHRocm93IHRoaXMucmVhc29uO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgbmV3IGBDYW5jZWxUb2tlbmAgYW5kIGEgZnVuY3Rpb24gdGhhdCwgd2hlbiBjYWxsZWQsXHJcbiAqIGNhbmNlbHMgdGhlIGBDYW5jZWxUb2tlbmAuXHJcbiAqL1xyXG5DYW5jZWxUb2tlbi5zb3VyY2UgPSBmdW5jdGlvbiBzb3VyY2UoKSB7XHJcbiAgdmFyIGNhbmNlbDtcclxuICB2YXIgdG9rZW4gPSBuZXcgQ2FuY2VsVG9rZW4oZnVuY3Rpb24gZXhlY3V0b3IoYykge1xyXG4gICAgY2FuY2VsID0gYztcclxuICB9KTtcclxuICByZXR1cm4ge1xyXG4gICAgdG9rZW46IHRva2VuLFxyXG4gICAgY2FuY2VsOiBjYW5jZWxcclxuICB9O1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWxUb2tlbjtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0NhbmNlbCh2YWx1ZSkge1xyXG4gIHJldHVybiAhISh2YWx1ZSAmJiB2YWx1ZS5fX0NBTkNFTF9fKTtcclxufTtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xyXG52YXIgYnVpbGRVUkwgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2J1aWxkVVJMJyk7XHJcbnZhciBJbnRlcmNlcHRvck1hbmFnZXIgPSByZXF1aXJlKCcuL0ludGVyY2VwdG9yTWFuYWdlcicpO1xyXG52YXIgZGlzcGF0Y2hSZXF1ZXN0ID0gcmVxdWlyZSgnLi9kaXNwYXRjaFJlcXVlc3QnKTtcclxudmFyIG1lcmdlQ29uZmlnID0gcmVxdWlyZSgnLi9tZXJnZUNvbmZpZycpO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcclxuICovXHJcbmZ1bmN0aW9uIEF4aW9zKGluc3RhbmNlQ29uZmlnKSB7XHJcbiAgdGhpcy5kZWZhdWx0cyA9IGluc3RhbmNlQ29uZmlnO1xyXG4gIHRoaXMuaW50ZXJjZXB0b3JzID0ge1xyXG4gICAgcmVxdWVzdDogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpLFxyXG4gICAgcmVzcG9uc2U6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKVxyXG4gIH07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3RcclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHNwZWNpZmljIGZvciB0aGlzIHJlcXVlc3QgKG1lcmdlZCB3aXRoIHRoaXMuZGVmYXVsdHMpXHJcbiAqL1xyXG5BeGlvcy5wcm90b3R5cGUucmVxdWVzdCA9IGZ1bmN0aW9uIHJlcXVlc3QoY29uZmlnKSB7XHJcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXHJcbiAgLy8gQWxsb3cgZm9yIGF4aW9zKCdleGFtcGxlL3VybCdbLCBjb25maWddKSBhIGxhIGZldGNoIEFQSVxyXG4gIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xyXG4gICAgY29uZmlnID0gYXJndW1lbnRzWzFdIHx8IHt9O1xyXG4gICAgY29uZmlnLnVybCA9IGFyZ3VtZW50c1swXTtcclxuICB9IGVsc2Uge1xyXG4gICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xyXG4gIH1cclxuXHJcbiAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcclxuXHJcbiAgLy8gU2V0IGNvbmZpZy5tZXRob2RcclxuICBpZiAoY29uZmlnLm1ldGhvZCkge1xyXG4gICAgY29uZmlnLm1ldGhvZCA9IGNvbmZpZy5tZXRob2QudG9Mb3dlckNhc2UoKTtcclxuICB9IGVsc2UgaWYgKHRoaXMuZGVmYXVsdHMubWV0aG9kKSB7XHJcbiAgICBjb25maWcubWV0aG9kID0gdGhpcy5kZWZhdWx0cy5tZXRob2QudG9Mb3dlckNhc2UoKTtcclxuICB9IGVsc2Uge1xyXG4gICAgY29uZmlnLm1ldGhvZCA9ICdnZXQnO1xyXG4gIH1cclxuXHJcbiAgLy8gSG9vayB1cCBpbnRlcmNlcHRvcnMgbWlkZGxld2FyZVxyXG4gIHZhciBjaGFpbiA9IFtkaXNwYXRjaFJlcXVlc3QsIHVuZGVmaW5lZF07XHJcbiAgdmFyIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoY29uZmlnKTtcclxuXHJcbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVxdWVzdC5mb3JFYWNoKGZ1bmN0aW9uIHVuc2hpZnRSZXF1ZXN0SW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XHJcbiAgICBjaGFpbi51bnNoaWZ0KGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xyXG4gIH0pO1xyXG5cclxuICB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZS5mb3JFYWNoKGZ1bmN0aW9uIHB1c2hSZXNwb25zZUludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xyXG4gICAgY2hhaW4ucHVzaChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcclxuICB9KTtcclxuXHJcbiAgd2hpbGUgKGNoYWluLmxlbmd0aCkge1xyXG4gICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihjaGFpbi5zaGlmdCgpLCBjaGFpbi5zaGlmdCgpKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBwcm9taXNlO1xyXG59O1xyXG5cclxuQXhpb3MucHJvdG90eXBlLmdldFVyaSA9IGZ1bmN0aW9uIGdldFVyaShjb25maWcpIHtcclxuICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xyXG4gIHJldHVybiBidWlsZFVSTChjb25maWcudXJsLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplcikucmVwbGFjZSgvXlxcPy8sICcnKTtcclxufTtcclxuXHJcbi8vIFByb3ZpZGUgYWxpYXNlcyBmb3Igc3VwcG9ydGVkIHJlcXVlc3QgbWV0aG9kc1xyXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ29wdGlvbnMnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcclxuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xyXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBjb25maWcpIHtcclxuICAgIHJldHVybiB0aGlzLnJlcXVlc3QobWVyZ2VDb25maWcoY29uZmlnIHx8IHt9LCB7XHJcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxyXG4gICAgICB1cmw6IHVybFxyXG4gICAgfSkpO1xyXG4gIH07XHJcbn0pO1xyXG5cclxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcclxuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xyXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBkYXRhLCBjb25maWcpIHtcclxuICAgIHJldHVybiB0aGlzLnJlcXVlc3QobWVyZ2VDb25maWcoY29uZmlnIHx8IHt9LCB7XHJcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxyXG4gICAgICB1cmw6IHVybCxcclxuICAgICAgZGF0YTogZGF0YVxyXG4gICAgfSkpO1xyXG4gIH07XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBBeGlvcztcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xyXG5cclxuZnVuY3Rpb24gSW50ZXJjZXB0b3JNYW5hZ2VyKCkge1xyXG4gIHRoaXMuaGFuZGxlcnMgPSBbXTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEFkZCBhIG5ldyBpbnRlcmNlcHRvciB0byB0aGUgc3RhY2tcclxuICpcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVsZmlsbGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHRoZW5gIGZvciBhIGBQcm9taXNlYFxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3RlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGByZWplY3RgIGZvciBhIGBQcm9taXNlYFxyXG4gKlxyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IEFuIElEIHVzZWQgdG8gcmVtb3ZlIGludGVyY2VwdG9yIGxhdGVyXHJcbiAqL1xyXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLnVzZSA9IGZ1bmN0aW9uIHVzZShmdWxmaWxsZWQsIHJlamVjdGVkKSB7XHJcbiAgdGhpcy5oYW5kbGVycy5wdXNoKHtcclxuICAgIGZ1bGZpbGxlZDogZnVsZmlsbGVkLFxyXG4gICAgcmVqZWN0ZWQ6IHJlamVjdGVkXHJcbiAgfSk7XHJcbiAgcmV0dXJuIHRoaXMuaGFuZGxlcnMubGVuZ3RoIC0gMTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgYW4gaW50ZXJjZXB0b3IgZnJvbSB0aGUgc3RhY2tcclxuICpcclxuICogQHBhcmFtIHtOdW1iZXJ9IGlkIFRoZSBJRCB0aGF0IHdhcyByZXR1cm5lZCBieSBgdXNlYFxyXG4gKi9cclxuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5lamVjdCA9IGZ1bmN0aW9uIGVqZWN0KGlkKSB7XHJcbiAgaWYgKHRoaXMuaGFuZGxlcnNbaWRdKSB7XHJcbiAgICB0aGlzLmhhbmRsZXJzW2lkXSA9IG51bGw7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEl0ZXJhdGUgb3ZlciBhbGwgdGhlIHJlZ2lzdGVyZWQgaW50ZXJjZXB0b3JzXHJcbiAqXHJcbiAqIFRoaXMgbWV0aG9kIGlzIHBhcnRpY3VsYXJseSB1c2VmdWwgZm9yIHNraXBwaW5nIG92ZXIgYW55XHJcbiAqIGludGVyY2VwdG9ycyB0aGF0IG1heSBoYXZlIGJlY29tZSBgbnVsbGAgY2FsbGluZyBgZWplY3RgLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBpbnRlcmNlcHRvclxyXG4gKi9cclxuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gZm9yRWFjaChmbikge1xyXG4gIHV0aWxzLmZvckVhY2godGhpcy5oYW5kbGVycywgZnVuY3Rpb24gZm9yRWFjaEhhbmRsZXIoaCkge1xyXG4gICAgaWYgKGggIT09IG51bGwpIHtcclxuICAgICAgZm4oaCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEludGVyY2VwdG9yTWFuYWdlcjtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIGlzQWJzb2x1dGVVUkwgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwnKTtcclxudmFyIGNvbWJpbmVVUkxzID0gcmVxdWlyZSgnLi4vaGVscGVycy9jb21iaW5lVVJMcycpO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgYmFzZVVSTCB3aXRoIHRoZSByZXF1ZXN0ZWRVUkwsXHJcbiAqIG9ubHkgd2hlbiB0aGUgcmVxdWVzdGVkVVJMIGlzIG5vdCBhbHJlYWR5IGFuIGFic29sdXRlIFVSTC5cclxuICogSWYgdGhlIHJlcXVlc3RVUkwgaXMgYWJzb2x1dGUsIHRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgcmVxdWVzdGVkVVJMIHVudG91Y2hlZC5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSByZXF1ZXN0ZWRVUkwgQWJzb2x1dGUgb3IgcmVsYXRpdmUgVVJMIHRvIGNvbWJpbmVcclxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIGZ1bGwgcGF0aFxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWlsZEZ1bGxQYXRoKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCkge1xyXG4gIGlmIChiYXNlVVJMICYmICFpc0Fic29sdXRlVVJMKHJlcXVlc3RlZFVSTCkpIHtcclxuICAgIHJldHVybiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZXF1ZXN0ZWRVUkwpO1xyXG4gIH1cclxuICByZXR1cm4gcmVxdWVzdGVkVVJMO1xyXG59O1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgZW5oYW5jZUVycm9yID0gcmVxdWlyZSgnLi9lbmhhbmNlRXJyb3InKTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UsIGNvbmZpZywgZXJyb3IgY29kZSwgcmVxdWVzdCBhbmQgcmVzcG9uc2UuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlLlxyXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cclxuICogQHJldHVybnMge0Vycm9yfSBUaGUgY3JlYXRlZCBlcnJvci5cclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlRXJyb3IobWVzc2FnZSwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xyXG4gIHZhciBlcnJvciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcclxuICByZXR1cm4gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKTtcclxufTtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xyXG52YXIgdHJhbnNmb3JtRGF0YSA9IHJlcXVpcmUoJy4vdHJhbnNmb3JtRGF0YScpO1xyXG52YXIgaXNDYW5jZWwgPSByZXF1aXJlKCcuLi9jYW5jZWwvaXNDYW5jZWwnKTtcclxudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi4vZGVmYXVsdHMnKTtcclxuXHJcbi8qKlxyXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxyXG4gKi9cclxuZnVuY3Rpb24gdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpIHtcclxuICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XHJcbiAgICBjb25maWcuY2FuY2VsVG9rZW4udGhyb3dJZlJlcXVlc3RlZCgpO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIERpc3BhdGNoIGEgcmVxdWVzdCB0byB0aGUgc2VydmVyIHVzaW5nIHRoZSBjb25maWd1cmVkIGFkYXB0ZXIuXHJcbiAqXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XHJcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGlzcGF0Y2hSZXF1ZXN0KGNvbmZpZykge1xyXG4gIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcclxuXHJcbiAgLy8gRW5zdXJlIGhlYWRlcnMgZXhpc3RcclxuICBjb25maWcuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzIHx8IHt9O1xyXG5cclxuICAvLyBUcmFuc2Zvcm0gcmVxdWVzdCBkYXRhXHJcbiAgY29uZmlnLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxyXG4gICAgY29uZmlnLmRhdGEsXHJcbiAgICBjb25maWcuaGVhZGVycyxcclxuICAgIGNvbmZpZy50cmFuc2Zvcm1SZXF1ZXN0XHJcbiAgKTtcclxuXHJcbiAgLy8gRmxhdHRlbiBoZWFkZXJzXHJcbiAgY29uZmlnLmhlYWRlcnMgPSB1dGlscy5tZXJnZShcclxuICAgIGNvbmZpZy5oZWFkZXJzLmNvbW1vbiB8fCB7fSxcclxuICAgIGNvbmZpZy5oZWFkZXJzW2NvbmZpZy5tZXRob2RdIHx8IHt9LFxyXG4gICAgY29uZmlnLmhlYWRlcnNcclxuICApO1xyXG5cclxuICB1dGlscy5mb3JFYWNoKFxyXG4gICAgWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnLCAnY29tbW9uJ10sXHJcbiAgICBmdW5jdGlvbiBjbGVhbkhlYWRlckNvbmZpZyhtZXRob2QpIHtcclxuICAgICAgZGVsZXRlIGNvbmZpZy5oZWFkZXJzW21ldGhvZF07XHJcbiAgICB9XHJcbiAgKTtcclxuXHJcbiAgdmFyIGFkYXB0ZXIgPSBjb25maWcuYWRhcHRlciB8fCBkZWZhdWx0cy5hZGFwdGVyO1xyXG5cclxuICByZXR1cm4gYWRhcHRlcihjb25maWcpLnRoZW4oZnVuY3Rpb24gb25BZGFwdGVyUmVzb2x1dGlvbihyZXNwb25zZSkge1xyXG4gICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xyXG5cclxuICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXHJcbiAgICByZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShcclxuICAgICAgcmVzcG9uc2UuZGF0YSxcclxuICAgICAgcmVzcG9uc2UuaGVhZGVycyxcclxuICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiByZXNwb25zZTtcclxuICB9LCBmdW5jdGlvbiBvbkFkYXB0ZXJSZWplY3Rpb24ocmVhc29uKSB7XHJcbiAgICBpZiAoIWlzQ2FuY2VsKHJlYXNvbikpIHtcclxuICAgICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xyXG5cclxuICAgICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcclxuICAgICAgaWYgKHJlYXNvbiAmJiByZWFzb24ucmVzcG9uc2UpIHtcclxuICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEoXHJcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSxcclxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzLFxyXG4gICAgICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xyXG4gIH0pO1xyXG59O1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vKipcclxuICogVXBkYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBjb25maWcsIGVycm9yIGNvZGUsIGFuZCByZXNwb25zZS5cclxuICpcclxuICogQHBhcmFtIHtFcnJvcn0gZXJyb3IgVGhlIGVycm9yIHRvIHVwZGF0ZS5cclxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxyXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxyXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXHJcbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGVycm9yLlxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcclxuICBlcnJvci5jb25maWcgPSBjb25maWc7XHJcbiAgaWYgKGNvZGUpIHtcclxuICAgIGVycm9yLmNvZGUgPSBjb2RlO1xyXG4gIH1cclxuXHJcbiAgZXJyb3IucmVxdWVzdCA9IHJlcXVlc3Q7XHJcbiAgZXJyb3IucmVzcG9uc2UgPSByZXNwb25zZTtcclxuICBlcnJvci5pc0F4aW9zRXJyb3IgPSB0cnVlO1xyXG5cclxuICBlcnJvci50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04oKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAvLyBTdGFuZGFyZFxyXG4gICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2UsXHJcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcclxuICAgICAgLy8gTWljcm9zb2Z0XHJcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxyXG4gICAgICBudW1iZXI6IHRoaXMubnVtYmVyLFxyXG4gICAgICAvLyBNb3ppbGxhXHJcbiAgICAgIGZpbGVOYW1lOiB0aGlzLmZpbGVOYW1lLFxyXG4gICAgICBsaW5lTnVtYmVyOiB0aGlzLmxpbmVOdW1iZXIsXHJcbiAgICAgIGNvbHVtbk51bWJlcjogdGhpcy5jb2x1bW5OdW1iZXIsXHJcbiAgICAgIHN0YWNrOiB0aGlzLnN0YWNrLFxyXG4gICAgICAvLyBBeGlvc1xyXG4gICAgICBjb25maWc6IHRoaXMuY29uZmlnLFxyXG4gICAgICBjb2RlOiB0aGlzLmNvZGVcclxuICAgIH07XHJcbiAgfTtcclxuICByZXR1cm4gZXJyb3I7XHJcbn07XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XHJcblxyXG4vKipcclxuICogQ29uZmlnLXNwZWNpZmljIG1lcmdlLWZ1bmN0aW9uIHdoaWNoIGNyZWF0ZXMgYSBuZXcgY29uZmlnLW9iamVjdFxyXG4gKiBieSBtZXJnaW5nIHR3byBjb25maWd1cmF0aW9uIG9iamVjdHMgdG9nZXRoZXIuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcxXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcyXHJcbiAqIEByZXR1cm5zIHtPYmplY3R9IE5ldyBvYmplY3QgcmVzdWx0aW5nIGZyb20gbWVyZ2luZyBjb25maWcyIHRvIGNvbmZpZzFcclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbWVyZ2VDb25maWcoY29uZmlnMSwgY29uZmlnMikge1xyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxyXG4gIGNvbmZpZzIgPSBjb25maWcyIHx8IHt9O1xyXG4gIHZhciBjb25maWcgPSB7fTtcclxuXHJcbiAgdmFyIHZhbHVlRnJvbUNvbmZpZzJLZXlzID0gWyd1cmwnLCAnbWV0aG9kJywgJ2RhdGEnXTtcclxuICB2YXIgbWVyZ2VEZWVwUHJvcGVydGllc0tleXMgPSBbJ2hlYWRlcnMnLCAnYXV0aCcsICdwcm94eScsICdwYXJhbXMnXTtcclxuICB2YXIgZGVmYXVsdFRvQ29uZmlnMktleXMgPSBbXHJcbiAgICAnYmFzZVVSTCcsICd0cmFuc2Zvcm1SZXF1ZXN0JywgJ3RyYW5zZm9ybVJlc3BvbnNlJywgJ3BhcmFtc1NlcmlhbGl6ZXInLFxyXG4gICAgJ3RpbWVvdXQnLCAndGltZW91dE1lc3NhZ2UnLCAnd2l0aENyZWRlbnRpYWxzJywgJ2FkYXB0ZXInLCAncmVzcG9uc2VUeXBlJywgJ3hzcmZDb29raWVOYW1lJyxcclxuICAgICd4c3JmSGVhZGVyTmFtZScsICdvblVwbG9hZFByb2dyZXNzJywgJ29uRG93bmxvYWRQcm9ncmVzcycsICdkZWNvbXByZXNzJyxcclxuICAgICdtYXhDb250ZW50TGVuZ3RoJywgJ21heEJvZHlMZW5ndGgnLCAnbWF4UmVkaXJlY3RzJywgJ3RyYW5zcG9ydCcsICdodHRwQWdlbnQnLFxyXG4gICAgJ2h0dHBzQWdlbnQnLCAnY2FuY2VsVG9rZW4nLCAnc29ja2V0UGF0aCcsICdyZXNwb25zZUVuY29kaW5nJ1xyXG4gIF07XHJcbiAgdmFyIGRpcmVjdE1lcmdlS2V5cyA9IFsndmFsaWRhdGVTdGF0dXMnXTtcclxuXHJcbiAgZnVuY3Rpb24gZ2V0TWVyZ2VkVmFsdWUodGFyZ2V0LCBzb3VyY2UpIHtcclxuICAgIGlmICh1dGlscy5pc1BsYWluT2JqZWN0KHRhcmdldCkgJiYgdXRpbHMuaXNQbGFpbk9iamVjdChzb3VyY2UpKSB7XHJcbiAgICAgIHJldHVybiB1dGlscy5tZXJnZSh0YXJnZXQsIHNvdXJjZSk7XHJcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3Qoc291cmNlKSkge1xyXG4gICAgICByZXR1cm4gdXRpbHMubWVyZ2Uoe30sIHNvdXJjZSk7XHJcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzQXJyYXkoc291cmNlKSkge1xyXG4gICAgICByZXR1cm4gc291cmNlLnNsaWNlKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc291cmNlO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gbWVyZ2VEZWVwUHJvcGVydGllcyhwcm9wKSB7XHJcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzJbcHJvcF0pKSB7XHJcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGdldE1lcmdlZFZhbHVlKGNvbmZpZzFbcHJvcF0sIGNvbmZpZzJbcHJvcF0pO1xyXG4gICAgfSBlbHNlIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnMVtwcm9wXSkpIHtcclxuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcxW3Byb3BdKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHV0aWxzLmZvckVhY2godmFsdWVGcm9tQ29uZmlnMktleXMsIGZ1bmN0aW9uIHZhbHVlRnJvbUNvbmZpZzIocHJvcCkge1xyXG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcyW3Byb3BdKSkge1xyXG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGNvbmZpZzJbcHJvcF0pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICB1dGlscy5mb3JFYWNoKG1lcmdlRGVlcFByb3BlcnRpZXNLZXlzLCBtZXJnZURlZXBQcm9wZXJ0aWVzKTtcclxuXHJcbiAgdXRpbHMuZm9yRWFjaChkZWZhdWx0VG9Db25maWcyS2V5cywgZnVuY3Rpb24gZGVmYXVsdFRvQ29uZmlnMihwcm9wKSB7XHJcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzJbcHJvcF0pKSB7XHJcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgY29uZmlnMltwcm9wXSk7XHJcbiAgICB9IGVsc2UgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcxW3Byb3BdKSkge1xyXG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGNvbmZpZzFbcHJvcF0pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICB1dGlscy5mb3JFYWNoKGRpcmVjdE1lcmdlS2V5cywgZnVuY3Rpb24gbWVyZ2UocHJvcCkge1xyXG4gICAgaWYgKHByb3AgaW4gY29uZmlnMikge1xyXG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZShjb25maWcxW3Byb3BdLCBjb25maWcyW3Byb3BdKTtcclxuICAgIH0gZWxzZSBpZiAocHJvcCBpbiBjb25maWcxKSB7XHJcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgY29uZmlnMVtwcm9wXSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIHZhciBheGlvc0tleXMgPSB2YWx1ZUZyb21Db25maWcyS2V5c1xyXG4gICAgLmNvbmNhdChtZXJnZURlZXBQcm9wZXJ0aWVzS2V5cylcclxuICAgIC5jb25jYXQoZGVmYXVsdFRvQ29uZmlnMktleXMpXHJcbiAgICAuY29uY2F0KGRpcmVjdE1lcmdlS2V5cyk7XHJcblxyXG4gIHZhciBvdGhlcktleXMgPSBPYmplY3RcclxuICAgIC5rZXlzKGNvbmZpZzEpXHJcbiAgICAuY29uY2F0KE9iamVjdC5rZXlzKGNvbmZpZzIpKVxyXG4gICAgLmZpbHRlcihmdW5jdGlvbiBmaWx0ZXJBeGlvc0tleXMoa2V5KSB7XHJcbiAgICAgIHJldHVybiBheGlvc0tleXMuaW5kZXhPZihrZXkpID09PSAtMTtcclxuICAgIH0pO1xyXG5cclxuICB1dGlscy5mb3JFYWNoKG90aGVyS2V5cywgbWVyZ2VEZWVwUHJvcGVydGllcyk7XHJcblxyXG4gIHJldHVybiBjb25maWc7XHJcbn07XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4vY3JlYXRlRXJyb3InKTtcclxuXHJcbi8qKlxyXG4gKiBSZXNvbHZlIG9yIHJlamVjdCBhIFByb21pc2UgYmFzZWQgb24gcmVzcG9uc2Ugc3RhdHVzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cclxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0IEEgZnVuY3Rpb24gdGhhdCByZWplY3RzIHRoZSBwcm9taXNlLlxyXG4gKiBAcGFyYW0ge29iamVjdH0gcmVzcG9uc2UgVGhlIHJlc3BvbnNlLlxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSkge1xyXG4gIHZhciB2YWxpZGF0ZVN0YXR1cyA9IHJlc3BvbnNlLmNvbmZpZy52YWxpZGF0ZVN0YXR1cztcclxuICBpZiAoIXJlc3BvbnNlLnN0YXR1cyB8fCAhdmFsaWRhdGVTdGF0dXMgfHwgdmFsaWRhdGVTdGF0dXMocmVzcG9uc2Uuc3RhdHVzKSkge1xyXG4gICAgcmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJlamVjdChjcmVhdGVFcnJvcihcclxuICAgICAgJ1JlcXVlc3QgZmFpbGVkIHdpdGggc3RhdHVzIGNvZGUgJyArIHJlc3BvbnNlLnN0YXR1cyxcclxuICAgICAgcmVzcG9uc2UuY29uZmlnLFxyXG4gICAgICBudWxsLFxyXG4gICAgICByZXNwb25zZS5yZXF1ZXN0LFxyXG4gICAgICByZXNwb25zZVxyXG4gICAgKSk7XHJcbiAgfVxyXG59O1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XHJcblxyXG4vKipcclxuICogVHJhbnNmb3JtIHRoZSBkYXRhIGZvciBhIHJlcXVlc3Qgb3IgYSByZXNwb25zZVxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IGRhdGEgVGhlIGRhdGEgdG8gYmUgdHJhbnNmb3JtZWRcclxuICogQHBhcmFtIHtBcnJheX0gaGVhZGVycyBUaGUgaGVhZGVycyBmb3IgdGhlIHJlcXVlc3Qgb3IgcmVzcG9uc2VcclxuICogQHBhcmFtIHtBcnJheXxGdW5jdGlvbn0gZm5zIEEgc2luZ2xlIGZ1bmN0aW9uIG9yIEFycmF5IG9mIGZ1bmN0aW9uc1xyXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHJlc3VsdGluZyB0cmFuc2Zvcm1lZCBkYXRhXHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRyYW5zZm9ybURhdGEoZGF0YSwgaGVhZGVycywgZm5zKSB7XHJcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXHJcbiAgdXRpbHMuZm9yRWFjaChmbnMsIGZ1bmN0aW9uIHRyYW5zZm9ybShmbikge1xyXG4gICAgZGF0YSA9IGZuKGRhdGEsIGhlYWRlcnMpO1xyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gZGF0YTtcclxufTtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xyXG52YXIgbm9ybWFsaXplSGVhZGVyTmFtZSA9IHJlcXVpcmUoJy4vaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lJyk7XHJcblxyXG52YXIgREVGQVVMVF9DT05URU5UX1RZUEUgPSB7XHJcbiAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXHJcbn07XHJcblxyXG5mdW5jdGlvbiBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgdmFsdWUpIHtcclxuICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnMpICYmIHV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddKSkge1xyXG4gICAgaGVhZGVyc1snQ29udGVudC1UeXBlJ10gPSB2YWx1ZTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldERlZmF1bHRBZGFwdGVyKCkge1xyXG4gIHZhciBhZGFwdGVyO1xyXG4gIGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAvLyBGb3IgYnJvd3NlcnMgdXNlIFhIUiBhZGFwdGVyXHJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy94aHInKTtcclxuICB9IGVsc2UgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocHJvY2VzcykgPT09ICdbb2JqZWN0IHByb2Nlc3NdJykge1xyXG4gICAgLy8gRm9yIG5vZGUgdXNlIEhUVFAgYWRhcHRlclxyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMvaHR0cCcpO1xyXG4gIH1cclxuICByZXR1cm4gYWRhcHRlcjtcclxufVxyXG5cclxudmFyIGRlZmF1bHRzID0ge1xyXG4gIGFkYXB0ZXI6IGdldERlZmF1bHRBZGFwdGVyKCksXHJcblxyXG4gIHRyYW5zZm9ybVJlcXVlc3Q6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXF1ZXN0KGRhdGEsIGhlYWRlcnMpIHtcclxuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0FjY2VwdCcpO1xyXG4gICAgbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCAnQ29udGVudC1UeXBlJyk7XHJcbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSB8fFxyXG4gICAgICB1dGlscy5pc0FycmF5QnVmZmVyKGRhdGEpIHx8XHJcbiAgICAgIHV0aWxzLmlzQnVmZmVyKGRhdGEpIHx8XHJcbiAgICAgIHV0aWxzLmlzU3RyZWFtKGRhdGEpIHx8XHJcbiAgICAgIHV0aWxzLmlzRmlsZShkYXRhKSB8fFxyXG4gICAgICB1dGlscy5pc0Jsb2IoZGF0YSlcclxuICAgICkge1xyXG4gICAgICByZXR1cm4gZGF0YTtcclxuICAgIH1cclxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyVmlldyhkYXRhKSkge1xyXG4gICAgICByZXR1cm4gZGF0YS5idWZmZXI7XHJcbiAgICB9XHJcbiAgICBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMoZGF0YSkpIHtcclxuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcpO1xyXG4gICAgICByZXR1cm4gZGF0YS50b1N0cmluZygpO1xyXG4gICAgfVxyXG4gICAgaWYgKHV0aWxzLmlzT2JqZWN0KGRhdGEpKSB7XHJcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04Jyk7XHJcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShkYXRhKTtcclxuICAgIH1cclxuICAgIHJldHVybiBkYXRhO1xyXG4gIH1dLFxyXG5cclxuICB0cmFuc2Zvcm1SZXNwb25zZTogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlc3BvbnNlKGRhdGEpIHtcclxuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xyXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG4gICAgICB9IGNhdGNoIChlKSB7IC8qIElnbm9yZSAqLyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZGF0YTtcclxuICB9XSxcclxuXHJcbiAgLyoqXHJcbiAgICogQSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byBhYm9ydCBhIHJlcXVlc3QuIElmIHNldCB0byAwIChkZWZhdWx0KSBhXHJcbiAgICogdGltZW91dCBpcyBub3QgY3JlYXRlZC5cclxuICAgKi9cclxuICB0aW1lb3V0OiAwLFxyXG5cclxuICB4c3JmQ29va2llTmFtZTogJ1hTUkYtVE9LRU4nLFxyXG4gIHhzcmZIZWFkZXJOYW1lOiAnWC1YU1JGLVRPS0VOJyxcclxuXHJcbiAgbWF4Q29udGVudExlbmd0aDogLTEsXHJcbiAgbWF4Qm9keUxlbmd0aDogLTEsXHJcblxyXG4gIHZhbGlkYXRlU3RhdHVzOiBmdW5jdGlvbiB2YWxpZGF0ZVN0YXR1cyhzdGF0dXMpIHtcclxuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcclxuICB9XHJcbn07XHJcblxyXG5kZWZhdWx0cy5oZWFkZXJzID0ge1xyXG4gIGNvbW1vbjoge1xyXG4gICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonXHJcbiAgfVxyXG59O1xyXG5cclxudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xyXG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHt9O1xyXG59KTtcclxuXHJcbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XHJcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0gdXRpbHMubWVyZ2UoREVGQVVMVF9DT05URU5UX1RZUEUpO1xyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZGVmYXVsdHM7XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xyXG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKCkge1xyXG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCk7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcclxuICAgIH1cclxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzQXJnLCBhcmdzKTtcclxuICB9O1xyXG59O1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XHJcblxyXG5mdW5jdGlvbiBlbmNvZGUodmFsKSB7XHJcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2YWwpLlxyXG4gICAgcmVwbGFjZSgvJTNBL2dpLCAnOicpLlxyXG4gICAgcmVwbGFjZSgvJTI0L2csICckJykuXHJcbiAgICByZXBsYWNlKC8lMkMvZ2ksICcsJykuXHJcbiAgICByZXBsYWNlKC8lMjAvZywgJysnKS5cclxuICAgIHJlcGxhY2UoLyU1Qi9naSwgJ1snKS5cclxuICAgIHJlcGxhY2UoLyU1RC9naSwgJ10nKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEJ1aWxkIGEgVVJMIGJ5IGFwcGVuZGluZyBwYXJhbXMgdG8gdGhlIGVuZFxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBiYXNlIG9mIHRoZSB1cmwgKGUuZy4sIGh0dHA6Ly93d3cuZ29vZ2xlLmNvbSlcclxuICogQHBhcmFtIHtvYmplY3R9IFtwYXJhbXNdIFRoZSBwYXJhbXMgdG8gYmUgYXBwZW5kZWRcclxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCB1cmxcclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRVUkwodXJsLCBwYXJhbXMsIHBhcmFtc1NlcmlhbGl6ZXIpIHtcclxuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cclxuICBpZiAoIXBhcmFtcykge1xyXG4gICAgcmV0dXJuIHVybDtcclxuICB9XHJcblxyXG4gIHZhciBzZXJpYWxpemVkUGFyYW1zO1xyXG4gIGlmIChwYXJhbXNTZXJpYWxpemVyKSB7XHJcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zU2VyaWFsaXplcihwYXJhbXMpO1xyXG4gIH0gZWxzZSBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKSkge1xyXG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtcy50b1N0cmluZygpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB2YXIgcGFydHMgPSBbXTtcclxuXHJcbiAgICB1dGlscy5mb3JFYWNoKHBhcmFtcywgZnVuY3Rpb24gc2VyaWFsaXplKHZhbCwga2V5KSB7XHJcbiAgICAgIGlmICh2YWwgPT09IG51bGwgfHwgdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh1dGlscy5pc0FycmF5KHZhbCkpIHtcclxuICAgICAgICBrZXkgPSBrZXkgKyAnW10nO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhbCA9IFt2YWxdO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB1dGlscy5mb3JFYWNoKHZhbCwgZnVuY3Rpb24gcGFyc2VWYWx1ZSh2KSB7XHJcbiAgICAgICAgaWYgKHV0aWxzLmlzRGF0ZSh2KSkge1xyXG4gICAgICAgICAgdiA9IHYudG9JU09TdHJpbmcoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHV0aWxzLmlzT2JqZWN0KHYpKSB7XHJcbiAgICAgICAgICB2ID0gSlNPTi5zdHJpbmdpZnkodik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBhcnRzLnB1c2goZW5jb2RlKGtleSkgKyAnPScgKyBlbmNvZGUodikpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJ0cy5qb2luKCcmJyk7XHJcbiAgfVxyXG5cclxuICBpZiAoc2VyaWFsaXplZFBhcmFtcykge1xyXG4gICAgdmFyIGhhc2htYXJrSW5kZXggPSB1cmwuaW5kZXhPZignIycpO1xyXG4gICAgaWYgKGhhc2htYXJrSW5kZXggIT09IC0xKSB7XHJcbiAgICAgIHVybCA9IHVybC5zbGljZSgwLCBoYXNobWFya0luZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIHNlcmlhbGl6ZWRQYXJhbXM7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdXJsO1xyXG59O1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBzcGVjaWZpZWQgVVJMc1xyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcclxuICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aXZlVVJMIFRoZSByZWxhdGl2ZSBVUkxcclxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIFVSTFxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZWxhdGl2ZVVSTCkge1xyXG4gIHJldHVybiByZWxhdGl2ZVVSTFxyXG4gICAgPyBiYXNlVVJMLnJlcGxhY2UoL1xcLyskLywgJycpICsgJy8nICsgcmVsYXRpdmVVUkwucmVwbGFjZSgvXlxcLysvLCAnJylcclxuICAgIDogYmFzZVVSTDtcclxufTtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSAoXHJcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XHJcblxyXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBzdXBwb3J0IGRvY3VtZW50LmNvb2tpZVxyXG4gICAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUobmFtZSwgdmFsdWUsIGV4cGlyZXMsIHBhdGgsIGRvbWFpbiwgc2VjdXJlKSB7XHJcbiAgICAgICAgICB2YXIgY29va2llID0gW107XHJcbiAgICAgICAgICBjb29raWUucHVzaChuYW1lICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSk7XHJcblxyXG4gICAgICAgICAgaWYgKHV0aWxzLmlzTnVtYmVyKGV4cGlyZXMpKSB7XHJcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdleHBpcmVzPScgKyBuZXcgRGF0ZShleHBpcmVzKS50b0dNVFN0cmluZygpKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcocGF0aCkpIHtcclxuICAgICAgICAgICAgY29va2llLnB1c2goJ3BhdGg9JyArIHBhdGgpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhkb21haW4pKSB7XHJcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdkb21haW49JyArIGRvbWFpbik7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHNlY3VyZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBjb29raWUucHVzaCgnc2VjdXJlJyk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llLmpvaW4oJzsgJyk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZChuYW1lKSB7XHJcbiAgICAgICAgICB2YXIgbWF0Y2ggPSBkb2N1bWVudC5jb29raWUubWF0Y2gobmV3IFJlZ0V4cCgnKF58O1xcXFxzKikoJyArIG5hbWUgKyAnKT0oW147XSopJykpO1xyXG4gICAgICAgICAgcmV0dXJuIChtYXRjaCA/IGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFszXSkgOiBudWxsKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZShuYW1lKSB7XHJcbiAgICAgICAgICB0aGlzLndyaXRlKG5hbWUsICcnLCBEYXRlLm5vdygpIC0gODY0MDAwMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgIH0pKCkgOlxyXG5cclxuICAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnYgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXHJcbiAgICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZSgpIHt9LFxyXG4gICAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7IHJldHVybiBudWxsOyB9LFxyXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cclxuICAgICAgfTtcclxuICAgIH0pKClcclxuKTtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZVxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdGVzdFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZSwgb3RoZXJ3aXNlIGZhbHNlXHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQWJzb2x1dGVVUkwodXJsKSB7XHJcbiAgLy8gQSBVUkwgaXMgY29uc2lkZXJlZCBhYnNvbHV0ZSBpZiBpdCBiZWdpbnMgd2l0aCBcIjxzY2hlbWU+Oi8vXCIgb3IgXCIvL1wiIChwcm90b2NvbC1yZWxhdGl2ZSBVUkwpLlxyXG4gIC8vIFJGQyAzOTg2IGRlZmluZXMgc2NoZW1lIG5hbWUgYXMgYSBzZXF1ZW5jZSBvZiBjaGFyYWN0ZXJzIGJlZ2lubmluZyB3aXRoIGEgbGV0dGVyIGFuZCBmb2xsb3dlZFxyXG4gIC8vIGJ5IGFueSBjb21iaW5hdGlvbiBvZiBsZXR0ZXJzLCBkaWdpdHMsIHBsdXMsIHBlcmlvZCwgb3IgaHlwaGVuLlxyXG4gIHJldHVybiAvXihbYS16XVthLXpcXGRcXCtcXC1cXC5dKjopP1xcL1xcLy9pLnRlc3QodXJsKTtcclxufTtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSAoXHJcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XHJcblxyXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBoYXZlIGZ1bGwgc3VwcG9ydCBvZiB0aGUgQVBJcyBuZWVkZWQgdG8gdGVzdFxyXG4gIC8vIHdoZXRoZXIgdGhlIHJlcXVlc3QgVVJMIGlzIG9mIHRoZSBzYW1lIG9yaWdpbiBhcyBjdXJyZW50IGxvY2F0aW9uLlxyXG4gICAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcclxuICAgICAgdmFyIG1zaWUgPSAvKG1zaWV8dHJpZGVudCkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xyXG4gICAgICB2YXIgdXJsUGFyc2luZ05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICAgIHZhciBvcmlnaW5VUkw7XHJcblxyXG4gICAgICAvKipcclxuICAgICogUGFyc2UgYSBVUkwgdG8gZGlzY292ZXIgaXQncyBjb21wb25lbnRzXHJcbiAgICAqXHJcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIFVSTCB0byBiZSBwYXJzZWRcclxuICAgICogQHJldHVybnMge09iamVjdH1cclxuICAgICovXHJcbiAgICAgIGZ1bmN0aW9uIHJlc29sdmVVUkwodXJsKSB7XHJcbiAgICAgICAgdmFyIGhyZWYgPSB1cmw7XHJcblxyXG4gICAgICAgIGlmIChtc2llKSB7XHJcbiAgICAgICAgLy8gSUUgbmVlZHMgYXR0cmlidXRlIHNldCB0d2ljZSB0byBub3JtYWxpemUgcHJvcGVydGllc1xyXG4gICAgICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XHJcbiAgICAgICAgICBocmVmID0gdXJsUGFyc2luZ05vZGUuaHJlZjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xyXG5cclxuICAgICAgICAvLyB1cmxQYXJzaW5nTm9kZSBwcm92aWRlcyB0aGUgVXJsVXRpbHMgaW50ZXJmYWNlIC0gaHR0cDovL3VybC5zcGVjLndoYXR3Zy5vcmcvI3VybHV0aWxzXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIGhyZWY6IHVybFBhcnNpbmdOb2RlLmhyZWYsXHJcbiAgICAgICAgICBwcm90b2NvbDogdXJsUGFyc2luZ05vZGUucHJvdG9jb2wgPyB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbC5yZXBsYWNlKC86JC8sICcnKSA6ICcnLFxyXG4gICAgICAgICAgaG9zdDogdXJsUGFyc2luZ05vZGUuaG9zdCxcclxuICAgICAgICAgIHNlYXJjaDogdXJsUGFyc2luZ05vZGUuc2VhcmNoID8gdXJsUGFyc2luZ05vZGUuc2VhcmNoLnJlcGxhY2UoL15cXD8vLCAnJykgOiAnJyxcclxuICAgICAgICAgIGhhc2g6IHVybFBhcnNpbmdOb2RlLmhhc2ggPyB1cmxQYXJzaW5nTm9kZS5oYXNoLnJlcGxhY2UoL14jLywgJycpIDogJycsXHJcbiAgICAgICAgICBob3N0bmFtZTogdXJsUGFyc2luZ05vZGUuaG9zdG5hbWUsXHJcbiAgICAgICAgICBwb3J0OiB1cmxQYXJzaW5nTm9kZS5wb3J0LFxyXG4gICAgICAgICAgcGF0aG5hbWU6ICh1cmxQYXJzaW5nTm9kZS5wYXRobmFtZS5jaGFyQXQoMCkgPT09ICcvJykgP1xyXG4gICAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZSA6XHJcbiAgICAgICAgICAgICcvJyArIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lXHJcbiAgICAgICAgfTtcclxuICAgICAgfVxyXG5cclxuICAgICAgb3JpZ2luVVJMID0gcmVzb2x2ZVVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XHJcblxyXG4gICAgICAvKipcclxuICAgICogRGV0ZXJtaW5lIGlmIGEgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4gYXMgdGhlIGN1cnJlbnQgbG9jYXRpb25cclxuICAgICpcclxuICAgICogQHBhcmFtIHtTdHJpbmd9IHJlcXVlc3RVUkwgVGhlIFVSTCB0byB0ZXN0XHJcbiAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luLCBvdGhlcndpc2UgZmFsc2VcclxuICAgICovXHJcbiAgICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4ocmVxdWVzdFVSTCkge1xyXG4gICAgICAgIHZhciBwYXJzZWQgPSAodXRpbHMuaXNTdHJpbmcocmVxdWVzdFVSTCkpID8gcmVzb2x2ZVVSTChyZXF1ZXN0VVJMKSA6IHJlcXVlc3RVUkw7XHJcbiAgICAgICAgcmV0dXJuIChwYXJzZWQucHJvdG9jb2wgPT09IG9yaWdpblVSTC5wcm90b2NvbCAmJlxyXG4gICAgICAgICAgICBwYXJzZWQuaG9zdCA9PT0gb3JpZ2luVVJMLmhvc3QpO1xyXG4gICAgICB9O1xyXG4gICAgfSkoKSA6XHJcblxyXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudnMgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXHJcbiAgICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xyXG4gICAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9O1xyXG4gICAgfSkoKVxyXG4pO1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsIG5vcm1hbGl6ZWROYW1lKSB7XHJcbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLCBmdW5jdGlvbiBwcm9jZXNzSGVhZGVyKHZhbHVlLCBuYW1lKSB7XHJcbiAgICBpZiAobmFtZSAhPT0gbm9ybWFsaXplZE5hbWUgJiYgbmFtZS50b1VwcGVyQ2FzZSgpID09PSBub3JtYWxpemVkTmFtZS50b1VwcGVyQ2FzZSgpKSB7XHJcbiAgICAgIGhlYWRlcnNbbm9ybWFsaXplZE5hbWVdID0gdmFsdWU7XHJcbiAgICAgIGRlbGV0ZSBoZWFkZXJzW25hbWVdO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59O1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XHJcblxyXG4vLyBIZWFkZXJzIHdob3NlIGR1cGxpY2F0ZXMgYXJlIGlnbm9yZWQgYnkgbm9kZVxyXG4vLyBjLmYuIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvaHR0cC5odG1sI2h0dHBfbWVzc2FnZV9oZWFkZXJzXHJcbnZhciBpZ25vcmVEdXBsaWNhdGVPZiA9IFtcclxuICAnYWdlJywgJ2F1dGhvcml6YXRpb24nLCAnY29udGVudC1sZW5ndGgnLCAnY29udGVudC10eXBlJywgJ2V0YWcnLFxyXG4gICdleHBpcmVzJywgJ2Zyb20nLCAnaG9zdCcsICdpZi1tb2RpZmllZC1zaW5jZScsICdpZi11bm1vZGlmaWVkLXNpbmNlJyxcclxuICAnbGFzdC1tb2RpZmllZCcsICdsb2NhdGlvbicsICdtYXgtZm9yd2FyZHMnLCAncHJveHktYXV0aG9yaXphdGlvbicsXHJcbiAgJ3JlZmVyZXInLCAncmV0cnktYWZ0ZXInLCAndXNlci1hZ2VudCdcclxuXTtcclxuXHJcbi8qKlxyXG4gKiBQYXJzZSBoZWFkZXJzIGludG8gYW4gb2JqZWN0XHJcbiAqXHJcbiAqIGBgYFxyXG4gKiBEYXRlOiBXZWQsIDI3IEF1ZyAyMDE0IDA4OjU4OjQ5IEdNVFxyXG4gKiBDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cclxuICogQ29ubmVjdGlvbjoga2VlcC1hbGl2ZVxyXG4gKiBUcmFuc2Zlci1FbmNvZGluZzogY2h1bmtlZFxyXG4gKiBgYGBcclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGhlYWRlcnMgSGVhZGVycyBuZWVkaW5nIHRvIGJlIHBhcnNlZFxyXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBIZWFkZXJzIHBhcnNlZCBpbnRvIGFuIG9iamVjdFxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYXJzZUhlYWRlcnMoaGVhZGVycykge1xyXG4gIHZhciBwYXJzZWQgPSB7fTtcclxuICB2YXIga2V5O1xyXG4gIHZhciB2YWw7XHJcbiAgdmFyIGk7XHJcblxyXG4gIGlmICghaGVhZGVycykgeyByZXR1cm4gcGFyc2VkOyB9XHJcblxyXG4gIHV0aWxzLmZvckVhY2goaGVhZGVycy5zcGxpdCgnXFxuJyksIGZ1bmN0aW9uIHBhcnNlcihsaW5lKSB7XHJcbiAgICBpID0gbGluZS5pbmRleE9mKCc6Jyk7XHJcbiAgICBrZXkgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKDAsIGkpKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgdmFsID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cihpICsgMSkpO1xyXG5cclxuICAgIGlmIChrZXkpIHtcclxuICAgICAgaWYgKHBhcnNlZFtrZXldICYmIGlnbm9yZUR1cGxpY2F0ZU9mLmluZGV4T2Yoa2V5KSA+PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChrZXkgPT09ICdzZXQtY29va2llJykge1xyXG4gICAgICAgIHBhcnNlZFtrZXldID0gKHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gOiBbXSkuY29uY2F0KFt2YWxdKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBwYXJzZWRba2V5XSA9IHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gKyAnLCAnICsgdmFsIDogdmFsO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBwYXJzZWQ7XHJcbn07XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBTeW50YWN0aWMgc3VnYXIgZm9yIGludm9raW5nIGEgZnVuY3Rpb24gYW5kIGV4cGFuZGluZyBhbiBhcnJheSBmb3IgYXJndW1lbnRzLlxyXG4gKlxyXG4gKiBDb21tb24gdXNlIGNhc2Ugd291bGQgYmUgdG8gdXNlIGBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHlgLlxyXG4gKlxyXG4gKiAgYGBganNcclxuICogIGZ1bmN0aW9uIGYoeCwgeSwgeikge31cclxuICogIHZhciBhcmdzID0gWzEsIDIsIDNdO1xyXG4gKiAgZi5hcHBseShudWxsLCBhcmdzKTtcclxuICogIGBgYFxyXG4gKlxyXG4gKiBXaXRoIGBzcHJlYWRgIHRoaXMgZXhhbXBsZSBjYW4gYmUgcmUtd3JpdHRlbi5cclxuICpcclxuICogIGBgYGpzXHJcbiAqICBzcHJlYWQoZnVuY3Rpb24oeCwgeSwgeikge30pKFsxLCAyLCAzXSk7XHJcbiAqICBgYGBcclxuICpcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcclxuICogQHJldHVybnMge0Z1bmN0aW9ufVxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzcHJlYWQoY2FsbGJhY2spIHtcclxuICByZXR1cm4gZnVuY3Rpb24gd3JhcChhcnIpIHtcclxuICAgIHJldHVybiBjYWxsYmFjay5hcHBseShudWxsLCBhcnIpO1xyXG4gIH07XHJcbn07XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcclxuXHJcbi8qZ2xvYmFsIHRvU3RyaW5nOnRydWUqL1xyXG5cclxuLy8gdXRpbHMgaXMgYSBsaWJyYXJ5IG9mIGdlbmVyaWMgaGVscGVyIGZ1bmN0aW9ucyBub24tc3BlY2lmaWMgdG8gYXhpb3NcclxuXHJcbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XHJcblxyXG4vKipcclxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlcclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheSwgb3RoZXJ3aXNlIGZhbHNlXHJcbiAqL1xyXG5mdW5jdGlvbiBpc0FycmF5KHZhbCkge1xyXG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyB1bmRlZmluZWRcclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgdW5kZWZpbmVkLCBvdGhlcndpc2UgZmFsc2VcclxuICovXHJcbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbCkge1xyXG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJztcclxufVxyXG5cclxuLyoqXHJcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQnVmZmVyXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcclxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxyXG4gKi9cclxuZnVuY3Rpb24gaXNCdWZmZXIodmFsKSB7XHJcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiAhaXNVbmRlZmluZWQodmFsKSAmJiB2YWwuY29uc3RydWN0b3IgIT09IG51bGwgJiYgIWlzVW5kZWZpbmVkKHZhbC5jb25zdHJ1Y3RvcilcclxuICAgICYmIHR5cGVvZiB2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIgPT09ICdmdW5jdGlvbicgJiYgdmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyKHZhbCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlclxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XHJcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcclxuICovXHJcbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXIodmFsKSB7XHJcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJztcclxufVxyXG5cclxuLyoqXHJcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRm9ybURhdGFcclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBGb3JtRGF0YSwgb3RoZXJ3aXNlIGZhbHNlXHJcbiAqL1xyXG5mdW5jdGlvbiBpc0Zvcm1EYXRhKHZhbCkge1xyXG4gIHJldHVybiAodHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJykgJiYgKHZhbCBpbnN0YW5jZW9mIEZvcm1EYXRhKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlclxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XHJcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXHJcbiAqL1xyXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWwpIHtcclxuICB2YXIgcmVzdWx0O1xyXG4gIGlmICgodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJykgJiYgKEFycmF5QnVmZmVyLmlzVmlldykpIHtcclxuICAgIHJlc3VsdCA9IEFycmF5QnVmZmVyLmlzVmlldyh2YWwpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXN1bHQgPSAodmFsKSAmJiAodmFsLmJ1ZmZlcikgJiYgKHZhbC5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcik7XHJcbiAgfVxyXG4gIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmluZ1xyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XHJcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyaW5nLCBvdGhlcndpc2UgZmFsc2VcclxuICovXHJcbmZ1bmN0aW9uIGlzU3RyaW5nKHZhbCkge1xyXG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJztcclxufVxyXG5cclxuLyoqXHJcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgTnVtYmVyXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcclxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBOdW1iZXIsIG90aGVyd2lzZSBmYWxzZVxyXG4gKi9cclxuZnVuY3Rpb24gaXNOdW1iZXIodmFsKSB7XHJcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdudW1iZXInO1xyXG59XHJcblxyXG4vKipcclxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gT2JqZWN0XHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcclxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcclxuICovXHJcbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbCkge1xyXG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHBsYWluIE9iamVjdFxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBwbGFpbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxyXG4gKi9cclxuZnVuY3Rpb24gaXNQbGFpbk9iamVjdCh2YWwpIHtcclxuICBpZiAodG9TdHJpbmcuY2FsbCh2YWwpICE9PSAnW29iamVjdCBPYmplY3RdJykge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgdmFyIHByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih2YWwpO1xyXG4gIHJldHVybiBwcm90b3R5cGUgPT09IG51bGwgfHwgcHJvdG90eXBlID09PSBPYmplY3QucHJvdG90eXBlO1xyXG59XHJcblxyXG4vKipcclxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBEYXRlXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcclxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBEYXRlLCBvdGhlcndpc2UgZmFsc2VcclxuICovXHJcbmZ1bmN0aW9uIGlzRGF0ZSh2YWwpIHtcclxuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBEYXRlXSc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVcclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxyXG4gKi9cclxuZnVuY3Rpb24gaXNGaWxlKHZhbCkge1xyXG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZpbGVdJztcclxufVxyXG5cclxuLyoqXHJcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQmxvYlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XHJcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQmxvYiwgb3RoZXJ3aXNlIGZhbHNlXHJcbiAqL1xyXG5mdW5jdGlvbiBpc0Jsb2IodmFsKSB7XHJcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQmxvYl0nO1xyXG59XHJcblxyXG4vKipcclxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGdW5jdGlvblxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XHJcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRnVuY3Rpb24sIG90aGVyd2lzZSBmYWxzZVxyXG4gKi9cclxuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWwpIHtcclxuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xyXG59XHJcblxyXG4vKipcclxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJlYW1cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmVhbSwgb3RoZXJ3aXNlIGZhbHNlXHJcbiAqL1xyXG5mdW5jdGlvbiBpc1N0cmVhbSh2YWwpIHtcclxuICByZXR1cm4gaXNPYmplY3QodmFsKSAmJiBpc0Z1bmN0aW9uKHZhbC5waXBlKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdFxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XHJcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXHJcbiAqL1xyXG5mdW5jdGlvbiBpc1VSTFNlYXJjaFBhcmFtcyh2YWwpIHtcclxuICByZXR1cm4gdHlwZW9mIFVSTFNlYXJjaFBhcmFtcyAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsIGluc3RhbmNlb2YgVVJMU2VhcmNoUGFyYW1zO1xyXG59XHJcblxyXG4vKipcclxuICogVHJpbSBleGNlc3Mgd2hpdGVzcGFjZSBvZmYgdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mIGEgc3RyaW5nXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIFN0cmluZyB0byB0cmltXHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBTdHJpbmcgZnJlZWQgb2YgZXhjZXNzIHdoaXRlc3BhY2VcclxuICovXHJcbmZ1bmN0aW9uIHRyaW0oc3RyKSB7XHJcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzKi8sICcnKS5yZXBsYWNlKC9cXHMqJC8sICcnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIERldGVybWluZSBpZiB3ZSdyZSBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudFxyXG4gKlxyXG4gKiBUaGlzIGFsbG93cyBheGlvcyB0byBydW4gaW4gYSB3ZWIgd29ya2VyLCBhbmQgcmVhY3QtbmF0aXZlLlxyXG4gKiBCb3RoIGVudmlyb25tZW50cyBzdXBwb3J0IFhNTEh0dHBSZXF1ZXN0LCBidXQgbm90IGZ1bGx5IHN0YW5kYXJkIGdsb2JhbHMuXHJcbiAqXHJcbiAqIHdlYiB3b3JrZXJzOlxyXG4gKiAgdHlwZW9mIHdpbmRvdyAtPiB1bmRlZmluZWRcclxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcclxuICpcclxuICogcmVhY3QtbmF0aXZlOlxyXG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ1JlYWN0TmF0aXZlJ1xyXG4gKiBuYXRpdmVzY3JpcHRcclxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdOYXRpdmVTY3JpcHQnIG9yICdOUydcclxuICovXHJcbmZ1bmN0aW9uIGlzU3RhbmRhcmRCcm93c2VyRW52KCkge1xyXG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiAobmF2aWdhdG9yLnByb2R1Y3QgPT09ICdSZWFjdE5hdGl2ZScgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnTmF0aXZlU2NyaXB0JyB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdOUycpKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG4gIHJldHVybiAoXHJcbiAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxyXG4gICAgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xyXG4gICk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJdGVyYXRlIG92ZXIgYW4gQXJyYXkgb3IgYW4gT2JqZWN0IGludm9raW5nIGEgZnVuY3Rpb24gZm9yIGVhY2ggaXRlbS5cclxuICpcclxuICogSWYgYG9iamAgaXMgYW4gQXJyYXkgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xyXG4gKiB0aGUgdmFsdWUsIGluZGV4LCBhbmQgY29tcGxldGUgYXJyYXkgZm9yIGVhY2ggaXRlbS5cclxuICpcclxuICogSWYgJ29iaicgaXMgYW4gT2JqZWN0IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcclxuICogdGhlIHZhbHVlLCBrZXksIGFuZCBjb21wbGV0ZSBvYmplY3QgZm9yIGVhY2ggcHJvcGVydHkuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBvYmogVGhlIG9iamVjdCB0byBpdGVyYXRlXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBjYWxsYmFjayB0byBpbnZva2UgZm9yIGVhY2ggaXRlbVxyXG4gKi9cclxuZnVuY3Rpb24gZm9yRWFjaChvYmosIGZuKSB7XHJcbiAgLy8gRG9uJ3QgYm90aGVyIGlmIG5vIHZhbHVlIHByb3ZpZGVkXHJcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgLy8gRm9yY2UgYW4gYXJyYXkgaWYgbm90IGFscmVhZHkgc29tZXRoaW5nIGl0ZXJhYmxlXHJcbiAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XHJcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cclxuICAgIG9iaiA9IFtvYmpdO1xyXG4gIH1cclxuXHJcbiAgaWYgKGlzQXJyYXkob2JqKSkge1xyXG4gICAgLy8gSXRlcmF0ZSBvdmVyIGFycmF5IHZhbHVlc1xyXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2ldLCBpLCBvYmopO1xyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyBJdGVyYXRlIG92ZXIgb2JqZWN0IGtleXNcclxuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcclxuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcclxuICAgICAgICBmbi5jYWxsKG51bGwsIG9ialtrZXldLCBrZXksIG9iaik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBY2NlcHRzIHZhcmFyZ3MgZXhwZWN0aW5nIGVhY2ggYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0LCB0aGVuXHJcbiAqIGltbXV0YWJseSBtZXJnZXMgdGhlIHByb3BlcnRpZXMgb2YgZWFjaCBvYmplY3QgYW5kIHJldHVybnMgcmVzdWx0LlxyXG4gKlxyXG4gKiBXaGVuIG11bHRpcGxlIG9iamVjdHMgY29udGFpbiB0aGUgc2FtZSBrZXkgdGhlIGxhdGVyIG9iamVjdCBpblxyXG4gKiB0aGUgYXJndW1lbnRzIGxpc3Qgd2lsbCB0YWtlIHByZWNlZGVuY2UuXHJcbiAqXHJcbiAqIEV4YW1wbGU6XHJcbiAqXHJcbiAqIGBgYGpzXHJcbiAqIHZhciByZXN1bHQgPSBtZXJnZSh7Zm9vOiAxMjN9LCB7Zm9vOiA0NTZ9KTtcclxuICogY29uc29sZS5sb2cocmVzdWx0LmZvbyk7IC8vIG91dHB1dHMgNDU2XHJcbiAqIGBgYFxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcclxuICogQHJldHVybnMge09iamVjdH0gUmVzdWx0IG9mIGFsbCBtZXJnZSBwcm9wZXJ0aWVzXHJcbiAqL1xyXG5mdW5jdGlvbiBtZXJnZSgvKiBvYmoxLCBvYmoyLCBvYmozLCAuLi4gKi8pIHtcclxuICB2YXIgcmVzdWx0ID0ge307XHJcbiAgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcclxuICAgIGlmIChpc1BsYWluT2JqZWN0KHJlc3VsdFtrZXldKSAmJiBpc1BsYWluT2JqZWN0KHZhbCkpIHtcclxuICAgICAgcmVzdWx0W2tleV0gPSBtZXJnZShyZXN1bHRba2V5XSwgdmFsKTtcclxuICAgIH0gZWxzZSBpZiAoaXNQbGFpbk9iamVjdCh2YWwpKSB7XHJcbiAgICAgIHJlc3VsdFtrZXldID0gbWVyZ2Uoe30sIHZhbCk7XHJcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkodmFsKSkge1xyXG4gICAgICByZXN1bHRba2V5XSA9IHZhbC5zbGljZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmVzdWx0W2tleV0gPSB2YWw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgIGZvckVhY2goYXJndW1lbnRzW2ldLCBhc3NpZ25WYWx1ZSk7XHJcbiAgfVxyXG4gIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFeHRlbmRzIG9iamVjdCBhIGJ5IG11dGFibHkgYWRkaW5nIHRvIGl0IHRoZSBwcm9wZXJ0aWVzIG9mIG9iamVjdCBiLlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gYSBUaGUgb2JqZWN0IHRvIGJlIGV4dGVuZGVkXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBiIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb21cclxuICogQHBhcmFtIHtPYmplY3R9IHRoaXNBcmcgVGhlIG9iamVjdCB0byBiaW5kIGZ1bmN0aW9uIHRvXHJcbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIHJlc3VsdGluZyB2YWx1ZSBvZiBvYmplY3QgYVxyXG4gKi9cclxuZnVuY3Rpb24gZXh0ZW5kKGEsIGIsIHRoaXNBcmcpIHtcclxuICBmb3JFYWNoKGIsIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XHJcbiAgICBpZiAodGhpc0FyZyAmJiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIGFba2V5XSA9IGJpbmQodmFsLCB0aGlzQXJnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFba2V5XSA9IHZhbDtcclxuICAgIH1cclxuICB9KTtcclxuICByZXR1cm4gYTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSBieXRlIG9yZGVyIG1hcmtlci4gVGhpcyBjYXRjaGVzIEVGIEJCIEJGICh0aGUgVVRGLTggQk9NKVxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gY29udGVudCB3aXRoIEJPTVxyXG4gKiBAcmV0dXJuIHtzdHJpbmd9IGNvbnRlbnQgdmFsdWUgd2l0aG91dCBCT01cclxuICovXHJcbmZ1bmN0aW9uIHN0cmlwQk9NKGNvbnRlbnQpIHtcclxuICBpZiAoY29udGVudC5jaGFyQ29kZUF0KDApID09PSAweEZFRkYpIHtcclxuICAgIGNvbnRlbnQgPSBjb250ZW50LnNsaWNlKDEpO1xyXG4gIH1cclxuICByZXR1cm4gY29udGVudDtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgaXNBcnJheTogaXNBcnJheSxcclxuICBpc0FycmF5QnVmZmVyOiBpc0FycmF5QnVmZmVyLFxyXG4gIGlzQnVmZmVyOiBpc0J1ZmZlcixcclxuICBpc0Zvcm1EYXRhOiBpc0Zvcm1EYXRhLFxyXG4gIGlzQXJyYXlCdWZmZXJWaWV3OiBpc0FycmF5QnVmZmVyVmlldyxcclxuICBpc1N0cmluZzogaXNTdHJpbmcsXHJcbiAgaXNOdW1iZXI6IGlzTnVtYmVyLFxyXG4gIGlzT2JqZWN0OiBpc09iamVjdCxcclxuICBpc1BsYWluT2JqZWN0OiBpc1BsYWluT2JqZWN0LFxyXG4gIGlzVW5kZWZpbmVkOiBpc1VuZGVmaW5lZCxcclxuICBpc0RhdGU6IGlzRGF0ZSxcclxuICBpc0ZpbGU6IGlzRmlsZSxcclxuICBpc0Jsb2I6IGlzQmxvYixcclxuICBpc0Z1bmN0aW9uOiBpc0Z1bmN0aW9uLFxyXG4gIGlzU3RyZWFtOiBpc1N0cmVhbSxcclxuICBpc1VSTFNlYXJjaFBhcmFtczogaXNVUkxTZWFyY2hQYXJhbXMsXHJcbiAgaXNTdGFuZGFyZEJyb3dzZXJFbnY6IGlzU3RhbmRhcmRCcm93c2VyRW52LFxyXG4gIGZvckVhY2g6IGZvckVhY2gsXHJcbiAgbWVyZ2U6IG1lcmdlLFxyXG4gIGV4dGVuZDogZXh0ZW5kLFxyXG4gIHRyaW06IHRyaW0sXHJcbiAgc3RyaXBCT006IHN0cmlwQk9NXHJcbn07XHJcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XHJcblxyXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcclxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXHJcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcclxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cclxuXHJcbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xyXG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xyXG5cclxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xyXG59XHJcbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcclxufVxyXG4oZnVuY3Rpb24gKCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XHJcbiAgICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xyXG4gICAgfVxyXG4gICAgdHJ5IHtcclxuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcclxuICAgICAgICB9XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcclxuICAgIH1cclxufSAoKSlcclxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcclxuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XHJcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXHJcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcclxuICAgIH1cclxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXHJcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcclxuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcclxuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xyXG4gICAgfVxyXG4gICAgdHJ5IHtcclxuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXHJcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcclxuICAgIH0gY2F0Y2goZSl7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XHJcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcclxuICAgICAgICB9IGNhdGNoKGUpe1xyXG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxyXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xyXG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XHJcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXHJcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xyXG4gICAgfVxyXG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxyXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XHJcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xyXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcclxuICAgIH1cclxuICAgIHRyeSB7XHJcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xyXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcclxuICAgIH0gY2F0Y2ggKGUpe1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XHJcbiAgICAgICAgfSBjYXRjaCAoZSl7XHJcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxyXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XHJcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxufVxyXG52YXIgcXVldWUgPSBbXTtcclxudmFyIGRyYWluaW5nID0gZmFsc2U7XHJcbnZhciBjdXJyZW50UXVldWU7XHJcbnZhciBxdWV1ZUluZGV4ID0gLTE7XHJcblxyXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XHJcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xyXG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcclxuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XHJcbiAgICB9XHJcbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XHJcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xyXG4gICAgaWYgKGRyYWluaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XHJcbiAgICBkcmFpbmluZyA9IHRydWU7XHJcblxyXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcclxuICAgIHdoaWxlKGxlbikge1xyXG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xyXG4gICAgICAgIHF1ZXVlID0gW107XHJcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xyXG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcclxuICAgIH1cclxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XHJcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xyXG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xyXG59XHJcblxyXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xyXG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xyXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcclxuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XHJcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcclxuICAgIH1cclxufTtcclxuXHJcbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcclxuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XHJcbiAgICB0aGlzLmZ1biA9IGZ1bjtcclxuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcclxufVxyXG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcclxufTtcclxucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcclxucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcclxucHJvY2Vzcy5lbnYgPSB7fTtcclxucHJvY2Vzcy5hcmd2ID0gW107XHJcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xyXG5wcm9jZXNzLnZlcnNpb25zID0ge307XHJcblxyXG5mdW5jdGlvbiBub29wKCkge31cclxuXHJcbnByb2Nlc3Mub24gPSBub29wO1xyXG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcclxucHJvY2Vzcy5vbmNlID0gbm9vcDtcclxucHJvY2Vzcy5vZmYgPSBub29wO1xyXG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcclxucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xyXG5wcm9jZXNzLmVtaXQgPSBub29wO1xyXG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XHJcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XHJcblxyXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XHJcblxyXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xyXG59O1xyXG5cclxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcclxucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XHJcbn07XHJcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XHJcbiIsImNvbnN0IHBob3RvQ2hhcmFjdGVycyA9IHtcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvOS9cIjogXCIuL2ltZy9CaWdnc19EYXJrbGlnaHRlci5wbmdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvMS9cIjogXCIuL2ltZy9sdWtlLXNreXdhbGtlci5wbmdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvNC9cIjogXCIuL2ltZy9kYXJrX3dhaWRlci5wbmdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvMy9cIjogXCIuL2ltZy9yMi1kMi5wbmdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvOC9cIjogXCIuL2ltZy9yNS1kNC5qcGdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvMi9cIjogXCIuL2ltZy9jLTNwby5wbmdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvMTMvXCI6IFwiLi9pbWcvY2hld2JhY2NhLnBuZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS8xNS9cIjogXCIuL2ltZy9ncmVlZG8uanBnXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzE5L1wiOiBcIi4vaW1nL0pla19Ub25vX1BvcmtpbnMucG5nXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzUvXCI6IFwiLi9pbWcvbGVpbGEgb3JnYW5hLnBuZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS8xMi9cIjogXCIuL2ltZy9UYXJraW4tU1dFLnBuZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS83L1wiOiBcIi4vaW1nL0JlcnVfTGFycy5qZmlmXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzE0L1wiOiBcIi4vaW1nL0hhbi1Tb2xvLnBuZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS8xNi9cIjpcclxuICAgIFwiLi9pbWcvamFiYmEtdGhlLWh1dHQtYm9iYS1mZXR0LXlvZGEuanBlZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS82L1wiOiBcIi4vaW1nL293ZW4tbGFycy5wbmdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvODEvXCI6IFwiLi9pbWcvUmF5bXVzQW50aWxsZXMuanBnXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzEwL1wiOiBcIi4vaW1nL3dhbi1rZW5vYmkucG5nXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzE4L1wiOiBcIi4vaW1nL1dlZGdlX0FudGlsbGVzLnBuZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS8yNC9cIjogXCIuL2ltZy9ib3Nzay5wbmdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvMjYvXCI6IFwiLi9pbWcvQ2hhcmFjdGVyLUxvYm90LnBuZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS8yMy9cIjogXCIuL2ltZy9pai04OC1qYWJiYXBuZy5wbmdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvMjUvXCI6IFwiLi9pbWcvbGFuZG8tY2Fscmlzc2lhbi5qcGdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvMjEvXCI6IFwiLi9pbWcvcGFscGF0aW5lLnBuZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS8yMC9cIjogXCIuL2ltZy95b2RhLnBuZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS8yMi9cIjogXCIuL2ltZy9ib2JhLWZldHQucG5nXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzU1L1wiOiBcIi4vaW1nL0FkaSBHYWxsaWEucG5nXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzI5L1wiOiBcIi4vaW1nL0FydmVsQ3J5bnlkLnBuZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS80Ni9cIjogXCIuL2ltZy9BeWxhLVNlY3VyYS5wbmdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvNDUvXCI6IFwiLi9pbWcvYmliX2ZvcnR1bmEucG5nXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzI3L1wiOiBcIi4vaW1nL2Fja2Jhci5qcGdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvNjcvXCI6IFwiLi9pbWcvZG9va3UucG5nXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzU0L1wiOiBcIi4vaW1nL0VldGhfS290aC5wbmdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvNzkvXCI6IFwiLi9pbWcvZ2VuZXJhbC1ncmlldm91cy5wbmdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvNTIvXCI6IFwiLi9pbWcvS2ktQWRpLU11bmRpLnBuZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS81My9cIjogXCIuL2ltZy9LaXRfRmlzdG8uamZpZlwiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS82NC9cIjogXCIuL2ltZy9MdW1pbmFyYS1VbmR1bGkucG5nXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzUxL1wiOiBcIi4vaW1nL21hY2Utd2luZHUucG5nXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzI4L1wiOiBcIi4vaW1nL01vbl9Nb3RobWEucG5nXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzMxL1wiOiBcIi4vaW1nL25pZW4tbnVuYi5wbmdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvMzMvXCI6IFwiLi9pbWcvTnV0ZS1HdW5yYXkucG5nXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzM1L1wiOiBcIi4vaW1nL1BhZG3DqS1BbWlkYWxhLnBuZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS81OC9cIjogXCIuL2ltZy9QbG8tS29vbnQucG5nXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzYzL1wiOiBcIi4vaW1nL1BvZ2dsZXRoZWxlc3Nlcl9kZXRhaWwucG5nXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzc1L1wiOiBcIi4vaW1nL1I0LVAxNy03NTAwNi5wbmdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvNzgvXCI6IFwiLi9pbWcvU2hhYWt0aV9kZXRhaWwucG5nXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzgyL1wiOiBcIi4vaW1nL1NseS1Nb29yZS5wbmdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvODAvXCI6IFwiLi9pbWcvdGFyZmZ1bF9kZXRhaWwucG5nXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzgzL1wiOiBcIi4vaW1nL1Rpb25fTWVkb24ud2VicFwiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS8xMS9cIjogXCIuL2ltZy9BbmFraW4tU2t5d2Fsa2VyLnBuZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS82OC9cIjogXCIuL2ltZy9CYWlsX09yZ2FuYS5wbmdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvNjUvXCI6IFwiLi9pbWcvQmFycmlzcy1PZmZlZS5wbmdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvNjIvXCI6IFwiLi9pbWcvY2xpZWdnbGFyc19kZXRhaWwucG5nXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzYxL1wiOiBcIi4vaW1nL0NvcmTDqS5qcGdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvNzEvXCI6IFwiLi9pbWcvZGV4dGVyamV0dHN0ZXJfZGV0YWlsLnBuZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS82Ni9cIjogXCIuL2ltZy9Eb3Jtw6kuanBnXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzYwL1wiOiBcIi4vaW1nL0dyZWdhci1UeXBoby5wbmdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvNjkvXCI6IFwiLi9pbWcvSmFuZ28gRmV0dC5wbmdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvMzYvXCI6IFwiLi9pbWcvSmFyLUphci1CaW5rcy5wbmdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvNzQvXCI6IFwiLi9pbWcvSm9jYXN0YS1OdS5wbmdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvNzIvXCI6IFwiLi9pbWcvTGFtYV9zdS5wbmdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvNTYvXCI6IFwiLi9pbWcvU2Flc2VlLVRpaW4ucG5nXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzc3L1wiOiBcIi4vaW1nL1Nhbl9IaWxsLnBuZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS80My9cIjogXCIuL2ltZy9TaG1pLVNreXdhbGtlci5wbmdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvNzMvXCI6IFwiLi9pbWcvVGF1bi1XZS5wbmdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvNzYvXCI6IFwiLi9pbWcvV2F0X1RhbWJvci5wbmdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvNDAvXCI6IFwiLi9pbWcvV2F0dG8ucG5nXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzcwL1wiOiBcIi4vaW1nL1phbV9XZXNlbGwucG5nXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzU5L1wiOiBcIi4vaW1nL01hc19BbWVkZGEucG5nXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzUwL1wiOiBcIi4vaW1nL0JlblF1YWRpbmFyb3NIUy1TV0UucG5nXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzQ0L1wiOiBcIi4vaW1nL0RhcnRoLU1hdWwucG5nXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzQ4L1wiOiBcIi4vaW1nL0R1ZF9Cb2x0LmpwZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS80OS9cIjogXCIuL2ltZy9HYXNnYW5wLmpwZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS80Mi9cIjogXCIuL2ltZy9RdWFyc2gtUGFuYWthLmpwZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS8zMi9cIjogXCIuL2ltZy9RdWktR29uLUppbm4ucG5nXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzQ3L1wiOiBcIi4vaW1nL1JhdHRzSFMuanBnXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzM5L1wiOiBcIi4vaW1nL1JpY19PbGllLmpwZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS8zNy9cIjogXCIuL2ltZy9Sb29zLVRhcnBhbHMucG5nXCIsXHJcbiAgXCJodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLzM4L1wiOiBcIi4vaW1nL1J1Z29yTmFzcy1TV0NULnBuZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS80MS9cIjogXCIuL2ltZy9TZWJ1bGJhLnBuZ1wiLFxyXG4gIFwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS8zNC9cIjogXCIuL2ltZy9WYWxvcnVtLVNXRS5wbmdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvMzAvXCI6IFwiLi9pbWcvd2lja2V0X3dfd2Fyd2ljay5wbmdcIixcclxuICBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvNTcvXCI6IFwiLi9pbWcvWWFyYWVsLVBvb2YucG5nXCIsXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwaG90b0NoYXJhY3RlcnM7XHJcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsImltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcclxuXHJcbmNvbnN0IEJBU0UgPSBcImh0dHBzOi8vc3dhcGkuZGV2L2FwaS9cIjtcclxuXHJcbmZ1bmN0aW9uIGdldEluZm8obnVtUGFnZSwgaW5mbykge1xyXG4gIGNvbnN0IHJlcXVlc3QgPSBheGlvcy5nZXQoQkFTRSArIGluZm8gKyBudW1QYWdlKTtcclxuICByZXR1cm4gcmVxdWVzdFxyXG4gICAgLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICByZXR1cm4gcmVzLmRhdGEucmVzdWx0cztcclxuICAgIH0pXHJcbiAgICAuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICBpZiAoIXJlcXVlc3QpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInNvbWV0aGluZyB3cm9uZ1wiLCBlcnIpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBbXTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7IGdldEluZm8gfTtcclxuIiwiaW1wb3J0IGNoYXJzTW9kdWxlIGZyb20gXCIuL2NoYXJhY3RlcnNcIjtcclxuaW1wb3J0IGRpc3BsYXlQZW9wbGUgZnJvbSBcIi4vdmlld1wiO1xyXG5pbXBvcnQgXCIuL2NoYXJhY3RlcnMuY3NzXCI7XHJcbmltcG9ydCBcIi4vaW1nL21heHJlc2RlZmF1bHQuanBnXCI7XHJcblxyXG5jb25zdCBwZW9wbGUgPSBgcGVvcGxlLz9wYWdlPWA7XHJcbmNvbnN0IGJ0bkluZm8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ0blwiKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcclxuICBidG5JbmZvLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICBjb25zdCBwZW9wbGVJZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmlsbUlkXCIpLnZhbHVlO1xyXG4gICAgaWYgKHBlb3BsZUlkIDwgMSB8fCBwZW9wbGVJZCA+IDkpIHJldHVybjtcclxuICAgIGNoYXJzTW9kdWxlLmdldEluZm8ocGVvcGxlSWQsIHBlb3BsZSkudGhlbihkaXNwbGF5UGVvcGxlKTtcclxuICB9KTtcclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL0FkaSBHYWxsaWEucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9BbmFraW4tU2t5d2Fsa2VyLnBuZ1wiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvQXJ2ZWxDcnlueWQucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9BeWxhLVNlY3VyYS5wbmdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL0JhaWxfT3JnYW5hLnBuZ1wiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvQmFycmlzcy1PZmZlZS5wbmdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL0JlblF1YWRpbmFyb3NIUy1TV0UucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9CZXJ1X0xhcnMuamZpZlwiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvQmlnZ3NfRGFya2xpZ2h0ZXIucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9DaGFyYWN0ZXItTG9ib3QucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9Db3Jkw6kuanBnXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9EYXJ0aC1NYXVsLnBuZ1wiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvRG9ybcOpLmpwZ1wiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvRHVkX0JvbHQuanBnXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9FZXRoX0tvdGgucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9HYXNnYW5wLmpwZ1wiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvR3JlZ2FyLVR5cGhvLnBuZ1wiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvSGFuLVNvbG8ucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9KYW5nbyBGZXR0LnBuZ1wiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvSmFyLUphci1CaW5rcy5wbmdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL0pla19Ub25vX1BvcmtpbnMucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9Kb2Nhc3RhLU51LnBuZ1wiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvS2ktQWRpLU11bmRpLnBuZ1wiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvS2l0X0Zpc3RvLmpmaWZcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL0xhbWFfc3UucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9MdW1pbmFyYS1VbmR1bGkucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9NYXNfQW1lZGRhLnBuZ1wiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvTW9uX01vdGhtYS5wbmdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL051dGUtR3VucmF5LnBuZ1wiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvUGFkbcOpLUFtaWRhbGEucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9QbG8tS29vbnQucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9Qb2dnbGV0aGVsZXNzZXJfZGV0YWlsLnBuZ1wiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvUXVhcnNoLVBhbmFrYS5qcGdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL1F1aS1Hb24tSmlubi5wbmdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL1I0LVAxNy03NTAwNi5wbmdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL1JhdHRzSFMuanBnXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9SYXltdXNBbnRpbGxlcy5qcGdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL1JpY19PbGllLmpwZ1wiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvUm9vcy1UYXJwYWxzLnBuZ1wiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvUnVnb3JOYXNzLVNXQ1QucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9TYWVzZWUtVGlpbi5wbmdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL1Nhbl9IaWxsLnBuZ1wiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvU2VidWxiYS5wbmdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL1NoYWFrdGlfZGV0YWlsLnBuZ1wiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvU2htaS1Ta3l3YWxrZXIucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9TbHktTW9vcmUucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9UYXJraW4tU1dFLnBuZ1wiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvVGF1bi1XZS5wbmdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL1Rpb25fTWVkb24ud2VicFwiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvVmFsb3J1bS1TV0UucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9XYXRfVGFtYm9yLnBuZ1wiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvV2F0dG8ucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9XZWRnZV9BbnRpbGxlcy5wbmdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL1lhcmFlbC1Qb29mLnBuZ1wiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvWmFtX1dlc2VsbC5wbmdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL2Fja2Jhci5qcGdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL2JpYl9mb3J0dW5hLnBuZ1wiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvYm9iYS1mZXR0LnBuZ1wiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvYm9zc2sucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9jLTNwby5wbmdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL2NoZXdiYWNjYS5wbmdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL2NsaWVnZ2xhcnNfZGV0YWlsLnBuZ1wiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvZGFya193YWlkZXIucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9kZXh0ZXJqZXR0c3Rlcl9kZXRhaWwucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9kb29rdS5wbmdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL2dlbmVyYWwtZ3JpZXZvdXMucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9ncmVlZG8uanBnXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9pai04OC1qYWJiYXBuZy5wbmdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL2phYmJhLXRoZS1odXR0LWJvYmEtZmV0dC15b2RhLmpwZWdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL2xhbmRvLWNhbHJpc3NpYW4uanBnXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9sZWlsYSBvcmdhbmEucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9sdWtlLXNreXdhbGtlci5wbmdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL21hY2Utd2luZHUucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9tYXhyZXNkZWZhdWx0LmpwZ1wiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvbmllbi1udW5iLnBuZ1wiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvb3dlbi1sYXJzLnBuZ1wiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvcGFscGF0aW5lLnBuZ1wiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvcjItZDIucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9yNS1kNC5qcGdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL3RhcmZmdWxfZGV0YWlsLnBuZ1wiOyIsImV4cG9ydCBkZWZhdWx0IFwiLi9pbWcvd2FuLWtlbm9iaS5wbmdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL3dpY2tldF93X3dhcndpY2sucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy95b2RhLnBuZ1wiOyIsImltcG9ydCBwaG90b0NoYXJhY3RlcnMgZnJvbSBcIi4vUGhvdG9DaGFyLmpzXCI7XG5pbXBvcnQgXCIuL2ltZy9CaWdnc19EYXJrbGlnaHRlci5wbmdcIjtcbmltcG9ydCBcIi4vaW1nL2x1a2Utc2t5d2Fsa2VyLnBuZ1wiO1xuaW1wb3J0IFwiLi9pbWcvZGFya193YWlkZXIucG5nXCI7XG5pbXBvcnQgXCIuL2ltZy9yMi1kMi5wbmdcIjtcbmltcG9ydCBcIi4vaW1nL3I1LWQ0LmpwZ1wiO1xuaW1wb3J0IFwiLi9pbWcvYy0zcG8ucG5nXCI7XG5pbXBvcnQgXCIuL2ltZy9jaGV3YmFjY2EucG5nXCI7XG5pbXBvcnQgXCIuL2ltZy9ncmVlZG8uanBnXCI7XG5pbXBvcnQgXCIuL2ltZy9KZWtfVG9ub19Qb3JraW5zLnBuZ1wiO1xuaW1wb3J0IFwiLi9pbWcvbGVpbGEgb3JnYW5hLnBuZ1wiO1xuaW1wb3J0IFwiLi9pbWcvVGFya2luLVNXRS5wbmdcIjtcbmltcG9ydCBcIi4vaW1nL0JlcnVfTGFycy5qZmlmXCI7XG5pbXBvcnQgXCIuL2ltZy9IYW4tU29sby5wbmdcIjtcbmltcG9ydCBcIi4vaW1nL2phYmJhLXRoZS1odXR0LWJvYmEtZmV0dC15b2RhLmpwZWdcIjtcbmltcG9ydCBcIi4vaW1nL293ZW4tbGFycy5wbmdcIjtcbmltcG9ydCBcIi4vaW1nL1JheW11c0FudGlsbGVzLmpwZ1wiO1xuaW1wb3J0IFwiLi9pbWcvd2FuLWtlbm9iaS5wbmdcIjtcbmltcG9ydCBcIi4vaW1nL1dlZGdlX0FudGlsbGVzLnBuZ1wiO1xuaW1wb3J0IFwiLi9pbWcvYm9zc2sucG5nXCI7XG5pbXBvcnQgXCIuL2ltZy9DaGFyYWN0ZXItTG9ib3QucG5nXCI7XG5pbXBvcnQgXCIuL2ltZy9pai04OC1qYWJiYXBuZy5wbmdcIjtcbmltcG9ydCBcIi4vaW1nL2xhbmRvLWNhbHJpc3NpYW4uanBnXCI7XG5pbXBvcnQgXCIuL2ltZy9wYWxwYXRpbmUucG5nXCI7XG5pbXBvcnQgXCIuL2ltZy95b2RhLnBuZ1wiO1xuaW1wb3J0IFwiLi9pbWcvYm9iYS1mZXR0LnBuZ1wiO1xuaW1wb3J0IFwiLi9pbWcvQWRpIEdhbGxpYS5wbmdcIjtcbmltcG9ydCBcIi4vaW1nL0FydmVsQ3J5bnlkLnBuZ1wiO1xuaW1wb3J0IFwiLi9pbWcvQXlsYS1TZWN1cmEucG5nXCI7XG5pbXBvcnQgXCIuL2ltZy9iaWJfZm9ydHVuYS5wbmdcIjtcbmltcG9ydCBcIi4vaW1nL2Fja2Jhci5qcGdcIjtcbmltcG9ydCBcIi4vaW1nL2Rvb2t1LnBuZ1wiO1xuaW1wb3J0IFwiLi9pbWcvRWV0aF9Lb3RoLnBuZ1wiO1xuaW1wb3J0IFwiLi9pbWcvZ2VuZXJhbC1ncmlldm91cy5wbmdcIjtcbmltcG9ydCBcIi4vaW1nL0tpLUFkaS1NdW5kaS5wbmdcIjtcbmltcG9ydCBcIi4vaW1nL0tpdF9GaXN0by5qZmlmXCI7XG5pbXBvcnQgXCIuL2ltZy9MdW1pbmFyYS1VbmR1bGkucG5nXCI7XG5pbXBvcnQgXCIuL2ltZy9tYWNlLXdpbmR1LnBuZ1wiO1xuaW1wb3J0IFwiLi9pbWcvTW9uX01vdGhtYS5wbmdcIjtcbmltcG9ydCBcIi4vaW1nL25pZW4tbnVuYi5wbmdcIjtcbmltcG9ydCBcIi4vaW1nL051dGUtR3VucmF5LnBuZ1wiO1xuaW1wb3J0IFwiLi9pbWcvUGFkbcOpLUFtaWRhbGEucG5nXCI7XG5pbXBvcnQgXCIuL2ltZy9QbG8tS29vbnQucG5nXCI7XG5pbXBvcnQgXCIuL2ltZy9Qb2dnbGV0aGVsZXNzZXJfZGV0YWlsLnBuZ1wiO1xuaW1wb3J0IFwiLi9pbWcvUjQtUDE3LTc1MDA2LnBuZ1wiO1xuaW1wb3J0IFwiLi9pbWcvU2hhYWt0aV9kZXRhaWwucG5nXCI7XG5pbXBvcnQgXCIuL2ltZy9TbHktTW9vcmUucG5nXCI7XG5pbXBvcnQgXCIuL2ltZy90YXJmZnVsX2RldGFpbC5wbmdcIjtcbmltcG9ydCBcIi4vaW1nL1Rpb25fTWVkb24ud2VicFwiO1xuaW1wb3J0IFwiLi9pbWcvQW5ha2luLVNreXdhbGtlci5wbmdcIjtcbmltcG9ydCBcIi4vaW1nL0JhaWxfT3JnYW5hLnBuZ1wiO1xuaW1wb3J0IFwiLi9pbWcvQmFycmlzcy1PZmZlZS5wbmdcIjtcbmltcG9ydCBcIi4vaW1nL2NsaWVnZ2xhcnNfZGV0YWlsLnBuZ1wiO1xuaW1wb3J0IFwiLi9pbWcvQ29yZMOpLmpwZ1wiO1xuaW1wb3J0IFwiLi9pbWcvZGV4dGVyamV0dHN0ZXJfZGV0YWlsLnBuZ1wiO1xuaW1wb3J0IFwiLi9pbWcvRG9ybcOpLmpwZ1wiO1xuaW1wb3J0IFwiLi9pbWcvR3JlZ2FyLVR5cGhvLnBuZ1wiO1xuaW1wb3J0IFwiLi9pbWcvSmFuZ28gRmV0dC5wbmdcIjtcbmltcG9ydCBcIi4vaW1nL0phci1KYXItQmlua3MucG5nXCI7XG5pbXBvcnQgXCIuL2ltZy9Kb2Nhc3RhLU51LnBuZ1wiO1xuaW1wb3J0IFwiLi9pbWcvTGFtYV9zdS5wbmdcIjtcbmltcG9ydCBcIi4vaW1nL1NhZXNlZS1UaWluLnBuZ1wiO1xuaW1wb3J0IFwiLi9pbWcvU2FuX0hpbGwucG5nXCI7XG5pbXBvcnQgXCIuL2ltZy9TaG1pLVNreXdhbGtlci5wbmdcIjtcbmltcG9ydCBcIi4vaW1nL1RhdW4tV2UucG5nXCI7XG5pbXBvcnQgXCIuL2ltZy9XYXRfVGFtYm9yLnBuZ1wiO1xuaW1wb3J0IFwiLi9pbWcvV2F0dG8ucG5nXCI7XG5pbXBvcnQgXCIuL2ltZy9aYW1fV2VzZWxsLnBuZ1wiO1xuaW1wb3J0IFwiLi9pbWcvTWFzX0FtZWRkYS5wbmdcIjtcbmltcG9ydCBcIi4vaW1nL0JlblF1YWRpbmFyb3NIUy1TV0UucG5nXCI7XG5pbXBvcnQgXCIuL2ltZy9EYXJ0aC1NYXVsLnBuZ1wiO1xuaW1wb3J0IFwiLi9pbWcvRHVkX0JvbHQuanBnXCI7XG5pbXBvcnQgXCIuL2ltZy9HYXNnYW5wLmpwZ1wiO1xuaW1wb3J0IFwiLi9pbWcvUXVhcnNoLVBhbmFrYS5qcGdcIjtcbmltcG9ydCBcIi4vaW1nL1F1aS1Hb24tSmlubi5wbmdcIjtcbmltcG9ydCBcIi4vaW1nL1JhdHRzSFMuanBnXCI7XG5pbXBvcnQgXCIuL2ltZy9SaWNfT2xpZS5qcGdcIjtcbmltcG9ydCBcIi4vaW1nL1Jvb3MtVGFycGFscy5wbmdcIjtcbmltcG9ydCBcIi4vaW1nL1J1Z29yTmFzcy1TV0NULnBuZ1wiO1xuaW1wb3J0IFwiLi9pbWcvU2VidWxiYS5wbmdcIjtcbmltcG9ydCBcIi4vaW1nL1ZhbG9ydW0tU1dFLnBuZ1wiO1xuaW1wb3J0IFwiLi9pbWcvd2lja2V0X3dfd2Fyd2ljay5wbmdcIjtcbmltcG9ydCBcIi4vaW1nL1lhcmFlbC1Qb29mLnBuZ1wiO1xuXG5jb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBlb3BsZVwiKTtcbmNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50aXRsZVwiKTtcblxuZnVuY3Rpb24gZGlzcGxheVBlb3BsZShwZW9wbGUgPSBbXSkge1xuICBjb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgdGl0bGUuaW5uZXJUZXh0ID0gXCJDaGFyYWN0ZXJzXCI7XG4gIHBlb3BsZS5tYXAoKHBlcnNvbikgPT4ge1xuICAgIGRpc3BsYXlDaGFyYWN0ZXJJbmZvKHBlcnNvbik7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5Q2hhcmFjdGVySW5mbyhwZXJzb24pIHtcbiAgY29uc3QgcGVyc29uRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHBlcnNvbkVsZW1lbnQuY2xhc3NOYW1lID0gXCJwZXJzb24gYXJvdW5kXCI7XG4gIGNvbnN0IHBlcnNvbkljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBwZXJzb25JY29uLmNsYXNzTmFtZSA9IFwiaWNvblwiO1xuICBzd2l0Y2ggKHBlcnNvbi5nZW5kZXIpIHtcbiAgICBjYXNlIFwibWFsZVwiOlxuICAgICAgcGVyc29uLmdlbmRlciArPSBgICDimYJgO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImZlbWFsZVwiOlxuICAgICAgcGVyc29uLmdlbmRlciArPSBgICDimYBgO1xuICAgICAgYnJlYWs7XG4gIH1cblxuICBjcmVhdGVJbmZvQ2hhcihwZXJzb25FbGVtZW50LCBwZXJzb24pO1xuICBmaW5kSW1nKHBlcnNvbiwgcGVyc29uSWNvbik7XG5cbiAgY29udGFpbmVyLmFwcGVuZChwZXJzb25FbGVtZW50KTtcbiAgcGVyc29uRWxlbWVudC5hcHBlbmRDaGlsZChwZXJzb25JY29uKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlSW5mb0NoYXIoZWxlbWVudCwgcGVyc29uKSB7XG4gIGVsZW1lbnQuaW5uZXJIVE1MID0gYFxuICAgIDxkaXY+XG4gICAgICA8aDM+IDxzcGFuPiBOYW1lOiA8L3NwYW4+ICR7cGVyc29uLm5hbWV9IDwvaDM+XG4gICAgICA8aDQ+IDxzcGFuPiBCaXJ0aGRheTogPC9zcGFuPiAke3BlcnNvbltcImJpcnRoX3llYXJcIl19IDwvaDQ+XG4gICAgICA8aDQ+IDxzcGFuPiBHZW5kZXI6IDwvc3Bhbj4gJHtwZXJzb25bXCJnZW5kZXJcIl19IDwvaDQ+XG4gICAgIDwvZGl2PlxuICAgIGA7XG59XG5cbmZ1bmN0aW9uIGZpbmRJbWcoY2hhcmFjdGVycywgcGVyc29uSWNvbikge1xuICBjb25zdCBpbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gIGltYWdlLmNsYXNzTmFtZSA9IFwiaWNvbkNoYXJhY3RlclwiO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgT2JqZWN0LmtleXMocGhvdG9DaGFyYWN0ZXJzKS5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGltYWdlQWRkID0gT2JqZWN0LnZhbHVlcyhwaG90b0NoYXJhY3RlcnMpW2ldLnJlcGxhY2UoXCIuL2ltZ1wiLCBcImltZ1wiKTtcbiAgICBjb25zdCBodHRwc1VybCA9IGNoYXJhY3RlcnNbXCJ1cmxcIl0ucmVwbGFjZShcImh0dHBcIiwgXCJodHRwc1wiKTtcbiAgICBpZiAoaHR0cHNVcmwgPT09IE9iamVjdC5rZXlzKHBob3RvQ2hhcmFjdGVycylbaV0pIHtcbiAgICAgIGltYWdlLnNyYyA9IGltYWdlQWRkO1xuICAgICAgcGVyc29uSWNvbi5hcHBlbmRDaGlsZChpbWFnZSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGRpc3BsYXlQZW9wbGU7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCJleHBvcnQgZnVuY3Rpb24qIGNyZWF0ZUlkR2VuZXJhdG9yKCkge1xuICBmb3IgKGxldCBpID0gMTsgaSA8IEluZmluaXR5OyBpKyspIHtcbiAgICB5aWVsZCBpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBuZXdGb250R2VuZXJhdG9yKHNpemUpIHtcbiAgY29uc3Qgc2Vuc2l0aXZlS2V5Q29kZSA9IHtcbiAgICBuZXh0KGtleSkge1xuICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgY2FzZSBcInVwXCI6XG4gICAgICAgICAgc2l6ZSArPSAyO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiZG93blwiOlxuICAgICAgICAgIHNpemUgLT0gMjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBzaXplICs9IDA7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICBkb25lOiBmYWxzZSxcbiAgICAgICAgdmFsdWU6IHNpemUsXG4gICAgICB9O1xuICAgIH0sXG4gIH07XG4gIHJldHVybiBzZW5zaXRpdmVLZXlDb2RlO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9GQVZQTkdfc2t5LWJsdWUtY2xvdWQtZGVza3RvcC13YWxscGFwZXJfWlpoV3BmQVEucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIuL2ltZy9jbG91ZF9QTkcyNC5wbmdcIjsiLCJleHBvcnQgZGVmYXVsdCBcIi4vaW1nL21vdW50YWluX1BORzIucG5nXCI7IiwiaW1wb3J0IHsgY3JlYXRlSWRHZW5lcmF0b3IsIG5ld0ZvbnRHZW5lcmF0b3IgfSBmcm9tIFwiLi9nZW5lcmF0b3JcIjtcbmltcG9ydCBcIi4vZ2VuZXJhdG9yLmNzc1wiO1xuaW1wb3J0IFwiLi9pbWcvRkFWUE5HX3NreS1ibHVlLWNsb3VkLWRlc2t0b3Atd2FsbHBhcGVyX1paaFdwZkFRLnBuZ1wiO1xuaW1wb3J0IFwiLi9pbWcvY2xvdWRfUE5HMjQucG5nXCI7XG5pbXBvcnQgXCIuL2ltZy9tb3VudGFpbl9QTkcyLnBuZ1wiO1xuXG5jb25zdCBmb250R2VuZXJhdG9yID0gbmV3Rm9udEdlbmVyYXRvcigxNCk7XG5jb25zdCBpZEdlbmVyYXRvciA9IGNyZWF0ZUlkR2VuZXJhdG9yKCk7XG5cbmNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaWQtdGV4dFwiKTtcbmNvbnN0IGlkR2VuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpZC1nZW5cIik7XG5jb25zdCBzaXplSW5jcmVhc2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNpemVJbmNyZWFzZVwiKTtcbmNvbnN0IHNpemVEZWNyZWFzZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2l6ZURlY3JlYXNlXCIpO1xuY29uc3QgdGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGV4dFwiKTtcbmNvbnN0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbnAuY2xhc3NOYW1lID0gXCJ0YWJsZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIHBhcmFsbGF4KGV2ZW50KSB7XG4gICAgdGhpcy5xdWVyeVNlbGVjdG9yQWxsKFwiLmxheWVyXCIpLmZvckVhY2goKGxheWVyKSA9PiB7XG4gICAgICBjb25zdCBzcGVlZCA9IGxheWVyLmdldEF0dHJpYnV0ZShcImRhdGEtc3BlZWRcIik7XG4gICAgICBsYXllci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgkeyhldmVudC5jbGllbnRYICogc3BlZWQpIC8gMjAwMH1weGA7XG4gICAgfSk7XG4gIH1cblxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHBhcmFsbGF4KTtcblxuICBjb25zdCBpbmNyZWFzZSA9ICgpID0+IHtcbiAgICBpZiAodGV4dC5zdHlsZS5mb250U2l6ZSA8IFwiOTZweFwiKSB7XG4gICAgICB0ZXh0LnN0eWxlLmZvbnRTaXplID0gYCR7Zm9udEdlbmVyYXRvci5uZXh0KFwidXBcIikudmFsdWV9cHhgO1xuICAgICAgcC5zdHlsZS5mb250U2l6ZSA9IGAke2ZvbnRHZW5lcmF0b3IubmV4dChcInVwXCIpLnZhbHVlfXB4YDtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZGVjcmVhc2UgPSAoKSA9PiB7XG4gICAgaWYgKHRleHQuc3R5bGUuZm9udFNpemUgPiBcIjE0cHhcIikge1xuICAgICAgdGV4dC5zdHlsZS5mb250U2l6ZSA9IGAke2ZvbnRHZW5lcmF0b3IubmV4dChcImRvd25cIikudmFsdWV9cHhgO1xuICAgICAgcC5zdHlsZS5mb250U2l6ZSA9IGAke2ZvbnRHZW5lcmF0b3IubmV4dChcImRvd25cIikudmFsdWV9cHhgO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBibG9ja0lEID0gKCkgPT4ge1xuICAgIHAuaW5uZXJUZXh0ID0gXCJcIjtcbiAgICBwLmlubmVySFRNTCA9IGAke2lkR2VuZXJhdG9yLm5leHQoKS52YWx1ZX1gO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwKTtcbiAgfTtcblxuICBpZEdlbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGJsb2NrSUQoKTtcbiAgfSk7XG5cbiAgc2l6ZUluY3JlYXNlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgaW5jcmVhc2UoKTtcbiAgfSk7XG5cbiAgc2l6ZURlY3JlYXNlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgZGVjcmVhc2UoKTtcbiAgfSk7XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGV2ZW50KSA9PiB7XG4gICAgc3dpdGNoIChldmVudC5jb2RlKSB7XG4gICAgICBjYXNlIFwiQXJyb3dVcFwiOlxuICAgICAgICBpbmNyZWFzZSgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJBcnJvd1JpZ2h0XCI6XG4gICAgICAgIGluY3JlYXNlKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIkFycm93RG93blwiOlxuICAgICAgICBkZWNyZWFzZSgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJBcnJvd0xlZnRcIjpcbiAgICAgICAgZGVjcmVhc2UoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiRW50ZXJcIjpcbiAgICAgICAgYmxvY2tJRCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJTcGFjZVwiOlxuICAgICAgICBibG9ja0lEKCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfSk7XG59XG4iLCJpbXBvcnQgaW5pdENoYXJhY3RlcnMgZnJvbSBcIi4vY2hhcmFjdGVyc0ZpbG0vY29udHJvbGxlclwiO1xyXG5pbXBvcnQgaW5pdEdlbmVyYXRvciBmcm9tIFwiLi9odzEzL3ZpZXdcIjtcclxuXHJcbmluaXRHZW5lcmF0b3IoKTtcclxuaW5pdENoYXJhY3RlcnMoKTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==