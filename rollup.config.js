import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";
import copy from "rollup-copy-plugin";

const MANGLE_REGEX = new RegExp([
    "clientDim",
    "offsetDim",
    "minProps",
    "maxDim",
    "minDim",
    "cursorPropName",
    "cssSizeProp",
    "colClassName",
    "dragHandler",
    "dragStartHandler",
    "_canDrag",
    "_refsArrIterator",
    "_dimensionsStateModifier",
    "_setInitialDimensionsCache",
    "_getChangedState",
    "setExactDimensions",
    "refsArr",
    "_curRszIndex",
    "_initPtrPageDist",
    "_getSaveRef",
    "StorageObject",
    "addStylesInfo",
    "getStylesInfo",
    "sendToStateSaverIfNeeded"
].join( "|" ));

const RESOLVE_COMMON = resolve({
    module: true,
    jsnext: true,
    main: true,
    browser: true,
    preferBuiltins: false
});

export default [{
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
        "react-draggable"
    ],
    plugins: [
        copy({
            "src/style.css": "dist/style.css",
            "src/resizer.style.css": "dist/resizer.style.css"
        }),
        RESOLVE_COMMON,
        babel({
            babelrc: false,
            externalHelpers: true,
            presets: [ "@babel/preset-react" ],
            plugins: [
                "@babel/plugin-external-helpers",
                "@babel/plugin-proposal-do-expressions",
                [ "@babel/plugin-proposal-class-properties", { loose: true }],
                [ "@babel/plugin-proposal-object-rest-spread", { loose: true, useBuiltIns: true }]
            ]
        }),
        terser({
            ecma: 8,
            mangle: {
                module: true,
                properties: {
                    keep_quoted: true,
                    regex: MANGLE_REGEX
                }
            }
        })
    ]
},{
    input: "src/index.js",
    output: {
        file: "dist/bundle.js",
        format: "cjs"
    },
    external: [
        "react",
        "react-dom",
        "prop-types",
        "classnames",
        "react-draggable"
    ],
    plugins: [
        RESOLVE_COMMON,
        babel({
            babelrc: false,
            externalHelpers: true,
            presets: [ "@babel/preset-react", "@babel/preset-env" ],
            plugins: [
                "@babel/plugin-external-helpers",
                "@babel/plugin-proposal-do-expressions",
                [ "@babel/plugin-proposal-class-properties", { loose: true }],
                [ "@babel/plugin-proposal-object-rest-spread", { loose: true, useBuiltIns: true }]
            ]
        }),
        terser({
            ecma: 6,
            mangle: {
                module: true,
                properties: {
                    keep_quoted: true,
                    regex: MANGLE_REGEX
                }
            }
        })
    ]
}];