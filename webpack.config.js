const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')
const path = require('path')
const fs = require('fs')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      { test: /\.vue$/, use: 'vue-loader' },
      { test: /\.css$/, use: ['vue-style-loader', 'css-loader'] },
      { test: /\.s[ac]ss$/i, use: ['style-loader', 'css-loader', 'sass-loader'] }
    ]
  },
  devServer: {
    host: '127.0.0.1',
    port: 8888,
    https: {
      key: fs.readFileSync('./public/cert/cert.key'),
      cert: fs.readFileSync('./public/cert/cert.crt'),
      ca: fs.readFileSync('./public/cert/ca.crt')
    },
    hot: true,
    // onAfterSetupMiddleware: function (devServer) {
    //   devServer.app.post('*', (req, res) => {
    //     res.redirect(req.originalUrl)
    //   })
    // },
    proxy: {
      '*': {
        target: 'https://blsx.ru:7777/',
        secure: true,
        changeOrigin: true,
        // method: 'POST'
      }
    }

  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin({})
  ]
}