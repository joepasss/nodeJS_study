import express from "express";
import middleware from "webpack-dev-middleware";
import webpack from "webpack";
import devConfig from "../webpack/webpack.dev.config";
import "dotenv/config";
import path from "path";

const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT;

const app = express();

if (NODE_ENV === "development") {
  const compiler = webpack(devConfig);

  app.use(middleware(compiler));
} else {
  app.use(express.static(path.join(import.meta.dirname, "..", "dist")));

  app.get("*", (_req, res, _next) => {
    res.sendFile(path.resolve(import.meta.dirname, "..", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`server is running in ${NODE_ENV} mode on port ${PORT}`);
});
