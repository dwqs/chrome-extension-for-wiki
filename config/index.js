'use strict';

let path = require('path');

module.exports =  {
    dev:{
        env: require('./dev.env.js'),
        assetsRoot: path.resolve(__dirname, '../assets'),
        assetsPublicPath: '/',
        contentBase: path.resolve(__dirname, '../assets'),
        port: 4000,
        prefix: 'https://api.github.com'
    },
    build:{
        env: require('./prod.env.js'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        prefix: 'https://api.github.com'
    }
}
