import {c as createCommonjsModule}from'./_commonjsHelpers.js';import {r as react}from'./index3.js';import {r as reactDom_production_min,s as scheduler}from'./react-dom.production.min.js';import'./react.production.min.js';var reactDom = createCommonjsModule(function (module) {

function checkDCE() {
  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function') {
    return;
  }

  try {
    // Verify that the code above has been dead code eliminated (DCE'd).
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    // DevTools shouldn't crash React, no matter what.
    // We should still report in case we break this code.
    console.error(err);
  }
}

{
  // DCE check should happen before ReactDOM bundle executes so that
  // DevTools can report bad minification during injection.
  checkDCE();
  module.exports = reactDom_production_min;
}
});var reactDomTestUtils_production_min = createCommonjsModule(function (module) {

var g = Object.assign;

function p(a) {
  for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);

  return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}

var q = react.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
q.hasOwnProperty("ReactCurrentDispatcher") || (q.ReactCurrentDispatcher = {
  current: null
});
q.hasOwnProperty("ReactCurrentBatchConfig") || (q.ReactCurrentBatchConfig = {
  suspense: null
});

function r(a) {
  var b = a,
      c = a;
  if (a.alternate) for (; b.return;) b = b.return;else {
    a = b;

    do b = a, 0 !== (b.effectTag & 1026) && (c = b.return), a = b.return; while (a);
  }
  return 3 === b.tag ? c : null;
}

function t(a) {
  if (r(a) !== a) throw Error(p(188));
}

function u(a) {
  var b = a.alternate;

  if (!b) {
    b = r(a);
    if (null === b) throw Error(p(188));
    return b !== a ? null : a;
  }

  for (var c = a, e = b;;) {
    var d = c.return;
    if (null === d) break;
    var f = d.alternate;

    if (null === f) {
      e = d.return;

      if (null !== e) {
        c = e;
        continue;
      }

      break;
    }

    if (d.child === f.child) {
      for (f = d.child; f;) {
        if (f === c) return t(d), a;
        if (f === e) return t(d), b;
        f = f.sibling;
      }

      throw Error(p(188));
    }

    if (c.return !== e.return) c = d, e = f;else {
      for (var h = !1, l = d.child; l;) {
        if (l === c) {
          h = !0;
          c = d;
          e = f;
          break;
        }

        if (l === e) {
          h = !0;
          e = d;
          c = f;
          break;
        }

        l = l.sibling;
      }

      if (!h) {
        for (l = f.child; l;) {
          if (l === c) {
            h = !0;
            c = f;
            e = d;
            break;
          }

          if (l === e) {
            h = !0;
            e = f;
            c = d;
            break;
          }

          l = l.sibling;
        }

        if (!h) throw Error(p(189));
      }
    }
    if (c.alternate !== e) throw Error(p(190));
  }

  if (3 !== c.tag) throw Error(p(188));
  return c.stateNode.current === c ? a : b;
}

function v() {
  return !0;
}

function w() {
  return !1;
}

function x(a, b, c, e) {
  this.dispatchConfig = a;
  this._targetInst = b;
  this.nativeEvent = c;
  a = this.constructor.Interface;

  for (var d in a) a.hasOwnProperty(d) && ((b = a[d]) ? this[d] = b(c) : "target" === d ? this.target = e : this[d] = c[d]);

  this.isDefaultPrevented = (null != c.defaultPrevented ? c.defaultPrevented : !1 === c.returnValue) ? v : w;
  this.isPropagationStopped = w;
  return this;
}

g(x.prototype, {
  preventDefault: function () {
    this.defaultPrevented = !0;
    var a = this.nativeEvent;
    a && (a.preventDefault ? a.preventDefault() : "unknown" !== typeof a.returnValue && (a.returnValue = !1), this.isDefaultPrevented = v);
  },
  stopPropagation: function () {
    var a = this.nativeEvent;
    a && (a.stopPropagation ? a.stopPropagation() : "unknown" !== typeof a.cancelBubble && (a.cancelBubble = !0), this.isPropagationStopped = v);
  },
  persist: function () {
    this.isPersistent = v;
  },
  isPersistent: w,
  destructor: function () {
    var a = this.constructor.Interface,
        b;

    for (b in a) this[b] = null;

    this.nativeEvent = this._targetInst = this.dispatchConfig = null;
    this.isPropagationStopped = this.isDefaultPrevented = w;
    this._dispatchInstances = this._dispatchListeners = null;
  }
});
x.Interface = {
  type: null,
  target: null,
  currentTarget: function () {
    return null;
  },
  eventPhase: null,
  bubbles: null,
  cancelable: null,
  timeStamp: function (a) {
    return a.timeStamp || Date.now();
  },
  defaultPrevented: null,
  isTrusted: null
};

x.extend = function (a) {
  function b() {}

  function c() {
    return e.apply(this, arguments);
  }

  var e = this;
  b.prototype = e.prototype;
  var d = new b();
  g(d, c.prototype);
  c.prototype = d;
  c.prototype.constructor = c;
  c.Interface = g({}, e.Interface, a);
  c.extend = e.extend;
  y(c);
  return c;
};

y(x);

function z(a, b, c, e) {
  if (this.eventPool.length) {
    var d = this.eventPool.pop();
    this.call(d, a, b, c, e);
    return d;
  }

  return new this(a, b, c, e);
}

function A(a) {
  if (!(a instanceof this)) throw Error(p(279));
  a.destructor();
  10 > this.eventPool.length && this.eventPool.push(a);
}

function y(a) {
  a.eventPool = [];
  a.getPooled = z;
  a.release = A;
}

var B = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement);

