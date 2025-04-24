
// filepath: c:\Users\kaash\OneDrive\Desktop\pet feeder\Pet\Frontend\webpack.config.js
const path = require("path");

module.exports = {
    entry: path.resolve(__dirname, "src/index.js"), // Entry point for your app
    output: {
        path: path.resolve(__dirname, "static/frontend"), // Output directory
        filename: "main.js", // Output file name
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
    optimization: {
        minimize: true,
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, "public"), // Directory for static files
        },
        port: 8080,
    },
};