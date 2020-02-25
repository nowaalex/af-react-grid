
const BASIC_PLUGINS = [
    "babel-plugin-emotion",
    "@babel/plugin-transform-runtime",
    [ "@babel/plugin-proposal-class-properties", { loose: true }],
    [ "@babel/plugin-proposal-object-rest-spread", { loose: true, useBuiltIns: true }]
];

const BASIC_PRESETS = [ "@babel/preset-react" ];

module.exports = api => {
    api.cache( true );
    return {
        plugins: BASIC_PLUGINS,
        presets: BASIC_PRESETS.concat([
            [ "@babel/preset-env", {
                modules: false,
                loose: true
            }]
        ])
    }
};