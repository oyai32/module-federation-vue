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
      // 提供给其他服务加载的文件
      filename: "remoteEntry.js",
      // 唯一ID，用于标记当前服务
      name: "app1",
      // 需要暴露的模块，使用时通过 `${name}/${expose}` 引入
      exposes: {
        './Header': "./src/components/Header.vue",
        './dayjs':'dayjs',
      },
    }),
  ],
  devServer: {
    port: 3001,
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
