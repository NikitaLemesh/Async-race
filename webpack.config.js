/* eslint-disable */
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const baseConfig = {
  devtool: 'eval-source-map',
  mode: 'development',
  entry: path.resolve(__dirname, './src/index.ts'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
            'style-loader',
            'css-loader',
            'sass-loader',
        ],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.ts$/i,
        use: 'ts-loader',
        include: [path.resolve(__dirname, './src')],
      },
      {
        test: /\.(jpg|png|webp)$/,
        type: 'asset/resource',
        generator: { filename: 'images/[name].[hash].[ext]' },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new HTMLWebpackPlugin({
        template: path.resolve(__dirname, './src/index.html'),
        filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
],
};
module.exports = ({ mode }) => {
  const isProductionMode = mode === 'prod';
  const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

  return merge(baseConfig, envConfig);
};
