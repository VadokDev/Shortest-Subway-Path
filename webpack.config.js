const path = require('path');

module.exports = {
  mode: 'none',
  entry: './src/app.js',
  output: {
    library: 'main',
    libraryTarget: 'window',
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    hot: true,
  },
};
