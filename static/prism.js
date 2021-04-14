/* PrismJS 1.20.0
https://prismjs.com/download.html#themes=prism-okaidia&languages=markup+css+clike+javascript+bash+c+cpp+css-extras+docker+git+graphql+http+hpkp+hsts+java+javadoc+javadoclike+javastacktrace+json+kotlin+latex+markdown+nginx+pug+python+jsx+tsx+regex+sql+typescript+vim+yaml&plugins=line-numbers+autolinker+inline-color+match-braces */
var _self =
    "undefined" != typeof window
      ? window
      : "undefined" != typeof WorkerGlobalScope &&
        self instanceof WorkerGlobalScope
      ? self
      : {},
  Prism = (function(u) {
    var c = /\blang(?:uage)?-([\w-]+)\b/i,
      n = 0,
      C = {
        manual: u.Prism && u.Prism.manual,
        disableWorkerMessageHandler:
          u.Prism && u.Prism.disableWorkerMessageHandler,
        util: {
          encode: function e(n) {
            return n instanceof _
              ? new _(n.type, e(n.content), n.alias)
              : Array.isArray(n)
              ? n.map(e)
              : n
                  .replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/\u00a0/g, " ")
          },
          type: function(e) {
            return Object.prototype.toString.call(e).slice(8, -1)
          },
          objId: function(e) {
            return (
              e.__id || Object.defineProperty(e, "__id", { value: ++n }), e.__id
            )
          },
          clone: function t(e, r) {
            var a,
              n,
              l = C.util.type(e)
            switch (((r = r || {}), l)) {
              case "Object":
                if (((n = C.util.objId(e)), r[n])) return r[n]
                for (var i in ((a = {}), (r[n] = a), e))
                  e.hasOwnProperty(i) && (a[i] = t(e[i], r))
                return a
              case "Array":
                return (
                  (n = C.util.objId(e)),
                  r[n]
                    ? r[n]
                    : ((a = []),
                      (r[n] = a),
                      e.forEach(function(e, n) {
                        a[n] = t(e, r)
                      }),
                      a)
                )
              default:
                return e
            }
          },
          getLanguage: function(e) {
            for (; e && !c.test(e.className); ) e = e.parentElement
            return e
              ? (e.className.match(c) || [, "none"])[1].toLowerCase()
              : "none"
          },
          currentScript: function() {
            if ("undefined" == typeof document) return null
            if ("currentScript" in document) return document.currentScript
            try {
              throw new Error()
            } catch (e) {
              var n = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(e.stack) || [])[1]
              if (n) {
                var t = document.getElementsByTagName("script")
                for (var r in t) if (t[r].src == n) return t[r]
              }
              return null
            }
          },
        },
        languages: {
          extend: function(e, n) {
            var t = C.util.clone(C.languages[e])
            for (var r in n) t[r] = n[r]
            return t
          },
          insertBefore: function(t, e, n, r) {
            var a = (r = r || C.languages)[t],
              l = {}
            for (var i in a)
              if (a.hasOwnProperty(i)) {
                if (i == e)
                  for (var o in n) n.hasOwnProperty(o) && (l[o] = n[o])
                n.hasOwnProperty(i) || (l[i] = a[i])
              }
            var s = r[t]
            return (
              (r[t] = l),
              C.languages.DFS(C.languages, function(e, n) {
                n === s && e != t && (this[e] = l)
              }),
              l
            )
          },
          DFS: function e(n, t, r, a) {
            a = a || {}
            var l = C.util.objId
            for (var i in n)
              if (n.hasOwnProperty(i)) {
                t.call(n, i, n[i], r || i)
                var o = n[i],
                  s = C.util.type(o)
                "Object" !== s || a[l(o)]
                  ? "Array" !== s || a[l(o)] || ((a[l(o)] = !0), e(o, t, i, a))
                  : ((a[l(o)] = !0), e(o, t, null, a))
              }
          },
        },
        plugins: {},
        highlightAll: function(e, n) {
          C.highlightAllUnder(document, e, n)
        },
        highlightAllUnder: function(e, n, t) {
          var r = {
            callback: t,
            container: e,
            selector:
              'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
          }
          C.hooks.run("before-highlightall", r),
            (r.elements = Array.prototype.slice.apply(
              r.container.querySelectorAll(r.selector)
            )),
            C.hooks.run("before-all-elements-highlight", r)
          for (var a, l = 0; (a = r.elements[l++]); )
            C.highlightElement(a, !0 === n, r.callback)
        },
        highlightElement: function(e, n, t) {
          var r = C.util.getLanguage(e),
            a = C.languages[r]
          e.className =
            e.className.replace(c, "").replace(/\s+/g, " ") + " language-" + r
          var l = e.parentNode
          l &&
            "pre" === l.nodeName.toLowerCase() &&
            (l.className =
              l.className.replace(c, "").replace(/\s+/g, " ") +
              " language-" +
              r)
          var i = { element: e, language: r, grammar: a, code: e.textContent }
          function o(e) {
            ;(i.highlightedCode = e),
              C.hooks.run("before-insert", i),
              (i.element.innerHTML = i.highlightedCode),
              C.hooks.run("after-highlight", i),
              C.hooks.run("complete", i),
              t && t.call(i.element)
          }
          if ((C.hooks.run("before-sanity-check", i), !i.code))
            return C.hooks.run("complete", i), void (t && t.call(i.element))
          if ((C.hooks.run("before-highlight", i), i.grammar))
            if (n && u.Worker) {
              var s = new Worker(C.filename)
              ;(s.onmessage = function(e) {
                o(e.data)
              }),
                s.postMessage(
                  JSON.stringify({
                    language: i.language,
                    code: i.code,
                    immediateClose: !0,
                  })
                )
            } else o(C.highlight(i.code, i.grammar, i.language))
          else o(C.util.encode(i.code))
        },
        highlight: function(e, n, t) {
          var r = { code: e, grammar: n, language: t }
          return (
            C.hooks.run("before-tokenize", r),
            (r.tokens = C.tokenize(r.code, r.grammar)),
            C.hooks.run("after-tokenize", r),
            _.stringify(C.util.encode(r.tokens), r.language)
          )
        },
        tokenize: function(e, n) {
          var t = n.rest
          if (t) {
            for (var r in t) n[r] = t[r]
            delete n.rest
          }
          var a = new l()
          return (
            M(a, a.head, e),
            (function e(n, t, r, a, l, i, o) {
              for (var s in r)
                if (r.hasOwnProperty(s) && r[s]) {
                  var u = r[s]
                  u = Array.isArray(u) ? u : [u]
                  for (var c = 0; c < u.length; ++c) {
                    if (o && o == s + "," + c) return
                    var g = u[c],
                      f = g.inside,
                      h = !!g.lookbehind,
                      d = !!g.greedy,
                      v = 0,
                      p = g.alias
                    if (d && !g.pattern.global) {
                      var m = g.pattern.toString().match(/[imsuy]*$/)[0]
                      g.pattern = RegExp(g.pattern.source, m + "g")
                    }
                    g = g.pattern || g
                    for (
                      var y = a.next, k = l;
                      y !== t.tail;
                      k += y.value.length, y = y.next
                    ) {
                      var b = y.value
                      if (t.length > n.length) return
                      if (!(b instanceof _)) {
                        var x = 1
                        if (d && y != t.tail.prev) {
                          g.lastIndex = k
                          var w = g.exec(n)
                          if (!w) break
                          var A = w.index + (h && w[1] ? w[1].length : 0),
                            P = w.index + w[0].length,
                            S = k
                          for (S += y.value.length; S <= A; )
                            (y = y.next), (S += y.value.length)
                          if (
                            ((S -= y.value.length),
                            (k = S),
                            y.value instanceof _)
                          )
                            continue
                          for (
                            var O = y;
                            O !== t.tail &&
                            (S < P ||
                              ("string" == typeof O.value &&
                                !O.prev.value.greedy));
                            O = O.next
                          )
                            x++, (S += O.value.length)
                          x--, (b = n.slice(k, S)), (w.index -= k)
                        } else {
                          g.lastIndex = 0
                          var w = g.exec(b)
                        }
                        if (w) {
                          h && (v = w[1] ? w[1].length : 0)
                          var A = w.index + v,
                            w = w[0].slice(v),
                            P = A + w.length,
                            E = b.slice(0, A),
                            N = b.slice(P),
                            j = y.prev
                          E && ((j = M(t, j, E)), (k += E.length)), W(t, j, x)
                          var L = new _(s, f ? C.tokenize(w, f) : w, p, w, d)
                          if (
                            ((y = M(t, j, L)),
                            N && M(t, y, N),
                            1 < x && e(n, t, r, y.prev, k, !0, s + "," + c),
                            i)
                          )
                            break
                        } else if (i) break
                      }
                    }
                  }
                }
            })(e, a, n, a.head, 0),
            (function(e) {
              var n = [],
                t = e.head.next
              for (; t !== e.tail; ) n.push(t.value), (t = t.next)
              return n
            })(a)
          )
        },
        hooks: {
          all: {},
          add: function(e, n) {
            var t = C.hooks.all
            ;(t[e] = t[e] || []), t[e].push(n)
          },
          run: function(e, n) {
            var t = C.hooks.all[e]
            if (t && t.length) for (var r, a = 0; (r = t[a++]); ) r(n)
          },
        },
        Token: _,
      }
    function _(e, n, t, r, a) {
      ;(this.type = e),
        (this.content = n),
        (this.alias = t),
        (this.length = 0 | (r || "").length),
        (this.greedy = !!a)
    }
    function l() {
      var e = { value: null, prev: null, next: null },
        n = { value: null, prev: e, next: null }
      ;(e.next = n), (this.head = e), (this.tail = n), (this.length = 0)
    }
    function M(e, n, t) {
      var r = n.next,
        a = { value: t, prev: n, next: r }
      return (n.next = a), (r.prev = a), e.length++, a
    }
    function W(e, n, t) {
      for (var r = n.next, a = 0; a < t && r !== e.tail; a++) r = r.next
      ;((n.next = r).prev = n), (e.length -= a)
    }
    if (
      ((u.Prism = C),
      (_.stringify = function n(e, t) {
        if ("string" == typeof e) return e
        if (Array.isArray(e)) {
          var r = ""
          return (
            e.forEach(function(e) {
              r += n(e, t)
            }),
            r
          )
        }
        var a = {
            type: e.type,
            content: n(e.content, t),
            tag: "span",
            classes: ["token", e.type],
            attributes: {},
            language: t,
          },
          l = e.alias
        l &&
          (Array.isArray(l)
            ? Array.prototype.push.apply(a.classes, l)
            : a.classes.push(l)),
          C.hooks.run("wrap", a)
        var i = ""
        for (var o in a.attributes)
          i +=
            " " +
            o +
            '="' +
            (a.attributes[o] || "").replace(/"/g, "&quot;") +
            '"'
        return (
          "<" +
          a.tag +
          ' class="' +
          a.classes.join(" ") +
          '"' +
          i +
          ">" +
          a.content +
          "</" +
          a.tag +
          ">"
        )
      }),
      !u.document)
    )
      return (
        u.addEventListener &&
          (C.disableWorkerMessageHandler ||
            u.addEventListener(
              "message",
              function(e) {
                var n = JSON.parse(e.data),
                  t = n.language,
                  r = n.code,
                  a = n.immediateClose
                u.postMessage(C.highlight(r, C.languages[t], t)), a && u.close()
              },
              !1
            )),
        C
      )
    var e = C.util.currentScript()
    function t() {
      C.manual || C.highlightAll()
    }
    if (
      (e &&
        ((C.filename = e.src),
        e.hasAttribute("data-manual") && (C.manual = !0)),
      !C.manual)
    ) {
      var r = document.readyState
      "loading" === r || ("interactive" === r && e && e.defer)
        ? document.addEventListener("DOMContentLoaded", t)
        : window.requestAnimationFrame
        ? window.requestAnimationFrame(t)
        : window.setTimeout(t, 16)
    }
    return C
  })(_self)
"undefined" != typeof module && module.exports && (module.exports = Prism),
  "undefined" != typeof global && (global.Prism = Prism)
;(Prism.languages.markup = {
  comment: /<!--[\s\S]*?-->/,
  prolog: /<\?[\s\S]+?\?>/,
  doctype: {
    pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
    greedy: !0,
  },
  cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
  tag: {
    pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
    greedy: !0,
    inside: {
      tag: {
        pattern: /^<\/?[^\s>\/]+/,
        inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ },
      },
      "attr-value": {
        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
        inside: {
          punctuation: [/^=/, { pattern: /^(\s*)["']|["']$/, lookbehind: !0 }],
        },
      },
      punctuation: /\/?>/,
      "attr-name": {
        pattern: /[^\s>\/]+/,
        inside: { namespace: /^[^\s>\/:]+:/ },
      },
    },
  },
  entity: /&#?[\da-z]{1,8};/i,
}),
  (Prism.languages.markup.tag.inside["attr-value"].inside.entity =
    Prism.languages.markup.entity),
  Prism.hooks.add("wrap", function(a) {
    "entity" === a.type &&
      (a.attributes.title = a.content.replace(/&amp;/, "&"))
  }),
  Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
    value: function(a, e) {
      var s = {}
      ;(s["language-" + e] = {
        pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
        lookbehind: !0,
        inside: Prism.languages[e],
      }),
        (s.cdata = /^<!\[CDATA\[|\]\]>$/i)
      var n = {
        "included-cdata": { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: s },
      }
      n["language-" + e] = { pattern: /[\s\S]+/, inside: Prism.languages[e] }
      var t = {}
      ;(t[a] = {
        pattern: RegExp(
          "(<__[^]*?>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)".replace(
            /__/g,
            function() {
              return a
            }
          ),
          "i"
        ),
        lookbehind: !0,
        greedy: !0,
        inside: n,
      }),
        Prism.languages.insertBefore("markup", "cdata", t)
    },
  }),
  (Prism.languages.html = Prism.languages.markup),
  (Prism.languages.mathml = Prism.languages.markup),
  (Prism.languages.svg = Prism.languages.markup),
  (Prism.languages.xml = Prism.languages.extend("markup", {})),
  (Prism.languages.ssml = Prism.languages.xml)
