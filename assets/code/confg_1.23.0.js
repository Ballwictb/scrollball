var _self =
    "undefined" != typeof window
        ? window
        : "undefined" != typeof WorkerGlobalScope &&
            self instanceof WorkerGlobalScope
            ? self
            : {},
    Prism = (function (o) {
        var u = /\blang(?:uage)?-([\w-]+)\b/i,
            t = 0,
            j = {
                manual: o.Prism && o.Prism.manual,
                disableWorkerMessageHandler:
                    o.Prism && o.Prism.disableWorkerMessageHandler,
                util: {
                    encode: function e(t) {
                        return t instanceof C
                            ? new C(t.type, e(t.content), t.alias)
                            : Array.isArray(t)
                                ? t.map(e)
                                : t
                                    .replace(/&/g, "&amp;")
                                    .replace(/</g, "&lt;")
                                    .replace(/\u00a0/g, " ");
                    },
                    type: function (e) {
                        return Object.prototype.toString.call(e).slice(8, -1);
                    },
                    objId: function (e) {
                        return (
                            e.__id ||
                            Object.defineProperty(e, "__id", {
                                value: ++t,
                            }),
                            e.__id
                        );
                    },
                    clone: function n(e, a) {
                        var r, t;
                        switch (((a = a || {}), j.util.type(e))) {
                            case "Object":
                                if (((t = j.util.objId(e)), a[t])) return a[t];
                                for (var s in ((r = {}), (a[t] = r), e))
                                    e.hasOwnProperty(s) && (r[s] = n(e[s], a));
                                return r;
                            case "Array":
                                return ((t = j.util.objId(e)), a[t])
                                    ? a[t]
                                    : ((r = []),
                                        (a[t] = r),
                                        e.forEach(function (e, t) {
                                            r[t] = n(e, a);
                                        }),
                                        r);
                            default:
                                return e;
                        }
                    },
                    getLanguage: function (e) {
                        for (; e && !u.test(e.className);) e = e.parentElement;
                        return e
                            ? (e.className.match(u) || [
                                ,
                                "none",
                            ])[1].toLowerCase()
                            : "none";
                    },
                    currentScript: function () {
                        if ("undefined" == typeof document) return null;
                        if ("currentScript" in document)
                            return document.currentScript;
                        try {
                            throw new Error();
                        } catch (e) {
                            var t = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(
                                e.stack
                            ) || [])[1];
                            if (t) {
                                var n,
                                    a = document.getElementsByTagName("script");
                                for (n in a) if (a[n].src == t) return a[n];
                            }
                            return null;
                        }
                    },
                    isActive: function (e, t, n) {
                        for (var a = "no-" + t; e;) {
                            var r = e.classList;
                            if (r.contains(t)) return !0;
                            if (r.contains(a)) return !1;
                            e = e.parentElement;
                        }
                        return !!n;
                    },
                },
                languages: {
                    extend: function (e, t) {
                        var n,
                            a = j.util.clone(j.languages[e]);
                        for (n in t) a[n] = t[n];
                        return a;
                    },
                    insertBefore: function (n, e, t, a) {
                        var r,
                            s = (a = a || j.languages)[n],
                            i = {};
                        for (r in s)
                            if (s.hasOwnProperty(r)) {
                                if (r == e)
                                    for (var l in t)
                                        t.hasOwnProperty(l) && (i[l] = t[l]);
                                t.hasOwnProperty(r) || (i[r] = s[r]);
                            }
                        var o = a[n];
                        return (
                            (a[n] = i),
                            j.languages.DFS(j.languages, function (e, t) {
                                t === o && e != n && (this[e] = i);
                            }),
                            i
                        );
                    },
                    DFS: function e(t, n, a, r) {
                        r = r || {};
                        var s,
                            i,
                            l,
                            o = j.util.objId;
                        for (s in t)
                            t.hasOwnProperty(s) &&
                                (n.call(t, s, t[s], a || s),
                                    (i = t[s]),
                                    "Object" !== (l = j.util.type(i)) || r[o(i)]
                                        ? "Array" !== l ||
                                        r[o(i)] ||
                                        ((r[o(i)] = !0), e(i, n, s, r))
                                        : ((r[o(i)] = !0), e(i, n, null, r)));
                    },
                },
                plugins: {},
                highlightAll: function (e, t) {
                    j.highlightAllUnder(document, e, t);
                },
                highlightAllUnder: function (e, t, n) {
                    var a = {
                        callback: n,
                        container: e,
                        selector:
                            'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
                    };
                    j.hooks.run("before-highlightall", a),
                        (a.elements = Array.prototype.slice.apply(
                            a.container.querySelectorAll(a.selector)
                        )),
                        j.hooks.run("before-all-elements-highlight", a);
                    for (var r, s = 0; (r = a.elements[s++]);)
                        j.highlightElement(r, !0 === t, a.callback);
                },
                highlightElement: function (e, t, n) {
                    var a = j.util.getLanguage(e),
                        r = j.languages[a];
                    e.className =
                        e.className.replace(u, "").replace(/\s+/g, " ") +
                        " language-" +
                        a;
                    var s = e.parentElement;
                    s &&
                        "pre" === s.nodeName.toLowerCase() &&
                        (s.className =
                            s.className.replace(u, "").replace(/\s+/g, " ") +
                            " language-" +
                            a);
                    var i = {
                        element: e,
                        language: a,
                        grammar: r,
                        code: e.textContent,
                    };
                    function l(e) {
                        (i.highlightedCode = e),
                            j.hooks.run("before-insert", i),
                            (i.element.innerHTML = i.highlightedCode),
                            j.hooks.run("after-highlight", i),
                            j.hooks.run("complete", i),
                            n && n.call(i.element);
                    }
                    if ((j.hooks.run("before-sanity-check", i), !i.code))
                        return (
                            j.hooks.run("complete", i),
                            void (n && n.call(i.element))
                        );
                    j.hooks.run("before-highlight", i),
                        i.grammar
                            ? t && o.Worker
                                ? (((t = new Worker(j.filename)).onmessage =
                                    function (e) {
                                        l(e.data);
                                    }),
                                    t.postMessage(
                                        JSON.stringify({
                                            language: i.language,
                                            code: i.code,
                                            immediateClose: !0,
                                        })
                                    ))
                                : l(j.highlight(i.code, i.grammar, i.language))
                            : l(j.util.encode(i.code));
                },
                highlight: function (e, t, n) {
                    n = { code: e, grammar: t, language: n };
                    return (
                        j.hooks.run("before-tokenize", n),
                        (n.tokens = j.tokenize(n.code, n.grammar)),
                        j.hooks.run("after-tokenize", n),
                        C.stringify(j.util.encode(n.tokens), n.language)
                    );
                },
                tokenize: function (e, t) {
                    var n = t.rest;
                    if (n) {
                        for (var a in n) t[a] = n[a];
                        delete t.rest;
                    }
                    var r = new s();
                    return (
                        z(r, r.head, e),
                        (function e(t, n, a, r, s, i) {
                            for (var l in a)
                                if (a.hasOwnProperty(l) && a[l]) {
                                    var o = a[l];
                                    o = Array.isArray(o) ? o : [o];
                                    for (var u = 0; u < o.length; ++u) {
                                        if (i && i.cause == l + "," + u) return;
                                        var g,
                                            c = o[u],
                                            d = c.inside,
                                            p = !!c.lookbehind,
                                            m = !!c.greedy,
                                            h = c.alias;
                                        m &&
                                            !c.pattern.global &&
                                            ((g = c.pattern
                                                .toString()
                                                .match(/[imsuy]*$/)[0]),
                                                (c.pattern = RegExp(
                                                    c.pattern.source,
                                                    g + "g"
                                                )));
                                        for (
                                            var f = c.pattern || c,
                                            y = r.next,
                                            b = s;
                                            y !== n.tail &&
                                            !(i && b >= i.reach);
                                            b += y.value.length, y = y.next
                                        ) {
                                            var v = y.value;
                                            if (n.length > t.length) return;
                                            if (!(v instanceof C)) {
                                                var F,
                                                    k = 1;
                                                if (m) {
                                                    if (!(F = O(f, b, t, p)))
                                                        break;
                                                    var x = F.index,
                                                        w =
                                                            F.index +
                                                            F[0].length,
                                                        A = b;
                                                    for (
                                                        A += y.value.length;
                                                        A <= x;

                                                    )
                                                        (y = y.next),
                                                            (A +=
                                                                y.value.length);
                                                    if (
                                                        ((A -= y.value.length),
                                                            (b = A),
                                                            y.value instanceof C)
                                                    )
                                                        continue;
                                                    for (
                                                        var P = y;
                                                        P !== n.tail &&
                                                        (A < w ||
                                                            "string" ==
                                                            typeof P.value);
                                                        P = P.next
                                                    )
                                                        k++,
                                                            (A +=
                                                                P.value.length);
                                                    k--,
                                                        (v = t.slice(b, A)),
                                                        (F.index -= b);
                                                } else if (!(F = O(f, 0, v, p)))
                                                    continue;
                                                var x = F.index,
                                                    $ = F[0],
                                                    S = v.slice(0, x),
                                                    E = v.slice(x + $.length),
                                                    _ = b + v.length;
                                                i &&
                                                    _ > i.reach &&
                                                    (i.reach = _);
                                                var v = y.prev;
                                                S &&
                                                    ((v = z(n, v, S)),
                                                        (b += S.length)),
                                                    T(n, v, k);
                                                var $ = new C(
                                                    l,
                                                    d ? j.tokenize($, d) : $,
                                                    h,
                                                    $
                                                );
                                                (y = z(n, v, $)),
                                                    E && z(n, y, E),
                                                    1 < k &&
                                                    e(t, n, a, y.prev, b, {
                                                        cause: l + "," + u,
                                                        reach: _,
                                                    });
                                            }
                                        }
                                    }
                                }
                        })(e, r, t, r.head, 0),
                        (function (e) {
                            var t = [],
                                n = e.head.next;
                            for (; n !== e.tail;)
                                t.push(n.value), (n = n.next);
                            return t;
                        })(r)
                    );
                },
                hooks: {
                    all: {},
                    add: function (e, t) {
                        var n = j.hooks.all;
                        (n[e] = n[e] || []), n[e].push(t);
                    },
                    run: function (e, t) {
                        var n = j.hooks.all[e];
                        if (n && n.length)
                            for (var a, r = 0; (a = n[r++]);) a(t);
                    },
                },
                Token: C,
            };
        function C(e, t, n, a) {
            (this.type = e),
                (this.content = t),
                (this.alias = n),
                (this.length = 0 | (a || "").length);
        }
        function O(e, t, n, a) {
            e.lastIndex = t;
            n = e.exec(n);
            return (
                n &&
                a &&
                n[1] &&
                ((a = n[1].length), (n.index += a), (n[0] = n[0].slice(a))),
                n
            );
        }
        function s() {
            var e = { value: null, prev: null, next: null },
                t = { value: null, prev: e, next: null };
            (e.next = t), (this.head = e), (this.tail = t), (this.length = 0);
        }
        function z(e, t, n) {
            var a = t.next,
                n = { value: n, prev: t, next: a };
            return (t.next = n), (a.prev = n), e.length++, n;
        }
        function T(e, t, n) {
            for (var a = t.next, r = 0; r < n && a !== e.tail; r++) a = a.next;
            ((t.next = a).prev = t), (e.length -= r);
        }
        if (
            ((o.Prism = j),
                (C.stringify = function t(e, n) {
                    if ("string" == typeof e) return e;
                    if (Array.isArray(e)) {
                        var a = "";
                        return (
                            e.forEach(function (e) {
                                a += t(e, n);
                            }),
                            a
                        );
                    }
                    var r = {
                        type: e.type,
                        content: t(e.content, n),
                        tag: "span",
                        classes: ["token", e.type],
                        attributes: {},
                        language: n,
                    },
                        e = e.alias;
                    e &&
                        (Array.isArray(e)
                            ? Array.prototype.push.apply(r.classes, e)
                            : r.classes.push(e)),
                        j.hooks.run("wrap", r);
                    var s,
                        i = "";
                    for (s in r.attributes)
                        i +=
                            " " +
                            s +
                            '="' +
                            (r.attributes[s] || "").replace(/"/g, "&quot;") +
                            '"';
                    return (
                        "<" +
                        r.tag +
                        ' class="' +
                        r.classes.join(" ") +
                        '"' +
                        i +
                        ">" +
                        r.content +
                        "</" +
                        r.tag +
                        ">"
                    );
                }),
                !o.document)
        )
            return (
                o.addEventListener &&
                (j.disableWorkerMessageHandler ||
                    o.addEventListener(
                        "message",
                        function (e) {
                            var t = JSON.parse(e.data),
                                n = t.language,
                                e = t.code,
                                t = t.immediateClose;
                            o.postMessage(
                                j.highlight(e, j.languages[n], n)
                            ),
                                t && o.close();
                        },
                        !1
                    )),
                j
            );
        var e,
            n = j.util.currentScript();
        function a() {
            j.manual || j.highlightAll();
        }
        return (
            n &&
            ((j.filename = n.src),
                n.hasAttribute("data-manual") && (j.manual = !0)),
            j.manual ||
            ("loading" === (e = document.readyState) ||
                ("interactive" === e && n && n.defer)
                ? document.addEventListener("DOMContentLoaded", a)
                : window.requestAnimationFrame
                    ? window.requestAnimationFrame(a)
                    : window.setTimeout(a, 16)),
            j
        );
    })(_self);
