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

shopRouter.get("/products/:id", (req, res, _next) => {
  const id = req.params.id;

  getProducts()
    .then((products) => {
      const product = products.find((prod) => prod.id === req.params.id);

      if (product === undefined) {
        logger(`failed to fetch product ${id}`, "ERROR");
        return res.json({ error: { message: `cannot find product!` } });
      }

      res.json({ error: undefined, data: product });
    })
    .catch((err) => {
      logger(`failed to fetch products ${err}`, "ERROR");
      res.status(500).json({ error: { message: "failed to fetch products" } });
    });
});

export default shopRouter;
