import { RequestHandler } from "express";
import { createProduct, fetchAllProduct } from "../models/products";

const getAddProduct: RequestHandler = (_req, res, _next) => {
  res.render("add-product");
};

const postAddProduct: RequestHandler = (req, res, _next) => {
  const { title, desc } = req.body;

  if (title === "" || desc === "") {
    const errorMessage = (): string => {
      if (title !== "") {
        return "there is no description!";
      }

      return "there is no title!";
    };

    const msg = errorMessage();

    return res.status(400).render("add-product", { title, desc, msg });
  }

  createProduct(title, desc);
  res.redirect("/");
};

const getProducts: RequestHandler = (_req, res, _next) => {
  fetchAllProduct().then((prods) => {
    res.render("shop", { prods });
  });
};

export { getAddProduct, postAddProduct, getProducts };
