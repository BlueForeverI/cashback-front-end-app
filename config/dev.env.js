var merge = require('webpack-merge')

module.exports = merge({}, {
    NODE_ENV: '"dev"',
    API_URL: '"https://cashback-back-end.herokuapp.com"',
    OAUTH_GRANT_TYPE: '"password"',
    OAUTH_CLIENT_ID: '"cashback-private-content"',
    OAUTH_CLIENT_SECRET: '"NV2MfFAP4drPaHBC"',
    OAUTH_SCOPE: '"read,write"',
    LANG: '"en"'
})