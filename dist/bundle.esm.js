import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { DraggableCore } from 'react-draggable';
import ReactDOM from 'react-dom';
import cn from 'classnames';

var Resizer = React.memo(function (_ref) {
  var className = _ref.className,
      type = _ref.type,
      style = _ref.style,
      index = _ref.index,
      onDrag = _ref.onDrag,
      onStart = _ref.onStart,
      disabled = _ref.disabled,
      children = _ref.children;
  return React.createElement(DraggableCore, {
    onStart: onStart,
    onDrag: onDrag,
    disabled: disabled
  }, React.createElement("div", {
    "data-resizer-index": index,
    "data-resizer-type": type,
    className: className,
    style: style,
    children: children
  }));
});
Resizer.propTypes = {
  type: PropTypes.oneOf(["row", "col"]),
  onDrag: PropTypes.func,
  onStart: PropTypes.func,
  index: PropTypes.number,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  style: PropTypes.object,
  className: PropTypes.string
};

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

/* used as localStorage key and state default key prefix */
var UNIQUE_HASH = "<|-aFrCtGrD-|>";
/* used in Container component to glue col and row logic together in one component */

var ByType = {
  row: {
    colClassName: "react-rsz-grid-row",
    cursorPropName: "pageX",
    offsetDim: "offsetWidth",
    clientDim: "clientWidth",
    cssSizeProp: "width",
    minDim: "minWidth",
    maxDim: "maxWidth",
    minProps: ["Left", "Right"]
  },
  col: {
    colClassName: "react-rsz-grid-col",
    cursorPropName: "pageY",
    offsetDim: "offsetHeight",
    clientDim: "clientHeight",
    cssSizeProp: "height",
    minDim: "minHeight",
    maxDim: "maxHeight",
    minProps: ["Top", "Bottom"]
  }
};

var StateSaver =
/*#__PURE__*/
function () {
  function StateSaver() {
    var _this = this;

    _classCallCheck(this, StateSaver);

    var obj = localStorage.getItem(UNIQUE_HASH);
    this.StorageObject = obj ? JSON.parse(obj) : {};
    window.addEventListener("beforeunload", function () {
      if (Object.keys(_this.StorageObject).length > 1) {
        localStorage.setItem(UNIQUE_HASH, JSON.stringify(_this.StorageObject));
      }
    });
  }

  _createClass(StateSaver, [{
    key: "addStylesInfo",
    value: function addStylesInfo(keyName, stylesObj) {
      this.StorageObject[keyName] = stylesObj;
    }
  }, {
    key: "getStylesInfo",
    value: function getStylesInfo(keyName) {
      return this.StorageObject[keyName] || {};
    }
  }]);

  return StateSaver;
}();

var StateSaver$1 = new StateSaver();

var memoizeOneNumericArg = function memoizeOneNumericArg(fn) {
  var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Object.create(null);
  return function (arg) {
    return cache[arg] || (cache[arg] = fn(arg));
  };
};
var clamp = function clamp(num, min, max) {
  return num > max ? max : num < min ? min : num;
};
var getCorrectProperty = function getCorrectProperty(obj, prop, fallbackProp) {
  return obj.hasOwnProperty(prop) ? obj[prop] : fallbackProp;
};

