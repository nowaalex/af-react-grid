'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var flexclasses_module = require('flexclasses.module');
var ReactDOM = _interopDefault(require('react-dom'));
var _ = _interopDefault(require('lodash'));

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

const ByType = {
  row: {
    className: flexclasses_module.flexRowNowrap,
    ptr: "pageX",
    dim: "clientWidth",
    prop: "width",
    min: "minWidth",
    max: "maxWidth"
  },
  col: {
    className: flexclasses_module.flexColumnNowrap,
    ptr: "pageY",
    dim: "clientHeight",
    prop: "height",
    min: "minHeight",
    max: "maxHeight"
  }
};

class Container extends React.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {});

    _defineProperty(this, "_initPtrPageDist", void 0);

    _defineProperty(this, "_curD1", void 0);

    _defineProperty(this, "_curD2", void 0);

    _defineProperty(this, "_minD1", void 0);

    _defineProperty(this, "_maxD1", void 0);

    _defineProperty(this, "_minD2", void 0);

    _defineProperty(this, "_maxD2", void 0);

    _defineProperty(this, "refsArr", []);

    _defineProperty(this, "onDragStart", (index, e) => {
      const {
        ptr
      } = ByType[this.props.type];
      this._initPtrPageDist = e[ptr];

      this._setInitialDimensionsCache(index - 1, 1);

      this._setInitialDimensionsCache(index + 1, 2);

      const sum = this._curD1 + this._curD2;

      if (this._maxD1 === null) {
        this._maxD1 = sum - this._minD2;
      }

      if (this._maxD2 === null) {
        this._maxD2 = sum - this._minD1;
      }
    });

    _defineProperty(this, "onDrag", (index, e) => {
      const {
        ptr,
        prop
      } = ByType[this.props.type];
      const step = e[ptr] - this._initPtrPageDist;
      this.setState(curState => this._getChangedState(curState, prop, index, step));
    });

    _defineProperty(this, "_getSaveRef", _.memoize(index => node => {
      this.refsArr[index] = node ? ReactDOM.findDOMNode(node) : null;
    }));

    _defineProperty(this, "childrenMapper", (el, index) => {
      if (!el) {
        return el;
      }

      const {
        type,
        props
      } = el;

      if (type === React.Fragment) {
        throw new Error("Fragments are not supported in ResizableFlexGrid right now.");
      }

      return React.cloneElement(el, type === this.props.ResizerElement ? {
        index,
        onDrag: this.onDrag,
        onDragStart: this.onDragStart,
        type: this.props.type,
        ref: this._getSaveRef(index)
      } : {
        ResizerElement: type === Container ? this.props.ResizerElement : undefined,
        style: props.style ? _objectSpread({}, props.style, this.state[index]) : this.state[index],
        ref: this._getSaveRef(index)
      });
    });

    _defineProperty(this, "_dimensionsStateModifier", curState => {
      const {
        prop,
        dim
      } = ByType[this.props.type];
      let resultState = {};

      for (let i = this.refsArr.length, ref; i--;) {
        ref = this.refsArr[i];

        if (ref) {
          resultState[i] = _objectSpread({}, curState[i], {
            [prop]: ref[dim]
          });
        }
      }

      return resultState;
    });

    _defineProperty(this, "setExactDimensions", _.throttle(() => this.setState(this._dimensionsStateModifier), 150, {
      leading: false
    }));
  }

  _setInitialDimensionsCache(elIndex, fieldIndex) {
    const el = this.refsArr[elIndex];
    const {
      max,
      min,
      dim
    } = ByType[this.props.type];
    const obj = getComputedStyle(el);
    this["_curD" + fieldIndex] = el[dim];
    const minVal = parseInt(obj[min], 10);
    this["_minD" + fieldIndex] = isNaN(minVal) ? 0 : minVal;
    const maxVal = parseInt(obj[max], 10);
    this["_maxD" + fieldIndex] = isNaN(maxVal) ? null : maxVal;
  }

  _getChangedState(curState, prop, index, step) {
    return {
      [index - 1]: _objectSpread({}, curState[index - 1], {
        [prop]: _.clamp(this._curD1 + step, this._minD1, this._maxD1)
      }),
      [index + 1]: _objectSpread({}, curState[index + 1], {
        [prop]: _.clamp(this._curD2 - step, this._minD2, this._maxD2)
      })
    };
  }

  render() {
    const {
      type,
      className,
      children,
      style
    } = this.props;
    return React.createElement("div", {
      style: style,
      className: cn(ByType[type].className, className),
      children: React.Children.map(children, this.childrenMapper)
    });
  }

  componentDidMount() {
    this.setExactDimensions();
    window.addEventListener("resize", this.setExactDimensions);
  }

  componentDidUpdate({
    children: prevChildren,
    height: prevHeight,
    width: prevWidth
  }) {
    const {
      children,
      height,
      width
    } = this.props;
    const prevChildrenLen = React.Children.count(prevChildren);
    const curChildrenLen = React.Children.count(children);

    if (width !== prevWidth || height !== prevHeight || prevChildrenLen !== curChildrenLen) {
      if (prevChildrenLen > curChildrenLen) {
        this.refsArr.splice(curChildrenLen);
      }

      this.setExactDimensions();
    }
  }

  componentWillUnmount() {
    this.setExactDimensions.cancel();
    window.removeEventListener("resize", this.setExactDimensions);
  }

}

_defineProperty(Container, "propTypes", {
  onResizerDrag: PropTypes.func,
  onResizerDragStart: PropTypes.func,
  type: PropTypes.oneOf(["row", "col"]),
  children: PropTypes.node,

  /* Use it, if you want to use custom Resizer or wrap default with some HOC */
  ResizerElement: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
});

_defineProperty(Container, "defaultProps", {
  type: "row" // ResizerElement: Resizer

});

exports.default = Container;
exports.Container = Container;
