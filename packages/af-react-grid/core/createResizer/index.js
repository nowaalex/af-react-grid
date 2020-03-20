import React, { useContext, useRef, memo, useCallback } from "react";
import { RootContext, TypeContext } from "../contexts";
import { DraggableCore } from "react-draggable";
import clamp from "lodash/clamp";
import { ByType, ElementRefProp } from "../constants";

var getCurMaxMin = function getCurMaxMin(element, containerType) {
  var _ByType$containerType = ByType[containerType],
      maxDim = _ByType$containerType.maxDim,
      minDim = _ByType$containerType.minDim,
      offsetDim = _ByType$containerType.offsetDim,
      clientDim = _ByType$containerType.clientDim,
      minProps = _ByType$containerType.minProps;
  var obj = getComputedStyle(element);
  var offsetDimValue = element[offsetDim];
  /*
      padding, border and scrollbar ignore width: 0 or height: 0. So we must add them to minProp.
      padding + border will ignore scrollbar dimensions, so calculting this way: offset - client + padding
  */

  var minDist = offsetDimValue - element[clientDim] + minProps.reduce(function (sum, propName) {
    return sum + parseFloat(obj["padding" + propName]);
  }, 0);
  return [offsetDimValue, minDist + (parseFloat(obj[minDim]) || 0), parseFloat(obj[maxDim]) || 0];
};

var setResizeLimits = function setResizeLimits(targetObj, el1, el2, containerType) {
  var _getCurMaxMin = getCurMaxMin(el1, containerType),
      cur1 = _getCurMaxMin[0],
      min1 = _getCurMaxMin[1],
      max1 = _getCurMaxMin[2];

  var _getCurMaxMin2 = getCurMaxMin(el2, containerType),
      cur2 = _getCurMaxMin2[0],
      min2 = _getCurMaxMin2[1],
      max2 = _getCurMaxMin2[2];

  var sum = cur1 + cur2;

  if (!max1) {
    max1 = sum - min2;
  }

  if (!max2) {
    max2 = sum - min1;
  }

  Object.assign(targetObj, {
    cur1: cur1,
    cur2: cur2,
    min1: min1,
    min2: min2,
    max1: max1,
    max2: max2
  });
};

var setExactSiblingsDimensions = function setExactSiblingsDimensions(GridModel, sibling, offsetDimensionProp) {
  for (var _iterator = sibling.parentNode.children, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var child = _ref;

    if (child.hasAttribute(ElementRefProp)) {
      GridModel.set(child.getAttribute(ElementRefProp), child[offsetDimensionProp]);
    }
  }
};

var createResizer = function createResizer(Component) {
  return memo(function (_ref2) {
    var disabled = _ref2.disabled;
    var MutableStore = useRef({}).current;
    var GridModel = useContext(RootContext);
    var containerType = useContext(TypeContext);
    var dragStartHandler = useCallback(function (e, _ref3) {
      var node = _ref3.node;
      var nextNode = node.previousElementSibling;
      var prevNode = node.nextElementSibling;

      if (nextNode && prevNode) {
        var _ByType$containerType2 = ByType[containerType],
            offsetDim = _ByType$containerType2.offsetDim,
            cursorProp = _ByType$containerType2.cursorProp;
        var id1 = MutableStore.id1 = prevNode.getAttribute(ElementRefProp);
        var id2 = MutableStore.id2 = nextNode.getAttribute(ElementRefProp);

        if (id1 && id2) {
          MutableStore.startOffset = e[cursorProp];
          setExactSiblingsDimensions(GridModel, node, offsetDim);
          setResizeLimits(MutableStore, prevNode, nextNode, containerType);
        } else {
          throw new Error("All child elements must render " + ElementRefProp + " property");
        }
      }
    }, []);
    var dragHandler = useCallback(function (e) {
      var id1 = MutableStore.id1,
          id2 = MutableStore.id2,
          cur1 = MutableStore.cur1,
          cur2 = MutableStore.cur2,
          startOffset = MutableStore.startOffset,
          min1 = MutableStore.min1,
          min2 = MutableStore.min2,
          max1 = MutableStore.max1,
          max2 = MutableStore.max2;
      var cursorProp = ByType[containerType].cursorProp;
      var delta = e[cursorProp] - startOffset;
      GridModel.set(id1, clamp(cur1 - delta, min1, max1));
      GridModel.set(id2, clamp(cur2 + delta, min2, max2));
    }, [containerType]);
    return /*#__PURE__*/React.createElement(DraggableCore, {
      onStart: dragStartHandler,
      onDrag: dragHandler,
      disabled: disabled
    }, /*#__PURE__*/React.createElement(Component, {
      type: containerType,
      disabled: disabled
    }));
  });
};

export default createResizer;