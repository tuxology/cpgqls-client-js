const path = require('path');

module.exports = {
  entry: './lib/index.ts',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    ecmaVersion: 6,
    libraryTarget: 'global',
    library: 'CpgqlsClientLib',
  },
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
