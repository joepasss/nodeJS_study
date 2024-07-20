import express from "express";
import path from "path";
import { viewsDir } from "../utils/path";

const shopRouter = express.Router();

shopRouter.get("/", (_req, res, _next) => {
  res.sendFile(path.join(viewsDir, "shop.html"));
});

export default shopRouter;
