const HtmlWebpackPlugin = require( "html-webpack-plugin" );

module.exports = {
    entry: "./index.js",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    resolve: {
        modules: [ "src", "node_modules" ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Examples"
        })
    ]
}