import {
  __publicField
} from "./chunk-EQCVQC35.js";

// node_modules/@hey-api/client-fetch/dist/index.js
var T = /\{[^{}]+\}/g;
var h = ({ allowReserved: n, name: i, value: e }) => {
  if (e == null) return "";
  if (typeof e == "object") throw new Error("Deeply-nested arrays/objects aren’t supported. Provide your own `querySerializer()` to handle these.");
  return `${i}=${n ? e : encodeURIComponent(e)}`;
};
var U = (n) => {
  switch (n) {
    case "label":
      return ".";
    case "matrix":
      return ";";
    case "simple":
      return ",";
    default:
      return "&";
  }
};
var $ = (n) => {
  switch (n) {
    case "form":
      return ",";
    case "pipeDelimited":
      return "|";
    case "spaceDelimited":
      return "%20";
    default:
      return ",";
  }
};
var D = (n) => {
  switch (n) {
    case "label":
      return ".";
    case "matrix":
      return ";";
    case "simple":
      return ",";
    default:
      return "&";
  }
};
var j = ({ allowReserved: n, explode: i, name: e, style: a, value: o }) => {
  if (!i) {
    let r = (n ? o : o.map((c) => encodeURIComponent(c))).join($(a));
    switch (a) {
      case "label":
        return `.${r}`;
      case "matrix":
        return `;${e}=${r}`;
      case "simple":
        return r;
      default:
        return `${e}=${r}`;
    }
  }
  let s = U(a), t = o.map((r) => a === "label" || a === "simple" ? n ? r : encodeURIComponent(r) : h({ allowReserved: n, name: e, value: r })).join(s);
  return a === "label" || a === "matrix" ? s + t : t;
};
var C = ({ allowReserved: n, explode: i, name: e, style: a, value: o }) => {
  if (o instanceof Date) return `${e}=${o.toISOString()}`;
  if (a !== "deepObject" && !i) {
    let r = [];
    Object.entries(o).forEach(([u, l]) => {
      r = [...r, u, n ? l : encodeURIComponent(l)];
    });
    let c = r.join(",");
    switch (a) {
      case "form":
        return `${e}=${c}`;
      case "label":
        return `.${c}`;
      case "matrix":
        return `;${e}=${c}`;
      default:
        return c;
    }
  }
  let s = D(a), t = Object.entries(o).map(([r, c]) => h({ allowReserved: n, name: a === "deepObject" ? `${e}[${r}]` : r, value: c })).join(s);
  return a === "label" || a === "matrix" ? s + t : t;
};
var _ = ({ path: n, url: i }) => {
  let e = i, a = i.match(T);
  if (a) for (let o of a) {
    let s = false, t = o.substring(1, o.length - 1), r = "simple";
    t.endsWith("*") && (s = true, t = t.substring(0, t.length - 1)), t.startsWith(".") ? (t = t.substring(1), r = "label") : t.startsWith(";") && (t = t.substring(1), r = "matrix");
    let c = n[t];
    if (c == null) continue;
    if (Array.isArray(c)) {
      e = e.replace(o, j({ explode: s, name: t, style: r, value: c }));
      continue;
    }
    if (typeof c == "object") {
      e = e.replace(o, C({ explode: s, name: t, style: r, value: c }));
      continue;
    }
    if (r === "matrix") {
      e = e.replace(o, `;${h({ name: t, value: c })}`);
      continue;
    }
    let u = encodeURIComponent(r === "label" ? `.${c}` : c);
    e = e.replace(o, u);
  }
  return e;
};
var b = ({ allowReserved: n, array: i, object: e } = {}) => (o) => {
  let s = [];
  if (o && typeof o == "object") for (let t in o) {
    let r = o[t];
    if (r != null) {
      if (Array.isArray(r)) {
        s = [...s, j({ allowReserved: n, explode: true, name: t, style: "form", value: r, ...i })];
        continue;
      }
      if (typeof r == "object") {
        s = [...s, C({ allowReserved: n, explode: true, name: t, style: "deepObject", value: r, ...e })];
        continue;
      }
      s = [...s, h({ allowReserved: n, name: t, value: r })];
    }
  }
  return s.join("&");
};
var A = (n) => {
  if (n) {
    if (n.startsWith("application/json") || n.endsWith("+json")) return "json";
    if (n === "multipart/form-data") return "formData";
    if (["application/", "audio/", "image/", "video/"].some((i) => n.startsWith(i))) return "blob";
    if (n.startsWith("text/")) return "text";
  }
};
var w = ({ baseUrl: n, path: i, query: e, querySerializer: a, url: o }) => {
  let s = o.startsWith("/") ? o : `/${o}`, t = n + s;
  i && (t = _({ path: i, url: t }));
  let r = e ? a(e) : "";
  return r.startsWith("?") && (r = r.substring(1)), r && (t += `?${r}`), t;
};
var R = (n, i) => {
  var _a;
  let e = { ...n, ...i };
  return ((_a = e.baseUrl) == null ? void 0 : _a.endsWith("/")) && (e.baseUrl = e.baseUrl.substring(0, e.baseUrl.length - 1)), e.headers = O(n.headers, i.headers), e;
};
var O = (...n) => {
  let i = new Headers();
  for (let e of n) {
    if (!e || typeof e != "object") continue;
    let a = e instanceof Headers ? e.entries() : Object.entries(e);
    for (let [o, s] of a) if (s === null) i.delete(o);
    else if (Array.isArray(s)) for (let t of s) i.append(o, t);
    else s !== void 0 && i.set(o, typeof s == "object" ? JSON.stringify(s) : s);
  }
  return i;
};
var y = class {
  constructor() {
    __publicField(this, "_fns");
    this._fns = [];
  }
  clear() {
    this._fns = [];
  }
  exists(i) {
    return this._fns.indexOf(i) !== -1;
  }
  eject(i) {
    let e = this._fns.indexOf(i);
    e !== -1 && (this._fns = [...this._fns.slice(0, e), ...this._fns.slice(e + 1)]);
  }
  use(i) {
    this._fns = [...this._fns, i];
  }
};
var P = () => ({ error: new y(), request: new y(), response: new y() });
var q = (n, i, e) => {
  typeof e == "string" || e instanceof Blob ? n.append(i, e) : n.append(i, JSON.stringify(e));
};
var k = { bodySerializer: (n) => {
  let i = new FormData();
  return Object.entries(n).forEach(([e, a]) => {
    a != null && (Array.isArray(a) ? a.forEach((o) => q(i, e, o)) : q(i, e, a));
  }), i;
} };
var E = { bodySerializer: (n) => JSON.stringify(n) };
var z = (n, i, e) => {
  typeof e == "string" ? n.append(i, e) : n.append(i, JSON.stringify(e));
};
var H = { bodySerializer: (n) => {
  let i = new URLSearchParams();
  return Object.entries(n).forEach(([e, a]) => {
    a != null && (Array.isArray(a) ? a.forEach((o) => z(i, e, o)) : z(i, e, a));
  }), i;
} };
var W = b({ allowReserved: false, array: { explode: true, style: "form" }, object: { explode: true, style: "deepObject" } });
var B = { "Content-Type": "application/json" };
var x = (n = {}) => ({ ...E, baseUrl: "", fetch: globalThis.fetch, headers: B, parseAs: "auto", querySerializer: W, ...n });
var J = (n = {}) => {
  let i = R(x(), n), e = () => ({ ...i }), a = (t) => (i = R(i, t), e()), o = P(), s = async (t) => {
    let r = { ...i, ...t, headers: O(i.headers, t.headers) };
    r.body && r.bodySerializer && (r.body = r.bodySerializer(r.body)), r.body || r.headers.delete("Content-Type");
    let c = w({ baseUrl: r.baseUrl ?? "", path: r.path, query: r.query, querySerializer: typeof r.querySerializer == "function" ? r.querySerializer : b(r.querySerializer), url: r.url }), u = { redirect: "follow", ...r }, l = new Request(c, u);
    for (let f of o.request._fns) l = await f(l, r);
    let I = r.fetch, p = await I(l);
    for (let f of o.response._fns) p = await f(p, l, r);
    let g = { request: l, response: p };
    if (p.ok) {
      if (p.status === 204 || p.headers.get("Content-Length") === "0") return { data: {}, ...g };
      if (r.parseAs === "stream") return { data: p.body, ...g };
      let f = (r.parseAs === "auto" ? A(p.headers.get("Content-Type")) : r.parseAs) ?? "json", S = await p[f]();
      return f === "json" && r.responseTransformer && (S = await r.responseTransformer(S)), { data: S, ...g };
    }
    let m = await p.text();
    try {
      m = JSON.parse(m);
    } catch {
    }
    let d = m;
    for (let f of o.error._fns) d = await f(m, p, l, r);
    if (d = d || {}, r.throwOnError) throw d;
    return { error: d, ...g };
  };
  return { connect: (t) => s({ ...t, method: "CONNECT" }), delete: (t) => s({ ...t, method: "DELETE" }), get: (t) => s({ ...t, method: "GET" }), getConfig: e, head: (t) => s({ ...t, method: "HEAD" }), interceptors: o, options: (t) => s({ ...t, method: "OPTIONS" }), patch: (t) => s({ ...t, method: "PATCH" }), post: (t) => s({ ...t, method: "POST" }), put: (t) => s({ ...t, method: "PUT" }), request: s, setConfig: a, trace: (t) => s({ ...t, method: "TRACE" }) };
};
export {
  J as createClient,
  x as createConfig,
  k as formDataBodySerializer,
  E as jsonBodySerializer,
  H as urlSearchParamsBodySerializer
};
//# sourceMappingURL=@hey-api_client-fetch.js.map
