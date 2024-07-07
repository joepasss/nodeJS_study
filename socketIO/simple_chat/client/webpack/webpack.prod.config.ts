import { type Configuration, Chunk, Module } from "webpack";
import config from "./webpack.common.config";
import { merge } from "webpack-merge";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const prodConfig: Configuration = merge(config, {
  mode: "production",
  devtool: false,
  output: {
    filename: "js/[name].[contenthash:12].js",
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      maxSize: Infinity,
      minSize: 2000,
      cacheGroups: {
        node_modules: {
          test: /[\\/]node_modules[\\/]/,
          name: "node_modules",
          chunks: "initial",
        },
        async: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "async",
          name(_: Module, chunks: Chunk[]) {
            return chunks.map((chunk) => chunk.name).join("-");
          },
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                includePaths: ["./node_modules"],
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:12].css",
    }),
  ],
});

export default prodConfig;