function childrenMapper(el) {
  if (!React.isValidElement(el)) {
    return el;
  }

  var type = el.type,
      props = el.props,
      key = el.key;
  var _this$props = this.props,
      resizerChildren = _this$props.resizerChildren,
      curType = _this$props.type,
      localStorageKey = _this$props.localStorageKey;
  /* If we just use defaultProps, resizerClassName will not be passed down to nested Containers proprly */

  var realResizerClassName = getCorrectProperty(this.props, "resizerClassName", "react-rsz-grid-default-resizer");
  var curIndex = this._refsArrIterator;

  if (type === Resizer) {
    return React.cloneElement(el, {
      index: curIndex,
      onDrag: this.dragHandler,
      onStart: this.dragStartHandler,
      type: curType,
      className: getCorrectProperty(props, "className", realResizerClassName)
    }, getCorrectProperty(props, "children", resizerChildren));
  }
  /*
      UNIQUE_HASH is needed here for keys not to collide. For example:
      <Container>
          <div>
              This element does not have default key.
              So without UNIQUE_HASH it would be keyed just by index. Key would be: 0.
              People often use indexes as keys, so we try to decrease collision chance.
          </div>
          {[
              [ 0, 1, 2 ].map( i => <div key={i}>{i}</div> )
          ]}
      </Container>
  */


  var stateKey = key || UNIQUE_HASH + curIndex;
  this._indexesToKeys[curIndex] = stateKey;
  var calculatedElementStyle = this.state[stateKey];
  var passProps = {
    style: props.style ? _objectSpread({}, props.style, calculatedElementStyle) : calculatedElementStyle,
    ref: this._getSaveRef(curIndex)
  };

  if (type === Container) {
    /* We sacrifice performance in order to make code more compact here */
    passProps.resizerClassName = getCorrectProperty(props, "resizerClassName", realResizerClassName);
    passProps.resizerChildren = getCorrectProperty(props, "resizerChildren", resizerChildren);
    passProps.localStorageKey = getCorrectProperty(props, "localStorageKey", localStorageKey + "_" + stateKey);
  }

  this._refsArrIterator++;
  return React.cloneElement(el, passProps);
}

