const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// if (process.env.NODE_ENV === 'production') {
//   require('dotenv').config({ path: '.env.production' });
// } else if (process.env.NODE_ENV === 'development') {
//   require('dotenv').config({ path: '.env.development' });
// }

module.exports = (env) => {
  const isProduction = env === 'production';
  if(isProduction === true) {
      require('dotenv').config({ path: '.env.prod' });
  } else {
      require('dotenv').config({ path: '.env.dev' });
  }
  console.log(process.env.SITE_URL);
  const CSSExtract = new ExtractTextPlugin('styles.css');

  return {
    entry: ['babel-polyfill', './src/app.js'],
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }, {
        test: /\.s?css$/,
        use: CSSExtract.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            },
          ]
        })
      }]
    },
    plugins: [
      CSSExtract,
      new webpack.DefinePlugin({
        'env.SITE_URL': JSON.stringify(process.env.SITE_URL),
        'env.THEME_URL': JSON.stringify(process.env.SITE_URL +'/wp-content/themes/devexus'),
        'env.ASSETS_URL': JSON.stringify(process.env.SITE_URL +'/wp-content/themes/devexus/assets'),
      })
    ],
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      publicPath: '/dist/'
    }
  };
};
