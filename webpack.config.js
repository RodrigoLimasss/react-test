path = require('path');
const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //devtool: 'eval',
    entry: {
        javascript: './public/src/app.js',
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'app.js',
        publicPath: '',
    },
    resolve: {
        extensions: ['', '.js', '.html', '.css']
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react']
            }
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            loader: "style!css"
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './public/src/index.html'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
};
