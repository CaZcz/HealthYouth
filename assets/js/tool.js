					function setbbg() {
						var bgDiv = document.getElementById("floatBoxBg");
						if (!bgDiv) {
							return false;
						}
						var boH = parseInt(document.documentElement.offsetHeight) > parseInt(document.getElementsByTagName("body")[0]
							.offsetHeight) ? parseInt(document.documentElement.offsetHeight) : parseInt(document
							.getElementsByTagName("body")[0].offsetHeight);
						var boW = parseInt(document.body.offsetWidth);
						bgDiv.style.height = boH + "px";
						bgDiv.style.width = boW + "px";
						window.onresize = function() {
							setbbg();
						};
						window.onscroll = function() {
							setbbg();
						};
					}
					setbbg();
					
					function _show(elem) {
						elem.style.display = 'block';
					};
					
					function _hide(elem) {
						elem.style.display = 'none';
					};
					function showtc(target) {
						if (!document.getElementById(target)) return;
						document.getElementById(target).style.display = "block";
						document.getElementById("floatBoxBg").style.display = "block";
					}
					
					function hidtc(target) {
						if (!document.getElementById(target)) return;
						document.getElementById(target).style.display = "none";
						document.getElementById("floatBoxBg").style.display = "none";
					}
					
					function openDialog(str) {
						document.getElementById('data-cont').innerHTML = str;
						showtc("floatBox");
					}
					
					function closeDialog() {
						hidtc("floatBox");
					}
					
					
					(function(c, g) {
						if (c.PCgroup) {
							return
						}
						var b, d = Object.prototype.toString,
							f = Array.prototype.slice,
							a = c.document,
							e = location.protocol ? location.protocol : "http:";
						b = function() {
							return b.dom.quick.apply(this, arguments)
						};
						b.add = function(h, i) {
							if (typeof h != "string") {
								var j = h;
								for (var h in j) {
									b.add(h, j[h])
								}
								return
							}
							if (b[h] == g) {
								b[h] = i
							} else {
								throw new Error("PCgroup Lib：模块名" + h + "已被占用")
							}
						};
						b.version = "1.0";
						b.add({
							isFunction: function(h) {
								return d.call(h) === "[object Function]"
							},
							isArray: function(h) {
								return d.call(h) === "[object Array]"
							},
							isPlainObject: function(h) {
								return h && d.call(h) === "[object Object]" && !h.nodeType && !h.setInterval
							},
							isBoolean: function(h) {
								return d.call(h) === "[object Boolean]"
							},
							isUndefined: function(h) {
								return h === g
							},
							isString: function(h) {
								return d.call(h) === "[object String]"
							},
							isNumber: function(h) {
								return d.call(h) === "[object Number]"
							},
							trim: function(h) {
								if (String.prototype.trim) {
									return h.trim()
								}
								return h.replace(/^\s+/g, "").replace(/\s+$/g, "")
							},
							each: function(j, m) {
								if (g === j.length) {
									for (var l in j) {
										if (false === m.call(j, j[l], l)) {
											break
										}
									}
								} else {
									for (var k = 0, h = j.length; k < h; k++) {
										if (k in j) {
											if (false === m.call(j, j[k], k)) {
												break
											}
										}
									}
								}
							},
							extend: function(h, l, j, i) {
								if (j === g) {
									j = true
								}
								for (var k in l) {
									if (j || !(k in h)) {
										if (i) {
											i(k)
										} else {
											h[k] = l[k]
										}
									}
								}
								return h
							},
							merge: function() {
								var k = {},
									j, h = arguments.length;
								for (j = 0; j < h; ++j) {
									b.extend(k, arguments[j])
								}
								return k
							},
							bindFn: function(h) {
								return function() {
									var j = f.call(arguments, 0),
										i;
									j.unshift(this);
									i = h.apply(this, j);
									if (i === g) {
										return this
									} else {
										if (i && i.nodeType && i.nodeType == 1) {
											return b.element(i)
										} else {
											return i
										}
									}
								}
							}
						});
						b.add("dom", function(i) {
							var h = false,
								m = [],
								j = function() {
									if (!h) {
										h = true;
										if (m) {
											b.each(m, function(n) {
												n.call(a, b)
											});
											m = null
										}
									}
								},
								l = false;
							bindReady = function() {
								if (l) {
									return
								}
								l = true;
								if (a.addEventListener) {
									a.addEventListener("DOMContentLoaded", function() {
										a.removeEventListener("DOMContentLoaded", arguments.callee, false);
										j()
									}, false)
								} else {
									if (a.attachEvent) {
										a.attachEvent("onreadystatechange", function() {
											if (a.readyState === "complete") {
												a.detachEvent("onreadystatechange", arguments.callee);
												j()
											}
										});
										if (a.documentElement.doScroll && c == c.top) {
											(function() {
												if (h) {
													return
												}
												try {
													a.documentElement.doScroll("left")
												} catch (n) {
													setTimeout(arguments.callee, 0);
													return
												}
												j()
											})()
										}
									}
								}
								b.addEvent(c, "load", j)
							};
							var k = {
								getElems: function(n, o) {
									return b.selector(n, o)
								},
								getElem: function(n, p) {
									var o = b.dom.getElems(n, p);
									return o.length ? o[0] : null
								},
								quick: function(q, p) {
									var o, n;
									if (!q) {
										return null
									}
									if (b.isString(q)) {
										var o = b.dom.getElems(q, p);
										return b.dom.quick(o)
									}
									if (b.isFunction(q)) {
										return b.dom.ready(q)
									}
									if (b.isArray(q)) {
										b.each(q, function(r) {
											b.dom.quick(r)
										});
										if (q.length > 1) {
											q.each = b.bindFn(b.each)
										} else {
											q = q[0];
											q[0] = q;
											q.each = function(r) {
												r(q)
											}
										}
										return q
									}
									if (q.nodeType) {
										return b.dom.element(q)
									}
									return null
								},
								ready: function(n) {
									bindReady();
									if (h) {
										n.call(a, b)
									} else {
										m.push(function() {
											return n.call(a, b)
										})
									}
									return this
								},
								element: function(n) {
									b.extend(n, b.dom.methods);
									return n
								},
								extend: function(q, p) {
									if (!b.isString(q)) {
										var r = {};
										if (p) {
											b.each(p, function(t) {
												var u = q[t];
												if (u) {
													r[t] = u
												}
											})
										} else {
											r = q
										}
										b.each(r, function(u, t) {
											b.dom.extend(t, u)
										})
									} else {
										var n = b.dom.methods,
											o = q,
											s = p;
										if (b.isFunction(s)) {
											n[o] = b.bindFn(s)
										} else {
											n[o] = s
										}
									}
								},
								methods: {}
							};
							return k
						}(b));
						b.getElem = b.dom.getElem;
						b.getElems = b.dom.getElems;
						b.ready = b.dom.ready;
						b.element = b.dom.element;
						b.add("loader", {
							getScript: function(i, l, k) {
								var j = a.getElementsByTagName("head")[0] || a.documentElement,
									h = a.createElement("script");
								h.src = i;
								k && (h.charset = k);
								h.onload = h.onreadystatechange = function() {
									if ((!this.readyState || this.readyState === "loaded" || this.readyState ===
											"complete")) {
										l && l();
										h.onload = h.onreadystatechange = null;
										if (j && h.parentNode) {
											h.parentNode.removeChild(h)
										}
									}
								};
								j.appendChild(h);
								return h
							},
							need: function() {
								var h = b.loader,
									i = f.call(arguments, 0),
									j = i.pop();
								if (!b.isFunction(j)) {
									return
								}
								var k = function() {
									j.call(b, b)
								};
								k.depth = i.length;
								b.each(i, function(p) {
									var m, o = h.__mods[p];
									if (o) {
										m = p;
										p = o
									}
									if (p) {
										var n = function() {
												!--k.depth && k()
											},
											l = h.__log[p] || (h.__log[p] = {});
										if (m && b[m]) {
											l.status = "loaded"
										}
										if (l.status == "sent") {
											l.callbaks.push(n)
										} else {
											if (l.status == "loaded") {
												n()
											} else {
												l.status = "sent";
												l.callbaks = [n];
												h.getScript(p, function() {
													b.each(l.callbaks, function(q) {
														q.call(c, b)
													});
													l.status = "loaded"
												})
											}
										}
									}
								})
							},
							__log: {},
							__mods: {
								ajax: e + "//js.3conline.com/min/temp/v2/mod-ajax.js",
								cookie: e + "//js.3conline.com/min/temp/v2/mod-cookie.js",
								tab: e + "//js.3conline.com/min/temp/v2/dpl-tab.js"
							}
						});
						b.need = b.loader.need;
						b.getScript = b.loader.getScript;
						c.pc = c.PCgroup = b
					})(window);
					PCgroup.add("selector", (function(f) {
						var g = /^(?:[\w\-_]+)?\.([\w\-_]+)/,
							e = /^(?:[\w\-_]+)?#([\w\-_]+)/,
							k = /^([\w\*\-_]+)/,
							h = /^(?:[\w\-_]+)?\[([\w]+)(=(\w+))?\]/,
							i = [null, null, null, null];
					
						function c(p, n) {
							n = n || document;
							var l = /^[\w\-_#]+$/.test(p);
							if (!l && n.querySelectorAll) {
								return b(n.querySelectorAll(p))
							}
							if (p.indexOf(",") > -1) {
								var z = p.split(/,/g),
									w = [],
									v = 0,
									u = z.length;
								for (; v < u; ++v) {
									w = w.concat(c(z[v], n))
								}
								return d(w)
							}
							p = p.replace(" > ", ">").replace(">", " > ");
							var r = p.split(/ /g),
								o = r.pop(),
								m = (o.match(e) || i)[1],
								x = !m && (o.match(g) || i)[1],
								A = !m && (o.match(k) || i)[1],
								q = o.match(h) || i,
								y = q[1] || null,
								t = q[3] || null,
								s;
							if (x && !A && n.getElementsByClassName) {
								s = b(n.getElementsByClassName(x))
							} else {
								s = !m && b(n.getElementsByTagName(A || "*"));
								if (x) {
									s = j(s, "className", x)
								}
								if (y) {
									s = j(s, y, t)
								}
								if (m) {
									var B = n.getElementById(m);
									return B ? [B] : []
								}
							}
							return r[0] && s[0] ? a(r, s) : s
						}
					
						function b(p) {
							try {
								return slice.call(p)
							} catch (o) {
								var m = [],
									n = 0,
									l = p.length;
								for (; n < l; ++n) {
									m[n] = p[n]
								}
								return m
							}
						}
					
						function a(x, q, o) {
							var s = x.pop();
							if (s === ">") {
								return a(x, q, true)
							}
							var t = [],
								l = -1,
								m = (s.match(e) || i)[1],
								u = !m && (s.match(g) || i)[1],
								w = !m && (s.match(k) || i)[1],
								v = -1,
								n, y, p;
							w = w && w.toLowerCase();
							while ((n = q[++v])) {
								y = n.parentNode;
								do {
									p = !w || w === "*" || w === y.nodeName.toLowerCase();
									p = p && (!m || y.id === m);
									p = p && (!u || RegExp("(^|\\s)" + u + "(\\s|$)").test(y.className));
									if (o || p) {
										break
									}
								} while ((y = y.parentNode));
								if (p) {
									t[++l] = n
								}
							}
							return x[0] && t[0] ? a(x, t) : t
						}
						var d = (function() {
							var l = new Date().getTime();
							var m = (function() {
								var o = 1;
								return function(q) {
									var p = q[l],
										n = o++;
									if (!p) {
										q[l] = n;
										return true
									}
									return false
								}
							})();
							return function(n) {
								var t = n.length,
									o = [],
									s = -1,
									p = 0,
									q;
								for (; p < t; ++p) {
									q = n[p];
									if (m(q)) {
										o[++s] = q
									}
								}
								l += 1;
								return o
							}
						})();
					
						function j(p, s, u) {
							var m = RegExp("(^|\\s)" + u + "(\\s|$)");
							var t = function(w) {
								var r = s == "className" ? w.className : w.getAttribute(s);
								if (r) {
									if (u) {
										if (m.test(r)) {
											return true
										}
									} else {
										return true
									}
								}
								return false
							};
							var o = -1,
								n, l = -1,
								q = [];
							while ((n = p[++o])) {
								if (t(n)) {
									q[++l] = n
								}
							}
							return q
						}
						return c
					})(PCgroup));
					PCgroup.add("browser", (function(e) {
						var c = {
							msie: /msie/.test(e) && !/opera/.test(e),
							opera: /opera/.test(e),
							safari: /webkit/.test(e) && !/chrome/.test(e),
							firefox: /firefox/.test(e),
							chrome: /chrome/.test(e),
							ipad: (/ipad/).test(e),
							iphone: (/iphone/).test(e)
						};
						var a = "";
						for (var d in c) {
							if (c[d]) {
								a = "safari" == d ? "version" : d;
								break
							}
						}
						c.version = a && RegExp("(?:" + a + ")[\\/: ]([\\d.]+)").test(e) ? RegExp.$1 : "0";
						c.ie = c.msie;
						c.ie6 = c.msie && parseInt(c.version, 10) == 6;
						c.ie7 = c.msie && parseInt(c.version, 10) == 7;
						c.ie8 = c.msie && parseInt(c.version, 10) == 8;
						c.ie9 = c.msie && parseInt(c.version, 10) == 9;
						c.support = function() {
							var f = document.createElement("div");
							f.style.display = "none";
							f.innerHTML = "<a href='#' style='color:red;float:left;opacity:.55;'>a</a>";
							var b = f.getElementsByTagName("a")[0];
							return {
								opacity: /^0.55$/.test(b.style.opacity),
								cssFloat: !!b.style.cssFloat
							}
						}();
						return c
					})(window.navigator.userAgent.toLowerCase()));
					(function(h, d) {
						var f = /alpha\([^)]*\)/,
							e = /float/i,
							n = /opacity=([^)]*)/,
							i = h.browser.support.cssFloat ? "cssFloat" : "styleFloat",
							m = /([A-Z])/g,
							b = /-([a-z])/ig,
							c = function(o, p) {
								return p.toUpperCase()
							},
							a = document.defaultView && document.defaultView.getComputedStyle,
							g = /^-?\d+(?:px)?$/i,
							l = /^-?\d/;
						h.add({
							cssHooks: {},
							getStyle: function(u, r, v, p) {
								var q, t = u.style,
									s, o = PCgroup.cssHooks[r];
								if (!h.browser.support.opacity && r === "opacity" && u.currentStyle) {
									q = n.test(u.currentStyle.filter || "") ? (parseFloat(RegExp.$1) / 100) + "" : "";
									return q === "" ? "1" : q
								}
								if (e.test(r)) {
									r = i
								}
								if (o && "get" in o && (q = o.get(u, p)) !== d) {
									return q
								} else {
									if (!v && t && t[r]) {
										q = t[r]
									} else {
										q = k(u, r, v)
									}
								}
								return q
							},
							setStyle: function() {
								var t = arguments,
									r = t[0];
								if (typeof t[1] != "string") {
									for (var w in t[1]) {
										h.setStyle.apply(h, [r, w, t[1][w]])
									}
									return
								}
								var p = t[1],
									v = t[2];
								var o = r.style || r,
									u = v !== d;
								if (!h.browser.support.opacity && p === "opacity") {
									if (u) {
										o.zoom = 1;
										var s = parseInt(v, 10) + "" === "NaN" ? "" : "alpha(opacity=" + v * 100 + ")";
										if (v >= 1) {
											s = ""
										}
										var q = o.filter || "";
										o.filter = f.test(q) ? q.replace(f, s) : s
									}
									return o.filter && o.filter.indexOf("opacity=") >= 0 ? (parseFloat(n.exec(o.filter)[
										1]) / 100) + "" : ""
								}
								if (e.test(p)) {
									p = i
								}
								p = p.replace(b, c);
								if (u) {
									o[p] = v
								}
							}
						});
					
						function j(s, q, p) {
							var u = q === "width" ? s.offsetWidth : s.offsetHeight,
								t = q === "width" ? ["Left", "Right"] : ["Top", "Bottom"],
								r = 0,
								o = t.length;
							if (u > 0) {
								if (p !== "border") {
									for (; r < o; r++) {
										if (!p) {
											u -= parseFloat(PCgroup.getStyle(s, "padding" + t[r])) || 0
										}
										if (p === "margin") {
											u += parseFloat(PCgroup.getStyle(s, p + t[r])) || 0
										} else {
											u -= parseFloat(PCgroup.getStyle(s, "border" + t[r] + "Width")) || 0
										}
									}
								}
								return u + "px"
							}
							u = k(s, q, q);
							if (u < 0 || u == null) {
								u = s.style[q] || 0
							}
							u = parseFloat(u) || 0;
							if (p) {
								for (; r < o; r++) {
									u += parseFloat(PCgroup.getStyle(s, "padding" + t[r])) || 0;
									if (p !== "padding") {
										u += parseFloat(PCgroup.getStyle(s, "border" + t[r] + "Width")) || 0
									}
									if (p === "margin") {
										u += parseFloat(PCgroup.getStyle(s, p + t[r])) || 0
									}
								}
							}
							return u + "px"
						}
					
						function k(s, p, q) {
							var o = s.style,
								w;
							if (a) {
								if (e.test(p)) {
									p = "float"
								}
								p = p.replace(m, "-$1").toLowerCase();
								var v = s.ownerDocument.defaultView;
								if (!v) {
									return null
								}
								var x = v.getComputedStyle(s, null);
								if (x) {
									w = x.getPropertyValue(p)
								}
								if (p === "opacity" && w === "") {
									w = "1"
								}
							} else {
								if (s.currentStyle) {
									var t = p.replace(b, c);
									w = s.currentStyle[p] || s.currentStyle[t];
									if (!g.test(w) && l.test(w)) {
										var r = o.left,
											u = s.runtimeStyle.left;
										s.runtimeStyle.left = s.currentStyle.left;
										o.left = t === "fontSize" ? "1em" : (w || 0);
										w = o.pixelLeft + "px";
										o.left = r;
										s.runtimeStyle.left = u
									}
								}
							}
							return w
						}
						PCgroup.each(["height", "width"], function(o) {
							PCgroup.cssHooks[o] = {
								get: function(q, p) {
									return j(q, o, p)
								}
							}
						});
						PCgroup.dom.extend(PCgroup, ["getStyle", "setStyle"])
					})(PCgroup);
					(function(f, d) {
						var j = /\s+/,
							e = /[\n\t\r]/g;
						var b = function(n, k, m) {
								k = k || 1;
								var l = 0;
								for (; n; n = n[m]) {
									if (n.nodeType == 1 && ++l == k) {
										break
									}
								}
								return n
							},
							g = function(m, l) {
								var k = [];
								for (; m; m = m.nextSibling) {
									if (m.nodeType == 1 && m != l) {
										k.push(m)
									}
								}
								return k
							};
						var c = {},
							i = "PCgroup",
							a = 0;
						var h = document.documentElement.textContent !== d ? "textContent" : "innerText";
						f.add({
							isContain: function(l, k) {
								try {
									return l.contains ? l != k && l.contains(k) : !!(l.compareDocumentPosition(k) & 16)
								} catch (m) {
									return false
								}
							},
							createElem: function(n, l, o) {
								var o = o || document;
								var k = o.createElement(n);
								if (l) {
									for (var m in l) {
										var p = l[m];
										if (m == "className") {
											f.addClass(k, p);
											continue
										}
										k.setAttribute(m, p)
									}
								}
								return k
							},
							prependChild: function(l, k) {
								if (l.nodeType == 1) {
									l.insertBefore(k, l.firstChild)
								}
							},
							insertAfter: function(n, k) {
								var l = n.parentNode,
									m = l.lastChild;
								if (m == n) {
									l.appendChild(k)
								} else {
									l.insertBefore(k, n.nextSibling)
								}
							},
							hasClass: function(m, k) {
								var l = " ",
									n = l + m.className + l;
								return n.indexOf(l + k + l) != -1
							},
							addClass: function(l, k) {
								if (!pc.hasClass(l, k)) {
									l.className = pc.trim(l.className + " " + k)
								}
							},
							removeClass: function(n, l) {
								var m = (" " + n.className + " ").replace(e, " "),
									o = l.split(j);
								for (var p = 0, k = o.length; p < k; p++) {
									m = m.replace(" " + o[p] + " ", " ")
								}
								n.className = pc.trim(m)
							},
							nextElem: function(k) {
								return b(k, 2, "nextSibling")
							},
							prevElem: function(k) {
								return b(k, 2, "previousSibling")
							},
							parentElems: function(k) {
								return pc.walk(k, "parentNode")
							},
							nextElems: function(k) {
								return pc.walk(k, "nextSibling")
							},
							prevElems: function(k) {
								return pc.walk(k, "previousSibling")
							},
							siblings: function(k) {
								return g(k.parentNode.firstChild, k)
							},
							walk: function(n, l, m) {
								var k = [],
									p = n[l];
								while (p && p.nodeType !== 9) {
									if (p.nodeType === 1) {
										if (m) {
											var o = m(p);
											if (o === false) {
												p = p[l];
												continue
											}
										}
										k.push(p)
									}
									p = p[l]
								}
								return k
							},
							childElems: function(k) {
								return g(k.firstChild)
							},
							getText: function(k) {
								return k[h]
							},
							setText: function(k, l) {
								if (l !== d) {
									k[h] = l
								}
							},
							setData: function(l, k, m) {
								var n = l[i];
								if (n === d) {
									n = a++;
									l[i] = n
								}
								if (c[n] === d) {
									c[n] = {}
								}
								return c[n][k] = m
							},
							getData: function(l, k) {
								var n = l[i],
									m = c[n] && c[n][k];
								if (m === d) {
									m = null
								}
								return m
							},
							removeData: function(l, k) {
								var m = l[i];
								if (m !== d && c[m]) {
									delete c[m][k]
								}
							}
						});
						pc.create = pc.createElem;
						PCgroup.dom.extend(PCgroup, ["prependChild", "insertAfter", "hasClass", "addClass", "removeClass",
							"nextElem", "prevElem", "parentElems", "nextElems", "prevElems", "siblings", "childElems",
							"setData", "getData", "removeData", "walk", "getText", "setText"
						])
					})(PCgroup);
					(function(e, f) {
						var c = 0,
							d = "PCgroupEventID",
							b = "PCgroupEvents",
							a = [];
						e.add({
							addEvent: function(l, k, j) {
								var h;
								if (!e.getData(l, b)) {
									e.setData(l, b, {})
								}
								h = e.getData(l, b);
								if (!h[k]) {
									h[k] = {}
								}
								var g = function(p) {
									var p = p || window.event,
										n = this;
									if (p !== f) {
										var o = PCgroup.extend({}, p);
										p = pc.eventTarget(p)
									}
									j.apply(l, [p, o])
								};
								var m = function(s) {
									var p = function(u, t) {
										try {
											return u.contains ? u != t && u.contains(t) : !!(u
												.compareDocumentPosition(t) & 16)
										} catch (v) {}
									};
									var s = s || window.event,
										o = this;
									if (s !== f) {
										var q = PCgroup.extend({}, s);
										s = pc.eventTarget(s);
										var r = s.target,
											n = s.relatedTarget;
										if (!p(o, n) && o != n) {
											j.apply(l, [s, q])
										}
									}
								};
								g.fn = j;
								j[b] = g;
								var i = c++;
								g[d] = i;
								h[k][i] = g;
								if (l.attachEvent) {
									l.attachEvent("on" + k, g)
								} else {
									if (k == "mouseenter") {
										l.addEventListener("mouseover", m, false)
									} else {
										if (k == "mouseleave") {
											l.addEventListener("mouseout", m, false)
										} else {
											l.addEventListener(k, g, false)
										}
									}
								}
							},
							removeEvent: function(l, k, j) {
								var g = e.getData(l, b);
								if (!k && !j) {
									var i = e.getEvent(l);
									if (i) {
										pc.each(i, function(m, n) {
											e.removeEvent(l, n)
										})
									}
								}
								if (!j) {
									var i = e.getEvent(l, k);
									if (i) {
										pc.each(i, function(m) {
											e.removeEvent(l, k, m.fn)
										})
									}
									return
								}
								var h = j[b][d];
								j = g[k][h];
								if (l.detachEvent) {
									l.detachEvent("on" + k, j)
								} else {
									l.removeEventListener(k, j, false)
								}
								delete g[k][h]
							},
							getEvent: function(k, j, l) {
								var i = {},
									g, h = false;
								if (!e.getData(k, b)) {
									e.setData(k, b, {})
								}
								g = e.getData(k, b);
								if (g) {
									e.each(g, function(n, m) {
										if (j && j != m) {
											return true
										}
										i[m] = i[m] || [];
										e.each(n, function(o) {
											h = true;
											i[m].push(o)
										})
									})
								}
								return h ? (j ? i[j] : i) : null
							},
							cloneEvent: function(j, i, h) {
								var g = e.getEvent(j, h);
								if (g) {
									if (h) {
										pc.each(g, function(k) {
											pc.addEvent(i, h, k.fn)
										})
									} else {
										pc.each(g, function(k, l) {
											pc.each(k, function(m) {
												pc.addEvent(i, l, m.fn)
											})
										})
									}
								}
							},
							eventTarget: function(i) {
								if (!i.target) {
									i.target = i.srcElement || document
								}
								if (i.target.nodeType === 3) {
									i.target = i.target.parentNode
								}
								if (!i.relatedTarget && i.fromElement) {
									i.relatedTarget = (i.fromElement === i.target) ? i.toElement : i.fromElement
								}
								if (i.which === f) {
									i.which = (i.charCode !== f) ? i.charCode : i.keyCode
								}
								if (i.pageX == null && i.clientX != null) {
									var h = document.documentElement,
										g = document.body;
									i.pageX = i.clientX + (h && h.scrollLeft || g && g.scrollLeft || 0) - (h && h
										.clientLeft || g && g.clientLeft || 0);
									i.pageY = i.clientY + (h && h.scrollTop || g && g.scrollTop || 0) - (h && h
										.clientTop || g && g.clientTop || 0)
								}
								if (!i.preventDefault) {
									i.preventDefault = function() {
										i.returnValue = false
									}
								}
								if (!i.stopPropagation) {
									i.stopPropagation = function(j) {
										i.cancelBubble = true
									}
								}
								return i
							}
						});
						PCgroup.dom.extend(PCgroup, ["addEvent", "removeEvent", "getEvent", "cloneEvent"])
					})(PCgroup);
					(function(a, b) {
						a.add({
							timers: {},
							stopTimer: function() {
								a.each(this.timers, function(c) {
									c.stop()
								})
							},
							startTimer: function() {
								a.each(this.timers, function(c) {
									c.start()
								})
							},
							pauseTimer: function() {
								a.each(this.timers, function(c) {
									c.pause()
								})
							},
							addTimer: function(g, e, h, f) {
								var d = this,
									f = f || [],
									c = {
										fn: g,
										repeatCount: 0,
										start: function() {
											if (h !== b && this.run === false) {
												this.startTime += d.now() - this.restTime
											} else {
												this.startTime = d.now()
											}
											this.run = true
										},
										pause: function() {
											if (this.run != false && h !== b) {
												this.restTime = d.now()
											}
											this.run = false
										},
										stop: function() {
											window.clearInterval(this.id);
											delete d.timers[this.id]
										},
										__init: function() {
											c.id = window.setInterval(function() {
												if (c.run === false) {
													return
												}
												g.apply(c, f);
												c.repeatCount++;
												if (h) {
													var i = d.now() - c.startTime;
													if (i > h) {
														c.oncomplete && c.oncomplete();
														c.stop()
													}
												}
											}, e);
											c.start();
											d.timers[c.id] = c
										}
									};
								c.__init();
								return c
							},
							now: function() {
								return new Date().getTime()
							}
						})
					})(PCgroup);
					(function(d, g) {
						var f = document,
							c = encodeURIComponent,
							e = decodeURIComponent;
						var a = {
							get: function(j) {
								var i, h;
								if (b(j)) {
									if ((h = f.cookie.match("(?:^| )" + j + "(?:(?:=([^;]*))|;|$)"))) {
										i = h[1] ? e(h[1]) : ""
									}
								}
								return i
							},
							set: function(j, o, h, k, m, l) {
								var n = c(o),
									i = h;
								if (typeof i === "number") {
									i = new Date();
									i.setTime(i.getTime() + h * 86400000)
								}
								if (i instanceof Date) {
									n += "; expires=" + i.toUTCString()
								}
								if (b(k)) {
									n += "; domain=" + k
								}
								if (b(m)) {
									n += "; path=" + m
								}
								if (l) {
									n += "; secure"
								}
								f.cookie = j + "=" + n
							},
							remove: function(h, i, k, j) {
								d.setCookie(h, "", 0, i, k, j)
							}
						};
						d.add({
							cookie: a,
							getCookie: a.get,
							setCookie: a.set,
							removeCookie: a.remove
						});
					
						function b(h) {
							return d.isString(h) && h !== ""
						}
					})(PCgroup);
					(function(c, h) {
						var g = Array.prototype.slice,
							f = Object.prototype.toString,
							d = function(i, j, l, k) {
								this.elem = i;
								this.duration = j;
								this.easing = l;
								this.callback = function() {
									var m = c.getData(i, "timers");
									if (c.isArray(m) && m.length > 0) {
										m.shift()
									}
									k && k.call(this);
									c.dequeue(i)
								};
								this.clips = []
							},
							b = function(l, m, i, j, k) {
								this.elem = l;
								this.start = m;
								this.end = i;
								this.name = j;
								this.unit = k
							};
						var e = {
							visibility: "hidden",
							display: "block"
						};
						var a = function(j, l, k) {
							var i;
							if (c.isNumber(j) && c.isFunction(l)) {
								k = l;
								l = i
							} else {
								if (c.isString(j)) {
									if (c.isFunction(l)) {
										k = l
									}
									l = j;
									j = i
								} else {
									if (c.isFunction(j)) {
										k = j;
										j = i;
										l = i
									}
								}
							}
							return {
								duration: j,
								easing: l,
								callback: k
							}
						};
						c.add({
							animate: function(l, j, m, s, t, o) {
								var k = arguments,
									u = [],
									r, q;
								for (var n = 2; n < k.length; n++) {
									if (c.isNumber(k[n])) {
										r = k[n]
									}
									if (c.isString(k[n])) {
										q = k[n]
									}
									if (c.isFunction(k[n])) {
										u.push(k[n])
									}
								}
								t = u[0];
								o = u[1];
								m = r || 1000;
								s = q || "swing";
								c.queue(l, function() {
									if (o && c.isFunction(o)) {
										if (o() === false) {
											c.dequeue(l);
											return
										}
									}
									var i = new d(l, m, s, t);
									c.each(j, function(A, D) {
										var y = A.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/);
										if (y) {
											var p, z = D.toLowerCase();
											if (z == "scrollleft" || z == "scrolltop") {
												p = true
											}
											var C = c.getStyle(l, D);
											if (C === "auto") {
												C = 0
											}
											var x = parseFloat(y[2]),
												B = y[3],
												v = p ? l[D] : parseFloat(C);
											if (!B) {
												if (D.search(/opacity/i) == -1) {
													B = "px"
												}
											}
											var w = new b(l, v, x, D, B);
											w.nonStyle = p;
											i.clips.push(w);
											lastProp = D
										}
									});
									i.init()
								});
								return l
							},
							easing: {
								linear: function(k, l, i, j) {
									return i + j * k
								},
								swing: function(k, l, i, j) {
									return ((-Math.cos(k * Math.PI) / 2) + 0.5) * j + i
								},
								quadIn: function(k, l, i, j) {
									return k * k * j + i
								},
								quadOut: function(k, l, i, j) {
									return -k * k * j + 2 * k * j + i
								},
								cubicIn: function(k, l, i, j) {
									return k * k * k * j + i
								},
								cubicOut: function(k, l, i, j) {
									return j * ((k -= 1) * k * k + 1) + i
								},
								easeOutBounce: function(k, l, i, j) {
									if (k < (1 / 2.75)) {
										return j * 7.5625 * k * k + i
									} else {
										if (k < (2 / 2.75)) {
											return j * (7.5625 * (k -= (1.5 / 2.75)) * k + 0.75) + i
										} else {
											if (k < (2.5 / 2.75)) {
												return j * (7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375) + i
											} else {
												return j * (7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375) + i
											}
										}
									}
								}
							},
							queue: function(j, k) {
								var i = c.getData(j, "queue");
								if (c.isArray(i)) {
									i.push(k)
								} else {
									i = [k];
									c.setData(j, "queue", i)
								}
								if (i[0] !== "inprogress") {
									this.dequeue(j)
								}
								return i
							},
							dequeue: function(l) {
								var j = this;
								var i = c.getData(l, "queue"),
									k = i && i.shift();
								if (k === "inprogress") {
									k = i.shift()
								}
								if (k) {
									i.unshift("inprogress");
									k.call(l, function() {
										j.dequeue(l)
									})
								}
							},
							pause: function(i) {
								var j = c.getData(i, "timers");
								if (c.isArray(j) && j[0]) {
									j[0].pause()
								}
							},
							begin: function(i) {
								var j = c.getData(i, "timers");
								if (c.isArray(j) && j[0]) {
									j[0].start()
								}
							},
							end: function(i) {
								c.setData(i, "queue", []);
								var j = c.getData(i, "timers");
								if (c.isArray(j) && j[0]) {
									j[0].stop()
								}
								c.removeData(i, "timers")
							},
							fadeTo: function(j, i, k, l) {
								c.animate(j, {
									opacity: i
								}, k, "linear", l)
							},
							show: function(i, j, k) {
								c.setStyle(i, "display", "block");
								if (!j || !c.isNumber(j)) {
									return
								}
								c.fadeTo(i, 1, j, k)
							},
							hide: function(i, j, k) {
								if (!j || !c.isNumber(j)) {
									c.setStyle(i, "display", "none");
									return
								}
								c.fadeTo(i, 0, j, function() {
									c.setStyle(i, "display", "none");
									k && k.call(i)
								})
							},
							slideUp: function(k, l, o, n) {
								var i;
								var j = a(l, o, n);
								l = j.duration;
								o = j.easing;
								n = j.callback;
								c.animate(k, {
									height: 0
								}, l, o, function() {
									c.setStyle(k, {
										display: "none",
										height: i
									});
									c.setStyle(k, "overflow", "visible");
									if (n && c.isFunction(n)) {
										n.call(k)
									}
								}, m);
					
								function m() {
									if (c.getStyle(k, "display") == "none") {
										return false
									}
									i = c.getStyle(k, "height");
									c.setStyle(k, "overflow", "hidden")
								}
							},
							slideDown: function(i, j, l, n) {
								if (c.getStyle(i, "display") != "none") {
									return
								}
								var p = a(j, l, n);
								j = p.duration;
								l = p.easing;
								n = p.callback;
								var o, q = {
										height: 0,
										overflow: "hidden"
									},
									k = {},
									m = {
										overflow: c.getStyle(i, "overflow")
									};
								c.each(e, function(s, r) {
									k[r] = c.getStyle(i, r)
								});
								c.setStyle(i, e);
								o = c.getStyle(i, "height");
								c.setStyle(i, k);
								c.setStyle(i, q);
								c.setStyle(i, "display", "block");
								c.animate(i, {
									height: o
								}, j, l, function() {
									c.setStyle(i, m);
									if (n && c.isFunction(n)) {
										n.call(i)
									}
								})
							}
						});
						d.prototype = {
							init: function() {
								var i = this;
								i.timer = c.addTimer(function(k) {
									var m = c.now() - this.startTime,
										l = m / i.duration;
									c.each(i.clips, function(o, n) {
										var p = c.easing[i.easing](l, m, 0, 1);
										o.pos = o.start + ((o.end - o.start) * p)
									});
									i.update()
								}, 13, i.duration);
								i.timer.oncomplete = function() {
									c.each(i.clips, function(k) {
										k.pos = k.end
									});
									i.update();
									i.callback.call(i.elem)
								};
								var j = c.getData(i.elem, "timers");
								if (c.isArray(j)) {
									j.push(i.timer)
								} else {
									c.setData(i.elem, "timers", [i.timer])
								}
							},
							update: function() {
								c.each(this.clips, function(i) {
									if (i.nonStyle) {
										i.elem[i.name] = i.pos
									} else {
										c.setStyle(i.elem, i.name, i.pos + i.unit)
									}
								})
							}
						};
						PCgroup.dom.extend(PCgroup, ["animate", "show", "hide", "slideUp", "slideDown", "fadeTo", "begin", "pause",
							"end"
						])
					})(PCgroup);
					pc.add("tab", function(c) {
						var d = [];
						var a = false;
						var b = function(e) {
							this.config = pc.extend(e, b.config, false);
							d.push(this);
							this.init()
						};
						b.config = {
							effect: "base",
							isIpad: typeof(window.ontouchstart) !== "undefined",
							direction: "x",
							autoPlay: false,
							playTo: 0,
							type: "mouseover",
							curClass: "current",
							link: false,
							stay: 2000,
							delay: 200,
							lazy: false,
							merge: false,
							animateTime: 300,
							easing: "swing",
							resize: false,
							defaultEvent: false,
							oninit: function() {},
							onchange: function() {},
							onresize: null
						};
						b.prototype = {
							init: function() {
								var f = this,
									l = f.config;
								if (!l.target.length || l.target.length <= 1) {
									return
								}
								f.target = l.target;
								f.length = l.target.length;
								f.effect = b.effect[l.effect];
								f.wrap = l.target[0].parentNode;
								if (/(:?ul|ol|dl)/i.test(f.wrap.tagName)) {
									f.content = f.wrap;
									f.wrap = f.wrap.parentNode
								} else {
									var k = pc.create("div", {
										className: "tabContent"
									});
									pc.each(l.target, function(i) {
										k.appendChild(i)
									});
									f.content = f.wrap.appendChild(k)
								}
								if (l.control !== false) {
									l.control = l.control || pc.getElems(".control", f.wrap);
									if (!l.control || l.control.length < 1) {
										var h = pc.create("ul", {
												className: "control"
											}),
											j = "";
										for (var g = 0; g < f.length; g++) {
											j += '<li><a href="#">' + (g + 1) + "</a></li>"
										}
										h.innerHTML = j;
										h = f.wrap.appendChild(h);
										l.control = pc.childElems(h)
									}
									var e = [];
									pc.each(l.control, function(n, m) {
										if (pc.hasClass(n, "next")) {
											f.nextBtn = n
										} else {
											if (pc.hasClass(n, "prev")) {
												f.prevBtn = n
											} else {
												e.push(n)
											}
										}
									});
									f.control = e
								}
								if (l.nextBtn) {
									f.nextBtn = l.nextBtn
								}
								if (l.prevBtn) {
									f.prevBtn = l.prevBtn
								}
								l.oninit.call(f);
								if (f.effect) {
									f.effect.oninit.call(f)
								}
								f.playTo(l.playTo);
								if (l.autoPlay) {
									f.play()
								}
								f.attach()
							},
							attach: function() {
								var g = this,
									k = g.config;
								if (k.autoPlay) {
									var f = [g.wrap],
										e = g.control && g.control[0].parentNode;
									if (e) {
										f.push(e)
									}
									pc.each(f, function(l) {
										pc.addEvent(l, "mouseover", function(m) {
											g.stop()
										});
										pc.addEvent(l, "mouseout", function(m) {
											g.play()
										})
									})
								}
								if (k.effect === "slide" && k.isIpad) {
									pc.each(g.target, function(l) {
										l.addEventListener("touchstart", function(m) {
											g.stop();
											g.iPadDistance = (k.direction === "x" ? m.touches[0].pageX :
												m.touches[0].pageY);
											g.srcScrollNum = g.contentWrap[g.prop]
										}, false);
										l.addEventListener("touchmove", function(n) {
											g.iPadLastDistance = (k.direction === "x" ? n.touches[0]
												.pageX : n.touches[0].pageY);
											var m = g.iPadLastDistance - g.iPadDistance;
											g.contentWrap[g.prop] = g.srcScrollNum - m;
											n.preventDefault()
										}, false);
										l.addEventListener("touchend", function(o) {
											if (g.iPadLastDistance === undefined) {
												return
											}
											var p = g.iPadLastDistance - g.iPadDistance > 0 ? false :
												true;
											var m = g.curPage === 0,
												n = g.curPage === g.length - 1;
											if (p && (g.config.merge || !n)) {
												g.next()
											} else {
												if (!p && (g.config.merge || !m)) {
													g.prev()
												}
											}
											g.play();
											o.preventDefault();
											g.iPadLastDistance = undefined
										}, false)
									})
								}
								var i = k.type == "mouseover";
								if (k.control) {
									pc.each(g.control, function(m, l) {
										pc.addEvent(m, k.type, function() {
											var n = i ? k.delay : 0;
											if (g.delayTimer) {
												window.clearTimeout(g.delayTimer)
											}
											g.delayTimer = window.setTimeout(function() {
												g.playTo(l)
											}, n)
										});
										if (i) {
											pc.addEvent(m, "mouseout", function() {
												if (g.delayTimer) {
													window.clearTimeout(g.delayTimer)
												}
											});
											pc.addEvent(m, "click", function() {
												g.playTo(l)
											})
										}
										if (!g.config.link) {
											pc.addEvent(m, "click", function(n) {
												n.preventDefault()
											})
										}
									})
								}
								var j = g.config.autoPlay && g.config.defaultEvent;
								if (g.nextBtn) {
									pc.addEvent(g.nextBtn, "click", function(l) {
										g.next();
										l.preventDefault()
									});
									j && h(g.nextBtn)
								}
								if (g.prevBtn) {
									pc.addEvent(g.prevBtn, "click", function(l) {
										g.prev();
										l.preventDefault()
									});
									j && h(g.prevBtn)
								}
								if (k.onresize && !a) {
									a = true
								}
								pc.addEvent(window, "resize", function() {
									var m = d.length,
										l;
									(function() {
										while (m > 0) {
											m--;
											l = d[m];
											l.stop();
											l.config.onresize && pc.isFunction(l.config.onresize) && l.config
												.onresize.call(l);
											setTimeout(arguments.callee, 0)
										}
									})()
								});
					
								function h(l) {
									pc.addEvent(l, "mouseenter", function() {
										g.stop()
									});
									pc.addEvent(l, "mouseleave", function() {
										g.play()
									})
								}
							},
							playTo: function(l) {
								var q = this,
									o = q.config,
									j = q.curPage !== window.undefined,
									k, f, m, n;
								if (j && q.curPage === l) {
									return
								}
								q.prevPage = q.curPage;
								if (o.effect == "slide" && o.merge) {
									f = i(q.curPage, true);
									k = i(q.curPage);
									q.curPage = l;
									m = i(l, true);
									l = i(l);
									n = i(m + 1, true)
								} else {
									f = k = q.curPage;
									m = l = q.curPage = i(l);
									n = i(m + 1)
								}
								if (q.control && l !== k) {
									var e = q.control[l],
										p = q.control[k];
									if (e) {
										pc.addClass(e, q.config.curClass)
									}
									if (p) {
										pc.removeClass(p, q.config.curClass)
									}
								}
								if (o.lazy) {
									var g = q.curPage;
									if (o.merge && g < 0) {
										g = q.target.length - 1
									}
									var h = q.target[g];
									if (h && !h.parsed) {
										q._lazyload(h)
									}
								}
								if (q.effect) {
									q.effect.onchange.call(q)
								}
								q.config.onchange.call(q, m, f, n);
					
								function i(t, s) {
									var u = s ? q.length * 2 : q.length;
									if (t >= u) {
										t %= u
									}
									if (t < 0) {
										var r = t % u;
										t = r === 0 ? 0 : (r + u)
									}
									return t
								}
							},
							next: function() {
								this.playTo(this.curPage + 1)
							},
							prev: function() {
								this.playTo(this.curPage - 1)
							},
							play: function() {
								var e = this,
									f = e.config;
								if (e.timer) {
									e.stop()
								}
								e.timer = window.setInterval(function() {
									var g = e.curPage + 1;
									e.playTo(g)
								}, f.stay)
							},
							stop: function() {
								window.clearInterval(this.timer)
							},
							_lazyload: function(f) {
								var e = pc.getElem("textarea", f);
								if (e) {
									f.innerHTML = e.value;
									f.parsed = true
								}
							}
						};
						b.effect = {};
						return b
					}(pc));
					pc.extend(pc.tab.effect, {
						base: {
							oninit: function() {
								var a = this,
									b = a.config;
								pc.each(a.target, function(c) {
									if (a.target[b.playTo] != c) {
										pc.setStyle(c, "display", "none")
									}
								})
							},
							onchange: function() {
								var b = this,
									a = b.prevPage === window.undefined ? null : b.target[b.prevPage],
									c = b.target[b.curPage];
								if (a) {
									pc.setStyle(a, "display", "none")
								}
								pc.setStyle(c, "display", "block")
							}
						},
						fade: {
							oninit: function() {
								var a = this,
									b = a.config;
								pc.setStyle(a.content, "position", "relative");
								pc.each(a.target, function(e, c) {
									var d = {
										position: "absolute",
										zIndex: c
									};
									c !== 0 && (d.opacity = 0);
									pc.setData(e, "index", c);
									pc.setStyle(e, d)
								})
							},
							onchange: function() {
								var b = this,
									a = b.prevPage === window.undefined ? null : b.target[b.prevPage],
									c = b.target[b.curPage];
								if (b.config.fixFadeBug) {
									return b.config.fixFadeBug = !1
								}
								if (a) {
									pc.setStyle(a, "zIndex", pc.getData(c, "index"))
								}
								pc.setStyle(c, "zIndex", b.length);
								pc.setStyle(c, "opacity", 0);
								pc.show(c, b.config.animateTime, function() {
									pc.each(b.target, function(d) {
										if (d != c) {
											pc.setStyle(d, "opacity", 0)
										}
									})
								});
								if (a) {
									pc.hide(a, b.config.animateTime)
								}
								pc.each(b.target, function(d) {
									if (d != c) {
										pc.end(d)
									}
								})
							}
						},
						slide: {
							oninit: function() {
								var a = this,
									g = a.config;
								var f = a.target[g.playTo];
								var e = pc.create("div", {
									className: "contentWrap"
								});
								pc.setStyle(e, {
									overflow: "hidden",
									position: "relative"
								});
								e.appendChild(a.content);
								a.contentWrap = a.wrap.appendChild(e);
								pc.setStyle(a.wrap, "overflow", "hidden");
								if (pc.browser.ie) {
									pc.setStyle(a.contentWrap, "zoom", "1")
								}
								var b = function(c) {
									return parseFloat(pc.getStyle(f, c)) || 0
								};
								if (g.direction == "x") {
									a.prop = "scrollLeft";
									a.boxProp = "width";
									a.step = g.width || f.offsetWidth + b("marginLeft") + b("marginRight")
								} else {
									a.prop = "scrollTop";
									a.boxProp = "height";
									a.step = g.height || f.offsetHeight + b("marginTop") + b("marginBottom")
								}
								pc.setStyle(a.contentWrap, a.boxProp, "100%");
								a.showNum = Math.floor(parseFloat(pc.getStyle(a.wrap, a.boxProp)) / a.step);
								if (g.merge) {
									a.showNum = Math.ceil(parseFloat(pc.getStyle(a.wrap, a.boxProp)) / a.step);
									var d = [];
									pc.each(a.target, function(c) {
										var h = c.cloneNode(true);
										h = a.content.appendChild(h);
										pc.cloneEvent(c, h);
										d.push(h)
									});
									a.target = g.target.concat(d);
									a.plus = 0
								}
								if (g.direction == "x") {
									pc.setStyle(a.content, "width", (g.totalWidth || a.step * a.target.length) + "px");
									pc.each(a.target, function(c) {
										pc.setStyle(c, "float", "left")
									})
								}
							},
							onchange: function() {
								var m = this,
									h = m.config,
									k = m.prevPage === window.undefined ? 0 : m.prevPage,
									l = m.curPage,
									j;
								merge: if (h.merge) {
									var g = l - k,
										f = Math.abs(g);
									if (m.realCurPage === undefined) {
										m.realCurPage = l;
										m.realPrevPage = k
									}
									if (g === 0) {
										break merge
									}
									if (g < 0) {
										if (l >= m.showNum - 2 && m.realCurPage > 0) {
											m.realPrevPage = m.realCurPage;
											m.realCurPage += g
										} else {
											m.realPrevPage = 1;
											m.realCurPage = 0
										}
										if (l >= m.plus) {
											break merge
										}
										for (var e = 0; e < f; e++) {
											var b = m.target.pop();
											pc.prependChild(m.content, b);
											m.target.unshift(b)
										}
									} else {
										if (g > 0) {
											if (l <= m.target.length + m.plus - m.showNum) {
												var d = m.realCurPage;
												m.realCurPage = m.plus == 0 ? l : m.realCurPage + g;
												m.realPrevPage = d;
												break merge
											}
											m.realCurPage = m.target.length - m.showNum;
											m.realPrevPage = m.realCurPage - 1;
											for (var e = 0; e < f; e++) {
												var b = m.target.shift();
												m.content.appendChild(b);
												m.target.push(b)
											}
										}
									}
									m.plus += g;
									m.contentWrap[m.prop] -= g * m.step
								}
								if (h.merge) {
									j = (l - m.plus) * m.step
								} else {
									if (l + m.showNum > m.length) {
										l = m.length - m.showNum
									}
									j = l * m.step
								}
								var a = {};
								a[m.prop] = j;
								pc.end(m.contentWrap);
								pc.animate(m.contentWrap, a, m.config.animateTime, m.config.easing);
								if (h.merge) {
									pc.each(m.target, function(c) {
										pc.removeClass(c, h.curClass)
									});
									pc.addClass(m.target[m.realCurPage], h.curClass)
								}
							}
						}
					});
					var focus = pc.tab.focus = function(a) {
						return new pc.tab(pc.merge(focus.config, a))
					};
					focus.prototype = pc.tab.prototype;
					focus.config = {
						autoPlay: true,
						effect: "fade"
					};
					var marquee = pc.tab.marquee = function(a) {
						return new pc.tab(pc.merge(marquee.config, a))
					};
					marquee.prototype = pc.tab.prototype;
					marquee.config = {
						effect: "slide",
						easing: "linear",
						merge: "true",
						control: false,
						direction: "y",
						autoPlay: true
					};
					var tabScroll = pc.tab.scroll = function(a) {
						return new pc.tab(pc.merge(tabScroll.config, a))
					};
					tabScroll.prototype = pc.tab.prototype;
					tabScroll.config = {
						effect: "slide",
						merge: "true",
						control: false
					};
					
					
					
					window.onload = function() {
						new pc.tab({
							target: pc.getElems('#Jslide .c'),
							control: pc.getElems('#Jslide .toc')
						});
					}


			var smt = pc.getElem("#smt"),
				reset = pc.getElem("#reset"),
				reset2 = pc.getElem("#reset2");
			var cur_href = decodeURI(location.href);
			if (cur_href.indexOf('#') > -1) {
				var _http = cur_href.substring(0, cur_href.indexOf('#'));
			}
			var standard = {
				variables: {
					height: 0,
					weight: 0,
					gender: 0,
					age: 0,
					sport: 0,
					idealWeight: 0,
					bodyExponent: 0,
					bodyStatus: "",
					pulseRate: [0, 0],
					pulsePressure: [30, 40],
					beeStandard: 0,
					energyStandard: 0,
					gain: 0,
					loss: 0,
					popObj: null,
					tar: null,
					idx: null,
					tyId: null
				},
				testMe: function(idx) {
					this.variables.height = document.getElementById("Jheight").value;
					this.variables.weight = document.getElementById("Jweight").value;
					this.variables.age = document.getElementById("Jage").value;
					this.variables.gender = document.getElementById("Jgender").value;
					this.variables.sport = document.getElementById("Jsport").value;
					if (this.checkForm()) {
						// this.comput();
						window.location.href = '?s=' + (this.variables.gender == '0' ? 'g' : 'b') + '&' + this.variables
							.height + '_' + this.variables.weight + '_' + this.variables.age + '_' + this.variables
							.sport;
					} else {
						openDialog("请输入正确且真实的数值!");
					}
				},
				checkForm: function() {
					if (isNaN(this.variables.height) || isNaN(this.variables.weight) || isNaN(this.variables.gender) || (
							Number(this.variables.height) < 1 || Number(this.variables.height) > 400) || (Number(this
							.variables.weight) < 1 || Number(this.variables.weight) > 300) || isNaN(this.variables
						.age) || (Number(this.variables.age) < 1 || Number(this.variables.age) > 110) || isNaN(this
							.variables.sport)) {
						return false;
					}
					return true;
				},
				calculat: function(x) {
					return (Math.round(x * 100) / 100);
				},
				comput: function() {
					this.variables.bodyExponent = Math.round(this.variables.weight * 10000 / (this.variables.height *
						this.variables.height));
					this.variables.idealWeight = ((parseInt(this.variables.gender) == 1) ? (Math.round(50 + (2.3 * (this
						.variables.height - 152)) / 2.54)) : (Math.round(45.5 + (2.3 * (this.variables.height -
						152)) / 2.54)));
					if (this.variables.bodyExponent > 40) {
						this.variables.bodyStatus = "您体型严重肥胖";
					} else if (this.variables.bodyExponent > 30) {
						this.variables.bodyStatus = "您体型肥胖";
					} else if (this.variables.bodyExponent > 27) {
						this.variables.bodyStatus = "您体型偏胖";
					} else if (this.variables.bodyExponent > 22) {
						this.variables.bodyStatus = "您体型稍胖";
					} else if (this.variables.bodyExponent >= 21) {
						this.variables.bodyStatus = "您体型正常";
					} else if (this.variables.bodyExponent >= 18) {
						this.variables.bodyStatus = "您体型偏瘦";
					} else if (this.variables.bodyExponent >= 16) {
						this.variables.bodyStatus = "您体型较瘦";
					} else {
						this.variables.bodyStatus = "您体型严重消瘦";
					}
					// heart about
					if (this.variables.gender.toString() == "1") {
						if (this.variables.age >= 0 && this.variables.age <= 3) {
							this.variables.beeStandard = this.calculat(60.9 * this.variables.weight - 54);
						} else if (this.variables.age > 3 && this.variables.age <= 10) {
							this.variables.beeStandard = this.calculat(22.7 * this.variables.weight - 495);
						} else if (this.variables.age > 10 && this.variables.age <= 18) {
							this.variables.beeStandard = this.calculat(17.5 * this.variables.weight + 651);
						} else if (this.variables.age > 18 && this.variables.age <= 30) {
							this.variables.beeStandard = this.calculat(15.3 * this.variables.weight + 679);
						} else if (this.variables.age > 30 && this.variables.age <= 60) {
							this.variables.beeStandard = this.calculat(11.6 * this.variables.weight + 879);
						} else if (this.variables.age > 60) {
							this.variables.beeStandard = this.calculat(13.5 * this.variables.weight + 487);
						}
					} else {
						if (this.variables.age >= 0 && this.variables.age <= 3) {
							this.variables.beeStandard = this.calculat(61 * this.variables.weight - 51);
						} else if (this.variables.age > 3 && this.variables.age <= 10) {
							this.variables.beeStandard = this.calculat(22.5 * this.variables.weight + 499);
						} else if (this.variables.age > 10 && this.variables.age <= 18) {
							this.variables.beeStandard = this.calculat(12.2 * this.variables.weight + 746);
						} else if (this.variables.age > 18 && this.variables.age <= 30) {
							this.variables.beeStandard = this.calculat(14.7 * this.variables.weight + 496);
						} else if (this.variables.age > 30 && this.variables.age <= 60) {
							this.variables.beeStandard = this.calculat(8.7 * this.variables.weight + 829);
						} else if (this.variables.age > 60) {
							this.variables.beeStandard = this.calculat(10.5 * this.variables.weight + 596);
						}
					}
					if (this.variables.gender.toString() == "1") {
						switch (this.variables.sport.toString()) {
							case "0":
								this.variables.energyStandard = this.calculat(this.variables.beeStandard * 1.55);
								var low = this.variables.beeStandard * 1.55 + 500;
								var high = this.variables.beeStandard * 1.55 + 1000;
								this.variables.gain = this.calculat(low) + " ~ " + this.calculat(high);
								var low1 = this.variables.beeStandard * 1.55 - 1000;
								var high1 = this.variables.beeStandard * 1.55 - 500;
								this.variables.loss = this.calculat(low1) + " ~ " + this.calculat(high1);
								break;
							case "1":
								this.variables.energyStandard = this.calculat(this.variables.beeStandard * 1.78);
								var low = this.variables.beeStandard * 1.78 + 500;
								var high = this.variables.beeStandard * 1.78 + 1000;
								this.variables.gain = this.calculat(low) + " ~ " + this.calculat(high);
								var low1 = this.variables.beeStandard * 1.78 - 1000;
								var high1 = this.variables.beeStandard * 1.78 - 500;
								this.variables.loss = this.calculat(low1) + " ~ " + this.calculat(high1);
								break;
							case "2":
								this.variables.energyStandard = this.calculat(this.variables.beeStandard * 2.10);
								var low = this.variables.beeStandard * 2.10 + 500;
								var high = this.variables.beeStandard * 2.10 + 1000;
								this.variables.gain = this.calculat(low) + " ~ " + this.calculat(high);
								var low1 = this.variables.beeStandard * 2.10 - 1000;
								var high1 = this.variables.beeStandard * 2.10 - 500;
								this.variables.loss = this.calculat(low1) + " ~ " + this.calculat(high1);
								break;
						}
					} else {
						switch (this.variables.sport.toString()) {
							case "0":
								this.variables.energyStandard = this.calculat(this.variables.beeStandard * 1.56);
								var low = this.variables.beeStandard * 1.56 + 500;
								var high = this.variables.beeStandard * 1.56 + 1000;
								this.variables.gain = this.calculat(low) + " ~ " + this.calculat(high);
								var low1 = this.variables.beeStandard * 1.56 - 1000;
								var high1 = this.variables.beeStandard * 1.56 - 500;
								this.variables.loss = this.calculat(low1) + " ~ " + this.calculat(high1);
								break;
							case "1":
								this.variables.energyStandard = this.calculat(this.variables.beeStandard * 1.64);
								var low = this.variables.beeStandard * 1.64 + 500;
								var high = this.variables.beeStandard * 1.64 + 1000;
								this.variables.gain = this.calculat(low) + " ~ " + this.calculat(high);
								var low1 = this.variables.beeStandard * 1.64 - 1000;
								var high1 = this.variables.beeStandard * 1.64 - 500;
								this.variables.loss = this.calculat(low1) + " ~ " + this.calculat(high1);
								break;
							case "2":
								this.variables.energyStandard = this.calculat(this.variables.beeStandard * 1.82);
								var low = this.variables.beeStandard * 1.82 + 500;
								var high = this.variables.beeStandard * 1.82 + 1000;
								this.variables.gain = this.calculat(low) + " ~ " + this.calculat(high);
								var low1 = this.variables.beeStandard * 1.82 - 1000;
								var high1 = this.variables.beeStandard * 1.82 - 500;
								this.variables.loss = this.calculat(low1) + " ~ " + this.calculat(high1);
								break;
						}
					}
				},
				fill: function() {
					document.getElementById("idealWeightPanel").innerHTML = this.variables.idealWeight + "公斤";
					document.getElementById("bodyExponentPanel").innerHTML = this.variables.bodyExponent + "(21-22为最佳)";
					document.getElementById("bodyStatusPanel").innerHTML = this.variables.bodyStatus;
					document.getElementById("beePanel").innerHTML = this.variables.beeStandard + "卡路里/天";
					document.getElementById("energyPanel").innerHTML = this.variables.energyStandard + "卡路里/天";
					document.getElementById("gainPanel").innerHTML = this.variables.gain + "卡路里/天";
					document.getElementById("lossPanel").innerHTML = this.variables.loss + "卡路里/天";
				}
			};
			if (window.location.search && window.location.search.indexOf("?s=") != -1) {
				var a = window.location.search.substr(3).split("&"),
					d = a[1].split("_");
				a[0] == 'b' ? (document.getElementById("Jgender").value = '1') : (document.getElementById("Jgender").value =
				'0');
				document.getElementById("Jheight").value = d[0];
				document.getElementById("Jweight").value = d[1];
				document.getElementById("Jage").value = d[2];
				document.getElementById("Jsport").value = d[3];
				standard.variables.height = document.getElementById("Jheight").value;
				standard.variables.weight = document.getElementById("Jweight").value;
				standard.variables.age = document.getElementById("Jage").value;
				standard.variables.sport = document.getElementById("Jsport").value;
				standard.variables.gender = a[0] == 'b' ? '1' : '0';
				if (standard.checkForm()) {
					standard.comput();
					standard.fill();
					pc.show(pc.getElem("#result"));
					pc.hide(pc.getElem("#JTrBtn"));
					reset.onclick = function() {
						standard.testMe()
					}
					reset2.onclick = function() {
						window.location = cur_href.split("?")[0];
					}
				} else {
					openDialog("请输入正确且真实的数值!");
				}
			} else {
				smt.onclick = function() {
					if (!!_http) {
						window.location = _http + '?s=' + (standard.variables.gender == '0' ? 'g' : 'b') + '&' + standard
							.variables.height + '_' + standard.variables.weight + '_' + standard.variables.age + '_' +
							standard.variables.sport;
					} else {
						standard.testMe()
					}
				}
			}