!(function(s) {
  var e = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/
  ;(s.languages.css = {
    comment: /\/\*[\s\S]*?\*\//,
    atrule: {
      pattern: /@[\w-]+[\s\S]*?(?:;|(?=\s*\{))/,
      inside: {
        rule: /^@[\w-]+/,
        "selector-function-argument": {
          pattern: /(\bselector\s*\((?!\s*\))\s*)(?:[^()]|\((?:[^()]|\([^()]*\))*\))+?(?=\s*\))/,
          lookbehind: !0,
          alias: "selector",
        },
      },
    },
    url: {
      pattern: RegExp("url\\((?:" + e.source + "|[^\n\r()]*)\\)", "i"),
      greedy: !0,
      inside: { function: /^url/i, punctuation: /^\(|\)$/ },
    },
    selector: RegExp("[^{}\\s](?:[^{};\"']|" + e.source + ")*?(?=\\s*\\{)"),
    string: { pattern: e, greedy: !0 },
    property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
    important: /!important\b/i,
    function: /[-a-z0-9]+(?=\()/i,
    punctuation: /[(){};:,]/,
  }),
    (s.languages.css.atrule.inside.rest = s.languages.css)
  var t = s.languages.markup
  t &&
    (t.tag.addInlined("style", "css"),
    s.languages.insertBefore(
      "inside",
      "attr-value",
      {
        "style-attr": {
          pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
          inside: {
            "attr-name": { pattern: /^\s*style/i, inside: t.tag.inside },
            punctuation: /^\s*=\s*['"]|['"]\s*$/,
            "attr-value": { pattern: /.+/i, inside: s.languages.css },
          },
          alias: "language-css",
        },
      },
      t.tag
    ))
})(Prism)
Prism.languages.clike = {
  comment: [
    { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0 },
    { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
  ],
  string: {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0,
  },
  "class-name": {
    pattern: /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
    lookbehind: !0,
    inside: { punctuation: /[.\\]/ },
  },
  keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
  boolean: /\b(?:true|false)\b/,
  function: /\w+(?=\()/,
  number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
  operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
  punctuation: /[{}[\];(),.:]/,
}
;(Prism.languages.javascript = Prism.languages.extend("clike", {
  "class-name": [
    Prism.languages.clike["class-name"],
    {
      pattern: /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,
      lookbehind: !0,
    },
  ],
  keyword: [
    { pattern: /((?:^|})\s*)(?:catch|finally)\b/, lookbehind: !0 },
    {
      pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
      lookbehind: !0,
    },
  ],
  number: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
  function: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
  operator: /--|\+\+|\*\*=?|=>|&&|\|\||[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?[.?]?|[~:]/,
})),
  (Prism.languages.javascript[
    "class-name"
  ][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/),
  Prism.languages.insertBefore("javascript", "keyword", {
    regex: {
      pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
      lookbehind: !0,
      greedy: !0,
    },
    "function-variable": {
      pattern: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,
      alias: "function",
    },
    parameter: [
      {
        pattern: /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
      {
        pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,
        inside: Prism.languages.javascript,
      },
      {
        pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
      {
        pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
    ],
    constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
  }),
  Prism.languages.insertBefore("javascript", "string", {
    "template-string": {
      pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
      greedy: !0,
      inside: {
        "template-punctuation": { pattern: /^`|`$/, alias: "string" },
        interpolation: {
          pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
          lookbehind: !0,
          inside: {
            "interpolation-punctuation": {
              pattern: /^\${|}$/,
              alias: "punctuation",
            },
            rest: Prism.languages.javascript,
          },
        },
        string: /[\s\S]+/,
      },
    },
  }),
  Prism.languages.markup &&
    Prism.languages.markup.tag.addInlined("script", "javascript"),
  (Prism.languages.js = Prism.languages.javascript)
!(function(e) {
  var t =
      "\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b",
    n = {
      environment: { pattern: RegExp("\\$" + t), alias: "constant" },
      variable: [
        {
          pattern: /\$?\(\([\s\S]+?\)\)/,
          greedy: !0,
          inside: {
            variable: [
              { pattern: /(^\$\(\([\s\S]+)\)\)/, lookbehind: !0 },
              /^\$\(\(/,
            ],
            number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee]-?\d+)?/,
            operator: /--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,
            punctuation: /\(\(?|\)\)?|,|;/,
          },
        },
        {
          pattern: /\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,
          greedy: !0,
          inside: { variable: /^\$\(|^`|\)$|`$/ },
        },
        {
          pattern: /\$\{[^}]+\}/,
          greedy: !0,
          inside: {
            operator: /:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,
            punctuation: /[\[\]]/,
            environment: {
              pattern: RegExp("(\\{)" + t),
              lookbehind: !0,
              alias: "constant",
            },
          },
        },
        /\$(?:\w+|[#?*!@$])/,
      ],
      entity: /\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|x[0-9a-fA-F]{1,2}|u[0-9a-fA-F]{4}|U[0-9a-fA-F]{8})/,
    }
  e.languages.bash = {
    shebang: { pattern: /^#!\s*\/.*/, alias: "important" },
    comment: { pattern: /(^|[^"{\\$])#.*/, lookbehind: !0 },
    "function-name": [
      {
        pattern: /(\bfunction\s+)\w+(?=(?:\s*\(?:\s*\))?\s*\{)/,
        lookbehind: !0,
        alias: "function",
      },
      { pattern: /\b\w+(?=\s*\(\s*\)\s*\{)/, alias: "function" },
    ],
    "for-or-select": {
      pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/,
      alias: "variable",
      lookbehind: !0,
    },
    "assign-left": {
      pattern: /(^|[\s;|&]|[<>]\()\w+(?=\+?=)/,
      inside: {
        environment: {
          pattern: RegExp("(^|[\\s;|&]|[<>]\\()" + t),
          lookbehind: !0,
          alias: "constant",
        },
      },
      alias: "variable",
      lookbehind: !0,
    },
    string: [
      {
        pattern: /((?:^|[^<])<<-?\s*)(\w+?)\s*(?:\r?\n|\r)[\s\S]*?(?:\r?\n|\r)\2/,
        lookbehind: !0,
        greedy: !0,
        inside: n,
      },
      {
        pattern: /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s*(?:\r?\n|\r)[\s\S]*?(?:\r?\n|\r)\3/,
        lookbehind: !0,
        greedy: !0,
      },
      {
        pattern: /(^|[^\\](?:\\\\)*)(["'])(?:\\[\s\S]|\$\([^)]+\)|`[^`]+`|(?!\2)[^\\])*\2/,
        lookbehind: !0,
        greedy: !0,
        inside: n,
      },
    ],
    environment: { pattern: RegExp("\\$?" + t), alias: "constant" },
    variable: n.variable,
    function: {
      pattern: /(^|[\s;|&]|[<>]\()(?:add|apropos|apt|aptitude|apt-cache|apt-get|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,
      lookbehind: !0,
    },
    keyword: {
      pattern: /(^|[\s;|&]|[<>]\()(?:if|then|else|elif|fi|for|while|in|case|esac|function|select|do|done|until)(?=$|[)\s;|&])/,
      lookbehind: !0,
    },
    builtin: {
      pattern: /(^|[\s;|&]|[<>]\()(?:\.|:|break|cd|continue|eval|exec|exit|export|getopts|hash|pwd|readonly|return|shift|test|times|trap|umask|unset|alias|bind|builtin|caller|command|declare|echo|enable|help|let|local|logout|mapfile|printf|read|readarray|source|type|typeset|ulimit|unalias|set|shopt)(?=$|[)\s;|&])/,
      lookbehind: !0,
      alias: "class-name",
    },
    boolean: {
      pattern: /(^|[\s;|&]|[<>]\()(?:true|false)(?=$|[)\s;|&])/,
      lookbehind: !0,
    },
    "file-descriptor": { pattern: /\B&\d\b/, alias: "important" },
    operator: {
      pattern: /\d?<>|>\||\+=|==?|!=?|=~|<<[<-]?|[&\d]?>>|\d?[<>]&?|&[>&]?|\|[&|]?|<=?|>=?/,
      inside: { "file-descriptor": { pattern: /^\d/, alias: "important" } },
    },
    punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,
    number: { pattern: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/, lookbehind: !0 },
  }
  for (
    var a = [
        "comment",
        "function-name",
        "for-or-select",
        "assign-left",
        "string",
        "environment",
        "function",
        "keyword",
        "builtin",
        "boolean",
        "file-descriptor",
        "operator",
        "punctuation",
        "number",
      ],
      r = n.variable[1].inside,
      s = 0;
    s < a.length;
    s++
  )
    r[a[s]] = e.languages.bash[a[s]]
  e.languages.shell = e.languages.bash
})(Prism)
;(Prism.languages.c = Prism.languages.extend("clike", {
  comment: {
    pattern: /\/\/(?:[^\r\n\\]|\\(?:\r\n?|\n|(?![\r\n])))*|\/\*[\s\S]*?(?:\*\/|$)/,
    greedy: !0,
  },
  "class-name": {
    pattern: /(\b(?:enum|struct)\s+(?:__attribute__\s*\(\([\s\S]*?\)\)\s*)?)\w+/,
    lookbehind: !0,
  },
  keyword: /\b(?:__attribute__|_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/,
  function: /[a-z_]\w*(?=\s*\()/i,
  operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/,
  number: /(?:\b0x(?:[\da-f]+\.?[\da-f]*|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?)[ful]*/i,
})),
  Prism.languages.insertBefore("c", "string", {
    macro: {
      pattern: /(^\s*)#\s*[a-z]+(?:[^\r\n\\/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|\\(?:\r\n|[\s\S]))*/im,
      lookbehind: !0,
      greedy: !0,
      alias: "property",
      inside: {
        string: [
          { pattern: /^(#\s*include\s*)<[^>]+>/, lookbehind: !0 },
          Prism.languages.c.string,
        ],
        comment: Prism.languages.c.comment,
        directive: {
          pattern: /^(#\s*)[a-z]+/,
          lookbehind: !0,
          alias: "keyword",
        },
      },
    },
    constant: /\b(?:__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__func__|EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|stdin|stdout|stderr)\b/,
  }),
  delete Prism.languages.c.boolean
;(Prism.languages.cpp = Prism.languages.extend("c", {
  "class-name": {
    pattern: /(\b(?:class|enum|struct)\s+)(?!class|enum|struct)\w+/,
    lookbehind: !0,
  },
  keyword: /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char8_t|char16_t|char32_t|class|compl|concept|const|consteval|constexpr|constinit|const_cast|continue|co_await|co_return|co_yield|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|float|for|friend|goto|if|inline|int|int8_t|int16_t|int32_t|int64_t|uint8_t|uint16_t|uint32_t|uint64_t|long|mutable|namespace|new|noexcept|nullptr|operator|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/,
  number: {
    pattern: /(?:\b0b[01']+|\b0x(?:[\da-f']+\.?[\da-f']*|\.[\da-f']+)(?:p[+-]?[\d']+)?|(?:\b[\d']+\.?[\d']*|\B\.[\d']+)(?:e[+-]?[\d']+)?)[ful]*/i,
    greedy: !0,
  },
  operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/,
  boolean: /\b(?:true|false)\b/,
})),
  Prism.languages.insertBefore("cpp", "string", {
    "raw-string": {
      pattern: /R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/,
      alias: "string",
      greedy: !0,
    },
  })
!(function(e) {
  var a,
    n = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/
  ;(e.languages.css.selector = {
    pattern: e.languages.css.selector,
    inside: (a = {
      "pseudo-element": /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
      "pseudo-class": /:[-\w]+/,
      class: /\.[-:.\w]+/,
      id: /#[-:.\w]+/,
      attribute: {
        pattern: RegExp("\\[(?:[^[\\]\"']|" + n.source + ")*\\]"),
        greedy: !0,
        inside: {
          punctuation: /^\[|\]$/,
          "case-sensitivity": {
            pattern: /(\s)[si]$/i,
            lookbehind: !0,
            alias: "keyword",
          },
          namespace: {
            pattern: /^(\s*)[-*\w\xA0-\uFFFF]*\|(?!=)/,
            lookbehind: !0,
            inside: { punctuation: /\|$/ },
          },
          attribute: { pattern: /^(\s*)[-\w\xA0-\uFFFF]+/, lookbehind: !0 },
          value: [
            n,
            { pattern: /(=\s*)[-\w\xA0-\uFFFF]+(?=\s*$)/, lookbehind: !0 },
          ],
          operator: /[|~*^$]?=/,
        },
      },
      "n-th": [
        {
          pattern: /(\(\s*)[+-]?\d*[\dn](?:\s*[+-]\s*\d+)?(?=\s*\))/,
          lookbehind: !0,
          inside: { number: /[\dn]+/, operator: /[+-]/ },
        },
        { pattern: /(\(\s*)(?:even|odd)(?=\s*\))/i, lookbehind: !0 },
      ],
      punctuation: /[()]/,
    }),
  }),
    (e.languages.css.atrule.inside["selector-function-argument"].inside = a),
    e.languages.insertBefore("css", "property", {
      variable: {
        pattern: /(^|[^-\w\xA0-\uFFFF])--[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*/i,
        lookbehind: !0,
      },
    })
  var r = { pattern: /(\d)(?:%|[a-z]+)/, lookbehind: !0 },
    i = { pattern: /(^|[^\w.-])-?\d*\.?\d+/, lookbehind: !0 }
  e.languages.insertBefore("css", "function", {
    operator: { pattern: /(\s)[+\-*\/](?=\s)/, lookbehind: !0 },
    hexcode: { pattern: /\B#(?:[\da-f]{1,2}){3,4}\b/i, alias: "color" },
    color: [
      /\b(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGr[ae]y|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGr[ae]y|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGr[ae]y|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gr[ae]y|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGr[ae]y|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGr[ae]y|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGr[ae]y|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Transparent|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)\b/i,
      {
        pattern: /\b(?:rgb|hsl)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:rgb|hsl)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B/i,
        inside: {
          unit: r,
          number: i,
          function: /[\w-]+(?=\()/,
          punctuation: /[(),]/,
        },
      },
    ],
    entity: /\\[\da-f]{1,8}/i,
    unit: r,
    number: i,
  })
})(Prism)
;(Prism.languages.docker = {
  keyword: {
    pattern: /(^\s*)(?:ADD|ARG|CMD|COPY|ENTRYPOINT|ENV|EXPOSE|FROM|HEALTHCHECK|LABEL|MAINTAINER|ONBUILD|RUN|SHELL|STOPSIGNAL|USER|VOLUME|WORKDIR)(?=\s)/im,
    lookbehind: !0,
  },
  string: /("|')(?:(?!\1)[^\\\r\n]|\\(?:\r\n|[\s\S]))*\1/,
  comment: /#.*/,
  punctuation: /---|\.\.\.|[:[\]{}\-,|>?]/,
}),
  (Prism.languages.dockerfile = Prism.languages.docker)
Prism.languages.git = {
  comment: /^#.*/m,
  deleted: /^[-–].*/m,
  inserted: /^\+.*/m,
  string: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/m,
  command: { pattern: /^.*\$ git .*$/m, inside: { parameter: /\s--?\w+/m } },
  coord: /^@@.*@@$/m,
  commit_sha1: /^commit \w{40}$/m,
}
Prism.languages.graphql = {
  comment: /#.*/,
  string: { pattern: /"(?:\\.|[^\\"\r\n])*"/, greedy: !0 },
  number: /(?:\B-|\b)\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
  boolean: /\b(?:true|false)\b/,
  variable: /\$[a-z_]\w*/i,
  directive: { pattern: /@[a-z_]\w*/i, alias: "function" },
  "attr-name": {
    pattern: /[a-z_]\w*(?=\s*(?:\((?:[^()"]|"(?:\\.|[^\\"\r\n])*")*\))?:)/i,
    greedy: !0,
  },
  "class-name": {
    pattern: /(\b(?:enum|implements|interface|on|scalar|type|union)\s+)[a-zA-Z_]\w*/,
    lookbehind: !0,
  },
  fragment: {
    pattern: /(\bfragment\s+|\.{3}\s*(?!on\b))[a-zA-Z_]\w*/,
    lookbehind: !0,
    alias: "function",
  },
  keyword: /\b(?:enum|fragment|implements|input|interface|mutation|on|query|scalar|schema|type|union)\b/,
  operator: /[!=|]|\.{3}/,
  punctuation: /[!(){}\[\]:=,]/,
  constant: /\b(?!ID\b)[A-Z][A-Z_\d]*\b/,
}
!(function(t) {
  t.languages.http = {
    "request-line": {
      pattern: /^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\s(?:https?:\/\/|\/)\S+\sHTTP\/[0-9.]+/m,
      inside: {
        property: /^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b/,
        "attr-name": /:\w+/,
      },
    },
    "response-status": {
      pattern: /^HTTP\/1.[01] \d+.*/m,
      inside: {
        property: { pattern: /(^HTTP\/1.[01] )\d+.*/i, lookbehind: !0 },
      },
    },
    "header-name": { pattern: /^[\w-]+:(?=.)/m, alias: "keyword" },
  }
  var a,
    e,
    n,
    i = t.languages,
    p = {
      "application/javascript": i.javascript,
      "application/json": i.json || i.javascript,
      "application/xml": i.xml,
      "text/xml": i.xml,
      "text/html": i.html,
      "text/css": i.css,
    },
    s = { "application/json": !0, "application/xml": !0 }
  for (var r in p)
    if (p[r]) {
      a = a || {}
      var T = s[r]
        ? (void 0,
          (n = (e = r).replace(/^[a-z]+\//, "")),
          "(?:" + e + "|\\w+/(?:[\\w.-]+\\+)+" + n + "(?![+\\w.-]))")
        : r
      a[r.replace(/\//g, "-")] = {
        pattern: RegExp(
          "(content-type:\\s*" + T + "[\\s\\S]*?)(?:\\r?\\n|\\r){2}[\\s\\S]*",
          "i"
        ),
        lookbehind: !0,
        inside: p[r],
      }
    }
  a && t.languages.insertBefore("http", "header-name", a)
})(Prism)
Prism.languages.hpkp = {
  directive: {
    pattern: /\b(?:(?:includeSubDomains|preload|strict)(?: |;)|pin-sha256="[a-zA-Z\d+=/]+"|(?:max-age|report-uri)=|report-to )/,
    alias: "keyword",
  },
  safe: { pattern: /\d{7,}/, alias: "selector" },
  unsafe: { pattern: /\d{1,6}/, alias: "function" },
}
Prism.languages.hsts = {
  directive: {
    pattern: /\b(?:max-age=|includeSubDomains|preload)/,
    alias: "keyword",
  },
  safe: { pattern: /\d{8,}/, alias: "selector" },
  unsafe: { pattern: /\d{1,7}/, alias: "function" },
}
!(function(e) {
  var t = /\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|null|open|opens|package|private|protected|provides|public|record|requires|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\b/,
    a = /\b[A-Z](?:\w*[a-z]\w*)?\b/
  ;(e.languages.java = e.languages.extend("clike", {
    "class-name": [a, /\b[A-Z]\w*(?=\s+\w+\s*[;,=())])/],
    keyword: t,
    function: [
      e.languages.clike.function,
      { pattern: /(\:\:)[a-z_]\w*/, lookbehind: !0 },
    ],
    number: /\b0b[01][01_]*L?\b|\b0x[\da-f_]*\.?[\da-f_p+-]+\b|(?:\b\d[\d_]*\.?[\d_]*|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,
    operator: {
      pattern: /(^|[^.])(?:<<=?|>>>?=?|->|--|\+\+|&&|\|\||::|[?:~]|[-+*/%&|^!=<>]=?)/m,
      lookbehind: !0,
    },
  })),
    e.languages.insertBefore("java", "string", {
      "triple-quoted-string": {
        pattern: /"""[ \t]*[\r\n](?:(?:"|"")?(?:\\.|[^"\\]))*"""/,
        greedy: !0,
        alias: "string",
      },
    }),
    e.languages.insertBefore("java", "class-name", {
      annotation: {
        alias: "punctuation",
        pattern: /(^|[^.])@\w+/,
        lookbehind: !0,
      },
      namespace: {
        pattern: RegExp(
          "(\\b(?:exports|import(?:\\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\\s+)(?!<keyword>)[a-z]\\w*(?:\\.[a-z]\\w*)*\\.?".replace(
            /<keyword>/g,
            function() {
              return t.source
            }
          )
        ),
        lookbehind: !0,
        inside: { punctuation: /\./ },
      },
      generics: {
        pattern: /<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<[\w\s,.&?]*>)*>)*>)*>/,
        inside: {
          "class-name": a,
          keyword: t,
          punctuation: /[<>(),.:]/,
          operator: /[?&|]/,
        },
      },
    })
})(Prism)
!(function(p) {
  var a = (p.languages.javadoclike = {
    parameter: {
      pattern: /(^\s*(?:\/{3}|\*|\/\*\*)\s*@(?:param|arg|arguments)\s+)\w+/m,
      lookbehind: !0,
    },
    keyword: {
      pattern: /(^\s*(?:\/{3}|\*|\/\*\*)\s*|\{)@[a-z][a-zA-Z-]+\b/m,
      lookbehind: !0,
    },
    punctuation: /[{}]/,
  })
  Object.defineProperty(a, "addSupport", {
    value: function(a, e) {
      "string" == typeof a && (a = [a]),
        a.forEach(function(a) {
          !(function(a, e) {
            var n = "doc-comment",
              t = p.languages[a]
            if (t) {
              var r = t[n]
              if (!r) {
                var o = {
                  "doc-comment": {
                    pattern: /(^|[^\\])\/\*\*[^/][\s\S]*?(?:\*\/|$)/,
                    lookbehind: !0,
                    alias: "comment",
                  },
                }
                r = (t = p.languages.insertBefore(a, "comment", o))[n]
              }
              if (
                (r instanceof RegExp && (r = t[n] = { pattern: r }),
                Array.isArray(r))
              )
                for (var i = 0, s = r.length; i < s; i++)
                  r[i] instanceof RegExp && (r[i] = { pattern: r[i] }), e(r[i])
              else e(r)
            }
          })(a, function(a) {
            a.inside || (a.inside = {}), (a.inside.rest = e)
          })
        })
    },
  }),
    a.addSupport(["java", "javascript", "php"], a)
})(Prism)
!(function(a) {
  var e = /(^(?:\s*(?:\*\s*)*)).*[^*\s].*$/m,
    n = "(?:[a-zA-Z]\\w+\\s*\\.\\s*)*[A-Z]\\w*(?:\\s*<mem>)?|<mem>".replace(
      /<mem>/g,
      function() {
        return "#\\s*\\w+(?:\\s*\\([^()]*\\))?"
      }
    )
  ;(a.languages.javadoc = a.languages.extend("javadoclike", {})),
    a.languages.insertBefore("javadoc", "keyword", {
      reference: {
        pattern: RegExp(
          "(@(?:exception|throws|see|link|linkplain|value)\\s+(?:\\*\\s*)?)(?:" +
            n +
            ")"
        ),
        lookbehind: !0,
        inside: {
          function: { pattern: /(#\s*)\w+(?=\s*\()/, lookbehind: !0 },
          field: { pattern: /(#\s*)\w+/, lookbehind: !0 },
          namespace: {
            pattern: /\b(?:[a-z]\w*\s*\.\s*)+/,
            inside: { punctuation: /\./ },
          },
          "class-name": /\b[A-Z]\w*/,
          keyword: a.languages.java.keyword,
          punctuation: /[#()[\],.]/,
        },
      },
      "class-name": {
        pattern: /(@param\s+)<[A-Z]\w*>/,
        lookbehind: !0,
        inside: { punctuation: /[.<>]/ },
      },
      "code-section": [
        {
          pattern: /(\{@code\s+)(?:[^{}]|\{(?:[^{}]|\{(?:[^{}]|\{(?:[^{}]|\{[^{}]*\})*\})*\})*\})+?(?=\s*\})/,
          lookbehind: !0,
          inside: {
            code: {
              pattern: e,
              lookbehind: !0,
              inside: a.languages.java,
              alias: "language-java",
            },
          },
        },
        {
          pattern: /(<(code|pre|tt)>(?!<code>)\s*)[\s\S]+?(?=\s*<\/\2>)/,
          lookbehind: !0,
          inside: {
            line: {
              pattern: e,
              lookbehind: !0,
              inside: {
                tag: a.languages.markup.tag,
                entity: a.languages.markup.entity,
                code: {
                  pattern: /.+/,
                  inside: a.languages.java,
                  alias: "language-java",
                },
              },
            },
          },
        },
      ],
      tag: a.languages.markup.tag,
      entity: a.languages.markup.entity,
    }),
    a.languages.javadoclike.addSupport("java", a.languages.javadoc)
})(Prism)
Prism.languages.javastacktrace = {
  summary: {
    pattern: /^[\t ]*(?:(?:Caused by:|Suppressed:|Exception in thread "[^"]*")[\t ]+)?[\w$.]+(?:\:.*)?$/m,
    inside: {
      keyword: {
        pattern: /^(\s*)(?:(?:Caused by|Suppressed)(?=:)|Exception in thread)/m,
        lookbehind: !0,
      },
      string: { pattern: /^(\s*)"[^"]*"/, lookbehind: !0 },
      exceptions: {
        pattern: /^(:?\s*)[\w$.]+(?=:|$)/,
        lookbehind: !0,
        inside: {
          "class-name": /[\w$]+(?=$|:)/,
          namespace: /[a-z]\w*/,
          punctuation: /[.:]/,
        },
      },
      message: { pattern: /(:\s*)\S.*/, lookbehind: !0, alias: "string" },
      punctuation: /[:]/,
    },
  },
  "stack-frame": {
    pattern: /^[\t ]*at [\w$.]+(?:<init>)?\([^()]*\)/m,
    inside: {
      keyword: { pattern: /^(\s*)at/, lookbehind: !0 },
      source: [
        {
          pattern: /(\()\w+.\w+:\d+(?=\))/,
          lookbehind: !0,
          inside: {
            file: /^\w+\.\w+/,
            punctuation: /:/,
            "line-number": { pattern: /\d+/, alias: "number" },
          },
        },
        {
          pattern: /(\()[^()]*(?=\))/,
          lookbehind: !0,
          inside: { keyword: /^(?:Unknown Source|Native Method)$/ },
        },
      ],
      "class-name": /[\w$]+(?=\.(?:<init>|[\w$]+)\()/,
      function: /(?:<init>|[\w$]+)(?=\()/,
      namespace: /[a-z]\w*/,
      punctuation: /[.()]/,
    },
  },
  more: {
    pattern: /^[\t ]*\.{3} \d+ [a-z]+(?: [a-z]+)*/m,
    inside: {
      punctuation: /\.{3}/,
      number: /\d+/,
      keyword: /\b[a-z]+(?: [a-z]+)*\b/,
    },
  },
}
Prism.languages.json = {
  property: { pattern: /"(?:\\.|[^\\"\r\n])*"(?=\s*:)/, greedy: !0 },
  string: { pattern: /"(?:\\.|[^\\"\r\n])*"(?!\s*:)/, greedy: !0 },
  comment: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
  number: /-?\d+\.?\d*(?:e[+-]?\d+)?/i,
  punctuation: /[{}[\],]/,
  operator: /:/,
  boolean: /\b(?:true|false)\b/,
  null: { pattern: /\bnull\b/, alias: "keyword" },
}
!(function(e) {
  ;(e.languages.kotlin = e.languages.extend("clike", {
    keyword: {
      pattern: /(^|[^.])\b(?:abstract|actual|annotation|as|break|by|catch|class|companion|const|constructor|continue|crossinline|data|do|dynamic|else|enum|expect|external|final|finally|for|fun|get|if|import|in|infix|init|inline|inner|interface|internal|is|lateinit|noinline|null|object|open|operator|out|override|package|private|protected|public|reified|return|sealed|set|super|suspend|tailrec|this|throw|to|try|typealias|val|var|vararg|when|where|while)\b/,
      lookbehind: !0,
    },
    function: [/\w+(?=\s*\()/, { pattern: /(\.)\w+(?=\s*\{)/, lookbehind: !0 }],
    number: /\b(?:0[xX][\da-fA-F]+(?:_[\da-fA-F]+)*|0[bB][01]+(?:_[01]+)*|\d+(?:_\d+)*(?:\.\d+(?:_\d+)*)?(?:[eE][+-]?\d+(?:_\d+)*)?[fFL]?)\b/,
    operator: /\+[+=]?|-[-=>]?|==?=?|!(?:!|==?)?|[\/*%<>]=?|[?:]:?|\.\.|&&|\|\||\b(?:and|inv|or|shl|shr|ushr|xor)\b/,
  })),
    delete e.languages.kotlin["class-name"],
    e.languages.insertBefore("kotlin", "string", {
      "raw-string": { pattern: /("""|''')[\s\S]*?\1/, alias: "string" },
    }),
    e.languages.insertBefore("kotlin", "keyword", {
      annotation: {
        pattern: /\B@(?:\w+:)?(?:[A-Z]\w*|\[[^\]]+\])/,
        alias: "builtin",
      },
    }),
    e.languages.insertBefore("kotlin", "function", {
      label: { pattern: /\w+@|@\w+/, alias: "symbol" },
    })
  var n = [
    {
      pattern: /\$\{[^}]+\}/,
      inside: {
        delimiter: { pattern: /^\$\{|\}$/, alias: "variable" },
        rest: e.languages.kotlin,
      },
    },
    { pattern: /\$\w+/, alias: "variable" },
  ]
  e.languages.kotlin.string.inside = e.languages.kotlin["raw-string"].inside = {
    interpolation: n,
  }
})(Prism)
!(function(a) {
  var e = /\\(?:[^a-z()[\]]|[a-z*]+)/i,
    n = { "equation-command": { pattern: e, alias: "regex" } }
  ;(a.languages.latex = {
    comment: /%.*/m,
    cdata: {
      pattern: /(\\begin\{((?:verbatim|lstlisting)\*?)\})[\s\S]*?(?=\\end\{\2\})/,
      lookbehind: !0,
    },
    equation: [
      {
        pattern: /\$\$(?:\\[\s\S]|[^\\$])+\$\$|\$(?:\\[\s\S]|[^\\$])+\$|\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]/,
        inside: n,
        alias: "string",
      },
      {
        pattern: /(\\begin\{((?:equation|math|eqnarray|align|multline|gather)\*?)\})[\s\S]*?(?=\\end\{\2\})/,
        lookbehind: !0,
        inside: n,
        alias: "string",
      },
    ],
    keyword: {
      pattern: /(\\(?:begin|end|ref|cite|label|usepackage|documentclass)(?:\[[^\]]+\])?\{)[^}]+(?=\})/,
      lookbehind: !0,
    },
    url: { pattern: /(\\url\{)[^}]+(?=\})/, lookbehind: !0 },
    headline: {
      pattern: /(\\(?:part|chapter|section|subsection|frametitle|subsubsection|paragraph|subparagraph|subsubparagraph|subsubsubparagraph)\*?(?:\[[^\]]+\])?\{)[^}]+(?=\}(?:\[[^\]]+\])?)/,
      lookbehind: !0,
      alias: "class-name",
    },
    function: { pattern: e, alias: "selector" },
    punctuation: /[[\]{}&]/,
  }),
    (a.languages.tex = a.languages.latex),
    (a.languages.context = a.languages.latex)
})(Prism)
!(function(d) {
  function n(n, e) {
    return (
      (n = n.replace(/<inner>/g, function() {
        return "(?:\\\\.|[^\\\\\n\r]|(?:\n|\r\n?)(?!\n|\r\n?))"
      })),
      e && (n = n + "|" + n.replace(/_/g, "\\*")),
      RegExp("((?:^|[^\\\\])(?:\\\\{2})*)(?:" + n + ")")
    )
  }
  var e = "(?:\\\\.|``(?:[^`\r\n]|`(?!`))+``|`[^`\r\n]+`|[^\\\\|\r\n`])+",
    t = "\\|?__(?:\\|__)+\\|?(?:(?:\n|\r\n?)|$)".replace(/__/g, function() {
      return e
    }),
    a = "\\|?[ \t]*:?-{3,}:?[ \t]*(?:\\|[ \t]*:?-{3,}:?[ \t]*)+\\|?(?:\n|\r\n?)"
  ;(d.languages.markdown = d.languages.extend("markup", {})),
    d.languages.insertBefore("markdown", "prolog", {
      blockquote: { pattern: /^>(?:[\t ]*>)*/m, alias: "punctuation" },
      table: {
        pattern: RegExp("^" + t + a + "(?:" + t + ")*", "m"),
        inside: {
          "table-data-rows": {
            pattern: RegExp("^(" + t + a + ")(?:" + t + ")*$"),
            lookbehind: !0,
            inside: {
              "table-data": {
                pattern: RegExp(e),
                inside: d.languages.markdown,
              },
              punctuation: /\|/,
            },
          },
          "table-line": {
            pattern: RegExp("^(" + t + ")" + a + "$"),
            lookbehind: !0,
            inside: { punctuation: /\||:?-{3,}:?/ },
          },
          "table-header-row": {
            pattern: RegExp("^" + t + "$"),
            inside: {
              "table-header": {
                pattern: RegExp(e),
                alias: "important",
                inside: d.languages.markdown,
              },
              punctuation: /\|/,
            },
          },
        },
      },
      code: [
        {
          pattern: /((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/,
          lookbehind: !0,
          alias: "keyword",
        },
        { pattern: /``.+?``|`[^`\r\n]+`/, alias: "keyword" },
        {
          pattern: /^```[\s\S]*?^```$/m,
          greedy: !0,
          inside: {
            "code-block": {
              pattern: /^(```.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^```$)/m,
              lookbehind: !0,
            },
            "code-language": { pattern: /^(```).+/, lookbehind: !0 },
            punctuation: /```/,
          },
        },
      ],
      title: [
        {
          pattern: /\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m,
          alias: "important",
          inside: { punctuation: /==+$|--+$/ },
        },
        {
          pattern: /(^\s*)#+.+/m,
          lookbehind: !0,
          alias: "important",
          inside: { punctuation: /^#+|#+$/ },
        },
      ],
      hr: {
        pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,
        lookbehind: !0,
        alias: "punctuation",
      },
      list: {
        pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
        lookbehind: !0,
        alias: "punctuation",
      },
      "url-reference": {
        pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
        inside: {
          variable: { pattern: /^(!?\[)[^\]]+/, lookbehind: !0 },
          string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
          punctuation: /^[\[\]!:]|[<>]/,
        },
        alias: "url",
      },
      bold: {
        pattern: n("__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__", !0),
        lookbehind: !0,
        greedy: !0,
        inside: {
          content: {
            pattern: /(^..)[\s\S]+(?=..$)/,
            lookbehind: !0,
            inside: {},
          },
          punctuation: /\*\*|__/,
        },
      },
      italic: {
        pattern: n("_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_", !0),
        lookbehind: !0,
        greedy: !0,
        inside: {
          content: { pattern: /(^.)[\s\S]+(?=.$)/, lookbehind: !0, inside: {} },
          punctuation: /[*_]/,
        },
      },
      strike: {
        pattern: n("(~~?)(?:(?!~)<inner>)+?\\2", !1),
        lookbehind: !0,
        greedy: !0,
        inside: {
          content: {
            pattern: /(^~~?)[\s\S]+(?=\1$)/,
            lookbehind: !0,
            inside: {},
          },
          punctuation: /~~?/,
        },
      },
      url: {
        pattern: n(
          '!?\\[(?:(?!\\])<inner>)+\\](?:\\([^\\s)]+(?:[\t ]+"(?:\\\\.|[^"\\\\])*")?\\)| ?\\[(?:(?!\\])<inner>)+\\])',
          !1
        ),
        lookbehind: !0,
        greedy: !0,
        inside: {
          variable: { pattern: /(\[)[^\]]+(?=\]$)/, lookbehind: !0 },
          content: {
            pattern: /(^!?\[)[^\]]+(?=\])/,
            lookbehind: !0,
            inside: {},
          },
          string: { pattern: /"(?:\\.|[^"\\])*"(?=\)$)/ },
        },
      },
    }),
    ["url", "bold", "italic", "strike"].forEach(function(e) {
      ;["url", "bold", "italic", "strike"].forEach(function(n) {
        e !== n &&
          (d.languages.markdown[e].inside.content.inside[n] =
            d.languages.markdown[n])
      })
    }),
    d.hooks.add("after-tokenize", function(n) {
      ;("markdown" !== n.language && "md" !== n.language) ||
        !(function n(e) {
          if (e && "string" != typeof e)
            for (var t = 0, a = e.length; t < a; t++) {
              var i = e[t]
              if ("code" === i.type) {
                var r = i.content[1],
                  o = i.content[3]
                if (
                  r &&
                  o &&
                  "code-language" === r.type &&
                  "code-block" === o.type &&
                  "string" == typeof r.content
                ) {
                  var l = r.content
                      .replace(/\b#/g, "sharp")
                      .replace(/\b\+\+/g, "pp"),
                    s =
                      "language-" +
                      (l = (/[a-z][\w-]*/i.exec(l) || [""])[0].toLowerCase())
                  o.alias
                    ? "string" == typeof o.alias
                      ? (o.alias = [o.alias, s])
                      : o.alias.push(s)
                    : (o.alias = [s])
                }
              } else n(i.content)
            }
        })(n.tokens)
    }),
    d.hooks.add("wrap", function(n) {
      if ("code-block" === n.type) {
        for (var e = "", t = 0, a = n.classes.length; t < a; t++) {
          var i = n.classes[t],
            r = /language-(.+)/.exec(i)
          if (r) {
            e = r[1]
            break
          }
        }
        var o = d.languages[e]
        if (o) {
          var l = n.content.replace(/&lt;/g, "<").replace(/&amp;/g, "&")
          n.content = d.highlight(l, o, e)
        } else if (e && "none" !== e && d.plugins.autoloader) {
          var s =
            "md-" +
            new Date().valueOf() +
            "-" +
            Math.floor(1e16 * Math.random())
          ;(n.attributes.id = s),
            d.plugins.autoloader.loadLanguages(e, function() {
              var n = document.getElementById(s)
              n && (n.innerHTML = d.highlight(n.textContent, d.languages[e], e))
            })
        }
      }
    }),
    (d.languages.md = d.languages.markdown)
})(Prism)
;(Prism.languages.nginx = Prism.languages.extend("clike", {
  comment: { pattern: /(^|[^"{\\])#.*/, lookbehind: !0 },
  keyword: /\b(?:CONTENT_|DOCUMENT_|GATEWAY_|HTTP_|HTTPS|if_not_empty|PATH_|QUERY_|REDIRECT_|REMOTE_|REQUEST_|SCGI|SCRIPT_|SERVER_|http|events|accept_mutex|accept_mutex_delay|access_log|add_after_body|add_before_body|add_header|addition_types|aio|alias|allow|ancient_browser|ancient_browser_value|auth|auth_basic|auth_basic_user_file|auth_http|auth_http_header|auth_http_timeout|autoindex|autoindex_exact_size|autoindex_localtime|break|charset|charset_map|charset_types|chunked_transfer_encoding|client_body_buffer_size|client_body_in_file_only|client_body_in_single_buffer|client_body_temp_path|client_body_timeout|client_header_buffer_size|client_header_timeout|client_max_body_size|connection_pool_size|create_full_put_path|daemon|dav_access|dav_methods|debug_connection|debug_points|default_type|deny|devpoll_changes|devpoll_events|directio|directio_alignment|disable_symlinks|empty_gif|env|epoll_events|error_log|error_page|expires|fastcgi_buffer_size|fastcgi_buffers|fastcgi_busy_buffers_size|fastcgi_cache|fastcgi_cache_bypass|fastcgi_cache_key|fastcgi_cache_lock|fastcgi_cache_lock_timeout|fastcgi_cache_methods|fastcgi_cache_min_uses|fastcgi_cache_path|fastcgi_cache_purge|fastcgi_cache_use_stale|fastcgi_cache_valid|fastcgi_connect_timeout|fastcgi_hide_header|fastcgi_ignore_client_abort|fastcgi_ignore_headers|fastcgi_index|fastcgi_intercept_errors|fastcgi_keep_conn|fastcgi_max_temp_file_size|fastcgi_next_upstream|fastcgi_no_cache|fastcgi_param|fastcgi_pass|fastcgi_pass_header|fastcgi_read_timeout|fastcgi_redirect_errors|fastcgi_send_timeout|fastcgi_split_path_info|fastcgi_store|fastcgi_store_access|fastcgi_temp_file_write_size|fastcgi_temp_path|flv|geo|geoip_city|geoip_country|google_perftools_profiles|gzip|gzip_buffers|gzip_comp_level|gzip_disable|gzip_http_version|gzip_min_length|gzip_proxied|gzip_static|gzip_types|gzip_vary|if|if_modified_since|ignore_invalid_headers|image_filter|image_filter_buffer|image_filter_jpeg_quality|image_filter_sharpen|image_filter_transparency|imap_capabilities|imap_client_buffer|include|index|internal|ip_hash|keepalive|keepalive_disable|keepalive_requests|keepalive_timeout|kqueue_changes|kqueue_events|large_client_header_buffers|limit_conn|limit_conn_log_level|limit_conn_zone|limit_except|limit_rate|limit_rate_after|limit_req|limit_req_log_level|limit_req_zone|limit_zone|lingering_close|lingering_time|lingering_timeout|listen|location|lock_file|log_format|log_format_combined|log_not_found|log_subrequest|map|map_hash_bucket_size|map_hash_max_size|master_process|max_ranges|memcached_buffer_size|memcached_connect_timeout|memcached_next_upstream|memcached_pass|memcached_read_timeout|memcached_send_timeout|merge_slashes|min_delete_depth|modern_browser|modern_browser_value|mp4|mp4_buffer_size|mp4_max_buffer_size|msie_padding|msie_refresh|multi_accept|open_file_cache|open_file_cache_errors|open_file_cache_min_uses|open_file_cache_valid|open_log_file_cache|optimize_server_names|override_charset|pcre_jit|perl|perl_modules|perl_require|perl_set|pid|pop3_auth|pop3_capabilities|port_in_redirect|post_action|postpone_output|protocol|proxy|proxy_buffer|proxy_buffer_size|proxy_buffering|proxy_buffers|proxy_busy_buffers_size|proxy_cache|proxy_cache_bypass|proxy_cache_key|proxy_cache_lock|proxy_cache_lock_timeout|proxy_cache_methods|proxy_cache_min_uses|proxy_cache_path|proxy_cache_use_stale|proxy_cache_valid|proxy_connect_timeout|proxy_cookie_domain|proxy_cookie_path|proxy_headers_hash_bucket_size|proxy_headers_hash_max_size|proxy_hide_header|proxy_http_version|proxy_ignore_client_abort|proxy_ignore_headers|proxy_intercept_errors|proxy_max_temp_file_size|proxy_method|proxy_next_upstream|proxy_no_cache|proxy_pass|proxy_pass_error_message|proxy_pass_header|proxy_pass_request_body|proxy_pass_request_headers|proxy_read_timeout|proxy_redirect|proxy_redirect_errors|proxy_send_lowat|proxy_send_timeout|proxy_set_body|proxy_set_header|proxy_ssl_session_reuse|proxy_store|proxy_store_access|proxy_temp_file_write_size|proxy_temp_path|proxy_timeout|proxy_upstream_fail_timeout|proxy_upstream_max_fails|random_index|read_ahead|real_ip_header|recursive_error_pages|request_pool_size|reset_timedout_connection|resolver|resolver_timeout|return|rewrite|root|rtsig_overflow_events|rtsig_overflow_test|rtsig_overflow_threshold|rtsig_signo|satisfy|satisfy_any|secure_link_secret|send_lowat|send_timeout|sendfile|sendfile_max_chunk|server|server_name|server_name_in_redirect|server_names_hash_bucket_size|server_names_hash_max_size|server_tokens|set|set_real_ip_from|smtp_auth|smtp_capabilities|so_keepalive|source_charset|split_clients|ssi|ssi_silent_errors|ssi_types|ssi_value_length|ssl|ssl_certificate|ssl_certificate_key|ssl_ciphers|ssl_client_certificate|ssl_crl|ssl_dhparam|ssl_engine|ssl_prefer_server_ciphers|ssl_protocols|ssl_session_cache|ssl_session_timeout|ssl_verify_client|ssl_verify_depth|starttls|stub_status|sub_filter|sub_filter_once|sub_filter_types|tcp_nodelay|tcp_nopush|timeout|timer_resolution|try_files|types|types_hash_bucket_size|types_hash_max_size|underscores_in_headers|uninitialized_variable_warn|upstream|use|user|userid|userid_domain|userid_expires|userid_name|userid_p3p|userid_path|userid_service|valid_referers|variables_hash_bucket_size|variables_hash_max_size|worker_connections|worker_cpu_affinity|worker_priority|worker_processes|worker_rlimit_core|worker_rlimit_nofile|worker_rlimit_sigpending|working_directory|xclient|xml_entities|xslt_entities|xslt_stylesheet|xslt_types|ssl_session_tickets|ssl_stapling|ssl_stapling_verify|ssl_ecdh_curve|ssl_trusted_certificate|more_set_headers|ssl_early_data)\b/i,
})),
  Prism.languages.insertBefore("nginx", "keyword", { variable: /\$[a-z_]+/i })
!(function(e) {
  e.languages.pug = {
    comment: {
      pattern: /(^([\t ]*))\/\/.*(?:(?:\r?\n|\r)\2[\t ]+.+)*/m,
      lookbehind: !0,
    },
    "multiline-script": {
      pattern: /(^([\t ]*)script\b.*\.[\t ]*)(?:(?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m,
      lookbehind: !0,
      inside: e.languages.javascript,
    },
    filter: {
      pattern: /(^([\t ]*)):.+(?:(?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m,
      lookbehind: !0,
      inside: { "filter-name": { pattern: /^:[\w-]+/, alias: "variable" } },
    },
    "multiline-plain-text": {
      pattern: /(^([\t ]*)[\w\-#.]+\.[\t ]*)(?:(?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m,
      lookbehind: !0,
    },
    markup: {
      pattern: /(^[\t ]*)<.+/m,
      lookbehind: !0,
      inside: e.languages.markup,
    },
    doctype: { pattern: /((?:^|\n)[\t ]*)doctype(?: .+)?/, lookbehind: !0 },
    "flow-control": {
      pattern: /(^[\t ]*)(?:if|unless|else|case|when|default|each|while)\b(?: .+)?/m,
      lookbehind: !0,
      inside: {
        each: {
          pattern: /^each .+? in\b/,
          inside: { keyword: /\b(?:each|in)\b/, punctuation: /,/ },
        },
        branch: {
          pattern: /^(?:if|unless|else|case|when|default|while)\b/,
          alias: "keyword",
        },
        rest: e.languages.javascript,
      },
    },
    keyword: {
      pattern: /(^[\t ]*)(?:block|extends|include|append|prepend)\b.+/m,
      lookbehind: !0,
    },
    mixin: [
      {
        pattern: /(^[\t ]*)mixin .+/m,
        lookbehind: !0,
        inside: {
          keyword: /^mixin/,
          function: /\w+(?=\s*\(|\s*$)/,
          punctuation: /[(),.]/,
        },
      },
      {
        pattern: /(^[\t ]*)\+.+/m,
        lookbehind: !0,
        inside: {
          name: { pattern: /^\+\w+/, alias: "function" },
          rest: e.languages.javascript,
        },
      },
    ],
    script: {
      pattern: /(^[\t ]*script(?:(?:&[^(]+)?\([^)]+\))*[\t ]+).+/m,
      lookbehind: !0,
      inside: e.languages.javascript,
    },
    "plain-text": {
      pattern: /(^[\t ]*(?!-)[\w\-#.]*[\w\-](?:(?:&[^(]+)?\([^)]+\))*\/?[\t ]+).+/m,
      lookbehind: !0,
    },
    tag: {
      pattern: /(^[\t ]*)(?!-)[\w\-#.]*[\w\-](?:(?:&[^(]+)?\([^)]+\))*\/?:?/m,
      lookbehind: !0,
      inside: {
        attributes: [
          { pattern: /&[^(]+\([^)]+\)/, inside: e.languages.javascript },
          {
            pattern: /\([^)]+\)/,
            inside: {
              "attr-value": {
                pattern: /(=\s*)(?:\{[^}]*\}|[^,)\r\n]+)/,
                lookbehind: !0,
                inside: e.languages.javascript,
              },
              "attr-name": /[\w-]+(?=\s*!?=|\s*[,)])/,
              punctuation: /[!=(),]+/,
            },
          },
        ],
        punctuation: /:/,
        "attr-id": /#[\w\-]+/,
        "attr-class": /\.[\w\-]+/,
      },
    },
    code: [
      {
        pattern: /(^[\t ]*(?:-|!?=)).+/m,
        lookbehind: !0,
        inside: e.languages.javascript,
      },
    ],
    punctuation: /[.\-!=|]+/,
  }
  for (
    var t = [
        { filter: "atpl", language: "twig" },
        { filter: "coffee", language: "coffeescript" },
        "ejs",
        "handlebars",
        "less",
        "livescript",
        "markdown",
        { filter: "sass", language: "scss" },
        "stylus",
      ],
      n = {},
      a = 0,
      i = t.length;
    a < i;
    a++
  ) {
    var r = t[a]
    ;(r = "string" == typeof r ? { filter: r, language: r } : r),
      e.languages[r.language] &&
        (n["filter-" + r.filter] = {
          pattern: RegExp(
            "(^([\t ]*)):{{filter_name}}(?:(?:\r?\n|\r(?!\n))(?:\\2[\t ]+.+|\\s*?(?=\r?\n|\r)))+".replace(
              "{{filter_name}}",
              function() {
                return r.filter
              }
            ),
            "m"
          ),
          lookbehind: !0,
          inside: {
            "filter-name": { pattern: /^:[\w-]+/, alias: "variable" },
            rest: e.languages[r.language],
          },
        })
  }
  e.languages.insertBefore("pug", "filter", n)
})(Prism)
;(Prism.languages.python = {
  comment: { pattern: /(^|[^\\])#.*/, lookbehind: !0 },
  "string-interpolation": {
    pattern: /(?:f|rf|fr)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
    greedy: !0,
    inside: {
      interpolation: {
        pattern: /((?:^|[^{])(?:{{)*){(?!{)(?:[^{}]|{(?!{)(?:[^{}]|{(?!{)(?:[^{}])+})+})+}/,
        lookbehind: !0,
        inside: {
          "format-spec": { pattern: /(:)[^:(){}]+(?=}$)/, lookbehind: !0 },
          "conversion-option": {
            pattern: /![sra](?=[:}]$)/,
            alias: "punctuation",
          },
          rest: null,
        },
      },
      string: /[\s\S]+/,
    },
  },
  "triple-quoted-string": {
    pattern: /(?:[rub]|rb|br)?("""|''')[\s\S]*?\1/i,
    greedy: !0,
    alias: "string",
  },
  string: {
    pattern: /(?:[rub]|rb|br)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
    greedy: !0,
  },
  function: {
    pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
    lookbehind: !0,
  },
  "class-name": { pattern: /(\bclass\s+)\w+/i, lookbehind: !0 },
  decorator: {
    pattern: /(^\s*)@\w+(?:\.\w+)*/im,
    lookbehind: !0,
    alias: ["annotation", "punctuation"],
    inside: { punctuation: /\./ },
  },
  keyword: /\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
  builtin: /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
  boolean: /\b(?:True|False|None)\b/,
  number: /(?:\b(?=\d)|\B(?=\.))(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,
  operator: /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
  punctuation: /[{}[\];(),.:]/,
}),
  (Prism.languages.python[
    "string-interpolation"
  ].inside.interpolation.inside.rest = Prism.languages.python),
  (Prism.languages.py = Prism.languages.python)
!(function(i) {
  var t = i.util.clone(i.languages.javascript)
  ;(i.languages.jsx = i.languages.extend("markup", t)),
    (i.languages.jsx.tag.pattern = /<\/?(?:[\w.:-]+\s*(?:\s+(?:[\w.:$-]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s{'">=]+|\{(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])+\}))?|\{\s*\.{3}\s*[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\s*\}))*\s*\/?)?>/i),
    (i.languages.jsx.tag.inside.tag.pattern = /^<\/?[^\s>\/]*/i),
    (i.languages.jsx.tag.inside[
      "attr-value"
    ].pattern = /=(?!\{)(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">]+)/i),
    (i.languages.jsx.tag.inside.tag.inside[
      "class-name"
    ] = /^[A-Z]\w*(?:\.[A-Z]\w*)*$/),
    i.languages.insertBefore(
      "inside",
      "attr-name",
      {
        spread: {
          pattern: /\{\s*\.{3}\s*[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\s*\}/,
          inside: { punctuation: /\.{3}|[{}.]/, "attr-value": /\w+/ },
        },
      },
      i.languages.jsx.tag
    ),
    i.languages.insertBefore(
      "inside",
      "attr-value",
      {
        script: {
          pattern: /=(?:\{(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])+\})/i,
          inside: {
            "script-punctuation": { pattern: /^=(?={)/, alias: "punctuation" },
            rest: i.languages.jsx,
          },
          alias: "language-javascript",
        },
      },
      i.languages.jsx.tag
    )
  var o = function(t) {
      return t
        ? "string" == typeof t
          ? t
          : "string" == typeof t.content
          ? t.content
          : t.content.map(o).join("")
        : ""
    },
    p = function(t) {
      for (var n = [], e = 0; e < t.length; e++) {
        var a = t[e],
          s = !1
        if (
          ("string" != typeof a &&
            ("tag" === a.type && a.content[0] && "tag" === a.content[0].type
              ? "</" === a.content[0].content[0].content
                ? 0 < n.length &&
                  n[n.length - 1].tagName === o(a.content[0].content[1]) &&
                  n.pop()
                : "/>" === a.content[a.content.length - 1].content ||
                  n.push({
                    tagName: o(a.content[0].content[1]),
                    openedBraces: 0,
                  })
              : 0 < n.length && "punctuation" === a.type && "{" === a.content
              ? n[n.length - 1].openedBraces++
              : 0 < n.length &&
                0 < n[n.length - 1].openedBraces &&
                "punctuation" === a.type &&
                "}" === a.content
              ? n[n.length - 1].openedBraces--
              : (s = !0)),
          (s || "string" == typeof a) &&
            0 < n.length &&
            0 === n[n.length - 1].openedBraces)
        ) {
          var g = o(a)
          e < t.length - 1 &&
            ("string" == typeof t[e + 1] || "plain-text" === t[e + 1].type) &&
            ((g += o(t[e + 1])), t.splice(e + 1, 1)),
            0 < e &&
              ("string" == typeof t[e - 1] || "plain-text" === t[e - 1].type) &&
              ((g = o(t[e - 1]) + g), t.splice(e - 1, 1), e--),
            (t[e] = new i.Token("plain-text", g, null, g))
        }
        a.content && "string" != typeof a.content && p(a.content)
      }
    }
  i.hooks.add("after-tokenize", function(t) {
    ;("jsx" !== t.language && "tsx" !== t.language) || p(t.tokens)
  })
})(Prism)
!(function(e) {
  ;(e.languages.typescript = e.languages.extend("javascript", {
    "class-name": {
      pattern: /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
      lookbehind: !0,
      greedy: !0,
      inside: null,
    },
    keyword: /\b(?:abstract|as|asserts|async|await|break|case|catch|class|const|constructor|continue|debugger|declare|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|is|keyof|let|module|namespace|new|null|of|package|private|protected|public|readonly|return|require|set|static|super|switch|this|throw|try|type|typeof|undefined|var|void|while|with|yield)\b/,
    builtin: /\b(?:string|Function|any|number|boolean|Array|symbol|console|Promise|unknown|never)\b/,
  })),
    delete e.languages.typescript.parameter
  var n = e.languages.extend("typescript", {})
  delete n["class-name"],
    (e.languages.typescript["class-name"].inside = n),
    e.languages.insertBefore("typescript", "function", {
      "generic-function": {
        pattern: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,
        greedy: !0,
        inside: {
          function: /^#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*/,
          generic: { pattern: /<[\s\S]+/, alias: "class-name", inside: n },
        },
      },
    }),
    (e.languages.ts = e.languages.typescript)
})(Prism)
var typescript = Prism.util.clone(Prism.languages.typescript)
Prism.languages.tsx = Prism.languages.extend("jsx", typescript)
!(function(n) {
  var a = { pattern: /\\[\\(){}[\]^$+*?|.]/, alias: "escape" },
    e = /\\(?:x[\da-fA-F]{2}|u[\da-fA-F]{4}|u\{[\da-fA-F]+\}|c[a-zA-Z]|0[0-7]{0,2}|[123][0-7]{2}|.)/,
    t = "(?:[^\\\\-]|" + e.source + ")",
    i = RegExp(t + "-" + t),
    r = { pattern: /(<|')[^<>']+(?=[>']$)/, lookbehind: !0, alias: "variable" }
  ;(n.languages.regex = {
    charset: {
      pattern: /((?:^|[^\\])(?:\\\\)*)\[(?:[^\\\]]|\\[\s\S])*\]/,
      lookbehind: !0,
      inside: {
        "charset-negation": {
          pattern: /(^\[)\^/,
          lookbehind: !0,
          alias: "operator",
        },
        "charset-punctuation": { pattern: /^\[|\]$/, alias: "punctuation" },
        range: {
          pattern: i,
          inside: {
            escape: e,
            "range-punctuation": { pattern: /-/, alias: "operator" },
          },
        },
        "special-escape": a,
        charclass: { pattern: /\\[wsd]|\\p{[^{}]+}/i, alias: "class-name" },
        escape: e,
      },
    },
    "special-escape": a,
    charclass: { pattern: /\.|\\[wsd]|\\p{[^{}]+}/i, alias: "class-name" },
    backreference: [
      { pattern: /\\(?![123][0-7]{2})[1-9]/, alias: "keyword" },
      {
        pattern: /\\k<[^<>']+>/,
        alias: "keyword",
        inside: { "group-name": r },
      },
    ],
    anchor: { pattern: /[$^]|\\[ABbGZz]/, alias: "function" },
    escape: e,
    group: [
      {
        pattern: /\((?:\?(?:<[^<>']+>|'[^<>']+'|[>:]|<?[=!]|[idmnsuxU]+(?:-[idmnsuxU]+)?:?))?/,
        alias: "punctuation",
        inside: { "group-name": r },
      },
      { pattern: /\)/, alias: "punctuation" },
    ],
    quantifier: { pattern: /(?:[+*?]|\{(?:\d+,?\d*)\})[?+]?/, alias: "number" },
    alternation: { pattern: /\|/, alias: "keyword" },
  }),
    [
      "actionscript",
      "coffescript",
      "flow",
      "javascript",
      "typescript",
      "vala",
    ].forEach(function(a) {
      var e = n.languages[a]
      e &&
        (e.regex.inside = {
          "language-regex": {
            pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/i,
            lookbehind: !0,
            inside: n.languages.regex,
          },
          "regex-flags": /[a-z]+$/i,
          "regex-delimiter": /^\/|\/$/,
        })
    })
})(Prism)
Prism.languages.sql = {
  comment: {
    pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,
    lookbehind: !0,
  },
  variable: [
    { pattern: /@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/, greedy: !0 },
    /@[\w.$]+/,
  ],
  string: {
    pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/,
    greedy: !0,
    lookbehind: !0,
  },
  function: /\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i,
  keyword: /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURNS?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,
  boolean: /\b(?:TRUE|FALSE|NULL)\b/i,
  number: /\b0x[\da-f]+\b|\b\d+\.?\d*|\B\.\d+\b/i,
  operator: /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|IN|LIKE|NOT|OR|IS|DIV|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
  punctuation: /[;[\]()`,.]/,
}
Prism.languages.vim = {
  string: /"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\r\n]|'')*'/,
  comment: /".*/,
  function: /\w+(?=\()/,
  keyword: /\b(?:ab|abbreviate|abc|abclear|abo|aboveleft|al|all|arga|argadd|argd|argdelete|argdo|arge|argedit|argg|argglobal|argl|arglocal|ar|args|argu|argument|as|ascii|bad|badd|ba|ball|bd|bdelete|be|bel|belowright|bf|bfirst|bl|blast|bm|bmodified|bn|bnext|bN|bNext|bo|botright|bp|bprevious|brea|break|breaka|breakadd|breakd|breakdel|breakl|breaklist|br|brewind|bro|browse|bufdo|b|buffer|buffers|bun|bunload|bw|bwipeout|ca|cabbrev|cabc|cabclear|caddb|caddbuffer|cad|caddexpr|caddf|caddfile|cal|call|cat|catch|cb|cbuffer|cc|ccl|cclose|cd|ce|center|cex|cexpr|cf|cfile|cfir|cfirst|cgetb|cgetbuffer|cgete|cgetexpr|cg|cgetfile|c|change|changes|chd|chdir|che|checkpath|checkt|checktime|cla|clast|cl|clist|clo|close|cmapc|cmapclear|cnew|cnewer|cn|cnext|cN|cNext|cnf|cnfile|cNfcNfile|cnorea|cnoreabbrev|col|colder|colo|colorscheme|comc|comclear|comp|compiler|conf|confirm|con|continue|cope|copen|co|copy|cpf|cpfile|cp|cprevious|cq|cquit|cr|crewind|cuna|cunabbrev|cu|cunmap|cw|cwindow|debugg|debuggreedy|delc|delcommand|d|delete|delf|delfunction|delm|delmarks|diffg|diffget|diffoff|diffpatch|diffpu|diffput|diffsplit|diffthis|diffu|diffupdate|dig|digraphs|di|display|dj|djump|dl|dlist|dr|drop|ds|dsearch|dsp|dsplit|earlier|echoe|echoerr|echom|echomsg|echon|e|edit|el|else|elsei|elseif|em|emenu|endfo|endfor|endf|endfunction|endfun|en|endif|endt|endtry|endw|endwhile|ene|enew|ex|exi|exit|exu|exusage|f|file|files|filetype|fina|finally|fin|find|fini|finish|fir|first|fix|fixdel|fo|fold|foldc|foldclose|folddoc|folddoclosed|foldd|folddoopen|foldo|foldopen|for|fu|fun|function|go|goto|gr|grep|grepa|grepadd|ha|hardcopy|h|help|helpf|helpfind|helpg|helpgrep|helpt|helptags|hid|hide|his|history|ia|iabbrev|iabc|iabclear|if|ij|ijump|il|ilist|imapc|imapclear|in|inorea|inoreabbrev|isearch|isp|isplit|iuna|iunabbrev|iu|iunmap|j|join|ju|jumps|k|keepalt|keepj|keepjumps|kee|keepmarks|laddb|laddbuffer|lad|laddexpr|laddf|laddfile|lan|language|la|last|later|lb|lbuffer|lc|lcd|lch|lchdir|lcl|lclose|let|left|lefta|leftabove|lex|lexpr|lf|lfile|lfir|lfirst|lgetb|lgetbuffer|lgete|lgetexpr|lg|lgetfile|lgr|lgrep|lgrepa|lgrepadd|lh|lhelpgrep|l|list|ll|lla|llast|lli|llist|lmak|lmake|lm|lmap|lmapc|lmapclear|lnew|lnewer|lne|lnext|lN|lNext|lnf|lnfile|lNf|lNfile|ln|lnoremap|lo|loadview|loc|lockmarks|lockv|lockvar|lol|lolder|lop|lopen|lpf|lpfile|lp|lprevious|lr|lrewind|ls|lt|ltag|lu|lunmap|lv|lvimgrep|lvimgrepa|lvimgrepadd|lw|lwindow|mak|make|ma|mark|marks|mat|match|menut|menutranslate|mk|mkexrc|mks|mksession|mksp|mkspell|mkvie|mkview|mkv|mkvimrc|mod|mode|m|move|mzf|mzfile|mz|mzscheme|nbkey|new|n|next|N|Next|nmapc|nmapclear|noh|nohlsearch|norea|noreabbrev|nu|number|nun|nunmap|omapc|omapclear|on|only|o|open|opt|options|ou|ounmap|pc|pclose|ped|pedit|pe|perl|perld|perldo|po|pop|popu|popup|pp|ppop|pre|preserve|prev|previous|p|print|P|Print|profd|profdel|prof|profile|promptf|promptfind|promptr|promptrepl|ps|psearch|pta|ptag|ptf|ptfirst|ptj|ptjump|ptl|ptlast|ptn|ptnext|ptN|ptNext|ptp|ptprevious|ptr|ptrewind|pts|ptselect|pu|put|pw|pwd|pyf|pyfile|py|python|qa|qall|q|quit|quita|quitall|r|read|rec|recover|redi|redir|red|redo|redr|redraw|redraws|redrawstatus|reg|registers|res|resize|ret|retab|retu|return|rew|rewind|ri|right|rightb|rightbelow|rub|ruby|rubyd|rubydo|rubyf|rubyfile|ru|runtime|rv|rviminfo|sal|sall|san|sandbox|sa|sargument|sav|saveas|sba|sball|sbf|sbfirst|sbl|sblast|sbm|sbmodified|sbn|sbnext|sbN|sbNext|sbp|sbprevious|sbr|sbrewind|sb|sbuffer|scripte|scriptencoding|scrip|scriptnames|se|set|setf|setfiletype|setg|setglobal|setl|setlocal|sf|sfind|sfir|sfirst|sh|shell|sign|sil|silent|sim|simalt|sla|slast|sl|sleep|sm|smagic|sm|smap|smapc|smapclear|sme|smenu|sn|snext|sN|sNext|sni|sniff|sno|snomagic|snor|snoremap|snoreme|snoremenu|sor|sort|so|source|spelld|spelldump|spe|spellgood|spelli|spellinfo|spellr|spellrepall|spellu|spellundo|spellw|spellwrong|sp|split|spr|sprevious|sre|srewind|sta|stag|startg|startgreplace|star|startinsert|startr|startreplace|stj|stjump|st|stop|stopi|stopinsert|sts|stselect|sun|sunhide|sunm|sunmap|sus|suspend|sv|sview|syncbind|t|tab|tabc|tabclose|tabd|tabdo|tabe|tabedit|tabf|tabfind|tabfir|tabfirst|tabl|tablast|tabm|tabmove|tabnew|tabn|tabnext|tabN|tabNext|tabo|tabonly|tabp|tabprevious|tabr|tabrewind|tabs|ta|tag|tags|tc|tcl|tcld|tcldo|tclf|tclfile|te|tearoff|tf|tfirst|th|throw|tj|tjump|tl|tlast|tm|tm|tmenu|tn|tnext|tN|tNext|to|topleft|tp|tprevious|tr|trewind|try|ts|tselect|tu|tu|tunmenu|una|unabbreviate|u|undo|undoj|undojoin|undol|undolist|unh|unhide|unlet|unlo|unlockvar|unm|unmap|up|update|verb|verbose|ve|version|vert|vertical|vie|view|vim|vimgrep|vimgrepa|vimgrepadd|vi|visual|viu|viusage|vmapc|vmapclear|vne|vnew|vs|vsplit|vu|vunmap|wa|wall|wh|while|winc|wincmd|windo|winp|winpos|win|winsize|wn|wnext|wN|wNext|wp|wprevious|wq|wqa|wqall|w|write|ws|wsverb|wv|wviminfo|X|xa|xall|x|xit|xm|xmap|xmapc|xmapclear|xme|xmenu|XMLent|XMLns|xn|xnoremap|xnoreme|xnoremenu|xu|xunmap|y|yank)\b/,
  builtin: /\b(?:autocmd|acd|ai|akm|aleph|allowrevins|altkeymap|ambiwidth|ambw|anti|antialias|arab|arabic|arabicshape|ari|arshape|autochdir|autoindent|autoread|autowrite|autowriteall|aw|awa|background|backspace|backup|backupcopy|backupdir|backupext|backupskip|balloondelay|ballooneval|balloonexpr|bdir|bdlay|beval|bex|bexpr|bg|bh|bin|binary|biosk|bioskey|bk|bkc|bomb|breakat|brk|browsedir|bs|bsdir|bsk|bt|bufhidden|buflisted|buftype|casemap|ccv|cdpath|cedit|cfu|ch|charconvert|ci|cin|cindent|cink|cinkeys|cino|cinoptions|cinw|cinwords|clipboard|cmdheight|cmdwinheight|cmp|cms|columns|com|comments|commentstring|compatible|complete|completefunc|completeopt|consk|conskey|copyindent|cot|cpo|cpoptions|cpt|cscopepathcomp|cscopeprg|cscopequickfix|cscopetag|cscopetagorder|cscopeverbose|cspc|csprg|csqf|cst|csto|csverb|cuc|cul|cursorcolumn|cursorline|cwh|debug|deco|def|define|delcombine|dex|dg|dict|dictionary|diff|diffexpr|diffopt|digraph|dip|dir|directory|dy|ea|ead|eadirection|eb|ed|edcompatible|ef|efm|ei|ek|enc|encoding|endofline|eol|ep|equalalways|equalprg|errorbells|errorfile|errorformat|esckeys|et|eventignore|expandtab|exrc|fcl|fcs|fdc|fde|fdi|fdl|fdls|fdm|fdn|fdo|fdt|fen|fenc|fencs|fex|ff|ffs|fileencoding|fileencodings|fileformat|fileformats|fillchars|fk|fkmap|flp|fml|fmr|foldcolumn|foldenable|foldexpr|foldignore|foldlevel|foldlevelstart|foldmarker|foldmethod|foldminlines|foldnestmax|foldtext|formatexpr|formatlistpat|formatoptions|formatprg|fp|fs|fsync|ft|gcr|gd|gdefault|gfm|gfn|gfs|gfw|ghr|gp|grepformat|grepprg|gtl|gtt|guicursor|guifont|guifontset|guifontwide|guiheadroom|guioptions|guipty|guitablabel|guitabtooltip|helpfile|helpheight|helplang|hf|hh|hi|hidden|highlight|hk|hkmap|hkmapp|hkp|hl|hlg|hls|hlsearch|ic|icon|iconstring|ignorecase|im|imactivatekey|imak|imc|imcmdline|imd|imdisable|imi|iminsert|ims|imsearch|inc|include|includeexpr|incsearch|inde|indentexpr|indentkeys|indk|inex|inf|infercase|insertmode|isf|isfname|isi|isident|isk|iskeyword|isprint|joinspaces|js|key|keymap|keymodel|keywordprg|km|kmp|kp|langmap|langmenu|laststatus|lazyredraw|lbr|lcs|linebreak|lines|linespace|lisp|lispwords|listchars|loadplugins|lpl|lsp|lz|macatsui|magic|makeef|makeprg|matchpairs|matchtime|maxcombine|maxfuncdepth|maxmapdepth|maxmem|maxmempattern|maxmemtot|mco|mef|menuitems|mfd|mh|mis|mkspellmem|ml|mls|mm|mmd|mmp|mmt|modeline|modelines|modifiable|modified|more|mouse|mousef|mousefocus|mousehide|mousem|mousemodel|mouses|mouseshape|mouset|mousetime|mp|mps|msm|mzq|mzquantum|nf|nrformats|numberwidth|nuw|odev|oft|ofu|omnifunc|opendevice|operatorfunc|opfunc|osfiletype|pa|para|paragraphs|paste|pastetoggle|patchexpr|patchmode|path|pdev|penc|pex|pexpr|pfn|ph|pheader|pi|pm|pmbcs|pmbfn|popt|preserveindent|previewheight|previewwindow|printdevice|printencoding|printexpr|printfont|printheader|printmbcharset|printmbfont|printoptions|prompt|pt|pumheight|pvh|pvw|qe|quoteescape|readonly|remap|report|restorescreen|revins|rightleft|rightleftcmd|rl|rlc|ro|rs|rtp|ruf|ruler|rulerformat|runtimepath|sbo|sc|scb|scr|scroll|scrollbind|scrolljump|scrolloff|scrollopt|scs|sect|sections|secure|sel|selection|selectmode|sessionoptions|sft|shcf|shellcmdflag|shellpipe|shellquote|shellredir|shellslash|shelltemp|shelltype|shellxquote|shiftround|shiftwidth|shm|shortmess|shortname|showbreak|showcmd|showfulltag|showmatch|showmode|showtabline|shq|si|sidescroll|sidescrolloff|siso|sj|slm|smartcase|smartindent|smarttab|smc|smd|softtabstop|sol|spc|spell|spellcapcheck|spellfile|spelllang|spellsuggest|spf|spl|splitbelow|splitright|sps|sr|srr|ss|ssl|ssop|stal|startofline|statusline|stl|stmp|su|sua|suffixes|suffixesadd|sw|swapfile|swapsync|swb|swf|switchbuf|sws|sxq|syn|synmaxcol|syntax|tabline|tabpagemax|tabstop|tagbsearch|taglength|tagrelative|tagstack|tal|tb|tbi|tbidi|tbis|tbs|tenc|term|termbidi|termencoding|terse|textauto|textmode|textwidth|tgst|thesaurus|tildeop|timeout|timeoutlen|title|titlelen|titleold|titlestring|toolbar|toolbariconsize|top|tpm|tsl|tsr|ttimeout|ttimeoutlen|ttm|tty|ttybuiltin|ttyfast|ttym|ttymouse|ttyscroll|ttytype|tw|tx|uc|ul|undolevels|updatecount|updatetime|ut|vb|vbs|vdir|verbosefile|vfile|viewdir|viewoptions|viminfo|virtualedit|visualbell|vop|wak|warn|wb|wc|wcm|wd|weirdinvert|wfh|wfw|whichwrap|wi|wig|wildchar|wildcharm|wildignore|wildmenu|wildmode|wildoptions|wim|winaltkeys|window|winfixheight|winfixwidth|winheight|winminheight|winminwidth|winwidth|wiv|wiw|wm|wmh|wmnu|wmw|wop|wrap|wrapmargin|wrapscan|writeany|writebackup|writedelay|ww|noacd|noai|noakm|noallowrevins|noaltkeymap|noanti|noantialias|noar|noarab|noarabic|noarabicshape|noari|noarshape|noautochdir|noautoindent|noautoread|noautowrite|noautowriteall|noaw|noawa|nobackup|noballooneval|nobeval|nobin|nobinary|nobiosk|nobioskey|nobk|nobl|nobomb|nobuflisted|nocf|noci|nocin|nocindent|nocompatible|noconfirm|noconsk|noconskey|nocopyindent|nocp|nocscopetag|nocscopeverbose|nocst|nocsverb|nocuc|nocul|nocursorcolumn|nocursorline|nodeco|nodelcombine|nodg|nodiff|nodigraph|nodisable|noea|noeb|noed|noedcompatible|noek|noendofline|noeol|noequalalways|noerrorbells|noesckeys|noet|noex|noexpandtab|noexrc|nofen|nofk|nofkmap|nofoldenable|nogd|nogdefault|noguipty|nohid|nohidden|nohk|nohkmap|nohkmapp|nohkp|nohls|noic|noicon|noignorecase|noim|noimc|noimcmdline|noimd|noincsearch|noinf|noinfercase|noinsertmode|nois|nojoinspaces|nojs|nolazyredraw|nolbr|nolinebreak|nolisp|nolist|noloadplugins|nolpl|nolz|noma|nomacatsui|nomagic|nomh|noml|nomod|nomodeline|nomodifiable|nomodified|nomore|nomousef|nomousefocus|nomousehide|nonu|nonumber|noodev|noopendevice|nopaste|nopi|nopreserveindent|nopreviewwindow|noprompt|nopvw|noreadonly|noremap|norestorescreen|norevins|nori|norightleft|norightleftcmd|norl|norlc|noro|nors|noru|noruler|nosb|nosc|noscb|noscrollbind|noscs|nosecure|nosft|noshellslash|noshelltemp|noshiftround|noshortname|noshowcmd|noshowfulltag|noshowmatch|noshowmode|nosi|nosm|nosmartcase|nosmartindent|nosmarttab|nosmd|nosn|nosol|nospell|nosplitbelow|nosplitright|nospr|nosr|nossl|nosta|nostartofline|nostmp|noswapfile|noswf|nota|notagbsearch|notagrelative|notagstack|notbi|notbidi|notbs|notermbidi|noterse|notextauto|notextmode|notf|notgst|notildeop|notimeout|notitle|noto|notop|notr|nottimeout|nottybuiltin|nottyfast|notx|novb|novisualbell|nowa|nowarn|nowb|noweirdinvert|nowfh|nowfw|nowildmenu|nowinfixheight|nowinfixwidth|nowiv|nowmnu|nowrap|nowrapscan|nowrite|nowriteany|nowritebackup|nows|invacd|invai|invakm|invallowrevins|invaltkeymap|invanti|invantialias|invar|invarab|invarabic|invarabicshape|invari|invarshape|invautochdir|invautoindent|invautoread|invautowrite|invautowriteall|invaw|invawa|invbackup|invballooneval|invbeval|invbin|invbinary|invbiosk|invbioskey|invbk|invbl|invbomb|invbuflisted|invcf|invci|invcin|invcindent|invcompatible|invconfirm|invconsk|invconskey|invcopyindent|invcp|invcscopetag|invcscopeverbose|invcst|invcsverb|invcuc|invcul|invcursorcolumn|invcursorline|invdeco|invdelcombine|invdg|invdiff|invdigraph|invdisable|invea|inveb|inved|invedcompatible|invek|invendofline|inveol|invequalalways|inverrorbells|invesckeys|invet|invex|invexpandtab|invexrc|invfen|invfk|invfkmap|invfoldenable|invgd|invgdefault|invguipty|invhid|invhidden|invhk|invhkmap|invhkmapp|invhkp|invhls|invhlsearch|invic|invicon|invignorecase|invim|invimc|invimcmdline|invimd|invincsearch|invinf|invinfercase|invinsertmode|invis|invjoinspaces|invjs|invlazyredraw|invlbr|invlinebreak|invlisp|invlist|invloadplugins|invlpl|invlz|invma|invmacatsui|invmagic|invmh|invml|invmod|invmodeline|invmodifiable|invmodified|invmore|invmousef|invmousefocus|invmousehide|invnu|invnumber|invodev|invopendevice|invpaste|invpi|invpreserveindent|invpreviewwindow|invprompt|invpvw|invreadonly|invremap|invrestorescreen|invrevins|invri|invrightleft|invrightleftcmd|invrl|invrlc|invro|invrs|invru|invruler|invsb|invsc|invscb|invscrollbind|invscs|invsecure|invsft|invshellslash|invshelltemp|invshiftround|invshortname|invshowcmd|invshowfulltag|invshowmatch|invshowmode|invsi|invsm|invsmartcase|invsmartindent|invsmarttab|invsmd|invsn|invsol|invspell|invsplitbelow|invsplitright|invspr|invsr|invssl|invsta|invstartofline|invstmp|invswapfile|invswf|invta|invtagbsearch|invtagrelative|invtagstack|invtbi|invtbidi|invtbs|invtermbidi|invterse|invtextauto|invtextmode|invtf|invtgst|invtildeop|invtimeout|invtitle|invto|invtop|invtr|invttimeout|invttybuiltin|invttyfast|invtx|invvb|invvisualbell|invwa|invwarn|invwb|invweirdinvert|invwfh|invwfw|invwildmenu|invwinfixheight|invwinfixwidth|invwiv|invwmnu|invwrap|invwrapscan|invwrite|invwriteany|invwritebackup|invws|t_AB|t_AF|t_al|t_AL|t_bc|t_cd|t_ce|t_Ce|t_cl|t_cm|t_Co|t_cs|t_Cs|t_CS|t_CV|t_da|t_db|t_dl|t_DL|t_EI|t_F1|t_F2|t_F3|t_F4|t_F5|t_F6|t_F7|t_F8|t_F9|t_fs|t_IE|t_IS|t_k1|t_K1|t_k2|t_k3|t_K3|t_k4|t_K4|t_k5|t_K5|t_k6|t_K6|t_k7|t_K7|t_k8|t_K8|t_k9|t_K9|t_KA|t_kb|t_kB|t_KB|t_KC|t_kd|t_kD|t_KD|t_ke|t_KE|t_KF|t_KG|t_kh|t_KH|t_kI|t_KI|t_KJ|t_KK|t_kl|t_KL|t_kN|t_kP|t_kr|t_ks|t_ku|t_le|t_mb|t_md|t_me|t_mr|t_ms|t_nd|t_op|t_RI|t_RV|t_Sb|t_se|t_Sf|t_SI|t_so|t_sr|t_te|t_ti|t_ts|t_ue|t_us|t_ut|t_vb|t_ve|t_vi|t_vs|t_WP|t_WS|t_xs|t_ZH|t_ZR)\b/,
  number: /\b(?:0x[\da-f]+|\d+(?:\.\d+)?)\b/i,
  operator: /\|\||&&|[-+.]=?|[=!](?:[=~][#?]?)?|[<>]=?[#?]?|[*\/%?]|\b(?:is(?:not)?)\b/,
  punctuation: /[{}[\](),;:]/,
}
!(function(n) {
  var t = /[*&][^\s[\]{},]+/,
    e = /!(?:<[\w\-%#;/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\-%#;/?:@&=+$.~*'()]+)?/,
    r =
      "(?:" +
      e.source +
      "(?:[ \t]+" +
      t.source +
      ")?|" +
      t.source +
      "(?:[ \t]+" +
      e.source +
      ")?)"
  function a(n, t) {
    t = (t || "").replace(/m/g, "") + "m"
    var e = "([:\\-,[{]\\s*(?:\\s<<prop>>[ \t]+)?)(?:<<value>>)(?=[ \t]*(?:$|,|]|}|\\s*#))"
      .replace(/<<prop>>/g, function() {
        return r
      })
      .replace(/<<value>>/g, function() {
        return n
      })
    return RegExp(e, t)
  }
  ;(n.languages.yaml = {
    scalar: {
      pattern: RegExp(
        "([\\-:]\\s*(?:\\s<<prop>>[ \t]+)?[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)[^\r\n]+(?:\\2[^\r\n]+)*)".replace(
          /<<prop>>/g,
          function() {
            return r
          }
        )
      ),
      lookbehind: !0,
      alias: "string",
    },
    comment: /#.*/,
    key: {
      pattern: RegExp(
        "((?:^|[:\\-,[{\r\n?])[ \t]*(?:<<prop>>[ \t]+)?)[^\r\n{[\\]},#\\s]+?(?=\\s*:\\s)".replace(
          /<<prop>>/g,
          function() {
            return r
          }
        )
      ),
      lookbehind: !0,
      alias: "atrule",
    },
    directive: { pattern: /(^[ \t]*)%.+/m, lookbehind: !0, alias: "important" },
    datetime: {
      pattern: a(
        "\\d{4}-\\d\\d?-\\d\\d?(?:[tT]|[ \t]+)\\d\\d?:\\d{2}:\\d{2}(?:\\.\\d*)?[ \t]*(?:Z|[-+]\\d\\d?(?::\\d{2})?)?|\\d{4}-\\d{2}-\\d{2}|\\d\\d?:\\d{2}(?::\\d{2}(?:\\.\\d*)?)?"
      ),
      lookbehind: !0,
      alias: "number",
    },
    boolean: {
      pattern: a("true|false", "i"),
      lookbehind: !0,
      alias: "important",
    },
    null: { pattern: a("null|~", "i"), lookbehind: !0, alias: "important" },
    string: {
      pattern: a("(\"|')(?:(?!\\2)[^\\\\\r\n]|\\\\.)*\\2"),
      lookbehind: !0,
      greedy: !0,
    },
    number: {
      pattern: a(
        "[+-]?(?:0x[\\da-f]+|0o[0-7]+|(?:\\d+\\.?\\d*|\\.?\\d+)(?:e[+-]?\\d+)?|\\.inf|\\.nan)",
        "i"
      ),
      lookbehind: !0,
    },
    tag: e,
    important: t,
    punctuation: /---|[:[\]{}\-,|>?]|\.\.\./,
  }),
    (n.languages.yml = n.languages.yaml)
})(Prism)
!(function() {
  if ("undefined" != typeof self && self.Prism && self.document) {
    var l = "line-numbers",
      c = /\n(?!$)/g,
      m = function(e) {
        var t = a(e)["white-space"]
        if ("pre-wrap" === t || "pre-line" === t) {
          var n = e.querySelector("code"),
            r = e.querySelector(".line-numbers-rows")
          if (!n || !r) return
          var s = e.querySelector(".line-numbers-sizer"),
            i = n.textContent.split(c)
          s ||
            (((s = document.createElement("span")).className =
              "line-numbers-sizer"),
            n.appendChild(s)),
            (s.style.display = "block"),
            i.forEach(function(e, t) {
              s.textContent = e || "\n"
              var n = s.getBoundingClientRect().height
              r.children[t].style.height = n + "px"
            }),
            (s.textContent = ""),
            (s.style.display = "none")
        }
      },
      a = function(e) {
        return e
          ? window.getComputedStyle
            ? getComputedStyle(e)
            : e.currentStyle || null
          : null
      }
    window.addEventListener("resize", function() {
      Array.prototype.forEach.call(document.querySelectorAll("pre." + l), m)
    }),
      Prism.hooks.add("complete", function(e) {
        if (e.code) {
          var t = e.element,
            n = t.parentNode
          if (
            n &&
            /pre/i.test(n.nodeName) &&
            !t.querySelector(".line-numbers-rows")
          ) {
            for (
              var r = !1, s = /(?:^|\s)line-numbers(?:\s|$)/, i = t;
              i;
              i = i.parentNode
            )
              if (s.test(i.className)) {
                r = !0
                break
              }
            if (r) {
              ;(t.className = t.className.replace(s, " ")),
                s.test(n.className) || (n.className += " line-numbers")
              var l,
                a = e.code.match(c),
                o = a ? a.length + 1 : 1,
                u = new Array(o + 1).join("<span></span>")
              ;(l = document.createElement("span")).setAttribute(
                "aria-hidden",
                "true"
              ),
                (l.className = "line-numbers-rows"),
                (l.innerHTML = u),
                n.hasAttribute("data-start") &&
                  (n.style.counterReset =
                    "linenumber " +
                    (parseInt(n.getAttribute("data-start"), 10) - 1)),
                e.element.appendChild(l),
                m(n),
                Prism.hooks.run("line-numbers", e)
            }
          }
        }
      }),
      Prism.hooks.add("line-numbers", function(e) {
        ;(e.plugins = e.plugins || {}), (e.plugins.lineNumbers = !0)
      }),
      (Prism.plugins.lineNumbers = {
        getLine: function(e, t) {
          if ("PRE" === e.tagName && e.classList.contains(l)) {
            var n = e.querySelector(".line-numbers-rows"),
              r = parseInt(e.getAttribute("data-start"), 10) || 1,
              s = r + (n.children.length - 1)
            t < r && (t = r), s < t && (t = s)
            var i = t - r
            return n.children[i]
          }
        },
        resize: function(e) {
          m(e)
        },
      })
  }
})()
!(function() {
  if (
    ("undefined" == typeof self || self.Prism) &&
    ("undefined" == typeof global || global.Prism)
  ) {
    var t = /\b([a-z]{3,7}:\/\/|tel:)[\w\-+%~/.:=&@]+(?:\?[\w\-+%~/.:=?&!$'()*,;@]*)?(?:#[\w\-+%~/.:#=?&!$'()*,;@]*)?/,
      r = /\b\S+@[\w.]+[a-z]{2}/,
      a = /\[([^\]]+)]\(([^)]+)\)/,
      l = ["comment", "url", "attr-value", "string"]
    ;(Prism.plugins.autolinker = {
      processGrammar: function(i) {
        i &&
          !i["url-link"] &&
          (Prism.languages.DFS(i, function(i, n, e) {
            ;-1 < l.indexOf(e) &&
              !Array.isArray(n) &&
              (n.pattern || (n = this[i] = { pattern: n }),
              (n.inside = n.inside || {}),
              "comment" == e && (n.inside["md-link"] = a),
              "attr-value" == e
                ? Prism.languages.insertBefore(
                    "inside",
                    "punctuation",
                    { "url-link": t },
                    n
                  )
                : (n.inside["url-link"] = t),
              (n.inside["email-link"] = r))
          }),
          (i["url-link"] = t),
          (i["email-link"] = r))
      },
    }),
      Prism.hooks.add("before-highlight", function(i) {
        Prism.plugins.autolinker.processGrammar(i.grammar)
      }),
      Prism.hooks.add("wrap", function(i) {
        if (/-link$/.test(i.type)) {
          i.tag = "a"
          var n = i.content
          if ("email-link" == i.type && 0 != n.indexOf("mailto:"))
            n = "mailto:" + n
          else if ("md-link" == i.type) {
            var e = i.content.match(a)
            ;(n = e[2]), (i.content = e[1])
          }
          i.attributes.href = n
          try {
            i.content = decodeURIComponent(i.content)
          } catch (i) {}
        }
      })
  }
})()
!(function() {
  if (
    "undefined" != typeof self &&
    "undefined" != typeof Prism &&
    "undefined" != typeof document
  ) {
    var a = /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/g,
      c = /^#?((?:[\da-f]){3,4}|(?:[\da-f]{2}){3,4})$/i,
      f = [
        function(n) {
          var r = c.exec(n)
          if (r) {
            for (
              var o = 6 <= (n = r[1]).length ? 2 : 1,
                e = n.length / o,
                s = 1 == o ? 1 / 15 : 1 / 255,
                t = [],
                i = 0;
              i < e;
              i++
            ) {
              var a = parseInt(n.substr(i * o, o), 16)
              t.push(a * s)
            }
            return (
              3 == e && t.push(1),
              "rgba(" +
                t
                  .slice(0, 3)
                  .map(function(n) {
                    return String(Math.round(255 * n))
                  })
                  .join(",") +
                "," +
                String(Number(t[3].toFixed(3))) +
                ")"
            )
          }
        },
        function(n) {
          var r = new Option().style
          return (r.color = n), r.color ? n : void 0
        },
      ]
    Prism.hooks.add("wrap", function(n) {
      if ("color" === n.type || 0 <= n.classes.indexOf("color")) {
        for (
          var r, o = n.content, e = o.split(a).join(""), s = 0, t = f.length;
          s < t && !r;
          s++
        )
          r = f[s](e)
        if (!r) return
        var i =
          '<span class="inline-color-wrapper"><span class="inline-color" style="background-color:' +
          r +
          ';"></span></span>'
        n.content = i + o
      }
    })
  }
})()
!(function() {
  if ("undefined" != typeof self && self.Prism && self.document) {
    var c = /(?:^|\s)match-braces(?:\s|$)/,
      a = /(?:^|\s)brace-hover(?:\s|$)/,
      l = /(?:^|\s)brace-selected(?:\s|$)/,
      n = /(?:^|\s)no-brace-hover(?:\s|$)/,
      t = /(?:^|\s)no-brace-select(?:\s|$)/,
      u = { "(": ")", "[": "]", "{": "}" },
      f = { "(": "brace-round", "[": "brace-square", "{": "brace-curly" },
      m = 0,
      r = /^(pair-\d+-)(open|close)$/
    Prism.hooks.add("complete", function(e) {
      var a = e.element,
        n = a.parentElement
      if (n && "PRE" == n.tagName) {
        for (var t = [], r = a; r; r = r.parentElement)
          if (c.test(r.className)) {
            t.push("(", "[", "{")
            break
          }
        if (0 != t.length) {
          n.__listenerAdded ||
            (n.addEventListener("mousedown", function() {
              var e = n.querySelector("code")
              Array.prototype.slice
                .call(e.querySelectorAll(".brace-selected"))
                .forEach(function(e) {
                  e.className = e.className.replace(l, " ")
                })
            }),
            Object.defineProperty(n, "__listenerAdded", { value: !0 }))
          var o = Array.prototype.slice.call(
              a.querySelectorAll("span.token.punctuation")
            ),
            i = []
          t.forEach(function(e) {
            for (
              var a = u[e], n = f[e], t = [], r = [], s = 0;
              s < o.length;
              s++
            ) {
              var c = o[s]
              if (0 == c.childElementCount) {
                var l = c.textContent
                l === e
                  ? (i.push({ index: s, open: !0, element: c }),
                    (c.className += " " + n),
                    (c.className += " brace-open"),
                    r.push(s))
                  : l === a &&
                    (i.push({ index: s, open: !1, element: c }),
                    (c.className += " " + n),
                    (c.className += " brace-close"),
                    r.length && t.push([s, r.pop()]))
              }
            }
            t.forEach(function(e) {
              var a = "pair-" + m++ + "-",
                n = o[e[0]],
                t = o[e[1]]
              ;(n.id = a + "open"),
                (t.id = a + "close"),
                [n, t].forEach(function(e) {
                  e.addEventListener("mouseenter", p),
                    e.addEventListener("mouseleave", d),
                    e.addEventListener("click", h)
                })
            })
          })
          var s = 0
          i.sort(function(e, a) {
            return e.index - a.index
          }),
            i.forEach(function(e) {
              e.open
                ? ((e.element.className += " brace-level-" + ((s % 12) + 1)),
                  s++)
                : ((s = Math.max(0, s - 1)),
                  (e.element.className += " brace-level-" + ((s % 12) + 1)))
            })
        }
      }
    })
  }
  function s(e) {
    var a = r.exec(e.id)
    return document.querySelector(
      "#" + a[1] + ("open" == a[2] ? "close" : "open")
    )
  }
  function p() {
    for (var e = this.parentElement; e; e = e.parentElement)
      if (n.test(e.className)) return
    ;[this, s(this)].forEach(function(e) {
      e.className = (e.className.replace(a, " ") + " brace-hover").replace(
        /\s+/g,
        " "
      )
    })
  }
  function d() {
    ;[this, s(this)].forEach(function(e) {
      e.className = e.className.replace(a, " ")
    })
  }
  function h() {
    for (var e = this.parentElement; e; e = e.parentElement)
      if (t.test(e.className)) return
    ;[this, s(this)].forEach(function(e) {
      e.className = (e.className.replace(l, " ") + " brace-selected").replace(
        /\s+/g,
        " "
      )
    })
  }
})()
