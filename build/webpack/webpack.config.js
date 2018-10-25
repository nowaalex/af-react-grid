const path = require( "path" );
const HtmlWebpackPlugin = require( "html-webpack-plugin" );

module.exports = {
    entry: "./example/index.js",
    output: {
        path: path.resolve( __dirname, "./dist" ),
        filename: "index_bundle.js"
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: [
                        [ "@babel/preset-env", {
                            "modules": false
                        }],
                        "@babel/preset-react"
                    ],
                    plugins: [
                        "@babel/plugin-syntax-dynamic-import",
                        "@babel/plugin-proposal-class-properties",
                        "@babel/plugin-transform-runtime"
                    ]
                }
            }
        },{
            test: /\.css$/,
            loader: [ "style-loader", "css-loader" ]
        }]
    },
    resolve: {
        modules: [ "node_modules", "src" ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Examples",
            minify: false
        })
    ]
}