function C(a, b) {
  var c = {};
  c[a.toLowerCase()] = b.toLowerCase();
  c["Webkit" + a] = "webkit" + b;
  c["Moz" + a] = "moz" + b;
  return c;
}

var D = {
  animationend: C("Animation", "AnimationEnd"),
  animationiteration: C("Animation", "AnimationIteration"),
  animationstart: C("Animation", "AnimationStart"),
  transitionend: C("Transition", "TransitionEnd")
},
    E = {},
    F = {};
B && (F = document.createElement("div").style, "AnimationEvent" in window || (delete D.animationend.animation, delete D.animationiteration.animation, delete D.animationstart.animation), "TransitionEvent" in window || delete D.transitionend.transition);

function G(a) {
  if (E[a]) return E[a];
  if (!D[a]) return a;
  var b = D[a],
      c;

  for (c in b) if (b.hasOwnProperty(c) && c in F) return E[a] = b[c];

  return a;
}

var H = G("animationend"),
    I = G("animationiteration"),
    J = G("animationstart"),
    aa = G("transitionend"),
    K = null;

function ba(a) {
  if (null === K) try {
    var b = ("require" + Math.random()).slice(0, 7);
    K = (module && module[b])("timers").setImmediate;
  } catch (c) {
    K = function (a) {
      var b = new MessageChannel();
      b.port1.onmessage = a;
      b.port2.postMessage(void 0);
    };
  }
  return K(a);
}

var L = reactDom.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Events,
    ca = L[11],
    M = L[12],
    da = reactDom.unstable_batchedUpdates,
    N = q.IsSomeRendererActing,
    O = "function" === typeof scheduler.unstable_flushAllWithoutAsserting,
    P = scheduler.unstable_flushAllWithoutAsserting || function () {
  for (var a = !1; ca();) a = !0;

  return a;
};

function Q(a) {
  try {
    P(), ba(function () {
      P() ? Q(a) : a();
    });
  } catch (b) {
    a(b);
  }
}

var R = 0,
    S = !1,
    ea = reactDom.findDOMNode,
    T = reactDom.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Events,
    fa = T[0],
    U = T[4],
    ha = T[5],
    ia = T[6],
    ja = T[7],
    ka = T[8],
    V = T[9],
    la = T[10];

function W() {}

function ma(a, b) {
  if (!a) return [];
  a = u(a);
  if (!a) return [];

  for (var c = a, e = [];;) {
    if (5 === c.tag || 6 === c.tag || 1 === c.tag || 0 === c.tag) {
      var d = c.stateNode;
      b(d) && e.push(d);
    }

    if (c.child) c.child.return = c, c = c.child;else {
      if (c === a) return e;

      for (; !c.sibling;) {
        if (!c.return || c.return === a) return e;
        c = c.return;
      }

      c.sibling.return = c.return;
      c = c.sibling;
    }
  }
}

