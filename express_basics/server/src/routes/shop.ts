import express from "express";
import { getProducts } from "../controllers/products";

const shopRouter = express.Router();

shopRouter.get("/products", getProducts);

export default shopRouter;
