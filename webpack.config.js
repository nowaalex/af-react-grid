const path = require( "path" );
const HtmlWebpackPlugin = require( "html-webpack-plugin" );
const MiniCssExtractPlugin = require( "mini-css-extract-plugin" );

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
            },{
                test: /\.css$/,
                use: [
                    process.env.NODE_ENV === "production" ? MiniCssExtractPlugin.loader : "style-loader",
                    "css-loader"
                ]
            }
        ]
    },
    resolve: {
        modules: [ "node_modules", "src" ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Examples"
        }),
        new MiniCssExtractPlugin()
    ],
    devServer: {
        watchOptions: {
            poll: true,
            aggregateTimeout: 300
        }
    }
}