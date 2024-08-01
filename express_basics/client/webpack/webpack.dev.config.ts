import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevConfiguration } from "webpack-dev-server";
import config from "./webpack.common.config";
import { merge } from "webpack-merge";
import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";

const currentDir = path.resolve(fileURLToPath(import.meta.url), "../");

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevConfiguration;
}

const devConfig: Configuration = merge(config, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    port: 9000,
    static: {
      directory: path.resolve(currentDir, "../dist"),
    },
    devMiddleware: {
      index: "index.html",
      writeToDisk: true,
      publicPath: "/",
    },
    client: {
      overlay: true,
    },
    liveReload: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader",
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
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html",
    }),
  ],
});

export default devConfig;
