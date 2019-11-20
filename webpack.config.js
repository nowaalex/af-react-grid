const HtmlWebpackPlugin = require( "html-webpack-plugin" );
const CleanPlugin = require( "clean-webpack-plugin" ).CleanWebpackPlugin;

module.exports = {
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