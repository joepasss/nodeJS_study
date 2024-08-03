import express from "express";
import { getProducts } from "../controllers/product";
import { logger } from "../controllers/error";

const shopRouter = express.Router();

shopRouter.get("/products", (_req, res, _next) => {
  getProducts()
    .then((products) => {
      res.json({ error: undefined, data: products });
    })
    .catch((err) => {
      logger(`failed to fetch products ${err}`, "ERROR");
      res.status(500).json({ error: { message: "failed to fetch products" } });
    });
});

export default shopRouter;
