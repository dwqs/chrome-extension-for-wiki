'use strict';

let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
let WebpackMd5Hash = require('webpack-md5-hash');
let CompressionPlugin = require("compression-webpack-plugin");
let HappyPack = require('happypack');

let getHappyPackConfig = require('./happypack');

let prodConfig = require('./webpack.base.config');
let config = require('../config');

prodConfig.module.rules.unshift({
    test:/\.less$/,
    use: ExtractTextPlugin.extract({
        fallback: "vue-style-loader",
        use: ['happypack/loader?id=less-prod']
    })
}, {
    test:/\.css$/,
    use: ExtractTextPlugin.extract({
        fallback: "vue-style-loader",
        use: ['happypack/loader?id=css-prod']
    })
});

prodConfig.plugins = (prodConfig.plugins || []).concat([
    new webpack.DefinePlugin({
        'process.env': config.build.env
    }),

    new ExtractTextPlugin({
        filename: "[name].css"
    }),

    new HappyPack(getHappyPackConfig({
        id: 'less-prod',
        loaders: ['css-loader', {
            path: 'postcss-loader',
            options: {
                sourceMap: "inline"
            }
        }, 'less-loader']
    })),

    new HappyPack(getHappyPackConfig({
        id: 'css-prod',
        loaders: ['css-loader', {
            path: 'postcss-loader',
            options: {
                sourceMap: "inline"
            }
        }]
    })),

    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
        cssProcessorOptions: {
            safe: true
        }
    }),

    new webpack.optimize.CommonsChunkPlugin({
        name: "vendor"
    }),

    // gzip
    new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.(js|html|less)$/,
        threshold: 10240,
        minRatio: 0.8
    }),
    new WebpackMd5Hash()
]);

module.exports = Object.assign({},prodConfig,{
    entry: {
        app: path.resolve(__dirname, '../src/page/index.js'),
        vendor: ['vue', 'axios']
    },
    output: {
        filename: "[name].js",
        path: config.build.assetsRoot,
        chunkFilename: "[name].js"
    }
});
