import express from "express";
import { products } from "./admin";

const shopRouter = express.Router();

shopRouter.get("/", (_req, res, _next) => {
  res.render("shop", { prods: products });
});

export default shopRouter;
