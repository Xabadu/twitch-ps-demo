// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function(modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === "function" && parcelRequire;
  var nodeRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof parcelRequire === "function" && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === "string") {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = "MODULE_NOT_FOUND";
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this,
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === "function" && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})(
  {
    "../node_modules/whatwg-fetch/fetch.js": [
      function(require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true,
        });
        exports.Headers = Headers;
        exports.Request = Request;
        exports.Response = Response;
        exports.fetch = fetch;
        exports.DOMException = void 0;
        var support = {
          searchParams: "URLSearchParams" in self,
          iterable: "Symbol" in self && "iterator" in Symbol,
          blob:
            "FileReader" in self &&
            "Blob" in self &&
            (function() {
              try {
                new Blob();
                return true;
              } catch (e) {
                return false;
              }
            })(),
          formData: "FormData" in self,
          arrayBuffer: "ArrayBuffer" in self,
        };

        function isDataView(obj) {
          return obj && DataView.prototype.isPrototypeOf(obj);
        }

        if (support.arrayBuffer) {
          var viewClasses = [
            "[object Int8Array]",
            "[object Uint8Array]",
            "[object Uint8ClampedArray]",
            "[object Int16Array]",
            "[object Uint16Array]",
            "[object Int32Array]",
            "[object Uint32Array]",
            "[object Float32Array]",
            "[object Float64Array]",
          ];

          var isArrayBufferView =
            ArrayBuffer.isView ||
            function(obj) {
              return (
                obj &&
                viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
              );
            };
        }

        function normalizeName(name) {
          if (typeof name !== "string") {
            name = String(name);
          }

          if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
            throw new TypeError("Invalid character in header field name");
          }

          return name.toLowerCase();
        }

        function normalizeValue(value) {
          if (typeof value !== "string") {
            value = String(value);
          }

          return value;
        } // Build a destructive iterator for the value list

        function iteratorFor(items) {
          var iterator = {
            next: function() {
              var value = items.shift();
              return {
                done: value === undefined,
                value: value,
              };
            },
          };

          if (support.iterable) {
            iterator[Symbol.iterator] = function() {
              return iterator;
            };
          }

          return iterator;
        }

        function Headers(headers) {
          this.map = {};

          if (headers instanceof Headers) {
            headers.forEach(function(value, name) {
              this.append(name, value);
            }, this);
          } else if (Array.isArray(headers)) {
            headers.forEach(function(header) {
              this.append(header[0], header[1]);
            }, this);
          } else if (headers) {
            Object.getOwnPropertyNames(headers).forEach(function(name) {
              this.append(name, headers[name]);
            }, this);
          }
        }

        Headers.prototype.append = function(name, value) {
          name = normalizeName(name);
          value = normalizeValue(value);
          var oldValue = this.map[name];
          this.map[name] = oldValue ? oldValue + ", " + value : value;
        };

        Headers.prototype["delete"] = function(name) {
          delete this.map[normalizeName(name)];
        };

        Headers.prototype.get = function(name) {
          name = normalizeName(name);
          return this.has(name) ? this.map[name] : null;
        };

        Headers.prototype.has = function(name) {
          return this.map.hasOwnProperty(normalizeName(name));
        };

        Headers.prototype.set = function(name, value) {
          this.map[normalizeName(name)] = normalizeValue(value);
        };

        Headers.prototype.forEach = function(callback, thisArg) {
          for (var name in this.map) {
            if (this.map.hasOwnProperty(name)) {
              callback.call(thisArg, this.map[name], name, this);
            }
          }
        };

        Headers.prototype.keys = function() {
          var items = [];
          this.forEach(function(value, name) {
            items.push(name);
          });
          return iteratorFor(items);
        };

        Headers.prototype.values = function() {
          var items = [];
          this.forEach(function(value) {
            items.push(value);
          });
          return iteratorFor(items);
        };

        Headers.prototype.entries = function() {
          var items = [];
          this.forEach(function(value, name) {
            items.push([name, value]);
          });
          return iteratorFor(items);
        };

        if (support.iterable) {
          Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
        }

        function consumed(body) {
          if (body.bodyUsed) {
            return Promise.reject(new TypeError("Already read"));
          }

          body.bodyUsed = true;
        }

        function fileReaderReady(reader) {
          return new Promise(function(resolve, reject) {
            reader.onload = function() {
              resolve(reader.result);
            };

            reader.onerror = function() {
              reject(reader.error);
            };
          });
        }

        function readBlobAsArrayBuffer(blob) {
          var reader = new FileReader();
          var promise = fileReaderReady(reader);
          reader.readAsArrayBuffer(blob);
          return promise;
        }

        function readBlobAsText(blob) {
          var reader = new FileReader();
          var promise = fileReaderReady(reader);
          reader.readAsText(blob);
          return promise;
        }

        function readArrayBufferAsText(buf) {
          var view = new Uint8Array(buf);
          var chars = new Array(view.length);

          for (var i = 0; i < view.length; i++) {
            chars[i] = String.fromCharCode(view[i]);
          }

          return chars.join("");
        }

        function bufferClone(buf) {
          if (buf.slice) {
            return buf.slice(0);
          } else {
            var view = new Uint8Array(buf.byteLength);
            view.set(new Uint8Array(buf));
            return view.buffer;
          }
        }

        function Body() {
          this.bodyUsed = false;

          this._initBody = function(body) {
            this._bodyInit = body;

            if (!body) {
              this._bodyText = "";
            } else if (typeof body === "string") {
              this._bodyText = body;
            } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
              this._bodyBlob = body;
            } else if (
              support.formData &&
              FormData.prototype.isPrototypeOf(body)
            ) {
              this._bodyFormData = body;
            } else if (
              support.searchParams &&
              URLSearchParams.prototype.isPrototypeOf(body)
            ) {
              this._bodyText = body.toString();
            } else if (
              support.arrayBuffer &&
              support.blob &&
              isDataView(body)
            ) {
              this._bodyArrayBuffer = bufferClone(body.buffer); // IE 10-11 can't handle a DataView body.

              this._bodyInit = new Blob([this._bodyArrayBuffer]);
            } else if (
              support.arrayBuffer &&
              (ArrayBuffer.prototype.isPrototypeOf(body) ||
                isArrayBufferView(body))
            ) {
              this._bodyArrayBuffer = bufferClone(body);
            } else {
              this._bodyText = body = Object.prototype.toString.call(body);
            }

            if (!this.headers.get("content-type")) {
              if (typeof body === "string") {
                this.headers.set("content-type", "text/plain;charset=UTF-8");
              } else if (this._bodyBlob && this._bodyBlob.type) {
                this.headers.set("content-type", this._bodyBlob.type);
              } else if (
                support.searchParams &&
                URLSearchParams.prototype.isPrototypeOf(body)
              ) {
                this.headers.set(
                  "content-type",
                  "application/x-www-form-urlencoded;charset=UTF-8",
                );
              }
            }
          };

          if (support.blob) {
            this.blob = function() {
              var rejected = consumed(this);

              if (rejected) {
                return rejected;
              }

              if (this._bodyBlob) {
                return Promise.resolve(this._bodyBlob);
              } else if (this._bodyArrayBuffer) {
                return Promise.resolve(new Blob([this._bodyArrayBuffer]));
              } else if (this._bodyFormData) {
                throw new Error("could not read FormData body as blob");
              } else {
                return Promise.resolve(new Blob([this._bodyText]));
              }
            };

            this.arrayBuffer = function() {
              if (this._bodyArrayBuffer) {
                return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
              } else {
                return this.blob().then(readBlobAsArrayBuffer);
              }
            };
          }

          this.text = function() {
            var rejected = consumed(this);

            if (rejected) {
              return rejected;
            }

            if (this._bodyBlob) {
              return readBlobAsText(this._bodyBlob);
            } else if (this._bodyArrayBuffer) {
              return Promise.resolve(
                readArrayBufferAsText(this._bodyArrayBuffer),
              );
            } else if (this._bodyFormData) {
              throw new Error("could not read FormData body as text");
            } else {
              return Promise.resolve(this._bodyText);
            }
          };

          if (support.formData) {
            this.formData = function() {
              return this.text().then(decode);
            };
          }

          this.json = function() {
            return this.text().then(JSON.parse);
          };

          return this;
        } // HTTP methods whose capitalization should be normalized

        var methods = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];

        function normalizeMethod(method) {
          var upcased = method.toUpperCase();
          return methods.indexOf(upcased) > -1 ? upcased : method;
        }

        function Request(input, options) {
          options = options || {};
          var body = options.body;

          if (input instanceof Request) {
            if (input.bodyUsed) {
              throw new TypeError("Already read");
            }

            this.url = input.url;
            this.credentials = input.credentials;

            if (!options.headers) {
              this.headers = new Headers(input.headers);
            }

            this.method = input.method;
            this.mode = input.mode;
            this.signal = input.signal;

            if (!body && input._bodyInit != null) {
              body = input._bodyInit;
              input.bodyUsed = true;
            }
          } else {
            this.url = String(input);
          }

          this.credentials =
            options.credentials || this.credentials || "same-origin";

          if (options.headers || !this.headers) {
            this.headers = new Headers(options.headers);
          }

          this.method = normalizeMethod(options.method || this.method || "GET");
          this.mode = options.mode || this.mode || null;
          this.signal = options.signal || this.signal;
          this.referrer = null;

          if ((this.method === "GET" || this.method === "HEAD") && body) {
            throw new TypeError("Body not allowed for GET or HEAD requests");
          }

          this._initBody(body);
        }

        Request.prototype.clone = function() {
          return new Request(this, {
            body: this._bodyInit,
          });
        };

        function decode(body) {
          var form = new FormData();
          body
            .trim()
            .split("&")
            .forEach(function(bytes) {
              if (bytes) {
                var split = bytes.split("=");
                var name = split.shift().replace(/\+/g, " ");
                var value = split.join("=").replace(/\+/g, " ");
                form.append(
                  decodeURIComponent(name),
                  decodeURIComponent(value),
                );
              }
            });
          return form;
        }

        function parseHeaders(rawHeaders) {
          var headers = new Headers(); // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
          // https://tools.ietf.org/html/rfc7230#section-3.2

          var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, " ");
          preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
            var parts = line.split(":");
            var key = parts.shift().trim();

            if (key) {
              var value = parts.join(":").trim();
              headers.append(key, value);
            }
          });
          return headers;
        }

        Body.call(Request.prototype);

        function Response(bodyInit, options) {
          if (!options) {
            options = {};
          }

          this.type = "default";
          this.status = options.status === undefined ? 200 : options.status;
          this.ok = this.status >= 200 && this.status < 300;
          this.statusText = "statusText" in options ? options.statusText : "OK";
          this.headers = new Headers(options.headers);
          this.url = options.url || "";

          this._initBody(bodyInit);
        }

        Body.call(Response.prototype);

        Response.prototype.clone = function() {
          return new Response(this._bodyInit, {
            status: this.status,
            statusText: this.statusText,
            headers: new Headers(this.headers),
            url: this.url,
          });
        };

        Response.error = function() {
          var response = new Response(null, {
            status: 0,
            statusText: "",
          });
          response.type = "error";
          return response;
        };

        var redirectStatuses = [301, 302, 303, 307, 308];

        Response.redirect = function(url, status) {
          if (redirectStatuses.indexOf(status) === -1) {
            throw new RangeError("Invalid status code");
          }

          return new Response(null, {
            status: status,
            headers: {
              location: url,
            },
          });
        };

        var DOMException = self.DOMException;
        exports.DOMException = DOMException;

        try {
          new DOMException();
        } catch (err) {
          exports.DOMException = DOMException = function(message, name) {
            this.message = message;
            this.name = name;
            var error = Error(message);
            this.stack = error.stack;
          };

          DOMException.prototype = Object.create(Error.prototype);
          DOMException.prototype.constructor = DOMException;
        }

        function fetch(input, init) {
          return new Promise(function(resolve, reject) {
            var request = new Request(input, init);

            if (request.signal && request.signal.aborted) {
              return reject(new DOMException("Aborted", "AbortError"));
            }

            var xhr = new XMLHttpRequest();

            function abortXhr() {
              xhr.abort();
            }

            xhr.onload = function() {
              var options = {
                status: xhr.status,
                statusText: xhr.statusText,
                headers: parseHeaders(xhr.getAllResponseHeaders() || ""),
              };
              options.url =
                "responseURL" in xhr
                  ? xhr.responseURL
                  : options.headers.get("X-Request-URL");
              var body = "response" in xhr ? xhr.response : xhr.responseText;
              resolve(new Response(body, options));
            };

            xhr.onerror = function() {
              reject(new TypeError("Network request failed"));
            };

            xhr.ontimeout = function() {
              reject(new TypeError("Network request failed"));
            };

            xhr.onabort = function() {
              reject(new DOMException("Aborted", "AbortError"));
            };

            xhr.open(request.method, request.url, true);

            if (request.credentials === "include") {
              xhr.withCredentials = true;
            } else if (request.credentials === "omit") {
              xhr.withCredentials = false;
            }

            if ("responseType" in xhr && support.blob) {
              xhr.responseType = "blob";
            }

            request.headers.forEach(function(value, name) {
              xhr.setRequestHeader(name, value);
            });

            if (request.signal) {
              request.signal.addEventListener("abort", abortXhr);

              xhr.onreadystatechange = function() {
                // DONE (success or failure)
                if (xhr.readyState === 4) {
                  request.signal.removeEventListener("abort", abortXhr);
                }
              };
            }

            xhr.send(
              typeof request._bodyInit === "undefined"
                ? null
                : request._bodyInit,
            );
          });
        }

        fetch.polyfill = true;

        if (!self.fetch) {
          self.fetch = fetch;
          self.Headers = Headers;
          self.Request = Request;
          self.Response = Response;
        }
      },
      {},
    ],
    "js/api/index.js": [
      function(require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true,
        });
        exports.default = void 0;

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }

        var TwitchAPI =
          /*#__PURE__*/
          (function() {
            function TwitchAPI() {
              _classCallCheck(this, TwitchAPI);

              this.baseUrl = "https://api.twitch.tv/helix/";
              this.clientId = "kpjpcqhtewgqbd5sdoc0oux4zi6n2o";
              this.getStreams = this.getStreams.bind(this);
            }

            _createClass(TwitchAPI, [
              {
                key: "findGame",
                value: function findGame(name) {
                  return this.getRequest(
                    "games?name=".concat(encodeURIComponent(name)),
                  );
                },
              },
              {
                key: "getStreams",
                value: function getStreams(game) {
                  if (game.data.length > 0) {
                    localStorage.setItem("gameId", game.data[0].id);
                    localStorage.setItem("gameName", game.data[0].name);
                    return this.getRequest(
                      "streams?game_id=".concat(game.data[0].id),
                    );
                  }

                  throw new Error(
                    "No streams found for that game. Please try a different one.",
                  );
                },
              },
              {
                key: "getRequest",
                value: function getRequest(endpoint) {
                  return fetch("".concat(this.baseUrl).concat(endpoint), {
                    method: "GET",
                    mode: "cors",
                    headers: {
                      "Client-ID": this.clientId,
                    },
                  })
                    .then(function(res) {
                      return res.json();
                    })
                    .catch(function(err) {
                      throw new Error(err);
                    });
                },
              },
              {
                key: "prefetchPreviousPage",
                value: function prefetchPreviousPage(cursor) {
                  var gameId = localStorage.getItem("gameId");

                  if (!gameId || !cursor) {
                    return false;
                  }

                  return this.getRequest(
                    "streams?game_id="
                      .concat(gameId, "&before=")
                      .concat(cursor),
                  );
                },
              },
              {
                key: "prefetchNextPage",
                value: function prefetchNextPage(cursor) {
                  var gameId = localStorage.getItem("gameId");

                  if (!gameId || !cursor) {
                    return false;
                  }

                  return this.getRequest(
                    "streams?game_id=".concat(gameId, "&after=").concat(cursor),
                  );
                },
              },
            ]);

            return TwitchAPI;
          })();

        exports.default = TwitchAPI;
      },
      {},
    ],
    "js/dom/elements.js": [
      function(require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true,
        });
        exports.showResults = exports.hideResults = exports.showError = exports.hideError = exports.enableButton = exports.disableButton = void 0;
        var alertContainer = document.querySelector("#alert");
        var alertMessage = document.querySelector("#alert-message");
        var loadingIcon = document.querySelector("#loading-icon");
        var resultsContainer = document.querySelector("#results-container");
        var searchButton = document.querySelector("#search-button");
        var searchButtonText = document.querySelector("#search-button span");

        var hideElement = function hideElement(element) {
          return element.classList.add("hidden");
        };

        var showElement = function showElement(element) {
          return element.classList.remove("hidden");
        };

        var disableButton = function disableButton() {
          searchButtonText.innerText = "";
          searchButton.classList.replace("button-active", "button-inactive");
          showElement(loadingIcon);
        };

        exports.disableButton = disableButton;

        var enableButton = function enableButton() {
          hideElement(loadingIcon);
          searchButtonText.innerText = "Search";
          searchButton.classList.replace("button-inactive", "button-active");
        };

        exports.enableButton = enableButton;

        var hideError = function hideError() {
          alertMessage.innerText = "";
          alertContainer.classList.replace("fade-in", "fade-out");
          alertContainer.classList.replace("shown", "hidden");
        };

        exports.hideError = hideError;

        var showError = function showError(message) {
          alertMessage.innerText = message;
          alertContainer.classList.replace("fade-out", "fade-in");
          alertContainer.classList.replace("hidden", "shown");
        };

        exports.showError = showError;

        var hideResults = function hideResults() {
          hideElement(resultsContainer);
        };

        exports.hideResults = hideResults;

        var showResults = function showResults() {
          showElement(resultsContainer);
        };

        exports.showResults = showResults;
      },
      {},
    ],
    "js/dom/grid.js": [
      function(require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true,
        });
        exports.default = void 0;

        var _elements = require("./elements");

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }

        var STREAM_BASE_URL = "https://www.twitch.tv/";

        var Grid =
          /*#__PURE__*/
          (function() {
            function Grid(twitchClient) {
              _classCallCheck(this, Grid);

              this.data = [];
              this.imageSizes = {
                width: 300,
                height: 167,
              };
              this.imagesLoaded = 0;
              this.pageSize = 0;
              this.pagination = "";
              this.offset = 0;
              this.twitchClient = twitchClient;
            }

            _createClass(Grid, [
              {
                key: "cleanUp",
                value: function cleanUp() {
                  var container = document.querySelector("#cards-container");
                  var statsContainer = document.querySelector(
                    "#stats-container",
                  );

                  while (statsContainer.firstChild) {
                    statsContainer.removeChild(statsContainer.firstChild);
                  }

                  while (container.firstChild) {
                    container.removeChild(container.firstChild);
                  }
                },
              },
              {
                key: "createGridElement",
                value: function createGridElement(row) {
                  var _this = this;

                  var mainContainer = document.createElement("div");
                  var imageContainer = document.createElement("div");
                  var imageLink = document.createElement("a");
                  var image = document.createElement("img");
                  var dataContainer = document.createElement("div");
                  var dataTitleLink = document.createElement("a");
                  var dataTitle = document.createElement("h2");
                  var gameMetadata = document.createElement("span");
                  var viewersMetadata = document.createElement("span");
                  var iconGame = document.createElement("i");
                  var iconViewers = document.createElement("i");
                  mainContainer.classList.add("hidden");
                  dataTitleLink.href = ""
                    .concat(STREAM_BASE_URL)
                    .concat(row.user_name);
                  imageLink.href = ""
                    .concat(STREAM_BASE_URL)
                    .concat(row.user_name);
                  var thumbnailURL = row.thumbnail_url.split(
                    "{width}x{height}",
                  );
                  image.src = ""
                    .concat(thumbnailURL[0])
                    .concat(this.imageSizes.width, "x")
                    .concat(this.imageSizes.height)
                    .concat(thumbnailURL[1]);
                  image.addEventListener("load", function() {
                    mainContainer.classList.replace("hidden", "fade-in");
                    _this.imagesLoaded += 1;

                    if (_this.imagesLoaded === 1) {
                      (0, _elements.showResults)();
                    }

                    if (_this.imagesLoaded === _this.pageSize) {
                      (0, _elements.enableButton)();
                    }
                  });
                  dataTitle.innerText = row.title;
                  iconGame.classList.add("fa");
                  iconGame.classList.add("fa-gamepad");
                  iconViewers.classList.add("fa");
                  iconViewers.classList.add("fa-users");
                  gameMetadata.append(iconGame);
                  gameMetadata.append(
                    " ".concat(localStorage.getItem("gameName"), " "),
                  );
                  viewersMetadata.append(iconViewers);
                  viewersMetadata.append(
                    " ".concat(row.viewer_count, " viewers."),
                  );
                  imageLink.append(image);
                  imageContainer.append(imageLink);
                  dataTitleLink.append(dataTitle);
                  dataContainer.append(dataTitleLink);
                  dataContainer.append(gameMetadata);
                  dataContainer.append(viewersMetadata);
                  mainContainer.append(imageContainer);
                  mainContainer.append(dataContainer);
                  mainContainer.classList.add("card");
                  imageContainer.classList.add("card-image");
                  dataContainer.classList.add("card-data");
                  return mainContainer;
                },
              },
              {
                key: "createPagination",
                value: function createPagination() {
                  var _this2 = this;

                  var statsContainer = document.querySelector(
                    "#stats-container",
                  );
                  var statsCount = document.createElement("div");
                  var statsPagination = document.createElement("div");
                  var statsCountText = document.createElement("p");
                  var total = this.offset + this.data.length;
                  statsCountText.innerText = "Showing results from "
                    .concat(this.offset, " to ")
                    .concat(total);
                  statsCount.append(statsCountText);

                  if (this.offset > 0) {
                    var previousResultsLink = document.createElement("a");
                    var previousResultsIcon = document.createElement("i");
                    var previousResultsText = document.createElement("p");
                    previousResultsIcon.classList.add("fas");
                    previousResultsIcon.classList.add("fa-chevron-left");
                    previousResultsText.innerText = "Previous";
                    previousResultsLink.classList.add("pagination-link");
                    previousResultsLink.append(previousResultsIcon);
                    previousResultsLink.append(previousResultsText);
                    previousResultsLink.href = "#";
                    previousResultsLink.addEventListener("click", function() {
                      _this2.offset = _this2.offset - _this2.data.length;
                      var prevPage = JSON.parse(
                        localStorage.getItem("prevPage"),
                      );

                      _this2.fill(prevPage);
                    });
                    statsPagination.append(previousResultsLink);
                  }

                  if (this.offset > 0 && this.pagination.cursor) {
                    var separator = document.createElement("span");
                    separator.innerText = "••";
                    separator.classList.add("pagination-separator");
                    statsPagination.append(separator);
                  }

                  if (
                    this.pageSize === 20 ||
                    (this.pageSize < 20 && this.offset > 20)
                  ) {
                    var nextResultsLink = document.createElement("a");
                    var nextResultsIcon = document.createElement("i");
                    var nextResultsText = document.createElement("p");
                    nextResultsIcon.classList.add("fas");
                    nextResultsIcon.classList.add("fa-chevron-right");
                    nextResultsText.innerText = "Next";
                    nextResultsLink.classList.add("pagination-link");
                    nextResultsLink.append(nextResultsText);
                    nextResultsLink.append(nextResultsIcon);
                    nextResultsLink.href = "#";
                    nextResultsLink.addEventListener("click", function() {
                      _this2.offset = _this2.offset + _this2.data.length;
                      var prevPageData = JSON.stringify({
                        data: _this2.data,
                        pagination: _this2.pagination,
                      });
                      localStorage.setItem("prevPage", prevPageData);
                      var nextPage = JSON.parse(
                        localStorage.getItem("nextPage"),
                      );

                      _this2.fill(nextPage);
                    });
                    statsPagination.append(nextResultsLink);
                  }

                  statsCount.setAttribute("id", "stats-count");
                  statsPagination.setAttribute("id", "stats-pagination");
                  statsContainer.append(statsCount);
                  statsContainer.append(statsPagination);
                  statsContainer.classList.remove("hidden");
                  statsContainer.classList.add("shown");
                },
              },
              {
                key: "fill",
                value: function fill(response) {
                  var _this3 = this;

                  var reset =
                    arguments.length > 1 && arguments[1] !== undefined
                      ? arguments[1]
                      : false;

                  if (reset) {
                    this.offset = 0;
                  }

                  this.imagesLoaded = 0;
                  this.data = response.data;
                  this.pagination = response.pagination;
                  this.pageSize = this.data.length;
                  (0, _elements.hideResults)();
                  (0, _elements.disableButton)();
                  this.cleanUp();
                  this.createPagination();
                  var cardsContainer = document.querySelector(
                    "#cards-container",
                  );
                  this.data.forEach(function(row) {
                    var card = _this3.createGridElement(row);

                    cardsContainer.append(card);
                  });
                  this.prefetchPreviousPage();
                  this.prefetchNextPage();
                },
              },
              {
                key: "prefetchNextPage",
                value: function prefetchNextPage() {
                  if (!this.pagination.cursor) {
                    return false;
                  }

                  return this.twitchClient
                    .prefetchNextPage(this.pagination.cursor)
                    .then(function(res) {
                      return localStorage.setItem(
                        "nextPage",
                        JSON.stringify(res),
                      );
                    });
                },
              },
              {
                key: "prefetchPreviousPage",
                value: function prefetchPreviousPage() {
                  if (this.offset === 0) {
                    return false;
                  }

                  return this.twitchClient
                    .prefetchPreviousPage(this.pagination.cursor)
                    .then(function(res) {
                      return localStorage.setItem(
                        "prevPage",
                        JSON.stringify(res),
                      );
                    });
                },
              },
            ]);

            return Grid;
          })();

        exports.default = Grid;
      },
      { "./elements": "js/dom/elements.js" },
    ],
    "js/dom/listeners.js": [
      function(require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true,
        });
        exports.default = void 0;

        var _grid = _interopRequireDefault(require("./grid"));

        var _elements = require("./elements");

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        var initListeners = function initListeners(twitchClient) {
          var closeAlert = document.querySelector("#close-alert");
          var searchButton = document.querySelector("#search-button");
          var searchInput = document.querySelector("#search-input");
          var grid = new _grid.default(twitchClient);
          closeAlert.addEventListener("click", function() {
            (0, _elements.hideError)();
          });
          searchButton.addEventListener("click", function(e) {
            e.preventDefault();

            if (searchInput.value !== "") {
              searchButton.setAttribute("disabled", true);
              (0, _elements.disableButton)();
              (0, _elements.hideError)();
              twitchClient
                .findGame(searchInput.value)
                .then(twitchClient.getStreams)
                .then(function(res) {
                  (0, _elements.enableButton)();
                  searchButton.removeAttribute("disabled");

                  if (res.data.length > 0) {
                    grid.fill(res, true);
                  } else {
                    (0, _elements.showError)(
                      "No streams found for that game. Please try a different one.",
                    );
                  }
                })
                .catch(function(err) {
                  (0, _elements.showError)(err);
                  (0, _elements.enableButton)();
                  searchButton.removeAttribute("disabled");
                });
            }
          });
        };

        var _default = initListeners;
        exports.default = _default;
      },
      { "./grid": "js/dom/grid.js", "./elements": "js/dom/elements.js" },
    ],
    "js/index.js": [
      function(require, module, exports) {
        "use strict";

        require("whatwg-fetch");

        var _api = _interopRequireDefault(require("./api"));

        var _listeners = _interopRequireDefault(require("./dom/listeners"));

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        var twitchClient = new _api.default();
        (0, _listeners.default)(twitchClient);
        module.hot.accept();
      },
      {
        "whatwg-fetch": "../node_modules/whatwg-fetch/fetch.js",
        "./api": "js/api/index.js",
        "./dom/listeners": "js/dom/listeners.js",
      },
    ],
    "../node_modules/parcel/src/builtins/hmr-runtime.js": [
      function(require, module, exports) {
        var global = arguments[3];
        var OVERLAY_ID = "__parcel__error__overlay__";
        var OldModule = module.bundle.Module;

        function Module(moduleName) {
          OldModule.call(this, moduleName);
          this.hot = {
            data: module.bundle.hotData,
            _acceptCallbacks: [],
            _disposeCallbacks: [],
            accept: function(fn) {
              this._acceptCallbacks.push(fn || function() {});
            },
            dispose: function(fn) {
              this._disposeCallbacks.push(fn);
            },
          };
          module.bundle.hotData = null;
        }

        module.bundle.Module = Module;
        var checkedAssets, assetsToAccept;
        var parent = module.bundle.parent;

        if (
          (!parent || !parent.isParcelRequire) &&
          typeof WebSocket !== "undefined"
        ) {
          var hostname = "" || location.hostname;
          var protocol = location.protocol === "https:" ? "wss" : "ws";
          var ws = new WebSocket(
            protocol + "://" + hostname + ":" + "50498" + "/",
          );

          ws.onmessage = function(event) {
            checkedAssets = {};
            assetsToAccept = [];
            var data = JSON.parse(event.data);

            if (data.type === "update") {
              var handled = false;
              data.assets.forEach(function(asset) {
                if (!asset.isNew) {
                  var didAccept = hmrAcceptCheck(
                    global.parcelRequire,
                    asset.id,
                  );

                  if (didAccept) {
                    handled = true;
                  }
                }
              }); // Enable HMR for CSS by default.

              handled =
                handled ||
                data.assets.every(function(asset) {
                  return asset.type === "css" && asset.generated.js;
                });

              if (handled) {
                console.clear();
                data.assets.forEach(function(asset) {
                  hmrApply(global.parcelRequire, asset);
                });
                assetsToAccept.forEach(function(v) {
                  hmrAcceptRun(v[0], v[1]);
                });
              } else {
                window.location.reload();
              }
            }

            if (data.type === "reload") {
              ws.close();

              ws.onclose = function() {
                location.reload();
              };
            }

            if (data.type === "error-resolved") {
              console.log("[parcel] ✨ Error resolved");
              removeErrorOverlay();
            }

            if (data.type === "error") {
              console.error(
                "[parcel] 🚨  " + data.error.message + "\n" + data.error.stack,
              );
              removeErrorOverlay();
              var overlay = createErrorOverlay(data);
              document.body.appendChild(overlay);
            }
          };
        }

        function removeErrorOverlay() {
          var overlay = document.getElementById(OVERLAY_ID);

          if (overlay) {
            overlay.remove();
          }
        }

        function createErrorOverlay(data) {
          var overlay = document.createElement("div");
          overlay.id = OVERLAY_ID; // html encode message and stack trace

          var message = document.createElement("div");
          var stackTrace = document.createElement("pre");
          message.innerText = data.error.message;
          stackTrace.innerText = data.error.stack;
          overlay.innerHTML =
            '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' +
            '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' +
            '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' +
            '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' +
            message.innerHTML +
            "</div>" +
            "<pre>" +
            stackTrace.innerHTML +
            "</pre>" +
            "</div>";
          return overlay;
        }

        function getParents(bundle, id) {
          var modules = bundle.modules;

          if (!modules) {
            return [];
          }

          var parents = [];
          var k, d, dep;

          for (k in modules) {
            for (d in modules[k][1]) {
              dep = modules[k][1][d];

              if (
                dep === id ||
                (Array.isArray(dep) && dep[dep.length - 1] === id)
              ) {
                parents.push(k);
              }
            }
          }

          if (bundle.parent) {
            parents = parents.concat(getParents(bundle.parent, id));
          }

          return parents;
        }

        function hmrApply(bundle, asset) {
          var modules = bundle.modules;

          if (!modules) {
            return;
          }

          if (modules[asset.id] || !bundle.parent) {
            var fn = new Function(
              "require",
              "module",
              "exports",
              asset.generated.js,
            );
            asset.isNew = !modules[asset.id];
            modules[asset.id] = [fn, asset.deps];
          } else if (bundle.parent) {
            hmrApply(bundle.parent, asset);
          }
        }

        function hmrAcceptCheck(bundle, id) {
          var modules = bundle.modules;

          if (!modules) {
            return;
          }

          if (!modules[id] && bundle.parent) {
            return hmrAcceptCheck(bundle.parent, id);
          }

          if (checkedAssets[id]) {
            return;
          }

          checkedAssets[id] = true;
          var cached = bundle.cache[id];
          assetsToAccept.push([bundle, id]);

          if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
            return true;
          }

          return getParents(global.parcelRequire, id).some(function(id) {
            return hmrAcceptCheck(global.parcelRequire, id);
          });
        }

        function hmrAcceptRun(bundle, id) {
          var cached = bundle.cache[id];
          bundle.hotData = {};

          if (cached) {
            cached.hot.data = bundle.hotData;
          }

          if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
            cached.hot._disposeCallbacks.forEach(function(cb) {
              cb(bundle.hotData);
            });
          }

          delete bundle.cache[id];
          bundle(id);
          cached = bundle.cache[id];

          if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
            cached.hot._acceptCallbacks.forEach(function(cb) {
              cb();
            });

            return true;
          }
        }
      },
      {},
    ],
  },
  {},
  ["../node_modules/parcel/src/builtins/hmr-runtime.js", "js/index.js"],
  null,
);
//# sourceMappingURL=/js.00a46daa.js.map
