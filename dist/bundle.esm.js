import t, { Children as i } from "react";

import s from "prop-types";

import { DraggableCore as e } from "react-draggable";

import r from "react-dom";

import n from "classnames";

const o = ({className: i, type: s, style: r, index: n, onDrag: o, onStart: h, disabled: a, children: c}) => t.createElement(e, {
    onStart: h,
    onDrag: o,
    disabled: a
}, t.createElement("div", {
    "data-resizer-index": n,
    "data-resizer-type": s,
    className: i,
    style: r,
    children: c
}));

o.propTypes = {
    type: s.oneOf([ "row", "col" ]),
    onDrag: s.func,
    onStart: s.func,
    index: s.number,
    disabled: s.bool,
    children: s.node,
    style: s.object,
    className: s.string
};

const h = (t, i = Object.create(null)) => s => i[s] || (i[s] = t(s)), a = (t, i, s) => t > s ? s : t < i ? i : t, c = {
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
};

class d extends t.Component {
    constructor(...t) {
        super(...t), this.state = {}, this.t = [], this.onStart = (t => {
            const i = this.i = +t.currentTarget.dataset.resizerIndex, s = this.t[i - 1], e = this.t[i];
            if (this.s = !(!s || !e)) {
                const {ptr: i} = c[this.props.type];
                this.e = t[i], this.r(s, 1), this.r(e, 2);
                const r = this._curD1 + this._curD2;
                this._maxD1 || (this._maxD1 = r - this._minD2), this._maxD2 || (this._maxD2 = r - this._minD1), 
                this.n();
            } else "production" !== process.env.NODE_ENV && console.warn("Resizer must be between other components. It is inactive during this drag.");
        }), this.onDrag = (t => {
            if (this.s) {
                const {ptr: i, prop: s} = c[this.props.type], e = t[i] - this.e;
                this.setState(t => this.o(t, s, e));
            }
        }), this.h = h(t => i => {
            this.t[t] = r.findDOMNode(i);
        }), this.a = ((t, {type: i}) => {
            const {prop: s, dim: e} = c[i];
            return this.t.reduce((i, r, n) => (i[n] = Object.assign({}, t[n], {
                [s]: r[e],
                flexBasis: "auto",
                boxSizing: "border-box"
            }), i), {});
        }), this.n = (() => this.setState(this.a));
    }
    r(t, i) {
        const {type: s} = this.props, {max: e, min: r, dim: n, clientDim: o, minProps: h} = c[s], a = getComputedStyle(t);
        this["_curD" + i] = t[n];
        const d = t[n] - t[o] + h.reduce((t, i) => t + parseFloat(a[i]), 0);
        this["_minD" + i] = d + (parseFloat(a[r]) || 0), this["_maxD" + i] = parseFloat(a[e]) || 0;
    }
    o(t, i, s) {
        const e = this.i;
        return {
            [e - 1]: Object.assign({}, t[e - 1], {
                [i]: a(this._curD1 + s, this._minD1, this._maxD1)
            }),
            [e]: Object.assign({}, t[e], {
                [i]: a(this._curD2 - s, this._minD2, this._maxD2)
            })
        };
    }
    c(i) {
        if (!t.isValidElement(i)) return i;
        const {type: s, props: e} = i, {resizerClassName: r, resizerChildren: n, type: h} = this.props;
        if (s === o) return t.cloneElement(i, {
            index: this.d,
            onDrag: this.onDrag,
            onStart: this.onStart,
            type: h,
            className: e.className || r
        }, e.children || n);
        const a = this.state[this.d], c = {
            style: e.style ? Object.assign({}, e.style, a) : a,
            ref: this.h(this.d++)
        };
        return s === d && (c.resizerClassName = void 0 === e.resizerClassName ? r : e.resizerClassName, 
        c.resizerChildren = void 0 === e.resizerChildren ? n : e.resizerChildren), t.cloneElement(i, c);
    }
    render() {
        const {type: s, className: e, children: r, style: o} = this.props;
        return this.d = 0, t.createElement("div", {
            style: o,
            className: n(e, c[s].className),
            children: i.map(r, this.c, this)
        });
    }
    componentDidMount() {
        this.n(), window.addEventListener("resize", this.n);
    }
    componentDidUpdate({children: t}) {
        const {children: s} = this.props, e = i.count(t), r = i.count(s);
        e !== r && (e > r && this.t.splice(r), this.n());
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.n), this.n.cancel();
    }
}

d.propTypes = {
    type: s.oneOf([ "row", "col" ]),
    className: s.string,
    style: s.object,
    children: (s, e) => {
        if (i.toArray(s[e]).some(i => t.isValidElement(i) && (i.type === t.Fragment || Array.isArray(i)))) throw new Error("Fragments and arrays are not allowed inside Container");
    },
    resizerChildren: s.node,
    resizerClassName: s.string
}, d.defaultProps = {
    type: "row",
    resizerClassName: "react-rsz-grid-default-resizer"
};

export { d as Container, o as Resizer };
