const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: path.resolve(__dirname, "src/index.js"),
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    watchOptions: {
        ignored: /node_modules/,
    },
    devtool: "source-map",
    devServer: {
        static: {
            directory: path.resolve(__dirname, "public"),
        },
        port: 3000,
        hot: true,
        open: true,
    },
    plugins: [
        new HTMLWebpackPlugin({
            filename: "index.html",
            template: "index.html",
        }),
    ],
    mode: "development",
};
