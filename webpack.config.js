// See https://github.com/webpack/css-loader/issues/145
require('es6-promise').polyfill();

/* Generate a manifest.json file in the root output directory with a mapping of all
source file names to their corresponding output file. */
var ManifestPlugin = require('webpack-manifest-plugin');

/* Moves every require("....css") into a separate CSS files (not inlined in the JS bundle) */
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var webpack = require("webpack");

module.exports = {
    entry: {
      common: "./app/assets/javascripts/common.js",
      main: "./app/assets/javascripts/main.js"
    },
    output: {
        path: __dirname + "/public/assets",
        publicPath: '/assets/',
        filename: "javascripts/[name].js",
        chunkFilename: "javascripts/[name].js"
    },
    // assume extensions when resolving dependenies
    resolve: {
      extensions: [".js", ".jsx"]
    },
    target: 'web',
    plugins: [
        new ManifestPlugin({
          publicPath: '/assets/'
        }),
        new ExtractTextPlugin("stylesheets/[name].css"),
    ],
    module: {
        rules: [
          // transpile es6 to es5 with babel.
          {
            test: /.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
              presets: ['es2015', 'react']
            }
          },
          // extract css into a separate file from js file.
          {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: "css-loader"
            })
          },
          // convert scss to css and extract to a css file.
          {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: [
                { loader: "css-loader" },
                { loader: "sass-loader" }
              ]
            })
          },
          // images in css and javascript
          {
            test: /\.(jpe?g|png|gif|svg)(\?[a-z0-9.=]+)?$/i,
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]',
            }
          },
          // fonts in css
          {
            test: /\.(eot|svg|ttf|woff|woff2)(\?[a-z0-9.=]+)?$/,
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
            }
          }
        ]
    }
};
