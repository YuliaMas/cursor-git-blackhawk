const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devServer: {
    contentBase: "./",
    hot: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "HW#14 - Webpack",
      template: "./index.html",
    }),
    new MiniCssExtractPlugin(),
    // new CopyPlugin({
    //   patterns: [{ from: "img", to: "img" }],
    // }),
  ],
  devtool: "inline-source-map",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    // publicPath: "./dist",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif|jfif|webp|jpeg)$/,
        // use: ["file-loader"],
        // // use: "file-loader?name=[path][name].[ext]",
        // options: {
        //   name: "[name].[ext]",
        //   outputPath: "img",
        // },
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "img/",
              publicPath: "./img/",
            },
          },
        ],
      },
    ],
  },
};
