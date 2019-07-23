const path = require( "path" );
const HtmlWebpackPlugin = require( "html-webpack-plugin" );
const CleanPlugin = require( "clean-webpack-plugin" ).CleanWebpackPlugin;

module.exports = {
    entry: "./example_src/index.js",
    output: {
        path: path.resolve( __dirname, "example_dist" ),
        filename: "[name].[hash].bundle.js"
    },
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
        modules: [ "node_modules", "src" ]
    },
    plugins: [
        new CleanPlugin(),
        new HtmlWebpackPlugin({
            title: "Examples"
        })
    ],
    devServer: {
        watchOptions: {
            poll: true,
            aggregateTimeout: 300
        }
    }
}