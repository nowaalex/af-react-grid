import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import { cx as _cx } from "emotion";
import { css as _css } from "emotion";

function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

import React, { forwardRef } from "react";
import { TypeContext } from "../contexts";

var containerBaseCss = /*#__PURE__*/_css(process.env.NODE_ENV === "production" ? {
  name: "1dsbrkv-containerBaseCss",
  styles: "display:flex;flex-wrap:nowrap;;label:containerBaseCss;"
} : {
  name: "1dsbrkv-containerBaseCss",
  styles: "display:flex;flex-wrap:nowrap;;label:containerBaseCss;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Db250YWluZXIvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBSzRCIiwiZmlsZSI6Ii4uLy4uL3NyYy9Db250YWluZXIvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBUeXBlQ29udGV4dCB9IGZyb20gXCIuLi9jb250ZXh0c1wiO1xuaW1wb3J0IHsgY3NzLCBjeCB9IGZyb20gXCJlbW90aW9uXCI7XG5cbmNvbnN0IGNvbnRhaW5lckJhc2VDc3MgPSBjc3NgXG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LXdyYXA6IG5vd3JhcDtcbmA7XG5cbmNvbnN0IGNvbENzcyA9IGN4KGNvbnRhaW5lckJhc2VDc3MsIGNzc2BmbGV4LWRpcmVjdGlvbjogY29sdW1uO2ApO1xuXG5jb25zdCByb3dDc3MgPSBjeChjb250YWluZXJCYXNlQ3NzLCBjc3NgZmxleC1kaXJlY3Rpb246IHJvdztgKTtcblxuXG5jb25zdCBDb250YWluZXIgPSBmb3J3YXJkUmVmKCh7IHR5cGUsIENvbXBvbmVudCA9IFwiZGl2XCIsIGNsYXNzTmFtZSwgLi4ucHJvcHMgfSwgcmVmICkgPT4gKFxuICAgIDxUeXBlQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17dHlwZX0+XG4gICAgICAgIDxDb21wb25lbnQgY2xhc3NOYW1lPXtjeCh0eXBlPT09XCJjb2xcIj9jb2xDc3M6cm93Q3NzLGNsYXNzTmFtZSl9IHsuLi5wcm9wc30gcmVmPXtyZWZ9IC8+XG4gICAgPC9UeXBlQ29udGV4dC5Qcm92aWRlcj5cbikpO1xuXG5leHBvcnQgZGVmYXVsdCBDb250YWluZXI7Il19 */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
});

var colCss = _cx(containerBaseCss, /*#__PURE__*/_css(process.env.NODE_ENV === "production" ? {
  name: "7rtuif-colCss",
  styles: "flex-direction:column;;label:colCss;"
} : {
  name: "7rtuif-colCss",
  styles: "flex-direction:column;;label:colCss;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Db250YWluZXIvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBVXVDIiwiZmlsZSI6Ii4uLy4uL3NyYy9Db250YWluZXIvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBUeXBlQ29udGV4dCB9IGZyb20gXCIuLi9jb250ZXh0c1wiO1xuaW1wb3J0IHsgY3NzLCBjeCB9IGZyb20gXCJlbW90aW9uXCI7XG5cbmNvbnN0IGNvbnRhaW5lckJhc2VDc3MgPSBjc3NgXG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LXdyYXA6IG5vd3JhcDtcbmA7XG5cbmNvbnN0IGNvbENzcyA9IGN4KGNvbnRhaW5lckJhc2VDc3MsIGNzc2BmbGV4LWRpcmVjdGlvbjogY29sdW1uO2ApO1xuXG5jb25zdCByb3dDc3MgPSBjeChjb250YWluZXJCYXNlQ3NzLCBjc3NgZmxleC1kaXJlY3Rpb246IHJvdztgKTtcblxuXG5jb25zdCBDb250YWluZXIgPSBmb3J3YXJkUmVmKCh7IHR5cGUsIENvbXBvbmVudCA9IFwiZGl2XCIsIGNsYXNzTmFtZSwgLi4ucHJvcHMgfSwgcmVmICkgPT4gKFxuICAgIDxUeXBlQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17dHlwZX0+XG4gICAgICAgIDxDb21wb25lbnQgY2xhc3NOYW1lPXtjeCh0eXBlPT09XCJjb2xcIj9jb2xDc3M6cm93Q3NzLGNsYXNzTmFtZSl9IHsuLi5wcm9wc30gcmVmPXtyZWZ9IC8+XG4gICAgPC9UeXBlQ29udGV4dC5Qcm92aWRlcj5cbikpO1xuXG5leHBvcnQgZGVmYXVsdCBDb250YWluZXI7Il19 */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
}));

var rowCss = _cx(containerBaseCss, /*#__PURE__*/_css(process.env.NODE_ENV === "production" ? {
  name: "10yfcpt-rowCss",
  styles: "flex-direction:row;;label:rowCss;"
} : {
  name: "10yfcpt-rowCss",
  styles: "flex-direction:row;;label:rowCss;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Db250YWluZXIvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBWXVDIiwiZmlsZSI6Ii4uLy4uL3NyYy9Db250YWluZXIvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBUeXBlQ29udGV4dCB9IGZyb20gXCIuLi9jb250ZXh0c1wiO1xuaW1wb3J0IHsgY3NzLCBjeCB9IGZyb20gXCJlbW90aW9uXCI7XG5cbmNvbnN0IGNvbnRhaW5lckJhc2VDc3MgPSBjc3NgXG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LXdyYXA6IG5vd3JhcDtcbmA7XG5cbmNvbnN0IGNvbENzcyA9IGN4KGNvbnRhaW5lckJhc2VDc3MsIGNzc2BmbGV4LWRpcmVjdGlvbjogY29sdW1uO2ApO1xuXG5jb25zdCByb3dDc3MgPSBjeChjb250YWluZXJCYXNlQ3NzLCBjc3NgZmxleC1kaXJlY3Rpb246IHJvdztgKTtcblxuXG5jb25zdCBDb250YWluZXIgPSBmb3J3YXJkUmVmKCh7IHR5cGUsIENvbXBvbmVudCA9IFwiZGl2XCIsIGNsYXNzTmFtZSwgLi4ucHJvcHMgfSwgcmVmICkgPT4gKFxuICAgIDxUeXBlQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17dHlwZX0+XG4gICAgICAgIDxDb21wb25lbnQgY2xhc3NOYW1lPXtjeCh0eXBlPT09XCJjb2xcIj9jb2xDc3M6cm93Q3NzLGNsYXNzTmFtZSl9IHsuLi5wcm9wc30gcmVmPXtyZWZ9IC8+XG4gICAgPC9UeXBlQ29udGV4dC5Qcm92aWRlcj5cbikpO1xuXG5leHBvcnQgZGVmYXVsdCBDb250YWluZXI7Il19 */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
}));

var Container = forwardRef(function (_ref, ref) {
  var type = _ref.type,
      _ref$Component = _ref.Component,
      Component = _ref$Component === void 0 ? "div" : _ref$Component,
      className = _ref.className,
      props = _objectWithoutPropertiesLoose(_ref, ["type", "Component", "className"]);

  return /*#__PURE__*/React.createElement(TypeContext.Provider, {
    value: type
  }, /*#__PURE__*/React.createElement(Component, _extends({
    className: _cx(type === "col" ? colCss : rowCss, className)
  }, props, {
    ref: ref
  })));
});
export default Container;