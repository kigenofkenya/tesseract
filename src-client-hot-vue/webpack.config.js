'use strict'

const { join, resolve } = require('path')
const webpack = require('webpack')
const glob = require('glob')
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

const extractCSS = new ExtractTextPlugin({
  filename: 'assets/css/[name].css',
  allChunks: true
})
const extractLESS = new ExtractTextPlugin({
  filename: 'assets/css/[name].css',
  allChunks: true
})
const extractSASS = new ExtractTextPlugin({
  filename: 'assets/css/[name].css',
  allChunks: true
})

const entries = {}
const chunks = []
glob.sync(resolve(__dirname, 'pages/**/app.js')).forEach(path => {
  const chunk = path.split('/pages/')[1].split('/app.js')[0]
  // console.log(path)
  // console.log(chunk)
  entries[chunk] = [path, hotMiddlewareScript]
  chunks.push(chunk)
})
// glob.sync('.pages/**/app.js').forEach(path => {
//   const chunk = path.split('.pages/')[1].split('/app.js')[0]
//   entries[chunk] = path
//   chunks.push(chunk)
// })

const config = {
  entry: entries,
  output: {
    path: resolve(__dirname,'..', 'public'),
    filename: 'assets/js/[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      assets: join(__dirname, 'assets'),
      components: join(__dirname, 'components'),
      root: join(__dirname,'..', 'node_modules')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
              use: 'css-loader',
              fallback: 'style-loader'
            })),
            less: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
              use: ['css-loader', 'postcss-loader', 'less-loader'],
              fallback: 'style-loader'
            })),
            scss: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
              use: ['css-loader', 'postcss-loader', 'sass-loader'],
              fallback: 'style-loader'
            })),
            postcss: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
              use: ['css-loader', 'postcss-loader'],
              fallback: 'style-loader'
            }))
          }
        }
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          use: ['css-loader', 'postcss-loader'],
          fallback: 'style-loader'
        }))
      },
      {
        test: /\.less$/,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          use: ['css-loader', 'postcss-loader', 'less-loader'],
          fallback: 'style-loader'
        }))
      },
      {
        test: /\.scss$/,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          use: ['css-loader', 'postcss-loader', 'sass-loader'],
          fallback: 'style-loader'
        }))
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            root: resolve(__dirname, 'src'),
            attrs: ['img:src', 'link:href']
          }
        }]
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        exclude: /favicon\.png$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'assets/img/[name].[hash:7].[ext]'
          }
        }]
      }
    ]
  },
  plugins: [
    // Configure vue-loader to use PostCSS
    new webpack.LoaderOptionsPlugin({
      vue: {
        postcss: {
          config: {
            path: resolve(__dirname,'postcss.config.js')
          }
        }
      }
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CommonsChunkPlugin({
      name: 'vendors',
      filename: 'assets/js/vendors.js',
      chunks: chunks,
      minChunks: chunks.length
    }),
    extractLESS,
    extractSASS,
    extractCSS,

    // new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()    
  ],
  devtool: '#eval-source-map'
}

glob.sync(resolve(__dirname, 'pages/**/*.html')).forEach(path => {
  const chunk = path.split('/pages/')[1].split('/app.html')[0]
  const filename = chunk + '.html'
  const htmlConf = {
    filename: filename,
    template: path,
    inject: 'body',
    favicon: resolve(__dirname,'assets/img/logo.png'),
    hash: process.env.NODE_ENV === 'production',
    chunks: ['vendors', chunk]
  }
  config.plugins.push(new HtmlWebpackPlugin(htmlConf))
})


module.exports = config

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    new OptimizeCSSPlugin()
  ])
}
