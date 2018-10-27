"use strict";

function _interopDefault(e) {
    return e && "object" == typeof e && "default" in e ? e.default : e;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var React = require("react"), React__default = _interopDefault(React), PropTypes = _interopDefault(require("prop-types")), reactDraggable = require("react-draggable"), ReactDOM = _interopDefault(require("react-dom")), cn = _interopDefault(require("classnames"));

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

var Resizer = function(e) {
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
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Object.create(null);
    return function(r) {
        return t[r] || (t[r] = e(r));
    };
}, clamp = function(e, t, r) {
    return e > r ? r : e < t ? t : e;
}, ByType = {
    row: {
        className: "react-rsz-grid-row",
        ptr: "pageX",
        dim: "offsetWidth",
        clientDim: "clientWidth",
        prop: "width",
        min: "minWidth",
        max: "maxWidth",
        minProps: [ "paddingLeft", "paddingRight" ]
    },
    col: {
        className: "react-rsz-grid-col",
        ptr: "pageY",
        dim: "offsetHeight",
        clientDim: "clientHeight",
        prop: "height",
        min: "minHeight",
        max: "maxHeight",
        minProps: [ "paddingTop", "paddingBottom" ]
    }
}, Container = function(e) {
    function t() {
        var e, r;
        _classCallCheck(this, t);
        for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++) i[a] = arguments[a];
        return (r = _possibleConstructorReturn(this, (e = _getPrototypeOf(t)).call.apply(e, [ this ].concat(i)))).state = {}, 
        r.refsArr = [], r.onStart = function(e) {
            var t = r._curRszIndex = +e.currentTarget.dataset.resizerIndex, n = r.refsArr[t - 1], i = r.refsArr[t];
            if (r._canDrag = !(!n || !i)) {
                var a = ByType[r.props.type].ptr;
                r._initPtrPageDist = e[a], r._setInitialDimensionsCache(n, 1), r._setInitialDimensionsCache(i, 2);
                var s = r._curD1 + r._curD2;
                r._maxD1 || (r._maxD1 = s - r._minD2), r._maxD2 || (r._maxD2 = s - r._minD1), r.setExactDimensions();
            } else "production" !== process.env.NODE_ENV && console.warn("Resizer must be between other components. It is inactive during this drag.");
        }, r.onDrag = function(e) {
            if (r._canDrag) {
                var t = ByType[r.props.type], n = t.ptr, i = t.prop, a = e[n] - r._initPtrPageDist;
                r.setState(function(e) {
                    return r._getChangedState(e, i, a);
                });
            }
        }, r._getSaveRef = memoizeOneNumericArg(function(e) {
            return function(t) {
                r.refsArr[e] = ReactDOM.findDOMNode(t);
            };
        }), r._dimensionsStateModifier = function(e, t) {
            var n = t.type, i = ByType[n], a = i.prop, s = i.dim;
            return r.refsArr.reduce(function(t, r, n) {
                var i;
                return t[n] = Object.assign({}, e[n], (_defineProperty(i = {}, a, r[s]), _defineProperty(i, "flexBasis", "auto"), 
                _defineProperty(i, "boxSizing", "border-box"), i)), t;
            }, {});
        }, r.setExactDimensions = function() {
            return r.setState(r._dimensionsStateModifier);
        }, r;
    }
    return _inherits(t, React__default.Component), _createClass(t, [ {
        key: "_setInitialDimensionsCache",
        value: function(e, t) {
            var r = this.props.type, n = ByType[r], i = n.max, a = n.min, s = n.dim, o = n.clientDim, c = n.minProps, p = getComputedStyle(e);
            this["_curD" + t] = e[s];
            var l = e[s] - e[o] + c.reduce(function(e, t) {
                return e + parseFloat(p[t]);
            }, 0);
            this["_minD" + t] = l + (parseFloat(p[a]) || 0), this["_maxD" + t] = parseFloat(p[i]) || 0;
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
        key: "childrenMapper",
        value: function(e) {
            if (!React__default.isValidElement(e)) return e;
            var r = e.type, n = e.props, i = this.props, a = i.resizerClassName, s = i.resizerChildren, o = i.type;
            if (r === Resizer) return React__default.cloneElement(e, {
                index: this._refsArrIterator,
                onDrag: this.onDrag,
                onStart: this.onStart,
                type: o,
                className: n.className || a
            }, n.children || s);
            var c = this.state[this._refsArrIterator], p = {
                style: n.style ? Object.assign({}, n.style, c) : c,
                ref: this._getSaveRef(this._refsArrIterator++)
            };
            return r === t && (p.resizerClassName = void 0 === n.resizerClassName ? a : n.resizerClassName, 
            p.resizerChildren = void 0 === n.resizerChildren ? s : n.resizerChildren), React__default.cloneElement(e, p);
        }
    }, {
        key: "render",
        value: function() {
            var e = this.props, t = e.type, r = e.className, n = e.children, i = e.style;
            return this._refsArrIterator = 0, React__default.createElement("div", {
                style: i,
                className: cn(r, ByType[t].className),
                children: React.Children.map(n, this.childrenMapper, this)
            });
        }
    }, {
        key: "componentDidMount",
        value: function() {
            this.setExactDimensions(), window.addEventListener("resize", this.setExactDimensions);
        }
    }, {
        key: "componentDidUpdate",
        value: function(e) {
            var t = e.children, r = this.props.children, n = React.Children.count(t), i = React.Children.count(r);
            n !== i && (n > i && this.refsArr.splice(i), this.setExactDimensions());
        }
    }, {
        key: "componentWillUnmount",
        value: function() {
            window.removeEventListener("resize", this.setExactDimensions), this.setExactDimensions.cancel();
        }
    } ]), t;
}();

Container.propTypes = {
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
}, Container.defaultProps = {
    type: "row",
    resizerClassName: "react-rsz-grid-default-resizer"
}, exports.Container = Container, exports.Resizer = Resizer;
