import {
  SpinnerIcon
} from "./chunk-SCL2UDTI.js";
import {
  Tooltip
} from "./chunk-JQFHN66G.js";
import {
  Ripple
} from "./chunk-DIIZMNB4.js";
import {
  ComponentBase
} from "./chunk-3OF4SY3G.js";
import {
  IconUtils,
  ObjectUtils,
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

// node_modules/primereact/button/button.esm.js
var React = __toESM(require_react());
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
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
var ButtonBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: "Button",
    badge: null,
    badgeClassName: null,
    className: null,
    children: void 0,
    disabled: false,
    icon: null,
    iconPos: "left",
    label: null,
    link: false,
    loading: false,
    loadingIcon: null,
    outlined: false,
    raised: false,
    rounded: false,
    severity: null,
    size: null,
    text: false,
    tooltip: null,
    tooltipOptions: null,
    visible: true
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
var Button = React.memo(React.forwardRef(function(inProps, ref) {
  var _classNames2;
  var context = React.useContext(PrimeReactContext);
  var props = ButtonBase.getProps(inProps, context);
  var _ButtonBase$setMetaDa = ButtonBase.setMetaData({
    props
  }), ptm = _ButtonBase$setMetaDa.ptm;
  var elementRef = React.useRef(ref);
  React.useEffect(function() {
    ObjectUtils.combinedRefs(elementRef, ref);
  }, [elementRef, ref]);
  if (props.visible === false) {
    return null;
  }
  var createIcon = function createIcon2() {
    var className2 = classNames("p-button-icon p-c", _defineProperty({}, "p-button-icon-".concat(props.iconPos), props.label));
    var iconsProps = mergeProps({
      className: className2
    }, ptm("icon"));
    className2 = classNames(className2, {
      "p-button-loading-icon": props.loading
    });
    var loadingIconProps = mergeProps({
      className: className2
    }, ptm("loadingIcon"));
    var icon2 = props.loading ? props.loadingIcon || React.createElement(SpinnerIcon, _extends({}, loadingIconProps, {
      spin: true
    })) : props.icon;
    return IconUtils.getJSXIcon(icon2, _objectSpread({}, iconsProps), {
      props
    });
  };
  var createLabel = function createLabel2() {
    if (props.label) {
      var labelProps = mergeProps({
        className: "p-button-label p-c"
      }, ptm("label"));
      return React.createElement("span", labelProps, props.label);
    }
    return !props.children && !props.label && React.createElement("span", {
      className: "p-button-label p-c",
      dangerouslySetInnerHTML: {
        __html: "&nbsp;"
      }
    });
  };
  var createBadge = function createBadge2() {
    if (props.badge) {
      var badgeClassName = classNames("p-badge", props.badgeClassName);
      var badgeProps = mergeProps({
        className: badgeClassName
      }, ptm("badge"));
      return React.createElement("span", badgeProps, props.badge);
    }
    return null;
  };
  var disabled = props.disabled || props.loading;
  var showTooltip = !disabled || props.tooltipOptions && props.tooltipOptions.showOnDisabled;
  var hasTooltip = ObjectUtils.isNotEmpty(props.tooltip) && showTooltip;
  var sizeMapping = {
    large: "lg",
    small: "sm"
  };
  var size = sizeMapping[props.size];
  var className = classNames("p-button p-component", props.className, (_classNames2 = {
    "p-button-icon-only": (props.icon || props.loading) && !props.label && !props.children,
    "p-button-vertical": (props.iconPos === "top" || props.iconPos === "bottom") && props.label,
    "p-disabled": disabled,
    "p-button-loading": props.loading,
    "p-button-outlined": props.outlined,
    "p-button-raised": props.raised,
    "p-button-link": props.link,
    "p-button-text": props.text,
    "p-button-rounded": props.rounded,
    "p-button-loading-label-only": props.loading && !props.icon && props.label
  }, _defineProperty(_classNames2, "p-button-loading-".concat(props.iconPos), props.loading && props.label), _defineProperty(_classNames2, "p-button-".concat(size), size), _defineProperty(_classNames2, "p-button-".concat(props.severity), props.severity), _classNames2));
  var icon = createIcon();
  var label = createLabel();
  var badge = createBadge();
  var defaultAriaLabel = props.label ? props.label + (props.badge ? " " + props.badge : "") : props["aria-label"];
  var rootProps = mergeProps({
    ref: elementRef,
    "aria-label": defaultAriaLabel,
    className,
    disabled
  }, ButtonBase.getOtherProps(props), ptm("root"));
  return React.createElement(React.Fragment, null, React.createElement("button", rootProps, icon, label, props.children, badge, React.createElement(Ripple, null)), hasTooltip && React.createElement(Tooltip, _extends({
    target: elementRef,
    content: props.tooltip
  }, props.tooltipOptions, {
    pt: ptm("tooltip")
  })));
}));
Button.displayName = "Button";

export {
  Button
};
//# sourceMappingURL=chunk-JBFFDV5M.js.map
