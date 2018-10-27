import t, { Children as s } from "react";

import i from "prop-types";

import { DraggableCore as e } from "react-draggable";

import r from "react-dom";

import o from "classnames";

const n = t.memo(({className: s, type: i, style: r, index: o, onDrag: n, onStart: a, disabled: h, children: c}) => t.createElement(e, {
    onStart: a,
    onDrag: n,
    disabled: h
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

const a = (t, s = Object.create(null)) => i => s[i] || (s[i] = t(i)), h = (t, s, i) => t > i ? i : t < s ? s : t, c = {
    row: {
        t: "react-rsz-grid-row",
        s: "pageX",
        i: "offsetWidth",
        e: "clientWidth",
        r: "width",
        o: "minWidth",
        n: "maxWidth",
        a: [ "Left", "Right" ]
    },
    col: {
        t: "react-rsz-grid-col",
        s: "pageY",
        i: "offsetHeight",
        e: "clientHeight",
        r: "height",
        o: "minHeight",
        n: "maxHeight",
        a: [ "Top", "Bottom" ]
    }
};

function m(s) {
    if (!t.isValidElement(s)) return s;
    const {type: i, props: e} = s, {resizerClassName: r, resizerChildren: o, type: a} = this.props;
    if (i === n) return t.cloneElement(s, {
        index: this.h,
        onDrag: this.c,
        onStart: this.m,
        type: a,
        className: e.className || r
    }, e.children || o);
    const h = this.state[this.h], c = {
        style: e.style ? Object.assign({}, e.style, h) : h,
        ref: this.l(this.h++)
    };
    return i === d && (void 0 === e.resizerClassName && (c.resizerClassName = r), void 0 === e.resizerChildren && (c.resizerChildren = o)), 
    t.cloneElement(s, c);
}

const l = e => {
    var n, l;
    return l = n = class extends e {
        constructor(...t) {
            super(...t), this.state = {}, this.d = [], this.m = (t => {
                const s = this.p = +t.currentTarget.dataset.resizerIndex, i = this.d[s - 1], e = this.d[s];
                if (this.f = !(!i || !e)) {
                    const {s} = c[this.props.type];
                    this.u = t[s], this.g(i, 1), this.g(e, 2);
                    const r = this._curD1 + this._curD2;
                    this._maxD1 || (this._maxD1 = r - this._minD2), this._maxD2 || (this._maxD2 = r - this._minD1), 
                    this.D();
                } else "production" !== process.env.NODE_ENV && console.warn("Resizer must be between other components. It is inactive during this drag.");
            }), this.c = (t => {
                if (this.f) {
                    const {s, r: i} = c[this.props.type], e = t[s] - this.u;
                    this.setState(t => this.y(t, i, e));
                }
            }), this.l = a(t => s => {
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
        g(t, s) {
            const {type: i} = this.props, {n: e, o: r, i: o, e: n, a} = c[i], h = getComputedStyle(t), m = (this["_curD" + s] = t[o]) - t[n] + a.reduce((t, s) => t + parseFloat(h[`padding${s}`]), 0);
            this["_minD" + s] = m + (parseFloat(h[r]) || 0), this["_maxD" + s] = parseFloat(h[e]) || 0;
        }
        y(t, s, i) {
            const e = this.p;
            return {
                [e - 1]: Object.assign({}, t[e - 1], {
                    [s]: h(this._curD1 + i, this._minD1, this._maxD1)
                }),
                [e]: Object.assign({}, t[e], {
                    [s]: h(this._curD2 - i, this._minD2, this._maxD2)
                })
            };
        }
        render() {
            const {type: i, className: e, children: r, style: n} = this.props;
            return this.h = 0, t.createElement("div", {
                style: n,
                className: o(e, c[i].t),
                children: s.map(r, m, this)
            });
        }
        componentDidMount() {
            this._st = setTimeout(this.D, 50), window.addEventListener("resize", this.D);
        }
        componentDidUpdate() {
            const t = this.d.length - this.h;
            t && this.d.splice(this.h, t);
        }
        componentWillUnmount() {
            window.removeEventListener("resize", this.D), clearTimeout(this._st);
        }
    }, n.propTypes = {
        type: i.oneOf([ "row", "col" ]),
        className: i.string,
        style: i.object,
        children: (i, e) => {
            if (s.toArray(i[e]).some(s => t.isValidElement(s) && (s.type === t.Fragment || Array.isArray(s)))) throw new Error("Fragments and arrays are not allowed inside Container");
        },
        resizerChildren: i.node,
        resizerClassName: i.string
    }, n.defaultProps = {
        type: "row",
        resizerClassName: "react-rsz-grid-default-resizer"
    }, l;
}, d = l(t.Component), p = l(t.PureComponent);

export { n as Resizer, d as Container, p as PureContainer };
