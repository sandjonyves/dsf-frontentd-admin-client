import {
  DomHandler,
  ObjectUtils,
  PrimeReact,
  PrimeReactContext
} from "./chunk-54VBTCOV.js";
import {
  require_react
} from "./chunk-ZAUFE7H7.js";
import {
  __toESM
} from "./chunk-UXIASGQL.js";

// node_modules/primereact/hooks/hooks.esm.js
var React = __toESM(require_react());
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i)
          return;
        _n = false;
      } else
        for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = true)
          ;
    } catch (err) {
      _d = true, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r))
          return;
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
var usePrevious = function usePrevious2(newValue) {
  var ref = React.useRef(void 0);
  React.useEffect(function() {
    ref.current = newValue;
  });
  return ref.current;
};
var useUnmountEffect = function useUnmountEffect2(fn) {
  return React.useEffect(function() {
    return fn;
  }, []);
};
var useEventListener = function useEventListener2(_ref) {
  var _ref$target = _ref.target, target = _ref$target === void 0 ? "document" : _ref$target, type = _ref.type, listener = _ref.listener, options = _ref.options, _ref$when = _ref.when, when = _ref$when === void 0 ? true : _ref$when;
  var targetRef = React.useRef(null);
  var listenerRef = React.useRef(null);
  var prevListener = usePrevious(listener);
  var prevOptions = usePrevious(options);
  var bind = function bind2() {
    var bindOptions = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (ObjectUtils.isNotEmpty(bindOptions.target)) {
      unbind();
      (bindOptions.when || when) && (targetRef.current = DomHandler.getTargetElement(bindOptions.target));
    }
    if (!listenerRef.current && targetRef.current) {
      listenerRef.current = function(event) {
        return listener && listener(event);
      };
      targetRef.current.addEventListener(type, listenerRef.current, options);
    }
  };
  var unbind = function unbind2() {
    if (listenerRef.current) {
      targetRef.current.removeEventListener(type, listenerRef.current, options);
      listenerRef.current = null;
    }
  };
  React.useEffect(function() {
    if (when) {
      targetRef.current = DomHandler.getTargetElement(target);
    } else {
      unbind();
      targetRef.current = null;
    }
  }, [target, when]);
  React.useEffect(function() {
    if (listenerRef.current && ("" + prevListener !== "" + listener || prevOptions !== options)) {
      unbind();
      when && bind();
    }
  }, [listener, options, when]);
  useUnmountEffect(function() {
    unbind();
  });
  return [bind, unbind];
};
var useTimeout = function useTimeout2(fn) {
  var delay = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  var when = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
  var timeout = React.useRef(null);
  var savedCallback = React.useRef(null);
  var clear = React.useCallback(function() {
    return clearTimeout(timeout.current);
  }, [timeout.current]);
  React.useEffect(function() {
    savedCallback.current = fn;
  });
  React.useEffect(function() {
    function callback() {
      savedCallback.current();
    }
    if (when) {
      timeout.current = setTimeout(callback, delay);
      return clear;
    } else {
      clear();
    }
  }, [delay, when]);
  useUnmountEffect(function() {
    clear();
  });
  return [clear];
};
var useMountEffect = function useMountEffect2(fn) {
  var mounted = React.useRef(false);
  return React.useEffect(function() {
    if (!mounted.current) {
      mounted.current = true;
      return fn && fn();
    }
    return;
  }, []);
};
var useOverlayScrollListener = function useOverlayScrollListener2(_ref) {
  var target = _ref.target, listener = _ref.listener, options = _ref.options, _ref$when = _ref.when, when = _ref$when === void 0 ? true : _ref$when;
  var targetRef = React.useRef(null);
  var listenerRef = React.useRef(null);
  var scrollableParents = React.useRef([]);
  var prevOptions = usePrevious(options);
  var context = React.useContext(PrimeReactContext);
  var bind = function bind2() {
    var bindOptions = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (ObjectUtils.isNotEmpty(bindOptions.target)) {
      unbind();
      (bindOptions.when || when) && (targetRef.current = DomHandler.getTargetElement(bindOptions.target));
    }
    if (!listenerRef.current && targetRef.current) {
      var nodes = scrollableParents.current = DomHandler.getScrollableParents(targetRef.current, context ? context.hideOverlaysOnDocumentScrolling : PrimeReact.hideOverlaysOnDocumentScrolling);
      listenerRef.current = function(event) {
        return listener && listener(event);
      };
      nodes.forEach(function(node) {
        return node.addEventListener("scroll", listenerRef.current, options);
      });
    }
  };
  var unbind = function unbind2() {
    if (listenerRef.current) {
      var nodes = scrollableParents.current;
      nodes.forEach(function(node) {
        return node.removeEventListener("scroll", listenerRef.current, options);
      });
      listenerRef.current = null;
    }
  };
  React.useEffect(function() {
    if (when) {
      targetRef.current = DomHandler.getTargetElement(target);
    } else {
      unbind();
      targetRef.current = null;
    }
  }, [target, when]);
  React.useEffect(function() {
    if (listenerRef.current && (listenerRef.current !== listener || prevOptions !== options)) {
      unbind();
      when && bind();
    }
  }, [listener, options]);
  useUnmountEffect(function() {
    unbind();
  });
  return [bind, unbind];
};
var useResizeListener = function useResizeListener2(_ref) {
  var listener = _ref.listener, _ref$when = _ref.when, when = _ref$when === void 0 ? true : _ref$when;
  return useEventListener({
    target: "window",
    type: "resize",
    listener,
    when
  });
};
var useOverlayListener = function useOverlayListener2(_ref) {
  var target = _ref.target, overlay = _ref.overlay, _listener = _ref.listener, _ref$when = _ref.when, when = _ref$when === void 0 ? true : _ref$when;
  var targetRef = React.useRef(null);
  var overlayRef = React.useRef(null);
  var _useEventListener = useEventListener({
    type: "click",
    listener: function listener(event) {
      _listener && _listener(event, {
        type: "outside",
        valid: event.which !== 3 && isOutsideClicked(event)
      });
    }
  }), _useEventListener2 = _slicedToArray(_useEventListener, 2), bindDocumentClickListener = _useEventListener2[0], unbindDocumentClickListener = _useEventListener2[1];
  var _useResizeListener = useResizeListener({
    listener: function listener(event) {
      _listener && _listener(event, {
        type: "resize",
        valid: !DomHandler.isTouchDevice()
      });
    }
  }), _useResizeListener2 = _slicedToArray(_useResizeListener, 2), bindWindowResizeListener = _useResizeListener2[0], unbindWindowResizeListener = _useResizeListener2[1];
  var _useEventListener3 = useEventListener({
    target: "window",
    type: "orientationchange",
    listener: function listener(event) {
      _listener && _listener(event, {
        type: "orientationchange",
        valid: true
      });
    }
  }), _useEventListener4 = _slicedToArray(_useEventListener3, 2), bindWindowOrientationChangeListener = _useEventListener4[0], unbindWindowOrientationChangeListener = _useEventListener4[1];
  var _useOverlayScrollList = useOverlayScrollListener({
    target,
    listener: function listener(event) {
      _listener && _listener(event, {
        type: "scroll",
        valid: true
      });
    }
  }), _useOverlayScrollList2 = _slicedToArray(_useOverlayScrollList, 2), bindOverlayScrollListener = _useOverlayScrollList2[0], unbindOverlayScrollListener = _useOverlayScrollList2[1];
  var isOutsideClicked = function isOutsideClicked2(event) {
    return targetRef.current && !(targetRef.current.isSameNode(event.target) || targetRef.current.contains(event.target) || overlayRef.current && overlayRef.current.contains(event.target));
  };
  var bind = function bind2() {
    bindDocumentClickListener();
    bindWindowResizeListener();
    bindWindowOrientationChangeListener();
    bindOverlayScrollListener();
  };
  var unbind = function unbind2() {
    unbindDocumentClickListener();
    unbindWindowResizeListener();
    unbindWindowOrientationChangeListener();
    unbindOverlayScrollListener();
  };
  React.useEffect(function() {
    if (when) {
      targetRef.current = DomHandler.getTargetElement(target);
      overlayRef.current = DomHandler.getTargetElement(overlay);
    } else {
      unbind();
      targetRef.current = overlayRef.current = null;
    }
  }, [target, overlay, when]);
  React.useEffect(function() {
    unbind();
  }, [when]);
  useUnmountEffect(function() {
    unbind();
  });
  return [bind, unbind];
};
var useUpdateEffect = function useUpdateEffect2(fn, deps) {
  var mounted = React.useRef(false);
  return React.useEffect(function() {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    return fn && fn();
  }, deps);
};

export {
  usePrevious,
  useUnmountEffect,
  useEventListener,
  useTimeout,
  useMountEffect,
  useOverlayScrollListener,
  useResizeListener,
  useOverlayListener,
  useUpdateEffect
};
//# sourceMappingURL=chunk-3GBNDTYI.js.map
