"use strict";

function _interopDefault(e) {
    return e && "object" == typeof e && "default" in e ? e.default : e;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var React = _interopDefault(require("react")), PropTypes = _interopDefault(require("prop-types")), reactDraggable = require("react-draggable"), ReactDOM = _interopDefault(require("react-dom")), cn = _interopDefault(require("classnames"));

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
    var t = e.className, r = e.type, n = e.style, i = e.index, s = e.onDrag, a = e.onStart, o = e.disabled, c = e.children;
    return React.createElement(reactDraggable.DraggableCore, {
        onStart: a,
        onDrag: s,
        disabled: o
    }, React.createElement("div", {
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

var _arguments = arguments, ByType = {
    row: {
        className: "react-rsz-grid-row",
        ptr: "pageX",
        dim: "clientWidth",
        prop: "width",
        min: "minWidth",
        max: "maxWidth"
    },
    col: {
        className: "react-rsz-grid-col",
        ptr: "pageY",
        dim: "clientHeight",
        prop: "height",
        min: "minHeight",
        max: "maxHeight"
    }
}, memoizeOneNumericArg = function(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    return function(r) {
        return t[r] || (t[r] = e(r));
    };
}, clamp = function(e, t, r) {
    return e > r ? r : e < t ? t : e;
}, throttle = function(e, t) {
    var r, n = !1, i = function() {
        return n = !1;
    }, s = function() {
        return clearTimeout(r);
    }, a = function() {
        n || (e.apply(null, _arguments), n = !0, s(), r = setTimeout(i, t));
    };
    return a.cancel = s, a;
}, Container = function(e) {
    function t() {
        var e, r;
        _classCallCheck(this, t);
        for (var n = arguments.length, i = new Array(n), s = 0; s < n; s++) i[s] = arguments[s];
        return (r = _possibleConstructorReturn(this, (e = _getPrototypeOf(t)).call.apply(e, [ this ].concat(i)))).state = {}, 
        r.refsArr = [], r.onStart = function(e) {
            var t = r._curRszIndex = +e.currentTarget.dataset.resizerIndex, n = ByType[r.props.type].ptr;
            r._initPtrPageDist = e[n], r._setInitialDimensionsCache(t - 1, 1), r._setInitialDimensionsCache(t + 1, 2);
            var i = r._curD1 + r._curD2;
            r._maxD1 || (r._maxD1 = i - r._minD2), r._maxD2 || (r._maxD2 = i - r._minD1);
        }, r.onDrag = function(e) {
            var t = ByType[r.props.type], n = t.ptr, i = t.prop, s = e[n] - r._initPtrPageDist;
            r.setState(function(e) {
                return r._getChangedState(e, i, s);
            });
        }, r._getSaveRef = memoizeOneNumericArg(function(e) {
            return function(t) {
                r.refsArr[e] = ReactDOM.findDOMNode(t);
            };
        }), r._dimensionsStateModifier = function(e, t) {
            var n = t.type, i = ByType[n], s = i.prop, a = i.dim;
            return r.refsArr.reduce(function(t, r, n) {
                return r && (t[n] = Object.assign({}, e[n], _defineProperty({}, s, r[a]))), t;
            }, {});
        }, r.setExactDimensions = throttle(function() {
            return r.setState(r._dimensionsStateModifier);
        }, 150), r;
    }
    return _inherits(t, React.Component), _createClass(t, [ {
        key: "_setInitialDimensionsCache",
        value: function(e, t) {
            var r = this.refsArr[e], n = ByType[this.props.type], i = n.max, s = n.min, a = n.dim, o = getComputedStyle(r);
            this["_curD" + t] = r[a], this["_minD" + t] = parseInt(o[s], 10) || 0, this["_maxD" + t] = parseInt(o[i], 10) || 0;
        }
    }, {
        key: "_getChangedState",
        value: function(e, t, r) {
            var n, i = this._curRszIndex;
            return _defineProperty(n = {}, i - 1, Object.assign({}, e[i - 1], _defineProperty({}, t, clamp(this._curD1 + r, this._minD1, this._maxD1)))), 
            _defineProperty(n, i + 1, Object.assign({}, e[i + 1], _defineProperty({}, t, clamp(this._curD2 - r, this._minD2, this._maxD2)))), 
            n;
        }
    }, {
        key: "childrenMapper",
        value: function(e, r) {
            if (!e) return e;
            var n = e.type, i = e.props;
            if (n === React.Fragment) throw new Error("Fragments are not supported in ResizableFlexGrid right now.");
            var s = this.props, a = s.resizerClassName, o = s.resizerChildren;
            if (n === Resizer) return React.cloneElement(e, {
                index: r,
                onDrag: this.onDrag,
                onStart: this.onStart,
                type: this.props.type,
                className: i.className || a
            }, i.children || o);
            var c = this.state[r], p = {
                style: i.style ? Object.assign({}, i.style, c) : c,
                ref: this._getSaveRef(r)
            };
            return n === t && (p.resizerClassName = void 0 === i.resizerClassName ? a : i.resizerClassName, 
            p.resizerChildren = void 0 === i.resizerChildren ? o : i.resizerChildren), React.cloneElement(e, p);
        }
    }, {
        key: "render",
        value: function() {
            var e = this.props, t = e.type, r = e.className, n = e.children, i = e.style, s = e.forwardedRef;
            return React.createElement("div", {
                ref: s,
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
    type: PropTypes.oneOf([ "row", "col" ]).isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node,
    resizerChildren: PropTypes.node,
    resizerClassName: PropTypes.string
}, Container.defaultProps = {
    resizerClassName: "react-rsz-grid-default-resizer"
}, exports.Container = Container, exports.Resizer = Resizer;
