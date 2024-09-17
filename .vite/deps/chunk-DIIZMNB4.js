import {
  useMountEffect,
  useUnmountEffect,
  useUpdateEffect
} from "./chunk-3GBNDTYI.js";
import {
  DomHandler,
  PrimeReact,
  PrimeReactContext
} from "./chunk-54VBTCOV.js";
import {
  require_react
} from "./chunk-ZAUFE7H7.js";
import {
  __toESM
} from "./chunk-UXIASGQL.js";

// node_modules/primereact/ripple/ripple.esm.js
var React = __toESM(require_react());
var Ripple = React.memo(React.forwardRef(function() {
  var inkRef = React.useRef(null);
  var targetRef = React.useRef(null);
  var context = React.useContext(PrimeReactContext);
  var getTarget = function getTarget2() {
    return inkRef.current && inkRef.current.parentElement;
  };
  var bindEvents = function bindEvents2() {
    if (targetRef.current) {
      targetRef.current.addEventListener("mousedown", onMouseDown);
      DomHandler.isTouchDevice() && targetRef.current.addEventListener("touchstart", onTouchStart);
    }
  };
  var unbindEvents = function unbindEvents2() {
    if (targetRef.current) {
      targetRef.current.removeEventListener("mousedown", onMouseDown);
      DomHandler.isTouchDevice() && targetRef.current.removeEventListener("touchstart", onTouchStart);
    }
  };
  var onTouchStart = function onTouchStart2(event) {
    var offset = DomHandler.getOffset(targetRef.current);
    var offsetX = event.targetTouches[0].pageX - offset.left + document.body.scrollTop - DomHandler.getWidth(inkRef.current) / 2;
    var offsetY = event.targetTouches[0].pageY - offset.top + document.body.scrollLeft - DomHandler.getHeight(inkRef.current) / 2;
    activateRipple(offsetX, offsetY);
  };
  var onMouseDown = function onMouseDown2(event) {
    if (DomHandler.isTouchDevice()) {
      return;
    }
    var offset = DomHandler.getOffset(targetRef.current);
    var offsetX = event.pageX - offset.left + document.body.scrollTop - DomHandler.getWidth(inkRef.current) / 2;
    var offsetY = event.pageY - offset.top + document.body.scrollLeft - DomHandler.getHeight(inkRef.current) / 2;
    activateRipple(offsetX, offsetY);
  };
  var activateRipple = function activateRipple2(offsetX, offsetY) {
    if (!inkRef.current || getComputedStyle(inkRef.current, null).display === "none") {
      return;
    }
    DomHandler.removeClass(inkRef.current, "p-ink-active");
    setDimensions();
    inkRef.current.style.top = offsetY + "px";
    inkRef.current.style.left = offsetX + "px";
    DomHandler.addClass(inkRef.current, "p-ink-active");
  };
  var onAnimationEnd = function onAnimationEnd2(event) {
    DomHandler.removeClass(event.currentTarget, "p-ink-active");
  };
  var setDimensions = function setDimensions2() {
    if (inkRef.current && !DomHandler.getHeight(inkRef.current) && !DomHandler.getWidth(inkRef.current)) {
      var d = Math.max(DomHandler.getOuterWidth(targetRef.current), DomHandler.getOuterHeight(targetRef.current));
      inkRef.current.style.height = d + "px";
      inkRef.current.style.width = d + "px";
    }
  };
  useMountEffect(function() {
    if (inkRef.current) {
      targetRef.current = getTarget();
      setDimensions();
      bindEvents();
    }
  });
  useUpdateEffect(function() {
    if (inkRef.current && !targetRef.current) {
      targetRef.current = getTarget();
      setDimensions();
      bindEvents();
    }
  });
  useUnmountEffect(function() {
    if (inkRef.current) {
      targetRef.current = null;
      unbindEvents();
    }
  });
  return context && context.ripple || PrimeReact.ripple ? React.createElement("span", {
    role: "presentation",
    ref: inkRef,
    className: "p-ink",
    onAnimationEnd
  }) : null;
}));
Ripple.displayName = "Ripple";

export {
  Ripple
};
//# sourceMappingURL=chunk-DIIZMNB4.js.map
