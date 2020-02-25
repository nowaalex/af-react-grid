import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React, { useRef, useEffect } from "react";
import EventEmitter from "eventemitter3";
import { RootContext } from "../contexts";
import { ByType } from "../constants";

var CellDimensions =
/*#__PURE__*/
function (_EventEmitter) {
  _inheritsLoose(CellDimensions, _EventEmitter);

  function CellDimensions() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _EventEmitter.call.apply(_EventEmitter, [this].concat(args)) || this;
    _this.Dimensions = {};
    _this.Cells = new Map();
    return _this;
  }

  var _proto = CellDimensions.prototype;

  _proto.get = function get(id) {
    return this.Dimensions[id];
  };

  _proto.set = function set(id, dimension) {
    if (this.Dimensions[id] !== dimension) {
      this.Dimensions[id] = dimension;
      this.emit("@cell/" + id);
    }
  };

  _proto.registerCell = function registerCell(id, type, ref) {
    this.Cells.set(id, {
      type: type,
      ref: ref
    });
  };

  _proto.unregisterCell = function unregisterCell(id) {
    this.Cells["delete"](id);
  };

  _proto.fixDimensions = function fixDimensions() {
    for (var _iterator = this.Cells, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var _ref3 = _ref,
          id = _ref3[0],
          _ref3$ = _ref3[1],
          type = _ref3$.type,
          ref = _ref3$.ref;
      var offsetDim = ByType[type].offsetDim;
      this.Dimensions[id] = ref.current[offsetDim];
    }

    for (var _iterator2 = this.Cells, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref2 = _i2.value;
      }

      var _ref4 = _ref2,
          _id = _ref4[0];
      this.emit("@cell/" + _id);
    }
  };

  return CellDimensions;
}(EventEmitter);

var GridRoot = function GridRoot(_ref5) {
  var children = _ref5.children,
      _ref5$fixDimensionsDe = _ref5.fixDimensionsDelay,
      fixDimensionsDelay = _ref5$fixDimensionsDe === void 0 ? -1 : _ref5$fixDimensionsDe;
  var modelRef = useRef();

  if (!modelRef.current) {
    modelRef.current = new CellDimensions();
  }

  useEffect(function () {
    if (fixDimensionsDelay >= 0) {
      var timer = setTimeout(function () {
        modelRef.current.fixDimensions();
      }, fixDimensionsDelay);
      return function () {
        clearTimeout(timer);
      };
    }
  }, [fixDimensionsDelay]);
  return React.createElement(RootContext.Provider, {
    value: modelRef.current
  }, children);
};

export default GridRoot;