function X(a, b) {
  if (a && !a._reactInternalFiber) {
    var c = "" + a;
    a = Array.isArray(a) ? "an array" : a && 1 === a.nodeType && a.tagName ? "a DOM node" : "[object Object]" === c ? "object with keys {" + Object.keys(a).join(", ") + "}" : c;
    throw Error(p(286, b, a));
  }
}

var Y = {
  renderIntoDocument: function (a) {
    var b = document.createElement("div");
    return reactDom.render(a, b);
  },
  isElement: function (a) {
    return react.isValidElement(a);
  },
  isElementOfType: function (a, b) {
    return react.isValidElement(a) && a.type === b;
  },
  isDOMComponent: function (a) {
    return !(!a || 1 !== a.nodeType || !a.tagName);
  },
  isDOMComponentElement: function (a) {
    return !!(a && react.isValidElement(a) && a.tagName);
  },
  isCompositeComponent: function (a) {
    return Y.isDOMComponent(a) ? !1 : null != a && "function" === typeof a.render && "function" === typeof a.setState;
  },
  isCompositeComponentWithType: function (a, b) {
    return Y.isCompositeComponent(a) ? a._reactInternalFiber.type === b : !1;
  },
  findAllInRenderedTree: function (a, b) {
    X(a, "findAllInRenderedTree");
    return a ? ma(a._reactInternalFiber, b) : [];
  },
  scryRenderedDOMComponentsWithClass: function (a, b) {
    X(a, "scryRenderedDOMComponentsWithClass");
    return Y.findAllInRenderedTree(a, function (a) {
      if (Y.isDOMComponent(a)) {
        var c = a.className;
        "string" !== typeof c && (c = a.getAttribute("class") || "");
        var d = c.split(/\s+/);

        if (!Array.isArray(b)) {
          if (void 0 === b) throw Error(p(11));
          b = b.split(/\s+/);
        }

        return b.every(function (a) {
          return -1 !== d.indexOf(a);
        });
      }

      return !1;
    });
  },
  findRenderedDOMComponentWithClass: function (a, b) {
    X(a, "findRenderedDOMComponentWithClass");
    a = Y.scryRenderedDOMComponentsWithClass(a, b);
    if (1 !== a.length) throw Error("Did not find exactly one match (found: " + a.length + ") for class:" + b);
    return a[0];
  },
  scryRenderedDOMComponentsWithTag: function (a, b) {
    X(a, "scryRenderedDOMComponentsWithTag");
    return Y.findAllInRenderedTree(a, function (a) {
      return Y.isDOMComponent(a) && a.tagName.toUpperCase() === b.toUpperCase();
    });
  },
  findRenderedDOMComponentWithTag: function (a, b) {
    X(a, "findRenderedDOMComponentWithTag");
    a = Y.scryRenderedDOMComponentsWithTag(a, b);
    if (1 !== a.length) throw Error("Did not find exactly one match (found: " + a.length + ") for tag:" + b);
    return a[0];
  },
  scryRenderedComponentsWithType: function (a, b) {
    X(a, "scryRenderedComponentsWithType");
    return Y.findAllInRenderedTree(a, function (a) {
      return Y.isCompositeComponentWithType(a, b);
    });
  },
  findRenderedComponentWithType: function (a, b) {
    X(a, "findRenderedComponentWithType");
    a = Y.scryRenderedComponentsWithType(a, b);
    if (1 !== a.length) throw Error("Did not find exactly one match (found: " + a.length + ") for componentType:" + b);
    return a[0];
  },
  mockComponent: function (a, b) {
    b = b || a.mockTagName || "div";
    a.prototype.render.mockImplementation(function () {
      return react.createElement(b, null, this.props.children);
    });
    return this;
  },
  nativeTouchData: function (a, b) {
    return {
      touches: [{
        pageX: a,
        pageY: b
      }]
    };
  },
  Simulate: null,
  SimulateNative: {},
  act: function (a) {
    function b() {
      R--;
      N.current = c;
      M.current = e;
    }

    !1 === S && (S = !0, console.error("act(...) is not supported in production builds of React, and might not behave as expected."));
    R++;
    var c = N.current;
    var e = M.current;
    N.current = !0;
    M.current = !0;

    try {
      var d = da(a);
    } catch (f) {
      throw b(), f;
    }

    if (null !== d && "object" === typeof d && "function" === typeof d.then) return {
      then: function (a, e) {
        d.then(function () {
          1 < R || !0 === O && !0 === c ? (b(), a()) : Q(function (c) {
            b();
            c ? e(c) : a();
          });
        }, function (a) {
          b();
          e(a);
        });
      }
    };

    try {
      1 !== R || !1 !== O && !1 !== c || P(), b();
    } catch (f) {
      throw b(), f;
    }

    return {
      then: function (a) {
        a();
      }
    };
  }
};

