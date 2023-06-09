const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require("webpack").container;
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = {
  devtool: false,
  entry: './src/main.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ],
  },
  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin(),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
    }),
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        app1: "app1@http://localhost:3001/remoteEntry.js",
        app2: "app2@http://localhost:3002/remoteEntry.js",
      },
    })
  ],
  devServer: {
    port: 8080,
    before(app) {
      app.use(
        '/devApi',
        createProxyMiddleware({
          target: 'http://localhost:8090',
          changeOrigin: true,
          pathRewrite: {
            '^/devApi': '' 
          }
        })
      );
    }
  }
};
