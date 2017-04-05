/**
 * Created by mac on 05/04/2017.
 */

const webpack = require('webpack');


/***
 * webpack comes with UglifyJsPlugin, which runs UglifyJS
 * in order to minimize the output. The plugin supports all
 * of UglifyJS options. Specifying --optimize-minimize on
 * the command line, the following plugin configuration is added:
 * */
module.exports = {
    /*...*/
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: options.devtool && (options.devtool.indexOf("sourcemap") >= 0 || options.devtool.indexOf("source-map") >= 0)
        })
        ,
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
};

function buildConfig(env) {
    return require('./config/' + env + '.js')(env)
}

module.exports = buildConfig;



