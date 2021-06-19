const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        app: ['/src/js'],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.css',
        }),
    ],
    output: {
        path: path.resolve(__dirname, "src"),
        publicPath: "/",
        filename: "[name]".ext,
        clean: true,
    },
    devServer: {
        contentBase: path.join(__dirname, "src"),
        publicPath: '/',
        port: 8080,
    },
    module: {
        rules: [
            {
                test: /\.html/,
                loader: "html-loader",
            },
            {
                test: /\.js/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"]
                },
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ]
            },
            {
                test: /.*\.(gif|png|jpe?g|svg|otf)$/i,
                loader: 'file-loader',
                options: {
                    optimizationLevel: 5,
                    name: '[path][name].[ext]',
                    context: path.resolve(__dirname, "src/"),
                    outputPath: '/',
                    publicPath: '../',
                    useRelativePaths: true
                }
            }
        ]
    },
    optimization: {
        minimize: false
    },
}