

function buildConfig(env) {
    return require('./src/config/' + 'webpack_' + env+ '.js')(env)
}

module.exports = buildConfig;



