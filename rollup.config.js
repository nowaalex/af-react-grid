import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";

const RESOLVE_COMMON = resolve({
    module: true,
    jsnext: true,
    main: true,
    browser: true,
    preferBuiltins: false
});

export default {
    input: "src/index.js",
    output: {
        file: "dist/bundle.esm.js",
        format: "esm"
    },
    external: [
        "react",
        "react-dom",
        "prop-types",
        "classnames",
        "react-draggable",
        "emotion"
    ],
    plugins: [
        RESOLVE_COMMON,
        babel()
    ]
}