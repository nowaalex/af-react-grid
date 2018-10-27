"use strict";

function _interopDefault(e) {
    return e && "object" == typeof e && "default" in e ? e.default : e;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var React = require("react"), React__default = _interopDefault(React), PropTypes = _interopDefault(require("prop-types")), reactDraggable = require("react-draggable"), ReactDOM = _interopDefault(require("react-dom")), cn = _interopDefault(require("classnames")), Resizer = React__default.memo(function(e) {
    var t = e.className, r = e.type, n = e.style, i = e.index, a = e.onDrag, s = e.onStart, o = e.disabled, c = e.children;
    return React__default.createElement(reactDraggable.DraggableCore, {
        onStart: s,
        onDrag: a,
        disabled: o
    }, React__default.createElement("div", {
        "data-resizer-index": i,
        "data-resizer-type": r,
        className: t,
        style: n,
        children: c
    }));
});

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function _defineProperties(e, t) {
    for (var r = 0; r < t.length; r++) {
        var n = t[r];
        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
        Object.defineProperty(e, n.key, n);
    }
}

function _createClass(e, t, r) {
    return t && _defineProperties(e.prototype, t), r && _defineProperties(e, r), e;
}

function _defineProperty(e, t, r) {
    return t in e ? Object.defineProperty(e, t, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = r, e;
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            writable: !0,
            configurable: !0
        }
    }), t && _setPrototypeOf(e, t);
}

function _getPrototypeOf(e) {
    return (_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
        return e.__proto__ || Object.getPrototypeOf(e);
    })(e);
}

function _setPrototypeOf(e, t) {
    return (_setPrototypeOf = Object.setPrototypeOf || function(e, t) {
        return e.__proto__ = t, e;
    })(e, t);
}

function _assertThisInitialized(e) {
    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
}

function _possibleConstructorReturn(e, t) {
    return !t || "object" != typeof t && "function" != typeof t ? _assertThisInitialized(e) : t;
}

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
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Object.create(null);
    return function(r) {
        return t[r] || (t[r] = e(r));
    };
}, clamp = function(e, t, r) {
    return e > r ? r : e < t ? t : e;
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
    var t = e.type, r = e.props, n = this.props, i = n.resizerClassName, a = n.resizerChildren, s = n.type;
    if (t === Resizer) return React__default.cloneElement(e, {
        index: this._refsArrIterator,
        onDrag: this.dragHandler,
        onStart: this.dragStartHandler,
        type: s,
        className: r.className || i
    }, r.children || a);
    var o = this.state[this._refsArrIterator], c = {
        style: r.style ? Object.assign({}, r.style, o) : o,
        ref: this._getSaveRef(this._refsArrIterator++)
    };
    return t === Container && (void 0 === r.resizerClassName && (c.resizerClassName = i), 
    void 0 === r.resizerChildren && (c.resizerChildren = a)), React__default.cloneElement(e, c);
}

var getComponent = function(e) {
    var t, r;
    return r = t = function(t) {
        function r() {
            var e, t;
            _classCallCheck(this, r);
            for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++) i[a] = arguments[a];
            return (t = _possibleConstructorReturn(this, (e = _getPrototypeOf(r)).call.apply(e, [ this ].concat(i)))).state = {}, 
            t.refsArr = [], t.dragStartHandler = function(e) {
                var r = t._curRszIndex = +e.currentTarget.dataset.resizerIndex, n = t.refsArr[r - 1], i = t.refsArr[r];
                if (t._canDrag = !(!n || !i)) {
                    var a = ByType[t.props.type].cursorPropName;
                    t._initPtrPageDist = e[a], t._setInitialDimensionsCache(n, 1), t._setInitialDimensionsCache(i, 2);
                    var s = t._curD1 + t._curD2;
                    t._maxD1 || (t._maxD1 = s - t._minD2), t._maxD2 || (t._maxD2 = s - t._minD1), t.setExactDimensions();
                } else "production" !== process.env.NODE_ENV && console.warn("Resizer must be between other components. It is inactive during this drag.");
            }, t.dragHandler = function(e) {
                if (t._canDrag) {
                    var r = ByType[t.props.type], n = r.cursorPropName, i = r.cssSizeProp, a = e[n] - t._initPtrPageDist;
                    t.setState(function(e) {
                        return t._getChangedState(e, i, a);
                    });
                }
            }, t._getSaveRef = memoizeOneNumericArg(function(e) {
                return function(r) {
                    t.refsArr[e] = ReactDOM.findDOMNode(r);
                };
            }), t._dimensionsStateModifier = function(e, r) {
                var n = r.type, i = ByType[n], a = i.cssSizeProp, s = i.offsetDim;
                return t.refsArr.reduce(function(t, r, n) {
                    var i;
                    return t[n] = Object.assign({}, e[n], (_defineProperty(i = {}, a, r[s]), _defineProperty(i, "flexBasis", "auto"), 
                    _defineProperty(i, "boxSizing", "border-box"), i)), t;
                }, {});
            }, t.setExactDimensions = function() {
                return t.setState(t._dimensionsStateModifier);
            }, t;
        }
        return _inherits(r, e), _createClass(r, [ {
            key: "_setInitialDimensionsCache",
            value: function(e, t) {
                var r = this.props.type, n = ByType[r], i = n.maxDim, a = n.minDim, s = n.offsetDim, o = n.clientDim, c = n.minProps, l = getComputedStyle(e), p = (this["_curD" + t] = e[s]) - e[o] + c.reduce(function(e, t) {
                    return e + parseFloat(l["padding".concat(t)]);
                }, 0);
                this["_minD" + t] = p + (parseFloat(l[a]) || 0), this["_maxD" + t] = parseFloat(l[i]) || 0;
            }
        }, {
            key: "_getChangedState",
            value: function(e, t, r) {
                var n, i = this._curRszIndex;
                return _defineProperty(n = {}, i - 1, Object.assign({}, e[i - 1], _defineProperty({}, t, clamp(this._curD1 + r, this._minD1, this._maxD1)))), 
                _defineProperty(n, i, Object.assign({}, e[i], _defineProperty({}, t, clamp(this._curD2 - r, this._minD2, this._maxD2)))), 
                n;
            }
        }, {
            key: "render",
            value: function() {
                var e = this.props, t = e.type, r = e.className, n = e.children, i = e.style;
                return this._refsArrIterator = 0, React__default.createElement("div", {
                    style: i,
                    className: cn(r, ByType[t].colClassName),
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
    }(), t.propTypes = {
        type: PropTypes.oneOf([ "row", "col" ]),
        className: PropTypes.string,
        style: PropTypes.object,
        children: function(e, t) {
            if (React.Children.toArray(e[t]).some(function(e) {
                return React__default.isValidElement(e) && (e.type === React__default.Fragment || Array.isArray(e));
            })) throw new Error("Fragments and arrays are not allowed inside Container");
        },
        resizerChildren: PropTypes.node,
        resizerClassName: PropTypes.string
    }, t.defaultProps = {
        type: "row",
        resizerClassName: "react-rsz-grid-default-resizer"
    }, r;
}, Container = getComponent(React__default.Component), PureContainer = getComponent(React__default.PureComponent);

exports.Resizer = Resizer, exports.Container = Container, exports.PureContainer = PureContainer;
