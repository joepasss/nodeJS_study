import express from "express";
import bodyParser from "body-parser";
import path from "path";

import adminRouter from "./routes/admin";
import shopRouter from "./routes/shop";
import { getNotfoundPage } from "./controllers/error";
import { rootDir } from "./utils/path";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.use("/uploads", express.static(path.join(rootDir, "uploads")));
app.use("/api/admin", adminRouter);
app.use("/api", shopRouter);

// 404 error
app.use(getNotfoundPage);

app.listen(3000);
