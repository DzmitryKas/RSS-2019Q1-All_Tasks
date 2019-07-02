const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    landing: './src/landing-page.js',
    main: './src/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    // chunkFilename: '[id].bundle_[chunkhash].js',
    // sourceMapFilename: '[file].map',
    path: path.resolve(__dirname, 'dist/'),
    // publicPath: 'dist/',
  },
  // devtool: 'source-map',
  devServer: {
    publicPath: '/',
    contentBase: './',
    hot: true,
  },
  module: {
    rules: [
      { enforce: 'pre', test: /\.js$/, loader: 'eslint-loader' },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg)$/,
        include: path.join(__dirname, 'assets/img'),
        loader: 'file-loader',
      },
      {
        test: /\.(gif|png|jpg)$/,
        loader: 'url-loader',
        options: {
          limit: 30000,
          name: '[path][name].[ext]?[hash]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'landing-page.html',
      template: path.resolve(__dirname, 'src/html', 'landing-page.html'),
      // template: 'src/html/landing-page.html',
      chunks: ['landing'],
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/html', 'index.html'),
      // template: 'src/html/index.html',
      chunks: ['main'],
    }),
  ],
};
