import t from "react";

import e from "prop-types";

import { DraggableCore as s } from "react-draggable";

import i from "react-dom";

import r from "classnames";

const n = ({className: e, type: i, style: r, index: n, onDrag: o, onStart: h, disabled: a, children: c}) => t.createElement(s, {
    onStart: h,
    onDrag: o,
    disabled: a
}, t.createElement("div", {
    "data-resizer-index": n,
    "data-resizer-type": i,
    className: e,
    style: r,
    children: c
}));

if (n.propTypes = {
    type: e.oneOf([ "row", "col" ]),
    onDrag: e.func,
    onStart: e.func,
    index: e.number,
    disabled: e.bool,
    children: e.node,
    style: e.object,
    className: e.string
}, "development" === process.env.NODE_ENV && !Element.prototype.closest) throw new Error("You must include Element.prototype.closest polyfill for ReactResizableGrid to work");

const o = {
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
}, h = (t, e = {}) => s => e[s] || (e[s] = t(s)), a = (t, e, s) => t > s ? s : t < e ? e : t, c = (t, e) => {
    let s, i = !1;
    const r = () => i = !1, n = () => clearTimeout(s), o = () => {
        i || (t.apply(null, arguments), i = !0, n(), s = setTimeout(r, e));
    };
    return o.cancel = n, o;
};

class l extends t.Component {
    constructor(...t) {
        super(...t), this.state = {}, this.t = [], this.onStart = (t => {
            const e = this.e = +t.target.closest("[data-resizer-index]").dataset.resizerIndex, {ptr: s} = o[this.props.type];
            this.s = t[s], this.i(e - 1, 1), this.i(e + 1, 2);
            const i = this._curD1 + this._curD2;
            this._maxD1 || (this._maxD1 = i - this._minD2), this._maxD2 || (this._maxD2 = i - this._minD1);
        }), this.onDrag = (t => {
            const {ptr: e, prop: s} = o[this.props.type], i = t[e] - this.s;
            this.setState(t => this.r(t, s, i));
        }), this.n = h(t => e => {
            this.t[t] = i.findDOMNode(e);
        }), this.o = ((t, {type: e}) => {
            const {prop: s, dim: i} = o[e];
            return this.t.reduce((e, r, n) => (r && (e[n] = Object.assign({}, t[n], {
                [s]: r[i]
            })), e), {});
        }), this.h = c(() => this.setState(this.o), 150);
    }
    i(t, e) {
        const s = this.t[t], {max: i, min: r, dim: n} = o[this.props.type], h = getComputedStyle(s);
        this["_curD" + e] = s[n], this["_minD" + e] = parseInt(h[r], 10) || 0, this["_maxD" + e] = parseInt(h[i], 10) || 0;
    }
    r(t, e, s) {
        const i = this.e;
        return {
            [i - 1]: Object.assign({}, t[i - 1], {
                [e]: a(this._curD1 + s, this._minD1, this._maxD1)
            }),
            [i + 1]: Object.assign({}, t[i + 1], {
                [e]: a(this._curD2 - s, this._minD2, this._maxD2)
            })
        };
    }
    a(e, s) {
        if (!e) return e;
        const {type: i, props: r} = e;
        if (i === t.Fragment) throw new Error("Fragments are not supported in ResizableFlexGrid right now.");
        const {resizerClassName: o, resizerChildren: h} = this.props;
        if (i === n) return t.cloneElement(e, {
            index: s,
            onDrag: this.onDrag,
            onStart: this.onStart,
            type: this.props.type,
            className: r.className || o
        }, r.children || h);
        const a = this.state[s], c = {
            style: r.style ? Object.assign({}, r.style, a) : a,
            ref: this.n(s)
        };
        return i === l && (c.resizerClassName = void 0 === r.resizerClassName ? o : r.resizerClassName, 
        c.resizerChildren = void 0 === r.resizerChildren ? h : r.resizerChildren), t.cloneElement(e, c);
    }
    render() {
        const {type: e, className: s, children: i, style: n, forwardedRef: h} = this.props;
        return t.createElement("div", {
            ref: h,
            style: n,
            className: r(s, o[e].className),
            children: t.Children.map(i, this.a, this)
        });
    }
    componentDidMount() {
        this.h(), window.addEventListener("resize", this.h);
    }
    componentDidUpdate({children: e}) {
        const {children: s} = this.props, i = t.Children.count(e), r = t.Children.count(s);
        i !== r && (i > r && this.t.splice(r), this.h());
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.h), this.h.cancel();
    }
}

l.propTypes = {
    type: e.oneOf([ "row", "col" ]).isRequired,
    className: e.string,
    style: e.object,
    children: e.node,
    resizerChildren: e.node,
    resizerClassName: e.string
}, l.defaultProps = {
    resizerClassName: "react-rsz-grid-default-resizer"
};

export { l as Container, n as Resizer };
