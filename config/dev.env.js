var merge = require('webpack-merge')

module.exports = merge({}, {
    NODE_ENV: '"environment"',
    API_URL: '"http://localhost:8080"',
    OAUTH_GRANT_TYPE: '"type"',
    OAUTH_CLIENT_ID: '"client"',
    OAUTH_CLIENT_SECRET: '"secret"',
    OAUTH_SCOPE: '"scope"',
})