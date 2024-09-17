import {
  ObjectUtils,
  PrimeReact
} from "./chunk-54VBTCOV.js";

// node_modules/primereact/componentbase/componentbase.esm.js
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
var ComponentBase = {
  defaultProps: {
    pt: void 0
  },
  context: void 0,
  extend: function extend() {
    var props = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var defaultProps = _objectSpread(_objectSpread({}, props.defaultProps), ComponentBase.defaultProps);
    var getProps = function getProps2(props2) {
      var context = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      ComponentBase.context = context;
      return ObjectUtils.getMergedProps(props2, defaultProps);
    };
    var getOtherProps = function getOtherProps2(props2) {
      return ObjectUtils.getDiffProps(props2, defaultProps);
    };
    var getOptionValue = function getOptionValue2() {
      var obj = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      var key = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
      var params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      var fKeys = String(ObjectUtils.convertToFlatCase(key)).split(".");
      var fKey = fKeys.shift();
      var matchedPTOption = Object.keys(obj).find(function(k) {
        return ObjectUtils.convertToFlatCase(k) === fKey;
      }) || "";
      return fKey ? ObjectUtils.isObject(obj) ? getOptionValue2(ObjectUtils.getJSXElement(obj[matchedPTOption], params), fKeys.join("."), params) : void 0 : ObjectUtils.getJSXElement(obj, params);
    };
    var getPTValue = function getPTValue2() {
      var obj = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      var key = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
      var params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      var datasetPrefix = "data-pc-";
      var componentName = params.props && params.props.__TYPE && ObjectUtils.convertToFlatCase(params.props.__TYPE) || "";
      var pt = ComponentBase.context.pt || PrimeReact.pt || {};
      var defaultPT = function defaultPT2(key2) {
        return pt && getOptionValue(pt[componentName], key2);
      };
      var self = ObjectUtils.getPropValue(obj, key, params)[key];
      var globalPT = defaultPT(key);
      var datasetProps = _objectSpread(_objectSpread({}, key === "root" && _defineProperty({}, "".concat(datasetPrefix, "name"), componentName)), {}, _defineProperty({}, "".concat(datasetPrefix, "section"), ObjectUtils.convertToFlatCase(key)));
      var merged = _objectSpread({}, ObjectUtils.getMergedProps(globalPT, self));
      if (Object.keys(datasetProps).length) {
        merged = _objectSpread(_objectSpread({}, merged), datasetProps);
      }
      return merged;
    };
    var setMetaData = function setMetaData2() {
      var metadata = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      var ptm = function ptm2() {
        var key = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
        var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        return ptmo((metadata.props || {}).pt, key, _objectSpread(_objectSpread({}, metadata), params));
      };
      var ptmo = function ptmo2() {
        var obj = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var key = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
        var params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        return getPTValue(obj, key, params);
      };
      return {
        ptm,
        ptmo
      };
    };
    return _objectSpread(_objectSpread({
      getProps,
      getOtherProps,
      setMetaData
    }, props), {}, {
      defaultProps
    });
  }
};

export {
  ComponentBase
};
//# sourceMappingURL=chunk-3OF4SY3G.js.map
