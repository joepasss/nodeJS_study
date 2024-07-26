import express from "express";
import bodyParser from "body-parser";
import path from "path";

import adminRouter from "./routes/admin";
import shopRouter from "./routes/shop";
import { rootDir } from "./utils/path";
import { getNotfoundPage } from "./controllers/error";

const app = express();

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(rootDir, "public")));

// routes
app.use("/admin", adminRouter);
app.use(shopRouter);

// 404 error
app.use(getNotfoundPage);

app.listen(3000);
