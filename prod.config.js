const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    mode: "production",
    entry: {
        app: ['/src/js/']
    },
    stats: {
        children: true
    },
    plugins: [
        new ESLintPlugin(),
        new HtmlWebPackPlugin({
            template: "./src/main.html",
            filename: "../index.html"
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.css'
        })
    ],
    output: {
        path: path.resolve(__dirname, "./src/dist/"),
        publicPath: 'dist',
        filename: "[name]".ext,
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.html/,
                loader: "html-loader"
            },
            {
                test: /\.js/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"]
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
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
    }
}