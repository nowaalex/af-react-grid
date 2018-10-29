import t, { Children as s } from "react";

import i from "prop-types";

import { DraggableCore as e } from "react-draggable";

import r from "react-dom";

import o from "classnames";

const n = t.memo(({className: s, type: i, style: r, index: o, onDrag: n, onStart: h, disabled: a, children: c}) => t.createElement(e, {
    onStart: h,
    onDrag: n,
    disabled: a
}, t.createElement("div", {
    "data-resizer-index": o,
    "data-resizer-type": i,
    className: s,
    style: r,
    children: c
})));

n.propTypes = {
    type: i.oneOf([ "row", "col" ]),
    onDrag: i.func,
    onStart: i.func,
    index: i.number,
    disabled: i.bool,
    children: i.node,
    style: i.object,
    className: i.string
};

const h = (t, s = Object.create(null)) => i => s[i] || (s[i] = t(i)), a = (t, s, i) => t > i ? i : t < s ? s : t, c = {
    row: {
        t: "react-rsz-grid-row",
        s: "pageX",
        i: "offsetWidth",
        e: "clientWidth",
        r: "width",
        o: "minWidth",
        n: "maxWidth",
        h: [ "Left", "Right" ]
    },
    col: {
        t: "react-rsz-grid-col",
        s: "pageY",
        i: "offsetHeight",
        e: "clientHeight",
        r: "height",
        o: "minHeight",
        n: "maxHeight",
        h: [ "Top", "Bottom" ]
    }
};

function m(s) {
    if (!t.isValidElement(s)) return s;
    const {type: i, props: e} = s, {resizerClassName: r, resizerChildren: o, type: h} = this.props;
    if (i === n) return t.cloneElement(s, {
        index: this.a,
        onDrag: this.c,
        onStart: this.m,
        type: h,
        className: void 0 === e.className ? r : e.className
    }, e.children || o);
    const a = this.state[this.a], c = {
        style: e.style ? Object.assign({}, e.style, a) : a,
        ref: this.l(this.a++)
    };
    return i === l && (void 0 === e.resizerClassName && (c.resizerClassName = r), void 0 === e.resizerChildren && (c.resizerChildren = o)), 
    t.cloneElement(s, c);
}

class l extends t.Component {
    constructor(...t) {
        super(...t), this.state = {}, this.d = [], this.m = (t => {
            const s = this.p = +t.currentTarget.dataset.resizerIndex, i = this.d[s - 1], e = this.d[s];
            if (this.f = !(!i || !e)) {
                const {s} = c[this.props.type];
                this.g = t[s], this.u(i, 1), this.u(e, 2);
                const r = this._curD1 + this._curD2;
                this._maxD1 || (this._maxD1 = r - this._minD2), this._maxD2 || (this._maxD2 = r - this._minD1), 
                this.D();
            } else "production" !== process.env.NODE_ENV && console.warn("Resizer must be between other components. It is inactive during this drag.");
        }), this.c = (t => {
            if (this.f) {
                const {s, r: i} = c[this.props.type], e = t[s] - this.g;
                this.setState(t => this.y(t, i, e));
            }
        }), this.l = h(t => s => {
            this.d[t] = r.findDOMNode(s);
        }), this.z = ((t, {type: s}) => {
            const {r: i, i: e} = c[s];
            return this.d.reduce((s, r, o) => (s[o] = Object.assign({}, t[o], {
                [i]: r[e],
                flexBasis: "auto",
                boxSizing: "border-box"
            }), s), {});
        }), this.D = (() => this.setState(this.z));
    }
    u(t, s) {
        const {type: i} = this.props, {n: e, o: r, i: o, e: n, h} = c[i], a = getComputedStyle(t), m = (this["_curD" + s] = t[o]) - t[n] + h.reduce((t, s) => t + parseFloat(a[`padding${s}`]), 0);
        this["_minD" + s] = m + (parseFloat(a[r]) || 0), this["_maxD" + s] = parseFloat(a[e]) || 0;
    }
    y(t, s, i) {
        const e = this.p;
        return {
            [e - 1]: Object.assign({}, t[e - 1], {
                [s]: a(this._curD1 + i, this._minD1, this._maxD1)
            }),
            [e]: Object.assign({}, t[e], {
                [s]: a(this._curD2 - i, this._minD2, this._maxD2)
            })
        };
    }
    render() {
        const {type: i, className: e, children: r, style: n} = this.props;
        return this.a = 0, t.createElement("div", {
            style: n,
            className: o(e, c[i].t),
            children: s.map(r, m, this)
        });
    }
    componentDidMount() {
        this._st = setTimeout(this.D, 50), window.addEventListener("resize", this.D);
    }
    componentDidUpdate() {
        const t = this.d.length - this.a;
        t && this.d.splice(this.a, t);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.D), clearTimeout(this._st);
    }
}

l.propTypes = {
    type: i.oneOf([ "row", "col" ]),
    className: i.string,
    style: i.object,
    children: (i, e) => {
        if (s.toArray(i[e]).some(s => t.isValidElement(s) && (s.type === t.Fragment || Array.isArray(s)))) throw new Error("Fragments and arrays are not allowed inside Container");
    },
    resizerChildren: i.node,
    resizerClassName: i.string
}, l.defaultProps = {
    type: "row",
    resizerClassName: "react-rsz-grid-default-resizer"
};

export { n as Resizer, l as Container };
