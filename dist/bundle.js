"use strict";

function _interopDefault(e) {
    return e && "object" == typeof e && "default" in e ? e.default : e;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var React = require("react"), React__default = _interopDefault(React), PropTypes = _interopDefault(require("prop-types")), reactDraggable = require("react-draggable"), ReactDOM = _interopDefault(require("react-dom")), cn = _interopDefault(require("classnames"));

function _classCallCheck(e, r) {
    if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
}

function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
        var n = r[t];
        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
        Object.defineProperty(e, n.key, n);
    }
}

function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), e;
}

function _defineProperty(e, r, t) {
    return r in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = t, e;
}

function _inherits(e, r) {
    if ("function" != typeof r && null !== r) throw new TypeError("Super expression must either be null or a function");
    e.prototype = Object.create(r && r.prototype, {
        constructor: {
            value: e,
            writable: !0,
            configurable: !0
        }
    }), r && _setPrototypeOf(e, r);
}

function _getPrototypeOf(e) {
    return (_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
        return e.__proto__ || Object.getPrototypeOf(e);
    })(e);
}

function _setPrototypeOf(e, r) {
    return (_setPrototypeOf = Object.setPrototypeOf || function(e, r) {
        return e.__proto__ = r, e;
    })(e, r);
}

function _assertThisInitialized(e) {
    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
}

function _possibleConstructorReturn(e, r) {
    return !r || "object" != typeof r && "function" != typeof r ? _assertThisInitialized(e) : r;
}

var Resizer = function(e) {
    var r = e.className, t = e.type, n = e.style, i = e.index, s = e.onDrag, a = e.onStart, o = e.disabled, c = e.children;
    return React__default.createElement(reactDraggable.DraggableCore, {
        onStart: a,
        onDrag: s,
        disabled: o
    }, React__default.createElement("div", {
        "data-resizer-index": i,
        "data-resizer-type": t,
        className: r,
        style: n,
        children: c
    }));
};

Resizer.propTypes = {
    type: PropTypes.oneOf([ "row", "col" ]),
    onDrag: PropTypes.func,
    onStart: PropTypes.func,
    index: PropTypes.number,
    disabled: PropTypes.bool,
    children: PropTypes.node,
    style: PropTypes.object,
    className: PropTypes.string
};

var memoizeOneNumericArg = function(e) {
    var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Object.create(null);
    return function(t) {
        return r[t] || (r[t] = e(t));
    };
}, clamp = function(e, r, t) {
    return e > t ? t : e < r ? r : e;
}, ByType = {
    row: {
        colClassName: "react-rsz-grid-row",
        cursorPropName: "pageX",
        offsetDim: "offsetWidth",
        clientDim: "clientWidth",
        cssSizeProp: "width",
        minDim: "minWidth",
        maxDim: "maxWidth",
        minProps: [ "Left", "Right" ]
    },
    col: {
        colClassName: "react-rsz-grid-col",
        cursorPropName: "pageY",
        offsetDim: "offsetHeight",
        clientDim: "clientHeight",
        cssSizeProp: "height",
        minDim: "minHeight",
        maxDim: "maxHeight",
        minProps: [ "Top", "Bottom" ]
    }
};

function childrenMapper(e) {
    if (!React__default.isValidElement(e)) return e;
    var r = e.type, t = e.props, n = this.props, i = n.resizerClassName, s = n.resizerChildren, a = n.type;
    if (r === Resizer) return React__default.cloneElement(e, {
        index: this._refsArrIterator,
        onDrag: this.dragHandler,
        onStart: this.dragStartHandler,
        type: a,
        className: t.className || i
    }, t.children || s);
    var o = this.state[this._refsArrIterator], c = {
        style: t.style ? Object.assign({}, t.style, o) : o,
        ref: this._getSaveRef(this._refsArrIterator++)
    };
    return r === Container && (c.resizerClassName = void 0 === t.resizerClassName ? i : t.resizerClassName, 
    c.resizerChildren = void 0 === t.resizerChildren ? s : t.resizerChildren), React__default.cloneElement(e, c);
}

