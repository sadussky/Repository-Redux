

function buildConfig(env='dev') {
    return require('./src/config/' + 'webpack_' + env+ '.js')(env)
}

module.exports = buildConfig;



