const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = (env) => {
  const devMode = env.NODE_ENV !== "production";

  console.log(devMode ? "BUILDING FOR DEVELOPMENT" : "Building for production");

  return {
    context: path.resolve(__dirname, "src"),
    entry: {
      index: "./js/index.js",
      scorecard: "./js/scorecard.js",
      iframe: "./js/iframe.js"
    },
    output: {
      filename: "js/[name].js",
      path: path.resolve(__dirname, "dist")
    },
    mode: devMode ? "development" : "production",
    devtool: devMode ? "cheap-module-eval-source-map" : "source-map",
    devServer: {
      contentBase: "./dist"
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true // set to true if you want JS source maps
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: { discardComments: { removeAll: true } }
        })
      ]
    },
    module: {
      rules: [
        {
          test: /\.(js)$/,
          loader: "babel-loader",
          exclude: [/node_modules/, /static/],
          options: {
            cacheDirectory: false
          }
        },
        {
          test: /\.(css|scss|sass)$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader?url=false",
            "postcss-loader",
            "sass-loader"
          ]
        },
        {
          test: /\.(jpg|jpeg|png|svg)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "images/",
                pubicPath: "/"
              }
            }
          ]
        },
        {
          test: /\.(csv|tsv)$/,
          loader: "csv-loader",
          options: {
            dynamicTyping: true,
            header: true,
            skipEmptyLines: true
          }
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(["dist"]),
      new CopyWebpackPlugin([
        {
          from: "*.html"
        },
        {
          from: "./static/**/*"
        },
        {
          from: "./images/**/*"
        },
        {
          from: "./data/**/*"
        }
      ]),
      new MiniCssExtractPlugin({
        filename: "styles/[name].css",
        chunkFilename: "styles/[id].css"
      })
    ]
  };
};
