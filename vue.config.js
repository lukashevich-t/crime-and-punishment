const path = require('path')
var webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionPlugin = require('compression-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const isDev = process.env.NODE_ENV !== 'production'

// const proxy = "http://192.168.200.54:8081/"
const devPlugins = [
  // new FriendlyErrorsPlugin()
]
const prodPlugins = [
  new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    reportFilename: path.resolve(__dirname, 'dist/report.html'),
  }),
  new CompressionPlugin(),
]

module.exports = {
  // publicPath: appContextPath, // https://github.com/vuejs/vue-cli/blob/dev/docs/guide/html-and-static-assets.md
  // outputDir: path.resolve(__dirname, '../../back/engineer/build/webpack_out'),
  configureWebpack: {
    // entry: path.resolve(__dirname, 'src/index.js'),
    // entry: {
    //   main: path.resolve(__dirname, "src/index.js"),
    // },
    output: {
      filename: '[name].[hash:16].js',
    },
    plugins: [
      new webpack.ProvidePlugin({
        // log: ['@/lib/btoLogger.js', 'log'],
        // Vue: ['vue/dist/vue.esm.js', 'default'],
        jQuery: 'jquery',
        // 'window.jQuery': 'jquery',
        // $: 'jquery',
        moment: 'moment',
        ajax: ['@/lib/api', 'ajax'],
        _cloneDeep: 'lodash/cloneDeep',
        _isEqual: 'lodash/isEqual',
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new HtmlWebpackPlugin({
        template: 'templates/index.html',
      }),
    ].concat(isDev ? devPlugins : prodPlugins),
    resolve: {
      extensions: ['.js', '.vue'],
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        //   '@': resolve('src'),
        //   'scss_vars': '@/styles/vars.scss'
      },
    },
    devtool: 'source-map',
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // get the name. E.g. node_modules/packageName/not/this/part.js
              // or node_modules/packageName
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]

              // npm package names are URL-safe, but some servers don't like @ symbols
              return `npm.${packageName.replace('@', '')}`
            },
          },
        },
      },
    },
  },
  // output: {
  //   publicPath: appContextPath
  // },
}
