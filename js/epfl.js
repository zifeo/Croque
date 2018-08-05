/* EPFL */

(function() {
  /*! epfl-bootstrap v0.27.4 (18-07-2018) */

  var requirejs,
    require,
    define;
  !function(global, setTimeout) {
    var req,
      s,
      head,
      baseElement,
      dataMain,
      src,
      interactiveScript,
      currentlyAddingScript,
      mainScript,
      subPath,
      version = "2.3.5",
      commentRegExp = /\/\*[\s\S]*?\*\/|([^:"'=]|^)\/\/.*$/gm,
      cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
      jsSuffixRegExp = /\.js$/,
      currDirRegExp = /^\.\//,
      op = Object.prototype,
      ostring = op.toString,
      hasOwn = op.hasOwnProperty,
      isBrowser = !("undefined" == typeof window || "undefined" == typeof navigator || !window.document),
      isWebWorker = !isBrowser && "undefined" != typeof importScripts,
      readyRegExp = isBrowser && "PLAYSTATION 3" === navigator.platform ? /^complete$/ : /^(complete|loaded)$/,
      defContextName = "_",
      isOpera = "undefined" != typeof opera && "[object Opera]" === opera.toString(),
      contexts = {},
      cfg = {},
      globalDefQueue = [],
      useInteractive = !1;
    function commentReplace(t, e) {
      return e || ""
    }
    function isFunction(t) {
      return "[object Function]" === ostring.call(t)
    }
    function isArray(t) {
      return "[object Array]" === ostring.call(t)
    }
    function each(t, e) {
      var n;
      if (t)
        for (n = 0; n < t.length && (!t[n] || !e(t[n], n, t)); n += 1)
          ;
    }
    function eachReverse(t, e) {
      var n;
      if (t)
        for (n = t.length - 1; -1 < n && (!t[n] || !e(t[n], n, t)); n -= 1)
          ;
    }
    function hasProp(t, e) {
      return hasOwn.call(t, e)
    }
    function getOwn(t, e) {
      return hasProp(t, e) && t[e]
    }
    function eachProp(t, e) {
      var n;
      for (n in t)
        if (hasProp(t, n) && e(t[n], n))
          break
    }
    function mixin(n, t, i, r) {
      return t && eachProp(t, function(t, e) {
        !i && hasProp(n, e) || (!r || "object" != typeof t || !t || isArray(t) || isFunction(t) || t instanceof RegExp ? n[e] = t : (n[e] || (n[e] = {}), mixin(n[e], t, i, r)))
      }), n
    }
    function bind(t, e) {
      return function() {
        return e.apply(t, arguments)
      }
    }
    function scripts() {
      return document.getElementsByTagName("script")
    }
    function defaultOnError(t) {
      throw t
    }
    function getGlobal(t) {
      if (!t)
        return t;
      var e = global;
      return each(t.split("."), function(t) {
        e = e[t]
      }), e
    }
    function makeError(t, e, n, i) {
      var r = new Error(e + "\nhttp://requirejs.org/docs/errors.html#" + t);
      return r.requireType = t, r.requireModules = i, n && (r.originalError = n), r
    }
    if (void 0 === define) {
      if (void 0 !== requirejs) {
        if (isFunction(requirejs))
          return;
        cfg = requirejs, requirejs = void 0
      }
      void 0 === require || isFunction(require) || (cfg = require, require = void 0), req = requirejs = function(t, e, n, i) {
        var r,
          o,
          s = defContextName;
        return isArray(t) || "string" == typeof t || (o = t, isArray(e) ? (t = e, e = n, n = i) : t = []), o && o.context && (s = o.context), (r = getOwn(contexts, s)) || (r = contexts[s] = req.s.newContext(s)), o && r.configure(o), r.require(t, e, n)
      }, req.config = function(t) {
        return req(t)
      }, req.nextTick = void 0 !== setTimeout ? function(t) {
        setTimeout(t, 4)
      } : function(t) {
        t()
      }, require || (require = req), req.version = version, req.jsExtRegExp = /^\/|:|\?|\.js$/, req.isBrowser = isBrowser, s = req.s = {
        contexts: contexts,
        newContext: newContext
      }, req({}), each(["toUrl", "undef", "defined", "specified"], function(e) {
        req[e] = function() {
          var t = contexts[defContextName];
          return t.require[e].apply(t, arguments)
        }
      }), isBrowser && (head = s.head = document.getElementsByTagName("head")[0], baseElement = document.getElementsByTagName("base")[0], baseElement && (head = s.head = baseElement.parentNode)), req.onError = defaultOnError, req.createNode = function(t, e, n) {
        var i = t.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script");
        return i.type = t.scriptType || "text/javascript", i.charset = "utf-8", i.async = !0, i
      }, req.load = function(t, e, n) {
        var i,
          r = t && t.config || {};
        if (isBrowser)
          return (i = req.createNode(r, e, n)).setAttribute("data-requirecontext", t.contextName), i.setAttribute("data-requiremodule", e), !i.attachEvent || i.attachEvent.toString && i.attachEvent.toString().indexOf("[native code") < 0 || isOpera ? (i.addEventListener("load", t.onScriptLoad, !1), i.addEventListener("error", t.onScriptError, !1)) : (useInteractive = !0, i.attachEvent("onreadystatechange", t.onScriptLoad)), i.src = n, r.onNodeCreated && r.onNodeCreated(i, r, e, n), currentlyAddingScript = i, baseElement ? head.insertBefore(i, baseElement) : head.appendChild(i), currentlyAddingScript = null, i;
        if (isWebWorker)
          try {
            setTimeout(function() {}, 0), importScripts(n), t.completeLoad(e)
          } catch (i) {
            t.onError(makeError("importscripts", "importScripts failed for " + e + " at " + n, i, [e]))
          }
      }, isBrowser && !cfg.skipDataMain && eachReverse(scripts(), function(t) {
        if (head || (head = t.parentNode), dataMain = t.getAttribute("data-main"))
          return mainScript = dataMain, cfg.baseUrl || -1 !== mainScript.indexOf("!") || (mainScript = (src = mainScript.split("/")).pop(), subPath = src.length ? src.join("/") + "/" : "./", cfg.baseUrl = subPath), mainScript = mainScript.replace(jsSuffixRegExp, ""), req.jsExtRegExp.test(mainScript) && (mainScript = dataMain), cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript], !0
      }), define = function(t, n, e) {
        var i,
          r;
        "string" != typeof t && (e = n, n = t, t = null), isArray(n) || (e = n, n = null), !n && isFunction(e) && (n = [], e.length && (e.toString().replace(commentRegExp, commentReplace).replace(cjsRequireRegExp, function(t, e) {
          n.push(e)
        }), n = (1 === e.length ? ["require"] : ["require", "exports", "module"]).concat(n))), useInteractive && (i = currentlyAddingScript || getInteractiveScript()) && (t || (t = i.getAttribute("data-requiremodule")), r = contexts[i.getAttribute("data-requirecontext")]), r ? (r.defQueue.push([t, n, e]), r.defQueueMap[t] = !0) : globalDefQueue.push([t, n, e])
      }, define.amd = {
        jQuery: !0
      }, req.exec = function(text) {
        return eval(text)
      }, req(cfg)
    }
    function newContext(l) {
      var n,
        t,
        d,
        u,
        c,
        m = {
          waitSeconds: 7,
          baseUrl: "./",
          paths: {},
          bundles: {},
          pkgs: {},
          shim: {},
          config: {}
        },
        p = {},
        h = {},
        i = {},
        f = [],
        g = {},
        r = {},
        v = {},
        y = 1,
        b = 1;
      function x(t, e, n) {
        var i,
          r,
          o,
          s,
          a,
          l,
          u,
          c,
          p,
          h,
          d = e && e.split("/"),
          f = m.map,
          g = f && f["*"];
        if (t && (l = (t = t.split("/")).length - 1, m.nodeIdCompat && jsSuffixRegExp.test(t[l]) && (t[l] = t[l].replace(jsSuffixRegExp, "")), "." === t[0].charAt(0) && d && (t = d.slice(0, d.length - 1).concat(t)), function(t) {
          var e,
            n;
          for (e = 0; e < t.length; e++)
            if ("." === (n = t[e]))
              t.splice(e, 1), e -= 1;
            else if (".." === n) {
              if (0 === e || 1 === e && ".." === t[2] || ".." === t[e - 1])
                continue;
              0 < e && (t.splice(e - 1, 2), e -= 2)
            }
        }(t), t = t.join("/")), n && f && (d || g)) {
          t:
            for (o = (r = t.split("/")).length; 0 < o; o -= 1) {
              if (a = r.slice(0, o).join("/"), d)
                for (s = d.length; 0 < s; s -= 1)
                  if ((i = getOwn(f, d.slice(0, s).join("/"))) && (i = getOwn(i, a))) {
                    u = i, c = o;
                    break t
                  }
              !p && g && getOwn(g, a) && (p = getOwn(g, a), h = o)
            }
          !u && p && (u = p, c = h), u && (r.splice(0, c, u), t = r.join("/"))
        }
        return getOwn(m.pkgs, t) || t
      }
      function w(e) {
        isBrowser && each(scripts(), function(t) {
          if (t.getAttribute("data-requiremodule") === e && t.getAttribute("data-requirecontext") === d.contextName)
            return t.parentNode.removeChild(t), !0
        })
      }
      function _(t) {
        var e = getOwn(m.paths, t);
        if (e && isArray(e) && 1 < e.length)
          return e.shift(), d.require.undef(t), d.makeRequire(null, {
            skipMap: !0
          })([t]), !0
      }
      function k(t) {
        var e,
          n = t ? t.indexOf("!") : -1;
        return -1 < n && (e = t.substring(0, n), t = t.substring(n + 1, t.length)), [e, t]
      }
      function T(t, e, n, i) {
        var r,
          o,
          s,
          a,
          l = null,
          u = e ? e.name : null,
          c = t,
          p = !0,
          h = "";
        return t || (p = !1, t = "_@r" + (y += 1)), l = (a = k(t))[0], t = a[1], l && (l = x(l, u, i), o = getOwn(g, l)), t && (l ? h = n ? t : o && o.normalize ? o.normalize(t, function(t) {
          return x(t, u, i)
        }) : -1 === t.indexOf("!") ? x(t, u, i) : t : (l = (a = k(h = x(t, u, i)))[0], h = a[1], n = !0, r = d.nameToUrl(h))), {
          prefix: l,
          name: h,
          parentMap: e,
          unnormalized: !!(s = !l || o || n ? "" : "_unnormalized" + (b += 1)),
          url: r,
          originalName: c,
          isDefine: p,
          id: (l ? l + "!" + h : h) + s
        }
      }
      function C(t) {
        var e = t.id,
          n = getOwn(p, e);
        return n || (n = p[e] = new d.Module(t)), n
      }
      function E(t, e, n) {
        var i = t.id,
          r = getOwn(p, i);
        !hasProp(g, i) || r && !r.defineEmitComplete ? (r = C(t)).error && "error" === e ? n(r.error) : r.on(e, n) : "defined" === e && n(g[i])
      }
      function S(n, t) {
        var e = n.requireModules,
          i = !1;
        t ? t(n) : (each(e, function(t) {
          var e = getOwn(p, t);
          e && (e.error = n, e.events.error && (i = !0, e.emit("error", n)))
        }), i || req.onError(n))
      }
      function A() {
        globalDefQueue.length && (each(globalDefQueue, function(t) {
          var e = t[0];
          "string" == typeof e && (d.defQueueMap[e] = !0), f.push(t)
        }), globalDefQueue = [])
      }
      function I(t) {
        delete p[t], delete h[t]
      }
      function N() {
        var t,
          i,
          e = 1e3 * m.waitSeconds,
          r = e && d.startTime + e < (new Date).getTime(),
          o = [],
          s = [],
          a = !1,
          l = !0;
        if (!n) {
          if (n = !0, eachProp(h, function(t) {
            var e = t.map,
              n = e.id;
            if (t.enabled && (e.isDefine || s.push(t), !t.error))
              if (!t.inited && r)
                _(n) ? a = i = !0 : (o.push(n), w(n));
              else if (!t.inited && t.fetched && e.isDefine && (a = !0, !e.prefix))
                return l = !1
          }), r && o.length)
            return (t = makeError("timeout", "Load timeout for modules: " + o, null, o)).contextName = d.contextName, S(t);
          l && each(s, function(t) {
            !function r(o, s, a) {
              var t = o.map.id;
              o.error ? o.emit("error", o.error) : (s[t] = !0, each(o.depMaps, function(t, e) {
                var n = t.id,
                  i = getOwn(p, n);
                !i || o.depMatched[e] || a[n] || (getOwn(s, n) ? (o.defineDep(e, g[n]), o.check()) : r(i, s, a))
              }), a[t] = !0)
            }(t, {}, {})
          }), r && !i || !a || !isBrowser && !isWebWorker || c || (c = setTimeout(function() {
            c = 0, N()
          }, 50)), n = !1
        }
      }
      function s(t) {
        hasProp(g, t[0]) || C(T(t[0], null, !0)).init(t[1], t[2])
      }
      function o(t, e, n, i) {
        t.detachEvent && !isOpera ? i && t.detachEvent(i, e) : t.removeEventListener(n, e, !1)
      }
      function a(t) {
        var e = t.currentTarget || t.srcElement;
        return o(e, d.onScriptLoad, "load", "onreadystatechange"), o(e, d.onScriptError, "error"), {
          node: e,
          id: e && e.getAttribute("data-requiremodule")
        }
      }
      function O() {
        var t;
        for (A(); f.length;) {
          if (null === (t = f.shift())[0])
            return S(makeError("mismatch", "Mismatched anonymous define() module: " + t[t.length - 1]));
          s(t)
        }
        d.defQueueMap = {}
      }
      return u = {
        require: function(t) {
          return t.require ? t.require : t.require = d.makeRequire(t.map)
        },
        exports: function(t) {
          if (t.usingExports = !0, t.map.isDefine)
            return t.exports ? g[t.map.id] = t.exports : t.exports = g[t.map.id] = {}
        },
        module: function(t) {
          return t.module ? t.module : t.module = {
            id: t.map.id,
            uri: t.map.url,
            config: function() {
              return getOwn(m.config, t.map.id) || {}
            },
            exports: t.exports || (t.exports = {})
          }
        }
      }, (t = function(t) {
        this.events = getOwn(i, t.id) || {}, this.map = t, this.shim = getOwn(m.shim, t.id), this.depExports = [], this.depMaps = [], this.depMatched = [], this.pluginMaps = {}, this.depCount = 0
      }).prototype = {
        init: function(t, e, n, i) {
          i = i || {}, this.inited || (this.factory = e, n ? this.on("error", n) : this.events.error && (n = bind(this, function(t) {
            this.emit("error", t)
          })), this.depMaps = t && t.slice(0), this.errback = n, this.inited = !0, this.ignore = i.ignore, i.enabled || this.enabled ? this.enable() : this.check())
        },
        defineDep: function(t, e) {
          this.depMatched[t] || (this.depMatched[t] = !0, this.depCount -= 1, this.depExports[t] = e)
        },
        fetch: function() {
          if (!this.fetched) {
            this.fetched = !0, d.startTime = (new Date).getTime();
            var t = this.map;
            if (!this.shim)
              return t.prefix ? this.callPlugin() : this.load();
            d.makeRequire(this.map, {
              enableBuildCallback: !0
            })(this.shim.deps || [], bind(this, function() {
              return t.prefix ? this.callPlugin() : this.load()
            }))
          }
        },
        load: function() {
          var t = this.map.url;
          r[t] || (r[t] = !0, d.load(this.map.id, t))
        },
        check: function() {
          if (this.enabled && !this.enabling) {
            var t,
              e,
              n = this.map.id,
              i = this.depExports,
              r = this.exports,
              o = this.factory;
            if (this.inited) {
              if (this.error)
                this.emit("error", this.error);
              else if (!this.defining) {
                if (this.defining = !0, this.depCount < 1 && !this.defined) {
                  if (isFunction(o)) {
                    if (this.events.error && this.map.isDefine || req.onError !== defaultOnError)
                      try {
                        r = d.execCb(n, o, i, r)
                      } catch (e) {
                        t = e
                      }
                    else
                      r = d.execCb(n, o, i, r);
                    if (this.map.isDefine && void 0 === r && ((e = this.module) ? r = e.exports : this.usingExports && (r = this.exports)), t)
                      return t.requireMap = this.map, t.requireModules = this.map.isDefine ? [this.map.id] : null, t.requireType = this.map.isDefine ? "define" : "require", S(this.error = t)
                  } else
                    r = o;
                  if (this.exports = r, this.map.isDefine && !this.ignore && (g[n] = r, req.onResourceLoad)) {
                    var s = [];
                    each(this.depMaps, function(t) {
                      s.push(t.normalizedMap || t)
                    }), req.onResourceLoad(d, this.map, s)
                  }
                  I(n), this.defined = !0
                }
                this.defining = !1, this.defined && !this.defineEmitted && (this.defineEmitted = !0, this.emit("defined", this.exports), this.defineEmitComplete = !0)
              }
            } else
              hasProp(d.defQueueMap, n) || this.fetch()
          }
        },
        callPlugin: function() {
          var l = this.map,
            u = l.id,
            t = T(l.prefix);
          this.depMaps.push(t), E(t, "defined", bind(this, function(t) {
            var o,
              e,
              n,
              i = getOwn(v, this.map.id),
              r = this.map.name,
              s = this.map.parentMap ? this.map.parentMap.name : null,
              a = d.makeRequire(l.parentMap, {
                enableBuildCallback: !0
              });
            return this.map.unnormalized ? (t.normalize && (r = t.normalize(r, function(t) {
              return x(t, s, !0)
            }) || ""), E(e = T(l.prefix + "!" + r, this.map.parentMap, !0), "defined", bind(this, function(t) {
              this.map.normalizedMap = e, this.init([], function() {
                return t
              }, null, {
                enabled: !0,
                ignore: !0
              })
            })), void ((n = getOwn(p, e.id)) && (this.depMaps.push(e), this.events.error && n.on("error", bind(this, function(t) {
              this.emit("error", t)
            })), n.enable()))) : i ? (this.map.url = d.nameToUrl(i), void this.load()) : ((o = bind(this, function(t) {
              this.init([], function() {
                return t
              }, null, {
                enabled: !0
              })
            })).error = bind(this, function(t) {
              this.inited = !0, (this.error = t).requireModules = [u], eachProp(p, function(t) {
                0 === t.map.id.indexOf(u + "_unnormalized") && I(t.map.id)
              }), S(t)
            }), o.fromText = bind(this, function(t, e) {
              var n = l.name,
                i = T(n),
                r = useInteractive;
              e && (t = e), r && (useInteractive = !1), C(i), hasProp(m.config, u) && (m.config[n] = m.config[u]);
              try {
                req.exec(t)
              } catch (t) {
                return S(makeError("fromtexteval", "fromText eval for " + u + " failed: " + t, t, [u]))
              }
              r && (useInteractive = !0), this.depMaps.push(i), d.completeLoad(n), a([n], o)
            }), void t.load(l.name, a, o, m))
          })), d.enable(t, this), this.pluginMaps[t.id] = t
        },
        enable: function() {
          (h[this.map.id] = this).enabled = !0, this.enabling = !0, each(this.depMaps, bind(this, function(t, e) {
            var n,
              i,
              r;
            if ("string" == typeof t) {
              if (t = T(t, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.skipMap), this.depMaps[e] = t, r = getOwn(u, t.id))
                return void (this.depExports[e] = r(this));
              this.depCount += 1, E(t, "defined", bind(this, function(t) {
                this.undefed || (this.defineDep(e, t), this.check())
              })), this.errback ? E(t, "error", bind(this, this.errback)) : this.events.error && E(t, "error", bind(this, function(t) {
                this.emit("error", t)
              }))
            }
            n = t.id, i = p[n], hasProp(u, n) || !i || i.enabled || d.enable(t, this)
          })), eachProp(this.pluginMaps, bind(this, function(t) {
            var e = getOwn(p, t.id);
            e && !e.enabled && d.enable(t, this)
          })), this.enabling = !1, this.check()
        },
        on: function(t, e) {
          var n = this.events[t];
          n || (n = this.events[t] = []), n.push(e)
        },
        emit: function(t, e) {
          each(this.events[t], function(t) {
            t(e)
          }), "error" === t && delete this.events[t]
        }
      }, (d = {
        config: m,
        contextName: l,
        registry: p,
        defined: g,
        urlFetched: r,
        defQueue: f,
        defQueueMap: {},
        Module: t,
        makeModuleMap: T,
        nextTick: req.nextTick,
        onError: S,
        configure: function(t) {
          if (t.baseUrl && "/" !== t.baseUrl.charAt(t.baseUrl.length - 1) && (t.baseUrl += "/"), "string" == typeof t.urlArgs) {
            var n = t.urlArgs;
            t.urlArgs = function(t, e) {
              return (-1 === e.indexOf("?") ? "?" : "&") + n
            }
          }
          var i = m.shim,
            r = {
              paths: !0,
              bundles: !0,
              config: !0,
              map: !0
            };
          eachProp(t, function(t, e) {
            r[e] ? (m[e] || (m[e] = {}), mixin(m[e], t, !0, !0)) : m[e] = t
          }), t.bundles && eachProp(t.bundles, function(t, e) {
            each(t, function(t) {
              t !== e && (v[t] = e)
            })
          }), t.shim && (eachProp(t.shim, function(t, e) {
            isArray(t) && (t = {
              deps: t
            }), !t.exports && !t.init || t.exportsFn || (t.exportsFn = d.makeShimExports(t)), i[e] = t
          }), m.shim = i), t.packages && each(t.packages, function(t) {
            var e;
            e = (t = "string" == typeof t ? {
              name: t
            } : t).name, t.location && (m.paths[e] = t.location), m.pkgs[e] = t.name + "/" + (t.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "")
          }), eachProp(p, function(t, e) {
            t.inited || t.map.unnormalized || (t.map = T(e, null, !0))
          }), (t.deps || t.callback) && d.require(t.deps || [], t.callback)
        },
        makeShimExports: function(e) {
          return function() {
            var t;
            return e.init && (t = e.init.apply(global, arguments)), t || e.exports && getGlobal(e.exports)
          }
        },
        makeRequire: function(o, s) {
          function a(t, e, n) {
            var i,
              r;
            return s.enableBuildCallback && e && isFunction(e) && (e.__requireJsBuild = !0), "string" == typeof t ? isFunction(e) ? S(makeError("requireargs", "Invalid require call"), n) : o && hasProp(u, t) ? u[t](p[o.id]) : req.get ? req.get(d, t, o, a) : (i = T(t, o, !1, !0).id, hasProp(g, i) ? g[i] : S(makeError("notloaded", 'Module name "' + i + '" has not been loaded yet for context: ' + l + (o ? "" : ". Use require([])")))) : (O(), d.nextTick(function() {
              O(), (r = C(T(null, o))).skipMap = s.skipMap, r.init(t, e, n, {
                enabled: !0
              }), N()
            }), a)
          }
          return s = s || {}, mixin(a, {
            isBrowser: isBrowser,
            toUrl: function(t) {
              var e,
                n = t.lastIndexOf("."),
                i = t.split("/")[0];
              return -1 !== n && (!("." === i || ".." === i) || 1 < n) && (e = t.substring(n, t.length), t = t.substring(0, n)), d.nameToUrl(x(t, o && o.id, !0), e, !0)
            },
            defined: function(t) {
              return hasProp(g, T(t, o, !1, !0).id)
            },
            specified: function(t) {
              return t = T(t, o, !1, !0).id, hasProp(g, t) || hasProp(p, t)
            }
          }), o || (a.undef = function(n) {
            A();
            var t = T(n, o, !0),
              e = getOwn(p, n);
            e.undefed = !0, w(n), delete g[n], delete r[t.url], delete i[n], eachReverse(f, function(t, e) {
              t[0] === n && f.splice(e, 1)
            }), delete d.defQueueMap[n], e && (e.events.defined && (i[n] = e.events), I(n))
          }), a
        },
        enable: function(t) {
          getOwn(p, t.id) && C(t).enable()
        },
        completeLoad: function(t) {
          var e,
            n,
            i,
            r = getOwn(m.shim, t) || {},
            o = r.exports;
          for (A(); f.length;) {
            if (null === (n = f.shift())[0]) {
              if (n[0] = t, e)
                break;
              e = !0
            } else
              n[0] === t && (e = !0);
            s(n)
          }
          if (d.defQueueMap = {}, i = getOwn(p, t), !e && !hasProp(g, t) && i && !i.inited) {
            if (!(!m.enforceDefine || o && getGlobal(o)))
              return _(t) ? void 0 : S(makeError("nodefine", "No define call for " + t, null, [t]));
            s([t, r.deps || [], r.exportsFn])
          }
          N()
        },
        nameToUrl: function(t, e, n) {
          var i,
            r,
            o,
            s,
            a,
            l,
            u = getOwn(m.pkgs, t);
          if (u && (t = u), l = getOwn(v, t))
            return d.nameToUrl(l, e, n);
          if (req.jsExtRegExp.test(t))
            s = t + (e || "");
          else {
            for (i = m.paths, o = (r = t.split("/")).length; 0 < o; o -= 1)
              if (a = getOwn(i, r.slice(0, o).join("/"))) {
                isArray(a) && (a = a[0]), r.splice(0, o, a);
                break
              }
            s = r.join("/"), s = ("/" === (s += e || (/^data\:|^blob\:|\?/.test(s) || n ? "" : ".js")).charAt(0) || s.match(/^[\w\+\.\-]+:/) ? "" : m.baseUrl) + s
          }
          return m.urlArgs && !/^blob\:/.test(s) ? s + m.urlArgs(t, s) : s
        },
        load: function(t, e) {
          req.load(d, t, e)
        },
        execCb: function(t, e, n, i) {
          return e.apply(i, n)
        },
        onScriptLoad: function(t) {
          if ("load" === t.type || readyRegExp.test((t.currentTarget || t.srcElement).readyState)) {
            interactiveScript = null;
            var e = a(t);
            d.completeLoad(e.id)
          }
        },
        onScriptError: function(t) {
          var n = a(t);
          if (!_(n.id)) {
            var i = [];
            return eachProp(p, function(t, e) {
              0 !== e.indexOf("_@r") && each(t.depMaps, function(t) {
                if (t.id === n.id)
                  return i.push(e), !0
              })
            }), S(makeError("scripterror", 'Script error for "' + n.id + (i.length ? '", needed by: ' + i.join(", ") : '"'), t, [n.id]))
          }
        }
      }).require = d.makeRequire(), d
    }
    function getInteractiveScript() {
      return interactiveScript && "interactive" === interactiveScript.readyState || eachReverse(scripts(), function(t) {
        if ("interactive" === t.readyState)
          return interactiveScript = t
      }), interactiveScript
    }
  }(this, "undefined" == typeof setTimeout ? void 0 : setTimeout), define("../vendor/requirejs/require.js", function() {}), function(t, e) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = t.document ? e(t, !0) : function(t) {
      if (!t.document)
        throw new Error("jQuery requires a window with a document");
      return e(t)
    } : e(t)
  }("undefined" != typeof window ? window : this, function(k, t) {
    var p = [],
      f = k.document,
      c = p.slice,
      g = p.concat,
      a = p.push,
      r = p.indexOf,
      n = {},
      e = n.toString,
      m = n.hasOwnProperty,
      v = {},
      T = function(t, e) {
        return new T.fn.init(t, e)
      },
      i = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
      o = /^-ms-/,
      s = /-([\da-z])/gi,
      l = function(t, e) {
        return e.toUpperCase()
      };
    function u(t) {
      var e = !!t && "length" in t && t.length,
        n = T.type(t);
      return "function" !== n && !T.isWindow(t) && ("array" === n || 0 === e || "number" == typeof e && 0 < e && e - 1 in t)
    }
    T.fn = T.prototype = {
      jquery: "1.12.4",
      constructor: T,
      selector: "",
      length: 0,
      toArray: function() {
        return c.call(this)
      },
      get: function(t) {
        return null != t ? t < 0 ? this[t + this.length] : this[t] : c.call(this)
      },
      pushStack: function(t) {
        var e = T.merge(this.constructor(), t);
        return e.prevObject = this, e.context = this.context, e
      },
      each: function(t) {
        return T.each(this, t)
      },
      map: function(n) {
        return this.pushStack(T.map(this, function(t, e) {
          return n.call(t, e, t)
        }))
      },
      slice: function() {
        return this.pushStack(c.apply(this, arguments))
      },
      first: function() {
        return this.eq(0)
      },
      last: function() {
        return this.eq(-1)
      },
      eq: function(t) {
        var e = this.length,
          n = +t + (t < 0 ? e : 0);
        return this.pushStack(0 <= n && n < e ? [this[n]] : [])
      },
      end: function() {
        return this.prevObject || this.constructor()
      },
      push: a,
      sort: p.sort,
      splice: p.splice
    }, T.extend = T.fn.extend = function() {
      var t,
        e,
        n,
        i,
        r,
        o,
        s = arguments[0] || {},
        a = 1,
        l = arguments.length,
        u = !1;
      for ("boolean" == typeof s && (u = s, s = arguments[a] || {}, a++), "object" == typeof s || T.isFunction(s) || (s = {}), a === l && (s = this, a--); a < l; a++)
        if (null != (r = arguments[a]))
          for (i in r)
            t = s[i], s !== (n = r[i]) && (u && n && (T.isPlainObject(n) || (e = T.isArray(n))) ? (e ? (e = !1, o = t && T.isArray(t) ? t : []) : o = t && T.isPlainObject(t) ? t : {}, s[i] = T.extend(u, o, n)) : void 0 !== n && (s[i] = n));
      return s
    }, T.extend({
      expando: "jQuery" + ("1.12.4" + Math.random()).replace(/\D/g, ""),
      isReady: !0,
      error: function(t) {
        throw new Error(t)
      },
      noop: function() {},
      isFunction: function(t) {
        return "function" === T.type(t)
      },
      isArray: Array.isArray || function(t) {
        return "array" === T.type(t)
      },
      isWindow: function(t) {
        return null != t && t == t.window
      },
      isNumeric: function(t) {
        var e = t && t.toString();
        return !T.isArray(t) && 0 <= e - parseFloat(e) + 1
      },
      isEmptyObject: function(t) {
        var e;
        for (e in t)
          return !1;
        return !0
      },
      isPlainObject: function(t) {
        var e;
        if (!t || "object" !== T.type(t) || t.nodeType || T.isWindow(t))
          return !1;
        try {
          if (t.constructor && !m.call(t, "constructor") && !m.call(t.constructor.prototype, "isPrototypeOf"))
            return !1
        } catch (t) {
          return !1
        }
        if (!v.ownFirst)
          for (e in t)
            return m.call(t, e);
        for (e in t)
          ;
        return void 0 === e || m.call(t, e)
      },
      type: function(t) {
        return null == t ? t + "" : "object" == typeof t || "function" == typeof t ? n[e.call(t)] || "object" : typeof t
      },
      globalEval: function(t) {
        t && T.trim(t) && (k.execScript || function(t) {
          k.eval.call(k, t)
        })(t)
      },
      camelCase: function(t) {
        return t.replace(o, "ms-").replace(s, l)
      },
      nodeName: function(t, e) {
        return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase()
      },
      each: function(t, e) {
        var n,
          i = 0;
        if (u(t))
          for (n = t.length; i < n && !1 !== e.call(t[i], i, t[i]); i++)
            ;
        else
          for (i in t)
            if (!1 === e.call(t[i], i, t[i]))
              break;
        return t
      },
      trim: function(t) {
        return null == t ? "" : (t + "").replace(i, "")
      },
      makeArray: function(t, e) {
        var n = e || [];
        return null != t && (u(Object(t)) ? T.merge(n, "string" == typeof t ? [t] : t) : a.call(n, t)), n
      },
      inArray: function(t, e, n) {
        var i;
        if (e) {
          if (r)
            return r.call(e, t, n);
          for (i = e.length, n = n ? n < 0 ? Math.max(0, i + n) : n : 0; n < i; n++)
            if (n in e && e[n] === t)
              return n
        }
        return -1
      },
      merge: function(t, e) {
        for (var n = +e.length, i = 0, r = t.length; i < n;)
          t[r++] = e[i++];
        if (n != n)
          for (; void 0 !== e[i];)
            t[r++] = e[i++];
        return t.length = r, t
      },
      grep: function(t, e, n) {
        for (var i = [], r = 0, o = t.length, s = !n; r < o; r++)
          !e(t[r], r) !== s && i.push(t[r]);
        return i
      },
      map: function(t, e, n) {
        var i,
          r,
          o = 0,
          s = [];
        if (u(t))
          for (i = t.length; o < i; o++)
            null != (r = e(t[o], o, n)) && s.push(r);
        else
          for (o in t)
            null != (r = e(t[o], o, n)) && s.push(r);
        return g.apply([], s)
      },
      guid: 1,
      proxy: function(t, e) {
        var n,
          i,
          r;
        if ("string" == typeof e && (r = t[e], e = t, t = r), T.isFunction(t))
          return n = c.call(arguments, 2), (i = function() {
            return t.apply(e || this, n.concat(c.call(arguments)))
          }).guid = t.guid = t.guid || T.guid++, i
      },
      now: function() {
        return +new Date
      },
      support: v
    }), "function" == typeof Symbol && (T.fn[Symbol.iterator] = p[Symbol.iterator]), T.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(t, e) {
      n["[object " + e + "]"] = e.toLowerCase()
    });
    var h = function(n) {
      var t,
        f,
        x,
        o,
        r,
        g,
        p,
        m,
        w,
        l,
        u,
        _,
        k,
        s,
        T,
        v,
        a,
        c,
        y,
        C = "sizzle" + 1 * new Date,
        b = n.document,
        E = 0,
        i = 0,
        h = rt(),
        d = rt(),
        S = rt(),
        A = function(t, e) {
          return t === e && (u = !0), 0
        },
        I = {}.hasOwnProperty,
        e = [],
        N = e.pop,
        O = e.push,
        j = e.push,
        D = e.slice,
        q = function(t, e) {
          for (var n = 0, i = t.length; n < i; n++)
            if (t[n] === e)
              return n;
          return -1
        },
        P = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        L = "[\\x20\\t\\r\\n\\f]",
        H = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
        M = "\\[" + L + "*(" + H + ")(?:" + L + "*([*^$|!~]?=)" + L + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + H + "))|)" + L + "*\\]",
        B = ":(" + H + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + M + ")*)|.*)\\)|)",
        R = new RegExp(L + "+", "g"),
        z = new RegExp("^" + L + "+|((?:^|[^\\\\])(?:\\\\.)*)" + L + "+$", "g"),
        F = new RegExp("^" + L + "*," + L + "*"),
        W = new RegExp("^" + L + "*([>+~]|" + L + ")" + L + "*"),
        $ = new RegExp("=" + L + "*([^\\]'\"]*?)" + L + "*\\]", "g"),
        U = new RegExp(B),
        V = new RegExp("^" + H + "$"),
        X = {
          ID: new RegExp("^#(" + H + ")"),
          CLASS: new RegExp("^\\.(" + H + ")"),
          TAG: new RegExp("^(" + H + "|[*])"),
          ATTR: new RegExp("^" + M),
          PSEUDO: new RegExp("^" + B),
          CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + L + "*(even|odd|(([+-]|)(\\d*)n|)" + L + "*(?:([+-]|)" + L + "*(\\d+)|))" + L + "*\\)|)", "i"),
          bool: new RegExp("^(?:" + P + ")$", "i"),
          needsContext: new RegExp("^" + L + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + L + "*((?:-\\d)?\\d*)" + L + "*\\)|)(?=[^-]|$)", "i")
        },
        G = /^(?:input|select|textarea|button)$/i,
        Q = /^h\d$/i,
        K = /^[^{]+\{\s*\[native \w/,
        J = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        Y = /[+~]/,
        Z = /'|\\/g,
        tt = new RegExp("\\\\([\\da-f]{1,6}" + L + "?|(" + L + ")|.)", "ig"),
        et = function(t, e, n) {
          var i = "0x" + e - 65536;
          return i != i || n ? e : i < 0 ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320)
        },
        nt = function() {
          _()
        };
      try {
        j.apply(e = D.call(b.childNodes), b.childNodes), e[b.childNodes.length].nodeType
      } catch (t) {
        j = {
          apply: e.length ? function(t, e) {
            O.apply(t, D.call(e))
          } : function(t, e) {
            for (var n = t.length, i = 0; t[n++] = e[i++];)
              ;
            t.length = n - 1
          }
        }
      }
      function it(t, e, n, i) {
        var r,
          o,
          s,
          a,
          l,
          u,
          c,
          p,
          h = e && e.ownerDocument,
          d = e ? e.nodeType : 9;
        if (n = n || [], "string" != typeof t || !t || 1 !== d && 9 !== d && 11 !== d)
          return n;
        if (!i && ((e ? e.ownerDocument || e : b) !== k && _(e), e = e || k, T)) {
          if (11 !== d && (u = J.exec(t)))
            if (r = u[1]) {
              if (9 === d) {
                if (!(s = e.getElementById(r)))
                  return n;
                if (s.id === r)
                  return n.push(s), n
              } else if (h && (s = h.getElementById(r)) && y(e, s) && s.id === r)
                return n.push(s), n
            } else {
              if (u[2])
                return j.apply(n, e.getElementsByTagName(t)), n;
              if ((r = u[3]) && f.getElementsByClassName && e.getElementsByClassName)
                return j.apply(n, e.getElementsByClassName(r)), n
            }
          if (f.qsa && !S[t + " "] && (!v || !v.test(t))) {
            if (1 !== d)
              h = e, p = t;
            else if ("object" !== e.nodeName.toLowerCase()) {
              for ((a = e.getAttribute("id")) ? a = a.replace(Z, "\\$&") : e.setAttribute("id", a = C), o = (c = g(t)).length, l = V.test(a) ? "#" + a : "[id='" + a + "']"; o--;)
                c[o] = l + " " + ft(c[o]);
              p = c.join(","), h = Y.test(t) && ht(e.parentNode) || e
            }
            if (p)
              try {
                return j.apply(n, h.querySelectorAll(p)), n
              } catch (t) {} finally {
                a === C && e.removeAttribute("id")
              }
          }
        }
        return m(t.replace(z, "$1"), e, n, i)
      }
      function rt() {
        var i = [];
        return function t(e, n) {
          return i.push(e + " ") > x.cacheLength && delete t[i.shift()], t[e + " "] = n
        }
      }
      function ot(t) {
        return t[C] = !0, t
      }
      function st(t) {
        var e = k.createElement("div");
        try {
          return !!t(e)
        } catch (t) {
          return !1
        } finally {
          e.parentNode && e.parentNode.removeChild(e), e = null
        }
      }
      function at(t, e) {
        for (var n = t.split("|"), i = n.length; i--;)
          x.attrHandle[n[i]] = e
      }
      function lt(t, e) {
        var n = e && t,
          i = n && 1 === t.nodeType && 1 === e.nodeType && (~e.sourceIndex || 1 << 31) - (~t.sourceIndex || 1 << 31);
        if (i)
          return i;
        if (n)
          for (; n = n.nextSibling;)
            if (n === e)
              return -1;
        return t ? 1 : -1
      }
      function ut(e) {
        return function(t) {
          return "input" === t.nodeName.toLowerCase() && t.type === e
        }
      }
      function ct(n) {
        return function(t) {
          var e = t.nodeName.toLowerCase();
          return ("input" === e || "button" === e) && t.type === n
        }
      }
      function pt(s) {
        return ot(function(o) {
          return o = +o, ot(function(t, e) {
            for (var n, i = s([], t.length, o), r = i.length; r--;)
              t[n = i[r]] && (t[n] = !(e[n] = t[n]))
          })
        })
      }
      function ht(t) {
        return t && void 0 !== t.getElementsByTagName && t
      }
      for (t in f = it.support = {}, r = it.isXML = function(t) {
        var e = t && (t.ownerDocument || t).documentElement;
        return !!e && "HTML" !== e.nodeName
      }, _ = it.setDocument = function(t) {
        var e,
          n,
          i = t ? t.ownerDocument || t : b;
        return i !== k && 9 === i.nodeType && i.documentElement && (s = (k = i).documentElement, T = !r(k), (n = k.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", nt, !1) : n.attachEvent && n.attachEvent("onunload", nt)), f.attributes = st(function(t) {
          return t.className = "i", !t.getAttribute("className")
        }), f.getElementsByTagName = st(function(t) {
          return t.appendChild(k.createComment("")), !t.getElementsByTagName("*").length
        }), f.getElementsByClassName = K.test(k.getElementsByClassName), f.getById = st(function(t) {
          return s.appendChild(t).id = C, !k.getElementsByName || !k.getElementsByName(C).length
        }), f.getById ? (x.find.ID = function(t, e) {
          if (void 0 !== e.getElementById && T) {
            var n = e.getElementById(t);
            return n ? [n] : []
          }
        }, x.filter.ID = function(t) {
          var e = t.replace(tt, et);
          return function(t) {
            return t.getAttribute("id") === e
          }
        }) : (delete x.find.ID, x.filter.ID = function(t) {
          var n = t.replace(tt, et);
          return function(t) {
            var e = void 0 !== t.getAttributeNode && t.getAttributeNode("id");
            return e && e.value === n
          }
        }), x.find.TAG = f.getElementsByTagName ? function(t, e) {
          return void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t) : f.qsa ? e.querySelectorAll(t) : void 0
        } : function(t, e) {
          var n,
            i = [],
            r = 0,
            o = e.getElementsByTagName(t);
          if ("*" === t) {
            for (; n = o[r++];)
              1 === n.nodeType && i.push(n);
            return i
          }
          return o
        }, x.find.CLASS = f.getElementsByClassName && function(t, e) {
          if (void 0 !== e.getElementsByClassName && T)
            return e.getElementsByClassName(t)
        }, a = [], v = [], (f.qsa = K.test(k.querySelectorAll)) && (st(function(t) {
          s.appendChild(t).innerHTML = "<a id='" + C + "'></a><select id='" + C + "-\r\\' msallowcapture=''><option selected=''></option></select>", t.querySelectorAll("[msallowcapture^='']").length && v.push("[*^$]=" + L + "*(?:''|\"\")"), t.querySelectorAll("[selected]").length || v.push("\\[" + L + "*(?:value|" + P + ")"), t.querySelectorAll("[id~=" + C + "-]").length || v.push("~="), t.querySelectorAll(":checked").length || v.push(":checked"), t.querySelectorAll("a#" + C + "+*").length || v.push(".#.+[+~]")
        }), st(function(t) {
          var e = k.createElement("input");
          e.setAttribute("type", "hidden"), t.appendChild(e).setAttribute("name", "D"), t.querySelectorAll("[name=d]").length && v.push("name" + L + "*[*^$|!~]?="), t.querySelectorAll(":enabled").length || v.push(":enabled", ":disabled"), t.querySelectorAll("*,:x"), v.push(",.*:")
        })), (f.matchesSelector = K.test(c = s.matches || s.webkitMatchesSelector || s.mozMatchesSelector || s.oMatchesSelector || s.msMatchesSelector)) && st(function(t) {
          f.disconnectedMatch = c.call(t, "div"), c.call(t, "[s!='']:x"), a.push("!=", B)
        }), v = v.length && new RegExp(v.join("|")), a = a.length && new RegExp(a.join("|")), e = K.test(s.compareDocumentPosition), y = e || K.test(s.contains) ? function(t, e) {
          var n = 9 === t.nodeType ? t.documentElement : t,
            i = e && e.parentNode;
          return t === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(i)))
        } : function(t, e) {
          if (e)
            for (; e = e.parentNode;)
              if (e === t)
                return !0;
          return !1
        }, A = e ? function(t, e) {
          if (t === e)
            return u = !0, 0;
          var n = !t.compareDocumentPosition - !e.compareDocumentPosition;
          return n || (1 & (n = (t.ownerDocument || t) === (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1) || !f.sortDetached && e.compareDocumentPosition(t) === n ? t === k || t.ownerDocument === b && y(b, t) ? -1 : e === k || e.ownerDocument === b && y(b, e) ? 1 : l ? q(l, t) - q(l, e) : 0 : 4 & n ? -1 : 1)
        } : function(t, e) {
          if (t === e)
            return u = !0, 0;
          var n,
            i = 0,
            r = t.parentNode,
            o = e.parentNode,
            s = [t],
            a = [e];
          if (!r || !o)
            return t === k ? -1 : e === k ? 1 : r ? -1 : o ? 1 : l ? q(l, t) - q(l, e) : 0;
          if (r === o)
            return lt(t, e);
          for (n = t; n = n.parentNode;)
            s.unshift(n);
          for (n = e; n = n.parentNode;)
            a.unshift(n);
          for (; s[i] === a[i];)
            i++;
          return i ? lt(s[i], a[i]) : s[i] === b ? -1 : a[i] === b ? 1 : 0
        }), k
      }, it.matches = function(t, e) {
        return it(t, null, null, e)
      }, it.matchesSelector = function(t, e) {
        if ((t.ownerDocument || t) !== k && _(t), e = e.replace($, "='$1']"), f.matchesSelector && T && !S[e + " "] && (!a || !a.test(e)) && (!v || !v.test(e)))
          try {
            var n = c.call(t, e);
            if (n || f.disconnectedMatch || t.document && 11 !== t.document.nodeType)
              return n
          } catch (t) {}
        return 0 < it(e, k, null, [t]).length
      }, it.contains = function(t, e) {
        return (t.ownerDocument || t) !== k && _(t), y(t, e)
      }, it.attr = function(t, e) {
        (t.ownerDocument || t) !== k && _(t);
        var n = x.attrHandle[e.toLowerCase()],
          i = n && I.call(x.attrHandle, e.toLowerCase()) ? n(t, e, !T) : void 0;
        return void 0 !== i ? i : f.attributes || !T ? t.getAttribute(e) : (i = t.getAttributeNode(e)) && i.specified ? i.value : null
      }, it.error = function(t) {
        throw new Error("Syntax error, unrecognized expression: " + t)
      }, it.uniqueSort = function(t) {
        var e,
          n = [],
          i = 0,
          r = 0;
        if (u = !f.detectDuplicates, l = !f.sortStable && t.slice(0), t.sort(A), u) {
          for (; e = t[r++];)
            e === t[r] && (i = n.push(r));
          for (; i--;)
            t.splice(n[i], 1)
        }
        return l = null, t
      }, o = it.getText = function(t) {
        var e,
          n = "",
          i = 0,
          r = t.nodeType;
        if (r) {
          if (1 === r || 9 === r || 11 === r) {
            if ("string" == typeof t.textContent)
              return t.textContent;
            for (t = t.firstChild; t; t = t.nextSibling)
              n += o(t)
          } else if (3 === r || 4 === r)
            return t.nodeValue
        } else
          for (; e = t[i++];)
            n += o(e);
        return n
      }, (x = it.selectors = {
        cacheLength: 50,
        createPseudo: ot,
        match: X,
        attrHandle: {},
        find: {},
        relative: {
          ">": {
            dir: "parentNode",
            first: !0
          },
          " ": {
            dir: "parentNode"
          },
          "+": {
            dir: "previousSibling",
            first: !0
          },
          "~": {
            dir: "previousSibling"
          }
        },
        preFilter: {
          ATTR: function(t) {
            return t[1] = t[1].replace(tt, et), t[3] = (t[3] || t[4] || t[5] || "").replace(tt, et), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4)
          },
          CHILD: function(t) {
            return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || it.error(t[0]), t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && it.error(t[0]), t
          },
          PSEUDO: function(t) {
            var e,
              n = !t[6] && t[2];
            return X.CHILD.test(t[0]) ? null : (t[3] ? t[2] = t[4] || t[5] || "" : n && U.test(n) && (e = g(n, !0)) && (e = n.indexOf(")", n.length - e) - n.length) && (t[0] = t[0].slice(0, e), t[2] = n.slice(0, e)), t.slice(0, 3))
          }
        },
        filter: {
          TAG: function(t) {
            var e = t.replace(tt, et).toLowerCase();
            return "*" === t ? function() {
              return !0
            } : function(t) {
              return t.nodeName && t.nodeName.toLowerCase() === e
            }
          },
          CLASS: function(t) {
            var e = h[t + " "];
            return e || (e = new RegExp("(^|" + L + ")" + t + "(" + L + "|$)")) && h(t, function(t) {
              return e.test("string" == typeof t.className && t.className || void 0 !== t.getAttribute && t.getAttribute("class") || "")
            })
          },
          ATTR: function(n, i, r) {
            return function(t) {
              var e = it.attr(t, n);
              return null == e ? "!=" === i : !i || (e += "", "=" === i ? e === r : "!=" === i ? e !== r : "^=" === i ? r && 0 === e.indexOf(r) : "*=" === i ? r && -1 < e.indexOf(r) : "$=" === i ? r && e.slice(-r.length) === r : "~=" === i ? -1 < (" " + e.replace(R, " ") + " ").indexOf(r) : "|=" === i && (e === r || e.slice(0, r.length + 1) === r + "-"))
            }
          },
          CHILD: function(f, t, e, g, m) {
            var v = "nth" !== f.slice(0, 3),
              y = "last" !== f.slice(-4),
              b = "of-type" === t;
            return 1 === g && 0 === m ? function(t) {
              return !!t.parentNode
            } : function(t, e, n) {
              var i,
                r,
                o,
                s,
                a,
                l,
                u = v !== y ? "nextSibling" : "previousSibling",
                c = t.parentNode,
                p = b && t.nodeName.toLowerCase(),
                h = !n && !b,
                d = !1;
              if (c) {
                if (v) {
                  for (; u;) {
                    for (s = t; s = s[u];)
                      if (b ? s.nodeName.toLowerCase() === p : 1 === s.nodeType)
                        return !1;
                    l = u = "only" === f && !l && "nextSibling"
                  }
                  return !0
                }
                if (l = [y ? c.firstChild : c.lastChild], y && h) {
                  for (d = (a = (i = (r = (o = (s = c)[C] || (s[C] = {}))[s.uniqueID] || (o[s.uniqueID] = {}))[f] || [])[0] === E && i[1]) && i[2], s = a && c.childNodes[a]; s = ++a && s && s[u] || (d = a = 0) || l.pop();)
                    if (1 === s.nodeType && ++d && s === t) {
                      r[f] = [E, a, d];
                      break
                    }
                } else if (h && (d = a = (i = (r = (o = (s = t)[C] || (s[C] = {}))[s.uniqueID] || (o[s.uniqueID] = {}))[f] || [])[0] === E && i[1]), !1 === d)
                  for (; (s = ++a && s && s[u] || (d = a = 0) || l.pop()) && ((b ? s.nodeName.toLowerCase() !== p : 1 !== s.nodeType) || !++d || (h && ((r = (o = s[C] || (s[C] = {}))[s.uniqueID] || (o[s.uniqueID] = {}))[f] = [E, d]), s !== t));)
                    ;
                return (d -= m) === g || d % g == 0 && 0 <= d / g
              }
            }
          },
          PSEUDO: function(t, o) {
            var e,
              s = x.pseudos[t] || x.setFilters[t.toLowerCase()] || it.error("unsupported pseudo: " + t);
            return s[C] ? s(o) : 1 < s.length ? (e = [t, t, "", o], x.setFilters.hasOwnProperty(t.toLowerCase()) ? ot(function(t, e) {
              for (var n, i = s(t, o), r = i.length; r--;)
                t[n = q(t, i[r])] = !(e[n] = i[r])
            }) : function(t) {
              return s(t, 0, e)
            }) : s
          }
        },
        pseudos: {
          not: ot(function(t) {
            var i = [],
              r = [],
              a = p(t.replace(z, "$1"));
            return a[C] ? ot(function(t, e, n, i) {
              for (var r, o = a(t, null, i, []), s = t.length; s--;)
                (r = o[s]) && (t[s] = !(e[s] = r))
            }) : function(t, e, n) {
              return i[0] = t, a(i, null, n, r), i[0] = null, !r.pop()
            }
          }),
          has: ot(function(e) {
            return function(t) {
              return 0 < it(e, t).length
            }
          }),
          contains: ot(function(e) {
            return e = e.replace(tt, et), function(t) {
              return -1 < (t.textContent || t.innerText || o(t)).indexOf(e)
            }
          }),
          lang: ot(function(n) {
            return V.test(n || "") || it.error("unsupported lang: " + n), n = n.replace(tt, et).toLowerCase(), function(t) {
              var e;
              do {
                if (e = T ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))
                  return (e = e.toLowerCase()) === n || 0 === e.indexOf(n + "-")
              } while ((t = t.parentNode) && 1 === t.nodeType);
              return !1
            }
          }),
          target: function(t) {
            var e = n.location && n.location.hash;
            return e && e.slice(1) === t.id
          },
          root: function(t) {
            return t === s
          },
          focus: function(t) {
            return t === k.activeElement && (!k.hasFocus || k.hasFocus()) && !!(t.type || t.href || ~t.tabIndex)
          },
          enabled: function(t) {
            return !1 === t.disabled
          },
          disabled: function(t) {
            return !0 === t.disabled
          },
          checked: function(t) {
            var e = t.nodeName.toLowerCase();
            return "input" === e && !!t.checked || "option" === e && !!t.selected
          },
          selected: function(t) {
            return t.parentNode && t.parentNode.selectedIndex, !0 === t.selected
          },
          empty: function(t) {
            for (t = t.firstChild; t; t = t.nextSibling)
              if (t.nodeType < 6)
                return !1;
            return !0
          },
          parent: function(t) {
            return !x.pseudos.empty(t)
          },
          header: function(t) {
            return Q.test(t.nodeName)
          },
          input: function(t) {
            return G.test(t.nodeName)
          },
          button: function(t) {
            var e = t.nodeName.toLowerCase();
            return "input" === e && "button" === t.type || "button" === e
          },
          text: function(t) {
            var e;
            return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || "text" === e.toLowerCase())
          },
          first: pt(function() {
            return [0]
          }),
          last: pt(function(t, e) {
            return [e - 1]
          }),
          eq: pt(function(t, e, n) {
            return [n < 0 ? n + e : n]
          }),
          even: pt(function(t, e) {
            for (var n = 0; n < e; n += 2)
              t.push(n);
            return t
          }),
          odd: pt(function(t, e) {
            for (var n = 1; n < e; n += 2)
              t.push(n);
            return t
          }),
          lt: pt(function(t, e, n) {
            for (var i = n < 0 ? n + e : n; 0 <= --i;)
              t.push(i);
            return t
          }),
          gt: pt(function(t, e, n) {
            for (var i = n < 0 ? n + e : n; ++i < e;)
              t.push(i);
            return t
          })
        }
      }).pseudos.nth = x.pseudos.eq, {
        radio: !0,
        checkbox: !0,
        file: !0,
        password: !0,
        image: !0
      })
        x.pseudos[t] = ut(t);
      for (t in {
        submit: !0,
        reset: !0
      })
        x.pseudos[t] = ct(t);
      function dt() {}
      function ft(t) {
        for (var e = 0, n = t.length, i = ""; e < n; e++)
          i += t[e].value;
        return i
      }
      function gt(a, t, e) {
        var l = t.dir,
          u = e && "parentNode" === l,
          c = i++;
        return t.first ? function(t, e, n) {
          for (; t = t[l];)
            if (1 === t.nodeType || u)
              return a(t, e, n)
        } : function(t, e, n) {
          var i,
            r,
            o,
            s = [E, c];
          if (n) {
            for (; t = t[l];)
              if ((1 === t.nodeType || u) && a(t, e, n))
                return !0
          } else
            for (; t = t[l];)
              if (1 === t.nodeType || u) {
                if ((i = (r = (o = t[C] || (t[C] = {}))[t.uniqueID] || (o[t.uniqueID] = {}))[l]) && i[0] === E && i[1] === c)
                  return s[2] = i[2];
                if ((r[l] = s)[2] = a(t, e, n))
                  return !0
              }
        }
      }
      function mt(r) {
        return 1 < r.length ? function(t, e, n) {
          for (var i = r.length; i--;)
            if (!r[i](t, e, n))
              return !1;
          return !0
        } : r[0]
      }
      function vt(t, e, n, i, r) {
        for (var o, s = [], a = 0, l = t.length, u = null != e; a < l; a++)
          (o = t[a]) && (n && !n(o, i, r) || (s.push(o), u && e.push(a)));
        return s
      }
      function yt(d, f, g, m, v, t) {
        return m && !m[C] && (m = yt(m)), v && !v[C] && (v = yt(v, t)), ot(function(t, e, n, i) {
          var r,
            o,
            s,
            a = [],
            l = [],
            u = e.length,
            c = t || function(t, e, n) {
              for (var i = 0, r = e.length; i < r; i++)
                it(t, e[i], n);
              return n
            }(f || "*", n.nodeType ? [n] : n, []),
            p = !d || !t && f ? c : vt(c, a, d, n, i),
            h = g ? v || (t ? d : u || m) ? [] : e : p;
          if (g && g(p, h, n, i), m)
            for (r = vt(h, l), m(r, [], n, i), o = r.length; o--;)
              (s = r[o]) && (h[l[o]] = !(p[l[o]] = s));
          if (t) {
            if (v || d) {
              if (v) {
                for (r = [], o = h.length; o--;)
                  (s = h[o]) && r.push(p[o] = s);
                v(null, h = [], r, i)
              }
              for (o = h.length; o--;)
                (s = h[o]) && -1 < (r = v ? q(t, s) : a[o]) && (t[r] = !(e[r] = s))
            }
          } else
            h = vt(h === e ? h.splice(u, h.length) : h), v ? v(null, e, h, i) : j.apply(e, h)
        })
      }
      function bt(t) {
        for (var r, e, n, i = t.length, o = x.relative[t[0].type], s = o || x.relative[" "], a = o ? 1 : 0, l = gt(function(t) {
          return t === r
        }, s, !0), u = gt(function(t) {
          return -1 < q(r, t)
        }, s, !0), c = [function(t, e, n) {
          var i = !o && (n || e !== w) || ((r = e).nodeType ? l(t, e, n) : u(t, e, n));
          return r = null, i
        }]; a < i; a++)
          if (e = x.relative[t[a].type])
            c = [gt(mt(c), e)];
          else {
            if ((e = x.filter[t[a].type].apply(null, t[a].matches))[C]) {
              for (n = ++a; n < i && !x.relative[t[n].type]; n++)
                ;
              return yt(1 < a && mt(c), 1 < a && ft(t.slice(0, a - 1).concat({
                value: " " === t[a - 2].type ? "*" : ""
              })).replace(z, "$1"), e, a < n && bt(t.slice(a, n)), n < i && bt(t = t.slice(n)), n < i && ft(t))
            }
            c.push(e)
          }
        return mt(c)
      }
      return dt.prototype = x.filters = x.pseudos, x.setFilters = new dt, g = it.tokenize = function(t, e) {
        var n,
          i,
          r,
          o,
          s,
          a,
          l,
          u = d[t + " "];
        if (u)
          return e ? 0 : u.slice(0);
        for (s = t, a = [], l = x.preFilter; s;) {
          for (o in n && !(i = F.exec(s)) || (i && (s = s.slice(i[0].length) || s), a.push(r = [])), n = !1, (i = W.exec(s)) && (n = i.shift(), r.push({
            value: n,
            type: i[0].replace(z, " ")
          }), s = s.slice(n.length)), x.filter)
            !(i = X[o].exec(s)) || l[o] && !(i = l[o](i)) || (n = i.shift(), r.push({
              value: n,
              type: o,
              matches: i
            }), s = s.slice(n.length));
          if (!n)
            break
        }
        return e ? s.length : s ? it.error(t) : d(t, a).slice(0)
      }, p = it.compile = function(t, e) {
        var n,
          m,
          v,
          y,
          b,
          i,
          r = [],
          o = [],
          s = S[t + " "];
        if (!s) {
          for (e || (e = g(t)), n = e.length; n--;)
            (s = bt(e[n]))[C] ? r.push(s) : o.push(s);
          (s = S(t, (m = o, y = 0 < (v = r).length, b = 0 < m.length, i = function(t, e, n, i, r) {
            var o,
              s,
              a,
              l = 0,
              u = "0",
              c = t && [],
              p = [],
              h = w,
              d = t || b && x.find.TAG("*", r),
              f = E += null == h ? 1 : Math.random() || .1,
              g = d.length;
            for (r && (w = e === k || e || r); u !== g && null != (o = d[u]); u++) {
              if (b && o) {
                for (s = 0, e || o.ownerDocument === k || (_(o), n = !T); a = m[s++];)
                  if (a(o, e || k, n)) {
                    i.push(o);
                    break
                  }
                r && (E = f)
              }
              y && ((o = !a && o) && l--, t && c.push(o))
            }
            if (l += u, y && u !== l) {
              for (s = 0; a = v[s++];)
                a(c, p, e, n);
              if (t) {
                if (0 < l)
                  for (; u--;)
                    c[u] || p[u] || (p[u] = N.call(i));
                p = vt(p)
              }
              j.apply(i, p), r && !t && 0 < p.length && 1 < l + v.length && it.uniqueSort(i)
            }
            return r && (E = f, w = h), c
          }, y ? ot(i) : i))).selector = t
        }
        return s
      }, m = it.select = function(t, e, n, i) {
        var r,
          o,
          s,
          a,
          l,
          u = "function" == typeof t && t,
          c = !i && g(t = u.selector || t);
        if (n = n || [], 1 === c.length) {
          if (2 < (o = c[0] = c[0].slice(0)).length && "ID" === (s = o[0]).type && f.getById && 9 === e.nodeType && T && x.relative[o[1].type]) {
            if (!(e = (x.find.ID(s.matches[0].replace(tt, et), e) || [])[0]))
              return n;
            u && (e = e.parentNode), t = t.slice(o.shift().value.length)
          }
          for (r = X.needsContext.test(t) ? 0 : o.length; r-- && (s = o[r], !x.relative[a = s.type]);)
            if ((l = x.find[a]) && (i = l(s.matches[0].replace(tt, et), Y.test(o[0].type) && ht(e.parentNode) || e))) {
              if (o.splice(r, 1), !(t = i.length && ft(o)))
                return j.apply(n, i), n;
              break
            }
        }
        return (u || p(t, c))(i, e, !T, n, !e || Y.test(t) && ht(e.parentNode) || e), n
      }, f.sortStable = C.split("").sort(A).join("") === C, f.detectDuplicates = !!u, _(), f.sortDetached = st(function(t) {
        return 1 & t.compareDocumentPosition(k.createElement("div"))
      }), st(function(t) {
        return t.innerHTML = "<a href='#'></a>", "#" === t.firstChild.getAttribute("href")
      }) || at("type|href|height|width", function(t, e, n) {
        if (!n)
          return t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2)
      }), f.attributes && st(function(t) {
        return t.innerHTML = "<input/>", t.firstChild.setAttribute("value", ""), "" === t.firstChild.getAttribute("value")
      }) || at("value", function(t, e, n) {
        if (!n && "input" === t.nodeName.toLowerCase())
          return t.defaultValue
      }), st(function(t) {
        return null == t.getAttribute("disabled")
      }) || at(P, function(t, e, n) {
        var i;
        if (!n)
          return !0 === t[e] ? e.toLowerCase() : (i = t.getAttributeNode(e)) && i.specified ? i.value : null
      }), it
    }(k);
    T.find = h, T.expr = h.selectors, T.expr[":"] = T.expr.pseudos, T.uniqueSort = T.unique = h.uniqueSort, T.text = h.getText, T.isXMLDoc = h.isXML, T.contains = h.contains;
    var d = function(t, e, n) {
        for (var i = [], r = void 0 !== n; (t = t[e]) && 9 !== t.nodeType;)
          if (1 === t.nodeType) {
            if (r && T(t).is(n))
              break;
            i.push(t)
          }
        return i
      },
      y = function(t, e) {
        for (var n = []; t; t = t.nextSibling)
          1 === t.nodeType && t !== e && n.push(t);
        return n
      },
      b = T.expr.match.needsContext,
      x = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
      w = /^.[^:#\[\.,]*$/;
    function _(t, n, i) {
      if (T.isFunction(n))
        return T.grep(t, function(t, e) {
          return !!n.call(t, e, t) !== i
        });
      if (n.nodeType)
        return T.grep(t, function(t) {
          return t === n !== i
        });
      if ("string" == typeof n) {
        if (w.test(n))
          return T.filter(n, t, i);
        n = T.filter(n, t)
      }
      return T.grep(t, function(t) {
        return -1 < T.inArray(t, n) !== i
      })
    }
    T.filter = function(t, e, n) {
      var i = e[0];
      return n && (t = ":not(" + t + ")"), 1 === e.length && 1 === i.nodeType ? T.find.matchesSelector(i, t) ? [i] : [] : T.find.matches(t, T.grep(e, function(t) {
        return 1 === t.nodeType
      }))
    }, T.fn.extend({
      find: function(t) {
        var e,
          n = [],
          i = this,
          r = i.length;
        if ("string" != typeof t)
          return this.pushStack(T(t).filter(function() {
            for (e = 0; e < r; e++)
              if (T.contains(i[e], this))
                return !0
          }));
        for (e = 0; e < r; e++)
          T.find(t, i[e], n);
        return (n = this.pushStack(1 < r ? T.unique(n) : n)).selector = this.selector ? this.selector + " " + t : t, n
      },
      filter: function(t) {
        return this.pushStack(_(this, t || [], !1))
      },
      not: function(t) {
        return this.pushStack(_(this, t || [], !0))
      },
      is: function(t) {
        return !!_(this, "string" == typeof t && b.test(t) ? T(t) : t || [], !1).length
      }
    });
    var C,
      E = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
    (T.fn.init = function(t, e, n) {
      var i,
        r;
      if (!t)
        return this;
      if (n = n || C, "string" == typeof t) {
        if (!(i = "<" === t.charAt(0) && ">" === t.charAt(t.length - 1) && 3 <= t.length ? [null, t, null] : E.exec(t)) || !i[1] && e)
          return !e || e.jquery ? (e || n).find(t) : this.constructor(e).find(t);
        if (i[1]) {
          if (e = e instanceof T ? e[0] : e, T.merge(this, T.parseHTML(i[1], e && e.nodeType ? e.ownerDocument || e : f, !0)), x.test(i[1]) && T.isPlainObject(e))
            for (i in e)
              T.isFunction(this[i]) ? this[i](e[i]) : this.attr(i, e[i]);
          return this
        }
        if ((r = f.getElementById(i[2])) && r.parentNode) {
          if (r.id !== i[2])
            return C.find(t);
          this.length = 1, this[0] = r
        }
        return this.context = f, this.selector = t, this
      }
      return t.nodeType ? (this.context = this[0] = t, this.length = 1, this) : T.isFunction(t) ? void 0 !== n.ready ? n.ready(t) : t(T) : (void 0 !== t.selector && (this.selector = t.selector, this.context = t.context), T.makeArray(t, this))
    }).prototype = T.fn, C = T(f);
    var S = /^(?:parents|prev(?:Until|All))/,
      A = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
      };
    function I(t, e) {
      for (; (t = t[e]) && 1 !== t.nodeType;)
        ;
      return t
    }
    T.fn.extend({
      has: function(t) {
        var e,
          n = T(t, this),
          i = n.length;
        return this.filter(function() {
          for (e = 0; e < i; e++)
            if (T.contains(this, n[e]))
              return !0
        })
      },
      closest: function(t, e) {
        for (var n, i = 0, r = this.length, o = [], s = b.test(t) || "string" != typeof t ? T(t, e || this.context) : 0; i < r; i++)
          for (n = this[i]; n && n !== e; n = n.parentNode)
            if (n.nodeType < 11 && (s ? -1 < s.index(n) : 1 === n.nodeType && T.find.matchesSelector(n, t))) {
              o.push(n);
              break
            }
        return this.pushStack(1 < o.length ? T.uniqueSort(o) : o)
      },
      index: function(t) {
        return t ? "string" == typeof t ? T.inArray(this[0], T(t)) : T.inArray(t.jquery ? t[0] : t, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
      },
      add: function(t, e) {
        return this.pushStack(T.uniqueSort(T.merge(this.get(), T(t, e))))
      },
      addBack: function(t) {
        return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
      }
    }), T.each({
      parent: function(t) {
        var e = t.parentNode;
        return e && 11 !== e.nodeType ? e : null
      },
      parents: function(t) {
        return d(t, "parentNode")
      },
      parentsUntil: function(t, e, n) {
        return d(t, "parentNode", n)
      },
      next: function(t) {
        return I(t, "nextSibling")
      },
      prev: function(t) {
        return I(t, "previousSibling")
      },
      nextAll: function(t) {
        return d(t, "nextSibling")
      },
      prevAll: function(t) {
        return d(t, "previousSibling")
      },
      nextUntil: function(t, e, n) {
        return d(t, "nextSibling", n)
      },
      prevUntil: function(t, e, n) {
        return d(t, "previousSibling", n)
      },
      siblings: function(t) {
        return y((t.parentNode || {}).firstChild, t)
      },
      children: function(t) {
        return y(t.firstChild)
      },
      contents: function(t) {
        return T.nodeName(t, "iframe") ? t.contentDocument || t.contentWindow.document : T.merge([], t.childNodes)
      }
    }, function(i, r) {
      T.fn[i] = function(t, e) {
        var n = T.map(this, r, t);
        return "Until" !== i.slice(-5) && (e = t), e && "string" == typeof e && (n = T.filter(e, n)), 1 < this.length && (A[i] || (n = T.uniqueSort(n)), S.test(i) && (n = n.reverse())), this.pushStack(n)
      }
    });
    var N,
      O,
      j = /\S+/g;
    function D() {
      f.addEventListener ? (f.removeEventListener("DOMContentLoaded", q), k.removeEventListener("load", q)) : (f.detachEvent("onreadystatechange", q), k.detachEvent("onload", q))
    }
    function q() {
      (f.addEventListener || "load" === k.event.type || "complete" === f.readyState) && (D(), T.ready())
    }
    for (O in T.Callbacks = function(i) {
      var t,
        n;
      i = "string" == typeof i ? (t = i, n = {}, T.each(t.match(j) || [], function(t, e) {
        n[e] = !0
      }), n) : T.extend({}, i);
      var r,
        e,
        o,
        s,
        a = [],
        l = [],
        u = -1,
        c = function() {
          for (s = i.once, o = r = !0; l.length; u = -1)
            for (e = l.shift(); ++u < a.length;)
              !1 === a[u].apply(e[0], e[1]) && i.stopOnFalse && (u = a.length, e = !1);
          i.memory || (e = !1), r = !1, s && (a = e ? [] : "")
        },
        p = {
          add: function() {
            return a && (e && !r && (u = a.length - 1, l.push(e)), function n(t) {
              T.each(t, function(t, e) {
                T.isFunction(e) ? i.unique && p.has(e) || a.push(e) : e && e.length && "string" !== T.type(e) && n(e)
              })
            }(arguments), e && !r && c()), this
          },
          remove: function() {
            return T.each(arguments, function(t, e) {
              for (var n; -1 < (n = T.inArray(e, a, n));)
                a.splice(n, 1), n <= u && u--
            }), this
          },
          has: function(t) {
            return t ? -1 < T.inArray(t, a) : 0 < a.length
          },
          empty: function() {
            return a && (a = []), this
          },
          disable: function() {
            return s = l = [], a = e = "", this
          },
          disabled: function() {
            return !a
          },
          lock: function() {
            return s = !0, e || p.disable(), this
          },
          locked: function() {
            return !!s
          },
          fireWith: function(t, e) {
            return s || (e = [t, (e = e || []).slice ? e.slice() : e], l.push(e), r || c()), this
          },
          fire: function() {
            return p.fireWith(this, arguments), this
          },
          fired: function() {
            return !!o
          }
        };
      return p
    }, T.extend({
      Deferred: function(t) {
        var o = [["resolve", "done", T.Callbacks("once memory"), "resolved"], ["reject", "fail", T.Callbacks("once memory"), "rejected"], ["notify", "progress", T.Callbacks("memory")]],
          r = "pending",
          s = {
            state: function() {
              return r
            },
            always: function() {
              return a.done(arguments).fail(arguments), this
            },
            then: function() {
              var r = arguments;
              return T.Deferred(function(i) {
                T.each(o, function(t, e) {
                  var n = T.isFunction(r[t]) && r[t];
                  a[e[1]](function() {
                    var t = n && n.apply(this, arguments);
                    t && T.isFunction(t.promise) ? t.promise().progress(i.notify).done(i.resolve).fail(i.reject) : i[e[0] + "With"](this === s ? i.promise() : this, n ? [t] : arguments)
                  })
                }), r = null
              }).promise()
            },
            promise: function(t) {
              return null != t ? T.extend(t, s) : s
            }
          },
          a = {};
        return s.pipe = s.then, T.each(o, function(t, e) {
          var n = e[2],
            i = e[3];
          s[e[1]] = n.add, i && n.add(function() {
            r = i
          }, o[1 ^ t][2].disable, o[2][2].lock), a[e[0]] = function() {
            return a[e[0] + "With"](this === a ? s : this, arguments), this
          }, a[e[0] + "With"] = n.fireWith
        }), s.promise(a), t && t.call(a, a), a
      },
      when: function(t) {
        var r,
          e,
          n,
          i = 0,
          o = c.call(arguments),
          s = o.length,
          a = 1 !== s || t && T.isFunction(t.promise) ? s : 0,
          l = 1 === a ? t : T.Deferred(),
          u = function(e, n, i) {
            return function(t) {
              n[e] = this, i[e] = 1 < arguments.length ? c.call(arguments) : t, i === r ? l.notifyWith(n, i) : --a || l.resolveWith(n, i)
            }
          };
        if (1 < s)
          for (r = new Array(s), e = new Array(s), n = new Array(s); i < s; i++)
            o[i] && T.isFunction(o[i].promise) ? o[i].promise().progress(u(i, e, r)).done(u(i, n, o)).fail(l.reject) : --a;
        return a || l.resolveWith(n, o), l.promise()
      }
    }), T.fn.ready = function(t) {
      return T.ready.promise().done(t), this
    }, T.extend({
      isReady: !1,
      readyWait: 1,
      holdReady: function(t) {
        t ? T.readyWait++ : T.ready(!0)
      },
      ready: function(t) {
        (!0 === t ? --T.readyWait : T.isReady) || (T.isReady = !0) !== t && 0 < --T.readyWait || (N.resolveWith(f, [T]), T.fn.triggerHandler && (T(f).triggerHandler("ready"), T(f).off("ready")))
      }
    }), T.ready.promise = function(t) {
      if (!N)
        if (N = T.Deferred(), "complete" === f.readyState || "loading" !== f.readyState && !f.documentElement.doScroll)
          k.setTimeout(T.ready);
        else if (f.addEventListener)
          f.addEventListener("DOMContentLoaded", q), k.addEventListener("load", q);
        else {
          f.attachEvent("onreadystatechange", q), k.attachEvent("onload", q);
          var n = !1;
          try {
            n = null == k.frameElement && f.documentElement
          } catch (t) {}
          n && n.doScroll && function e() {
            if (!T.isReady) {
              try {
                n.doScroll("left")
              } catch (t) {
                return k.setTimeout(e, 50)
              }
              D(), T.ready()
            }
          }()
        }
      return N.promise(t)
    }, T.ready.promise(), T(v))
      break;
    v.ownFirst = "0" === O, v.inlineBlockNeedsLayout = !1, T(function() {
      var t,
        e,
        n,
        i;
      (n = f.getElementsByTagName("body")[0]) && n.style && (e = f.createElement("div"), (i = f.createElement("div")).style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(e), void 0 !== e.style.zoom && (e.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", v.inlineBlockNeedsLayout = t = 3 === e.offsetWidth, t && (n.style.zoom = 1)), n.removeChild(i))
    }), function() {
      var t = f.createElement("div");
      v.deleteExpando = !0;
      try {
        delete t.test
      } catch (t) {
        v.deleteExpando = !1
      }
      t = null
    }();
    var P,
      L = function(t) {
        var e = T.noData[(t.nodeName + " ").toLowerCase()],
          n = +t.nodeType || 1;
        return (1 === n || 9 === n) && (!e || !0 !== e && t.getAttribute("classid") === e)
      },
      H = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      M = /([A-Z])/g;
    function B(t, e, n) {
      if (void 0 === n && 1 === t.nodeType) {
        var i = "data-" + e.replace(M, "-$1").toLowerCase();
        if ("string" == typeof (n = t.getAttribute(i))) {
          try {
            n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : H.test(n) ? T.parseJSON(n) : n)
          } catch (t) {}
          T.data(t, e, n)
        } else
          n = void 0
      }
      return n
    }
    function R(t) {
      var e;
      for (e in t)
        if (("data" !== e || !T.isEmptyObject(t[e])) && "toJSON" !== e)
          return !1;
      return !0
    }
    function z(t, e, n, i) {
      if (L(t)) {
        var r,
          o,
          s = T.expando,
          a = t.nodeType,
          l = a ? T.cache : t,
          u = a ? t[s] : t[s] && s;
        if (u && l[u] && (i || l[u].data) || void 0 !== n || "string" != typeof e)
          return u || (u = a ? t[s] = p.pop() || T.guid++ : s), l[u] || (l[u] = a ? {} : {
            toJSON: T.noop
          }), "object" != typeof e && "function" != typeof e || (i ? l[u] = T.extend(l[u], e) : l[u].data = T.extend(l[u].data, e)), o = l[u], i || (o.data || (o.data = {}), o = o.data), void 0 !== n && (o[T.camelCase(e)] = n), "string" == typeof e ? null == (r = o[e]) && (r = o[T.camelCase(e)]) : r = o, r
      }
    }
    function F(t, e, n) {
      if (L(t)) {
        var i,
          r,
          o = t.nodeType,
          s = o ? T.cache : t,
          a = o ? t[T.expando] : T.expando;
        if (s[a]) {
          if (e && (i = n ? s[a] : s[a].data)) {
            r = (e = T.isArray(e) ? e.concat(T.map(e, T.camelCase)) : e in i ? [e] : (e = T.camelCase(e)) in i ? [e] : e.split(" ")).length;
            for (; r--;)
              delete i[e[r]];
            if (n ? !R(i) : !T.isEmptyObject(i))
              return
          }
          (n || (delete s[a].data, R(s[a]))) && (o ? T.cleanData([t], !0) : v.deleteExpando || s != s.window ? delete s[a] : s[a] = void 0)
        }
      }
    }
    T.extend({
      cache: {},
      noData: {
        "applet ": !0,
        "embed ": !0,
        "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
      },
      hasData: function(t) {
        return !!(t = t.nodeType ? T.cache[t[T.expando]] : t[T.expando]) && !R(t)
      },
      data: function(t, e, n) {
        return z(t, e, n)
      },
      removeData: function(t, e) {
        return F(t, e)
      },
      _data: function(t, e, n) {
        return z(t, e, n, !0)
      },
      _removeData: function(t, e) {
        return F(t, e, !0)
      }
    }), T.fn.extend({
      data: function(t, e) {
        var n,
          i,
          r,
          o = this[0],
          s = o && o.attributes;
        if (void 0 === t) {
          if (this.length && (r = T.data(o), 1 === o.nodeType && !T._data(o, "parsedAttrs"))) {
            for (n = s.length; n--;)
              s[n] && 0 === (i = s[n].name).indexOf("data-") && B(o, i = T.camelCase(i.slice(5)), r[i]);
            T._data(o, "parsedAttrs", !0)
          }
          return r
        }
        return "object" == typeof t ? this.each(function() {
          T.data(this, t)
        }) : 1 < arguments.length ? this.each(function() {
          T.data(this, t, e)
        }) : o ? B(o, t, T.data(o, t)) : void 0
      },
      removeData: function(t) {
        return this.each(function() {
          T.removeData(this, t)
        })
      }
    }), T.extend({
      queue: function(t, e, n) {
        var i;
        if (t)
          return e = (e || "fx") + "queue", i = T._data(t, e), n && (!i || T.isArray(n) ? i = T._data(t, e, T.makeArray(n)) : i.push(n)), i || []
      },
      dequeue: function(t, e) {
        e = e || "fx";
        var n = T.queue(t, e),
          i = n.length,
          r = n.shift(),
          o = T._queueHooks(t, e);
        "inprogress" === r && (r = n.shift(), i--), r && ("fx" === e && n.unshift("inprogress"), delete o.stop, r.call(t, function() {
          T.dequeue(t, e)
        }, o)), !i && o && o.empty.fire()
      },
      _queueHooks: function(t, e) {
        var n = e + "queueHooks";
        return T._data(t, n) || T._data(t, n, {
          empty: T.Callbacks("once memory").add(function() {
            T._removeData(t, e + "queue"), T._removeData(t, n)
          })
        })
      }
    }), T.fn.extend({
      queue: function(e, n) {
        var t = 2;
        return "string" != typeof e && (n = e, e = "fx", t--), arguments.length < t ? T.queue(this[0], e) : void 0 === n ? this : this.each(function() {
          var t = T.queue(this, e, n);
          T._queueHooks(this, e), "fx" === e && "inprogress" !== t[0] && T.dequeue(this, e)
        })
      },
      dequeue: function(t) {
        return this.each(function() {
          T.dequeue(this, t)
        })
      },
      clearQueue: function(t) {
        return this.queue(t || "fx", [])
      },
      promise: function(t, e) {
        var n,
          i = 1,
          r = T.Deferred(),
          o = this,
          s = this.length,
          a = function() {
            --i || r.resolveWith(o, [o])
          };
        for ("string" != typeof t && (e = t, t = void 0), t = t || "fx"; s--;)
          (n = T._data(o[s], t + "queueHooks")) && n.empty && (i++, n.empty.add(a));
        return a(), r.promise(e)
      }
    }), v.shrinkWrapBlocks = function() {
      return null != P ? P : (P = !1, (e = f.getElementsByTagName("body")[0]) && e.style ? (t = f.createElement("div"), (n = f.createElement("div")).style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", e.appendChild(n).appendChild(t), void 0 !== t.style.zoom && (t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", t.appendChild(f.createElement("div")).style.width = "5px", P = 3 !== t.offsetWidth), e.removeChild(n), P) : void 0);
      var t,
        e,
        n
    };
    var W = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
      $ = new RegExp("^(?:([+-])=|)(" + W + ")([a-z%]*)$", "i"),
      U = ["Top", "Right", "Bottom", "Left"],
      V = function(t, e) {
        return t = e || t, "none" === T.css(t, "display") || !T.contains(t.ownerDocument, t)
      };
    function X(t, e, n, i) {
      var r,
        o = 1,
        s = 20,
        a = i ? function() {
          return i.cur()
        } : function() {
          return T.css(t, e, "")
        },
        l = a(),
        u = n && n[3] || (T.cssNumber[e] ? "" : "px"),
        c = (T.cssNumber[e] || "px" !== u && +l) && $.exec(T.css(t, e));
      if (c && c[3] !== u)
        for (u = u || c[3], n = n || [], c = +l || 1; c /= o = o || ".5", T.style(t, e, c + u), o !== (o = a() / l) && 1 !== o && --s;)
          ;
      return n && (c = +c || +l || 0, r = n[1] ? c + (n[1] + 1) * n[2] : +n[2], i && (i.unit = u, i.start = c, i.end = r)), r
    }
    var G,
      Q,
      K,
      J = function(t, e, n, i, r, o, s) {
        var a = 0,
          l = t.length,
          u = null == n;
        if ("object" === T.type(n))
          for (a in r = !0, n)
            J(t, e, a, n[a], !0, o, s);
        else if (void 0 !== i && (r = !0, T.isFunction(i) || (s = !0), u && (s ? (e.call(t, i), e = null) : (u = e, e = function(t, e, n) {
          return u.call(T(t), n)
        })), e))
          for (; a < l; a++)
            e(t[a], n, s ? i : i.call(t[a], a, e(t[a], n)));
        return r ? t : u ? e.call(t) : l ? e(t[0], n) : o
      },
      Y = /^(?:checkbox|radio)$/i,
      Z = /<([\w:-]+)/,
      tt = /^$|\/(?:java|ecma)script/i,
      et = /^\s+/,
      nt = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";
    function it(t) {
      var e = nt.split("|"),
        n = t.createDocumentFragment();
      if (n.createElement)
        for (; e.length;)
          n.createElement(e.pop());
      return n
    }
    G = f.createElement("div"), Q = f.createDocumentFragment(), K = f.createElement("input"), G.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", v.leadingWhitespace = 3 === G.firstChild.nodeType, v.tbody = !G.getElementsByTagName("tbody").length, v.htmlSerialize = !!G.getElementsByTagName("link").length, v.html5Clone = "<:nav></:nav>" !== f.createElement("nav").cloneNode(!0).outerHTML, K.type = "checkbox", K.checked = !0, Q.appendChild(K), v.appendChecked = K.checked, G.innerHTML = "<textarea>x</textarea>", v.noCloneChecked = !!G.cloneNode(!0).lastChild.defaultValue, Q.appendChild(G), (K = f.createElement("input")).setAttribute("type", "radio"), K.setAttribute("checked", "checked"), K.setAttribute("name", "t"), G.appendChild(K), v.checkClone = G.cloneNode(!0).cloneNode(!0).lastChild.checked, v.noCloneEvent = !!G.addEventListener, G[T.expando] = 1, v.attributes = !G.getAttribute(T.expando);
    var rt = {
      option: [1, "<select multiple='multiple'>", "</select>"],
      legend: [1, "<fieldset>", "</fieldset>"],
      area: [1, "<map>", "</map>"],
      param: [1, "<object>", "</object>"],
      thead: [1, "<table>", "</table>"],
      tr: [2, "<table><tbody>", "</tbody></table>"],
      col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      _default: v.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
    };
    function ot(t, e) {
      var n,
        i,
        r = 0,
        o = void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e || "*") : void 0 !== t.querySelectorAll ? t.querySelectorAll(e || "*") : void 0;
      if (!o)
        for (o = [], n = t.childNodes || t; null != (i = n[r]); r++)
          !e || T.nodeName(i, e) ? o.push(i) : T.merge(o, ot(i, e));
      return void 0 === e || e && T.nodeName(t, e) ? T.merge([t], o) : o
    }
    function st(t, e) {
      for (var n, i = 0; null != (n = t[i]); i++)
        T._data(n, "globalEval", !e || T._data(e[i], "globalEval"))
    }
    rt.optgroup = rt.option, rt.tbody = rt.tfoot = rt.colgroup = rt.caption = rt.thead, rt.th = rt.td;
    var at = /<|&#?\w+;/,
      lt = /<tbody/i;
    function ut(t) {
      Y.test(t.type) && (t.defaultChecked = t.checked)
    }
    function ct(t, e, n, i, r) {
      for (var o, s, a, l, u, c, p, h = t.length, d = it(e), f = [], g = 0; g < h; g++)
        if ((s = t[g]) || 0 === s)
          if ("object" === T.type(s))
            T.merge(f, s.nodeType ? [s] : s);
          else if (at.test(s)) {
            for (l = l || d.appendChild(e.createElement("div")), u = (Z.exec(s) || ["", ""])[1].toLowerCase(), p = rt[u] || rt._default, l.innerHTML = p[1] + T.htmlPrefilter(s) + p[2], o = p[0]; o--;)
              l = l.lastChild;
            if (!v.leadingWhitespace && et.test(s) && f.push(e.createTextNode(et.exec(s)[0])), !v.tbody)
              for (o = (s = "table" !== u || lt.test(s) ? "<table>" !== p[1] || lt.test(s) ? 0 : l : l.firstChild) && s.childNodes.length; o--;)
                T.nodeName(c = s.childNodes[o], "tbody") && !c.childNodes.length && s.removeChild(c);
            for (T.merge(f, l.childNodes), l.textContent = ""; l.firstChild;)
              l.removeChild(l.firstChild);
            l = d.lastChild
          } else
            f.push(e.createTextNode(s));
      for (l && d.removeChild(l), v.appendChecked || T.grep(ot(f, "input"), ut), g = 0; s = f[g++];)
        if (i && -1 < T.inArray(s, i))
          r && r.push(s);
        else if (a = T.contains(s.ownerDocument, s), l = ot(d.appendChild(s), "script"), a && st(l), n)
          for (o = 0; s = l[o++];)
            tt.test(s.type || "") && n.push(s);
      return l = null, d
    }
    !function() {
      var t,
        e,
        n = f.createElement("div");
      for (t in {
        submit: !0,
        change: !0,
        focusin: !0
      })
        e = "on" + t, (v[t] = e in k) || (n.setAttribute(e, "t"), v[t] = !1 === n.attributes[e].expando);
      n = null
    }();
    var pt = /^(?:input|select|textarea)$/i,
      ht = /^key/,
      dt = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
      ft = /^(?:focusinfocus|focusoutblur)$/,
      gt = /^([^.]*)(?:\.(.+)|)/;
    function mt() {
      return !0
    }
    function vt() {
      return !1
    }
    function yt() {
      try {
        return f.activeElement
      } catch (t) {}
    }
    function bt(t, e, n, i, r, o) {
      var s,
        a;
      if ("object" == typeof e) {
        for (a in "string" != typeof n && (i = i || n, n = void 0), e)
          bt(t, a, n, i, e[a], o);
        return t
      }
      if (null == i && null == r ? (r = n, i = n = void 0) : null == r && ("string" == typeof n ? (r = i, i = void 0) : (r = i, i = n, n = void 0)), !1 === r)
        r = vt;
      else if (!r)
        return t;
      return 1 === o && (s = r, (r = function(t) {
        return T().off(t), s.apply(this, arguments)
      }).guid = s.guid || (s.guid = T.guid++)), t.each(function() {
        T.event.add(this, e, r, i, n)
      })
    }
    T.event = {
      global: {},
      add: function(t, e, n, i, r) {
        var o,
          s,
          a,
          l,
          u,
          c,
          p,
          h,
          d,
          f,
          g,
          m = T._data(t);
        if (m) {
          for (n.handler && (n = (l = n).handler, r = l.selector), n.guid || (n.guid = T.guid++), (s = m.events) || (s = m.events = {}), (c = m.handle) || ((c = m.handle = function(t) {
            return void 0 === T || t && T.event.triggered === t.type ? void 0 : T.event.dispatch.apply(c.elem, arguments)
          }).elem = t), a = (e = (e || "").match(j) || [""]).length; a--;)
            d = g = (o = gt.exec(e[a]) || [])[1], f = (o[2] || "").split(".").sort(), d && (u = T.event.special[d] || {}, d = (r ? u.delegateType : u.bindType) || d, u = T.event.special[d] || {}, p = T.extend({
              type: d,
              origType: g,
              data: i,
              handler: n,
              guid: n.guid,
              selector: r,
              needsContext: r && T.expr.match.needsContext.test(r),
              namespace: f.join(".")
            }, l), (h = s[d]) || ((h = s[d] = []).delegateCount = 0, u.setup && !1 !== u.setup.call(t, i, f, c) || (t.addEventListener ? t.addEventListener(d, c, !1) : t.attachEvent && t.attachEvent("on" + d, c))), u.add && (u.add.call(t, p), p.handler.guid || (p.handler.guid = n.guid)), r ? h.splice(h.delegateCount++, 0, p) : h.push(p), T.event.global[d] = !0);
          t = null
        }
      },
      remove: function(t, e, n, i, r) {
        var o,
          s,
          a,
          l,
          u,
          c,
          p,
          h,
          d,
          f,
          g,
          m = T.hasData(t) && T._data(t);
        if (m && (c = m.events)) {
          for (u = (e = (e || "").match(j) || [""]).length; u--;)
            if (d = g = (a = gt.exec(e[u]) || [])[1], f = (a[2] || "").split(".").sort(), d) {
              for (p = T.event.special[d] || {}, h = c[d = (i ? p.delegateType : p.bindType) || d] || [], a = a[2] && new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = o = h.length; o--;)
                s = h[o], !r && g !== s.origType || n && n.guid !== s.guid || a && !a.test(s.namespace) || i && i !== s.selector && ("**" !== i || !s.selector) || (h.splice(o, 1), s.selector && h.delegateCount--, p.remove && p.remove.call(t, s));
              l && !h.length && (p.teardown && !1 !== p.teardown.call(t, f, m.handle) || T.removeEvent(t, d, m.handle), delete c[d])
            } else
              for (d in c)
                T.event.remove(t, d + e[u], n, i, !0);
          T.isEmptyObject(c) && (delete m.handle, T._removeData(t, "events"))
        }
      },
      trigger: function(t, e, n, i) {
        var r,
          o,
          s,
          a,
          l,
          u,
          c,
          p = [n || f],
          h = m.call(t, "type") ? t.type : t,
          d = m.call(t, "namespace") ? t.namespace.split(".") : [];
        if (s = u = n = n || f, 3 !== n.nodeType && 8 !== n.nodeType && !ft.test(h + T.event.triggered) && (-1 < h.indexOf(".") && (h = (d = h.split(".")).shift(), d.sort()), o = h.indexOf(":") < 0 && "on" + h, (t = t[T.expando] ? t : new T.Event(h, "object" == typeof t && t)).isTrigger = i ? 2 : 3, t.namespace = d.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + d.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = n), e = null == e ? [t] : T.makeArray(e, [t]), l = T.event.special[h] || {}, i || !l.trigger || !1 !== l.trigger.apply(n, e))) {
          if (!i && !l.noBubble && !T.isWindow(n)) {
            for (a = l.delegateType || h, ft.test(a + h) || (s = s.parentNode); s; s = s.parentNode)
              p.push(s), u = s;
            u === (n.ownerDocument || f) && p.push(u.defaultView || u.parentWindow || k)
          }
          for (c = 0; (s = p[c++]) && !t.isPropagationStopped();)
            t.type = 1 < c ? a : l.bindType || h, (r = (T._data(s, "events") || {})[t.type] && T._data(s, "handle")) && r.apply(s, e), (r = o && s[o]) && r.apply && L(s) && (t.result = r.apply(s, e), !1 === t.result && t.preventDefault());
          if (t.type = h, !i && !t.isDefaultPrevented() && (!l._default || !1 === l._default.apply(p.pop(), e)) && L(n) && o && n[h] && !T.isWindow(n)) {
            (u = n[o]) && (n[o] = null), T.event.triggered = h;
            try {
              n[h]()
            } catch (t) {}
            T.event.triggered = void 0, u && (n[o] = u)
          }
          return t.result
        }
      },
      dispatch: function(t) {
        t = T.event.fix(t);
        var e,
          n,
          i,
          r,
          o,
          s,
          a = c.call(arguments),
          l = (T._data(this, "events") || {})[t.type] || [],
          u = T.event.special[t.type] || {};
        if ((a[0] = t).delegateTarget = this, !u.preDispatch || !1 !== u.preDispatch.call(this, t)) {
          for (s = T.event.handlers.call(this, t, l), e = 0; (r = s[e++]) && !t.isPropagationStopped();)
            for (t.currentTarget = r.elem, n = 0; (o = r.handlers[n++]) && !t.isImmediatePropagationStopped();)
              t.rnamespace && !t.rnamespace.test(o.namespace) || (t.handleObj = o, t.data = o.data, void 0 !== (i = ((T.event.special[o.origType] || {}).handle || o.handler).apply(r.elem, a)) && !1 === (t.result = i) && (t.preventDefault(), t.stopPropagation()));
          return u.postDispatch && u.postDispatch.call(this, t), t.result
        }
      },
      handlers: function(t, e) {
        var n,
          i,
          r,
          o,
          s = [],
          a = e.delegateCount,
          l = t.target;
        if (a && l.nodeType && ("click" !== t.type || isNaN(t.button) || t.button < 1))
          for (; l != this; l = l.parentNode || this)
            if (1 === l.nodeType && (!0 !== l.disabled || "click" !== t.type)) {
              for (i = [], n = 0; n < a; n++)
                void 0 === i[r = (o = e[n]).selector + " "] && (i[r] = o.needsContext ? -1 < T(r, this).index(l) : T.find(r, this, null, [l]).length), i[r] && i.push(o);
              i.length && s.push({
                elem: l,
                handlers: i
              })
            }
        return a < e.length && s.push({
          elem: this,
          handlers: e.slice(a)
        }), s
      },
      fix: function(t) {
        if (t[T.expando])
          return t;
        var e,
          n,
          i,
          r = t.type,
          o = t,
          s = this.fixHooks[r];
        for (s || (this.fixHooks[r] = s = dt.test(r) ? this.mouseHooks : ht.test(r) ? this.keyHooks : {}), i = s.props ? this.props.concat(s.props) : this.props, t = new T.Event(o), e = i.length; e--;)
          t[n = i[e]] = o[n];
        return t.target || (t.target = o.srcElement || f), 3 === t.target.nodeType && (t.target = t.target.parentNode), t.metaKey = !!t.metaKey, s.filter ? s.filter(t, o) : t
      },
      props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
      fixHooks: {},
      keyHooks: {
        props: "char charCode key keyCode".split(" "),
        filter: function(t, e) {
          return null == t.which && (t.which = null != e.charCode ? e.charCode : e.keyCode), t
        }
      },
      mouseHooks: {
        props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
        filter: function(t, e) {
          var n,
            i,
            r,
            o = e.button,
            s = e.fromElement;
          return null == t.pageX && null != e.clientX && (r = (i = t.target.ownerDocument || f).documentElement, n = i.body, t.pageX = e.clientX + (r && r.scrollLeft || n && n.scrollLeft || 0) - (r && r.clientLeft || n && n.clientLeft || 0), t.pageY = e.clientY + (r && r.scrollTop || n && n.scrollTop || 0) - (r && r.clientTop || n && n.clientTop || 0)), !t.relatedTarget && s && (t.relatedTarget = s === t.target ? e.toElement : s), t.which || void 0 === o || (t.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), t
        }
      },
      special: {
        load: {
          noBubble: !0
        },
        focus: {
          trigger: function() {
            if (this !== yt() && this.focus)
              try {
                return this.focus(), !1
              } catch (t) {}
          },
          delegateType: "focusin"
        },
        blur: {
          trigger: function() {
            if (this === yt() && this.blur)
              return this.blur(), !1
          },
          delegateType: "focusout"
        },
        click: {
          trigger: function() {
            if (T.nodeName(this, "input") && "checkbox" === this.type && this.click)
              return this.click(), !1
          },
          _default: function(t) {
            return T.nodeName(t.target, "a")
          }
        },
        beforeunload: {
          postDispatch: function(t) {
            void 0 !== t.result && t.originalEvent && (t.originalEvent.returnValue = t.result)
          }
        }
      },
      simulate: function(t, e, n) {
        var i = T.extend(new T.Event, n, {
          type: t,
          isSimulated: !0
        });
        T.event.trigger(i, null, e), i.isDefaultPrevented() && n.preventDefault()
      }
    }, T.removeEvent = f.removeEventListener ? function(t, e, n) {
      t.removeEventListener && t.removeEventListener(e, n)
    } : function(t, e, n) {
      var i = "on" + e;
      t.detachEvent && (void 0 === t[i] && (t[i] = null), t.detachEvent(i, n))
    }, T.Event = function(t, e) {
      if (!(this instanceof T.Event))
        return new T.Event(t, e);
      t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || void 0 === t.defaultPrevented && !1 === t.returnValue ? mt : vt) : this.type = t, e && T.extend(this, e), this.timeStamp = t && t.timeStamp || T.now(), this[T.expando] = !0
    }, T.Event.prototype = {
      constructor: T.Event,
      isDefaultPrevented: vt,
      isPropagationStopped: vt,
      isImmediatePropagationStopped: vt,
      preventDefault: function() {
        var t = this.originalEvent;
        this.isDefaultPrevented = mt, t && (t.preventDefault ? t.preventDefault() : t.returnValue = !1)
      },
      stopPropagation: function() {
        var t = this.originalEvent;
        this.isPropagationStopped = mt, t && !this.isSimulated && (t.stopPropagation && t.stopPropagation(), t.cancelBubble = !0)
      },
      stopImmediatePropagation: function() {
        var t = this.originalEvent;
        this.isImmediatePropagationStopped = mt, t && t.stopImmediatePropagation && t.stopImmediatePropagation(), this.stopPropagation()
      }
    }, T.each({
      mouseenter: "mouseover",
      mouseleave: "mouseout",
      pointerenter: "pointerover",
      pointerleave: "pointerout"
    }, function(t, r) {
      T.event.special[t] = {
        delegateType: r,
        bindType: r,
        handle: function(t) {
          var e,
            n = t.relatedTarget,
            i = t.handleObj;
          return n && (n === this || T.contains(this, n)) || (t.type = i.origType, e = i.handler.apply(this, arguments), t.type = r), e
        }
      }
    }), v.submit || (T.event.special.submit = {
      setup: function() {
        if (T.nodeName(this, "form"))
          return !1;
        T.event.add(this, "click._submit keypress._submit", function(t) {
          var e = t.target,
            n = T.nodeName(e, "input") || T.nodeName(e, "button") ? T.prop(e, "form") : void 0;
          n && !T._data(n, "submit") && (T.event.add(n, "submit._submit", function(t) {
            t._submitBubble = !0
          }), T._data(n, "submit", !0))
        })
      },
      postDispatch: function(t) {
        t._submitBubble && (delete t._submitBubble, this.parentNode && !t.isTrigger && T.event.simulate("submit", this.parentNode, t))
      },
      teardown: function() {
        if (T.nodeName(this, "form"))
          return !1;
        T.event.remove(this, "._submit")
      }
    }), v.change || (T.event.special.change = {
      setup: function() {
        if (pt.test(this.nodeName))
          return "checkbox" !== this.type && "radio" !== this.type || (T.event.add(this, "propertychange._change", function(t) {
            "checked" === t.originalEvent.propertyName && (this._justChanged = !0)
          }), T.event.add(this, "click._change", function(t) {
            this._justChanged && !t.isTrigger && (this._justChanged = !1), T.event.simulate("change", this, t)
          })), !1;
        T.event.add(this, "beforeactivate._change", function(t) {
          var e = t.target;
          pt.test(e.nodeName) && !T._data(e, "change") && (T.event.add(e, "change._change", function(t) {
            !this.parentNode || t.isSimulated || t.isTrigger || T.event.simulate("change", this.parentNode, t)
          }), T._data(e, "change", !0))
        })
      },
      handle: function(t) {
        var e = t.target;
        if (this !== e || t.isSimulated || t.isTrigger || "radio" !== e.type && "checkbox" !== e.type)
          return t.handleObj.handler.apply(this, arguments)
      },
      teardown: function() {
        return T.event.remove(this, "._change"), !pt.test(this.nodeName)
      }
    }), v.focusin || T.each({
      focus: "focusin",
      blur: "focusout"
    }, function(n, i) {
      var r = function(t) {
        T.event.simulate(i, t.target, T.event.fix(t))
      };
      T.event.special[i] = {
        setup: function() {
          var t = this.ownerDocument || this,
            e = T._data(t, i);
          e || t.addEventListener(n, r, !0), T._data(t, i, (e || 0) + 1)
        },
        teardown: function() {
          var t = this.ownerDocument || this,
            e = T._data(t, i) - 1;
          e ? T._data(t, i, e) : (t.removeEventListener(n, r, !0), T._removeData(t, i))
        }
      }
    }), T.fn.extend({
      on: function(t, e, n, i) {
        return bt(this, t, e, n, i)
      },
      one: function(t, e, n, i) {
        return bt(this, t, e, n, i, 1)
      },
      off: function(t, e, n) {
        var i,
          r;
        if (t && t.preventDefault && t.handleObj)
          return i = t.handleObj, T(t.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
        if ("object" == typeof t) {
          for (r in t)
            this.off(r, e, t[r]);
          return this
        }
        return !1 !== e && "function" != typeof e || (n = e, e = void 0), !1 === n && (n = vt), this.each(function() {
          T.event.remove(this, t, n, e)
        })
      },
      trigger: function(t, e) {
        return this.each(function() {
          T.event.trigger(t, e, this)
        })
      },
      triggerHandler: function(t, e) {
        var n = this[0];
        if (n)
          return T.event.trigger(t, e, n, !0)
      }
    });
    var xt = / jQuery\d+="(?:null|\d+)"/g,
      wt = new RegExp("<(?:" + nt + ")[\\s/>]", "i"),
      _t = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
      kt = /<script|<style|<link/i,
      Tt = /checked\s*(?:[^=]|=\s*.checked.)/i,
      Ct = /^true\/(.*)/,
      Et = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
      St = it(f).appendChild(f.createElement("div"));
    function At(t, e) {
      return T.nodeName(t, "table") && T.nodeName(11 !== e.nodeType ? e : e.firstChild, "tr") ? t.getElementsByTagName("tbody")[0] || t.appendChild(t.ownerDocument.createElement("tbody")) : t
    }
    function It(t) {
      return t.type = (null !== T.find.attr(t, "type")) + "/" + t.type, t
    }
    function Nt(t) {
      var e = Ct.exec(t.type);
      return e ? t.type = e[1] : t.removeAttribute("type"), t
    }
    function Ot(t, e) {
      if (1 === e.nodeType && T.hasData(t)) {
        var n,
          i,
          r,
          o = T._data(t),
          s = T._data(e, o),
          a = o.events;
        if (a)
          for (n in delete s.handle, s.events = {}, a)
            for (i = 0, r = a[n].length; i < r; i++)
              T.event.add(e, n, a[n][i]);
        s.data && (s.data = T.extend({}, s.data))
      }
    }
    function jt(t, e) {
      var n,
        i,
        r;
      if (1 === e.nodeType) {
        if (n = e.nodeName.toLowerCase(), !v.noCloneEvent && e[T.expando]) {
          for (i in (r = T._data(e)).events)
            T.removeEvent(e, i, r.handle);
          e.removeAttribute(T.expando)
        }
        "script" === n && e.text !== t.text ? (It(e).text = t.text, Nt(e)) : "object" === n ? (e.parentNode && (e.outerHTML = t.outerHTML), v.html5Clone && t.innerHTML && !T.trim(e.innerHTML) && (e.innerHTML = t.innerHTML)) : "input" === n && Y.test(t.type) ? (e.defaultChecked = e.checked = t.checked, e.value !== t.value && (e.value = t.value)) : "option" === n ? e.defaultSelected = e.selected = t.defaultSelected : "input" !== n && "textarea" !== n || (e.defaultValue = t.defaultValue)
      }
    }
    function Dt(n, i, r, o) {
      i = g.apply([], i);
      var t,
        e,
        s,
        a,
        l,
        u,
        c = 0,
        p = n.length,
        h = p - 1,
        d = i[0],
        f = T.isFunction(d);
      if (f || 1 < p && "string" == typeof d && !v.checkClone && Tt.test(d))
        return n.each(function(t) {
          var e = n.eq(t);
          f && (i[0] = d.call(this, t, e.html())), Dt(e, i, r, o)
        });
      if (p && (t = (u = ct(i, n[0].ownerDocument, !1, n, o)).firstChild, 1 === u.childNodes.length && (u = t), t || o)) {
        for (s = (a = T.map(ot(u, "script"), It)).length; c < p; c++)
          e = u, c !== h && (e = T.clone(e, !0, !0), s && T.merge(a, ot(e, "script"))), r.call(n[c], e, c);
        if (s)
          for (l = a[a.length - 1].ownerDocument, T.map(a, Nt), c = 0; c < s; c++)
            e = a[c], tt.test(e.type || "") && !T._data(e, "globalEval") && T.contains(l, e) && (e.src ? T._evalUrl && T._evalUrl(e.src) : T.globalEval((e.text || e.textContent || e.innerHTML || "").replace(Et, "")));
        u = t = null
      }
      return n
    }
    function qt(t, e, n) {
      for (var i, r = e ? T.filter(e, t) : t, o = 0; null != (i = r[o]); o++)
        n || 1 !== i.nodeType || T.cleanData(ot(i)), i.parentNode && (n && T.contains(i.ownerDocument, i) && st(ot(i, "script")), i.parentNode.removeChild(i));
      return t
    }
    T.extend({
      htmlPrefilter: function(t) {
        return t.replace(_t, "<$1></$2>")
      },
      clone: function(t, e, n) {
        var i,
          r,
          o,
          s,
          a,
          l = T.contains(t.ownerDocument, t);
        if (v.html5Clone || T.isXMLDoc(t) || !wt.test("<" + t.nodeName + ">") ? o = t.cloneNode(!0) : (St.innerHTML = t.outerHTML, St.removeChild(o = St.firstChild)), !(v.noCloneEvent && v.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || T.isXMLDoc(t)))
          for (i = ot(o), a = ot(t), s = 0; null != (r = a[s]); ++s)
            i[s] && jt(r, i[s]);
        if (e)
          if (n)
            for (a = a || ot(t), i = i || ot(o), s = 0; null != (r = a[s]); s++)
              Ot(r, i[s]);
          else
            Ot(t, o);
        return 0 < (i = ot(o, "script")).length && st(i, !l && ot(t, "script")), i = a = r = null, o
      },
      cleanData: function(t, e) {
        for (var n, i, r, o, s = 0, a = T.expando, l = T.cache, u = v.attributes, c = T.event.special; null != (n = t[s]); s++)
          if ((e || L(n)) && (o = (r = n[a]) && l[r])) {
            if (o.events)
              for (i in o.events)
                c[i] ? T.event.remove(n, i) : T.removeEvent(n, i, o.handle);
            l[r] && (delete l[r], u || void 0 === n.removeAttribute ? n[a] = void 0 : n.removeAttribute(a), p.push(r))
          }
      }
    }), T.fn.extend({
      domManip: Dt,
      detach: function(t) {
        return qt(this, t, !0)
      },
      remove: function(t) {
        return qt(this, t)
      },
      text: function(t) {
        return J(this, function(t) {
          return void 0 === t ? T.text(this) : this.empty().append((this[0] && this[0].ownerDocument || f).createTextNode(t))
        }, null, t, arguments.length)
      },
      append: function() {
        return Dt(this, arguments, function(t) {
          1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || At(this, t).appendChild(t)
        })
      },
      prepend: function() {
        return Dt(this, arguments, function(t) {
          if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
            var e = At(this, t);
            e.insertBefore(t, e.firstChild)
          }
        })
      },
      before: function() {
        return Dt(this, arguments, function(t) {
          this.parentNode && this.parentNode.insertBefore(t, this)
        })
      },
      after: function() {
        return Dt(this, arguments, function(t) {
          this.parentNode && this.parentNode.insertBefore(t, this.nextSibling)
        })
      },
      empty: function() {
        for (var t, e = 0; null != (t = this[e]); e++) {
          for (1 === t.nodeType && T.cleanData(ot(t, !1)); t.firstChild;)
            t.removeChild(t.firstChild);
          t.options && T.nodeName(t, "select") && (t.options.length = 0)
        }
        return this
      },
      clone: function(t, e) {
        return t = null != t && t, e = null == e ? t : e, this.map(function() {
          return T.clone(this, t, e)
        })
      },
      html: function(t) {
        return J(this, function(t) {
          var e = this[0] || {},
            n = 0,
            i = this.length;
          if (void 0 === t)
            return 1 === e.nodeType ? e.innerHTML.replace(xt, "") : void 0;
          if ("string" == typeof t && !kt.test(t) && (v.htmlSerialize || !wt.test(t)) && (v.leadingWhitespace || !et.test(t)) && !rt[(Z.exec(t) || ["", ""])[1].toLowerCase()]) {
            t = T.htmlPrefilter(t);
            try {
              for (; n < i; n++)
                1 === (e = this[n] || {}).nodeType && (T.cleanData(ot(e, !1)), e.innerHTML = t);
              e = 0
            } catch (t) {}
          }
          e && this.empty().append(t)
        }, null, t, arguments.length)
      },
      replaceWith: function() {
        var n = [];
        return Dt(this, arguments, function(t) {
          var e = this.parentNode;
          T.inArray(this, n) < 0 && (T.cleanData(ot(this)), e && e.replaceChild(t, this))
        }, n)
      }
    }), T.each({
      appendTo: "append",
      prependTo: "prepend",
      insertBefore: "before",
      insertAfter: "after",
      replaceAll: "replaceWith"
    }, function(t, s) {
      T.fn[t] = function(t) {
        for (var e, n = 0, i = [], r = T(t), o = r.length - 1; n <= o; n++)
          e = n === o ? this : this.clone(!0), T(r[n])[s](e), a.apply(i, e.get());
        return this.pushStack(i)
      }
    });
    var Pt,
      Lt = {
        HTML: "block",
        BODY: "block"
      };
    function Ht(t, e) {
      var n = T(e.createElement(t)).appendTo(e.body),
        i = T.css(n[0], "display");
      return n.detach(), i
    }
    function Mt(t) {
      var e = f,
        n = Lt[t];
      return n || ("none" !== (n = Ht(t, e)) && n || ((e = ((Pt = (Pt || T("<iframe frameborder='0' width='0' height='0'/>")).appendTo(e.documentElement))[0].contentWindow || Pt[0].contentDocument).document).write(), e.close(), n = Ht(t, e), Pt.detach()), Lt[t] = n), n
    }
    var Bt = /^margin/,
      Rt = new RegExp("^(" + W + ")(?!px)[a-z%]+$", "i"),
      zt = function(t, e, n, i) {
        var r,
          o,
          s = {};
        for (o in e)
          s[o] = t.style[o], t.style[o] = e[o];
        for (o in r = n.apply(t, i || []), e)
          t.style[o] = s[o];
        return r
      },
      Ft = f.documentElement;
    !function() {
      var i,
        r,
        o,
        s,
        a,
        l,
        u = f.createElement("div"),
        c = f.createElement("div");
      function t() {
        var t,
          e,
          n = f.documentElement;
        n.appendChild(u), c.style.cssText = "-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", i = o = l = !1, r = a = !0, k.getComputedStyle && (e = k.getComputedStyle(c), i = "1%" !== (e || {}).top, l = "2px" === (e || {}).marginLeft, o = "4px" === (e || {
          width: "4px"
        }).width, c.style.marginRight = "50%", r = "4px" === (e || {
          marginRight: "4px"
        }).marginRight, (t = c.appendChild(f.createElement("div"))).style.cssText = c.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", t.style.marginRight = t.style.width = "0", c.style.width = "1px", a = !parseFloat((k.getComputedStyle(t) || {}).marginRight), c.removeChild(t)), c.style.display = "none", (s = 0 === c.getClientRects().length) && (c.style.display = "", c.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", c.childNodes[0].style.borderCollapse = "separate", (t = c.getElementsByTagName("td"))[0].style.cssText = "margin:0;border:0;padding:0;display:none", (s = 0 === t[0].offsetHeight) && (t[0].style.display = "", t[1].style.display = "none", s = 0 === t[0].offsetHeight)), n.removeChild(u)
      }
      c.style && (c.style.cssText = "float:left;opacity:.5", v.opacity = "0.5" === c.style.opacity, v.cssFloat = !!c.style.cssFloat, c.style.backgroundClip = "content-box", c.cloneNode(!0).style.backgroundClip = "", v.clearCloneStyle = "content-box" === c.style.backgroundClip, (u = f.createElement("div")).style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", c.innerHTML = "", u.appendChild(c), v.boxSizing = "" === c.style.boxSizing || "" === c.style.MozBoxSizing || "" === c.style.WebkitBoxSizing, T.extend(v, {
        reliableHiddenOffsets: function() {
          return null == i && t(), s
        },
        boxSizingReliable: function() {
          return null == i && t(), o
        },
        pixelMarginRight: function() {
          return null == i && t(), r
        },
        pixelPosition: function() {
          return null == i && t(), i
        },
        reliableMarginRight: function() {
          return null == i && t(), a
        },
        reliableMarginLeft: function() {
          return null == i && t(), l
        }
      }))
    }();
    var Wt,
      $t,
      Ut = /^(top|right|bottom|left)$/;
    function Vt(t, e) {
      return {
        get: function() {
          if (!t())
            return (this.get = e).apply(this, arguments);
          delete this.get
        }
      }
    }
    k.getComputedStyle ? (Wt = function(t) {
      var e = t.ownerDocument.defaultView;
      return e && e.opener || (e = k), e.getComputedStyle(t)
    }, $t = function(t, e, n) {
      var i,
        r,
        o,
        s,
        a = t.style;
      return "" !== (s = (n = n || Wt(t)) ? n.getPropertyValue(e) || n[e] : void 0) && void 0 !== s || T.contains(t.ownerDocument, t) || (s = T.style(t, e)), n && !v.pixelMarginRight() && Rt.test(s) && Bt.test(e) && (i = a.width, r = a.minWidth, o = a.maxWidth, a.minWidth = a.maxWidth = a.width = s, s = n.width, a.width = i, a.minWidth = r, a.maxWidth = o), void 0 === s ? s : s + ""
    }) : Ft.currentStyle && (Wt = function(t) {
      return t.currentStyle
    }, $t = function(t, e, n) {
      var i,
        r,
        o,
        s,
        a = t.style;
      return null == (s = (n = n || Wt(t)) ? n[e] : void 0) && a && a[e] && (s = a[e]), Rt.test(s) && !Ut.test(e) && (i = a.left, (o = (r = t.runtimeStyle) && r.left) && (r.left = t.currentStyle.left), a.left = "fontSize" === e ? "1em" : s, s = a.pixelLeft + "px", a.left = i, o && (r.left = o)), void 0 === s ? s : s + "" || "auto"
    });
    var Xt = /alpha\([^)]*\)/i,
      Gt = /opacity\s*=\s*([^)]*)/i,
      Qt = /^(none|table(?!-c[ea]).+)/,
      Kt = new RegExp("^(" + W + ")(.*)$", "i"),
      Jt = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
      },
      Yt = {
        letterSpacing: "0",
        fontWeight: "400"
      },
      Zt = ["Webkit", "O", "Moz", "ms"],
      te = f.createElement("div").style;
    function ee(t) {
      if (t in te)
        return t;
      for (var e = t.charAt(0).toUpperCase() + t.slice(1), n = Zt.length; n--;)
        if ((t = Zt[n] + e) in te)
          return t
    }
    function ne(t, e) {
      for (var n, i, r, o = [], s = 0, a = t.length; s < a; s++)
        (i = t[s]).style && (o[s] = T._data(i, "olddisplay"), n = i.style.display, e ? (o[s] || "none" !== n || (i.style.display = ""), "" === i.style.display && V(i) && (o[s] = T._data(i, "olddisplay", Mt(i.nodeName)))) : (r = V(i), (n && "none" !== n || !r) && T._data(i, "olddisplay", r ? n : T.css(i, "display"))));
      for (s = 0; s < a; s++)
        (i = t[s]).style && (e && "none" !== i.style.display && "" !== i.style.display || (i.style.display = e ? o[s] || "" : "none"));
      return t
    }
    function ie(t, e, n) {
      var i = Kt.exec(e);
      return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : e
    }
    function re(t, e, n, i, r) {
      for (var o = n === (i ? "border" : "content") ? 4 : "width" === e ? 1 : 0, s = 0; o < 4; o += 2)
        "margin" === n && (s += T.css(t, n + U[o], !0, r)), i ? ("content" === n && (s -= T.css(t, "padding" + U[o], !0, r)), "margin" !== n && (s -= T.css(t, "border" + U[o] + "Width", !0, r))) : (s += T.css(t, "padding" + U[o], !0, r), "padding" !== n && (s += T.css(t, "border" + U[o] + "Width", !0, r)));
      return s
    }
    function oe(t, e, n) {
      var i = !0,
        r = "width" === e ? t.offsetWidth : t.offsetHeight,
        o = Wt(t),
        s = v.boxSizing && "border-box" === T.css(t, "boxSizing", !1, o);
      if (r <= 0 || null == r) {
        if (((r = $t(t, e, o)) < 0 || null == r) && (r = t.style[e]), Rt.test(r))
          return r;
        i = s && (v.boxSizingReliable() || r === t.style[e]), r = parseFloat(r) || 0
      }
      return r + re(t, e, n || (s ? "border" : "content"), i, o) + "px"
    }
    function se(t, e, n, i, r) {
      return new se.prototype.init(t, e, n, i, r)
    }
    T.extend({
      cssHooks: {
        opacity: {
          get: function(t, e) {
            if (e) {
              var n = $t(t, "opacity");
              return "" === n ? "1" : n
            }
          }
        }
      },
      cssNumber: {
        animationIterationCount: !0,
        columnCount: !0,
        fillOpacity: !0,
        flexGrow: !0,
        flexShrink: !0,
        fontWeight: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0
      },
      cssProps: {
        float: v.cssFloat ? "cssFloat" : "styleFloat"
      },
      style: function(t, e, n, i) {
        if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
          var r,
            o,
            s,
            a = T.camelCase(e),
            l = t.style;
          if (e = T.cssProps[a] || (T.cssProps[a] = ee(a) || a), s = T.cssHooks[e] || T.cssHooks[a], void 0 === n)
            return s && "get" in s && void 0 !== (r = s.get(t, !1, i)) ? r : l[e];
          if ("string" == (o = typeof n) && (r = $.exec(n)) && r[1] && (n = X(t, e, r), o = "number"), null != n && n == n && ("number" === o && (n += r && r[3] || (T.cssNumber[a] ? "" : "px")), v.clearCloneStyle || "" !== n || 0 !== e.indexOf("background") || (l[e] = "inherit"), !(s && "set" in s && void 0 === (n = s.set(t, n, i)))))
            try {
              l[e] = n
            } catch (t) {}
        }
      },
      css: function(t, e, n, i) {
        var r,
          o,
          s,
          a = T.camelCase(e);
        return e = T.cssProps[a] || (T.cssProps[a] = ee(a) || a), (s = T.cssHooks[e] || T.cssHooks[a]) && "get" in s && (o = s.get(t, !0, n)), void 0 === o && (o = $t(t, e, i)), "normal" === o && e in Yt && (o = Yt[e]), "" === n || n ? (r = parseFloat(o), !0 === n || isFinite(r) ? r || 0 : o) : o
      }
    }), T.each(["height", "width"], function(t, r) {
      T.cssHooks[r] = {
        get: function(t, e, n) {
          if (e)
            return Qt.test(T.css(t, "display")) && 0 === t.offsetWidth ? zt(t, Jt, function() {
              return oe(t, r, n)
            }) : oe(t, r, n)
        },
        set: function(t, e, n) {
          var i = n && Wt(t);
          return ie(0, e, n ? re(t, r, n, v.boxSizing && "border-box" === T.css(t, "boxSizing", !1, i), i) : 0)
        }
      }
    }), v.opacity || (T.cssHooks.opacity = {
      get: function(t, e) {
        return Gt.test((e && t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : e ? "1" : ""
      },
      set: function(t, e) {
        var n = t.style,
          i = t.currentStyle,
          r = T.isNumeric(e) ? "alpha(opacity=" + 100 * e + ")" : "",
          o = i && i.filter || n.filter || "";
        ((n.zoom = 1) <= e || "" === e) && "" === T.trim(o.replace(Xt, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === e || i && !i.filter) || (n.filter = Xt.test(o) ? o.replace(Xt, r) : o + " " + r)
      }
    }), T.cssHooks.marginRight = Vt(v.reliableMarginRight, function(t, e) {
      if (e)
        return zt(t, {
          display: "inline-block"
        }, $t, [t, "marginRight"])
    }), T.cssHooks.marginLeft = Vt(v.reliableMarginLeft, function(t, e) {
      if (e)
        return (parseFloat($t(t, "marginLeft")) || (T.contains(t.ownerDocument, t) ? t.getBoundingClientRect().left - zt(t, {
          marginLeft: 0
        }, function() {
          return t.getBoundingClientRect().left
        }) : 0)) + "px"
    }), T.each({
      margin: "",
      padding: "",
      border: "Width"
    }, function(r, o) {
      T.cssHooks[r + o] = {
        expand: function(t) {
          for (var e = 0, n = {}, i = "string" == typeof t ? t.split(" ") : [t]; e < 4; e++)
            n[r + U[e] + o] = i[e] || i[e - 2] || i[0];
          return n
        }
      }, Bt.test(r) || (T.cssHooks[r + o].set = ie)
    }), T.fn.extend({
      css: function(t, e) {
        return J(this, function(t, e, n) {
          var i,
            r,
            o = {},
            s = 0;
          if (T.isArray(e)) {
            for (i = Wt(t), r = e.length; s < r; s++)
              o[e[s]] = T.css(t, e[s], !1, i);
            return o
          }
          return void 0 !== n ? T.style(t, e, n) : T.css(t, e)
        }, t, e, 1 < arguments.length)
      },
      show: function() {
        return ne(this, !0)
      },
      hide: function() {
        return ne(this)
      },
      toggle: function(t) {
        return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each(function() {
          V(this) ? T(this).show() : T(this).hide()
        })
      }
    }), ((T.Tween = se).prototype = {
      constructor: se,
      init: function(t, e, n, i, r, o) {
        this.elem = t, this.prop = n, this.easing = r || T.easing._default, this.options = e, this.start = this.now = this.cur(), this.end = i, this.unit = o || (T.cssNumber[n] ? "" : "px")
      },
      cur: function() {
        var t = se.propHooks[this.prop];
        return t && t.get ? t.get(this) : se.propHooks._default.get(this)
      },
      run: function(t) {
        var e,
          n = se.propHooks[this.prop];
        return this.options.duration ? this.pos = e = T.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : this.pos = e = t, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : se.propHooks._default.set(this), this
      }
    }).init.prototype = se.prototype, (se.propHooks = {
      _default: {
        get: function(t) {
          var e;
          return 1 !== t.elem.nodeType || null != t.elem[t.prop] && null == t.elem.style[t.prop] ? t.elem[t.prop] : (e = T.css(t.elem, t.prop, "")) && "auto" !== e ? e : 0
        },
        set: function(t) {
          T.fx.step[t.prop] ? T.fx.step[t.prop](t) : 1 !== t.elem.nodeType || null == t.elem.style[T.cssProps[t.prop]] && !T.cssHooks[t.prop] ? t.elem[t.prop] = t.now : T.style(t.elem, t.prop, t.now + t.unit)
        }
      }
    }).scrollTop = se.propHooks.scrollLeft = {
      set: function(t) {
        t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
      }
    }, T.easing = {
      linear: function(t) {
        return t
      },
      swing: function(t) {
        return .5 - Math.cos(t * Math.PI) / 2
      },
      _default: "swing"
    }, T.fx = se.prototype.init, T.fx.step = {};
    var ae,
      le,
      ue,
      ce,
      pe,
      he,
      de,
      fe = /^(?:toggle|show|hide)$/,
      ge = /queueHooks$/;
    function me() {
      return k.setTimeout(function() {
        ae = void 0
      }), ae = T.now()
    }
    function ve(t, e) {
      var n,
        i = {
          height: t
        },
        r = 0;
      for (e = e ? 1 : 0; r < 4; r += 2 - e)
        i["margin" + (n = U[r])] = i["padding" + n] = t;
      return e && (i.opacity = i.width = t), i
    }
    function ye(t, e, n) {
      for (var i, r = (be.tweeners[e] || []).concat(be.tweeners["*"]), o = 0, s = r.length; o < s; o++)
        if (i = r[o].call(n, e, t))
          return i
    }
    function be(o, t, e) {
      var n,
        s,
        i = 0,
        r = be.prefilters.length,
        a = T.Deferred().always(function() {
          delete l.elem
        }),
        l = function() {
          if (s)
            return !1;
          for (var t = ae || me(), e = Math.max(0, u.startTime + u.duration - t), n = 1 - (e / u.duration || 0), i = 0, r = u.tweens.length; i < r; i++)
            u.tweens[i].run(n);
          return a.notifyWith(o, [u, n, e]), n < 1 && r ? e : (a.resolveWith(o, [u]), !1)
        },
        u = a.promise({
          elem: o,
          props: T.extend({}, t),
          opts: T.extend(!0, {
            specialEasing: {},
            easing: T.easing._default
          }, e),
          originalProperties: t,
          originalOptions: e,
          startTime: ae || me(),
          duration: e.duration,
          tweens: [],
          createTween: function(t, e) {
            var n = T.Tween(o, u.opts, t, e, u.opts.specialEasing[t] || u.opts.easing);
            return u.tweens.push(n), n
          },
          stop: function(t) {
            var e = 0,
              n = t ? u.tweens.length : 0;
            if (s)
              return this;
            for (s = !0; e < n; e++)
              u.tweens[e].run(1);
            return t ? (a.notifyWith(o, [u, 1, 0]), a.resolveWith(o, [u, t])) : a.rejectWith(o, [u, t]), this
          }
        }),
        c = u.props;
      for (function(t, e) {
        var n,
          i,
          r,
          o,
          s;
        for (n in t)
          if (r = e[i = T.camelCase(n)], o = t[n], T.isArray(o) && (r = o[1], o = t[n] = o[0]), n !== i && (t[i] = o, delete t[n]), (s = T.cssHooks[i]) && "expand" in s)
            for (n in o = s.expand(o), delete t[i], o)
              n in t || (t[n] = o[n], e[n] = r);
          else
            e[i] = r
      }(c, u.opts.specialEasing); i < r; i++)
        if (n = be.prefilters[i].call(u, o, c, u.opts))
          return T.isFunction(n.stop) && (T._queueHooks(u.elem, u.opts.queue).stop = T.proxy(n.stop, n)), n;
      return T.map(c, ye, u), T.isFunction(u.opts.start) && u.opts.start.call(o, u), T.fx.timer(T.extend(l, {
        elem: o,
        anim: u,
        queue: u.opts.queue
      })), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
    }
    T.Animation = T.extend(be, {
      tweeners: {
        "*": [function(t, e) {
          var n = this.createTween(t, e);
          return X(n.elem, t, $.exec(e), n), n
        }]
      },
      tweener: function(t, e) {
        T.isFunction(t) ? (e = t, t = ["*"]) : t = t.match(j);
        for (var n, i = 0, r = t.length; i < r; i++)
          n = t[i], be.tweeners[n] = be.tweeners[n] || [], be.tweeners[n].unshift(e)
      },
      prefilters: [function(e, t, n) {
        var i,
          r,
          o,
          s,
          a,
          l,
          u,
          c = this,
          p = {},
          h = e.style,
          d = e.nodeType && V(e),
          f = T._data(e, "fxshow");
        for (i in n.queue || (null == (a = T._queueHooks(e, "fx")).unqueued && (a.unqueued = 0, l = a.empty.fire, a.empty.fire = function() {
          a.unqueued || l()
        }), a.unqueued++, c.always(function() {
          c.always(function() {
            a.unqueued--, T.queue(e, "fx").length || a.empty.fire()
          })
        })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [h.overflow, h.overflowX, h.overflowY], "inline" === ("none" === (u = T.css(e, "display")) ? T._data(e, "olddisplay") || Mt(e.nodeName) : u) && "none" === T.css(e, "float") && (v.inlineBlockNeedsLayout && "inline" !== Mt(e.nodeName) ? h.zoom = 1 : h.display = "inline-block")), n.overflow && (h.overflow = "hidden", v.shrinkWrapBlocks() || c.always(function() {
          h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2]
        })), t)
          if (r = t[i], fe.exec(r)) {
            if (delete t[i], o = o || "toggle" === r, r === (d ? "hide" : "show")) {
              if ("show" !== r || !f || void 0 === f[i])
                continue;
              d = !0
            }
            p[i] = f && f[i] || T.style(e, i)
          } else
            u = void 0;
        if (T.isEmptyObject(p))
          "inline" === ("none" === u ? Mt(e.nodeName) : u) && (h.display = u);
        else
          for (i in f ? "hidden" in f && (d = f.hidden) : f = T._data(e, "fxshow", {}), o && (f.hidden = !d), d ? T(e).show() : c.done(function() {
            T(e).hide()
          }), c.done(function() {
            var t;
            for (t in T._removeData(e, "fxshow"), p)
              T.style(e, t, p[t])
          }), p)
            s = ye(d ? f[i] : 0, i, c), i in f || (f[i] = s.start, d && (s.end = s.start, s.start = "width" === i || "height" === i ? 1 : 0))
      }],
      prefilter: function(t, e) {
        e ? be.prefilters.unshift(t) : be.prefilters.push(t)
      }
    }), T.speed = function(t, e, n) {
      var i = t && "object" == typeof t ? T.extend({}, t) : {
        complete: n || !n && e || T.isFunction(t) && t,
        duration: t,
        easing: n && e || e && !T.isFunction(e) && e
      };
      return i.duration = T.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in T.fx.speeds ? T.fx.speeds[i.duration] : T.fx.speeds._default, null != i.queue && !0 !== i.queue || (i.queue = "fx"), i.old = i.complete, i.complete = function() {
        T.isFunction(i.old) && i.old.call(this), i.queue && T.dequeue(this, i.queue)
      }, i
    }, T.fn.extend({
      fadeTo: function(t, e, n, i) {
        return this.filter(V).css("opacity", 0).show().end().animate({
          opacity: e
        }, t, n, i)
      },
      animate: function(e, t, n, i) {
        var r = T.isEmptyObject(e),
          o = T.speed(t, n, i),
          s = function() {
            var t = be(this, T.extend({}, e), o);
            (r || T._data(this, "finish")) && t.stop(!0)
          };
        return s.finish = s, r || !1 === o.queue ? this.each(s) : this.queue(o.queue, s)
      },
      stop: function(r, t, o) {
        var s = function(t) {
          var e = t.stop;
          delete t.stop, e(o)
        };
        return "string" != typeof r && (o = t, t = r, r = void 0), t && !1 !== r && this.queue(r || "fx", []), this.each(function() {
          var t = !0,
            e = null != r && r + "queueHooks",
            n = T.timers,
            i = T._data(this);
          if (e)
            i[e] && i[e].stop && s(i[e]);
          else
            for (e in i)
              i[e] && i[e].stop && ge.test(e) && s(i[e]);
          for (e = n.length; e--;)
            n[e].elem !== this || null != r && n[e].queue !== r || (n[e].anim.stop(o), t = !1, n.splice(e, 1));
          !t && o || T.dequeue(this, r)
        })
      },
      finish: function(s) {
        return !1 !== s && (s = s || "fx"), this.each(function() {
          var t,
            e = T._data(this),
            n = e[s + "queue"],
            i = e[s + "queueHooks"],
            r = T.timers,
            o = n ? n.length : 0;
          for (e.finish = !0, T.queue(this, s, []), i && i.stop && i.stop.call(this, !0), t = r.length; t--;)
            r[t].elem === this && r[t].queue === s && (r[t].anim.stop(!0), r.splice(t, 1));
          for (t = 0; t < o; t++)
            n[t] && n[t].finish && n[t].finish.call(this);
          delete e.finish
        })
      }
    }), T.each(["toggle", "show", "hide"], function(t, i) {
      var r = T.fn[i];
      T.fn[i] = function(t, e, n) {
        return null == t || "boolean" == typeof t ? r.apply(this, arguments) : this.animate(ve(i, !0), t, e, n)
      }
    }), T.each({
      slideDown: ve("show"),
      slideUp: ve("hide"),
      slideToggle: ve("toggle"),
      fadeIn: {
        opacity: "show"
      },
      fadeOut: {
        opacity: "hide"
      },
      fadeToggle: {
        opacity: "toggle"
      }
    }, function(t, i) {
      T.fn[t] = function(t, e, n) {
        return this.animate(i, t, e, n)
      }
    }), T.timers = [], T.fx.tick = function() {
      var t,
        e = T.timers,
        n = 0;
      for (ae = T.now(); n < e.length; n++)
        (t = e[n])() || e[n] !== t || e.splice(n--, 1);
      e.length || T.fx.stop(), ae = void 0
    }, T.fx.timer = function(t) {
      T.timers.push(t), t() ? T.fx.start() : T.timers.pop()
    }, T.fx.interval = 13, T.fx.start = function() {
      le || (le = k.setInterval(T.fx.tick, T.fx.interval))
    }, T.fx.stop = function() {
      k.clearInterval(le), le = null
    }, T.fx.speeds = {
      slow: 600,
      fast: 200,
      _default: 400
    }, T.fn.delay = function(i, t) {
      return i = T.fx && T.fx.speeds[i] || i, t = t || "fx", this.queue(t, function(t, e) {
        var n = k.setTimeout(t, i);
        e.stop = function() {
          k.clearTimeout(n)
        }
      })
    }, ce = f.createElement("input"), pe = f.createElement("div"), de = (he = f.createElement("select")).appendChild(f.createElement("option")), (pe = f.createElement("div")).setAttribute("className", "t"), pe.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", ue = pe.getElementsByTagName("a")[0], ce.setAttribute("type", "checkbox"), pe.appendChild(ce), (ue = pe.getElementsByTagName("a")[0]).style.cssText = "top:1px", v.getSetAttribute = "t" !== pe.className, v.style = /top/.test(ue.getAttribute("style")), v.hrefNormalized = "/a" === ue.getAttribute("href"), v.checkOn = !!ce.value, v.optSelected = de.selected, v.enctype = !!f.createElement("form").enctype, he.disabled = !0, v.optDisabled = !de.disabled, (ce = f.createElement("input")).setAttribute("value", ""), v.input = "" === ce.getAttribute("value"), ce.value = "t", ce.setAttribute("type", "radio"), v.radioValue = "t" === ce.value;
    var xe = /\r/g,
      we = /[\x20\t\r\n\f]+/g;
    T.fn.extend({
      val: function(n) {
        var i,
          t,
          r,
          e = this[0];
        return arguments.length ? (r = T.isFunction(n), this.each(function(t) {
          var e;
          1 === this.nodeType && (null == (e = r ? n.call(this, t, T(this).val()) : n) ? e = "" : "number" == typeof e ? e += "" : T.isArray(e) && (e = T.map(e, function(t) {
            return null == t ? "" : t + ""
          })), (i = T.valHooks[this.type] || T.valHooks[this.nodeName.toLowerCase()]) && "set" in i && void 0 !== i.set(this, e, "value") || (this.value = e))
        })) : e ? (i = T.valHooks[e.type] || T.valHooks[e.nodeName.toLowerCase()]) && "get" in i && void 0 !== (t = i.get(e, "value")) ? t : "string" == typeof (t = e.value) ? t.replace(xe, "") : null == t ? "" : t : void 0
      }
    }), T.extend({
      valHooks: {
        option: {
          get: function(t) {
            var e = T.find.attr(t, "value");
            return null != e ? e : T.trim(T.text(t)).replace(we, " ")
          }
        },
        select: {
          get: function(t) {
            for (var e, n, i = t.options, r = t.selectedIndex, o = "select-one" === t.type || r < 0, s = o ? null : [], a = o ? r + 1 : i.length, l = r < 0 ? a : o ? r : 0; l < a; l++)
              if (((n = i[l]).selected || l === r) && (v.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !T.nodeName(n.parentNode, "optgroup"))) {
                if (e = T(n).val(), o)
                  return e;
                s.push(e)
              }
            return s
          },
          set: function(t, e) {
            for (var n, i, r = t.options, o = T.makeArray(e), s = r.length; s--;)
              if (i = r[s], -1 < T.inArray(T.valHooks.option.get(i), o))
                try {
                  i.selected = n = !0
                } catch (t) {
                  i.scrollHeight
                }
              else
                i.selected = !1;
            return n || (t.selectedIndex = -1), r
          }
        }
      }
    }), T.each(["radio", "checkbox"], function() {
      T.valHooks[this] = {
        set: function(t, e) {
          if (T.isArray(e))
            return t.checked = -1 < T.inArray(T(t).val(), e)
        }
      }, v.checkOn || (T.valHooks[this].get = function(t) {
        return null === t.getAttribute("value") ? "on" : t.value
      })
    });
    var _e,
      ke,
      Te = T.expr.attrHandle,
      Ce = /^(?:checked|selected)$/i,
      Ee = v.getSetAttribute,
      Se = v.input;
    T.fn.extend({
      attr: function(t, e) {
        return J(this, T.attr, t, e, 1 < arguments.length)
      },
      removeAttr: function(t) {
        return this.each(function() {
          T.removeAttr(this, t)
        })
      }
    }), T.extend({
      attr: function(t, e, n) {
        var i,
          r,
          o = t.nodeType;
        if (3 !== o && 8 !== o && 2 !== o)
          return void 0 === t.getAttribute ? T.prop(t, e, n) : (1 === o && T.isXMLDoc(t) || (e = e.toLowerCase(), r = T.attrHooks[e] || (T.expr.match.bool.test(e) ? ke : _e)), void 0 !== n ? null === n ? void T.removeAttr(t, e) : r && "set" in r && void 0 !== (i = r.set(t, n, e)) ? i : (t.setAttribute(e, n + ""), n) : r && "get" in r && null !== (i = r.get(t, e)) ? i : null == (i = T.find.attr(t, e)) ? void 0 : i)
      },
      attrHooks: {
        type: {
          set: function(t, e) {
            if (!v.radioValue && "radio" === e && T.nodeName(t, "input")) {
              var n = t.value;
              return t.setAttribute("type", e), n && (t.value = n), e
            }
          }
        }
      },
      removeAttr: function(t, e) {
        var n,
          i,
          r = 0,
          o = e && e.match(j);
        if (o && 1 === t.nodeType)
          for (; n = o[r++];)
            i = T.propFix[n] || n, T.expr.match.bool.test(n) ? Se && Ee || !Ce.test(n) ? t[i] = !1 : t[T.camelCase("default-" + n)] = t[i] = !1 : T.attr(t, n, ""), t.removeAttribute(Ee ? n : i)
      }
    }), ke = {
      set: function(t, e, n) {
        return !1 === e ? T.removeAttr(t, n) : Se && Ee || !Ce.test(n) ? t.setAttribute(!Ee && T.propFix[n] || n, n) : t[T.camelCase("default-" + n)] = t[n] = !0, n
      }
    }, T.each(T.expr.match.bool.source.match(/\w+/g), function(t, e) {
      var o = Te[e] || T.find.attr;
      Se && Ee || !Ce.test(e) ? Te[e] = function(t, e, n) {
        var i,
          r;
        return n || (r = Te[e], Te[e] = i, i = null != o(t, e, n) ? e.toLowerCase() : null, Te[e] = r), i
      } : Te[e] = function(t, e, n) {
        if (!n)
          return t[T.camelCase("default-" + e)] ? e.toLowerCase() : null
      }
    }), Se && Ee || (T.attrHooks.value = {
      set: function(t, e, n) {
        if (!T.nodeName(t, "input"))
          return _e && _e.set(t, e, n);
        t.defaultValue = e
      }
    }), Ee || (_e = {
      set: function(t, e, n) {
        var i = t.getAttributeNode(n);
        if (i || t.setAttributeNode(i = t.ownerDocument.createAttribute(n)), i.value = e += "", "value" === n || e === t.getAttribute(n))
          return e
      }
    }, Te.id = Te.name = Te.coords = function(t, e, n) {
      var i;
      if (!n)
        return (i = t.getAttributeNode(e)) && "" !== i.value ? i.value : null
    }, T.valHooks.button = {
      get: function(t, e) {
        var n = t.getAttributeNode(e);
        if (n && n.specified)
          return n.value
      },
      set: _e.set
    }, T.attrHooks.contenteditable = {
      set: function(t, e, n) {
        _e.set(t, "" !== e && e, n)
      }
    }, T.each(["width", "height"], function(t, n) {
      T.attrHooks[n] = {
        set: function(t, e) {
          if ("" === e)
            return t.setAttribute(n, "auto"), e
        }
      }
    })), v.style || (T.attrHooks.style = {
      get: function(t) {
        return t.style.cssText || void 0
      },
      set: function(t, e) {
        return t.style.cssText = e + ""
      }
    });
    var Ae = /^(?:input|select|textarea|button|object)$/i,
      Ie = /^(?:a|area)$/i;
    T.fn.extend({
      prop: function(t, e) {
        return J(this, T.prop, t, e, 1 < arguments.length)
      },
      removeProp: function(t) {
        return t = T.propFix[t] || t, this.each(function() {
          try {
            this[t] = void 0, delete this[t]
          } catch (t) {}
        })
      }
    }), T.extend({
      prop: function(t, e, n) {
        var i,
          r,
          o = t.nodeType;
        if (3 !== o && 8 !== o && 2 !== o)
          return 1 === o && T.isXMLDoc(t) || (e = T.propFix[e] || e, r = T.propHooks[e]), void 0 !== n ? r && "set" in r && void 0 !== (i = r.set(t, n, e)) ? i : t[e] = n : r && "get" in r && null !== (i = r.get(t, e)) ? i : t[e]
      },
      propHooks: {
        tabIndex: {
          get: function(t) {
            var e = T.find.attr(t, "tabindex");
            return e ? parseInt(e, 10) : Ae.test(t.nodeName) || Ie.test(t.nodeName) && t.href ? 0 : -1
          }
        }
      },
      propFix: {
        for: "htmlFor",
        class: "className"
      }
    }), v.hrefNormalized || T.each(["href", "src"], function(t, e) {
      T.propHooks[e] = {
        get: function(t) {
          return t.getAttribute(e, 4)
        }
      }
    }), v.optSelected || (T.propHooks.selected = {
      get: function(t) {
        var e = t.parentNode;
        return e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex), null
      },
      set: function(t) {
        var e = t.parentNode;
        e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex)
      }
    }), T.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
      T.propFix[this.toLowerCase()] = this
    }), v.enctype || (T.propFix.enctype = "encoding");
    var Ne = /[\t\r\n\f]/g;
    function Oe(t) {
      return T.attr(t, "class") || ""
    }
    T.fn.extend({
      addClass: function(e) {
        var t,
          n,
          i,
          r,
          o,
          s,
          a,
          l = 0;
        if (T.isFunction(e))
          return this.each(function(t) {
            T(this).addClass(e.call(this, t, Oe(this)))
          });
        if ("string" == typeof e && e)
          for (t = e.match(j) || []; n = this[l++];)
            if (r = Oe(n), i = 1 === n.nodeType && (" " + r + " ").replace(Ne, " ")) {
              for (s = 0; o = t[s++];)
                i.indexOf(" " + o + " ") < 0 && (i += o + " ");
              r !== (a = T.trim(i)) && T.attr(n, "class", a)
            }
        return this
      },
      removeClass: function(e) {
        var t,
          n,
          i,
          r,
          o,
          s,
          a,
          l = 0;
        if (T.isFunction(e))
          return this.each(function(t) {
            T(this).removeClass(e.call(this, t, Oe(this)))
          });
        if (!arguments.length)
          return this.attr("class", "");
        if ("string" == typeof e && e)
          for (t = e.match(j) || []; n = this[l++];)
            if (r = Oe(n), i = 1 === n.nodeType && (" " + r + " ").replace(Ne, " ")) {
              for (s = 0; o = t[s++];)
                for (; -1 < i.indexOf(" " + o + " ");)
                  i = i.replace(" " + o + " ", " ");
              r !== (a = T.trim(i)) && T.attr(n, "class", a)
            }
        return this
      },
      toggleClass: function(r, e) {
        var o = typeof r;
        return "boolean" == typeof e && "string" === o ? e ? this.addClass(r) : this.removeClass(r) : T.isFunction(r) ? this.each(function(t) {
          T(this).toggleClass(r.call(this, t, Oe(this), e), e)
        }) : this.each(function() {
          var t,
            e,
            n,
            i;
          if ("string" === o)
            for (e = 0, n = T(this), i = r.match(j) || []; t = i[e++];)
              n.hasClass(t) ? n.removeClass(t) : n.addClass(t);
          else
            void 0 !== r && "boolean" !== o || ((t = Oe(this)) && T._data(this, "__className__", t), T.attr(this, "class", t || !1 === r ? "" : T._data(this, "__className__") || ""))
        })
      },
      hasClass: function(t) {
        var e,
          n,
          i = 0;
        for (e = " " + t + " "; n = this[i++];)
          if (1 === n.nodeType && -1 < (" " + Oe(n) + " ").replace(Ne, " ").indexOf(e))
            return !0;
        return !1
      }
    }), T.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(t, n) {
      T.fn[n] = function(t, e) {
        return 0 < arguments.length ? this.on(n, null, t, e) : this.trigger(n)
      }
    }), T.fn.extend({
      hover: function(t, e) {
        return this.mouseenter(t).mouseleave(e || t)
      }
    });
    var je = k.location,
      De = T.now(),
      qe = /\?/,
      Pe = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    T.parseJSON = function(t) {
      if (k.JSON && k.JSON.parse)
        return k.JSON.parse(t + "");
      var r,
        o = null,
        e = T.trim(t + "");
      return e && !T.trim(e.replace(Pe, function(t, e, n, i) {
        return r && e && (o = 0), 0 === o ? t : (r = n || e, o += !i - !n, "")
      })) ? Function("return " + e)() : T.error("Invalid JSON: " + t)
    }, T.parseXML = function(t) {
      var e;
      if (!t || "string" != typeof t)
        return null;
      try {
        k.DOMParser ? e = (new k.DOMParser).parseFromString(t, "text/xml") : ((e = new k.ActiveXObject("Microsoft.XMLDOM")).async = "false", e.loadXML(t))
      } catch (t) {
        e = void 0
      }
      return e && e.documentElement && !e.getElementsByTagName("parsererror").length || T.error("Invalid XML: " + t), e
    };
    var Le = /#.*$/,
      He = /([?&])_=[^&]*/,
      Me = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
      Be = /^(?:GET|HEAD)$/,
      Re = /^\/\//,
      ze = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
      Fe = {},
      We = {},
      $e = "*/".concat("*"),
      Ue = je.href,
      Ve = ze.exec(Ue.toLowerCase()) || [];
    function Xe(o) {
      return function(t, e) {
        "string" != typeof t && (e = t, t = "*");
        var n,
          i = 0,
          r = t.toLowerCase().match(j) || [];
        if (T.isFunction(e))
          for (; n = r[i++];)
            "+" === n.charAt(0) ? (n = n.slice(1) || "*", (o[n] = o[n] || []).unshift(e)) : (o[n] = o[n] || []).push(e)
      }
    }
    function Ge(e, r, o, s) {
      var a = {},
        l = e === We;
      function u(t) {
        var i;
        return a[t] = !0, T.each(e[t] || [], function(t, e) {
          var n = e(r, o, s);
          return "string" != typeof n || l || a[n] ? l ? !(i = n) : void 0 : (r.dataTypes.unshift(n), u(n), !1)
        }), i
      }
      return u(r.dataTypes[0]) || !a["*"] && u("*")
    }
    function Qe(t, e) {
      var n,
        i,
        r = T.ajaxSettings.flatOptions || {};
      for (i in e)
        void 0 !== e[i] && ((r[i] ? t : n || (n = {}))[i] = e[i]);
      return n && T.extend(!0, t, n), t
    }
    T.extend({
      active: 0,
      lastModified: {},
      etag: {},
      ajaxSettings: {
        url: Ue,
        type: "GET",
        isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Ve[1]),
        global: !0,
        processData: !0,
        async: !0,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        accepts: {
          "*": $e,
          text: "text/plain",
          html: "text/html",
          xml: "application/xml, text/xml",
          json: "application/json, text/javascript"
        },
        contents: {
          xml: /\bxml\b/,
          html: /\bhtml/,
          json: /\bjson\b/
        },
        responseFields: {
          xml: "responseXML",
          text: "responseText",
          json: "responseJSON"
        },
        converters: {
          "* text": String,
          "text html": !0,
          "text json": T.parseJSON,
          "text xml": T.parseXML
        },
        flatOptions: {
          url: !0,
          context: !0
        }
      },
      ajaxSetup: function(t, e) {
        return e ? Qe(Qe(t, T.ajaxSettings), e) : Qe(T.ajaxSettings, t)
      },
      ajaxPrefilter: Xe(Fe),
      ajaxTransport: Xe(We),
      ajax: function(t, e) {
        "object" == typeof t && (e = t, t = void 0), e = e || {};
        var n,
          i,
          c,
          p,
          h,
          d,
          f,
          r,
          g = T.ajaxSetup({}, e),
          m = g.context || g,
          v = g.context && (m.nodeType || m.jquery) ? T(m) : T.event,
          y = T.Deferred(),
          b = T.Callbacks("once memory"),
          x = g.statusCode || {},
          o = {},
          s = {},
          w = 0,
          a = "canceled",
          _ = {
            readyState: 0,
            getResponseHeader: function(t) {
              var e;
              if (2 === w) {
                if (!r)
                  for (r = {}; e = Me.exec(p);)
                    r[e[1].toLowerCase()] = e[2];
                e = r[t.toLowerCase()]
              }
              return null == e ? null : e
            },
            getAllResponseHeaders: function() {
              return 2 === w ? p : null
            },
            setRequestHeader: function(t, e) {
              var n = t.toLowerCase();
              return w || (t = s[n] = s[n] || t, o[t] = e), this
            },
            overrideMimeType: function(t) {
              return w || (g.mimeType = t), this
            },
            statusCode: function(t) {
              var e;
              if (t)
                if (w < 2)
                  for (e in t)
                    x[e] = [x[e], t[e]];
                else
                  _.always(t[_.status]);
              return this
            },
            abort: function(t) {
              var e = t || a;
              return f && f.abort(e), l(0, e), this
            }
          };
        if (y.promise(_).complete = b.add, _.success = _.done, _.error = _.fail, g.url = ((t || g.url || Ue) + "").replace(Le, "").replace(Re, Ve[1] + "//"), g.type = e.method || e.type || g.method || g.type, g.dataTypes = T.trim(g.dataType || "*").toLowerCase().match(j) || [""], null == g.crossDomain && (n = ze.exec(g.url.toLowerCase()), g.crossDomain = !(!n || n[1] === Ve[1] && n[2] === Ve[2] && (n[3] || ("http:" === n[1] ? "80" : "443")) === (Ve[3] || ("http:" === Ve[1] ? "80" : "443")))), g.data && g.processData && "string" != typeof g.data && (g.data = T.param(g.data, g.traditional)), Ge(Fe, g, e, _), 2 === w)
          return _;
        for (i in (d = T.event && g.global) && 0 == T.active++ && T.event.trigger("ajaxStart"), g.type = g.type.toUpperCase(), g.hasContent = !Be.test(g.type), c = g.url, g.hasContent || (g.data && (c = g.url += (qe.test(c) ? "&" : "?") + g.data, delete g.data), !1 === g.cache && (g.url = He.test(c) ? c.replace(He, "$1_=" + De++) : c + (qe.test(c) ? "&" : "?") + "_=" + De++)), g.ifModified && (T.lastModified[c] && _.setRequestHeader("If-Modified-Since", T.lastModified[c]), T.etag[c] && _.setRequestHeader("If-None-Match", T.etag[c])), (g.data && g.hasContent && !1 !== g.contentType || e.contentType) && _.setRequestHeader("Content-Type", g.contentType), _.setRequestHeader("Accept", g.dataTypes[0] && g.accepts[g.dataTypes[0]] ? g.accepts[g.dataTypes[0]] + ("*" !== g.dataTypes[0] ? ", " + $e + "; q=0.01" : "") : g.accepts["*"]), g.headers)
          _.setRequestHeader(i, g.headers[i]);
        if (g.beforeSend && (!1 === g.beforeSend.call(m, _, g) || 2 === w))
          return _.abort();
        for (i in a = "abort", {
          success: 1,
          error: 1,
          complete: 1
        })
          _[i](g[i]);
        if (f = Ge(We, g, e, _)) {
          if (_.readyState = 1, d && v.trigger("ajaxSend", [_, g]), 2 === w)
            return _;
          g.async && 0 < g.timeout && (h = k.setTimeout(function() {
            _.abort("timeout")
          }, g.timeout));
          try {
            w = 1, f.send(o, l)
          } catch (t) {
            if (!(w < 2))
              throw t;
            l(-1, t)
          }
        } else
          l(-1, "No Transport");
        function l(t, e, n, i) {
          var r,
            o,
            s,
            a,
            l,
            u = e;
          2 !== w && (w = 2, h && k.clearTimeout(h), f = void 0, p = i || "", _.readyState = 0 < t ? 4 : 0, r = 200 <= t && t < 300 || 304 === t, n && (a = function(t, e, n) {
            for (var i, r, o, s, a = t.contents, l = t.dataTypes; "*" === l[0];)
              l.shift(), void 0 === r && (r = t.mimeType || e.getResponseHeader("Content-Type"));
            if (r)
              for (s in a)
                if (a[s] && a[s].test(r)) {
                  l.unshift(s);
                  break
                }
            if (l[0] in n)
              o = l[0];
            else {
              for (s in n) {
                if (!l[0] || t.converters[s + " " + l[0]]) {
                  o = s;
                  break
                }
                i || (i = s)
              }
              o = o || i
            }
            if (o)
              return o !== l[0] && l.unshift(o), n[o]
          }(g, _, n)), a = function(t, e, n, i) {
            var r,
              o,
              s,
              a,
              l,
              u = {},
              c = t.dataTypes.slice();
            if (c[1])
              for (s in t.converters)
                u[s.toLowerCase()] = t.converters[s];
            for (o = c.shift(); o;)
              if (t.responseFields[o] && (n[t.responseFields[o]] = e), !l && i && t.dataFilter && (e = t.dataFilter(e, t.dataType)), l = o, o = c.shift())
                if ("*" === o)
                  o = l;
                else if ("*" !== l && l !== o) {
                  if (!(s = u[l + " " + o] || u["* " + o]))
                    for (r in u)
                      if ((a = r.split(" "))[1] === o && (s = u[l + " " + a[0]] || u["* " + a[0]])) {
                        !0 === s ? s = u[r] : !0 !== u[r] && (o = a[0], c.unshift(a[1]));
                        break
                      }
                  if (!0 !== s)
                    if (s && t.throws)
                      e = s(e);
                    else
                      try {
                        e = s(e)
                      } catch (t) {
                        return {
                          state: "parsererror",
                          error: s ? t : "No conversion from " + l + " to " + o
                        }
                      }
                }
            return {
              state: "success",
              data: e
            }
          }(g, a, _, r), r ? (g.ifModified && ((l = _.getResponseHeader("Last-Modified")) && (T.lastModified[c] = l), (l = _.getResponseHeader("etag")) && (T.etag[c] = l)), 204 === t || "HEAD" === g.type ? u = "nocontent" : 304 === t ? u = "notmodified" : (u = a.state, o = a.data, r = !(s = a.error))) : (s = u, !t && u || (u = "error", t < 0 && (t = 0))), _.status = t, _.statusText = (e || u) + "", r ? y.resolveWith(m, [o, u, _]) : y.rejectWith(m, [_, u, s]), _.statusCode(x), x = void 0, d && v.trigger(r ? "ajaxSuccess" : "ajaxError", [_, g, r ? o : s]), b.fireWith(m, [_, u]), d && (v.trigger("ajaxComplete", [_, g]), --T.active || T.event.trigger("ajaxStop")))
        }
        return _
      },
      getJSON: function(t, e, n) {
        return T.get(t, e, n, "json")
      },
      getScript: function(t, e) {
        return T.get(t, void 0, e, "script")
      }
    }), T.each(["get", "post"], function(t, r) {
      T[r] = function(t, e, n, i) {
        return T.isFunction(e) && (i = i || n, n = e, e = void 0), T.ajax(T.extend({
          url: t,
          type: r,
          dataType: i,
          data: e,
          success: n
        }, T.isPlainObject(t) && t))
      }
    }), T._evalUrl = function(t) {
      return T.ajax({
        url: t,
        type: "GET",
        dataType: "script",
        cache: !0,
        async: !1,
        global: !1,
        throws: !0
      })
    }, T.fn.extend({
      wrapAll: function(e) {
        if (T.isFunction(e))
          return this.each(function(t) {
            T(this).wrapAll(e.call(this, t))
          });
        if (this[0]) {
          var t = T(e, this[0].ownerDocument).eq(0).clone(!0);
          this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
            for (var t = this; t.firstChild && 1 === t.firstChild.nodeType;)
              t = t.firstChild;
            return t
          }).append(this)
        }
        return this
      },
      wrapInner: function(n) {
        return T.isFunction(n) ? this.each(function(t) {
          T(this).wrapInner(n.call(this, t))
        }) : this.each(function() {
          var t = T(this),
            e = t.contents();
          e.length ? e.wrapAll(n) : t.append(n)
        })
      },
      wrap: function(e) {
        var n = T.isFunction(e);
        return this.each(function(t) {
          T(this).wrapAll(n ? e.call(this, t) : e)
        })
      },
      unwrap: function() {
        return this.parent().each(function() {
          T.nodeName(this, "body") || T(this).replaceWith(this.childNodes)
        }).end()
      }
    }), T.expr.filters.hidden = function(t) {
      return v.reliableHiddenOffsets() ? t.offsetWidth <= 0 && t.offsetHeight <= 0 && !t.getClientRects().length : function(t) {
        if (!T.contains(t.ownerDocument || f, t))
          return !0;
        for (; t && 1 === t.nodeType;) {
          if ("none" === ((e = t).style && e.style.display || T.css(e, "display")) || "hidden" === t.type)
            return !0;
          t = t.parentNode
        }
        var e;
        return !1
      }(t)
    }, T.expr.filters.visible = function(t) {
      return !T.expr.filters.hidden(t)
    };
    var Ke = /%20/g,
      Je = /\[\]$/,
      Ye = /\r?\n/g,
      Ze = /^(?:submit|button|image|reset|file)$/i,
      tn = /^(?:input|select|textarea|keygen)/i;
    function en(n, t, i, r) {
      var e;
      if (T.isArray(t))
        T.each(t, function(t, e) {
          i || Je.test(n) ? r(n, e) : en(n + "[" + ("object" == typeof e && null != e ? t : "") + "]", e, i, r)
        });
      else if (i || "object" !== T.type(t))
        r(n, t);
      else
        for (e in t)
          en(n + "[" + e + "]", t[e], i, r)
    }
    T.param = function(t, e) {
      var n,
        i = [],
        r = function(t, e) {
          e = T.isFunction(e) ? e() : null == e ? "" : e, i[i.length] = encodeURIComponent(t) + "=" + encodeURIComponent(e)
        };
      if (void 0 === e && (e = T.ajaxSettings && T.ajaxSettings.traditional), T.isArray(t) || t.jquery && !T.isPlainObject(t))
        T.each(t, function() {
          r(this.name, this.value)
        });
      else
        for (n in t)
          en(n, t[n], e, r);
      return i.join("&").replace(Ke, "+")
    }, T.fn.extend({
      serialize: function() {
        return T.param(this.serializeArray())
      },
      serializeArray: function() {
        return this.map(function() {
          var t = T.prop(this, "elements");
          return t ? T.makeArray(t) : this
        }).filter(function() {
          var t = this.type;
          return this.name && !T(this).is(":disabled") && tn.test(this.nodeName) && !Ze.test(t) && (this.checked || !Y.test(t))
        }).map(function(t, e) {
          var n = T(this).val();
          return null == n ? null : T.isArray(n) ? T.map(n, function(t) {
            return {
              name: e.name,
              value: t.replace(Ye, "\r\n")
            }
          }) : {
            name: e.name,
            value: n.replace(Ye, "\r\n")
          }
        }).get()
      }
    }), T.ajaxSettings.xhr = void 0 !== k.ActiveXObject ? function() {
      return this.isLocal ? an() : 8 < f.documentMode ? sn() : /^(get|post|head|put|delete|options)$/i.test(this.type) && sn() || an()
    } : sn;
    var nn = 0,
      rn = {},
      on = T.ajaxSettings.xhr();
    function sn() {
      try {
        return new k.XMLHttpRequest
      } catch (t) {}
    }
    function an() {
      try {
        return new k.ActiveXObject("Microsoft.XMLHTTP")
      } catch (t) {}
    }
    k.attachEvent && k.attachEvent("onunload", function() {
      for (var t in rn)
        rn[t](void 0, !0)
    }), v.cors = !!on && "withCredentials" in on, (on = v.ajax = !!on) && T.ajaxTransport(function(l) {
      var u;
      if (!l.crossDomain || v.cors)
        return {
          send: function(t, o) {
            var e,
              s = l.xhr(),
              a = ++nn;
            if (s.open(l.type, l.url, l.async, l.username, l.password), l.xhrFields)
              for (e in l.xhrFields)
                s[e] = l.xhrFields[e];
            for (e in l.mimeType && s.overrideMimeType && s.overrideMimeType(l.mimeType), l.crossDomain || t["X-Requested-With"] || (t["X-Requested-With"] = "XMLHttpRequest"), t)
              void 0 !== t[e] && s.setRequestHeader(e, t[e] + "");
            s.send(l.hasContent && l.data || null), u = function(t, e) {
              var n,
                i,
                r;
              if (u && (e || 4 === s.readyState))
                if (delete rn[a], u = void 0, s.onreadystatechange = T.noop, e)
                  4 !== s.readyState && s.abort();
                else {
                  r = {}, n = s.status, "string" == typeof s.responseText && (r.text = s.responseText);
                  try {
                    i = s.statusText
                  } catch (t) {
                    i = ""
                  }
                  n || !l.isLocal || l.crossDomain ? 1223 === n && (n = 204) : n = r.text ? 200 : 404
                }
              r && o(n, i, r, s.getAllResponseHeaders())
            }, l.async ? 4 === s.readyState ? k.setTimeout(u) : s.onreadystatechange = rn[a] = u : u()
          },
          abort: function() {
            u && u(void 0, !0)
          }
        }
    }), T.ajaxSetup({
      accepts: {
        script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
      },
      contents: {
        script: /\b(?:java|ecma)script\b/
      },
      converters: {
        "text script": function(t) {
          return T.globalEval(t), t
        }
      }
    }), T.ajaxPrefilter("script", function(t) {
      void 0 === t.cache && (t.cache = !1), t.crossDomain && (t.type = "GET", t.global = !1)
    }), T.ajaxTransport("script", function(e) {
      if (e.crossDomain) {
        var i,
          r = f.head || T("head")[0] || f.documentElement;
        return {
          send: function(t, n) {
            (i = f.createElement("script")).async = !0, e.scriptCharset && (i.charset = e.scriptCharset), i.src = e.url, i.onload = i.onreadystatechange = function(t, e) {
              (e || !i.readyState || /loaded|complete/.test(i.readyState)) && (i.onload = i.onreadystatechange = null, i.parentNode && i.parentNode.removeChild(i), i = null, e || n(200, "success"))
            }, r.insertBefore(i, r.firstChild)
          },
          abort: function() {
            i && i.onload(void 0, !0)
          }
        }
      }
    });
    var ln = [],
      un = /(=)\?(?=&|$)|\?\?/;
    T.ajaxSetup({
      jsonp: "callback",
      jsonpCallback: function() {
        var t = ln.pop() || T.expando + "_" + De++;
        return this[t] = !0, t
      }
    }), T.ajaxPrefilter("json jsonp", function(t, e, n) {
      var i,
        r,
        o,
        s = !1 !== t.jsonp && (un.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && un.test(t.data) && "data");
      if (s || "jsonp" === t.dataTypes[0])
        return i = t.jsonpCallback = T.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(un, "$1" + i) : !1 !== t.jsonp && (t.url += (qe.test(t.url) ? "&" : "?") + t.jsonp + "=" + i), t.converters["script json"] = function() {
          return o || T.error(i + " was not called"), o[0]
        }, t.dataTypes[0] = "json", r = k[i], k[i] = function() {
          o = arguments
        }, n.always(function() {
          void 0 === r ? T(k).removeProp(i) : k[i] = r, t[i] && (t.jsonpCallback = e.jsonpCallback, ln.push(i)), o && T.isFunction(r) && r(o[0]), o = r = void 0
        }), "script"
    }), T.parseHTML = function(t, e, n) {
      if (!t || "string" != typeof t)
        return null;
      "boolean" == typeof e && (n = e, e = !1), e = e || f;
      var i = x.exec(t),
        r = !n && [];
      return i ? [e.createElement(i[1])] : (i = ct([t], e, r), r && r.length && T(r).remove(), T.merge([], i.childNodes))
    };
    var cn = T.fn.load;
    function pn(t) {
      return T.isWindow(t) ? t : 9 === t.nodeType && (t.defaultView || t.parentWindow)
    }
    T.fn.load = function(t, e, n) {
      if ("string" != typeof t && cn)
        return cn.apply(this, arguments);
      var i,
        r,
        o,
        s = this,
        a = t.indexOf(" ");
      return -1 < a && (i = T.trim(t.slice(a, t.length)), t = t.slice(0, a)), T.isFunction(e) ? (n = e, e = void 0) : e && "object" == typeof e && (r = "POST"), 0 < s.length && T.ajax({
        url: t,
        type: r || "GET",
        dataType: "html",
        data: e
      }).done(function(t) {
        o = arguments, s.html(i ? T("<div>").append(T.parseHTML(t)).find(i) : t)
      }).always(n && function(t, e) {
        s.each(function() {
          n.apply(this, o || [t.responseText, e, t])
        })
      }), this
    }, T.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(t, e) {
      T.fn[e] = function(t) {
        return this.on(e, t)
      }
    }), T.expr.filters.animated = function(e) {
      return T.grep(T.timers, function(t) {
        return e === t.elem
      }).length
    }, T.offset = {
      setOffset: function(t, e, n) {
        var i,
          r,
          o,
          s,
          a,
          l,
          u = T.css(t, "position"),
          c = T(t),
          p = {};
        "static" === u && (t.style.position = "relative"), a = c.offset(), o = T.css(t, "top"), l = T.css(t, "left"), ("absolute" === u || "fixed" === u) && -1 < T.inArray("auto", [o, l]) ? (s = (i = c.position()).top, r = i.left) : (s = parseFloat(o) || 0, r = parseFloat(l) || 0), T.isFunction(e) && (e = e.call(t, n, T.extend({}, a))), null != e.top && (p.top = e.top - a.top + s), null != e.left && (p.left = e.left - a.left + r), "using" in e ? e.using.call(t, p) : c.css(p)
      }
    }, T.fn.extend({
      offset: function(e) {
        if (arguments.length)
          return void 0 === e ? this : this.each(function(t) {
            T.offset.setOffset(this, e, t)
          });
        var t,
          n,
          i = {
            top: 0,
            left: 0
          },
          r = this[0],
          o = r && r.ownerDocument;
        return o ? (t = o.documentElement, T.contains(t, r) ? (void 0 !== r.getBoundingClientRect && (i = r.getBoundingClientRect()), n = pn(o), {
          top: i.top + (n.pageYOffset || t.scrollTop) - (t.clientTop || 0),
          left: i.left + (n.pageXOffset || t.scrollLeft) - (t.clientLeft || 0)
        }) : i) : void 0
      },
      position: function() {
        if (this[0]) {
          var t,
            e,
            n = {
              top: 0,
              left: 0
            },
            i = this[0];
          return "fixed" === T.css(i, "position") ? e = i.getBoundingClientRect() : (t = this.offsetParent(), e = this.offset(), T.nodeName(t[0], "html") || (n = t.offset()), n.top += T.css(t[0], "borderTopWidth", !0), n.left += T.css(t[0], "borderLeftWidth", !0)), {
            top: e.top - n.top - T.css(i, "marginTop", !0),
            left: e.left - n.left - T.css(i, "marginLeft", !0)
          }
        }
      },
      offsetParent: function() {
        return this.map(function() {
          for (var t = this.offsetParent; t && !T.nodeName(t, "html") && "static" === T.css(t, "position");)
            t = t.offsetParent;
          return t || Ft
        })
      }
    }), T.each({
      scrollLeft: "pageXOffset",
      scrollTop: "pageYOffset"
    }, function(e, r) {
      var o = /Y/.test(r);
      T.fn[e] = function(t) {
        return J(this, function(t, e, n) {
          var i = pn(t);
          if (void 0 === n)
            return i ? r in i ? i[r] : i.document.documentElement[e] : t[e];
          i ? i.scrollTo(o ? T(i).scrollLeft() : n, o ? n : T(i).scrollTop()) : t[e] = n
        }, e, t, arguments.length, null)
      }
    }), T.each(["top", "left"], function(t, n) {
      T.cssHooks[n] = Vt(v.pixelPosition, function(t, e) {
        if (e)
          return e = $t(t, n), Rt.test(e) ? T(t).position()[n] + "px" : e
      })
    }), T.each({
      Height: "height",
      Width: "width"
    }, function(o, s) {
      T.each({
        padding: "inner" + o,
        content: s,
        "": "outer" + o
      }, function(i, t) {
        T.fn[t] = function(t, e) {
          var n = arguments.length && (i || "boolean" != typeof t),
            r = i || (!0 === t || !0 === e ? "margin" : "border");
          return J(this, function(t, e, n) {
            var i;
            return T.isWindow(t) ? t.document.documentElement["client" + o] : 9 === t.nodeType ? (i = t.documentElement, Math.max(t.body["scroll" + o], i["scroll" + o], t.body["offset" + o], i["offset" + o], i["client" + o])) : void 0 === n ? T.css(t, e, r) : T.style(t, e, n, r)
          }, s, n ? t : void 0, n, null)
        }
      })
    }), T.fn.extend({
      bind: function(t, e, n) {
        return this.on(t, null, e, n)
      },
      unbind: function(t, e) {
        return this.off(t, null, e)
      },
      delegate: function(t, e, n, i) {
        return this.on(e, t, n, i)
      },
      undelegate: function(t, e, n) {
        return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", n)
      }
    }), T.fn.size = function() {
      return this.length
    }, T.fn.andSelf = T.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
      return T
    });
    var hn = k.jQuery,
      dn = k.$;
    return T.noConflict = function(t) {
      return k.$ === T && (k.$ = dn), t && k.jQuery === T && (k.jQuery = hn), T
    }, t || (k.jQuery = k.$ = T), T
  }), define("../vendor/jquery/dist/jquery", function() {}), function() {
    (function(t) {
      return "function" == typeof define && define.amd ? define("jslib", ["../vendor/jquery/dist/jquery"], t) : t(this.$)
    }).call(this, function() {
      "use strict";
      return jQuery.noConflict()
    })
  }.call(this), function(t) {
    "function" == typeof define && define.amd && define.amd.jQuery ? define("jslib_touch", ["jquery"], t) : "undefined" != typeof module && module.exports ? t(require("jquery")) : t(jQuery)
  }(function(at) {
    "use strict";
    var lt = "left",
      ut = "right",
      ct = "up",
      pt = "down",
      ht = "none",
      dt = "doubletap",
      ft = "longtap",
      gt = "horizontal",
      mt = "vertical",
      vt = "all",
      yt = "move",
      bt = "end",
      xt = "cancel",
      wt = "ontouchstart" in window,
      _t = window.navigator.msPointerEnabled && !window.navigator.pointerEnabled && !wt,
      kt = (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && !wt,
      Tt = "TouchSwipe";
    function i(t, f) {
      f = at.extend({}, f);
      var e = wt || kt || !f.fallbackToMouseEvents,
        n = e ? kt ? _t ? "MSPointerDown" : "pointerdown" : "touchstart" : "mousedown",
        i = e ? kt ? _t ? "MSPointerMove" : "pointermove" : "touchmove" : "mousemove",
        r = e ? kt ? _t ? "MSPointerUp" : "pointerup" : "touchend" : "mouseup",
        o = e ? kt ? "mouseleave" : null : "mouseleave",
        s = kt ? _t ? "MSPointerCancel" : "pointercancel" : "touchcancel",
        g = 0,
        m = null,
        v = null,
        y = 0,
        b = 0,
        x = 0,
        w = 1,
        _ = 0,
        k = 0,
        T = null,
        a = at(t),
        C = "start",
        E = 0,
        S = {},
        l = 0,
        A = 0,
        u = 0,
        c = 0,
        p = 0,
        h = null,
        I = null;
      try {
        a.bind(n, d), a.bind(s, j)
      } catch (t) {
        at.error("events not supported " + n + "," + s + " on jQuery.swipe")
      }
      function d(t) {
        if (!0 !== a.data(Tt + "_intouch") && !(0 < at(t.target).closest(f.excludedElements, a).length)) {
          var e = t.originalEvent ? t.originalEvent : t;
          if (!e.pointerType || "mouse" != e.pointerType || 0 != f.fallbackToMouseEvents) {
            var n,
              i,
              r = e.touches,
              o = r ? r[0] : e;
            return C = "start", r ? E = r.length : !1 !== f.preventDefaultEvents && t.preventDefault(), k = v = m = null, w = 1, _ = x = b = y = g = 0, (i = {})[lt] = nt(lt), i[ut] = nt(ut), i.up = nt(ct), i[pt] = nt(pt), T = i, K(), Z(0, o), !r || E === f.fingers || f.fingers === vt || F() ? (l = st(), 2 == E && (Z(1, r[1]), b = x = rt(S[0].start, S[1].start)), (f.swipeStatus || f.pinchStatus) && (n = L(e, C))) : n = !1, !1 === n ? (L(e, C = xt), n) : (f.hold && (I = setTimeout(at.proxy(function() {
              a.trigger("hold", [e.target]), f.hold && (n = f.hold.call(a, e, e.target))
            }, this), f.longTapThreshold)), Y(!0), null)
          }
        }
      }
      function N(t) {
        var e,
          n,
          i = t.originalEvent ? t.originalEvent : t;
        if (C !== bt && C !== xt && !J()) {
          var r,
            o,
            s,
            a,
            l,
            u,
            c,
            p = i.touches,
            h = tt(p ? p[0] : i);
          if (A = st(), p && (E = p.length), f.hold && clearTimeout(I), C = yt, 2 == E && (0 == b ? (Z(1, p[1]), b = x = rt(S[0].start, S[1].start)) : (tt(p[1]), x = rt(S[0].end, S[1].end), S[0].end, S[1].end, k = w < 1 ? "out" : "in"), w = (x / b * 1).toFixed(2), _ = Math.abs(b - x)), E === f.fingers || f.fingers === vt || !p || F()) {
            if (m = ot(h.start, h.end), function(t, e) {
              if (!1 !== f.preventDefaultEvents)
                if (f.allowPageScroll === ht)
                  t.preventDefault();
                else {
                  var n = "auto" === f.allowPageScroll;
                  switch (e) {
                    case lt:
                      (f.swipeLeft && n || !n && f.allowPageScroll != gt) && t.preventDefault();
                      break;
                    case ut:
                      (f.swipeRight && n || !n && f.allowPageScroll != gt) && t.preventDefault();
                      break;
                    case ct:
                      (f.swipeUp && n || !n && f.allowPageScroll != mt) && t.preventDefault();
                      break;
                    case pt:
                      (f.swipeDown && n || !n && f.allowPageScroll != mt) && t.preventDefault()
                  }
                }
            }(t, v = ot(h.last, h.end)), u = h.start, c = h.end, g = Math.round(Math.sqrt(Math.pow(c.x - u.x, 2) + Math.pow(c.y - u.y, 2))), y = it(), n = g, (e = m) != ht && (n = Math.max(n, et(e)), T[e].distance = n), r = L(i, C), !f.triggerOnTouchEnd || f.triggerOnTouchLeave) {
              var d = !0;
              if (f.triggerOnTouchLeave)
                s = {
                  left: (l = (a = at(a = this)).offset()).left,
                  right: l.left + a.outerWidth(),
                  top: l.top,
                  bottom: l.top + a.outerHeight()
                }, d = (o = h.end).x > s.left && o.x < s.right && o.y > s.top && o.y < s.bottom;
              !f.triggerOnTouchEnd && d ? C = P(yt) : f.triggerOnTouchLeave && !d && (C = P(bt)), C != xt && C != bt || L(i, C)
            }
          } else
            L(i, C = xt);
          !1 === r && L(i, C = xt)
        }
      }
      function O(t) {
        var e,
          n = t.originalEvent ? t.originalEvent : t,
          i = n.touches;
        if (i) {
          if (i.length && !J())
            return e = n, u = st(), c = e.touches.length + 1, !0;
          if (i.length && J())
            return !0
        }
        return J() && (E = c), A = st(), y = it(), B() || !M() ? L(n, C = xt) : f.triggerOnTouchEnd || !1 === f.triggerOnTouchEnd && C === yt ? (!1 !== f.preventDefaultEvents && t.preventDefault(), L(n, C = bt)) : !f.triggerOnTouchEnd && X() ? H(n, C = bt, "tap") : C === yt && L(n, C = xt), Y(!1), null
      }
      function j() {
        x = b = l = A = E = 0, w = 1, K(), Y(!1)
      }
      function D(t) {
        var e = t.originalEvent ? t.originalEvent : t;
        f.triggerOnTouchLeave && L(e, C = P(bt))
      }
      function q() {
        a.unbind(n, d), a.unbind(s, j), a.unbind(i, N), a.unbind(r, O), o && a.unbind(o, D), Y(!1)
      }
      function P(t) {
        var e = t,
          n = R(),
          i = M(),
          r = B();
        return !n || r ? e = xt : !i || t != yt || f.triggerOnTouchEnd && !f.triggerOnTouchLeave ? !i && t == bt && f.triggerOnTouchLeave && (e = xt) : e = bt, e
      }
      function L(t, e) {
        var n,
          i = t.touches;
        return (W() && $() || $()) && (n = H(t, e, "swipe")), (z() && F() || F()) && !1 !== n && (n = H(t, e, "pinch")), Q() && G() && !1 !== n ? n = H(t, e, dt) : y > f.longTapThreshold && g < 10 && f.longTap && !1 !== n ? n = H(t, e, ft) : 1 !== E && wt || !(isNaN(g) || g < f.threshold) || !X() || !1 === n || (n = H(t, e, "tap")), e === xt && j(), e === bt && (i && i.length || j()), n
      }
      function H(t, e, n) {
        var i;
        if ("swipe" == n) {
          if (a.trigger("swipeStatus", [e, m || null, g || 0, y || 0, E, S, v]), f.swipeStatus && !1 === (i = f.swipeStatus.call(a, t, e, m || null, g || 0, y || 0, E, S, v)))
            return !1;
          if (e == bt && W()) {
            if (clearTimeout(h), clearTimeout(I), a.trigger("swipe", [m, g, y, E, S, v]), f.swipe && !1 === (i = f.swipe.call(a, t, m, g, y, E, S, v)))
              return !1;
            switch (m) {
              case lt:
                a.trigger("swipeLeft", [m, g, y, E, S, v]), f.swipeLeft && (i = f.swipeLeft.call(a, t, m, g, y, E, S, v));
                break;
              case ut:
                a.trigger("swipeRight", [m, g, y, E, S, v]), f.swipeRight && (i = f.swipeRight.call(a, t, m, g, y, E, S, v));
                break;
              case ct:
                a.trigger("swipeUp", [m, g, y, E, S, v]), f.swipeUp && (i = f.swipeUp.call(a, t, m, g, y, E, S, v));
                break;
              case pt:
                a.trigger("swipeDown", [m, g, y, E, S, v]), f.swipeDown && (i = f.swipeDown.call(a, t, m, g, y, E, S, v))
            }
          }
        }
        if ("pinch" == n) {
          if (a.trigger("pinchStatus", [e, k || null, _ || 0, y || 0, E, w, S]), f.pinchStatus && !1 === (i = f.pinchStatus.call(a, t, e, k || null, _ || 0, y || 0, E, w, S)))
            return !1;
          if (e == bt && z())
            switch (k) {
              case "in":
                a.trigger("pinchIn", [k || null, _ || 0, y || 0, E, w, S]), f.pinchIn && (i = f.pinchIn.call(a, t, k || null, _ || 0, y || 0, E, w, S));
                break;
              case "out":
                a.trigger("pinchOut", [k || null, _ || 0, y || 0, E, w, S]), f.pinchOut && (i = f.pinchOut.call(a, t, k || null, _ || 0, y || 0, E, w, S))
            }
        }
        return "tap" == n ? e !== xt && e !== bt || (clearTimeout(h), clearTimeout(I), G() && !Q() ? (p = st(), h = setTimeout(at.proxy(function() {
          p = null, a.trigger("tap", [t.target]), f.tap && (i = f.tap.call(a, t, t.target))
        }, this), f.doubleTapThreshold)) : (p = null, a.trigger("tap", [t.target]), f.tap && (i = f.tap.call(a, t, t.target)))) : n == dt ? e !== xt && e !== bt || (clearTimeout(h), clearTimeout(I), p = null, a.trigger("doubletap", [t.target]), f.doubleTap && (i = f.doubleTap.call(a, t, t.target))) : n == ft && (e !== xt && e !== bt || (clearTimeout(h), p = null, a.trigger("longtap", [t.target]), f.longTap && (i = f.longTap.call(a, t, t.target)))), i
      }
      function M() {
        var t = !0;
        return null !== f.threshold && (t = g >= f.threshold), t
      }
      function B() {
        var t = !1;
        return null !== f.cancelThreshold && null !== m && (t = et(m) - g >= f.cancelThreshold), t
      }
      function R() {
        return !(f.maxTimeThreshold && y >= f.maxTimeThreshold)
      }
      function z() {
        var t = U(),
          e = V(),
          n = null === f.pinchThreshold || _ >= f.pinchThreshold;
        return t && e && n
      }
      function F() {
        return !!(f.pinchStatus || f.pinchIn || f.pinchOut)
      }
      function W() {
        var t = R(),
          e = M(),
          n = U(),
          i = V();
        return !B() && i && n && e && t
      }
      function $() {
        return !!(f.swipe || f.swipeStatus || f.swipeLeft || f.swipeRight || f.swipeUp || f.swipeDown)
      }
      function U() {
        return E === f.fingers || f.fingers === vt || !wt
      }
      function V() {
        return 0 !== S[0].end.x
      }
      function X() {
        return !!f.tap
      }
      function G() {
        return !!f.doubleTap
      }
      function Q() {
        if (null == p)
          return !1;
        var t = st();
        return G() && t - p <= f.doubleTapThreshold
      }
      function K() {
        c = u = 0
      }
      function J() {
        var t = !1;
        return u && st() - u <= f.fingerReleaseThreshold && (t = !0), t
      }
      function Y(t) {
        a && (!0 === t ? (a.bind(i, N), a.bind(r, O), o && a.bind(o, D)) : (a.unbind(i, N, !1), a.unbind(r, O, !1), o && a.unbind(o, D, !1)), a.data(Tt + "_intouch", !0 === t))
      }
      function Z(t, e) {
        var n = {
          start: {
            x: 0,
            y: 0
          },
          last: {
            x: 0,
            y: 0
          },
          end: {
            x: 0,
            y: 0
          }
        };
        return n.start.x = n.last.x = n.end.x = e.pageX || e.clientX, n.start.y = n.last.y = n.end.y = e.pageY || e.clientY, S[t] = n
      }
      function tt(t) {
        var e = void 0 !== t.identifier ? t.identifier : 0,
          n = S[e] || null;
        return null === n && (n = Z(e, t)), n.last.x = n.end.x, n.last.y = n.end.y, n.end.x = t.pageX || t.clientX, n.end.y = t.pageY || t.clientY, n
      }
      function et(t) {
        if (T[t])
          return T[t].distance
      }
      function nt(t) {
        return {
          direction: t,
          distance: 0
        }
      }
      function it() {
        return A - l
      }
      function rt(t, e) {
        var n = Math.abs(t.x - e.x),
          i = Math.abs(t.y - e.y);
        return Math.round(Math.sqrt(n * n + i * i))
      }
      function ot(t, e) {
        if (i = e, (n = t).x == i.x && n.y == i.y)
          return ht;
        var n,
          i,
          r,
          o,
          s,
          a,
          l,
          u,
          c = (o = e, s = (r = t).x - o.x, a = o.y - r.y, l = Math.atan2(a, s), (u = Math.round(180 * l / Math.PI)) < 0 && (u = 360 - Math.abs(u)), u);
        return c <= 45 && 0 <= c ? lt : c <= 360 && 315 <= c ? lt : 135 <= c && c <= 225 ? ut : 45 < c && c < 135 ? pt : ct
      }
      function st() {
        return (new Date).getTime()
      }
      this.enable = function() {
        return this.disable(), a.bind(n, d), a.bind(s, j), a
      }, this.disable = function() {
        return q(), a
      }, this.destroy = function() {
        q(), a.data(Tt, null), a = null
      }, this.option = function(t, e) {
        if ("object" == typeof t)
          f = at.extend(f, t);
        else if (void 0 !== f[t]) {
          if (void 0 === e)
            return f[t];
          f[t] = e
        } else {
          if (!t)
            return f;
          at.error("Option " + t + " does not exist on jQuery.swipe.options")
        }
        return null
      }
    }
    at.fn.swipe = function(t) {
      var e = at(this),
        n = e.data(Tt);
      if (n && "string" == typeof t) {
        if (n[t])
          return n[t].apply(n, Array.prototype.slice.call(arguments, 1));
        at.error("Method " + t + " does not exist on jQuery.swipe")
      } else if (n && "object" == typeof t)
        n.option.apply(n, arguments);
      else if (!(n || "object" != typeof t && t))
        return function(n) {
          return !n || void 0 !== n.allowPageScroll || void 0 === n.swipe && void 0 === n.swipeStatus || (n.allowPageScroll = ht), void 0 !== n.click && void 0 === n.tap && (n.tap = n.click), n || (n = {}), n = at.extend({}, at.fn.swipe.defaults, n), this.each(function() {
            var t = at(this),
              e = t.data(Tt);
            e || (e = new i(this, n), t.data(Tt, e))
          })
        }.apply(this, arguments);
      return e
    }, at.fn.swipe.version = "1.6.18", at.fn.swipe.defaults = {
      fingers: 1,
      threshold: 75,
      cancelThreshold: null,
      pinchThreshold: 20,
      maxTimeThreshold: null,
      fingerReleaseThreshold: 250,
      longTapThreshold: 500,
      doubleTapThreshold: 200,
      swipe: null,
      swipeLeft: null,
      swipeRight: null,
      swipeUp: null,
      swipeDown: null,
      swipeStatus: null,
      pinchIn: null,
      pinchOut: null,
      pinchStatus: null,
      click: null,
      tap: null,
      doubleTap: null,
      longTap: null,
      hold: null,
      triggerOnTouchEnd: !0,
      triggerOnTouchLeave: !1,
      allowPageScroll: "auto",
      fallbackToMouseEvents: !0,
      excludedElements: ".noSwipe",
      preventDefaultEvents: !0
    }, at.fn.swipe.phases = {
      PHASE_START: "start",
      PHASE_MOVE: yt,
      PHASE_END: bt,
      PHASE_CANCEL: xt
    }, at.fn.swipe.directions = {
      LEFT: lt,
      RIGHT: ut,
      UP: ct,
      DOWN: pt,
      IN: "in",
      OUT: "out"
    }, at.fn.swipe.pageScroll = {
      NONE: ht,
      HORIZONTAL: gt,
      VERTICAL: mt,
      AUTO: "auto"
    }, at.fn.swipe.fingers = {
      ONE: 1,
      TWO: 2,
      THREE: 3,
      FOUR: 4,
      FIVE: 5,
      ALL: vt
    }
  }), function(t) {
    "use strict";
    "function" == typeof define && define.amd ? define("autocomplete", ["jquery"], t) : "object" == typeof exports && "function" == typeof require ? t(require("jquery")) : t(jQuery)
  }(function(f) {
    "use strict";
    var i = {
        escapeRegExChars: function(t) {
          return t.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&")
        },
        createNode: function(t) {
          var e = document.createElement("div");
          return e.className = t, e.style.position = "absolute", e.style.display = "none", e
        }
      },
      t = f.noop;
    function o(t, e) {
      var n = this;
      n.element = t, n.el = f(t), n.suggestions = [], n.badQueries = [], n.selectedIndex = -1, n.currentValue = n.element.value, n.timeoutId = null, n.cachedResponse = {}, n.onChangeTimeout = null, n.onChange = null, n.isLocal = !1, n.suggestionsContainer = null, n.noSuggestionsContainer = null, n.options = f.extend(!0, {}, o.defaults, e), n.classes = {
        selected: "autocomplete-selected",
        suggestion: "autocomplete-suggestion"
      }, n.hint = null, n.hintValue = "", n.selection = null, n.initialize(), n.setOptions(e)
    }
    o.utils = i, (f.Autocomplete = o).defaults = {
      ajaxSettings: {},
      autoSelectFirst: !1,
      appendTo: "body",
      serviceUrl: null,
      lookup: null,
      onSelect: null,
      width: "auto",
      minChars: 1,
      maxHeight: 300,
      deferRequestBy: 0,
      params: {},
      formatResult: function(t, e) {
        if (!e)
          return t.value;
        var n = "(" + i.escapeRegExChars(e) + ")";
        return t.value.replace(new RegExp(n, "gi"), "<strong>$1</strong>").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/&lt;(\/?strong)&gt;/g, "<$1>")
      },
      formatGroup: function(t, e) {
        return '<div class="autocomplete-group">' + e + "</div>"
      },
      delimiter: null,
      zIndex: 9999,
      type: "GET",
      noCache: !1,
      onSearchStart: t,
      onSearchComplete: t,
      onSearchError: t,
      preserveInput: !1,
      containerClass: "autocomplete-suggestions",
      tabDisabled: !1,
      dataType: "text",
      currentRequest: null,
      triggerSelectOnValidInput: !0,
      preventBadQueries: !0,
      lookupFilter: function(t, e, n) {
        return -1 !== t.value.toLowerCase().indexOf(n)
      },
      paramName: "query",
      transformResult: function(t) {
        return "string" == typeof t ? f.parseJSON(t) : t
      },
      showNoSuggestionNotice: !1,
      noSuggestionNotice: "No results",
      orientation: "bottom",
      forceFixPosition: !1
    }, o.prototype = {
      initialize: function() {
        var t,
          e = this,
          n = "." + e.classes.suggestion,
          i = e.classes.selected,
          r = e.options;
        e.element.setAttribute("autocomplete", "nope"), e.noSuggestionsContainer = f('<div class="autocomplete-no-suggestion"></div>').html(this.options.noSuggestionNotice).get(0), e.suggestionsContainer = o.utils.createNode(r.containerClass), (t = f(e.suggestionsContainer)).appendTo(r.appendTo || "body"), "auto" !== r.width && t.css("width", r.width), t.on("mouseover.autocomplete", n, function() {
          e.activate(f(this).data("index"))
        }), t.on("mouseout.autocomplete", function() {
          e.selectedIndex = -1, t.children("." + i).removeClass(i)
        }), t.on("click.autocomplete", n, function() {
          e.select(f(this).data("index"))
        }), t.on("click.autocomplete", function() {
          clearTimeout(e.blurTimeoutId)
        }), e.fixPositionCapture = function() {
          e.visible && e.fixPosition()
        }, f(window).on("resize.autocomplete", e.fixPositionCapture), e.el.on("keydown.autocomplete", function(t) {
          e.onKeyPress(t)
        }), e.el.on("keyup.autocomplete", function(t) {
          e.onKeyUp(t)
        }), e.el.on("blur.autocomplete", function() {
          e.onBlur()
        }), e.el.on("focus.autocomplete", function() {
          e.onFocus()
        }), e.el.on("change.autocomplete", function(t) {
          e.onKeyUp(t)
        }), e.el.on("input.autocomplete", function(t) {
          e.onKeyUp(t)
        })
      },
      onFocus: function() {
        this.fixPosition(), this.el.val().length >= this.options.minChars && this.onValueChange()
      },
      onBlur: function() {
        var t = this;
        t.blurTimeoutId = setTimeout(function() {
          t.hide()
        }, 200)
      },
      abortAjax: function() {
        this.currentRequest && (this.currentRequest.abort(), this.currentRequest = null)
      },
      setOptions: function(t) {
        var e = this,
          n = f.extend({}, e.options, t);
        e.isLocal = Array.isArray(n.lookup), e.isLocal && (n.lookup = e.verifySuggestionsFormat(n.lookup)), n.orientation = e.validateOrientation(n.orientation, "bottom"), f(e.suggestionsContainer).css({
          "max-height": n.maxHeight + "px",
          width: n.width + "px",
          "z-index": n.zIndex
        }), this.options = n
      },
      clearCache: function() {
        this.cachedResponse = {}, this.badQueries = []
      },
      clear: function() {
        this.clearCache(), this.currentValue = "", this.suggestions = []
      },
      disable: function() {
        this.disabled = !0, clearTimeout(this.onChangeTimeout), this.abortAjax()
      },
      enable: function() {
        this.disabled = !1
      },
      fixPosition: function() {
        var t = this,
          e = f(t.suggestionsContainer),
          n = e.parent().get(0);
        if (n === document.body || t.options.forceFixPosition) {
          var i = t.options.orientation,
            r = e.outerHeight(),
            o = t.el.outerHeight(),
            s = t.el.offset(),
            a = {
              top: s.top,
              left: s.left
            };
          if ("auto" === i) {
            var l = f(window).height(),
              u = f(window).scrollTop(),
              c = -u + s.top - r,
              p = u + l - (s.top + o + r);
            i = Math.max(c, p) === c ? "top" : "bottom"
          }
          if (a.top += "top" === i ? -r : o, n !== document.body) {
            var h,
              d = e.css("opacity");
            t.visible || e.css("opacity", 0).show(), h = e.offsetParent().offset(), a.top -= h.top, a.top += n.scrollTop, a.left -= h.left, t.visible || e.css("opacity", d).hide()
          }
          "auto" === t.options.width && (a.width = t.el.outerWidth() + "px"), e.css(a)
        }
      },
      isCursorAtEnd: function() {
        var t,
          e = this.el.val().length,
          n = this.element.selectionStart;
        return "number" == typeof n ? n === e : !document.selection || ((t = document.selection.createRange()).moveStart("character", -e), e === t.text.length)
      },
      onKeyPress: function(t) {
        var e = this;
        if (e.disabled || e.visible || 40 !== t.which || !e.currentValue) {
          if (!e.disabled && e.visible) {
            switch (t.which) {
              case 27:
                e.el.val(e.currentValue), e.hide();
                break;
              case 39:
                if (e.hint && e.options.onHint && e.isCursorAtEnd()) {
                  e.selectHint();
                  break
                }
                return;
              case 9:
                if (e.hint && e.options.onHint)
                  return void e.selectHint();
                if (-1 === e.selectedIndex)
                  return void e.hide();
                if (e.select(e.selectedIndex), !1 === e.options.tabDisabled)
                  return;
                break;
              case 13:
                if (-1 === e.selectedIndex)
                  return void e.hide();
                e.select(e.selectedIndex);
                break;
              case 38:
                e.moveUp();
                break;
              case 40:
                e.moveDown();
                break;
              default:
                return
            }
            t.stopImmediatePropagation(), t.preventDefault()
          }
        } else
          e.suggest()
      },
      onKeyUp: function(t) {
        var e = this;
        if (!e.disabled) {
          switch (t.which) {
            case 38:
            case 40:
              return
          }
          clearTimeout(e.onChangeTimeout), e.currentValue !== e.el.val() && (e.findBestHint(), 0 < e.options.deferRequestBy ? e.onChangeTimeout = setTimeout(function() {
            e.onValueChange()
          }, e.options.deferRequestBy) : e.onValueChange())
        }
      },
      onValueChange: function() {
        if (this.ignoreValueChange)
          this.ignoreValueChange = !1;
        else {
          var t = this,
            e = t.options,
            n = t.el.val(),
            i = t.getQuery(n);
          t.selection && t.currentValue !== i && (t.selection = null, (e.onInvalidateSelection || f.noop).call(t.element)), clearTimeout(t.onChangeTimeout), t.currentValue = n, t.selectedIndex = -1, e.triggerSelectOnValidInput && t.isExactMatch(i) ? t.select(0) : i.length < e.minChars ? t.hide() : t.getSuggestions(i)
        }
      },
      isExactMatch: function(t) {
        var e = this.suggestions;
        return 1 === e.length && e[0].value.toLowerCase() === t.toLowerCase()
      },
      getQuery: function(t) {
        var e,
          n = this.options.delimiter;
        return n ? (e = t.split(n), f.trim(e[e.length - 1])) : t
      },
      getSuggestionsLocal: function(e) {
        var t,
          n = this.options,
          i = e.toLowerCase(),
          r = n.lookupFilter,
          o = parseInt(n.lookupLimit, 10);
        return t = {
          suggestions: f.grep(n.lookup, function(t) {
            return r(t, e, i)
          })
        }, o && t.suggestions.length > o && (t.suggestions = t.suggestions.slice(0, o)), t
      },
      getSuggestions: function(i) {
        var t,
          e,
          n,
          r,
          o = this,
          s = o.options,
          a = s.serviceUrl;
        s.params[s.paramName] = i, !1 !== s.onSearchStart.call(o.element, s.params) && (e = s.ignoreParams ? null : s.params, f.isFunction(s.lookup) ? s.lookup(i, function(t) {
          o.suggestions = t.suggestions, o.suggest(), s.onSearchComplete.call(o.element, i, t.suggestions)
        }) : (o.isLocal ? t = o.getSuggestionsLocal(i) : (f.isFunction(a) && (a = a.call(o.element, i)), n = a + "?" + f.param(e || {}), t = o.cachedResponse[n]), t && Array.isArray(t.suggestions) ? (o.suggestions = t.suggestions, o.suggest(), s.onSearchComplete.call(o.element, i, t.suggestions)) : o.isBadQuery(i) ? s.onSearchComplete.call(o.element, i, []) : (o.abortAjax(), r = {
          url: a,
          data: e,
          type: s.type,
          dataType: s.dataType
        }, f.extend(r, s.ajaxSettings), o.currentRequest = f.ajax(r).done(function(t) {
          var e;
          o.currentRequest = null, e = s.transformResult(t, i), o.processResponse(e, i, n), s.onSearchComplete.call(o.element, i, e.suggestions)
        }).fail(function(t, e, n) {
          s.onSearchError.call(o.element, i, t, e, n)
        }))))
      },
      isBadQuery: function(t) {
        if (!this.options.preventBadQueries)
          return !1;
        for (var e = this.badQueries, n = e.length; n--;)
          if (0 === t.indexOf(e[n]))
            return !0;
        return !1
      },
      hide: function() {
        var t = this,
          e = f(t.suggestionsContainer);
        f.isFunction(t.options.onHide) && t.visible && t.options.onHide.call(t.element, e), t.visible = !1, t.selectedIndex = -1, clearTimeout(t.onChangeTimeout), f(t.suggestionsContainer).hide(), t.signalHint(null)
      },
      suggest: function() {
        if (this.suggestions.length) {
          var r,
            t = this,
            o = t.options,
            s = o.groupBy,
            a = o.formatResult,
            l = t.getQuery(t.currentValue),
            u = t.classes.suggestion,
            e = t.classes.selected,
            n = f(t.suggestionsContainer),
            i = f(t.noSuggestionsContainer),
            c = o.beforeRender,
            p = "";
          o.triggerSelectOnValidInput && t.isExactMatch(l) ? t.select(0) : (f.each(t.suggestions, function(t, e) {
            var n,
              i;
            s && (p += (i = (n = e).data[s], r === i ? "" : (r = i, o.formatGroup(n, r)))), p += '<div class="' + u + '" data-index="' + t + '">' + a(e, l, t) + "</div>"
          }), this.adjustContainerWidth(), i.detach(), n.html(p), f.isFunction(c) && c.call(t.element, n, t.suggestions), t.fixPosition(), n.show(), o.autoSelectFirst && (t.selectedIndex = 0, n.scrollTop(0), n.children("." + u).first().addClass(e)), t.visible = !0, t.findBestHint())
        } else
          this.options.showNoSuggestionNotice ? this.noSuggestions() : this.hide()
      },
      noSuggestions: function() {
        var t = this,
          e = t.options.beforeRender,
          n = f(t.suggestionsContainer),
          i = f(t.noSuggestionsContainer);
        this.adjustContainerWidth(), i.detach(), n.empty(), n.append(i), f.isFunction(e) && e.call(t.element, n, t.suggestions), t.fixPosition(), n.show(), t.visible = !0
      },
      adjustContainerWidth: function() {
        var t,
          e = this.options,
          n = f(this.suggestionsContainer);
        "auto" === e.width ? (t = this.el.outerWidth(), n.css("width", 0 < t ? t : 300)) : "flex" === e.width && n.css("width", "")
      },
      findBestHint: function() {
        var i = this.el.val().toLowerCase(),
          r = null;
        i && (f.each(this.suggestions, function(t, e) {
          var n = 0 === e.value.toLowerCase().indexOf(i);
          return n && (r = e), !n
        }), this.signalHint(r))
      },
      signalHint: function(t) {
        var e = "",
          n = this;
        t && (e = n.currentValue + t.value.substr(n.currentValue.length)), n.hintValue !== e && (n.hintValue = e, n.hint = t, (this.options.onHint || f.noop)(e))
      },
      verifySuggestionsFormat: function(t) {
        return t.length && "string" == typeof t[0] ? f.map(t, function(t) {
          return {
            value: t,
            data: null
          }
        }) : t
      },
      validateOrientation: function(t, e) {
        return t = f.trim(t || "").toLowerCase(), -1 === f.inArray(t, ["auto", "bottom", "top"]) && (t = e), t
      },
      processResponse: function(t, e, n) {
        var i = this,
          r = i.options;
        t.suggestions = i.verifySuggestionsFormat(t.suggestions), r.noCache || (i.cachedResponse[n] = t, r.preventBadQueries && !t.suggestions.length && i.badQueries.push(e)), e === i.getQuery(i.currentValue) && (i.suggestions = t.suggestions, i.suggest())
      },
      activate: function(t) {
        var e,
          n = this,
          i = n.classes.selected,
          r = f(n.suggestionsContainer),
          o = r.find("." + n.classes.suggestion);
        return r.find("." + i).removeClass(i), n.selectedIndex = t, -1 !== n.selectedIndex && o.length > n.selectedIndex ? (e = o.get(n.selectedIndex), f(e).addClass(i), e) : null
      },
      selectHint: function() {
        var t = f.inArray(this.hint, this.suggestions);
        this.select(t)
      },
      select: function(t) {
        this.hide(), this.onSelect(t)
      },
      moveUp: function() {
        var t = this;
        if (-1 !== t.selectedIndex)
          return 0 === t.selectedIndex ? (f(t.suggestionsContainer).children("." + t.classes.suggestion).first().removeClass(t.classes.selected), t.selectedIndex = -1, t.ignoreValueChange = !1, t.el.val(t.currentValue), void t.findBestHint()) : void t.adjustScroll(t.selectedIndex - 1)
      },
      moveDown: function() {
        this.selectedIndex !== this.suggestions.length - 1 && this.adjustScroll(this.selectedIndex + 1)
      },
      adjustScroll: function(t) {
        var e = this,
          n = e.activate(t);
        if (n) {
          var i,
            r,
            o,
            s = f(n).outerHeight();
          i = n.offsetTop, o = (r = f(e.suggestionsContainer).scrollTop()) + e.options.maxHeight - s, i < r ? f(e.suggestionsContainer).scrollTop(i) : o < i && f(e.suggestionsContainer).scrollTop(i - e.options.maxHeight + s), e.options.preserveInput || (e.ignoreValueChange = !0, e.el.val(e.getValue(e.suggestions[t].value))), e.signalHint(null)
        }
      },
      onSelect: function(t) {
        var e = this,
          n = e.options.onSelect,
          i = e.suggestions[t];
        e.currentValue = e.getValue(i.value), e.currentValue === e.el.val() || e.options.preserveInput || e.el.val(e.currentValue), e.signalHint(null), e.suggestions = [], e.selection = i, f.isFunction(n) && n.call(e.element, i)
      },
      getValue: function(t) {
        var e,
          n,
          i = this.options.delimiter;
        return i ? 1 === (n = (e = this.currentValue).split(i)).length ? t : e.substr(0, e.length - n[n.length - 1].length) + t : t
      },
      dispose: function() {
        this.el.off(".autocomplete").removeData("autocomplete"), f(window).off("resize.autocomplete", this.fixPositionCapture), f(this.suggestionsContainer).remove()
      }
    }, f.fn.devbridgeAutocomplete = function(n, i) {
      var r = "autocomplete";
      return arguments.length ? this.each(function() {
        var t = f(this),
          e = t.data(r);
        "string" == typeof n ? e && "function" == typeof e[n] && e[n](i) : (e && e.dispose && e.dispose(), e = new o(this, n), t.data(r, e))
      }) : this.first().data(r)
    }, f.fn.autocomplete || (f.fn.autocomplete = f.fn.devbridgeAutocomplete)
  }), function() {
    !function(t) {
      "function" == typeof define && define.amd ? define("core", ["jslib"], t) : t(this.$)
    }(function(s) {
      "use strict";
      var t;
      return t = function() {
        function t() {
          s.getScript = s.getScript || this.getScript, s.getStyle = s.getStyle || this.getStyle, this.animations = !0, this.uuid = 0
        }
        return t.prototype.namespace = window.UI_JS_NAMESPACE || "ui_", t.prototype.cssNamespace = window.UI_CSS_NAMESPACE || "ui-", t.prototype.getGUID = function(t) {
          return null == t && (t = "id-"), t + this.uuid++
        }, t.prototype.getScript = function(t, e, n) {
          var i,
            r;
          return r = document.createElement("script"), i = s(r), r.src = t, s("head").append(r), i.bind("load", e), i.bind("error", n)
        }, t.prototype.getStyle = function(t) {
          return s(document.createElement("link")).attr({
            rel: "stylesheet",
            href: t
          }).insertAfter(s("head link[rel='stylesheet']").last())
        }, t.prototype.getInstance = function(t, e) {
          var n,
            i,
            r,
            o;
          for (s.isArray(e) || (e = e.split(",")), i = null, r = 0, o = e.length; r < o; r++)
            if (n = e[r], i = s(t).data("" + this.namespace + n))
              return i;
          return i
        }, t.prototype.allowAnimation = function(t) {
          return null != t && (this.animations = t, s(window).trigger("animations", {
            animate: this.animations
          })), this.animations && !(document.webkitHidden || document.mozHidden || document.msHidden || document.hidden)
        }, t
      }(), window._ = new t
    })
  }.call(this), function() {
    var l,
      u = [].slice;
    !function(t) {
      "function" == typeof define && define.amd ? define("plugin", ["jslib"], t) : t(this.$)
    }(l = function(a) {
      return function() {
        function i(t, e) {
          this.element = t, this.initializer(e), this.eventsBinder()
        }
        return i.namespace = "epfl_", i.defaultOptions = {}, i.prototype.initializer = function(t) {
          return this.initialize(t)
        }, i.prototype.initialize = function(t) {
          return this.options && this.reset(this.options), this.options = t
        }, i.prototype.eventsBinder = function() {
          return this.bindEvents()
        }, i.prototype.bindEvents = function() {}, i.prototype.reset = function(t) {}, i.prototype.destroy = function() {
          return this.element.trigger("ui-destroy")
        }, i.prototype.destructor = function() {
          var t;
          return this.element && this.element.off("ui-destroy"), t = this.element, this.element = null, this.defaultOptions = null, this.namespace = null, this.options = null, t
        }, i.install = function(t, e, n) {
          var o,
            s;
          return null == t && (t = this.name), null == e && (e = i.namespace), s = this, "function" == typeof t ? (n = t, t = this.name) : "function" == typeof e && (n = e, e = "epfl_"), t = t.toLowerCase(), this.prototype.name = t, o = (e || "") + t, a.fn[o] = function() {
            var e,
              r;
            return r = arguments[0], e = 2 <= arguments.length ? u.call(arguments, 1) : [], this.each(function() {
              var n,
                t,
                i;
              return n = a(this), i = a.extend({
                pluginName: o
              }, s.defaultOptions), a.each(i, function(t) {
                var e;
                return (e = n.attr("data-" + t)) && (i[t] = e), e
              }), i = a.extend({}, i, a.isPlainObject(r) ? r : {}), null == (t = n.data(o)) ? (l = function(t, e, n) {
                n.prototype = t.prototype;
                var i = new n,
                  r = t.apply(i, e);
                return Object(r) === r ? r : i
              }(s, [n, i].concat(u.call(e)), function() {}), n.data(o, l), n.on("ui-destroy." + o, function() {
                return a.isFunction(n.removeData) ? n.removeData(o) : n.data(o, void 0), n.off("." + o), l.destructor()
              }), l) : "string" === a.type(r) ? t[r].apply(t, e) : null != t.initialize ? t.initialize.apply(t, [i].concat(e)) : void 0
            })
          }, "function" == typeof n && a(n), s
        }, i
      }()
    })
  }.call(this), function() {
    var o,
      s = {}.hasOwnProperty;
    !function(t) {
      "function" == typeof define && define.amd ? define("ellipsis", ["jslib", "core", "plugin"], t) : t(this.$, _, AbstractPlugin)
    }(o = function(n, i, r) {
      "use strict";
      var t;
      return (t = function(t) {
        function e() {
          return e.__super__.constructor.apply(this, arguments)
        }
        return function(t, e) {
          for (var n in e)
            s.call(e, n) && (t[n] = e[n]);
          function i() {
            this.constructor = t
          }
          i.prototype = e.prototype, t.prototype = new i, t.__super__ = e.prototype
        }(e, r), e.defaultOptions = {
          format: "html",
          parent: "",
          append: "&hellip;",
          resize: !0,
          keep: "",
          allowDescenders: !0
        }, e.prototype.initialize = function(t) {
          if (e.__super__.initialize.call(this, t), "html" === this.options.format ? (this.element.html(this.element.html().replace(/\n/g, "").replace(/\ +/g, " ").replace(/> </g, "><").replace(/^\s\s*/g, "").replace(/\s\s*$/g, "")), this.originalText = this.element.html()) : (this.element.text(this.element.text().replace(/^\s\s*/, "").replace(/\s\s*$/, "")), this.originalText = this.element.text()), this.parent = this.element.parents(this.options.parent || void 0).first(), this.parent.length)
            return this.truncate()
        }, e.prototype.bindEvents = function() {}, e.prototype.truncate = function() {
          var t,
            e,
            n,
            i,
            r,
            o,
            s,
            a,
            l,
            u,
            c,
            p;
          if ("html" === this.options.format ? this.element.html(this.originalText) : this.element.text(this.originalText), r = this.parent.height() + this.parent.offset().top - this.element.offset().top + (parseInt(this.parent.css("padding-bottom"), 10) || 0), this.options.descenders && (r += (parseInt(this.element.css("font-size"), 10) || 0) / 2), !(r <= 0)) {
            for (p = this.originalText, e = this.options.append, this.options.keep && (u = new RegExp('<(\\w+)[^>]*?class="([^"]+ )?' + this.options.keep + '( [^"]+)?\\2[^>]*>.*<\\/\\1>'), (s = p.match(u)) && (p = p.replace(u, "").replace(/^\s\s*/, "").replace(/\s\s*$/, ""), e += s.length && "&nbsp;" + s[0] || "")), (t = this.parent.eq(0).children().last()).get(0) !== this.element.get(0) && (r -= t.height()), i = !0, l = (parseInt(this.element.css("border-top-width"), 10) || 0) + (parseInt(this.element.css("border-bottom-width"), 10) || 0) + (parseInt(this.element.css("padding-top"), 10) || 0) + (parseInt(this.element.css("padding-bottom"), 10) || 0) + (parseInt(this.element.css("margin-top"), 10) || 0) + 0, parseInt(this.element.css("margin-bottom"), 10), c = []; !(this.element.height() + l <= r) && i;)
              if ("html" === this.options.format) {
                if (!(a = p))
                  break;
                i = a !== (p = this.truncateHtml(p)), this.element.html(p), (n = this.element.children()).length ? (o = n.last(), c.push(o.html(o.html() + e))) : c.push(this.element.html(this.element.html() + e))
              } else {
                if (!(a = p))
                  break;
                i = a !== (p = this.truncateText(a)), c.push(this.element.text(p + e))
              }
            return c
          }
        }, e.prototype.truncateText = function(t) {
          return t.replace(/\W*\s(\S)*$/, "")
        }, e.prototype.truncateHtml = function(t) {
          return t.replace(/\s*[^>\s]+\s*((<\/\w+>)*)$/, "$1").replace(/<(\w+)[^>]*><\/\1>/g, "")
        }, e.doTruncate = function() {
          return n("[data-ellipsis]").each(function() {
            if ((o = i.getInstance(this, "ellipsis")).options.resize)
              return o.truncate()
          })
        }, e.prototype.reset = function(t) {
          return "html" === t.format ? this.element.html(this.originalText) : this.element.text(this.originalText)
        }, e
      }()).install("Ellipsis", function() {
        return n("[data-ellipsis='html']")[i.namespace + "ellipsis"]({
          format: "html",
          append: "&hellip;"
        }), n("[data-ellipsis='text']")[i.namespace + "ellipsis"]({
          format: "text",
          append: "…"
        }), n(window).on("resize", function() {
          return clearTimeout(t.resizing), t.resizing = setTimeout(t.doTruncate, 200)
        })
      })
    })
  }.call(this), function() {
    var p,
      r = {}.hasOwnProperty,
      h = [].slice;
    !function(t) {
      "function" == typeof define && define.amd ? define("widget", ["jslib", "core", "plugin"], t) : t(this.$, _, AbstractPlugin)
    }(p = function(u, c, e) {
      var t;
      return t = function(t) {
        function l(t, e) {
          this.element = t, this.initializer(e), this.accessibilizer(), this.eventsBinder()
        }
        return function(t, e) {
          for (var n in e)
            r.call(e, n) && (t[n] = e[n]);
          function i() {
            this.constructor = t
          }
          i.prototype = e.prototype, t.prototype = new i, t.__super__ = e.prototype
        }(l, e), l.defaultOptions = {}, l.prototype.accessibilizer = function() {
          return this.aria()
        }, l.prototype.aria = function() {}, l.prototype.handleKeys = function(t, e) {
          return t.on("keydown." + this.options.pluginName, (n = this, function(t) {
            if ("true" !== n.element.attr("aria-disabled"))
              switch (t.keyCode || t.which) {
                case 9:
                  return n.keyTab(t);
                case 13:
                  return n.keyEnter(t);
                case 32:
                  return n.keySpace(t);
                case 27:
                  return n.keyEscape(t);
                case 37:
                  return n.keyLeft(t);
                case 38:
                  return n.keyUp(t);
                case 39:
                  return n.keyRight(t);
                case 40:
                  return n.keyDown(t);
                case 33:
                  return n.keyPageUp(t);
                case 34:
                  return n.keyPageDown(t);
                case 36:
                  return n.keyHome(t);
                case 35:
                  return n.keyEnd(t);
                case 106:
                  return n.keyAsterisk(t);
                default:
                  if (48 <= t.keyCode && t.keyCode <= 57)
                    return n.keyNumber(t);
                  if (65 <= t.keyCode && t.keyCode <= 90)
                    return n.keyLetter(t)
              }
          }));
          var n
        }, l.prototype.keyTab = function(t) {}, l.prototype.keyEnter = function(t) {}, l.prototype.keySpace = function(t) {
          return this.keyEnter(t)
        }, l.prototype.keyEscape = function(t) {}, l.prototype.keyLeft = function(t) {}, l.prototype.keyRight = function(t) {}, l.prototype.keyUp = function(t) {}, l.prototype.keyDown = function(t) {}, l.prototype.keyPageUp = function(t) {}, l.prototype.keyPageDown = function(t) {}, l.prototype.keyHome = function(t) {}, l.prototype.keyEnd = function(t) {}, l.prototype.keyAsterisk = function(t) {}, l.prototype.keyNumber = function(t) {}, l.prototype.keyLetter = function(t) {}, l.install = function(t, e, n) {
          var s,
            a;
          return null == t && (t = this.name), null == e && (e = c.namespace), a = this, "function" == typeof t ? (n = t, t = this.name) : "function" == typeof e && (n = e, e = c.namespace), c[t] = this, t = t.toLowerCase(), this.prototype.name = t, s = (e || "") + t, u.fn[s] = function() {
            var r,
              o;
            return o = arguments[0], r = 2 <= arguments.length ? h.call(arguments, 1) : [], this.each(function() {
              var n,
                t,
                i,
                e;
              if (n = u(this), i = u.extend({
                pluginName: s
              }, a.defaultOptions), u.each(i, function(t) {
                var e;
                return (e = n.attr("data-" + t)) && (i[t] = e), e
              }), i = u.extend({}, i, u.isPlainObject(o) ? o : {}), null == (t = n.data(s))) {
                for (p = function(t, e, n) {
                  n.prototype = t.prototype;
                  var i = new n,
                    r = t.apply(i, e);
                  return Object(r) === r ? r : i
                }(a, [n, i].concat(h.call(r)), function() {}), n.data(s, p), e = a.prototype; e !== l.prototype && e;)
                  n.addClass(c.cssNamespace + e.name), e = ("function" == typeof Object.getPrototypeOf ? Object.getPrototypeOf(e) : void 0) || e.__proto__;
                return n.on("ui-destroy." + s, function() {
                  for (u.isFunction(n.removeData) ? n.removeData(s) : n.data(s, void 0), e = a.prototype; e !== l.prototype && e;)
                    n.off("." + c.namespace + e.name), e = ("function" == typeof Object.getPrototypeOf ? Object.getPrototypeOf(e) : void 0) || e.__proto__;
                  return p.destructor()
                }), p
              }
              return "string" === u.type(o) ? t[o].apply(t, r) : null != t.initialize ? t.initialize.apply(t, [i].concat(r)) : void 0
            })
          }, "function" == typeof n && u(n), a
        }, l
      }(), c.AbstractWidget = t
    })
  }.call(this), function() {
    var r = {}.hasOwnProperty;
    !function(t) {
      "function" == typeof define && define.amd ? define("overlay", ["jslib", "core", "widget"], t) : t(this.$, _, _.AbstractWidget)
    }(function(n, t, i) {
      "use strict";
      return function(t) {
        function e() {
          return e.__super__.constructor.apply(this, arguments)
        }
        return function(t, e) {
          for (var n in e)
            r.call(e, n) && (t[n] = e[n]);
          function i() {
            this.constructor = t
          }
          i.prototype = e.prototype, t.prototype = new i, t.__super__ = e.prototype
        }(e, i), e.defaultOptions = {
          wrapper: "overlay",
          cssclass: "overlay"
        }, e.prototype.initialize = function(t) {
          return e.__super__.initialize.call(this, t), this.wrapper = this.findWrapper()
        }, e.prototype.aria = function() {
          return this.wrapper.attr("aria-hidden", "true")
        }, e.prototype.bindEvents = function() {
          return this.wrapper.on("click", (e = this, function(t) {
            return e.hide(t)
          }));
          var e
        }, e.prototype.show = function(t) {
          return this.toggle(!0, t)
        }, e.prototype.hide = function(t) {
          return this.toggle(!1, t)
        }, e.prototype.toggle = function(t, e) {
          return this.element.trigger("beforeOverlay", {
            element: this.element,
            event: e,
            status: t
          }), this.wrapper.attr("aria-hidden", !t), t ? this.element.css("z-index", parseInt(this.wrapper.css("z-index"), 10) + 1) : this.element.css("z-index", "initial"), this.element.trigger("afterOverlay", {
            element: this.element,
            event: e,
            status: t
          })
        }, e.prototype.findWrapper = function() {
          var t;
          return (t = n("#" + this.options.wrapper)).length || (t = this.createWrapper().appendTo(n("body"))), t
        }, e.prototype.createWrapper = function() {
          return n(document.createElement("div")).attr({
            id: this.options.wrapper,
            class: this.options.cssclass
          })
        }, e.prototype.keyEscape = function(t) {
          return this.hide()
        }, e.prototype.destructor = function() {
          return e.__super__.destructor.call(this), this.wrapper = null
        }, e
      }().install("Overlay")
    })
  }.call(this), function() {
    var s = {}.hasOwnProperty;
    !function(t) {
      "function" == typeof define && define.amd ? define("toggle", ["jslib", "core", "widget"], t) : t(this.$, _, _.AbstractWidget)
    }(function(r, o, n) {
      "use strict";
      return function(t) {
        function e() {
          return e.__super__.constructor.apply(this, arguments)
        }
        return function(t, e) {
          for (var n in e)
            s.call(e, n) && (t[n] = e[n]);
          function i() {
            this.constructor = t
          }
          i.prototype = e.prototype, t.prototype = new i, t.__super__ = e.prototype
        }(e, n), e.defaultOptions = {
          toggleHiddenClass: "toggle-hidden",
          toggleVisibleClass: "toggle-visible",
          paneHiddenClass: "toggle-hidden",
          paneVisibleClass: "toggle-visible",
          event: "click",
          labelledby: "",
          target: "",
          overlay: !1
        }, e.prototype.initialize = function(t) {
          if (e.__super__.initialize.call(this, t), this.element.attr("tabindex", 0), this.targets = this.findTargets(), this.silentToggle(!1), this.targets.length && "false" === this.targets.get(0).getAttribute("aria-hidden") && this.show({}), "true" === this.options.overlay || !0 === this.options.overlay)
            return this.targets[o.namespace + "overlay"]()
        }, e.prototype.aria = function() {
          var n,
            i;
          if (this.element.attr("role") || this.element.attr("role", "button"), n = "", this.targets.each((i = this, function(t, e) {
            if (r(e), !i.element.attr("aria-controls"))
              return e.id || (e.id = o.getGUID("toggle-pane-")), n += e.id + " "
          })), !this.element.attr("aria-controls"))
            return this.element.attr("aria-controls", r.trim(n))
        }, e.prototype.bindEvents = function() {
          var e,
            n;
          if (this.handleKeys(this.element), this.options.event && this.element.on(this.options.event + "." + o.namespace + "toggle", (e = this, function(t) {
            if (t.preventDefault(), "true" !== t.target.getAttribute("aria-disabled"))
              return e.toggle(void 0, t)
          })), "true" === this.options.overlay || !0 === this.options.overlay)
            return this.targets.on("beforeOverlay", (n = this, function(t, e) {
              if (!1 === e.status)
                return n.hide(t)
            }))
        }, e.prototype.show = function(t) {
          return this.toggle(!0, t)
        }, e.prototype.hide = function(t) {
          return this.toggle(!1, t)
        }, e.prototype.toggle = function(t, e) {
          if ("true" !== this.element.get(0).getAttribute("aria-disabled"))
            return null == t && this.targets.length && (t = "true" === this.targets.get(0).getAttribute("aria-hidden")), !t || e && "beforeOverlay" === e.type || "true" !== this.options.overlay && !0 !== this.options.overlay || this.targets[o.namespace + "overlay"]("show", e), this.element.trigger("beforeToggle", {
              toggle: this.element,
              targets: this.targets,
              status: t,
              event: e
            }), this.targets.trigger("beforeToggle", {
              toggle: this.element,
              targets: this.targets,
              status: t,
              event: e
            }), this.silentToggle(t), t || e && "beforeOverlay" === e.type || "true" !== this.options.overlay && !0 !== this.options.overlay || this.targets[o.namespace + "overlay"]("hide", e), this.element.trigger("afterToggle", {
              toggle: this.element,
              targets: this.targets,
              status: t,
              event: e
            }), this.targets.trigger("afterToggle", {
              toggle: this.element,
              targets: this.targets,
              status: t,
              event: e
            }), this.element
        }, e.prototype.silentToggle = function(n) {
          return this.element.toggleClass(this.options.toggleHiddenClass, !n).toggleClass(this.options.toggleVisibleClass, n), this.targets.toggleClass(this.options.paneHiddenClass, !n).toggleClass(this.options.paneVisibleClass, n), this.targets.each(function(t, e) {
            return r(e).attr("aria-hidden", !n)
          })
        }, e.prototype.findTargets = function() {
          var t,
            e,
            n;
          return e = this.element.attr("aria-controls"), n = this.element.attr("href"), e ? r("#" + e.split(" ").join(",#")) : this.options.target ? (t = r(this.options.target, this.element)).length ? t : r(this.options.target, this.element.parent()) : n && 0 === n.indexOf("#") && 1 < n.length ? r(n) : 1 < this.element.children().length ? this.element.children().eq(1) : this.element.next()
        }, e.prototype.keySpace = function(t) {
          return t.preventDefault(), t.stopPropagation(), this.toggle(void 0, t)
        }, e.prototype.keyEnter = function(t) {
          return this.keySpace(t)
        }, e.prototype.reset = function(t) {
          return e.__super__.reset.call(this, t), this.element.removeClass(t.toggleHiddenClass).removeClass(t.toggleVisibleClass), this.targets = this.findTargets(), this.targets.removeClass(t.paneHiddenClass).removeClass(t.paneVisibleClass)
        }, e.prototype.destructor = function() {
          return this.element.off("beforeOverlay afterOverlay"), e.__super__.destructor.apply(this, arguments), this.targets = null
        }, e
      }().install("Toggle", function() {
        return r("[data-widget='toggle']")[o.namespace + "toggle"]()
      })
    })
  }.call(this), function() {
    var r = {}.hasOwnProperty;
    !function(t) {
      "function" == typeof define && define.amd ? define("tooltip", ["jslib", "core", "widget", "toggle"], t) : t(this.$, _, _.AbstractWidget, _.Toggle)
    }(function(a, l, t, n) {
      "use strict";
      return function(t) {
        function e() {
          return e.__super__.constructor.apply(this, arguments)
        }
        return function(t, e) {
          for (var n in e)
            r.call(e, n) && (t[n] = e[n]);
          function i() {
            this.constructor = t
          }
          i.prototype = e.prototype, t.prototype = new i, t.__super__ = e.prototype
        }(e, n), e.defaultOptions = {
          toggleHiddenClass: "",
          toggleVisibleClass: "",
          paneHiddenClass: "hidden",
          paneVisibleClass: "focus",
          event: "mouseenter." + l.namespace + "toggle mouseleave." + l.namespace + "toggle",
          labelledby: "",
          target: "",
          tooltip: "",
          overlay: !1
        }, e.prototype.initialize = function(t) {
          return this.created = {
            tooltip: !1
          }, e.__super__.initialize.call(this, t), this.hide()
        }, e.prototype.aria = function() {
          var o,
            s;
          if (e.__super__.aria.apply(this, arguments), this.targets !== this.element)
            return this.targets.attr("role", "tooltip"), o = "", this.targets.each((s = this, function(t, e) {
              var n,
                i,
                r;
              if (i = a(e), !s.element.attr("aria-describedby"))
                return n = i.parents("[role]"), e.id || (r = i.get(0).outerHTML, n.length && (r = n.get(0).outerHTML + r), e.id = "tooltip-" + l.hash(r)), o += e.id + " ", s.element.attr("aria-describedby", a.trim(o))
            }))
        }, e.prototype.bindEvents = function() {
          var e,
            n,
            i,
            o,
            r;
          if (this.handleKeys(this.element), this.options.event && this.element.on("" + this.options.event, (e = this, function(t) {
            return "true" === t.target.getAttribute("aria-disabled") ? t.preventDefault() : "true" !== e.options.overlay && !0 !== e.options.overlay || "false" !== a("#overlay").attr("aria-hidden") ? (t.preventDefault(), "mouseenter" === t.type ? e.show() : "mouseout" === t.type ? e.hide() : e.toggle(void 0, t)) : void 0
          })), this.element.on("focus." + l.namespace + "tooltip", (n = this, function(t) {
            if (t.relatedTarget)
              return n.show(t)
          })), this.element.on("blur." + l.namespace + "tooltip", (i = this, function(t) {
            if (t.relatedTarget)
              return i.hide(t)
          })), this.element.on("afterToggle." + l.namespace + "tooltip", (o = this, function(t, r) {
            return o.targets.each(function(t, e) {
              var n,
                i;
              if (n = a(e), i = parseInt(o.element.css("line-height"), 10), n.attr("aria-hidden", r.visible), n.css({
                left: o.element.position().left + o.element.width(),
                top: o.element.position().top - i
              }), 0 < t)
                return n.css("top", parseInt(n.css("top"), 10) + o.targets.eq(t - 1).height() + i)
            })
          })), "true" === this.options.overlay || !0 === this.options.overlay)
            return this.targets.on("beforeOverlay", (r = this, function(t, e) {
              if (!1 === e.status)
                return r.hide(t)
            }))
        }, e.prototype.findTargets = function() {
          var t;
          return (t = this.element.attr("aria-describedby")) ? a("#" + t.split(" ").join(",#")) : this.options.tooltip && !this.targets ? this.createTooltip().insertAfter(this.element) : e.__super__.findTargets.apply(this, arguments)
        }, e.prototype.createTooltip = function() {
          return this.created.tooltip = !0, a(document.createElement("span")).text(this.options.tooltip)
        }, e.prototype.keyEscape = function(t) {
          return this.hide(t)
        }, e.prototype.destructor = function() {
          return this.created.tooltip && this.targets.remove(), e.__super__.destructor.call(this)
        }, e
      }().install("Tooltip", function() {
        return a("[data-widget='tooltip']")[l.namespace + "tooltip"]()
      })
    })
  }.call(this), function() {
    var o = {}.hasOwnProperty;
    !function(t) {
      "function" == typeof define && define.amd ? define("collapse", ["jslib", "core", "widget", "toggle"], t) : t(this.$, _, _.AbstractWidget, _.Toggle)
    }(function(n, r, t, i) {
      "use strict";
      return function(t) {
        function e() {
          return e.__super__.constructor.apply(this, arguments)
        }
        return function(t, e) {
          for (var n in e)
            o.call(e, n) && (t[n] = e[n]);
          function i() {
            this.constructor = t
          }
          i.prototype = e.prototype, t.prototype = new i, t.__super__ = e.prototype
        }(e, i), e.defaultOptions = {
          event: "click",
          target: "",
          labelledby: "",
          toggleHiddenClass: "toggle-collapsed",
          toggleVisibleClass: "toggle-expanded",
          paneHiddenClass: "toggle-collapsed",
          paneVisibleClass: "toggle-expanded",
          overlay: !1
        }, e.prototype.initialize = function(t) {
          if (e.__super__.initialize.call(this, t), "true" === this.element.get(0).getAttribute("aria-expanded"))
            return this.show()
        }, e.prototype.aria = function() {
          return e.__super__.aria.call(this), this.element.attr("id") || this.element.attr("id", r.getGUID("toggle-")), this.element.attr({
            "aria-expanded": "true" === this.element.get(0).getAttribute("aria-expanded")
          }), this.options.labelledby && this.element.attr("aria-labelledby", this.options.labelledby.id), this.targets.attr({
            "aria-expanded": "true" === this.element.get(0).getAttribute("aria-expanded"),
            "aria-labelledby": this.options.labelledby ? this.options.labelledby.id : this.element.attr("id")
          })
        }, e.prototype.bindEvents = function() {
          return e.__super__.bindEvents.apply(this, arguments), this.element.on("afterToggle." + r.namespace + "collapse", (i = this, function(t, e) {
            var n;
            if ("true" !== i.element.get(0).getAttribute("aria-disabled"))
              return n = i.element.hasClass(i.options.toggleVisibleClass), i.element.attr("aria-expanded", n), i.targets.attr("aria-expanded", n).attr("tabindex", !0 === n ? "" : "-1")
          }));
          var i
        }, e.prototype.destructor = function() {
          return this.element.removeAttr("role tabindex aria-expanded"), this.element.attr("id").match(/toggle-(\d+)/) && this.element.removeAttr("id"), e.__super__.destructor.call(this), this.targets.removeAttr("aria-expanded aria-labelledby").each(function(t, e) {
            if (e.id.match(/toggle-pane-(\d+)/))
              return n(e).removeAttr("id")
          }), this.targets = null
        }, e
      }().install("Collapse", function() {
        return n("[data-widget='collapse']")[r.namespace + "collapse"]()
      })
    })
  }.call(this), function() {
    var s = {}.hasOwnProperty;
    !function(t) {
      "function" == typeof define && define.amd ? define("accordions", ["jslib", "core", "widget", "collapse"], t) : t(this.$, _, _.AbstractWidget, _.Collapse)
    }(function(r, o, n, t) {
      "use strict";
      return function(t) {
        function e() {
          return e.__super__.constructor.apply(this, arguments)
        }
        return function(t, e) {
          for (var n in e)
            s.call(e, n) && (t[n] = e[n]);
          function i() {
            this.constructor = t
          }
          i.prototype = e.prototype, t.prototype = new i, t.__super__ = e.prototype
        }(e, n), e.defaultOptions = {
          event: "click",
          tabs: "",
          panels: "",
          position: "top"
        }, e.prototype.initialize = function(t) {
          var i;
          return e.__super__.initialize.call(this, t), this.tabs = this.findTabs(), this.panels = this.findPanels(), this.tabs.each((i = this, function(t, e) {
            var n;
            return (n = r(e))[o.namespace + "collapse"]({
              event: "",
              target: i.panels.eq(i.tabs.index(n))
            }), n.attr("tabindex", -1), n.find("*").attr("tabindex", -1)
          })), this.tabs.eq(0).attr("tabindex", 0).find("*").removeAttr("tabindex")
        }, e.prototype.aria = function() {
          return this.element.attr({
            role: "tablist",
            "aria-multiselectable": !0
          }), this.tabs.attr("role", "tab"), this.panels.attr("role", "tabpanel")
        }, e.prototype.bindEvents = function() {
          var e,
            n;
          return this.handleKeys(this.element), this.element.on(this.options.event + "." + o.namespace + "accordions", "[role='tab']", (e = this, function(t) {
            if (t.preventDefault(), "true" !== t.target.getAttribute("aria-disabled"))
              return e.selectTab(r(t.currentTarget)), e.currentTab[o.namespace + "collapse"]("toggle")
          })), this.element.on("focus." + o.namespace + "accordions", "[role='tab']", (n = this, function(t) {
            var e;
            if (e = r(t.target), -1 < n.tabs.index(e))
              return n.currentTab = e
          }))
        }, e.prototype.selectPreviousTab = function() {
          return this.selectTab(this.tabs.eq(this.tabs.index(this.currentTab) - 1))
        }, e.prototype.selectNextTab = function() {
          return this.selectTab(this.tabs.eq((this.tabs.index(this.currentTab) + 1) % this.tabs.length))
        }, e.prototype.selectTab = function(t) {
          if (t = t || this.tabs.first(), "true" !== this.element.get(0).getAttribute("aria-disabled") && "true" !== t.get(0).getAttribute("aria-disabled"))
            return this.tabs.attr("tabindex", -1), this.currentTab = t.attr("tabindex", 0)
        }, e.prototype.findTabs = function() {
          var t,
            e;
          return (t = this.element.find("[role='tab']")).length ? t : (this.options.tabs && (t = r(this.options.tabs, this.element)), t.length ? t : (t = this.element.children().filter((e = this, function(t) {
            return t % 2 == ("bottom" === e.options.position ? 1 : 0)
          }))).length ? t : r())
        }, e.prototype.findPanels = function() {
          var t,
            e;
          return (t = this.element.find("[role='tabpanel']")).length ? t : (this.options.panels && (t = r(this.options.panels, this.element)), t.length ? t : (t = this.element.children().filter((e = this, function(t) {
            return t % 2 == ("bottom" === e.options.position ? 0 : 1)
          }))).length ? t : r())
        }, e.prototype.keyLeft = function(n) {
          var t,
            i;
          if (t = r(n.target), this.currentTab.get(0) === n.target || this.currentTab.find(t).length)
            return n.preventDefault(), n.ctrlKey || n.metaKey ? this.panels.each((i = this, function(t, e) {
              if (r.contains(e, n.target))
                return i.tabs.eq(i.panels.index(e)).focus()
            })) : this.selectPreviousTab().focus()
        }, e.prototype.keyUp = function(t) {
          return this.keyLeft(t)
        }, e.prototype.keyRight = function(t) {
          var e;
          if (e = r(t.target), this.currentTab.get(0) === t.target || this.currentTab.find(e).length)
            return t.preventDefault(), this.selectNextTab().focus()
        }, e.prototype.keyDown = function(t) {
          return this.keyRight(t)
        }, e.prototype.keyPageUp = function(n) {
          if (n.preventDefault(), n.ctrlKey || n.metaKey)
            return this.panels.each((i = this, function(t, e) {
              if (r.contains(e, n.target))
                return i.tabs.eq(i.panels.index(e) - 1).focus()
            }));
          var i
        }, e.prototype.keyPageDown = function(n) {
          if (n.preventDefault(), n.ctrlKey || n.metaKey)
            return this.panels.each((i = this, function(t, e) {
              if (r.contains(e, n.target))
                return i.tabs.eq((i.panels.index(e) + 1) % i.panels.length).focus()
            }));
          var i
        }, e.prototype.destructor = function() {
          return this.element.removeAttr("role aria-multiselectable"), e.__super__.destructor.apply(this, arguments), this.tabs[o.namespace + "collapse"]("destroy"), this.tabs = null, this.panels.removeAttr("role tabindex"), this.panels = null
        }, e
      }().install("Accordions", function() {
        return r("[data-widget='accordions']")[o.namespace + "accordions"]()
      })
    })
  }.call(this), function() {
    var s = {}.hasOwnProperty;
    !function(t) {
      "function" == typeof define && define.amd ? define("tabs", ["jslib", "core", "widget", "accordions"], t) : t(this.$, _, _.AbstractWidget, _.Accordions)
    }(function(o, e, t, n) {
      "use strict";
      return function(t) {
        function r() {
          return r.__super__.constructor.apply(this, arguments)
        }
        return function(t, e) {
          for (var n in e)
            s.call(e, n) && (t[n] = e[n]);
          function i() {
            this.constructor = t
          }
          i.prototype = e.prototype, t.prototype = new i, t.__super__ = e.prototype
        }(r, n), r.defaultOptions = {
          event: "click",
          tabs: "",
          panels: "",
          position: "top"
        }, r.prototype.initialize = function(t) {
          return r.__super__.initialize.call(this, t), this.selectTab()
        }, r.prototype.aria = function() {
          var t,
            e,
            n,
            i;
          if (r.__super__.aria.apply(this, arguments), this.element.attr("aria-multiselectable", !1), n = this.tabs, (i = this.tabs.parents(function() {
            return o(this).find(n).length
          }).eq(0)).attr("role") || i.attr("data-role", "tabs"), t = this.panels, !(e = this.panels.parents(function() {
            return o(this).find(t).length
          }).eq(0)).attr("role"))
            return e.attr("data-role", "panels")
        }, r.prototype.bindEvents = function() {
          var n,
            i;
          return r.__super__.bindEvents.apply(this, arguments), this.handleKeys(this.panels), this.element.off(this.options.event + "." + e.namespace + "accordions").on(this.options.event + "." + e.namespace + "tabs", "[role='tab']", (n = this, function(t) {
            var e;
            if (t.preventDefault(), "true" !== t.target.getAttribute("aria-disabled"))
              return e = o(t.target), -1 < n.tabs.index(e) ? n.selectTab(e) : void 0
          })), this.element.off("focus." + e.namespace + "accordions", "[role='tab']").on("focus." + e.namespace + "tabs", "[role='tab']", (i = this, function(t) {
            var e;
            return "true" === t.target.getAttribute("aria-disabled") ? t.preventDefault() : (e = o(t.target), -1 < i.tabs.index(e) ? i.selectTab(e) : void 0)
          }))
        }, r.prototype.selectTab = function(t) {
          return r.__super__.selectTab.call(this, t), this.tabs[e.namespace + "collapse"]("hide"), this.currentTab[e.namespace + "collapse"]("show")
        }, r.prototype.findTabs = function() {
          var t;
          if ((t = this.element.find("[role='tab']")).length)
            return t;
          if (this.options.tabs)
            return o(this.options.tabs, this.element);
          switch (this.options.position) {
            case "bottom":
            case "right":
              return this.element.children().eq(1).children();
            default:
              return this.element.children().eq(0).children()
          }
        }, r.prototype.findPanels = function() {
          var t;
          if ((t = this.element.find("[role='tabpanel']")).length)
            return t;
          if (this.options.panels)
            return o(this.options.panels, this.element.parent());
          switch (this.options.position) {
            case "bottom":
            case "right":
              return this.element.children().eq(0).children();
            default:
              return this.element.children().eq(1).children()
          }
        }, r
      }().install("Tabs", function() {
        return o("[data-widget='tabs']")[e.namespace + "tabs"]()
      })
    })
  }.call(this), function() {
    var o = {}.hasOwnProperty;
    !function(t) {
      "function" == typeof define && define.amd ? define("toolbar", ["jslib", "core", "widget"], t) : t(this.$, _, _.AbstractWidget)
    }(function(r, i, e) {
      "use strict";
      return function(t) {
        function n() {
          return n.__super__.constructor.apply(this, arguments)
        }
        return function(t, e) {
          for (var n in e)
            o.call(e, n) && (t[n] = e[n]);
          function i() {
            this.constructor = t
          }
          i.prototype = e.prototype, t.prototype = new i, t.__super__ = e.prototype
        }(n, e), n.defaultOptions = {
          groups: "",
          items: ""
        }, n.prototype.initialize = function(t) {
          return n.__super__.initialize.call(this, t), this.groups = this.findGroups(), this.items = this.findItems()
        }, n.prototype.aria = function() {
          var e;
          return n.__super__.aria.call(this), this.element.attr("role", "toolbar"), (e = this.element.children().first()).length && "label" === e.attr("data-role") && (e.attr("id") || e.attr("role", "presentation").attr("id", i.getGUID("toolbar-label-")), this.element.attr("aria-labelledby", e.attr("id"))), this.groups.attr("role", "group").each(function() {
            var t;
            if (t = r(this), (e = t.children().first()).length && "label" === e.attr("data-role"))
              return e.attr("role", "presentation"), e.attr("id") || e.attr("id", i.getGUID("group-label-")), t.attr("aria-labelledby", e.attr("id"))
          }), this.items.filter(function() {
            return !r(this).is("button,[role='button']")
          }).attr({
            role: "button",
            tabindex: -1
          }), this.items.filter(function() {
            return r(this).find("[data-widget='menu']").length
          }).attr({
            "aria-haspopup": !0
          }), this.items.first().attr("tabindex", 0)
        }, n.prototype.bindEvents = function() {
          var n,
            i;
          return this.handleKeys(this.items), this.items.on("click", (n = this, function(t) {
            var e;
            return "true" === t.target.getAttribute("aria-disabled") ? t.preventDefault() : (e = r(t.target), t.target.getAttribute("aria-haspopup") || (e = e.parents("[aria-haspopup='true']")), -1 < n.items.index(e) ? (n.currentItem = e, n.selectItem(e, t)) : void 0)
          })), this.items.on("focus", (i = this, function(t) {
            var e,
              n;
            return n = r(t.target), -1 < i.items.index(n) ? i.currentItem = n : (e = i.items.filter(function() {
              return r(this).find(n).length
            })).length ? i.currentItem = e : void 0
          }))
        }, n.prototype.selectPreviousItem = function(t) {
          var e,
            n,
            i;
          for (n = this.items.index(this.currentItem || this.items.first()), i = this.items.length; "true" === (e = this.items.eq(--n)).get(0).getAttribute("aria-hidden") || e.parents("[role='group'][aria-hidden='true']").length;)
            if (--i < 0)
              return;
          return this.selectItem(e, t)
        }, n.prototype.selectNextItem = function(t) {
          var e,
            n,
            i;
          for (n = this.items.index(this.currentItem || this.items.last()), i = this.items.length; "true" === (e = this.items.eq(++n % this.items.length)).get(0).getAttribute("aria-hidden") || e.parents("[role='group'][aria-hidden='true']").length;)
            if (--i < 0)
              return;
          return this.selectItem(e, t)
        }, n.prototype.selectItem = function(t, e) {
          if (isNaN(t)) {
            if (!t)
              return
          } else
            t = this.items.eq(t);
          return this.items.removeAttr("tabindex"), this.currentItem = t, this.currentItem.attr("tabindex", 0)
        }, n.prototype.closeAll = function() {
          return this.element.find("[role='menu']")[i.namespace + "menu"]("closeAll")
        }, n.prototype.findGroups = function() {
          var t;
          return (t = this.element.find("[role='group']")).length ? t : (t = this.options.groups ? r(this.options.groups, this.element) : r()).filter(function() {
            return !r(this).is("[role='presentation'],[data-role='label']")
          })
        }, n.prototype.findItems = function() {
          return (this.options.items ? r(this.options.items, this.element) : this.groups.length ? this.groups.children() : this.element.children()).filter(function() {
            return !r(this).is("[role='presentation'],[data-role='label']")
          })
        }, n.prototype.getToggle = function(t) {
          if (t || (t = this.currentItem), "true" === t.get(0).getAttribute("aria-haspopup"))
            return t.attr("aria-controls") ? t : t.find("[aria-controls]")
        }, n.prototype.getSubmenu = function(t) {
          if (t || (t = this.currentItem), "true" === t.get(0).getAttribute("aria-haspopup"))
            return t.children("[role='menu']")
        }, n.prototype.keyLeft = function(t) {
          return t.preventDefault(), t.stopPropagation(), "true" !== this.currentItem.get(0).getAttribute("aria-haspopup") && "true" !== this.currentItem.get(0).getAttribute("aria-expanded") || this.closeAll(), this.selectPreviousItem(t).focus()
        }, n.prototype.keyRight = function(t) {
          return t.preventDefault(), t.stopPropagation(), "true" !== this.currentItem.get(0).getAttribute("aria-haspopup") && "true" !== this.currentItem.get(0).getAttribute("aria-expanded") || this.closeAll(), this.selectNextItem(t).focus()
        }, n.prototype.keyDown = function(t) {
          var e,
            n;
          if ((e = r(t.target).parent(".nav-item")).length && this.selectItem(e, t), "true" !== this.currentItem.get(0).getAttribute("aria-disabled"))
            return "true" === this.currentItem.get(0).getAttribute("aria-haspopup") && (t.preventDefault(), t.stopPropagation(), "true" === this.getSubmenu().get(0).getAttribute("aria-hidden")) ? (n = this.getToggle(), i.getInstance(n, ["toggle", "collapse"]).show(t)) : void 0
        }, n.prototype.destructor = function() {
          return this.items.removeAttr("tabindex"), this.items = null, this.element.removeAttr("role"), n.__super__.destructor.call(this)
        }, n
      }().install("Toolbar", function() {
        return r("[data-widget='toolbar']")[i.namespace + "toolbar"]()
      })
    })
  }.call(this), function() {
    var o = {}.hasOwnProperty;
    !function(t) {
      "function" == typeof define && define.amd ? define("menubar", ["jslib", "core", "widget", "toolbar"], t) : t(this.$, _, _.AbstractWidget, _.Toolbar)
    }(function(i, r, t, n) {
      "use strict";
      return function(t) {
        function e() {
          return e.__super__.constructor.apply(this, arguments)
        }
        return function(t, e) {
          for (var n in e)
            o.call(e, n) && (t[n] = e[n]);
          function i() {
            this.constructor = t
          }
          i.prototype = e.prototype, t.prototype = new i, t.__super__ = e.prototype
        }(e, n), e.defaultOptions = {
          items: ""
        }, e.prototype.initialize = function(t) {
          return e.__super__.initialize.call(this, t)
        }, e.prototype.aria = function() {
          return e.__super__.aria.call(this), this.element.attr("role", "menubar"), this.items.attr("role", "menuitem").each(function() {
            var t,
              e,
              n;
            if ((t = i(this)).children("[role='menu']").length && t.attr("aria-haspopup", "true"), (e = t.children().filter(function() {
              return !i(this).is('[data-widget="menu"],[role="menu"]')
            })).length && !this.getAttribute("aria-labelledby"))
              return (n = e.attr("id")) || (n = r.getGUID("menu-item-label-"), e.attr("id", n)), t.attr("aria-labelledby", n)
          }), this.currentItem = this.selectNextItem().attr("tabindex", 0)
        }, e.prototype.bindEvents = function() {
          return this.handleKeys(this.items), this.element.on("click", "[role='menuitem']", (n = this, function(t) {
            var e;
            return "true" === t.target.getAttribute("aria-disabled") ? t.preventDefault() : (e = i(t.currentTarget), -1 !== n.items.index(e) ? n.selectItem(e) : void 0)
          }));
          var n
        }, e.prototype.keyEnter = function(t) {
          var e;
          if ("true" === this.currentItem.get(0).getAttribute("aria-haspopup") && "true" === this.getSubmenu().get(0).getAttribute("aria-hidden"))
            return e = this.getToggle(), r.getInstance(e.get(0), ["toggle", "collapse"]).toggle(void 0, t)
        }, e.prototype.keySpace = function(t) {
          return t.preventDefault(), this.keyEnter(t)
        }, e.prototype.destructor = function() {
          return this.items.removeAttr("role aria-haspopup"), e.__super__.destructor.call(this)
        }, e
      }().install("Menubar", function() {
        return i("[data-widget='menubar']")[r.namespace + "menubar"]()
      })
    })
  }.call(this), function() {
    var r = {}.hasOwnProperty;
    !function(t) {
      "function" == typeof define && define.amd ? define("menu", ["jslib", "core", "widget"], t) : t(this.$, _, _.AbstractWidget)
    }(function(o, s, n) {
      "use strict";
      return function(t) {
        function e() {
          return e.__super__.constructor.apply(this, arguments)
        }
        return function(t, e) {
          for (var n in e)
            r.call(e, n) && (t[n] = e[n]);
          function i() {
            this.constructor = t
          }
          i.prototype = e.prototype, t.prototype = new i, t.__super__ = e.prototype
        }(e, n), e.defaultOptions = {
          items: ""
        }, e.prototype.initialize = function(t) {
          return e.__super__.initialize.call(this, t), this.items = this.findItems(), this.currentItem = this.items.first(), this.element.closest('[role="menuitem"]').each((i = this, function(t, e) {
            var n;
            return n = o("#" + e.getAttribute("aria-labelledby")).text() || o(e).children("[aria-controls],span").text(), i.element.prepend(o(document.createElement("span")).addClass("menu-item menu-item-back").attr("data-role", "back").text(n))
          }));
          var i
        }, e.prototype.aria = function() {
          return this.element.attr("role", "menu"), this.items.attr("role", "menuitem").each(function() {
            var t,
              e,
              n;
            if ((t = o(this)).children("[data-widget='menu'],[role='menu']").length && t.attr("aria-haspopup", "true"), 1 < (e = t.children().filter(function() {
              return !o(this).is("[data-widget='menu'],[role='menu']")
            })).length && !t.attr("aria-labelledby"))
              return (n = e.attr("id")) || (n = s.getGUID("menu-item-label-"), e.attr("id", n)), t.attr("aria-labelledby", n)
          }), this.items.first().attr("tabindex", 0)
        }, e.prototype.bindEvents = function() {
          var i,
            n,
            r;
          return this.handleKeys(this.element), this.element.on("click", "[role='menuitem']", (i = this, function(t) {
            var e,
              n;
            return "true" === t.target.getAttribute("aria-disabled") ? t.preventDefault() : (t.stopPropagation(), i.items.filter(function() {
              return this !== t.target && !o(this).find(t.target).length
            }).find("[aria-controls][aria-expanded='true']").each(function() {
              return s.getInstance(this, ["collapse", "toggle"]).hide(t)
            }), e = o(t.target), i.selectItem(e), (n = i.getToggle(e)) && n.length ? s.getInstance(n, ["collapse", "toggle"]).toggle(void 0, t) : void 0)
          })), this.element.on("beforeToggle", function(t, e) {
            return o(e.toggle).parents('[role="menu"],[role="menubar"]').addClass("menu-parent"), o(e.toggle).parents('[role="menuitem"]').addClass("menu-item-ancestor").removeClass("menu-item-parent"), e.status ? o(e.toggle).closest('[role="menuitem"]').addClass("menu-item-parent") : (o(e.toggle).closest('[role="menuitem"]').removeClass("menu-item-parent menu-item-ancestor").closest('[role="menu"],[role="menubar"]').removeClass("menu-parent"), o(e.toggle).parents('[role="menuitem"]').eq(1).addClass("menu-item-parent"))
          }), this.element.on("afterToggle", (n = this, function(t, e) {
            if (t.stopPropagation(), e.event && "keydown" === e.event.type) {
              if (e.status)
                return n.selectItem().focus();
              if (-1 < n.items.index(o(e.toggle)))
                return n.selectItem(o(e.toggle)).focus()
            }
          })), this.element.on("click", "[data-role='back']", (r = this, function(t) {
            var e;
            return t.stopPropagation(), e = o('[aria-controls="' + r.element.attr("id") + '"]'), s.getInstance(e, ["collapse", "toggle"]).hide(t)
          }))
        }, e.prototype.selectPreviousItem = function() {
          var t;
          return t = this.items.index(this.currentItem || this.items.first()) - 1, this.selectItem(this.items.eq(t))
        }, e.prototype.selectNextItem = function() {
          var t;
          return t = (this.items.index(this.currentItem || this.items.last()) + 1) % this.items.length, this.selectItem(this.items.eq(t))
        }, e.prototype.selectItem = function(t) {
          return t || (t = this.items.first()), this.currentItem && this.currentItem.removeAttr("tabindex"), (this.currentItem = t).attr("tabindex", 0)
        }, e.prototype.close = function(t) {
          return o("[aria-controls*='" + this.element.attr("id") + "']").each(function() {
            return s.getInstance(this, ["collapse", "toggle"]).hide(t)
          })
        }, e.prototype.closeAll = function(t) {
          var e;
          if ((e = this.close(t).parents("[role='menu']")).length)
            return e[s.namespace + "menu"]("closeAll")
        }, e.prototype.findItems = function() {
          var t;
          return (t = this.element.find("[role='menuitem']")).length ? t : this.options.items ? o(this.options.items, this.element) : this.element.children()
        }, e.prototype.getToggle = function(t) {
          if (t || (t = this.currentItem), "true" === t.get(0).getAttribute("aria-haspopup"))
            return t.children("[aria-controls]")
        }, e.prototype.getControls = function() {
          var t,
            e;
          return (e = (t = o("[aria-controls*='" + this.element.attr("id") + "']")).parent("[role='menuitem']")).length && e || t
        }, e.prototype.keySpace = function(t) {
          if (t.preventDefault(), t.stopPropagation(), "true" !== this.currentItem.get(0).getAttribute("aria-disabled"))
            return "true" === this.currentItem.get(0).getAttribute("aria-haspopup") ? s.getInstance(this.getToggle(), ["collapse", "toggle"]).toggle(void 0, t) : void 0
        }, e.prototype.keyEnter = function(t) {
          return this.keySpace(t)
        }, e.prototype.keyUp = function(t) {
          return t.preventDefault(), t.stopPropagation(), this.selectPreviousItem().focus()
        }, e.prototype.keyDown = function(t) {
          return t.preventDefault(), t.stopPropagation(), this.selectNextItem().focus()
        }, e.prototype.keyLeft = function(t) {
          if (1 < o(t.target).parents("[role='menu']").length)
            return t.stopPropagation(), this.close(t), this.getControls().focus()
        }, e.prototype.keyRight = function(t) {
          if (o(t.target), "true" === t.target.getAttribute("aria-haspopup"))
            return t.stopPropagation(), this.keySpace(t)
        }, e.prototype.keyEscape = function(t) {
          return t.preventDefault(), this.closeAll(t), this.getControls().focus()
        }, e.prototype.keyTab = function(t) {
          return this.closeAll(t)
        }, e.prototype.destructor = function() {}, e
      }().install("Menu", function() {
        return o("[data-widget='menu']")[s.namespace + "menu"](), o(window).on("click", function(t) {
          var e,
            n,
            i;
          return (n = (i = o(t.target)).parents("[aria-controls]")).length && (i = n.eq(0)), e = o("[role='menu'][aria-hidden='false']"), (e = t.target.getAttribute("aria-controls") ? e.filter(function() {
            return !(i.is("[aria-controls='" + this.id + "']") || o(this).find(i).length)
          }) : "menuitem" === t.target.getAttribute("role") ? e.filter(function() {
            return !(o(this).find(i).length || i.find(o(this)).length)
          }) : (e = e.filter(function() {
            return !o(this).closest(".mainnav").length
          })).filter(function() {
            return !o(this).find(i).length
          })).each(function() {
            return s.getInstance(this, "menu").close(t)
          })
        })
      })
    })
  }.call(this), function() {
    var r = {}.hasOwnProperty;
    !function(t) {
      "function" == typeof define && define.amd ? define("tree", ["jslib", "core", "widget", "toolbar"], t) : t(this.$, _, _.AbstractWidget, _.Toolbar)
    }(function(o, s, t, e) {
      "use strict";
      return function(t) {
        function n() {
          return n.__super__.constructor.apply(this, arguments)
        }
        return function(t, e) {
          for (var n in e)
            r.call(e, n) && (t[n] = e[n]);
          function i() {
            this.constructor = t
          }
          i.prototype = e.prototype, t.prototype = new i, t.__super__ = e.prototype
        }(n, e), n.defaultOptions = {
          autocollapse: !1
        }, n.prototype.initialize = function(t) {
          return n.__super__.initialize.call(this, t), this.groups.each((r = this, function(t, e) {
            var n,
              i;
            if (n = o(e), "group" === e.getAttribute("role") && !e.getAttribute("aria-expanded"))
              return i = r.createToogle(), n.before(i), i[s.namespace + "collapse"]()
          }));
          var r
        }, n.prototype.aria = function() {
          return this.element.attr("role", "tree"), this.groups.attr("role", "group"), this.items.attr("role", "treeitem").each(function() {
            var t,
              e,
              n,
              i;
            return (t = (e = o(this)).find("[role='group']")).length && e.attr("aria-haspopup", "true"), (n = e.children(":not([data-widget])").filter(function() {
              return "group" !== this.getAttribute("role")
            })).length && !this.getAttribute("aria-labelledby") && ((i = n.attr("id")) || (i = s.getGUID("tree-item-label-"), n.attr("id", i)), e.attr("aria-labelledby", i), t.attr("aria-labelledby", i)), e.children("[aria-controls]").attr("aria-labelledby", e.attr("aria-labelledby"))
          }), this.items.attr("tabindex", -1).first().attr("tabindex", 0), this.element.find("[aria-controls]").attr("tabindex", "-1")
        }, n.prototype.bindEvents = function() {
          var n,
            i;
          return this.handleKeys(this.element), this.element.on("click", "[role='treeitem']", (n = this, function(t) {
            var e;
            return "true" === t.target.getAttribute("aria-disabled") ? t.preventDefault() : (o(t.target).blur(), e = o(t.currentTarget), -1 < n.items.index(e) && (!n.currentItem || t.currentTarget !== n.currentItem.get(0)) ? n.selectItem(e, t) : void 0)
          })), this.element.on("click", "[aria-controls]", (i = this, function(t) {
            var e;
            return "true" === t.target.getAttribute("aria-disabled") ? t.preventDefault() : (e = o(t.target).parents("[role='treeitem']").first(), -1 < i.items.index(e) && i.selectItem(e, t), "true" === i.options.autocollapse || !0 === i.options.autocollapse ? i.hideOtherSubmenus(t) : void 0)
          }))
        }, n.prototype.showSubmenu = function(t) {
          var e,
            n;
          if ("true" === this.currentItem.get(0).getAttribute("aria-haspopup"))
            return n = this.currentItem.get(0).getAttribute("aria-controls") ? this.currentItem : this.currentItem.find("[aria-controls]"), "true" === (e = this.currentItem.find("[role='group']").first()).get(0).getAttribute("aria-hidden") ? (s.getInstance(n, ["toggle", "collapse"]).show(t), this.currentItem) : this.selectItem(e.find("[role='treeitem']").first(), t)
        }, n.prototype.hideSubmenu = function(t) {
          var e;
          if ("true" === this.currentItem.get(0).getAttribute("aria-haspopup"))
            return e = this.currentItem.get(0).getAttribute("aria-controls") ? this.currentItem : this.currentItem.find("[aria-controls]"), s.getInstance(e, ["toggle", "collapse"]).hide(t)
        }, n.prototype.hideOtherSubmenus = function(t) {
          var e;
          return e = this.currentItem.parents("[role='treeitem']").add(this.currentItem), this.element.find("[aria-controls]").filter(function() {
            return !e.find(o(this)).length
          }).each(function() {
            return s.getInstance(this, ["toggle", "collapse"]).hide(t)
          })
        }, n.prototype.selectItem = function(t, e) {
          return n.__super__.selectItem.call(this, t), t.parents("[role='treeitem']").children("[data-widget='collapse'][aria-expanded='false']").each(function() {
            return s.getInstance(this, "collapse").show(e)
          }), t
        }, n.prototype.findGroups = function() {
          var t;
          return (t = this.element.find("[role='group']")).length ? t : this.options.groups ? o(this.options.groups, this.element) : o()
        }, n.prototype.findItems = function() {
          var t;
          return (t = this.element.find("[role='treeitem']")).length ? t : this.options.items ? o(this.options.items, this.element) : this.groups.length ? this.element.children(":not([role])").add(this.groups.children(":not([role])")) : this.element.children(":not([role])")
        }, n.prototype.createToogle = function() {
          return o(document.createElement("span")).attr("data-widget", "collapse")
        }, n.prototype.keyLeft = function(t) {
          var e,
            n;
          return n = this.currentItem.parents("[role='treeitem']").first(), e = this.currentItem.find("[role='group']").first(), "true" === this.currentItem.get(0).getAttribute("aria-haspopup") && "false" === e.get(0).getAttribute("aria-hidden") ? this.hideSubmenu(t) : n.length ? this.selectItem(n, t).focus() : void 0
        }, n.prototype.keyRight = function(t) {
          if ("true" === this.currentItem.get(0).getAttribute("aria-haspopup"))
            return t.stopPropagation(), this.showSubmenu(t).focus(), "true" === this.options.autocollapse || !0 === this.options.autocollapse ? this.hideOtherSubmenus(t) : void 0
        }, n.prototype.keyUp = function(t) {
          return t.preventDefault(), t.stopPropagation(), this.selectPreviousItem(t).focus()
        }, n.prototype.keyDown = function(t) {
          return t.preventDefault(), t.stopPropagation(), this.selectNextItem(t).focus()
        }, n.prototype.keyEnter = function(t) {
          var e,
            n;
          return e = this.currentItem.children(), "true" === this.currentItem.get(0).getAttribute("aria-haspopup") ? (n = this.currentItem.get(0).getAttribute("aria-controls") ? this.currentItem : this.currentItem.find("[aria-controls]"), s.getInstance(n, ["toggle", "collapse"]).toggle(t)) : e.length ? e.click() : void 0
        }, n.prototype.keyHome = function(t) {
          return t.preventDefault(), this.currentItem = this.items.last(), this.selectNextItem(t).focus()
        }, n.prototype.keyEnd = function(t) {
          return t.preventDefault(), this.currentItem = this.items.first(), this.selectPreviousItem(t).focus()
        }, n.prototype.keyNumber = function(t) {
          return this.keyLetter(t)
        }, n.prototype.keyLetter = function(t) {
          var e,
            n;
          for (n = this.items.index(t.target) + 1;;) {
            if (n >= this.items.length)
              return;
            if (0 === (e = this.items.eq(n)).text().toUpperCase().indexOf(String.fromCharCode(t.keyCode)) && !e.parents("[role='group'][aria-expanded='false']").length)
              break;
            n++
          }
          return e.attr("tabindex", "0").focus()
        }, n.prototype.keyAsterisk = function(t) {
          var e;
          if (!this.options.autocollapse || "true" !== this.options.autocollapse)
            return e = this.element.find("[aria-controls]"), this.element.find("[role='group'][aria-hidden='true']").length ? e.each(function() {
              return s.getInstance(this, ["toggle", "collapse"]).show(t)
            }) : e.each(function() {
              return s.getInstance(this, ["toggle", "collapse"]).hide(t)
            })
        }, n.prototype.destructor = function() {
          return this.element.removeAttr("role"), n.__super__.destructor.call(this), this.groups.removeAttr("role")
        }, n
      }().install("Tree", function() {
        return o("[data-widget='tree']")[s.namespace + "tree"]()
      })
    })
  }.call(this), function() {
    var o = {}.hasOwnProperty;
    !function(t) {
      "function" == typeof define && define.amd ? define("dialog", ["jslib", "core", "widget"], t) : t(this.$, _, _.AbstractWidget)
    }(function(r, n, i) {
      "use strict";
      return function(t) {
        function e() {
          return e.__super__.constructor.apply(this, arguments)
        }
        return function(t, e) {
          for (var n in e)
            o.call(e, n) && (t[n] = e[n]);
          function i() {
            this.constructor = t
          }
          i.prototype = e.prototype, t.prototype = new i, t.__super__ = e.prototype
        }(e, i), e.defaultOptions = {
          overlay: !1
        }, e.prototype.initialize = function(t) {
          return e.__super__.initialize.call(this, t), "true" !== this.options.overlay && !0 !== this.options.overlay || this.element.attr("data-modal", "true"), this.element.wrapInner(this.createDialog().attr("data-role", "popup")), this.dialog = this.element.find("[data-role='popup']"), this.element.remove().appendTo("body"), this.dialogHeader = this.findHeader(), this.dialogContent = this.findContent(), this.dialogFooter = this.findFooter(), this.closeButton = this.findClose().attr("data-role", "close"), this.closeButton.prependTo(this.dialog), this.endElement = this.createEnd().appendTo(this.element)
        }, e.prototype.aria = function() {
          if (this.element.attr("id") || this.element.attr("id", n.getGUID("dialog-")), this.element.attr("role", "dialog"), this.closeButton.attr({
            role: "button",
            tabindex: 0
          }), this.dialogHeader && (this.dialogHeader.attr("id") || this.dialogHeader.attr("id", n.getGUID("dialog-header-")), this.element.attr("aria-labelledby", this.dialogHeader.attr("id"))), !this.dialogContent.attr("id"))
            return this.dialogContent.attr("id", n.getGUID("dialog-content-")), this.element.attr("aria-describedby", this.dialogContent.attr("id"))
        }, e.prototype.bindEvents = function() {
          var e,
            n,
            i;
          return this.handleKeys(this.element), this.element.on("click", (e = this, function(t) {
            return t.target === e.closeButton.get(0) ? e.close(t) : e.element.find(t.target).length ? e.closeButton.focus() : void 0
          })), this.element.on("afterToggle", (n = this, function(t, e) {
            if (e.status && -1 < r(e.targets).index(n.element))
              return n.centerOnPage(), n.closeButton.focus()
          })), this.endElement.on("focus", (i = this, function(t) {
            if (i.options.overlay)
              return i.closeButton.focus()
          }))
        }, e.prototype.close = function(e) {
          var t;
          return (t = r("[aria-controls*='" + this.element.attr("id") + "']")).length ? t.each(function() {
            var t;
            return t = r(this), n.getInstance(this, ["toggle", "collapse"]).hide(e), t.focus()
          }) : (this.element.remove(), this.destroy())
        }, e.prototype.centerOnPage = function() {
          var t;
          return this.dialogContent.css({
            display: "",
            height: ""
          }), this.options.overlay ? (this.element.css("height", r(document).height() + "px"), this.dialog.css("top", Math.round((r(window).height() - this.dialog.height()) / 2 + r(window).scrollTop()) + "px")) : this.element.css({
            left: Math.round((r(window).width() - this.dialog.outerWidth(!0)) / 2) + "px",
            top: Math.round((r(window).height() - this.dialog.height()) / 2 + r(window).scrollTop()) + "px"
          }), this.dialogContent.css("max-height", Math.round(this.dialog.height() - this.dialogHeader.outerHeight(!0) - this.dialogFooter.outerHeight(!0))), t = parseInt(this.dialogContent.css("max-height"), 10), this.dialogContent.height() >= t && this.dialogContent.css({
            display: "inline-block",
            height: t,
            "max-height": ""
          }), this.dialogContent.hide(), this.dialogContent.offset(), this.dialogContent.show()
        }, e.prototype.findClose = function() {
          var t;
          return (t = this.element.find("[data-role='close']")).length ? t : this.createClose().prependTo(this.element)
        }, e.prototype.findHeader = function() {
          var t,
            e;
          return (e = this.element.attr("aria-labelledby")) ? r("#" + e + "}") : (t = this.dialog.children("header")).length ? t : 2 <= this.dialog.children().length ? this.dialog.children(':not([data-role="close"])').first() : r()
        }, e.prototype.findContent = function() {
          var t;
          return (t = this.element.attr("aria-describedby")) ? r("#" + t + "}") : 2 <= this.dialog.children().length ? this.dialog.children(':not([data-role="close"])').eq(1) : this.dialog.children(':not([data-role="close"])')
        }, e.prototype.findFooter = function() {
          var t;
          return (t = this.dialog.children("footer")).length ? t : 3 <= this.dialog.children().length ? this.dialog.children(':not([data-role="close"])').last() : r()
        }, e.prototype.createDialog = function() {
          return r(document.createElement("div"))
        }, e.prototype.createClose = function() {
          return r(document.createElement("span"))
        }, e.prototype.createEnd = function() {
          return r(document.createElement("span")).attr("tabindex", 0).text(" ").css({
            height: "1px",
            width: "1px"
          })
        }, e.prototype.keyEscape = function(t) {
          return t.preventDefault(), this.close(t)
        }, e.prototype.keyEnter = function(t) {
          if (t.target === this.closeButton.get(0))
            return this.close(t)
        }, e.prototype.keyTab = function(t) {
          if (this.options.overlay && t.target === this.closeButton.get(0) && t.shiftKey)
            return t.preventDefault()
        }, e.prototype.destructor = function() {
          return this.element.removeAttr("role"), e.__super__.destructor.call(this), this.closeButton = null, this.overlay = null, this.endElement = null
        }, e
      }().install("Dialog", function() {
        return r("[data-widget='dialog']")[n.namespace + "dialog"]()
      })
    })
  }.call(this), function() {
    var r = {}.hasOwnProperty;
    !function(t) {
      "function" == typeof define && define.amd ? define("alert", ["jslib", "core", "widget"], t) : t(this.$, _, _.AbstractWidget)
    }(function(n, t, i) {
      "use strict";
      return function(t) {
        function e() {
          return e.__super__.constructor.apply(this, arguments)
        }
        return function(t, e) {
          for (var n in e)
            r.call(e, n) && (t[n] = e[n]);
          function i() {
            this.constructor = t
          }
          i.prototype = e.prototype, t.prototype = new i, t.__super__ = e.prototype
        }(e, i), e.prototype.initialize = function(t) {
          return e.__super__.initialize.call(this, t), this.close = this.findClose()
        }, e.prototype.aria = function() {
          return this.element.attr("role", "alert"), this.close.attr({
            role: "button",
            "data-role": "close",
            tabindex: "0"
          })
        }, e.prototype.bindEvents = function() {
          return this.handleKeys(this.element), this.close.on("click", (e = this, function(t) {
            if ("true" !== t.target.getAttribute("aria-disabled"))
              return e.removeNotification()
          }));
          var e
        }, e.prototype.removeNotification = function() {
          return e.removeNotification(this)
        }, e.removeNotification = function(t) {
          return t.element.remove(), t.destroy()
        }, e.prototype.findClose = function() {
          var t;
          return (t = this.element.find("[data-role='close']")).length || (t = this.createClose(), this.element.prepend(t)), t
        }, e.prototype.createClose = function() {
          return n(document.createElement("span"))
        }, e.prototype.keyEscape = function(t) {
          return this.removeNotification()
        }, e.prototype.keySpace = function(t) {
          return this.keyEnter(t)
        }, e.prototype.keyEnter = function(t) {
          if ("close" === t.target.getAttribute("data-role"))
            return this.removeNotification()
        }, e.prototype.destructor = function() {
          return e.__super__.destructor.call(this), this.close = null, this.timeoutID = null
        }, e
      }().install("Alert", function() {
        return n("[data-widget='alert']")[t.namespace + "alert"]()
      })
    })
  }.call(this), function() {
    var r = {}.hasOwnProperty;
    !function(t) {
      "function" == typeof define && define.amd ? define("notification", ["jslib", "core", "widget", "alert"], t) : t(this.$, _, _.AbstractWidget, _.Alert)
    }(function(n, t, e, i) {
      "use strict";
      return function(t) {
        function e() {
          return e.__super__.constructor.apply(this, arguments)
        }
        return function(t, e) {
          for (var n in e)
            r.call(e, n) && (t[n] = e[n]);
          function i() {
            this.constructor = t
          }
          i.prototype = e.prototype, t.prototype = new i, t.__super__ = e.prototype
        }(e, i), e.defaultOptions = {
          timeout: 1e4,
          wrapper: "notifications",
          sticky: !1
        }, e.prototype.initialize = function(t) {
          return e.__super__.initialize.call(this, t), this.wrapper = this.findWrapper(), !0 !== this.options.sticky && "true" !== this.options.sticky && (this.timeoutID = setTimeout(e.removeNotification, this.options.timeout, this)), this.element = this.element.detach(), this.wrapper.append(this.element)
        }, e.prototype.aria = function() {
          return e.__super__.aria.call(this), this.wrapper.attr("data-role", "notifications")
        }, e.prototype.bindEvents = function() {
          return e.__super__.bindEvents.call(this)
        }, e.prototype.removeNotification = function() {
          return e.removeNotification(this)
        }, e.removeNotification = function(t) {
          return !0 !== t.options.sticky && "true" !== t.options.sticky && clearTimeout(t.timeoutID), t.element.remove(), t.destroy()
        }, e.prototype.findWrapper = function() {
          var t;
          return (t = n("#" + this.options.wrapper)).length || (t = n("#page").length ? this.createWrapper().insertBefore(page) : this.createWrapper().prependTo(n("body"))), t
        }, e.prototype.createWrapper = function() {
          return n(document.createElement("section")).attr({
            id: this.options.wrapper,
            "aria-live": "polite"
          })
        }, e.prototype.destructor = function() {
          return e.__super__.destructor.call(this), this.wrapper = null, this.timeoutID = null
        }, e
      }().install("Notification", function() {
        return n("[data-widget='notification']")[t.namespace + "notification"]()
      })
    })
  }.call(this), function() {
    var o = {}.hasOwnProperty;
    !function(t) {
      "function" == typeof define && define.amd ? define("list", ["jslib", "core", "widget"], t) : t(this.$, _, _.AbstractWidget)
    }(function(r, i, n) {
      "use strict";
      return function(t) {
        function e() {
          return e.__super__.constructor.apply(this, arguments)
        }
        return function(t, e) {
          for (var n in e)
            o.call(e, n) && (t[n] = e[n]);
          function i() {
            this.constructor = t
          }
          i.prototype = e.prototype, t.prototype = new i, t.__super__ = e.prototype
        }(e, n), e.defaultOptions = {
          event: "click",
          panels: "",
          items: "",
          cycleItems: !1
        }, e.prototype.initialize = function(t) {
          return e.__super__.initialize.call(this, t), this.panels = this.findPanels(), this.items = this.findItems()
        }, e.prototype.aria = function() {
          var e,
            n;
          return this.items.attr("role", "option"), this.items.each(function() {
            if (!this.id)
              return this.id = i.getGUID("listbox-option-")
          }), 1 < this.items.length ? (e = this.items.first().parents(), this.wrapper = e.filter((n = this, function(t) {
            return e.eq(t).find(n.items.last()).length
          })).first()) : this.wrapper = this.items.parent(), this.wrapper.attr("role", "listbox"), this.panels.attr("role", "group")
        }, e.prototype.bindEvents = function() {
          var n;
          return this.handleKeys(this.element), this.element.on(this.options.event, "[role='option']", (n = this, function(t) {
            var e;
            return "true" === t.target.getAttribute("aria-disabled") ? t.preventDefault() : (e = r(t.target), "option" !== t.target.getAttribute("role") && (e = r(t.target).closest('[role="option"]')), n.selectItem(e).focus())
          })), this.selectItem()
        }, e.prototype.selectItem = function(t) {
          var e,
            n,
            i;
          if ("true" !== this.element.get(0).getAttribute("aria-disabled"))
            return this.currentItem && this.currentItem.attr("data-target") && void 0 !== (e = r(this.currentItem.attr("data-target"))).attr("src") && e.attr("src", ""), this.currentItem = t || this.items.first(), this.currentPanel = this.panels.filter((n = this, function(t) {
              return n.panels.eq(t).find(n.currentItem).length
            })), this.element.trigger("beforeSelect", {
              item: this.currentItem,
              panel: this.currentPanel
            }), this.items.removeAttr("tabindex"), this.panels.filter((i = this, function(t) {
              return "true" !== i.panels.get(t).getAttribute("aria-hidden")
            })).attr("aria-hidden", "true"), this.currentPanel.attr("aria-hidden", "false"), this.currentItem.attr("tabindex", 0), this.element.trigger("afterSelect", {
              item: this.currentItem,
              panel: this.currentPanel
            }), this.wrapper.attr("aria-activedescendant", this.currentItem.attr("id")), this.currentItem.attr("data-target") && void 0 !== (e = r(this.currentItem.attr("data-target"))).attr("src") && e.attr("src", this.currentItem.attr("data-url")), this.currentItem
        }, e.prototype.selectPreviousItem = function() {
          var t;
          return t = this.items.index(this.currentItem), "true" === this.options.cycleItems || !0 === this.options.cycleItems || 0 < t ? this.selectItem(this.items.eq(t - 1)) : this.items.first()
        }, e.prototype.selectNextItem = function() {
          var t;
          return t = this.items.index(this.currentItem), "true" === this.options.cycleItems || !0 === this.options.cycleItems || t < this.items.length - 1 ? this.selectItem(this.items.eq((t + 1) % this.items.length)) : this.items.last()
        }, e.prototype.findPanels = function() {
          var t,
            e;
          return t = this.controls, (e = r("[role='group']", this.element).filter(function() {
            return t && !t.find(r(this)).length
          })).length ? e : this.options.panels ? r(this.options.panels, this.element) : "before" === this.options.controls ? this.element.children().eq(1).children() : this.element.children().eq(0).children()
        }, e.prototype.findItems = function(t) {
          var e;
          return (e = r("[role='option']", t || this.panels)).length ? e : this.options.items ? r(this.options.items, t || this.element) : (t || this.panels).children()
        }, e.prototype.keyLeft = function(t) {
          var e;
          return e = this.selectPreviousItem(), "button" !== t.target.getAttribute("role") && e.focus(), e
        }, e.prototype.keyUp = function(t) {
          return this.keyLeft(t)
        }, e.prototype.keyRight = function(t) {
          var e;
          return e = this.selectNextItem(), "button" !== t.target.getAttribute("role") && e.focus(), e
        }, e.prototype.keyDown = function(t) {
          return this.keyRight(t)
        }, e.prototype.keyPageUp = function(t) {
          var e;
          if (t.preventDefault(), this.currentItem[0] !== this.items.get(0))
            return (e = this.panels.index(this.currentPanel) - 1) < 0 ? this.selectItem(this.items.first()).focus() : this.selectItem(this.findItems(this.panels.eq(e)).first()).focus()
        }, e.prototype.keyPageDown = function(t) {
          var e;
          if (t.preventDefault(), this.currentItem[0] !== this.items.get(-1))
            return (e = this.panels.index(this.currentPanel) + 1) > this.panels.length - 1 ? this.selectItem(this.items.last()).focus() : this.selectItem(this.findItems(this.panels.eq(e)).first()).focus()
        }, e.prototype.keyHome = function(t) {
          if (t.preventDefault(), this.currentItem[0] !== this.items.get(0))
            return this.selectItem(this.items.first()).focus()
        }, e.prototype.keyEnd = function(t) {
          if (t.preventDefault(), this.currentItem[0] !== this.items.get(-1))
            return this.selectItem(this.items.last()).focus()
        }, e.prototype.destructor = function() {
          return e.__super__.destructor.apply(this, arguments)
        }, e
      }().install("List", function() {
        return r("[data-widget='list']")[i.namespace + "list"]()
      })
    })
  }.call(this), function() {
    var r = {}.hasOwnProperty;
    !function(t) {
      "function" == typeof define && define.amd ? define("carousel", ["jslib", "core", "widget", "list"], t) : t(this.$, _, _.AbstractWidget, _.List)
    }(function(s, n, t, e) {
      "use strict";
      return function(t) {
        function i() {
          return i.__super__.constructor.apply(this, arguments)
        }
        return function(t, e) {
          for (var n in e)
            r.call(e, n) && (t[n] = e[n]);
          function i() {
            this.constructor = t
          }
          i.prototype = e.prototype, t.prototype = new i, t.__super__ = e.prototype
        }(i, e), i.defaultOptions = {
          event: "click",
          panels: "",
          items: "",
          controls: "false",
          prev: "true",
          next: "true",
          selectors: "true",
          cycleItems: !1,
          orientation: "horizontal"
        }, i.prototype.initialize = function(t) {
          return i.__super__.initialize.call(this, t), this.controls = this.findControls(), this.panels = this.findPanels(), this.items = this.findItems(), this.prevButton = this.findPrevious(), this.nextButton = this.findNext(), this.selectors = this.findSelectors(), this.selectionIndicator = this.createSelectionIndicator()
        }, i.prototype.aria = function() {
          var t,
            e;
          if (this.element.attr("data-role", "carousel"), this.controls && (null != (t = this.prevButton) && t.attr("data-role", "previous"), null != (e = this.nextButton) && e.attr("data-role", "next")), i.__super__.aria.call(this), this.wrapper.prepend(this.selectionIndicator), this.selectionIndicator.attr("role", "presentation"), this.element.find('[role="listbox"]').prepend(this.selection), this.controls && this.selectors && this.selectors.attr("role", "presentation"), this.controls && "toolbar" !== this.controls.get(0).getAttribute("data-widget"))
            return this.controls[n.namespace + "toolbar"]()
        }, i.prototype.bindEvents = function() {
          var e,
            n;
          return i.__super__.bindEvents.call(this), this.element.on(this.options.event, "[data-role='previous']", (e = this, function(t) {
            if ("true" !== e.prevButton.get(0).getAttribute("aria-disabled"))
              return t.preventDefault(), e.keyPageUp(t)
          })), this.element.on(this.options.event, "[data-role='next']", (n = this, function(t) {
            if ("true" !== n.nextButton.get(0).getAttribute("aria-disabled"))
              return t.preventDefault(), n.keyPageDown(t)
          })), this.selectItem()
        }, i.prototype.selectItem = function(t) {
          var e,
            n,
            i,
            r,
            o;
          if ("true" !== this.element.get(0).getAttribute("aria-disabled"))
            return this.currentItem && this.currentItem.attr("data-target") && void 0 !== (e = s(this.currentItem.attr("data-target"))).attr("src") && e.attr("src", ""), this.currentItem = t || this.items.first(), this.currentPanel = this.panels.filter((r = this, function(t) {
              return r.panels.eq(t).find(r.currentItem).length
            })), this.element.trigger("beforeSelect", {
              item: this.currentItem,
              panel: this.currentPanel
            }), this.items.removeAttr("tabindex"), this.controls && (null != (n = this.prevButton) && n.attr({
              "aria-disabled": this.panels.get(0) === this.currentPanel[0] && !this.options.cycleItems,
              tabindex: this.panels.get(0) !== this.currentPanel[0] || this.options.cycleItems ? "0" : "-1"
            }), null != (i = this.nextButton) && i.attr({
              "aria-disabled": this.panels.get(-1) === this.currentPanel[0] && !this.options.cycleItems,
              tabindex: this.panels.get(-1) !== this.currentPanel[0] || this.options.cycleItems ? "0" : "-1"
            })), this.panels.filter((o = this, function(t) {
              return "true" !== o.panels.get(t).getAttribute("aria-hidden")
            })).attr("aria-hidden", "true"), this.currentPanel.attr("aria-hidden", "false"), this.currentItem.attr("tabindex", 0), this.element.trigger("afterSelect", {
              item: this.currentItem,
              panel: this.currentPanel
            }), this.wrapper.attr("aria-activedescendant", this.currentItem.attr("id")), "vertical" === this.options.orientation ? this.selectionIndicator.css("top", this.currentItem.position().top + this.currentItem.height() / 2) : this.selectionIndicator.css("left", this.currentItem.position().left + this.currentItem.width() / 2), this.currentItem.attr("data-target") && void 0 !== (e = s(this.currentItem.attr("data-target"))).attr("src") && e.attr("src", this.currentItem.attr("data-url")), this.selectors && (this.selectors.find('[data-role="selector-index"]').text(this.items.index(this.currentItem) + 1), this.selectors.find('[data-role="selector-count"]').text(this.items.length)), this.currentItem
        }, i.prototype.findControls = function() {
          var t;
          if (this.options.controls && "false" !== this.options.controls)
            return (t = s("[role='toolbar']", this.element)).length ? t : this.element.children().length < 2 ? "before" === this.options.controls ? this.createControls().prependTo(this.element) : this.createControls().appendTo(this.element) : "before" === this.options.controls ? this.element.children().eq(0) : "after" === this.options.controls || "true" === this.options.controls || !0 === this.options.controls ? this.element.children().eq(1) : s(this.options.controls, this.element)
        }, i.prototype.findPrevious = function() {
          var t;
          if (this.controls && this.controls.length && this.options.prev && "false" !== this.options.prev)
            return (t = this.controls.find("[data-role='previous']")).length ? t : "true" === this.options.prev || !0 === this.options.prev ? this.createPrevious().appendTo(this.controls) : (t = s(this.options.prev, this.controls)).length ? t : this.controls.children().eq(0)
        }, i.prototype.findNext = function() {
          var t;
          if (this.controls && this.controls.length && this.options.next && "false" !== this.options.next)
            return (t = this.controls.find("[data-role='next']")).length ? t : "true" === this.options.next || !0 === this.options.next ? this.createNext().appendTo(this.controls) : (t = s(this.options.next, this.controls)).length ? t : this.controls.children().eq(1)
        }, i.prototype.findSelectors = function() {
          var t,
            e,
            n;
          if (this.controls && this.controls.length)
            return (n = this.controls.find("[data-role='selector']")).length ? n : "true" === this.options.selectors || !0 === this.options.selectors ? this.createSelectors().appendTo(this.controls) : (n = s(this.options.selectors, this.controls)).length ? n : (e = this.prevButton && this.prevButton.get(0), t = this.nextButton && this.nextButton.get(0), this.controls.children().filter(function() {
              return this !== e && this !== t
            }).first().children())
        }, i.prototype.createControls = function() {
          return s(document.createElement("div"))
        }, i.prototype.createPrevious = function() {
          return s(document.createElement("span"))
        }, i.prototype.createNext = function() {
          return s(document.createElement("span"))
        }, i.prototype.createSelectors = function() {
          var t;
          return (t = s(document.createElement("div")).attr("data-role", "selector")).html("&nbsp;/&nbsp;"), t.prepend(s(document.createElement("strong")).attr("data-role", "selector-index")), t.append(s(document.createElement("span")).attr("data-role", "selector-count"))
        }, i.prototype.createSelectionIndicator = function() {
          return s(document.createElement("div")).attr({
            "data-role": "carousel-selection-indicator"
          })
        }, i.prototype.keyEnter = function(t) {
          if ("button" === t.target.getAttribute("role") && "true" !== t.target.getAttribute("aria-disabled")) {
            if (t.target === this.prevButton.get(0) && this.currentItem[0] !== this.items.get(0))
              return this.keyPageUp(t), this.prevButton.focus();
            if (t.target === this.nextButton.get(0) && this.currentItem[0] !== this.items.get(-1))
              return this.keyPageDown(t), this.nextButton.focus()
          }
        }, i.prototype.keyPageUp = function(t) {
          return this.currentItem[0] === this.items.get(0) && this.options.cycleItems ? this.selectItem(this.items.last()).focus() : i.__super__.keyPageUp.call(this, t)
        }, i.prototype.keyPageDown = function(t) {
          return this.currentItem[0] === this.items.get(-1) && this.options.cycleItems ? this.selectItem(this.items.first()).focus() : i.__super__.keyPageDown.call(this, t)
        }, i.prototype.keyLeft = function(t) {
          if (!(this.prevButton && this.prevButton.get(0) === t.target || this.nextButton && this.nextButton.get(0) === t.target))
            return i.__super__.keyLeft.call(this, t)
        }, i.prototype.keyUp = function(t) {
          if (!this.controls || !this.controls.find(s(t.target)).length)
            return t.preventDefault(), this.keyLeft(t)
        }, i.prototype.keyRight = function(t) {
          if (!(this.prevButton && this.prevButton.get(0) === t.target || this.nextButton && this.nextButton.get(0) === t.target))
            return i.__super__.keyRight.call(this, t)
        }, i.prototype.keyDown = function(t) {
          if (!this.controls || !this.controls.find(s(t.target)).length)
            return t.preventDefault(), this.keyRight(t)
        }, i.prototype.destructor = function() {
          return i.__super__.destructor.apply(this, arguments)
        }, i
      }().install("Carousel", function() {
        return s("[data-widget='carousel']")[n.namespace + "carousel"]()
      })
    })
  }.call(this), function() {
    var o = {}.hasOwnProperty;
    !function(t) {
      "function" == typeof define && define.amd ? define("slideshow", ["jslib", "core", "widget", "carousel"], t) : t(this.$, _, _.AbstractWidget, _.Carousel)
    }(function(p, r, t, e) {
      "use strict";
      return function(t) {
        function c() {
          return c.__super__.constructor.apply(this, arguments)
        }
        return function(t, e) {
          for (var n in e)
            o.call(e, n) && (t[n] = e[n]);
          function i() {
            this.constructor = t
          }
          i.prototype = e.prototype, t.prototype = new i, t.__super__ = e.prototype
        }(c, e), c.defaultOptions = {
          panels: "",
          items: "",
          controls: "false",
          prev: "true",
          next: "true",
          play: "true",
          pause: "true",
          selectors: "true",
          event: "click",
          cycleItems: !0,
          autoplay: !0,
          duration: 7e3,
          orientation: "horizontal"
        }, c.prototype.initialize = function(t) {
          return c.__super__.initialize.call(this, t), this.playButton = this.findPlay(), this.pauseButton = this.findPause()
        }, c.prototype.aria = function() {
          var e,
            t,
            n,
            i;
          return this.controls && (null != (t = this.playButton) && t.attr({
            role: "button",
            tabindex: 0,
            "data-role": "play"
          }), null != (n = this.pauseButton) && n.attr({
            role: "button",
            tabindex: 0,
            "data-role": "pause"
          }), this.selectors && (this.selectors.attr({
            role: "button",
            tabindex: 0,
            "data-role": "selector"
          }), e = null, this.selectors.each((i = this, function(t) {
            return (e = i.items.get(t)).id || (e.id = r.getGUID("carousel-item-")), i.selectors.eq(t).attr("aria-controls", e.id)
          })))), c.__super__.aria.call(this), this.element.attr("data-role", "slideshow")
        }, c.prototype.bindEvents = function() {
          var t,
            e,
            n,
            i,
            r,
            o,
            s,
            a,
            l,
            u;
          return c.__super__.bindEvents.call(this), this.controls && (null != (t = this.prevButton) && t.on("" + this.options.event, (l = this, function(t) {
            if ("true" !== l.prevButton.get(0).getAttribute("aria-disabled"))
              return l.pause(), l.play()
          })), null != (e = this.nextButton) && e.on("" + this.options.event, (a = this, function(t) {
            if ("true" !== a.nextButton.get(0).getAttribute("aria-disabled"))
              return a.pause(), a.play()
          })), null != (n = this.playButton) && n.on("" + this.options.event, (s = this, function(t) {
            if ("true" !== s.playButton.get(0).getAttribute("aria-disabled"))
              return t.preventDefault(), s.play()
          })), null != (i = this.pauseButton) && i.on("" + this.options.event, (o = this, function(t) {
            if ("true" !== o.pauseButton.get(0).getAttribute("aria-disabled"))
              return t.preventDefault(), o.pause()
          })), this.selectors && this.element.on("" + this.options.event, "[data-role='selector']", (r = this, function(t) {
            return t.preventDefault(), r.selectItem(r.items.eq(r.selectors.index(t.target)))
          }))), p(window).on("animations", (u = this, function(t, e) {
            if (u.playButton && !e.animations && u.playButton.attr("aria-disabled", "true"), u.playButton && e.animations && u.animation && u.playButton.attr("aria-disabled", "false"), u.pauseButton && e.animations && u.animation && u.pauseButton.attr("aria-disabled", "false"), u.pauseButton && !e.animations)
              return u.pauseButton.attr("aria-disabled", "true")
          })), "false" !== this.options.autoplay && this.play(), this.selectItem()
        }, c.prototype.selectItem = function(t) {
          var e;
          return c.__super__.selectItem.call(this, t), null != (e = this.selectors) && e.attr("aria-selected", "false").eq(this.items.index(this.currentItem)).attr("aria-selected", "true"), this.currentItem
        }, c.prototype.play = function() {
          var t,
            e;
          if (null != (t = this.playButton) && t.attr("aria-disabled", "true"), null != (e = this.pauseButton) && e.attr("aria-disabled", "false"), !this.animation)
            return this.animation = setInterval(c.autoPlay, this.options.duration, this)
        }, c.prototype.pause = function() {
          var t,
            e;
          return null != (t = this.playButton) && t.attr("aria-disabled", "false"), null != (e = this.pauseButton) && e.attr("aria-disabled", "true"), clearTimeout(this.animation), this.animation = void 0
        }, c.autoPlay = function(t) {
          if (r.allowAnimation())
            return t.selectNextItem()
        }, c.prototype.findPlay = function() {
          var t;
          if (this.controls && this.controls.length && this.options.play && "false" !== this.options.play)
            return (t = this.controls.find("[data-role='play']")).length ? t : "true" === this.options.play || !0 === this.options.play ? this.createPlay().appendTo(this.controls) : (t = p(this.options.play, this.controls)).length ? t : this.controls.children().eq(3)
        }, c.prototype.findPause = function() {
          var t;
          if (this.controls && this.controls.length && this.options.pause && "false" !== this.options.pause)
            return (t = this.controls.find("[data-role='pause']")).length ? t : "true" === this.options.pause || !0 === this.options.pause ? this.createPause().appendTo(this.controls) : (t = p(this.options.pause, this.controls)).length ? t : this.controls.children().eq(4)
        }, c.prototype.findSelectors = function() {
          var t,
            e,
            n,
            i,
            r,
            o,
            s;
          if (this.controls && this.controls.length) {
            if ((n = this.controls.find("[data-role='selector']")).length)
              return n;
            if ("true" === this.options.selectors || !0 === this.options.selectors) {
              for (n = this.createSelectors().appendTo(this.controls), i = r = 0, o = (s = this.items).length; r < o; i = ++r)
                s[i], this.createSelector().appendTo(n);
              return n
            }
            return (n = p(this.options.selectors, this.controls)).length ? n : (e = this.prevButton && this.prevButton.get(0), t = this.nextButton && this.nextButton.get(0), this.controls.children().filter(function() {
              return this !== e && this !== t
            }).first().children())
          }
        }, c.prototype.createPlay = function() {
          return p(document.createElement("span"))
        }, c.prototype.createPause = function() {
          return p(document.createElement("span"))
        }, c.prototype.createSelectors = function() {
          return p(document.createElement("div")).attr("role", "group")
        }, c.prototype.createSelector = function() {
          return p(document.createElement("span"))
        }, c.prototype.keySpace = function(t) {
          return t.preventDefault(), this.animation ? this.pause() : this.play()
        }, c.prototype.keyLeft = function(t) {
          var e;
          if (c.__super__.keyLeft.call(this, t), e = p(t.target), "button" === t.target.getAttribute("role") && t.target !== this.prevButton.get(0) && t.target !== this.nextButton.get(0))
            return this.selectors.eq(this.selectors.index(e) - 1).focus()
        }, c.prototype.keyRight = function(t) {
          var e;
          if (c.__super__.keyRight.call(this, t), e = p(t.target), "button" === t.target.getAttribute("role") && t.target !== this.prevButton.get(0) && t.target !== this.nextButton.get(0))
            return this.selectors.eq((this.selectors.index(e) + 1) % this.selectors.length).focus()
        }, c.prototype.destructor = function() {
          return c.__super__.destructor.call(this)
        }, c
      }().install("Slideshow", function() {
        return p("[data-widget='slideshow']")[r.namespace + "slideshow"]()
      })
    })
  }.call(this), function() {
    var s = {}.hasOwnProperty;
    !function(t) {
      "function" == typeof define && define.amd ? define("gallery", ["jslib", "core", "widget", "carousel", "slideshow", "dialog"], t) : t(this.$, _, _.AbstractWidget, _.Carousel, _.Slideshow, _.Dialog)
    }(function(o, n, i, t, e, r) {
      "use strict";
      return function(t) {
        function e() {
          return e.__super__.constructor.apply(this, arguments)
        }
        return function(t, e) {
          for (var n in e)
            s.call(e, n) && (t[n] = e[n]);
          function i() {
            this.constructor = t
          }
          i.prototype = e.prototype, t.prototype = new i, t.__super__ = e.prototype
        }(e, i), e.defaultOptions = {
          carousel: "[data-widget='carousel'],[data-role='carousel']",
          slideshow: "[data-widget='slideshow'],[data-role='slideshow']",
          overlay: !1
        }, e.prototype.initialize = function(t) {
          if (e.__super__.initialize.call(this, t), this.carousel = this.findCarousel(), this.slideshow = this.findSlideshow(), "true" === this.options.overlay || !0 === this.options.overlay)
            return this.dialog = this.createDialog(), this.slideshow.wrap(this.dialog), this.dialog[n.namespace + "dialog"]({
              overlay: "true"
            }), this.carousel.find("[role='option']").attr("aria-controls", this.dialog.attr("id"))[n.namespace + "toggle"]()
        }, e.prototype.bindEvents = function() {
          var i,
            r;
          return i = n.getInstance(this.carousel, "carousel"), r = n.getInstance(this.slideshow, "slideshow"), this.carousel.on("click", "[role='option']", function(t) {
            var e,
              n;
            return "true" === t.target.getAttribute("aria-disabled") ? t.preventDefault() : (e = o(t.target), n = i.items.index(e), r.selectItem(r.items.eq(n)))
          }), this.slideshow.on("afterSelect", function(t, e) {
            var n;
            return n = r.items.index(e.item), i.selectItem(i.items.eq(n))
          })
        }, e.prototype.findCarousel = function() {
          return o(this.options.carousel, this.element)
        }, e.prototype.findSlideshow = function() {
          return o(this.options.slideshow, this.element)
        }, e.prototype.createDialog = function() {
          return o(document.createElement("div"))
        }, e.prototype.destructor = function() {
          return e.__super__.destructor.call(this), this.carousel = null, this.slideshow = null
        }, e
      }().install("Gallery", function() {
        return o("[data-widget='gallery']")[n.namespace + "gallery"]()
      })
    })
  }.call(this), function() {
    var r = {}.hasOwnProperty,
      a = [].indexOf || function(t) {
        for (var e = 0, n = this.length; e < n; e++)
          if (e in this && this[e] === t)
            return e;
        return -1
      };
    !function(t) {
      "function" == typeof define && define.amd ? define("filter", ["jslib", "core", "widget", "toolbar"], t) : t(this.$, _, _.AbstractWidget, _.Toolbar)
    }(function(n, t, i, e) {
      "use strict";
      return function(t) {
        function e() {
          return e.__super__.constructor.apply(this, arguments)
        }
        return function(t, e) {
          for (var n in e)
            r.call(e, n) && (t[n] = e[n]);
          function i() {
            this.constructor = t
          }
          i.prototype = e.prototype, t.prototype = new i, t.__super__ = e.prototype
        }(e, i), e.defaultOptions = {
          form: "",
          filters: "",
          items: ""
        }, e.prototype.initialize = function(t) {
          return e.__super__.initialize.call(this, t), this.form = this.findForm(), this.filters = this.findFilters(), this.items = this.findItems()
        }, e.prototype.aria = function() {
          return e.__super__.aria.call(this)
        }, e.prototype.bindEvents = function() {
          var t,
            e;
          return this.form.submit((t = this, function() {
            return t.applyFilter(), !1
          })), this.form.on("reset", (e = this, function(t) {
            return e.clear()
          }))
        }, e.prototype.applyFilter = function(t) {
          var s,
            e;
          if (t = t || this.element.find("form").serialize(), s = t.split("&").reduce(function(t, e) {
            var n,
              i,
              r;
            return n = (i = e.split("="))[0], (r = i[1]) && (t[n] = t[n] || [], t[n].push(r)), t
          }, {}), this.element.trigger("beforeFilter", {
            items: this.items,
            filters: s
          }), this.items.show(), Object.keys(s).length)
            return e = window.location.hash, window.history.pushState("filter", "", "?" + t + e), this.items.hide().filter(function() {
              var t,
                e,
                n,
                i,
                r,
                o;
              for (e in s)
                for (r = s[e], o = this.getAttribute("data-filter-" + e).split(","), t = 0, n = r.length; t < n; t++)
                  if (i = r[t], !(0 <= a.call(o, i)))
                    return !1;
              return !0
            }).show(), this.element.trigger("afterFilter", {
              items: this.items,
              filters: s
            })
        }, e.prototype.clear = function() {
          var t;
          return this.items.show(), t = window.location.hash, window.history.pushState("filter", "", "?" + t)
        }, e.prototype.findForm = function() {
          return this.options.form ? n(this.options.form, this.element) : this.element.find("form")
        }, e.prototype.findFilters = function() {
          var t;
          return (t = this.element.find("[data-role='filter']")).length ? t : (this.options.filters ? t = n(this.options.filters, this.element) : n(), t.filter(function() {
            return !n(this).is("[role='presentation'],[data-role='label']")
          }))
        }, e.prototype.findItems = function() {
          var t;
          return (t = this.element.find("[data-role='filter-item']")).length ? t : this.options.items ? n(this.options.items, this.element) : (t = this.element.find(), this.element.find("*").filter(function() {
            var t;
            for (t = 0; t < this.attributes.length;) {
              if (this.attributes[t].name.match(/data-filter-/))
                return !0;
              t++
            }
            return !1
          }))
        }, e.prototype.destructor = function() {}, e
      }().install("FilterElements", function() {
        if (n("[data-widget='filter']")[t.namespace + "filterelements"](), window.location.search)
          return n("[data-widget='filter']")[t.namespace + "filterelements"]("applyFilter", window.location.search.substring(1))
      })
    })
  }.call(this), function() {
    var r = {}.hasOwnProperty;
    !function(t) {
      "function" == typeof define && define.amd ? define("sort", ["jslib", "core", "widget"], t) : t(this.$, _, _.AbstractWidget)
    }(function(o, t, e) {
      "use strict";
      return function(t) {
        function i() {
          return i.__super__.constructor.apply(this, arguments)
        }
        return function(t, e) {
          for (var n in e)
            r.call(e, n) && (t[n] = e[n]);
          function i() {
            this.constructor = t
          }
          i.prototype = e.prototype, t.prototype = new i, t.__super__ = e.prototype
        }(i, e), i.defaultOptions = {
          triggers: "",
          items: ""
        }, i.prototype.initialize = function(t) {
          var n;
          return i.__super__.initialize.call(this, t), this.triggers = this.findTriggers(), this.items = this.findItems(), n = function(n, i, r) {
            return null == r && (r = function(t) {
              return t.toString()
            }), function(t, e) {
              return r(i ? o(i, t) : o(t)) < r(i ? o(i, e) : o(e)) ? 1 - 2 * n : 2 * n - 1
            }
          }, this.sorters = {
            text: function(t, e) {
              return n(t, e, function(t) {
                return t.text().toLowerCase()
              })
            },
            "numeric-eu": function(t, e) {
              return n(t, e, function(t) {
                return parseFloat(t.text().replace(/[' ]/g, "").replace(/,/g, "."))
              })
            },
            numeric: function(t, e) {
              return n(t, e, function(t) {
                return parseFloat(t.text().replace(/[, ]/g, ""))
              })
            },
            date: function(t, e) {
              return n(t, e, function(t) {
                return Date.parse(t.text())
              })
            }
          }, o.extend(this.sorters, t.sorters)
        }, i.prototype.aria = function() {
          var t,
            e;
          return i.__super__.aria.call(this), this.triggers.attr("data-role", "sort-trigger").each(function() {
            if ("TH" !== this.nodeName)
              return this.setAttribute("role", "columnheader")
          }), e = this.triggers.parent().get(0), "TR" !== this.nodeName && e.setAttribute("role", "row"), this.items.attr("data-role", "sort-items").each(function() {
            if ("TD" !== this.nodeName && this.setAttribute("role", "gridcell"), "TR" !== this.parentNode.nodeName)
              return this.parentNode.setAttribute("role", "row")
          }), "TBODY" !== (t = this.items.parents(":not([role='row'])").get(0)).nodeName && t.setAttribute("role", "rowgroup"), this.element.attr({
            role: "grid",
            "aria-readonly": "true"
          })
        }, i.prototype.bindEvents = function() {
          return this.element.on("click", "[data-role='sort-trigger']", (r = this, function(t) {
            var e,
              n,
              i;
            if ("true" !== t.target.getAttribute("aria-disabled"))
              return i = r.getType(t.target), e = r.getOrder(t.target), n = r.getSelector(t.target), r.triggers.removeAttr("aria-sort"), t.target.setAttribute("aria-sort", "ascending" !== e ? "ascending" : "descending"), r.sort(i, "ascending" !== e, n)
          }));
          var r
        }, i.prototype.sort = function(t, e, n) {
          var i,
            r;
          return r = this.sorters[t](e, n), i = this.items.parent(), this.items.sort(r), this.items.detach(), i.append(this.items)
        }, i.prototype.findTriggers = function() {
          var t;
          return (t = this.element.find("[data-role='sort-trigger']")).length ? t : this.options.triggers ? o(this.options.triggers, this.element) : (t = this.element.find("thead th")).length ? t : o()
        }, i.prototype.findItems = function() {
          var t;
          return (t = this.element.find("[data-role='sort-item']")).length ? t : this.options.items ? o(this.options.items, this.element) : (t = this.element.find("tbody tr")).length ? t : (t = this.element.find("li")).length ? t : o()
        }, i.prototype.getSelector = function(t) {
          var e;
          return (e = o(t).get(0).getAttribute("data-selector")) ? $item.find(e) : "TH" === t.nodeName ? ":nth-child(" + (this.triggers.index(t) + 1) + ")" : void 0
        }, i.prototype.getType = function(t) {
          return o(t).get(0).getAttribute("data-type") || "text"
        }, i.prototype.getOrder = function(t) {
          return o(t).get(0).getAttribute("aria-sort")
        }, i.prototype.destructor = function() {}, i
      }().install("SortElements", function() {
        return o("[data-widget='sort']")[t.namespace + "sortelements"]()
      })
    })
  }.call(this), function() {
    !function(t) {
      "function" == typeof define && define.amd ? define("loader", ["jslib", "core", "ellipsis", "overlay", "toggle", "tooltip", "collapse", "accordions", "tabs", "toolbar", "menubar", "menu", "tree", "dialog", "alert", "notification", "list", "carousel", "slideshow", "gallery", "filter", "sort"], t) : t(this.$)
    }(function(i, t) {
      var e;
      return i("html").removeClass("no-js").addClass("js"), i(e = ">h1,>h2,>h3", i(".page-header, .page-header header")).add(i(e, i(".page-content header"))).add(i(e, i(".page-content, .page-content section"))).each(function() {
        var t,
          e,
          n;
        return t = i(this), n = i.trim(t.text()), this.id || (e = n.toLowerCase().replace(/\(\)\[\]/, "").replace(/\W/g, "-").replace(/-+/g, "-"), i('[id="' + e + '"]').length || (this.id = e)), t.addClass("heading").append(i(document.createElement("a")).attr({
          href: "#" + this.id,
          class: "heading-anchor",
          rel: "bookmark"
        }).html('<span class="visuallyhidden">' + n + "</span>"))
      }), i(".icon:empty").attr({
        role: "presentation",
        hidden: "hidden"
      }), i(".nav").on("click", ".nav-item-active a.nav-link", function(t) {
        if (i(t.target).closest(".nav-item").hasClass("nav-item-active"))
          return t.preventDefault()
      }), i(document).trigger("ui-loaded"), t
    })
  }.call(this), function() {
    var r = {}.hasOwnProperty;
    (function(t) {
      return "function" == typeof define && define.amd ? define("a11y", ["jslib", "plugin"], t) : t(this.$, AbstractPlugin)
    }).call(this, function(n, i) {
      "use strict";
      return function(t) {
        function e() {
          return e.__super__.constructor.apply(this, arguments)
        }
        return function(t, e) {
          for (var n in e)
            r.call(e, n) && (t[n] = e[n]);
          function i() {
            this.constructor = t
          }
          i.prototype = e.prototype, t.prototype = new i, t.__super__ = e.prototype
        }(e, i), e.prototype.bindEvents = function() {
          return this.element.on("click", function() {
            var t,
              e;
            if (e = this.href.replace(/.*(#.*)/, "$1"))
              return (t = n(e)).attr("tabindex", 0), t.focus(), t.attr("tabindex", -1)
          }), n(this.element.attr("href").replace(/.*(#.*)/, "$1")).on("blur", function() {
            return n(this).removeAttr("tabindex")
          }), n(document).on("keydown", function(t) {
            if (!n(t.target).is(":input"))
              return n("html").addClass("is-keyboard")
          }), n(document).on("mousedown", function(t) {
            return n("html").removeClass("is-keyboard")
          })
        }, e
      }().install("A11yLinks", function() {
        return n(".a11y .focusable")[i.namespace + "a11ylinks"]()
      })
    })
  }.call(this), function() {
    var r = {}.hasOwnProperty;
    (function(t) {
      return "function" == typeof define && define.amd ? define("globalnav", ["jslib", "plugin"], t) : t(this.$, AbstractPlugin)
    }).call(this, function(i, n) {
      "use strict";
      return function(t) {
        function e() {
          return e.__super__.constructor.apply(this, arguments)
        }
        return function(t, e) {
          for (var n in e)
            r.call(e, n) && (t[n] = e[n]);
          function i() {
            this.constructor = t
          }
          i.prototype = e.prototype, t.prototype = new i, t.__super__ = e.prototype
        }(e, n), e.prototype.bindEvents = function() {
          var e,
            n;
          return this.element.on("headerLoaded", (e = this, function(t) {
            return e.bindEvents()
          })), this.element.on("click", function(t) {
            if (0 === i(t.target).closest(".pane,.epflnav").length)
              return i(".epflnav .nav-link.toggle-visible").click()
          }), i(".epflnav > a, .search > a").on("click", function(t) {
            if (i(".epflnav .nav-link.toggle-visible").epfl_toggle("hide", t), t.target === i(".epflnav > a").get(0) && i(".search > .toggle-visible").epfl_toggle("hide", t), t.target === i(".search > a").get(0))
              return i(".epflnav > .toggle-visible").epfl_toggle("hide", t)
          }), this.element.on("beforeToggle", ".epflnav .nav-link", function(t, e) {
            if (e.toggle.hasClass("toggle-hidden"))
              return i(".epflnav .nav-link.toggle-visible").epfl_toggle("hide")
          }), this.element.on("afterOverlay", ".pane", (n = this, function(t, e) {
            return e.status ? n.element.css({
              background: "#fff",
              "z-index": e.element.css("z-index")
            }) : e.event ? n.element.css({
              background: "transparent",
              "z-index": "initial"
            }) : i("#overlay").attr("aria-hidden", "false")
          }))
        }, e
      }().install("GlobalNav", function() {
        return i("#epfl-header")[n.namespace + "globalnav"]()
      })
    })
  }.call(this), function() {
    var r = {}.hasOwnProperty;
    (function(t) {
      return "function" == typeof define && define.amd ? define("search", ["jslib", "plugin"], t) : t(this.$, AbstractPlugin)
    }).call(this, function(o, n) {
      "use strict";
      return function(t) {
        function e() {
          return e.__super__.constructor.apply(this, arguments)
        }
        return function(t, e) {
          for (var n in e)
            r.call(e, n) && (t[n] = e[n]);
          function i() {
            this.constructor = t
          }
          i.prototype = e.prototype, t.prototype = new i, t.__super__ = e.prototype
        }(e, n), e.defaultOptions = {
          engines: {
            default: {
              url: "//search.epfl.ch/web.action",
              param: "q",
              ac: {
                url: "//search.epfl.ch/gsasuggest",
                param: "q",
                params: {
                  site: "epfl",
                  client: "epfl",
                  format: "rich"
                },
                format: function(t) {
                  return {
                    query: t.query,
                    suggestions: o.map(t.results, function(t) {
                      return "" + t.name
                    })
                  }
                }
              }
            },
            courses: {
              url: "//search.epfl.ch/eduweb.action",
              ac: {
                params: {
                  site: "edu_epfl_ch",
                  client: "edu_epfl_ch",
                  format: "rich"
                }
              }
            },
            directory: {
              url: "//search.epfl.ch/psearch.action",
              ac: {
                url: "//search.epfl.ch/json/autocompletename.action",
                param: "term",
                format: function(t) {
                  return {
                    query: t.term,
                    suggestions: o.map(t.result, function(t) {
                      return t.name + " " + t.firstname
                    })
                  }
                }
              }
            },
            events: {
              url: "",
              ac: !1
            },
            news: {
              url: "//search.epfl.ch/actuweb.action",
              ac: {
                params: {
                  site: "actualites",
                  client: "actualites",
                  format: "rich"
                }
              }
            },
            places: {
              url: "//plan.epfl.ch/",
              param: "room"
            },
            publications: {
              url: "//search.epfl.ch/publication.action",
              ac: {
                params: {
                  site: "infoscience",
                  client: "infoscience",
                  format: "rich"
                }
              }
            },
            units: {
              url: "//search.epfl.ch/usearch.action",
              ac: !1
            }
          }
        }, e.prototype.initialize = function(t) {
          return e.__super__.initialize.call(this, t), this.update(o.extend({}, e.defaultOptions, t))
        }, e.prototype.bindEvents = function() {
          return this.element.on("keydown", ".search-query", function(t) {
            if (27 === t.which || 9 === t.which)
              return t.target.setAttribute("aria-expanded", "false")
          }), this.element.on("change", ".search-domain", (e = this, function(t) {
            return e.setAutocomplete(o(t.target).val())
          }));
          var e
        }, e.prototype.setAutocomplete = function(t) {
          var e,
            n,
            i,
            r;
          return n = o("input[name='site']", this.element), e = o(".search-query", this.element), "site" === t ? (n.removeAttr("disabled"), n.val(window.location.hostname)) : (n.attr("disabled", "disabled"), n.val("")), r = this.options.engines[t], o("#search-form").attr("action", (null != r ? r.url : void 0) || this.options.engines.default.url), e.attr("name", (null != r ? r.param : void 0) || this.options.engines.default.param), r && !1 === r.ac ? (e.autocomplete("disable"), e.removeAttr("aria-autocomplete aria-expanded aria-owns role")) : (o(".autocomplete-suggestions").attr({
            id: "search-suggestions",
            role: "listbox"
          }), e.attr({
            "aria-autocomplete": "both",
            "aria-expanded": "false",
            "aria-owns": "search-suggestions",
            role: "combobox"
          }), i = r && r.ac, e.autocomplete("setOptions", {
            serviceUrl: (null != i ? i.url : void 0) || this.options.engines.default.ac.url,
            paramName: (null != i ? i.param : void 0) || this.options.engines.default.ac.param,
            transformResult: (null != i ? i.format : void 0) || this.options.engines.default.ac.format,
            params: (null != i ? i.params : void 0) || this.options.engines.default.ac.params
          }), e.autocomplete("enable"))
        }, e.prototype.update = function(t) {
          var i;
          return this.options = o.extend(!0, this.options, t), (i = o(".search-query", this.element)).autocomplete({
            appendTo: ".search .form",
            dataType: "jsonp",
            minChars: 3,
            onSelect: function(t) {
              return i.attr("aria-expanded", "false"), i.focus()
            },
            beforeRender: function(t) {
              var e,
                n;
              return (n = t.children(".autocomplete-suggestion")).attr("role", "option"), 10 <= n.length && ((e = o(document.createElement("div")).text(function() {
                switch (o("html").attr("lang")) {
                  case "fr":
                    return "Voir tous les résultats";
                  case "de":
                    return "Alle Ergebnisse zeigen";
                  default:
                    return "View all results"
                }
              }()).attr({
                class: "autocomplete-more",
                role: "presentation"
              })).on("click", function() {
                return o("#search-form").submit()
              }), t.append(e)), i.attr("aria-expanded", "true")
            }
          }), this.setAutocomplete(o("#search-domain").val())
        }, e.prototype.destructor = function() {
          var t;
          return (t = o(".search-query", this.element)).autocomplete("dispose"), t.removeAttr("aria-autocomplete aria-expanded aria-owns role"), e.__super__.destructor.call(this)
        }, e
      }().install("Search", function() {
        return o("#epfl-header")[n.namespace + "search"](), o("#epfl-header").on("headerLoaded", function(t) {
          return o(t.target)[n.namespace + "search"]("update")
        })
      })
    })
  }.call(this), function() {
    var s = {}.hasOwnProperty;
    (function(t) {
      return "function" == typeof define && define.amd ? define("header", ["jslib", "plugin", "globalnav", "search"], t) : t(this.$, AbstractPlugin)
    }).call(this, function(o, e) {
      "use strict";
      return function(t) {
        function r() {
          return r.__super__.constructor.apply(this, arguments)
        }
        return function(t, e) {
          for (var n in e)
            s.call(e, n) && (t[n] = e[n]);
          function i() {
            this.constructor = t
          }
          i.prototype = e.prototype, t.prototype = new i, t.__super__ = e.prototype
        }(r, e), r.prototype.initialize = function(t) {
          var e,
            n,
            i;
          if (r.__super__.initialize.call(this, t), n = this.element.attr("data-ajax-header"))
            return e = n + " #" + this.element.attr("id") + " > *", this.element.load(e, (i = this, function() {
              return i.element.trigger("headerLoaded"), o("#" + i.element.attr("id") + " [data-widget='toggle']").epfl_toggle()
            }))
        }, r
      }().install("Header", function() {
        return o("#epfl-header")[e.namespace + "header"]()
      })
    })
  }.call(this), function() {
    var r = {}.hasOwnProperty;
    (function(t) {
      return "function" == typeof define && define.amd ? define("share", ["jslib", "plugin", "toggle"], t) : t(this.$, AbstractPlugin)
    }).call(this, function(l, n) {
      "use strict";
      return function(t) {
        function e() {
          return e.__super__.constructor.apply(this, arguments)
        }
        return function(t, e) {
          for (var n in e)
            r.call(e, n) && (t[n] = e[n]);
          function i() {
            this.constructor = t
          }
          i.prototype = e.prototype, t.prototype = new i, t.__super__ = e.prototype
        }(e, n), e.defaultOptions = {
          order: ["facebook", "twitter", "linkedin", "googleplus", "mail"],
          hashtags: ["epfl"],
          sites: {
            facebook: {
              label: "Facebook",
              shareLink: "www.facebook.com/sharer/sharer.php?u=%url%"
            },
            googleplus: {
              label: "Google+",
              shareLink: "plus.google.com/share?url=%url%"
            },
            linkedin: {
              label: "LinkedIn",
              shareLink: "www.linkedin.com/shareArticle?url=%url%&title=%title%"
            },
            reddit: {
              label: "reddit",
              shareLink: "www.reddit.com/submit?url=%url%&title=%title%"
            },
            stumbleupon: {
              label: "StumbleUpon",
              shareLink: "www.stumbleupon.com/submit?url=%url%&title=%title%"
            },
            twitter: {
              label: "Twitter",
              shareLink: "twitter.com/intent/tweet?url=%url%&text=%title%&hashtags=%hashtags%"
            },
            mail: {
              label: "Email",
              shareLink: "mailto:?subject=%title%&body=%url%"
            }
          }
        }, e.prototype.initialize = function(t) {
          return this.update(l.extend({}, e.options, t))
        }, e.prototype.prepareShareHashtags = function(t) {
          var e,
            n;
          return n = [], e = this.options.prepareHashtags, n.concat(this.options.hashtags).concat(l.isFunction(e) && e(n, t) || [])
        }, e.prototype.prepareShareText = function(t, e) {
          var n;
          return n = this.options.prepareText, l.isFunction(n) && n(t, e) || t
        }, e.prototype.prepareShareLink = function(t, e, n, i) {
          var r,
            o,
            s,
            a;
          return s = this.prepareShareHashtags(i), a = this.prepareShareText(n, i), -1 < t.indexOf("%hashtags%") ? (s = s.join(","), t = t.replace(new RegExp("%hashtags%", "g"), s)) : a += " " + s.map(function(t) {
            return "#" + t
          }).join(" "), o = encodeURIComponent(e), r = encodeURIComponent(a), t.replace(new RegExp("%url%", "g"), o).replace(new RegExp("%title%", "g"), r)
        }, e.prototype.update = function(t) {
          var e,
            n,
            i,
            r;
          for (this.options = l.extend(!0, this.options, t), this.element.children(":not([data-role='label'])").remove(), e = 0, n = (i = this.options.order).length; e < n; e++)
            r = i[e], this.element.append(this.createButton(r));
          return this.share
        }, e.prototype.createButton = function(t) {
          var e,
            n,
            i,
            r,
            o,
            s,
            a;
          return (r = this.options.sites[t]) ? (a = window.location, s = l(".page-title").clone().children().remove().end().text() || document.title, (o = r.shareLink).match(/^\w+:/) || (o = "https://" + o), e = l(document.createElement("a")).attr({
            class: "share-link share-" + t,
            href: this.prepareShareLink(o, a, s, t),
            target: "_blank",
            title: r.label
          }), (i = l(document.createElement("span")).attr({
            class: "visuallyhidden"
          })).text(r.label), e.append(i), n = l(document.createElement("span")).attr({
            class: "icon icon-share-" + t + "_button"
          }), e.prepend(n), e) : l()
        }, e.prototype.destructor = function() {
          return this.menu.remove(), this.menu = null, e.__super__.destructor.call(this)
        }, e
      }().install("Share", function() {
        return l("#tools [role='toolbar']")[n.namespace + "share"]()
      })
    })
  }.call(this), function() {
    (function(t) {
      return "function" == typeof define && define.amd ? define("lazyload", ["jslib", "core", "header"], t) : t(this.$)
    }).call(this, function(n, t) {
      "use strict";
      var i,
        e;
      return i = "//cdnjs.cloudflare.com/ajax/libs", window.location.protocol.match("http") || (i = "http:" + i), e = function() {
        function t() {}
        return t.load = function() {
          var t,
            e;
          if ((t = n("pre code")).length && !n("html").hasClass("lt-ie8") && require([i + "/highlight.js/8.0/highlight.min.js"], function() {
            return n.getStyle(i + "/highlight.js/8.0/styles/foundation.min.css"), t.each(function() {
              return hljs.highlightBlock(this)
            }), n(document).trigger("highlightjs-ready")
          }), n("[data-format='maths']").length && require([i + "/mathjax/2.3/MathJax.js?config=TeX-MML-AM_HTMLorMML"], function() {
            return n(document).trigger("mathjax-ready")
          }), (e = n("[data-format='markdown']")).length)
            return require([i + "/marked/0.3.1/marked.min.js"], function(t) {
              return e.each(function() {
                var n;
                return t((n = this).innerHTML, function(t, e) {
                  if (t)
                    throw t;
                  return n.innerHTML = e
                })
              }), n(document).trigger("marked-ready")
            })
        }, t
      }(), n(function() {
        return (t.LazyLoad = e).load()
      }), n
    })
  }.call(this), function() {
    (function(t) {
      return "function" == typeof define && define.amd ? define("epfl", ["jslib", "loader", "a11y", "globalnav", "search", "header", "share", "lazyload"], t) : t(this.$)
    }).call(this, function(i) {
      "use strict";
      var r,
        o,
        s,
        a,
        e;
      return e = function() {
        return i(".nav-block .nav-item").removeClass("nav-item-parent"), i(".nav-block .nav-item-active").parents(".nav-item").addClass("nav-item-parent"), i(".localnav [role='tree']").each(function() {
          var t;
          return t = i(this).find(".nav-item-active"), i(this).epfl_tree("selectItem", t), t.children("[aria-controls][aria-expanded='false']").epfl_collapse("show")
        })
      }, i(window).on("hashchange", function(t) {
        return e()
      }), i(e), i("html").hasClass("lt-ie8") || (o = a = void 0, s = function(t) {
        return clearTimeout(o), i(".mainnav .nav > .nav-list > .nav-item").children("[aria-controls][aria-expanded='true']").eq(0).epfl_collapse("hide", t), i(this).children("[aria-controls][aria-expanded='false']").eq(0).epfl_collapse("show", t)
      }, r = function(t) {
        return i(this).children("[aria-controls][aria-expanded='true']").eq(0).epfl_collapse("hide", t)
      }, i(document).on("mouseenter", ".mainnav .nav > .nav-list > .nav-item", function(t) {
        var e,
          n;
        if (!(i(document).width() <= 736))
          return clearTimeout(a), n = this, e = i.extend({}, t), a = setTimeout(function() {
            return s.apply(n, [e])
          }, 150)
      }).on("mouseleave", ".mainnav .nav > .nav-list > .nav-item", function(t) {
        var e,
          n;
        if (!(i(document).width() <= 736))
          return clearTimeout(a), clearTimeout(o), n = this, e = i.extend({}, t), o = setTimeout(function() {
            return r.apply(n, [e])
          }, 300)
      })), i(document).on("click", ".mainnav > [aria-controls]", function(t) {
        var e,
          n;
        if (!(736 < i(document).width()))
          return "true" === this.getAttribute("aria-expanded") ? (t.stopPropagation(), n = i('.mainnav [role="menubar"]').attr("aria-activedescendant"), e = i(n ? "#" + n : ".mainnav .nav-item-active"), i(e.parents('[role="menu"]').get().reverse()).each(function() {
            return _.getInstance(i('[aria-controls="' + this.id + '"]'), ["collapse"]).show()
          })) : void 0
      }), i(document).on("click", ".mainnav .nav > .nav-list > .nav-item > .nav-link", function(t) {
        var e;
        if (i("html").hasClass("lt-ie8") && t.target.getAttribute("aria-controls") && (e = i(t.target).next('[role="menu"]').find(".nav-link").get(0)))
          return window.location = e.getAttribute("href")
      }), i
    })
  }.call(this), function() {
    (function(t) {
      return "function" == typeof define && define.amd ? define("analytics", ["jslib", "header"], t) : t(this.$)
    }).call(this, function(n) {
      "use strict";
      var t,
        e,
        i,
        r;
      return t = window, e = document, t.GoogleAnalyticsObject = "ga", t.ga = t.ga || function() {
        (t.ga.q = t.ga.q || []).push(arguments)
      }, t.ga.l = 1 * new Date, i = e.createElement("script"), r = e.getElementsByTagName("script")[0], i.async = 1, i.src = "//www.google-analytics.com/analytics.js", r.parentNode.insertBefore(i, r), n(function() {
        return ga("create", "UA-4833294-1", {
          name: "epfl",
          cookieDomain: "auto"
        }), ga("epfl.set", "anonymizeIp", !0), ga("epfl.send", "pageview"), n("#epfl-header").on("click", ".epflnav .nav-link", function(t) {
          return ga("epfl.send", "event", "Global Nav", "Show Pane", t.currentTarget.id)
        }), n("#epfl-header").on("click", ".pane a", function(t) {
          return ga("epfl.send", "event", "Global Nav", "Click", t.target.href)
        }), n("#tools .share-link").on("click", function(t) {
          var e;
          return e = n.trim(n(t.target).attr("class").replace("share-link")), ga("epfl.send", "social", e, "Share", window.location.href)
        })
      }), ga
    })
  }.call(this), function() {
    (function(t) {
      "use strict";
      var e;
      return window.require = void 0 !== require && require, window.UI_JS_NAMESPACE = "epfl_", e = e || window, "function" == typeof define && define.amd ? (require.config({
        baseUrl: require.baseUrl || require.s.contexts._.config.baseUrl || "/scripts",
        paths: {
          core: "ui-lib/core",
          loader: "ui-lib/uilib-loader",
          widget: "ui-lib/jslib-widget-base",
          ellipsis: "ui-lib/ellipsis",
          accordions: "ui-lib/widgets/accordions",
          alert: "ui-lib/widgets/alert",
          carousel: "ui-lib/widgets/carousel",
          collapse: "ui-lib/widgets/collapse",
          dialog: "ui-lib/widgets/dialog",
          gallery: "ui-lib/widgets/gallery",
          list: "ui-lib/widgets/list",
          menu: "ui-lib/widgets/menu",
          menubar: "ui-lib/widgets/menubar",
          notification: "ui-lib/widgets/notification",
          overlay: "ui-lib/widgets/overlay",
          slideshow: "ui-lib/widgets/slideshow",
          tabs: "ui-lib/widgets/tabs",
          toggle: "ui-lib/widgets/toggle",
          toolbar: "ui-lib/widgets/toolbar",
          tooltip: "ui-lib/widgets/tooltip",
          tree: "ui-lib/widgets/tree",
          filter: "ui-lib/widgets/filter",
          sort: "ui-lib/widgets/sort",
          plugin: "jslib-plugin-base",
          a11y: "plugins/a11y",
          analytics: "plugins/analytics",
          globalnav: "plugins/globalnav",
          header: "plugins/header",
          search: "plugins/search",
          share: "plugins/share",
          autocomplete: "../vendor/devbridge-autocomplete/dist/jquery.autocomplete",
          jslib: "jquery-module",
          jslib_touch: "../vendor/jquery-touchswipe/jquery.touchSwipe"
        },
        map: {
          "*": {
            jquery: "jslib"
          }
        },
        shim: {
          jslib: {
            exports: "$"
          },
          jslib_touch: {
            deps: ["jslib"]
          }
        }
      }), define("epfl-jquery", ["jslib", "jslib_touch", "autocomplete", "loader", "epfl"], t), require(["epfl-jquery", "analytics"])) : t(this.$)
    }).call(this, function(t) {
      return t
    })
  }.call(this), function(p) {
    if (!p.hasInitialised) {
      var h = {
        escapeRegExp: function(t) {
          return t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
        },
        hasClass: function(t, e) {
          return 1 === t.nodeType && 0 <= (" " + t.className + " ").replace(/[\n\t]/g, " ").indexOf(" " + e + " ")
        },
        addClass: function(t, e) {
          t.className += " " + e
        },
        removeClass: function(t, e) {
          var n = new RegExp("\\b" + this.escapeRegExp(e) + "\\b");
          t.className = t.className.replace(n, "")
        },
        interpolateString: function(t, e) {
          return t.replace(/{{([a-z][a-z0-9\-_]*)}}/gi, function(t) {
            return e(arguments[1]) || ""
          })
        },
        getCookie: function(t) {
          var e = ("; " + document.cookie).split("; " + t + "=");
          return 2 != e.length ? void 0 : e.pop().split(";").shift()
        },
        setCookie: function(t, e, n, i, r) {
          var o = new Date;
          o.setDate(o.getDate() + (n || 365));
          var s = [t + "=" + e, "expires=" + o.toUTCString(), "path=" + (r || "/")];
          i && s.push("domain=" + i), document.cookie = s.join(";")
        },
        deepExtend: function(t, e) {
          for (var n in e)
            e.hasOwnProperty(n) && (n in t && this.isPlainObject(t[n]) && this.isPlainObject(e[n]) ? this.deepExtend(t[n], e[n]) : t[n] = e[n]);
          return t
        },
        throttle: function(t, e) {
          var n = !1;
          return function() {
            n || (t.apply(this, arguments), n = !0, setTimeout(function() {
              n = !1
            }, e))
          }
        },
        hash: function(t) {
          var e,
            n,
            i = 0;
          if (0 === t.length)
            return i;
          for (e = 0, n = t.length; e < n; ++e)
            i = (i << 5) - i + t.charCodeAt(e), i |= 0;
          return i
        },
        normaliseHex: function(t) {
          return "#" == t[0] && (t = t.substr(1)), 3 == t.length && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]), t
        },
        getContrast: function(t) {
          return t = this.normaliseHex(t), 128 <= (299 * parseInt(t.substr(0, 2), 16) + 587 * parseInt(t.substr(2, 2), 16) + 114 * parseInt(t.substr(4, 2), 16)) / 1e3 ? "#000" : "#fff"
        },
        getLuminance: function(t) {
          var e = parseInt(this.normaliseHex(t), 16),
            n = 38 + (e >> 16),
            i = 38 + (e >> 8 & 255),
            r = 38 + (255 & e);
          return "#" + (16777216 + 65536 * (n < 255 ? n < 1 ? 0 : n : 255) + 256 * (i < 255 ? i < 1 ? 0 : i : 255) + (r < 255 ? r < 1 ? 0 : r : 255)).toString(16).slice(1)
        },
        isMobile: function() {
          return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        },
        isPlainObject: function(t) {
          return "object" == typeof t && null !== t && t.constructor == Object
        }
      };
      p.status = {
        deny: "deny",
        allow: "allow",
        dismiss: "dismiss"
      }, p.transitionEnd = function() {
        var t = document.createElement("div"),
          e = {
            t: "transitionend",
            OT: "oTransitionEnd",
            msT: "MSTransitionEnd",
            MozT: "transitionend",
            WebkitT: "webkitTransitionEnd"
          };
        for (var n in e)
          if (e.hasOwnProperty(n) && void 0 !== t.style[n + "ransition"])
            return e[n];
        return ""
      }(), p.hasTransition = !!p.transitionEnd;
      var u = Object.keys(p.status).map(h.escapeRegExp);
      p.customStyles = {}, p.Popup = function() {
        function t() {
          this.initialise.apply(this, arguments)
        }
        function n(t) {
          this.openingTimeout = null, h.removeClass(t, "cc-invisible")
        }
        function i(t) {
          t.style.display = "none", t.removeEventListener(p.transitionEnd, this.afterTransition), this.afterTransition = null
        }
        function r() {
          var t = this.options.position.split("-"),
            e = [];
          return t.forEach(function(t) {
            e.push("cc-" + t)
          }), e
        }
        function o() {
          var t = this.options,
            e = "top" == t.position || "bottom" == t.position ? "banner" : "floating";
          h.isMobile() && (e = "floating");
          var n = ["cc-" + e, "cc-type-" + t.type, "cc-theme-" + t.theme];
          return t.static && n.push("cc-static"), n.push.apply(n, r.call(this)), function(t) {
            var e = h.hash(JSON.stringify(t)),
              n = "cc-color-override-" + e,
              i = h.isPlainObject(t);
            return this.customStyleSelector = i ? n : null, i && function(t, e, n) {
              if (p.customStyles[t])
                return ++p.customStyles[t].references;
              var i = {},
                r = e.popup,
                o = e.button,
                s = e.highlight;
              r && (r.text = r.text ? r.text : h.getContrast(r.background), r.link = r.link ? r.link : r.text, i[n + ".cc-window"] = ["color: " + r.text, "background-color: " + r.background], i[n + ".cc-revoke"] = ["color: " + r.text, "background-color: " + r.background], i[n + " .cc-link," + n + " .cc-link:active," + n + " .cc-link:visited"] = ["color: " + r.link], o && (o.text = o.text ? o.text : h.getContrast(o.background), o.border = o.border ? o.border : "transparent", i[n + " .cc-btn"] = ["color: " + o.text, "border-color: " + o.border, "background-color: " + o.background], "transparent" != o.background && (i[n + " .cc-btn:hover, " + n + " .cc-btn:focus"] = ["background-color: " + (a = o.background, "000000" == (a = h.normaliseHex(a)) ? "#222" : h.getLuminance(a))]), s ? (s.text = s.text ? s.text : h.getContrast(s.background), s.border = s.border ? s.border : "transparent", i[n + " .cc-highlight .cc-btn:first-child"] = ["color: " + s.text, "border-color: " + s.border, "background-color: " + s.background]) : i[n + " .cc-highlight .cc-btn:first-child"] = ["color: " + r.text]));
              var a;
              var l = document.createElement("style");
              document.head.appendChild(l), p.customStyles[t] = {
                references: 1,
                element: l.sheet
              };
              var u = -1;
              for (var c in i)
                i.hasOwnProperty(c) && l.sheet.insertRule(c + "{" + i[c].join(";") + "}", ++u)
            }(e, t, "." + n), i
          }.call(this, this.options.palette), this.customStyleSelector && n.push(this.customStyleSelector), n
        }
        function s(t) {
          var e = this.options,
            n = document.createElement("div"),
            i = e.container && 1 === e.container.nodeType ? e.container : document.body;
          n.innerHTML = t;
          var r = n.children[0];
          return r.style.display = "none", h.hasClass(r, "cc-window") && p.hasTransition && h.addClass(r, "cc-invisible"), this.onButtonClick = function(t) {
            var e = t.target;
            if (h.hasClass(e, "cc-btn")) {
              var n = e.className.match(new RegExp("\\bcc-(" + u.join("|") + ")\\b")),
                i = n && n[1] || !1;
              i && (this.setStatus(i), this.close(!0))
            }
            h.hasClass(e, "cc-close") && (this.setStatus(p.status.dismiss), this.close(!0)), h.hasClass(e, "cc-revoke") && this.revokeChoice()
          }.bind(this), r.addEventListener("click", this.onButtonClick), e.autoAttach && (i.firstChild ? i.insertBefore(r, i.firstChild) : i.appendChild(r)), r
        }
        function a(t, e) {
          for (var n = 0, i = t.length; n < i; ++n) {
            var r = t[n];
            if (r instanceof RegExp && r.test(e) || "string" == typeof r && r.length && r === e)
              return !0
          }
          return !1
        }
        var l = {
          enabled: !0,
          container: null,
          cookie: {
            name: "cookieconsent_status",
            path: "/",
            domain: "",
            expiryDays: 365
          },
          onPopupOpen: function() {},
          onPopupClose: function() {},
          onInitialise: function(t) {},
          onStatusChange: function(t, e) {},
          onRevokeChoice: function() {},
          content: {
            header: "Cookies used on the website!",
            message: "This website uses cookies to ensure you get the best experience on our website.",
            dismiss: "Got it!",
            allow: "Allow cookies",
            deny: "Decline",
            link: "Learn more",
            href: "http://cookiesandyou.com",
            close: "&#x274c;"
          },
          elements: {
            header: '<span class="cc-header">{{header}}</span>&nbsp;',
            message: '<span id="cookieconsent:desc" class="cc-message">{{message}}</span>',
            messagelink: '<span id="cookieconsent:desc" class="cc-message">{{message}} <a aria-label="learn more about cookies" role=button tabindex="0" class="cc-link" href="{{href}}" rel="noopener noreferrer nofollow" target="_blank">{{link}}</a></span>',
            dismiss: '<a aria-label="dismiss cookie message" role=button tabindex="0" class="cc-btn cc-dismiss">{{dismiss}}</a>',
            allow: '<a aria-label="allow cookies" role=button tabindex="0"  class="cc-btn cc-allow">{{allow}}</a>',
            deny: '<a aria-label="deny cookies" role=button tabindex="0" class="cc-btn cc-deny">{{deny}}</a>',
            link: '<a aria-label="learn more about cookies" role=button tabindex="0" class="cc-link" href="{{href}}" target="_blank">{{link}}</a>',
            close: '<span aria-label="dismiss cookie message" role=button tabindex="0" class="cc-close">{{close}}</span>'
          },
          window: '<div role="dialog" aria-live="polite" aria-label="cookieconsent" aria-describedby="cookieconsent:desc" class="cc-window {{classes}}">\x3c!--googleoff: all--\x3e{{children}}\x3c!--googleon: all--\x3e</div>',
          revokeBtn: '<div class="cc-revoke {{classes}}">Cookie Policy</div>',
          compliance: {
            info: '<div class="cc-compliance">{{dismiss}}</div>',
            "opt-in": '<div class="cc-compliance cc-highlight">{{dismiss}}{{allow}}</div>',
            "opt-out": '<div class="cc-compliance cc-highlight">{{deny}}{{dismiss}}</div>'
          },
          type: "info",
          layouts: {
            basic: "{{messagelink}}{{compliance}}",
            "basic-close": "{{messagelink}}{{compliance}}{{close}}",
            "basic-header": "{{header}}{{message}}{{link}}{{compliance}}"
          },
          layout: "basic",
          position: "bottom",
          theme: "block",
          static: !1,
          palette: null,
          revokable: !1,
          animateRevokable: !0,
          showLink: !0,
          dismissOnScroll: !1,
          dismissOnTimeout: !1,
          autoOpen: !0,
          autoAttach: !0,
          whitelistPage: [],
          blacklistPage: [],
          overrideHTML: null
        };
        return t.prototype.initialise = function(t) {
          this.options && this.destroy(), h.deepExtend(this.options = {}, l), h.isPlainObject(t) && h.deepExtend(this.options, t), function() {
            var t = this.options.onInitialise.bind(this);
            if (!window.navigator.cookieEnabled)
              return t(p.status.deny), !0;
            if (window.CookiesOK || window.navigator.CookiesOK)
              return t(p.status.allow), !0;
            var e = Object.keys(p.status),
              n = this.getStatus(),
              i = 0 <= e.indexOf(n);
            return i && t(n), i
          }.call(this) && (this.options.enabled = !1), a(this.options.blacklistPage, location.pathname) && (this.options.enabled = !1), a(this.options.whitelistPage, location.pathname) && (this.options.enabled = !0);
          var e = this.options.window.replace("{{classes}}", o.call(this).join(" ")).replace("{{children}}", function() {
              var e = {},
                n = this.options;
              n.showLink || (n.elements.link = "", n.elements.messagelink = n.elements.message), Object.keys(n.elements).forEach(function(t) {
                e[t] = h.interpolateString(n.elements[t], function(t) {
                  var e = n.content[t];
                  return t && "string" == typeof e && e.length ? e : ""
                })
              });
              var t = n.compliance[n.type];
              t || (t = n.compliance.info), e.compliance = h.interpolateString(t, function(t) {
                return e[t]
              });
              var i = n.layouts[n.layout];
              return i || (i = n.layouts.basic), h.interpolateString(i, function(t) {
                return e[t]
              })
            }.call(this)),
            n = this.options.overrideHTML;
          if ("string" == typeof n && n.length && (e = n), this.options.static) {
            var i = s.call(this, '<div class="cc-grower">' + e + "</div>");
            i.style.display = "", this.element = i.firstChild, this.element.style.display = "none", h.addClass(this.element, "cc-invisible")
          } else
            this.element = s.call(this, e);
          (function() {
            var e = this.setStatus.bind(this),
              t = this.options.dismissOnTimeout;
            "number" == typeof t && 0 <= t && (this.dismissTimeout = window.setTimeout(function() {
              e(p.status.dismiss)
            }, Math.floor(t)));
            var n = this.options.dismissOnScroll;
            if ("number" == typeof n && 0 <= n) {
              var i = function(t) {
                window.pageYOffset > Math.floor(n) && (e(p.status.dismiss), window.removeEventListener("scroll", i), this.onWindowScroll = null)
              };
              this.onWindowScroll = i, window.addEventListener("scroll", i)
            }
          }).call(this), function() {
            if ("info" != this.options.type && (this.options.revokable = !0), h.isMobile() && (this.options.animateRevokable = !1), this.options.revokable) {
              var t = r.call(this);
              this.options.animateRevokable && t.push("cc-animate"), this.customStyleSelector && t.push(this.customStyleSelector);
              var e = this.options.revokeBtn.replace("{{classes}}", t.join(" "));
              this.revokeBtn = s.call(this, e);
              var i = this.revokeBtn;
              if (this.options.animateRevokable) {
                var n = h.throttle(function(t) {
                  var e = !1,
                    n = window.innerHeight - 20;
                  h.hasClass(i, "cc-top") && t.clientY < 20 && (e = !0), h.hasClass(i, "cc-bottom") && t.clientY > n && (e = !0), e ? h.hasClass(i, "cc-active") || h.addClass(i, "cc-active") : h.hasClass(i, "cc-active") && h.removeClass(i, "cc-active")
                }, 200);
                this.onMouseMove = n, window.addEventListener("mousemove", n)
              }
            }
          }.call(this), this.options.autoOpen && this.autoOpen()
        }, t.prototype.destroy = function() {
          this.onButtonClick && this.element && (this.element.removeEventListener("click", this.onButtonClick), this.onButtonClick = null), this.dismissTimeout && (clearTimeout(this.dismissTimeout), this.dismissTimeout = null), this.onWindowScroll && (window.removeEventListener("scroll", this.onWindowScroll), this.onWindowScroll = null), this.onMouseMove && (window.removeEventListener("mousemove", this.onMouseMove), this.onMouseMove = null), this.element && this.element.parentNode && this.element.parentNode.removeChild(this.element), this.element = null, this.revokeBtn && this.revokeBtn.parentNode && this.revokeBtn.parentNode.removeChild(this.revokeBtn), this.revokeBtn = null, function(t) {
            if (h.isPlainObject(t)) {
              var e = h.hash(JSON.stringify(t)),
                n = p.customStyles[e];
              if (n && !--n.references) {
                var i = n.element.ownerNode;
                i && i.parentNode && i.parentNode.removeChild(i), p.customStyles[e] = null
              }
            }
          }(this.options.palette), this.options = null
        }, t.prototype.open = function(t) {
          if (this.element)
            return this.isOpen() || (p.hasTransition ? this.fadeIn() : this.element.style.display = "", this.options.revokable && this.toggleRevokeButton(), this.options.onPopupOpen.call(this)), this
        }, t.prototype.close = function(t) {
          if (this.element)
            return this.isOpen() && (p.hasTransition ? this.fadeOut() : this.element.style.display = "none", t && this.options.revokable && this.toggleRevokeButton(!0), this.options.onPopupClose.call(this)), this
        }, t.prototype.fadeIn = function() {
          var t = this.element;
          if (p.hasTransition && t && (this.afterTransition && i.call(this, t), h.hasClass(t, "cc-invisible"))) {
            if (t.style.display = "", this.options.static) {
              var e = this.element.clientHeight;
              this.element.parentNode.style.maxHeight = e + "px"
            }
            this.openingTimeout = setTimeout(n.bind(this, t), 20)
          }
        }, t.prototype.fadeOut = function() {
          var t = this.element;
          p.hasTransition && t && (this.openingTimeout && (clearTimeout(this.openingTimeout), n.bind(this, t)), h.hasClass(t, "cc-invisible") || (this.options.static && (this.element.parentNode.style.maxHeight = ""), this.afterTransition = i.bind(this, t), t.addEventListener(p.transitionEnd, this.afterTransition), h.addClass(t, "cc-invisible")))
        }, t.prototype.isOpen = function() {
          return this.element && "" == this.element.style.display && (!p.hasTransition || !h.hasClass(this.element, "cc-invisible"))
        }, t.prototype.toggleRevokeButton = function(t) {
          this.revokeBtn && (this.revokeBtn.style.display = t ? "" : "none")
        }, t.prototype.revokeChoice = function(t) {
          this.options.enabled = !0, this.clearStatus(), this.options.onRevokeChoice.call(this), t || this.autoOpen()
        }, t.prototype.hasAnswered = function(t) {
          return 0 <= Object.keys(p.status).indexOf(this.getStatus())
        }, t.prototype.hasConsented = function(t) {
          var e = this.getStatus();
          return e == p.status.allow || e == p.status.dismiss
        }, t.prototype.autoOpen = function(t) {
          !this.hasAnswered() && this.options.enabled && this.open()
        }, t.prototype.setStatus = function(t) {
          var e = this.options.cookie,
            n = h.getCookie(e.name),
            i = 0 <= Object.keys(p.status).indexOf(n);
          0 <= Object.keys(p.status).indexOf(t) ? (h.setCookie(e.name, t, e.expiryDays, e.domain, e.path), this.options.onStatusChange.call(this, t, i)) : this.clearStatus()
        }, t.prototype.getStatus = function() {
          return h.getCookie(this.options.cookie.name)
        }, t.prototype.clearStatus = function() {
          var t = this.options.cookie;
          h.setCookie(t.name, "", -1, t.domain, t.path)
        }, t
      }(), p.Location = function() {
        function t(t) {
          h.deepExtend(this.options = {}, n), h.isPlainObject(t) && h.deepExtend(this.options, t), this.currentServiceIndex = -1
        }
        function e(t, e, n) {
          var i,
            r = document.createElement("script");
          r.type = "text/" + (t.type || "javascript"), r.src = t.src || t, r.async = !1, r.onreadystatechange = r.onload = function() {
            var t = r.readyState;
            clearTimeout(i), e.done || t && !/loaded|complete/.test(t) || (e.done = !0, e(), r.onreadystatechange = r.onload = null)
          }, document.body.appendChild(r), i = setTimeout(function() {
            e.done = !0, e(), r.onreadystatechange = r.onload = null
          }, n)
        }
        function o(t, e, n, i, r) {
          var o = new (window.XMLHttpRequest || window.ActiveXObject)("MSXML2.XMLHTTP.3.0");
          if (o.open(i ? "POST" : "GET", t, 1), o.setRequestHeader("X-Requested-With", "XMLHttpRequest"), o.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), Array.isArray(r))
            for (var s = 0, a = r.length; s < a; ++s) {
              var l = r[s].split(":", 2);
              o.setRequestHeader(l[0].replace(/^\s+|\s+$/g, ""), l[1].replace(/^\s+|\s+$/g, ""))
            }
          "function" == typeof e && (o.onreadystatechange = function() {
            3 < o.readyState && e(o)
          }), o.send(i)
        }
        function i(t) {
          return new Error("Error [" + (t.code || "UNKNOWN") + "]: " + t.error)
        }
        var n = {
          timeout: 5e3,
          services: ["freegeoip", "ipinfo", "maxmind"],
          serviceDefinitions: {
            freegeoip: function() {
              return {
                url: "//freegeoip.net/json/?callback={callback}",
                isScript: !0,
                callback: function(t, e) {
                  try {
                    var n = JSON.parse(e);
                    return n.error ? i(n) : {
                      code: n.country_code
                    }
                  } catch (t) {
                    return i({
                      error: "Invalid response (" + t + ")"
                    })
                  }
                }
              }
            },
            ipinfo: function() {
              return {
                url: "//ipinfo.io",
                headers: ["Accept: application/json"],
                callback: function(t, e) {
                  try {
                    var n = JSON.parse(e);
                    return n.error ? i(n) : {
                      code: n.country
                    }
                  } catch (t) {
                    return i({
                      error: "Invalid response (" + t + ")"
                    })
                  }
                }
              }
            },
            ipinfodb: function(t) {
              return {
                url: "//api.ipinfodb.com/v3/ip-country/?key={api_key}&format=json&callback={callback}",
                isScript: !0,
                callback: function(t, e) {
                  try {
                    var n = JSON.parse(e);
                    return "ERROR" == n.statusCode ? i({
                      error: n.statusMessage
                    }) : {
                      code: n.countryCode
                    }
                  } catch (t) {
                    return i({
                      error: "Invalid response (" + t + ")"
                    })
                  }
                }
              }
            },
            maxmind: function() {
              return {
                url: "//js.maxmind.com/js/apis/geoip2/v2.1/geoip2.js",
                isScript: !0,
                callback: function(e) {
                  return window.geoip2 ? void geoip2.country(function(t) {
                    try {
                      e({
                        code: t.country.iso_code
                      })
                    } catch (t) {
                      e(i(t))
                    }
                  }, function(t) {
                    e(i(t))
                  }) : void e(new Error("Unexpected response format. The downloaded script should have exported `geoip2` to the global scope"))
                }
              }
            }
          }
        };
        return t.prototype.getNextService = function() {
          for (var t; t = this.getServiceByIdx(++this.currentServiceIndex), this.currentServiceIndex < this.options.services.length && !t;)
            ;
          return t
        }, t.prototype.getServiceByIdx = function(t) {
          var e = this.options.services[t];
          if ("function" == typeof e) {
            var n = e();
            return n.name && h.deepExtend(n, this.options.serviceDefinitions[n.name](n)), n
          }
          return "string" == typeof e ? this.options.serviceDefinitions[e]() : h.isPlainObject(e) ? this.options.serviceDefinitions[e.name](e) : null
        }, t.prototype.locate = function(t, e) {
          var n = this.getNextService();
          return n ? (this.callbackComplete = t, this.callbackError = e, void this.runService(n, this.runNextServiceOnError.bind(this))) : void e(new Error("No services to run"))
        }, t.prototype.setupUrl = function(i) {
          var r = this.getCurrentServiceOpts();
          return i.url.replace(/\{(.*?)\}/g, function(t, e) {
            if ("callback" === e) {
              var n = "callback" + Date.now();
              return window[n] = function(t) {
                i.__JSONP_DATA = JSON.stringify(t)
              }, n
            }
            if (e in r.interpolateUrl)
              return r.interpolateUrl[e]
          })
        }, t.prototype.runService = function(n, i) {
          var r = this;
          n && n.url && n.callback && (n.isScript ? e : o)(this.setupUrl(n), function(t) {
            var e = t ? t.responseText : "";
            n.__JSONP_DATA && (e = n.__JSONP_DATA, delete n.__JSONP_DATA), r.runServiceCallback.call(r, i, n, e)
          }, this.options.timeout, n.data, n.headers)
        }, t.prototype.runServiceCallback = function(e, t, n) {
          var i = this,
            r = t.callback(function(t) {
              r || i.onServiceResult.call(i, e, t)
            }, n);
          r && this.onServiceResult.call(this, e, r)
        }, t.prototype.onServiceResult = function(t, e) {
          e instanceof Error || e && e.error ? t.call(this, e, null) : t.call(this, null, e)
        }, t.prototype.runNextServiceOnError = function(t, e) {
          if (t) {
            this.logError(t);
            var n = this.getNextService();
            n ? this.runService(n, this.runNextServiceOnError.bind(this)) : this.completeService.call(this, this.callbackError, new Error("All services failed"))
          } else
            this.completeService.call(this, this.callbackComplete, e)
        }, t.prototype.getCurrentServiceOpts = function() {
          var t = this.options.services[this.currentServiceIndex];
          return "string" == typeof t ? {
            name: t
          } : "function" == typeof t ? t() : h.isPlainObject(t) ? t : {}
        }, t.prototype.completeService = function(t, e) {
          this.currentServiceIndex = -1, t && t(e)
        }, t.prototype.logError = function(t) {
          var e = this.currentServiceIndex,
            n = this.getServiceByIdx(e);
          console.error("The service[" + e + "] (" + n.url + ") responded with the following error", t)
        }, t
      }(), p.Law = function() {
        function t(t) {
          this.initialise.apply(this, arguments)
        }
        var e = {
          regionalLaw: !0,
          hasLaw: ["AT", "BE", "BG", "HR", "CZ", "CY", "DK", "EE", "FI", "FR", "DE", "EL", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "SK", "SI", "ES", "SE", "GB", "UK"],
          revokable: ["HR", "CY", "DK", "EE", "FR", "DE", "LV", "LT", "NL", "PT", "ES"],
          explicitAction: ["HR", "IT", "ES"]
        };
        return t.prototype.initialise = function(t) {
          h.deepExtend(this.options = {}, e), h.isPlainObject(t) && h.deepExtend(this.options, t)
        }, t.prototype.get = function(t) {
          var e = this.options;
          return {
            hasLaw: 0 <= e.hasLaw.indexOf(t),
            revokable: 0 <= e.revokable.indexOf(t),
            explicitAction: 0 <= e.explicitAction.indexOf(t)
          }
        }, t.prototype.applyLaw = function(t, e) {
          var n = this.get(e);
          return n.hasLaw || (t.enabled = !1), this.options.regionalLaw && (n.revokable && (t.revokable = !0), n.explicitAction && (t.dismissOnScroll = !1, t.dismissOnTimeout = !1)), t
        }, t
      }(), p.initialise = function(e, n, i) {
        var r = new p.Law(e.law);
        n || (n = function() {}), i || (i = function() {}), p.getCountryCode(e, function(t) {
          delete e.law, delete e.location, t.code && (e = r.applyLaw(e, t.code)), n(new p.Popup(e))
        }, function(t) {
          delete e.law, delete e.location, i(t, new p.Popup(e))
        })
      }, p.getCountryCode = function(t, e, n) {
        t.law && t.law.countryCode ? e({
          code: t.law.countryCode
        }) : t.location ? new p.Location(t.location).locate(function(t) {
          e(t || {})
        }, n) : e({})
      }, p.utils = h, p.hasInitialised = !0, window.cookieconsent = p
    }
  }(window.cookieconsent || {}), window.addEventListener("load", function() {
  });


}).call(this);
