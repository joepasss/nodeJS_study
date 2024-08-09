import express from "express";
import bodyParser from "body-parser";
import path from "path";
import cors, { CorsOptions } from "cors";

import adminRouter from "./routes/admin";
import shopRouter from "./routes/shop";
import { rootDir } from "./utils/path";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions: CorsOptions = {
  origin: "http://172.30.1.86:9000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// routes
app.use("/uploads", express.static(path.join(rootDir, "uploads")));
app.use("/api/admin", adminRouter);
app.use("/api", shopRouter);

// 404 error
app.use("/", (_req, res, _next) => {
  res.status(404).json({
    error: {
      message: "route not found!",
    },
  });
});

app.listen(3000);
