const merge = require('webpack-merge');

const baseConfig = require('./webpack.base.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const os = require('os');
const networkInterfaces = os.networkInterfaces();


let ip = '';
for (let key in networkInterfaces) {
    networkInterfaces[key].forEach(item => {
        if (!item.internal && item.family === 'IPv4') {
            ip = item.address;
        }
    });
}

module.exports = merge(baseConfig, {
    mode: 'development',
    devServer: {
        host: ip,
        port: 9275
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    devtool: "#cheap-module-eval-source-map",
    watchOptions: {
        ignored: /node_modules/,
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ]
});