var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

module.exports = {
    navigateFallback: '/index.html',
    navigateFallbackWhitelist: [],
    stripePrefix: 'dist/pricer-web',
    root: 'dist/pricer-web/',
    plugins:[
        new SWPrecacheWebpackPlugin({
            cacheId: 'pricer-web',
            filename: 'service-worker.js',
            minify: 'true',
            staticFileGlobs: [
                'dist/pricer-web/index.html',
                'dist/pricer-web/**.js',
                'dist/**.css'
            ],

        })
    ],
    stripePrefix: 'dist/pricer-web/assets',
    mergeStaticsConfig: true
};