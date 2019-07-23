module.exports = {
    "presets": [ [ "@babel/env", { "modules": false } ], "@babel/react", "@emotion/babel-preset-css-prop" ],
    "plugins": [
        "@babel/plugin-syntax-dynamic-import",
        [ "@babel/plugin-proposal-class-properties", { loose: true }]
    ],
    "env": {
        "test": {
            "presets": [ [ "@babel/env" ], "@babel/react", "@emotion/babel-preset-css-prop" ]
        }
    }
}