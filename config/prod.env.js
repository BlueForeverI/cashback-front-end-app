var merge = require('webpack-merge')

module.exports = merge({}, {
    NODE_ENV: '"production"',
    API_URL: `"${process.env.CASHBACK_API_URL}"`,
    OAUTH_GRANT_TYPE: '"password"',
    OAUTH_CLIENT_ID: `"${process.env.CASHBACK_OAUTH_CLIENT_ID}"`,
    OAUTH_CLIENT_SECRET: `"${process.env.CASHBACK_OAUTH_CLIENT_SECRET}"`,
    OAUTH_SCOPE: '"read,write"',
})