module.exports = {
    "presets": [ [ "@babel/env", { "modules": false } ], "@babel/react" ],
    "plugins": [
        "@babel/plugin-syntax-dynamic-import",
        [ "@babel/plugin-proposal-class-properties", { loose: true }]
    ],
    "env": {
        "test": {
            "presets": [ [ "@babel/env" ], "@babel/react" ]
        }
    }
}