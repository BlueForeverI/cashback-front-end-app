var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"environment"',
  API_URL: '"randomUrl"',
  OAUTH_GRANT_TYPE: '"type"',
  OAUTH_CLIENT_ID: '"client"',
  OAUTH_CLIENT_SECRET: '"secret"',
  OAUTH_SCOPE: '"scope"',
})