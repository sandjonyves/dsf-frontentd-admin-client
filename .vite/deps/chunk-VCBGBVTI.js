import {
  require_react_dom
} from "./chunk-DZXRV6RW.js";
import {
  useMountEffect,
  useUnmountEffect,
  useUpdateEffect
} from "./chunk-3GBNDTYI.js";
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

// node_modules/primereact/portal/portal.esm.js
var React = __toESM(require_react());
var import_react_dom = __toESM(require_react_dom());
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
var PortalBase = {
  defaultProps: {
    __TYPE: "Portal",
    element: null,
    appendTo: null,
    visible: false,
    onMounted: null,
    onUnmounted: null,
    children: void 0
  },
  getProps: function getProps(props) {
    return ObjectUtils.getMergedProps(props, PortalBase.defaultProps);
  },
  getOtherProps: function getOtherProps(props) {
    return ObjectUtils.getDiffProps(props, PortalBase.defaultProps);
  }
};
var Portal = React.memo(function(inProps) {
  var props = PortalBase.getProps(inProps);
  var context = React.useContext(PrimeReactContext);
  var _React$useState = React.useState(props.visible && DomHandler.hasDOM()), _React$useState2 = _slicedToArray(_React$useState, 2), mountedState = _React$useState2[0], setMountedState = _React$useState2[1];
  useMountEffect(function() {
    if (DomHandler.hasDOM() && !mountedState) {
      setMountedState(true);
      props.onMounted && props.onMounted();
    }
  });
  useUpdateEffect(function() {
    props.onMounted && props.onMounted();
  }, [mountedState]);
  useUnmountEffect(function() {
    props.onUnmounted && props.onUnmounted();
  });
  var element = props.element || props.children;
  if (element && mountedState) {
    var appendTo = props.appendTo || context && context.appendTo || PrimeReact.appendTo || document.body;
    return appendTo === "self" ? element : import_react_dom.default.createPortal(element, appendTo);
  }
  return null;
});
Portal.displayName = "Portal";

export {
  Portal
};
//# sourceMappingURL=chunk-VCBGBVTI.js.map
