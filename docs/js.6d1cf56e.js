parcelRequire = (function(e) {
  const r = typeof parcelRequire === "function" && parcelRequire;


  var n = typeof require == "function" && require;


  var i = {};
  function u(e, u) {
    if (e in i) return i[e];
    const t = typeof parcelRequire === "function" && parcelRequire;
    if (!u && t) return t(e, !0);
    if (r) return r(e, !0);
    if (n && typeof e === "string") return n(e);
    const o = new Error(`Cannot find module '${e}'`);
    throw ((o.code = "MODULE_NOT_FOUND"), o);
  }
  return (
    (u.register = function(e, r) {
      i[e] = r;
    }),
    (i = e(u)),
    (u.modules = i),
    u
  );
})((require) => {
  var b = {
    searchParams: "URLSearchParams" in self,
    iterable: "Symbol" in self && "iterator" in Symbol,
    blob:
      "FileReader" in self &&
      "Blob" in self &&
      (function() {
        try {
          return new Blob(), !0;
        } catch (e) {
          return !1;
        }
      })(),
    formData: "FormData" in self,
    arrayBuffer: "ArrayBuffer" in self,
  };
  function O(e) {
    return e && DataView.prototype.isPrototypeOf(e);
  }
  if (b.arrayBuffer)
    var D = [
        "[object Int8Array]",
        "[object Uint8Array]",
        "[object Uint8ClampedArray]",
        "[object Int16Array]",
        "[object Uint16Array]",
        "[object Int32Array]",
        "[object Uint32Array]",
        "[object Float32Array]",
        "[object Float64Array]",
      ],
      H =
        ArrayBuffer.isView ||
        function(e) {
          return e && D.indexOf(Object.prototype.toString.call(e)) > -1;
        };
  function g(e) {
    if (
      ("string" != typeof e && (e = String(e)),
      /[^a-z0-9\-#$%&'*+.^_`|~]/i.test(e))
    )
      throw new TypeError("Invalid character in header field name");
    return e.toLowerCase();
  }
  function y(e) {
    return "string" != typeof e && (e = String(e)), e;
  }
  function i(e) {
    var r = {
      next: function() {
        var r = e.shift();
        return { done: void 0 === r, value: r };
      },
    };
    return (
      b.iterable &&
        (r[Symbol.iterator] = function() {
          return r;
        }),
      r
    );
  }
  function a(e) {
    (this.map = {}),
      e instanceof a
        ? e.forEach(function(e, r) {
            this.append(r, e);
          }, this)
        : Array.isArray(e)
        ? e.forEach(function(e) {
            this.append(e[0], e[1]);
          }, this)
        : e &&
          Object.getOwnPropertyNames(e).forEach(function(r) {
            this.append(r, e[r]);
          }, this);
  }
  function j(e) {
    if (e.bodyUsed) return Promise.reject(new TypeError("Already read"));
    e.bodyUsed = !0;
  }
  function l(e) {
    return new Promise(function(r, t) {
      (e.onload = function() {
        r(e.result);
      }),
        (e.onerror = function() {
          t(e.error);
        });
    });
  }
  function K(e) {
    var r = new FileReader(),
      t = l(r);
    return r.readAsArrayBuffer(e), t;
  }
  function M(e) {
    var r = new FileReader(),
      t = l(r);
    return r.readAsText(e), t;
  }
  function N(e) {
    for (
      var r = new Uint8Array(e), t = new Array(r.length), o = 0;
      o < r.length;
      o++
    )
      t[o] = String.fromCharCode(r[o]);
    return t.join("");
  }
  function o(e) {
    if (e.slice) return e.slice(0);
    var r = new Uint8Array(e.byteLength);
    return r.set(new Uint8Array(e)), r.buffer;
  }
  function p() {
    return (
      (this.bodyUsed = !1),
      (this._initBody = function(e) {
        (this._bodyInit = e),
          e
            ? "string" == typeof e
              ? (this._bodyText = e)
              : b.blob && Blob.prototype.isPrototypeOf(e)
              ? (this._bodyBlob = e)
              : b.formData && FormData.prototype.isPrototypeOf(e)
              ? (this._bodyFormData = e)
              : b.searchParams && URLSearchParams.prototype.isPrototypeOf(e)
              ? (this._bodyText = e.toString())
              : b.arrayBuffer && b.blob && O(e)
              ? ((this._bodyArrayBuffer = o(e.buffer)),
                (this._bodyInit = new Blob([this._bodyArrayBuffer])))
              : b.arrayBuffer &&
                (ArrayBuffer.prototype.isPrototypeOf(e) || H(e))
              ? (this._bodyArrayBuffer = o(e))
              : (this._bodyText = e = Object.prototype.toString.call(e))
            : (this._bodyText = ""),
          this.headers.get("content-type") ||
            ("string" == typeof e
              ? this.headers.set("content-type", "text/plain;charset=UTF-8")
              : this._bodyBlob && this._bodyBlob.type
              ? this.headers.set("content-type", this._bodyBlob.type)
              : b.searchParams &&
                URLSearchParams.prototype.isPrototypeOf(e) &&
                this.headers.set(
                  "content-type",
                  "application/x-www-form-urlencoded;charset=UTF-8",
                ));
      }),
      b.blob &&
        ((this.blob = function() {
          var e = j(this);
          if (e) return e;
          if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
          if (this._bodyArrayBuffer)
            return Promise.resolve(new Blob([this._bodyArrayBuffer]));
          if (this._bodyFormData)
            throw new Error("could not read FormData body as blob");
          return Promise.resolve(new Blob([this._bodyText]));
        }),
        (this.arrayBuffer = function() {
          return this._bodyArrayBuffer
            ? j(this) || Promise.resolve(this._bodyArrayBuffer)
            : this.blob().then(K);
        })),
      (this.text = function() {
        var e = j(this);
        if (e) return e;
        if (this._bodyBlob) return M(this._bodyBlob);
        if (this._bodyArrayBuffer)
          return Promise.resolve(N(this._bodyArrayBuffer));
        if (this._bodyFormData)
          throw new Error("could not read FormData body as text");
        return Promise.resolve(this._bodyText);
      }),
      b.formData &&
        (this.formData = function() {
          return this.text().then(I);
        }),
      (this.json = function() {
        return this.text().then(JSON.parse);
      }),
      this
    );
  }
  (a.prototype.append = function(e, r) {
    (e = g(e)), (r = y(r));
    var t = this.map[e];
    this.map[e] = t ? t + ", " + r : r;
  }),
    (a.prototype.delete = function(e) {
      delete this.map[g(e)];
    }),
    (a.prototype.get = function(e) {
      return (e = g(e)), this.has(e) ? this.map[e] : null;
    }),
    (a.prototype.has = function(e) {
      return this.map.hasOwnProperty(g(e));
    }),
    (a.prototype.set = function(e, r) {
      this.map[g(e)] = y(r);
    }),
    (a.prototype.forEach = function(e, r) {
      for (var t in this.map)
        this.map.hasOwnProperty(t) && e.call(r, this.map[t], t, this);
    }),
    (a.prototype.keys = function() {
      var e = [];
      return (
        this.forEach(function(r, t) {
          e.push(t);
        }),
        i(e)
      );
    }),
    (a.prototype.values = function() {
      var e = [];
      return (
        this.forEach(function(r) {
          e.push(r);
        }),
        i(e)
      );
    }),
    (a.prototype.entries = function() {
      var e = [];
      return (
        this.forEach(function(r, t) {
          e.push([t, r]);
        }),
        i(e)
      );
    }),
    b.iterable && (a.prototype[Symbol.iterator] = a.prototype.entries);
  var F = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
  function G(e) {
    var r = e.toUpperCase();
    return F.indexOf(r) > -1 ? r : e;
  }
  function d(e, r) {
    var t = (r = r || {}).body;
    if (e instanceof d) {
      if (e.bodyUsed) throw new TypeError("Already read");
      (this.url = e.url),
        (this.credentials = e.credentials),
        r.headers || (this.headers = new a(e.headers)),
        (this.method = e.method),
        (this.mode = e.mode),
        (this.signal = e.signal),
        t || null == e._bodyInit || ((t = e._bodyInit), (e.bodyUsed = !0));
    } else this.url = String(e);
    if (
      ((this.credentials = r.credentials || this.credentials || "same-origin"),
      (!r.headers && this.headers) || (this.headers = new a(r.headers)),
      (this.method = G(r.method || this.method || "GET")),
      (this.mode = r.mode || this.mode || null),
      (this.signal = r.signal || this.signal),
      (this.referrer = null),
      ("GET" === this.method || "HEAD" === this.method) && t)
    )
      throw new TypeError("Body not allowed for GET or HEAD requests");
    this._initBody(t);
  }
  function I(e) {
    var r = new FormData();
    return (
      e
        .trim()
        .split("&")
        .forEach(function(e) {
          if (e) {
            var t = e.split("="),
              o = t.shift().replace(/\+/g, " "),
              s = t.join("=").replace(/\+/g, " ");
            r.append(decodeURIComponent(o), decodeURIComponent(s));
          }
        }),
      r
    );
  }
  function J(e) {
    var r = new a();
    return (
      e
        .replace(/\r?\n[\t ]+/g, " ")
        .split(/\r?\n/)
        .forEach(function(e) {
          var t = e.split(":"),
            o = t.shift().trim();
          if (o) {
            var s = t.join(":").trim();
            r.append(o, s);
          }
        }),
      r
    );
  }
  function c(e, r) {
    r || (r = {}),
      (this.type = "default"),
      (this.status = void 0 === r.status ? 200 : r.status),
      (this.ok = this.status >= 200 && this.status < 300),
      (this.statusText = "statusText" in r ? r.statusText : "OK"),
      (this.headers = new a(r.headers)),
      (this.url = r.url || ""),
      this._initBody(e);
  }
  (d.prototype.clone = function() {
    return new d(this, { body: this._bodyInit });
  }),
    p.call(d.prototype),
    p.call(c.prototype),
    (c.prototype.clone = function() {
      return new c(this._bodyInit, {
        status: this.status,
        statusText: this.statusText,
        headers: new a(this.headers),
        url: this.url,
      });
    }),
    (c.error = function() {
      var e = new c(null, { status: 0, statusText: "" });
      return (e.type = "error"), e;
    });
  var L = [301, 302, 303, 307, 308];
  c.redirect = function(e, r) {
    if (-1 === L.indexOf(r)) throw new RangeError("Invalid status code");
    return new c(null, { status: r, headers: { location: e } });
  };
  var f = self.DOMException;
  try {
    new f();
  } catch (err) {
    (f = function(e, r) {
      (this.message = e), (this.name = r);
      var t = Error(e);
      this.stack = t.stack;
    }),
      (f.prototype = Object.create(Error.prototype)),
      (f.prototype.constructor = f);
  }
  function e(e, r) {
    return new Promise(function(t, o) {
      var s = new d(e, r);
      if (s.signal && s.signal.aborted)
        return o(new f("Aborted", "AbortError"));
      var a = new XMLHttpRequest();
      function n() {
        a.abort();
      }
      (a.onload = function() {
        var e = {
          status: a.status,
          statusText: a.statusText,
          headers: J(a.getAllResponseHeaders() || ""),
        };
        e.url =
          "responseURL" in a ? a.responseURL : e.headers.get("X-Request-URL");
        var r = "response" in a ? a.response : a.responseText;
        t(new c(r, e));
      }),
        (a.onerror = function() {
          o(new TypeError("Network request failed"));
        }),
        (a.ontimeout = function() {
          o(new TypeError("Network request failed"));
        }),
        (a.onabort = function() {
          o(new f("Aborted", "AbortError"));
        }),
        a.open(s.method, s.url, !0),
        "include" === s.credentials
          ? (a.withCredentials = !0)
          : "omit" === s.credentials && (a.withCredentials = !1),
        "responseType" in a && b.blob && (a.responseType = "blob"),
        s.headers.forEach(function(e, r) {
          a.setRequestHeader(r, e);
        }),
        s.signal &&
          (s.signal.addEventListener("abort", n),
          (a.onreadystatechange = function() {
            4 === a.readyState && s.signal.removeEventListener("abort", n);
          })),
        a.send(void 0 === s._bodyInit ? null : s._bodyInit);
    });
  }
  (e.polyfill = !0),
    self.fetch ||
      ((self.fetch = e),
      (self.Headers = a),
      (self.Request = d),
      (self.Response = c));
  function W(e, t) {
    if (!(e instanceof t))
      throw new TypeError("Cannot call a class as a function");
  }
  function n(e, t) {
    for (var a = 0; a < t.length; a++) {
      var r = t[a];
      (r.enumerable = r.enumerable || !1),
        (r.configurable = !0),
        "value" in r && (r.writable = !0),
        Object.defineProperty(e, r.key, r);
    }
  }
  function Q(e, t, a) {
    return t && n(e.prototype, t), a && n(e, a), e;
  }
  var T = (function() {
    function e() {
      W(this, e),
        (this.baseUrl = "https://api.twitch.tv/helix/"),
        (this.clientId = "kpjpcqhtewgqbd5sdoc0oux4zi6n2o"),
        (this.getStreams = this.getStreams.bind(this));
    }
    return (
      Q(e, [
        {
          key: "findGame",
          value: function(e) {
            return this.getRequest("games?name=".concat(encodeURIComponent(e)));
          },
        },
        {
          key: "getStreams",
          value: function(e) {
            if (e.data.length > 0)
              return (
                localStorage.setItem("gameId", e.data[0].id),
                localStorage.setItem("gameName", e.data[0].name),
                this.getRequest("streams?game_id=".concat(e.data[0].id))
              );
            throw new Error(
              "No streams found for that game. Please try a different one.",
            );
          },
        },
        {
          key: "getRequest",
          value: function(e) {
            return fetch("".concat(this.baseUrl).concat(e), {
              method: "GET",
              mode: "cors",
              headers: { "Client-ID": this.clientId },
            })
              .then(function(e) {
                return e.json();
              })
              .catch(function(e) {
                throw new Error(e);
              });
          },
        },
        {
          key: "prefetchPreviousPage",
          value: function(e) {
            var t = localStorage.getItem("gameId");
            return (
              !(!t || !e) &&
              this.getRequest(
                "streams?game_id=".concat(t, "&before=").concat(e),
              )
            );
          },
        },
        {
          key: "prefetchNextPage",
          value: function(e) {
            var t = localStorage.getItem("gameId");
            return (
              !(!t || !e) &&
              this.getRequest("streams?game_id=".concat(t, "&after=").concat(e))
            );
          },
        },
      ]),
      e
    );
  })();
  function C(e, t) {
    if (!(e instanceof t))
      throw new TypeError("Cannot call a class as a function");
  }
  function B(e, t) {
    for (var a = 0; a < t.length; a++) {
      var n = t[a];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        "value" in n && (n.writable = !0),
        Object.defineProperty(e, n.key, n);
    }
  }
  function E(e, t, a) {
    return t && B(e.prototype, t), a && B(e, a), e;
  }
  var h = document.querySelector("#alert"),
    q = document.querySelector("#alert-message"),
    r = document.querySelector("#loading-icon"),
    s = document.querySelector("#results-container"),
    t = document.querySelector("#search-button"),
    u = document.querySelector("#search-button span"),
    v = function(e) {
      return e.classList.add("hidden");
    },
    w = function(e) {
      return e.classList.remove("hidden");
    },
    x = function() {
      (u.innerText = ""),
        t.classList.replace("button-active", "button-inactive"),
        w(r);
    };
  var k = function() {
    v(r),
      (u.innerText = "Search"),
      t.classList.replace("button-inactive", "button-active");
  };
  var z = function() {
    (q.innerText = ""),
      h.classList.replace("fade-in", "fade-out"),
      h.classList.replace("shown", "hidden");
  };
  var A = function(e) {
    (q.innerText = e),
      h.classList.replace("fade-out", "fade-in"),
      h.classList.replace("hidden", "shown");
  };
  var R = function() {
    v(s);
  };
  var S = function() {
    w(s);
  };
  var m = "https://www.twitch.tv/",
    U = (function() {
      function e(t) {
        C(this, e),
          (this.data = []),
          (this.imageSizes = { width: 300, height: 167 }),
          (this.imagesLoaded = 0),
          (this.pageSize = 0),
          (this.pagination = ""),
          (this.offset = 0),
          (this.twitchClient = t);
      }
      return (
        E(e, [
          {
            key: "cleanUp",
            value: function() {
              for (
                var e = document.querySelector("#cards-container"),
                  t = document.querySelector("#stats-container");
                t.firstChild;

              )
                t.removeChild(t.firstChild);
              for (; e.firstChild; ) e.removeChild(e.firstChild);
            },
          },
          {
            key: "createGridElement",
            value: function(e) {
              var t = this,
                a = document.createElement("div"),
                n = document.createElement("div"),
                i = document.createElement("a"),
                r = document.createElement("img"),
                s = document.createElement("div"),
                c = document.createElement("a"),
                o = document.createElement("h2"),
                d = document.createElement("span"),
                l = document.createElement("span"),
                p = document.createElement("i"),
                h = document.createElement("i");
              a.classList.add("hidden"),
                (c.href = "".concat(m).concat(e.user_name)),
                (i.href = "".concat(m).concat(e.user_name));
              var f = e.thumbnail_url.split("{width}x{height}");
              return (
                (r.src = ""
                  .concat(f[0])
                  .concat(this.imageSizes.width, "x")
                  .concat(this.imageSizes.height)
                  .concat(f[1])),
                r.addEventListener("load", function() {
                  a.classList.replace("hidden", "fade-in"),
                    (t.imagesLoaded += 1),
                    1 === t.imagesLoaded && S(),
                    t.imagesLoaded === t.pageSize && k();
                }),
                (o.innerText = e.title),
                p.classList.add("fa"),
                p.classList.add("fa-gamepad"),
                h.classList.add("fa"),
                h.classList.add("fa-users"),
                d.append(p),
                d.append(" ".concat(localStorage.getItem("gameName"), " ")),
                l.append(h),
                l.append(" ".concat(e.viewer_count, " viewers.")),
                i.append(r),
                n.append(i),
                c.append(o),
                s.append(c),
                s.append(d),
                s.append(l),
                a.append(n),
                a.append(s),
                a.classList.add("card"),
                n.classList.add("card-image"),
                s.classList.add("card-data"),
                a
              );
            },
          },
          {
            key: "createPagination",
            value: function() {
              var e = this,
                t = document.querySelector("#stats-container"),
                a = document.createElement("div"),
                n = document.createElement("div"),
                i = document.createElement("p"),
                r = this.offset + this.data.length;
              if (
                ((i.innerText = "Showing results from "
                  .concat(this.offset, " to ")
                  .concat(r)),
                a.append(i),
                this.offset > 0)
              ) {
                var s = document.createElement("a"),
                  c = document.createElement("i"),
                  o = document.createElement("p");
                c.classList.add("fas"),
                  c.classList.add("fa-chevron-left"),
                  (o.innerText = "Previous"),
                  s.classList.add("pagination-link"),
                  s.append(c),
                  s.append(o),
                  (s.href = "#"),
                  s.addEventListener("click", function() {
                    e.offset = e.offset - e.data.length;
                    var t = JSON.parse(localStorage.getItem("prevPage"));
                    e.fill(t);
                  }),
                  n.append(s);
              }
              if (this.offset > 0 && this.pagination.cursor) {
                var d = document.createElement("span");
                (d.innerText = "\u2022\u2022"),
                  d.classList.add("pagination-separator"),
                  n.append(d);
              }
              if (
                20 === this.pageSize ||
                (this.pageSize < 20 && this.offset > 20)
              ) {
                var l = document.createElement("a"),
                  p = document.createElement("i"),
                  h = document.createElement("p");
                p.classList.add("fas"),
                  p.classList.add("fa-chevron-right"),
                  (h.innerText = "Next"),
                  l.classList.add("pagination-link"),
                  l.append(h),
                  l.append(p),
                  (l.href = "#"),
                  l.addEventListener("click", function() {
                    e.offset = e.offset + e.data.length;
                    var t = JSON.stringify({
                      data: e.data,
                      pagination: e.pagination,
                    });
                    localStorage.setItem("prevPage", t);
                    var a = JSON.parse(localStorage.getItem("nextPage"));
                    e.fill(a);
                  }),
                  n.append(l);
              }
              a.setAttribute("id", "stats-count"),
                n.setAttribute("id", "stats-pagination"),
                t.append(a),
                t.append(n),
                t.classList.remove("hidden"),
                t.classList.add("shown");
            },
          },
          {
            key: "fill",
            value: function(e) {
              var t = this;
              arguments.length > 1 &&
                void 0 !== arguments[1] &&
                arguments[1] &&
                (this.offset = 0),
                (this.imagesLoaded = 0),
                (this.data = e.data),
                (this.pagination = e.pagination),
                (this.pageSize = this.data.length),
                R(),
                x(),
                this.cleanUp(),
                this.createPagination();
              var a = document.querySelector("#cards-container");
              this.data.forEach(function(e) {
                var n = t.createGridElement(e);
                a.append(n);
              }),
                this.prefetchPreviousPage(),
                this.prefetchNextPage();
            },
          },
          {
            key: "prefetchNextPage",
            value: function() {
              return (
                !!this.pagination.cursor &&
                this.twitchClient
                  .prefetchNextPage(this.pagination.cursor)
                  .then(function(e) {
                    return localStorage.setItem("nextPage", JSON.stringify(e));
                  })
              );
            },
          },
          {
            key: "prefetchPreviousPage",
            value: function() {
              return (
                0 !== this.offset &&
                this.twitchClient
                  .prefetchPreviousPage(this.pagination.cursor)
                  .then(function(e) {
                    return localStorage.setItem("prevPage", JSON.stringify(e));
                  })
              );
            },
          },
        ]),
        e
      );
    })();
  var V = function(e) {
    var t = document.querySelector("#close-alert"),
      r = document.querySelector("#search-button"),
      u = document.querySelector("#search-input"),
      o = new U(e);
    t.addEventListener("click", function() {
      z();
    }),
      r.addEventListener("click", function(t) {
        t.preventDefault(),
          "" !== u.value &&
            (r.setAttribute("disabled", !0),
            x(),
            z(),
            e
              .findGame(u.value)
              .then(e.getStreams)
              .then(function(e) {
                k(),
                  r.removeAttribute("disabled"),
                  e.data.length > 0
                    ? o.fill(e, !0)
                    : A(
                        "No streams found for that game. Please try a different one.",
                      );
              })
              .catch(function(e) {
                A(e), k(), r.removeAttribute("disabled");
              }));
      });
  };
  var P = new T();
  V(P), null.accept();
  return { QvaY: {} };
}));
