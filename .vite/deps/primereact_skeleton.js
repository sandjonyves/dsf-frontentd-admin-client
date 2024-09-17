import {
  ComponentBase
} from "./chunk-3OF4SY3G.js";
import {
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

// node_modules/primereact/skeleton/skeleton.esm.js
var React = __toESM(require_react());
var SkeletonBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: "Skeleton",
    shape: "rectangle",
    size: null,
    width: "100%",
    height: "1rem",
    borderRadius: null,
    animation: "wave",
    style: null,
    className: null
  }
});
var Skeleton = React.memo(React.forwardRef(function(inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var props = SkeletonBase.getProps(inProps, context);
  var _SkeletonBase$setMeta = SkeletonBase.setMetaData({
    props
  }), ptm = _SkeletonBase$setMeta.ptm;
  var elementRef = React.useRef(null);
  var style = props.size ? {
    width: props.size,
    height: props.size,
    borderRadius: props.borderRadius
  } : {
    width: props.width,
    height: props.height,
    borderRadius: props.borderRadius
  };
  var className = classNames("p-skeleton p-component", {
    "p-skeleton-circle": props.shape === "circle",
    "p-skeleton-none": props.animation === "none"
  }, props.className);
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
    style
  }, SkeletonBase.getOtherProps(props), ptm("root"));
  return React.createElement("div", rootProps);
}));
Skeleton.displayName = "Skeleton";
export {
  Skeleton
};
//# sourceMappingURL=primereact_skeleton.js.map
