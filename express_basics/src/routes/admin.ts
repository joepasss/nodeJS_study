import express from "express";
import path from "path";
import { viewsDir } from "../utils/path";

const adminRouter = express.Router();

adminRouter.get("/add-product", (_req, res, _next) => {
  res.sendFile(path.join(viewsDir, "add-product.html"));
});

adminRouter.post("/add-product", (req, res, _next) => {
  console.log(req.body);

  res.redirect("/");
});

export default adminRouter;
