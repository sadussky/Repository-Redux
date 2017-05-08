/*
 * Copyright (c) 1992-2010 by SaduAlbert.  ALL RIGHTS RESERVED.
 * Consult your license regarding permissions and restrictions.
 * Created by Sadu.Stephen on 2017/4/27.
 * @since v1.0.0,build,33889
 * github: https://github.com/sadussky
 * web : http:www.sadussky.com
 */

const webpackConfig = require('./webpack_config');
const webpack = require('webpack');
var path = require('path');

module.exports = function (env) {
    webpackConfig.initEnvironment(env);
    return {
        entry: {
            main: './index.webpack.js'
        },
        devtool: 'cheap-module-source-map',
        devServer: {
            port: 7777,
            host: 'localhost',
            historyApiFallback: true,
            noInfo: false,
            stats: 'minimal',
        },
        output: {
            filename: '[name].[chunkhash].js',
            path: path.resolve(__dirname, '../build/dist/assets'),
            sourceMapFilename: '[name].map'
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: function (module) {
                    // this assumes your vendor imports exist in the node_modules directory
                    return module.context && module.context.indexOf('node_modules') !== -1;
                }
            }),
            //CommonChunksPlugin will now extract all
            // the common modules from vendor and main bundles
            new webpack.optimize.CommonsChunkPlugin({
                //But since there are no more common modules
                // between them we end up with just the
                // runtime code included in the manifest file
                name: 'manifest'
            }),

            //Running webpack -p (or --define process.env.NODE_ENV="'production'")
            // invokes the DefinePlugin in the following way:
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            }),
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            }),
            new webpack.optimize.UglifyJsPlugin({
                beautify: false,
                mangle: {
                    screw_ie8: true,
                    keep_fnames: true
                },
                compress: {
                    screw_ie8: true
                },
                comments: false
            })
        ],

    };
}