function na(a) {
  return function (b, c) {
    if (react.isValidElement(b)) throw Error(p(228));
    if (Y.isCompositeComponent(b)) throw Error(p(229));
    var e = U[a],
        d = new W();
    d.target = b;
    d.type = a.toLowerCase();
    var f = fa(b),
        h = new x(e, f, d, b);
    h.persist();
    g(h, c);
    e.phasedRegistrationNames ? ha(h) : ia(h);
    reactDom.unstable_batchedUpdates(function () {
      ja(b);
      la(h);
    });
    ka();
  };
}

Y.Simulate = {};

for (var Z in U) Y.Simulate[Z] = na(Z);

function oa(a, b) {
  return function (c, e) {
    var d = new W(a);
    g(d, e);
    Y.isDOMComponent(c) ? (c = ea(c), d.target = c, V(b, 1, document, d)) : c.tagName && (d.target = c, V(b, 1, document, d));
  };
}

[["abort", "abort"], [H, "animationEnd"], [I, "animationIteration"], [J, "animationStart"], ["blur", "blur"], ["canplaythrough", "canPlayThrough"], ["canplay", "canPlay"], ["cancel", "cancel"], ["change", "change"], ["click", "click"], ["close", "close"], ["compositionend", "compositionEnd"], ["compositionstart", "compositionStart"], ["compositionupdate", "compositionUpdate"], ["contextmenu", "contextMenu"], ["copy", "copy"], ["cut", "cut"], ["dblclick", "doubleClick"], ["dragend", "dragEnd"], ["dragenter", "dragEnter"], ["dragexit", "dragExit"], ["dragleave", "dragLeave"], ["dragover", "dragOver"], ["dragstart", "dragStart"], ["drag", "drag"], ["drop", "drop"], ["durationchange", "durationChange"], ["emptied", "emptied"], ["encrypted", "encrypted"], ["ended", "ended"], ["error", "error"], ["focus", "focus"], ["input", "input"], ["keydown", "keyDown"], ["keypress", "keyPress"], ["keyup", "keyUp"], ["loadstart", "loadStart"], ["loadstart", "loadStart"], ["load", "load"], ["loadeddata", "loadedData"], ["loadedmetadata", "loadedMetadata"], ["mousedown", "mouseDown"], ["mousemove", "mouseMove"], ["mouseout", "mouseOut"], ["mouseover", "mouseOver"], ["mouseup", "mouseUp"], ["paste", "paste"], ["pause", "pause"], ["play", "play"], ["playing", "playing"], ["progress", "progress"], ["ratechange", "rateChange"], ["scroll", "scroll"], ["seeked", "seeked"], ["seeking", "seeking"], ["selectionchange", "selectionChange"], ["stalled", "stalled"], ["suspend", "suspend"], ["textInput", "textInput"], ["timeupdate", "timeUpdate"], ["toggle", "toggle"], ["touchcancel", "touchCancel"], ["touchend", "touchEnd"], ["touchmove", "touchMove"], ["touchstart", "touchStart"], [aa, "transitionEnd"], ["volumechange", "volumeChange"], ["waiting", "waiting"], ["wheel", "wheel"]].forEach(function (a) {
  var b = a[1];
  Y.SimulateNative[b] = oa(b, a[0]);
});
module.exports = Y.default || Y;
});var testUtils = createCommonjsModule(function (module) {

{
  module.exports = reactDomTestUtils_production_min;
}
});export default testUtils;