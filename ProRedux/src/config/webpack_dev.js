/**
 * Created by mac on 05/04/2017.
 */

const webpack = require('webpack');
var path = require('path');

// module.exports = function (env) {
//     return {
//         devtool: 'cheap-module-source-map',
//         output: {
//             path: path.join(__dirname, '/../dist/assets'),
//             filename: '[name].bundle.js',
//             publicPath: publicPath,
//             sourceMapFilename: '[name].map'
//         },
//         devServer: {
//             port: 7777,
//             host: 'localhost',
//             historyApiFallback: true,
//             noInfo: false,
//             stats: 'minimal',
//             publicPath: publicPath
//         }
//     }
// }


module.exports = function(env) {
    return {
        entry: {
            main: './index.webpack.js'
        },
        output: {
            filename: '[name].[chunkhash].js',
            path: path.resolve(__dirname, 'dist')
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: function (module) {
                    // this assumes your vendor imports exist in the node_modules directory
                    return module.context && module.context.indexOf('node_modules') !== -1;
                }
            })
        ],
        //
        //
        // plugins: [
        //     new webpack.optimize.UglifyJsPlugin({
        //         sourceMap: options.devtool && (options.devtool.indexOf("sourcemap") >= 0 || options.devtool.indexOf("source-map") >= 0)
        //     })
        //     ,
        //     new webpack.DefinePlugin({
        //         'process.env.NODE_ENV': JSON.stringify('production')
        //     })
        // ]
    };
}

