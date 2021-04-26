/** @license React v17.0.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var b = 60103,
    c = 60106,
    d = 60107,
    e = 60108,
    f = 60114,
    g = 60109,
    h = 60110,
    k = 60112,
    l = 60113,
    m = 60120,
    n = 60115,
    p = 60116,
    q = 60121,
    r = 60122,
    u = 60117,
    v = 60129,
    w = 60131;

if ("function" === typeof Symbol && Symbol.for) {
  var x = Symbol.for;
  b = x("react.element");
  c = x("react.portal");
  d = x("react.fragment");
  e = x("react.strict_mode");
  f = x("react.profiler");
  g = x("react.provider");
  h = x("react.context");
  k = x("react.forward_ref");
  l = x("react.suspense");
  m = x("react.suspense_list");
  n = x("react.memo");
  p = x("react.lazy");
  q = x("react.block");
  r = x("react.server.block");
  u = x("react.fundamental");
  v = x("react.debug_trace_mode");
  w = x("react.legacy_hidden");
}

function y(a) {
  if ("object" === typeof a && null !== a) {
    var t = a.$$typeof;

    switch (t) {
      case b:
        switch (a = a.type, a) {
          case d:
          case f:
          case e:
          case l:
          case m:
            return a;

          default:
            switch (a = a && a.$$typeof, a) {
              case h:
              case k:
              case p:
              case n:
              case g:
                return a;

              default:
                return t;
            }

        }

      case c:
        return t;
    }
  }
}

var z = g,
    A = b,
    B = k,
    C = d,
    D = p,
    E = n,
    F = c,
    G = f,
    H = e,
    I = l;
var ContextConsumer$1 = h;
var ContextProvider$1 = z;
var Element$1 = A;
var ForwardRef$1 = B;
var Fragment$1 = C;
var Lazy$1 = D;
var Memo$1 = E;
var Portal$1 = F;
var Profiler$1 = G;
var StrictMode$1 = H;
var Suspense$1 = I;

var isAsyncMode$1 = function () {
  return !1;
};

var isConcurrentMode$1 = function () {
  return !1;
};

var isContextConsumer$1 = function (a) {
  return y(a) === h;
};

var isContextProvider$1 = function (a) {
  return y(a) === g;
};

var isElement$1 = function (a) {
  return "object" === typeof a && null !== a && a.$$typeof === b;
};

var isForwardRef$1 = function (a) {
  return y(a) === k;
};

var isFragment$1 = function (a) {
  return y(a) === d;
};

var isLazy$1 = function (a) {
  return y(a) === p;
};

var isMemo$1 = function (a) {
  return y(a) === n;
};

var isPortal$1 = function (a) {
  return y(a) === c;
};

var isProfiler$1 = function (a) {
  return y(a) === f;
};

var isStrictMode$1 = function (a) {
  return y(a) === e;
};

var isSuspense$1 = function (a) {
  return y(a) === l;
};

var isValidElementType$1 = function (a) {
  return "string" === typeof a || "function" === typeof a || a === d || a === f || a === v || a === e || a === l || a === m || a === w || "object" === typeof a && null !== a && (a.$$typeof === p || a.$$typeof === n || a.$$typeof === g || a.$$typeof === h || a.$$typeof === k || a.$$typeof === u || a.$$typeof === q || a[0] === r) ? !0 : !1;
};

var typeOf$1 = y;

var reactIs_production_min = {
	ContextConsumer: ContextConsumer$1,
	ContextProvider: ContextProvider$1,
	Element: Element$1,
	ForwardRef: ForwardRef$1,
	Fragment: Fragment$1,
	Lazy: Lazy$1,
	Memo: Memo$1,
	Portal: Portal$1,
	Profiler: Profiler$1,
	StrictMode: StrictMode$1,
	Suspense: Suspense$1,
	isAsyncMode: isAsyncMode$1,
	isConcurrentMode: isConcurrentMode$1,
	isContextConsumer: isContextConsumer$1,
	isContextProvider: isContextProvider$1,
	isElement: isElement$1,
	isForwardRef: isForwardRef$1,
	isFragment: isFragment$1,
	isLazy: isLazy$1,
	isMemo: isMemo$1,
	isPortal: isPortal$1,
	isProfiler: isProfiler$1,
	isStrictMode: isStrictMode$1,
	isSuspense: isSuspense$1,
	isValidElementType: isValidElementType$1,
	typeOf: typeOf$1
};const {
  ContextConsumer,
  ContextProvider,
  Element,
  ForwardRef,
  Fragment,
  Lazy,
  Memo,
  Portal,
  Profiler,
  StrictMode,
  Suspense,
  isAsyncMode,
  isConcurrentMode,
  isContextConsumer,
  isContextProvider,
  isElement,
  isForwardRef,
  isFragment,
  isLazy,
  isMemo,
  isPortal,
  isProfiler,
  isStrictMode,
  isSuspense,
  isValidElementType,
  typeOf
} = reactIs_production_min;export default reactIs_production_min;export{ContextConsumer,ContextProvider,Element,ForwardRef,Fragment,Lazy,Memo,Portal,Profiler,StrictMode,Suspense,isAsyncMode,isConcurrentMode,isContextConsumer,isContextProvider,isElement,isForwardRef,isFragment,isLazy,isMemo,isPortal,isProfiler,isStrictMode,isSuspense,isValidElementType,typeOf};