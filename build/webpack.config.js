const path = require('path');
const HappyPack = require('happypack');
const os = require('os');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const entries = require('./entries');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

// 开辟一个线程池
// 拿到系统CPU的最大核数，happypack 将编译工作灌满所有线程
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
  entry: entries,
  module: {
    rules: [
      {
        test: /(\.scss)|(\.css)$/,
        use: [{
          loader: 'cache-loader'
        }, {
          loader: process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
          options: {
            sourceMap: true
          }
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }]
      },
      // {
      //   test: /\.js[x]?$/,
      //   exclude: /node_modules/,
      //   use: [{
      //     loader: 'babel-loader?cacheDirectory',
      //     options: {
      //       presets: ['react'],
      //       plugins: ['transform-runtime']
      //     }
      //   }]
      // },
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: 'happypack/loader?id=jsx'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader?cacheDirectory',
          options: {
            presets: [['es2015', 'stage-2']],
            plugins: ['transform-runtime']
          }
        }]
      },
      // {
      //   test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      //   loader: 'url',
      //   query: {
      //     limit: 10000,
      //     name: utils.assetsPath('images/[name].[ext]'),
      //   }
      // },
      { // eslint 检查
        test: /\.js[x]?$/,
        exclude: /(node_modules)|(assets\/js)/,
        include: [path.join(__dirname, '../src')],
        use: [{
          loader: 'cache-loader'
        }, {
          loader: 'eslint-loader',
        }]
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin(),
    new HappyPack({
      id: 'jsx',
      threadPool: happyThreadPool,
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['react'],
            plugins: ['transform-runtime']
          }
        }
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
    extensions: ['.js', '.jsx', '.scss']
  }
};
