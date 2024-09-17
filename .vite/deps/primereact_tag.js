import {
  ComponentBase
} from "./chunk-3OF4SY3G.js";
import {
  IconUtils,
  PrimeReactContext,
  classNames,
  mergeProps
} from "./chunk-54VBTCOV.js";
import {
  require_react
} from "./chunk-ZAUFE7H7.js";
import {
  __toESM
} from "./chunk-UXIASGQL.js";

// node_modules/primereact/tag/tag.esm.js
var React = __toESM(require_react());
function _typeof(obj) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof(obj);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
var TagBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: "Tag",
    value: null,
    severity: null,
    rounded: false,
    icon: null,
    style: null,
    className: null,
    children: void 0
  }
});
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
var Tag = React.forwardRef(function(inProps, ref) {
  var _classNames;
  var context = React.useContext(PrimeReactContext);
  var props = TagBase.getProps(inProps, context);
  var _TagBase$setMetaData = TagBase.setMetaData({
    props
  }), ptm = _TagBase$setMetaData.ptm;
  var elementRef = React.useRef(null);
  var className = classNames("p-tag p-component", (_classNames = {}, _defineProperty(_classNames, "p-tag-".concat(props.severity), props.severity !== null), _defineProperty(_classNames, "p-tag-rounded", props.rounded), _classNames), props.className);
  var iconProps = mergeProps({
    className: "p-tag-icon"
  }, ptm("icon"));
  var icon = IconUtils.getJSXIcon(props.icon, _objectSpread({}, iconProps), {
    props
  });
  React.useImperativeHandle(ref, function() {
    return {
      props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  var rootProps = mergeProps({
    ref: elementRef,
    className,
    style: props.style
  }, TagBase.getOtherProps(props), ptm("root"));
  var valueProps = mergeProps({
    className: "p-tag-value"
  }, ptm("value"));
  return React.createElement("span", rootProps, icon, React.createElement("span", valueProps, props.value), React.createElement("span", null, props.children));
});
Tag.displayName = "Tag";
export {
  Tag
};
//# sourceMappingURL=primereact_tag.js.map
