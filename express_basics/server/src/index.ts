import express from "express";
import bodyParser from "body-parser";
import path from "path";

import adminRouter from "./routes/admin";
import shopRouter from "./routes/shop";
import { rootDir } from "./utils/path";
import { logger } from "./controllers/error";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.use("/uploads", express.static(path.join(rootDir, "uploads")));
app.use("/api/admin", adminRouter);
app.use("/api", shopRouter);

// 404 error
app.use("/", (_req, res, _next) => {
  logger("route not found", "ERROR");

  res.status(404).json({
    error: {
      message: "route not found!",
    },
  });
});

app.listen(3000);