var Container =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Container, _React$Component);

  function Container() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Container);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Container)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = StateSaver$1.getStylesInfo(_this.props.localStorageKey);
    _this.refsArr = [];
    _this._indexesToKeys = {};

    _this.dragStartHandler = function (e) {
      /* If a child would be rendered inside Resizer, event target would not have data-resizer-index attr */
      var index = _this._curRszIndex = +e.currentTarget.dataset.resizerIndex;
      var prevElement = _this.refsArr[index - 1];
      var nextElement = _this.refsArr[index];

      if (prevElement && nextElement) {
        /* Can drag only if resizer is not first or last child inside refsArr */
        var cursorPropName = ByType[_this.props.type].cursorPropName;
        _this._initPtrPageDist = e[cursorPropName];

        _this._setInitialDimensionsCache(prevElement, 1);

        _this._setInitialDimensionsCache(nextElement, 2);

        var sum = _this._curD1 + _this._curD2;

        if (!_this._maxD1) {
          _this._maxD1 = sum - _this._minD2;
        }

        if (!_this._maxD2) {
          _this._maxD2 = sum - _this._minD1;
        }

        _this.setExactDimensions();
      } else if (process.env.NODE_ENV !== "production") {
        console.warn("Resizer must be between other components. It is inactive during this drag.");
      }
    };

    _this.dragHandler = function (e) {
      var index = _this._curRszIndex;
      /* It is better to always check children here, because they could be unmounted while dragging */

      if (_this.refsArr[index] && _this.refsArr[index - 1]) {
        var _ByType$_this$props$t = ByType[_this.props.type],
            cursorPropName = _ByType$_this$props$t.cursorPropName,
            cssSizeProp = _ByType$_this$props$t.cssSizeProp;
        var step = e[cursorPropName] - _this._initPtrPageDist;

        _this.setState(function (curState) {
          return _this._getChangedState(curState, cssSizeProp, step);
        });
      }
    };

    _this._getSaveRef = memoizeOneNumericArg(function (index) {
      return function (node) {
        _this.refsArr[index] = ReactDOM.findDOMNode(node);
        /* findDOMNode may return text, so using instanceof check */

        if (process.env.NODE_ENV !== "production" && _this.refsArr[index] && !(_this.refsArr[index] instanceof Element)) {
          if (!__JEST__) {
            /* I don't know how to mock refs instanceof in jest, so.... */
            console.error("af-react-grid: can't find ref for component:", node, "ReactDOM.findDomNode must return element for all children of Container.");
          }
        }
      };
    });

    _this._dimensionsStateModifier = function (curState, _ref) {
      var type = _ref.type;
      var _ByType$type = ByType[type],
          cssSizeProp = _ByType$type.cssSizeProp,
          offsetDim = _ByType$type.offsetDim;
      return _this.refsArr.reduce(function (res, ref, i) {
        /*
            ReactDOM.findDomNode may be null for some Container children
        */
        var stateKey = _this._indexesToKeys[i];

        if (ref) {
          var _objectSpread2;

          res[stateKey] = _objectSpread({}, curState[stateKey], (_objectSpread2 = {}, _defineProperty(_objectSpread2, cssSizeProp, ref[offsetDim]), _defineProperty(_objectSpread2, "flexBasis", "auto"), _defineProperty(_objectSpread2, "boxSizing", "border-box"), _objectSpread2));
        }

        return res;
      }, {});
    };

    _this.setExactDimensions = function () {
      return _this.setState(_this._dimensionsStateModifier);
    };

    return _this;
  }

  _createClass(Container, [{
    key: "_setInitialDimensionsCache",
    value: function _setInitialDimensionsCache(el, fieldIndex) {
      var type = this.props.type;
      var _ByType$type2 = ByType[type],
          maxDim = _ByType$type2.maxDim,
          minDim = _ByType$type2.minDim,
          offsetDim = _ByType$type2.offsetDim,
          clientDim = _ByType$type2.clientDim,
          minProps = _ByType$type2.minProps;
      var obj = getComputedStyle(el);
      var d = this["_curD" + fieldIndex] = el[offsetDim];
      /*
          padding, border and scrollbar ignore width: 0 or height: 0. So we must add them to minProp.
          padding + border will ignore scrollbar dimensions, so calculting this way: offset - client + padding
      */

      var minDist = d - el[clientDim] + minProps.reduce(function (sum, propName) {
        return sum + parseFloat(obj["padding".concat(propName)]);
      }, 0);
      this["_minD" + fieldIndex] = minDist + (parseFloat(obj[minDim]) || 0);
      this["_maxD" + fieldIndex] = parseFloat(obj[maxDim]) || 0;
    }
  }, {
    key: "sendToStateSaverIfNeeded",
    value: function sendToStateSaverIfNeeded() {
      var localStorageKey = this.props.localStorageKey;

      if (localStorageKey) {
        StateSaver$1.addStylesInfo(localStorageKey, this.state);
      }
    }
  }, {
    key: "_getChangedState",
    value: function _getChangedState(curState, cssSizeProp, step) {
      var _ref2;

      var index = this._curRszIndex;
      var realCurIndex = this._indexesToKeys[index];
      var realPrevIndex = this._indexesToKeys[index - 1];
      return _ref2 = {}, _defineProperty(_ref2, realPrevIndex, _objectSpread({}, curState[realPrevIndex], _defineProperty({}, cssSizeProp, clamp(this._curD1 + step, this._minD1, this._maxD1)))), _defineProperty(_ref2, realCurIndex, _objectSpread({}, curState[realCurIndex], _defineProperty({}, cssSizeProp, clamp(this._curD2 - step, this._minD2, this._maxD2)))), _ref2;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          type = _this$props2.type,
          className = _this$props2.className,
          children = _this$props2.children,
          style = _this$props2.style;
      /* this iterator is used and incremented in childrenMapper to fill refsArr selectively. */

      this._refsArrIterator = 0;
      return React.createElement("div", {
        style: style,
        className: cn(className, ByType[type].colClassName),
        children: Children.map(children, childrenMapper, this)
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this._st = setTimeout(this.setExactDimensions, 50);
      window.addEventListener("resize", this.setExactDimensions);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.sendToStateSaverIfNeeded();
      var diff = this.refsArr.length - this._refsArrIterator;

      if (diff) {
        /*
            If children quantity decreased, refsArr must be shortened.
            splice is faster than slice ( jsperf ), so using it.
        */
        this.refsArr.splice(this._refsArrIterator, diff);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("resize", this.setExactDimensions);
      clearTimeout(this._st);
    }
  }]);

  return Container;
}(React.Component);

Container.propTypes = {
  type: PropTypes.oneOf(["row", "col"]),
  className: PropTypes.string,
  style: PropTypes.object,
  children: function children(props, propName) {
    var arr = Children.toArray(props[propName]);

    if (arr.some(function (child) {
      return React.isValidElement(child) && child.type === React.Fragment;
    })) {
      throw new Error("Fragments are not allowed inside Container, use arrays instead");
    }
  },
  resizerChildren: PropTypes.node,
  resizerClassName: PropTypes.string,
  localStorageKey: PropTypes.string
};
Container.defaultProps = {
  type: "row"
};

export { Resizer, Container };
