import t from "react";

import s from "prop-types";

import { DraggableCore as i } from "react-draggable";

import e from "react-dom";

import r from "classnames";

const h = ({className: s, type: e, style: r, index: h, onDrag: n, onStart: a, disabled: o, children: c}) => t.createElement(i, {
    onStart: a,
    onDrag: n,
    disabled: o
}, t.createElement("div", {
    "data-resizer-index": h,
    "data-resizer-type": e,
    className: s,
    style: r,
    children: c
}));

h.propTypes = {
    type: s.oneOf([ "row", "col" ]),
    onDrag: s.func,
    onStart: s.func,
    index: s.number,
    disabled: s.bool,
    children: s.node,
    style: s.object,
    className: s.string
};

const n = {
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
}, a = (t, s = {}) => i => s[i] || (s[i] = t(i)), o = (t, s, i) => t > i ? i : t < s ? s : t, c = (t, s) => {
    let i, e = !1;
    const r = () => e = !1, h = () => clearTimeout(i), n = () => {
        e || (t.apply(null, arguments), e = !0, h(), i = setTimeout(r, s));
    };
    return n.cancel = h, n;
};

class d extends t.Component {
    constructor(...t) {
        super(...t), this.state = {}, this.t = [], this.onStart = (t => {
            const s = this.s = +t.currentTarget.dataset.resizerIndex, {ptr: i} = n[this.props.type];
            this.i = t[i], this.e(s - 1, 1), this.e(s + 1, 2);
            const e = this._curD1 + this._curD2;
            this._maxD1 || (this._maxD1 = e - this._minD2), this._maxD2 || (this._maxD2 = e - this._minD1);
        }), this.onDrag = (t => {
            const {ptr: s, prop: i} = n[this.props.type], e = t[s] - this.i;
            this.setState(t => this.r(t, i, e));
        }), this.h = a(t => s => {
            this.t[t] = e.findDOMNode(s);
        }), this.n = ((t, {type: s}) => {
            const {prop: i, dim: e} = n[s];
            return this.t.reduce((s, r, h) => (r && (s[h] = Object.assign({}, t[h], {
                [i]: r[e]
            })), s), {});
        }), this.a = c(() => this.setState(this.n), 150);
    }
    e(t, s) {
        const i = this.t[t], {max: e, min: r, dim: h} = n[this.props.type], a = getComputedStyle(i);
        this["_curD" + s] = i[h], this["_minD" + s] = parseInt(a[r], 10) || 0, this["_maxD" + s] = parseInt(a[e], 10) || 0;
    }
    r(t, s, i) {
        const e = this.s;
        return {
            [e - 1]: Object.assign({}, t[e - 1], {
                [s]: o(this._curD1 + i, this._minD1, this._maxD1)
            }),
            [e + 1]: Object.assign({}, t[e + 1], {
                [s]: o(this._curD2 - i, this._minD2, this._maxD2)
            })
        };
    }
    o(s, i) {
        if (!s) return s;
        const {type: e, props: r} = s;
        if (e === t.Fragment) throw new Error("Fragments are not supported in ResizableFlexGrid right now.");
        const {resizerClassName: n, resizerChildren: a} = this.props;
        if (e === h) return t.cloneElement(s, {
            index: i,
            onDrag: this.onDrag,
            onStart: this.onStart,
            type: this.props.type,
            className: r.className || n
        }, r.children || a);
        const o = this.state[i], c = {
            style: r.style ? Object.assign({}, r.style, o) : o,
            ref: this.h(i)
        };
        return e === d && (c.resizerClassName = void 0 === r.resizerClassName ? n : r.resizerClassName, 
        c.resizerChildren = void 0 === r.resizerChildren ? a : r.resizerChildren), t.cloneElement(s, c);
    }
    render() {
        const {type: s, className: i, children: e, style: h, forwardedRef: a} = this.props;
        return t.createElement("div", {
            ref: a,
            style: h,
            className: r(i, n[s].className),
            children: t.Children.map(e, this.o, this)
        });
    }
    componentDidMount() {
        this.a(), window.addEventListener("resize", this.a);
    }
    componentDidUpdate({children: s}) {
        const {children: i} = this.props, e = t.Children.count(s), r = t.Children.count(i);
        e !== r && (e > r && this.t.splice(r), this.a());
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.a), this.a.cancel();
    }
}

d.propTypes = {
    type: s.oneOf([ "row", "col" ]).isRequired,
    className: s.string,
    style: s.object,
    children: s.node,
    resizerChildren: s.node,
    resizerClassName: s.string
}, d.defaultProps = {
    resizerClassName: "react-rsz-grid-default-resizer"
};

export { d as Container, h as Resizer };
