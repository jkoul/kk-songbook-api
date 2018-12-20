const config = require('dotenv-safe').load().required

module.exports = Object.keys(config).reduce((result, key) => {
  result[`process.env.${key}`] = config[key] // eslint-disable-line no-param-reassign
  return result
}, {
  __DEV__: config.NODE_ENV === 'development',
  __QA__: config.NODE_ENV === 'qa',
  __BETA__: config.NODE_ENV === 'beta',
  __PROD__: config.NODE_ENV === 'production',
})