var Container = function(e) {
    function r() {
        var e, t;
        _classCallCheck(this, r);
        for (var n = arguments.length, i = new Array(n), s = 0; s < n; s++) i[s] = arguments[s];
        return (t = _possibleConstructorReturn(this, (e = _getPrototypeOf(r)).call.apply(e, [ this ].concat(i)))).state = {}, 
        t.refsArr = [], t.dragStartHandler = function(e) {
            var r = t._curRszIndex = +e.currentTarget.dataset.resizerIndex, n = t.refsArr[r - 1], i = t.refsArr[r];
            if (t._canDrag = !(!n || !i)) {
                var s = ByType[t.props.type].cursorPropName;
                t._initPtrPageDist = e[s], t._setInitialDimensionsCache(n, 1), t._setInitialDimensionsCache(i, 2);
                var a = t._curD1 + t._curD2;
                t._maxD1 || (t._maxD1 = a - t._minD2), t._maxD2 || (t._maxD2 = a - t._minD1), t.setExactDimensions();
            } else "production" !== process.env.NODE_ENV && console.warn("Resizer must be between other components. It is inactive during this drag.");
        }, t.dragHandler = function(e) {
            if (t._canDrag) {
                var r = ByType[t.props.type], n = r.cursorPropName, i = r.cssSizeProp, s = e[n] - t._initPtrPageDist;
                t.setState(function(e) {
                    return t._getChangedState(e, i, s);
                });
            }
        }, t._getSaveRef = memoizeOneNumericArg(function(e) {
            return function(r) {
                t.refsArr[e] = ReactDOM.findDOMNode(r);
            };
        }), t._dimensionsStateModifier = function(e, r) {
            var n = r.type, i = ByType[n], s = i.cssSizeProp, a = i.offsetDim;
            return t.refsArr.reduce(function(r, t, n) {
                var i;
                return r[n] = Object.assign({}, e[n], (_defineProperty(i = {}, s, t[a]), _defineProperty(i, "flexBasis", "auto"), 
                _defineProperty(i, "boxSizing", "border-box"), i)), r;
            }, {});
        }, t.setExactDimensions = function() {
            return t.setState(t._dimensionsStateModifier);
        }, t;
    }
    return _inherits(r, React__default.Component), _createClass(r, [ {
        key: "_setInitialDimensionsCache",
        value: function(e, r) {
            var t = this.props.type, n = ByType[t], i = n.maxDim, s = n.minDim, a = n.offsetDim, o = n.clientDim, c = n.minProps, l = getComputedStyle(e), p = (this["_curD" + r] = e[a]) - e[o] + c.reduce(function(e, r) {
                return e + parseFloat(l["padding".concat(r)]);
            }, 0);
            this["_minD" + r] = p + (parseFloat(l[s]) || 0), this["_maxD" + r] = parseFloat(l[i]) || 0;
        }
    }, {
        key: "_getChangedState",
        value: function(e, r, t) {
            var n, i = this._curRszIndex;
            return _defineProperty(n = {}, i - 1, Object.assign({}, e[i - 1], _defineProperty({}, r, clamp(this._curD1 + t, this._minD1, this._maxD1)))), 
            _defineProperty(n, i, Object.assign({}, e[i], _defineProperty({}, r, clamp(this._curD2 - t, this._minD2, this._maxD2)))), 
            n;
        }
    }, {
        key: "render",
        value: function() {
            var e = this.props, r = e.type, t = e.className, n = e.children, i = e.style;
            return this._refsArrIterator = 0, React__default.createElement("div", {
                style: i,
                className: cn(t, ByType[r].colClassName),
                children: React.Children.map(n, childrenMapper, this)
            });
        }
    }, {
        key: "componentDidMount",
        value: function() {
            this._st = setTimeout(this.setExactDimensions, 50), window.addEventListener("resize", this.setExactDimensions);
        }
    }, {
        key: "componentDidUpdate",
        value: function() {
            var e = this.refsArr.length - this._refsArrIterator;
            e && this.refsArr.splice(this._refsArrIterator, e);
        }
    }, {
        key: "componentWillUnmount",
        value: function() {
            window.removeEventListener("resize", this.setExactDimensions), clearTimeout(this._st);
        }
    } ]), r;
}();

Container.propTypes = {
    type: PropTypes.oneOf([ "row", "col" ]),
    className: PropTypes.string,
    style: PropTypes.object,
    children: function(e, r) {
        if (React.Children.toArray(e[r]).some(function(e) {
            return React__default.isValidElement(e) && (e.type === React__default.Fragment || Array.isArray(e));
        })) throw new Error("Fragments and arrays are not allowed inside Container");
    },
    resizerChildren: PropTypes.node,
    resizerClassName: PropTypes.string
}, Container.defaultProps = {
    type: "row",
    resizerClassName: "react-rsz-grid-default-resizer"
}, exports.Container = Container, exports.Resizer = Resizer;
