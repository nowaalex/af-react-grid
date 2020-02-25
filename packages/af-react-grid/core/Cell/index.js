import React, { cloneElement, useContext, useRef, useEffect, useMemo, useState, isValidElement } from "react";
import { RootContext, TypeContext } from "../contexts";
import { ByType, ElementRefProp } from "../constants";
var ADDITIONAL_INLINE_STYLES = {
  /* If exact width/height is known, flexBasis may be erased */
  flexBasis: "auto",

  /* We must take boxSizing into account to render borders, paddings, scrollbars, etc. */
  boxSizing: "border-box"
};

var useDefaultCellKey = function useDefaultCellKey() {
  var keyRef = useRef();

  if (!keyRef.current) {
    keyRef.current = Math.random().toString(36).slice(-7);
  }

  return keyRef.current;
};

var Cell = function Cell(_ref) {
  var _cloneElement;

  var SingleChild = _ref.children,
      cellKey = _ref.cellKey;

  if (!isValidElement(SingleChild)) {
    throw new Error("Cell must have one child");
  }

  var providedStyle = SingleChild.props.style;
  var cellRef = useRef();
  var GridModel = useContext(RootContext);
  var type = useContext(TypeContext);
  var defaultCellKey = useDefaultCellKey();
  var finalCellKey = cellKey || defaultCellKey;

  var _useState = useState(GridModel.get(finalCellKey)),
      curDimension = _useState[0],
      setCurDimension = _useState[1];

  useEffect(function () {
    var up = function up() {
      return setCurDimension(GridModel.get(finalCellKey));
    };

    var evt = "@cell/" + finalCellKey;
    GridModel.on(evt, up);
    return function () {
      GridModel.off(evt, up);
    };
  }, [finalCellKey]);
  useEffect(function () {
    GridModel.registerCell(finalCellKey, type, cellRef);
    return function () {
      GridModel.unregisterCell(finalCellKey);
    };
  }, [type, finalCellKey]);
  var style = useMemo(function () {
    var _Object$assign;

    if (curDimension === undefined) {
      return providedStyle;
    }

    return Object.assign({}, providedStyle, {}, ADDITIONAL_INLINE_STYLES, (_Object$assign = {}, _Object$assign[ByType[type].cssSizeProp] = curDimension, _Object$assign));
  }, [curDimension, providedStyle]);
  return cloneElement(SingleChild, (_cloneElement = {}, _cloneElement[ElementRefProp] = finalCellKey, _cloneElement.style = style, _cloneElement.ref = cellRef, _cloneElement));
};

export default Cell;