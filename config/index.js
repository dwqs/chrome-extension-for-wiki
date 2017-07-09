'use strict';

let path = require('path');

module.exports =  {
    dev:{
        env: require('./dev.env.js'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsPublicPath: '/',
        contentBase: path.resolve(__dirname, '../dist'),
        port: 8080,
        prefix: '{{prefix}}'
    },
    build:{
        env: require('./prod.env.js'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsPublicPath: '/',
        prefix: 'https://api.github.com'
    }
}