"undefined" != typeof module && module.exports && (module.exports = Prism),
    "undefined" != typeof global && (global.Prism = Prism),
    (Prism.languages.markup = {
        comment: /<!--[\s\S]*?-->/,
        prolog: /<\?[\s\S]+?\?>/,
        doctype: {
            pattern:
                /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
            greedy: !0,
            inside: {
                "internal-subset": {
                    pattern: /(\[)[\s\S]+(?=\]>$)/,
                    lookbehind: !0,
                    greedy: !0,
                    inside: null,
                },
                string: { pattern: /"[^"]*"|'[^']*'/, greedy: !0 },
                punctuation: /^<!|>$|[[\]]/,
                "doctype-tag": /^DOCTYPE/,
                name: /[^\s<>'"]+/,
            },
        },
        cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
        tag: {
            pattern:
                /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
            greedy: !0,
            inside: {
                tag: {
                    pattern: /^<\/?[^\s>\/]+/,
                    inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ },
                },
                "attr-value": {
                    pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
                    inside: {
                        punctuation: [
                            { pattern: /^=/, alias: "attr-equals" },
                            /"|'/,
                        ],
                    },
                },
                punctuation: /\/?>/,
                "attr-name": {
                    pattern: /[^\s>\/]+/,
                    inside: { namespace: /^[^\s>\/:]+:/ },
                },
            },
        },
        entity: [
            { pattern: /&[\da-z]{1,8};/i, alias: "named-entity" },
            /&#x?[\da-f]{1,8};/i,
        ],
    }),
    (Prism.languages.markup.tag.inside["attr-value"].inside.entity =
        Prism.languages.markup.entity),
    (Prism.languages.markup.doctype.inside["internal-subset"].inside =
        Prism.languages.markup),
    Prism.hooks.add("wrap", function (e) {
        "entity" === e.type &&
            (e.attributes.title = e.content.replace(/&amp;/, "&"));
    }),
    Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
        value: function (e, t) {
            var n = {};
            (n["language-" + t] = {
                pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
                lookbehind: !0,
                inside: Prism.languages[t],
            }),
                (n.cdata = /^<!\[CDATA\[|\]\]>$/i);
            n = {
                "included-cdata": {
                    pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
                    inside: n,
                },
            };
            n["language-" + t] = {
                pattern: /[\s\S]+/,
                inside: Prism.languages[t],
            };
            t = {};
            (t[e] = {
                pattern: RegExp(
                    /(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(
                        /__/g,
                        function () {
                            return e;
                        }
                    ),
                    "i"
                ),
                lookbehind: !0,
                greedy: !0,
                inside: n,
            }),
                Prism.languages.insertBefore("markup", "cdata", t);
        },
    }),
    (Prism.languages.html = Prism.languages.markup),
    (Prism.languages.mathml = Prism.languages.markup),
    (Prism.languages.svg = Prism.languages.markup),
    (Prism.languages.xml = Prism.languages.extend("markup", {})),
    (Prism.languages.ssml = Prism.languages.xml),
    (Prism.languages.atom = Prism.languages.xml),
    (Prism.languages.rss = Prism.languages.xml),
    (function (e) {
        var t = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
        (e.languages.css = {
            comment: /\/\*[\s\S]*?\*\//,
            atrule: {
                pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
                inside: {
                    rule: /^@[\w-]+/,
                    "selector-function-argument": {
                        pattern:
                            /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
                        lookbehind: !0,
                        alias: "selector",
                    },
                    keyword: {
                        pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
                        lookbehind: !0,
                    },
                },
            },
            url: {
                pattern: RegExp(
                    "\\burl\\((?:" +
                    t.source +
                    "|" +
                    /(?:[^\\\r\n()"']|\\[\s\S])*/.source +
                    ")\\)",
                    "i"
                ),
                greedy: !0,
                inside: {
                    function: /^url/i,
                    punctuation: /^\(|\)$/,
                    string: {
                        pattern: RegExp("^" + t.source + "$"),
                        alias: "url",
                    },
                },
            },
            selector: RegExp(
                "[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|" +
                t.source +
                ")*(?=\\s*\\{)"
            ),
            string: { pattern: t, greedy: !0 },
            property:
                /(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
            important: /!important\b/i,
            function: /[-a-z0-9]+(?=\()/i,
            punctuation: /[(){};:,]/,
        }),
            (e.languages.css.atrule.inside.rest = e.languages.css);
        t = e.languages.markup;
        t &&
            (t.tag.addInlined("style", "css"),
                e.languages.insertBefore(
                    "inside",
                    "attr-value",
                    {
                        "style-attr": {
                            pattern: /(^|["'\s])style\s*=\s*(?:"[^"]*"|'[^']*')/i,
                            lookbehind: !0,
                            inside: {
                                "attr-value": {
                                    pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
                                    inside: {
                                        style: {
                                            pattern: /(["'])[\s\S]+(?=["']$)/,
                                            lookbehind: !0,
                                            alias: "language-css",
                                            inside: e.languages.css,
                                        },
                                        punctuation: [
                                            { pattern: /^=/, alias: "attr-equals" },
                                            /"|'/,
                                        ],
                                    },
                                },
                                "attr-name": /^style/i,
                            },
                        },
                    },
                    t.tag
                ));
    })(Prism),
    (Prism.languages.clike = {
        comment: [
            {
                pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
                lookbehind: !0,
                greedy: !0,
            },
            { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
        ],
        string: {
            pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
            greedy: !0,
        },
        "class-name": {
            pattern:
                /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
            lookbehind: !0,
            inside: { punctuation: /[.\\]/ },
        },
        keyword:
            /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
        boolean: /\b(?:true|false)\b/,
        function: /\w+(?=\()/,
        number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
        operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
        punctuation: /[{}[\];(),.:]/,
    }),
    (Prism.languages.javascript = Prism.languages.extend("clike", {
        "class-name": [
            Prism.languages.clike["class-name"],
            {
                pattern:
                    /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:prototype|constructor))/,
                lookbehind: !0,
            },
        ],
        keyword: [
            { pattern: /((?:^|})\s*)(?:catch|finally)\b/, lookbehind: !0 },
            {
                pattern:
                    /(^|[^.]|\.\.\.\s*)\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|(?:get|set)(?=\s*[\[$\w\xA0-\uFFFF])|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
                lookbehind: !0,
            },
        ],
        function:
            /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
        number: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
        operator:
            /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/,
    })),
    (Prism.languages.javascript["class-name"][0].pattern =
        /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/),
    Prism.languages.insertBefore("javascript", "keyword", {
        regex: {
            pattern:
                /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
            lookbehind: !0,
            greedy: !0,
            inside: {
                "regex-source": {
                    pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
                    lookbehind: !0,
                    alias: "language-regex",
                    inside: Prism.languages.regex,
                },
                "regex-flags": /[a-z]+$/,
                "regex-delimiter": /^\/|\/$/,
            },
        },
        "function-variable": {
            pattern:
                /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
            alias: "function",
        },
        parameter: [
            {
                pattern:
                    /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
                lookbehind: !0,
                inside: Prism.languages.javascript,
            },
            {
                pattern:
                    /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
                inside: Prism.languages.javascript,
            },
            {
                pattern:
                    /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
                lookbehind: !0,
                inside: Prism.languages.javascript,
            },
            {
                pattern:
                    /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
                lookbehind: !0,
                inside: Prism.languages.javascript,
            },
        ],
        constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
    }),
    Prism.languages.insertBefore("javascript", "string", {
        "template-string": {
            pattern:
                /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
            greedy: !0,
            inside: {
                "template-punctuation": { pattern: /^`|`$/, alias: "string" },
                interpolation: {
                    pattern:
                        /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
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
    (Prism.languages.js = Prism.languages.javascript),
    (function () {
        var i, l, o, u, g, a, e;
        function c(e, t) {
            var n = (n = e.className).replace(a, " ") + " language-" + t;
            e.className = n.replace(/\s+/g, " ").trim();
        }
        "undefined" != typeof self &&
            self.Prism &&
            self.document &&
            (Element.prototype.matches ||
                (Element.prototype.matches =
                    Element.prototype.msMatchesSelector ||
                    Element.prototype.webkitMatchesSelector),
                (i = window.Prism),
                (l = {
                    js: "javascript",
                    py: "python",
                    rb: "ruby",
                    ps1: "powershell",
                    psm1: "powershell",
                    sh: "bash",
                    bat: "batch",
                    h: "c",
                    tex: "latex",
                }),
                (g =
                    "pre[data-src]:not([" +
                    (o = "data-src-status") +
                    '="loaded"]):not([' +
                    o +
                    '="' +
                    (u = "loading") +
                    '"])'),
                (a = /\blang(?:uage)?-([\w-]+)\b/i),
                i.hooks.add("before-highlightall", function (e) {
                    e.selector += ", " + g;
                }),
                i.hooks.add("before-sanity-check", function (e) {
                    var t,
                        n,
                        a,
                        r,
                        s = e.element;
                    s.matches(g) &&
                        ((e.code = ""),
                            s.setAttribute(o, u),
                            ((t = s.appendChild(
                                document.createElement("CODE")
                            )).textContent = "Loading…"),
                            (n = s.getAttribute("data-src")),
                            "none" === (e = e.language) &&
                            ((a = (/\.(\w+)$/.exec(n) || [, "none"])[1]),
                                (e = l[a] || a)),
                            c(t, e),
                            c(s, e),
                            (a = i.plugins.autoloader) && a.loadLanguages(e),
                            (r = new XMLHttpRequest()).open("GET", n, !0),
                            (r.onreadystatechange = function () {
                                4 == r.readyState &&
                                    (r.status < 400 && r.responseText
                                        ? (s.setAttribute(o, "loaded"),
                                            (t.textContent = r.responseText),
                                            i.highlightElement(t))
                                        : (s.setAttribute(o, "failed"),
                                            400 <= r.status
                                                ? (t.textContent =
                                                    "✖ Error " +
                                                    r.status +
                                                    " while fetching file: " +
                                                    r.statusText)
                                                : (t.textContent =
                                                    "✖ Error: File does not exist or is empty")));
                            }),
                            r.send(null));
                }),
                (e = !(i.plugins.fileHighlight = {
                    highlight: function (e) {
                        for (
                            var t, n = (e || document).querySelectorAll(g), a = 0;
                            (t = n[a++]);

                        )
                            i.highlightElement(t);
                    },
                })),
                (i.fileHighlight = function () {
                    e ||
                        (console.warn(
                            "Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."
                        ),
                            (e = !0)),
                        i.plugins.fileHighlight.highlight.apply(this, arguments);
                }));
    })();
