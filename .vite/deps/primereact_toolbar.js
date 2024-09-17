import {
  ComponentBase
} from "./chunk-3OF4SY3G.js";
import {
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

// node_modules/primereact/toolbar/toolbar.esm.js
var React = __toESM(require_react());
var ToolbarBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: "Toolbar",
    id: null,
    style: null,
    className: null,
    left: null,
    right: null,
    start: null,
    center: null,
    end: null,
    children: void 0
  }
});
var Toolbar = React.memo(React.forwardRef(function(inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var props = ToolbarBase.getProps(inProps, context);
  var elementRef = React.useRef(null);
  var start = ObjectUtils.getJSXElement(props.left || props.start, props);
  var center = ObjectUtils.getJSXElement(props.center, props);
  var end = ObjectUtils.getJSXElement(props.right || props.end, props);
  var _ToolbarBase$setMetaD = ToolbarBase.setMetaData({
    props
  }), ptm = _ToolbarBase$setMetaD.ptm;
  React.useImperativeHandle(ref, function() {
    return {
      props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  var startProps = mergeProps({
    className: "p-toolbar-group-start p-toolbar-group-left"
  }, ptm("start"));
  var centerProps = mergeProps({
    className: "p-toolbar-group-center"
  }, ptm("center"));
  var endProps = mergeProps({
    className: "p-toolbar-group-end p-toolbar-group-right"
  }, ptm("end"));
  var rootProps = mergeProps({
    id: props.id,
    ref: elementRef,
    style: props.style,
    className: classNames("p-toolbar p-component", props.className),
    role: "toolbar"
  }, ToolbarBase.getOtherProps(props), ptm("root"));
  return React.createElement("div", rootProps, React.createElement("div", startProps, start), React.createElement("div", centerProps, center), React.createElement("div", endProps, end));
}));
Toolbar.displayName = "Toolbar";
export {
  Toolbar
};
//# sourceMappingURL=primereact_toolbar.js.map
