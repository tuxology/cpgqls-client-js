const path = require('path');
const commonConfig = {
  entry: './lib/index.ts',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
  },
};

const globalVariableConfig = {
  ...commonConfig,
  output: {
    filename: 'index.browser.js',
    path: path.resolve(__dirname, 'dist'),
    ecmaVersion: 6,
    libraryTarget: 'global',
    library: 'CpgqlsClientLib',
  },
};

const commonJsExportConfig = {
  ...commonConfig,
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    ecmaVersion: 6,
    libraryTarget: 'commonjs',
    library: 'CpgqlsClientLib',
  },
};

module.exports = [globalVariableConfig, commonJsExportConfig];
