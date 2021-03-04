const { override } = require('customize-cra');

function envOverrides(config, env) {
  config = { ...config, devtool: 'cheap-module-eval-source-map' };

  return config;
}

module.exports = override(envOverrides);
