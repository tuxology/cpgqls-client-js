const path = require('path');
module.exports = {
  entry: './examples/test.js',
  devServer: {
    contentBase: path.join(__dirname, 'examples'),
    port: 9876,
    open: true,
    historyApiFallback: true,
    hotOnly: true,
    serveIndex: false,
    watchContentBase: true,
    contentBasePublicPath: '/examples',
    openPage: '/examples',
  },
  mode: 'development',
  resolve: {
    extensions: ['.js'],
  },
};
