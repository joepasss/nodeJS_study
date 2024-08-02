import { RequestHandler } from "express";
import {
  createProduct,
  editProduct,
  fetchAllProduct,
  filterProduct,
} from "../models/products";

const getProducts: RequestHandler = async (_req, res, _next) => {
  fetchAllProduct()
    .then((products) => {
      res.json({ data: products });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Failed to fetch products ...", error: err });
    });
};

const getProduct: RequestHandler = async (req, res, _next) => {
  const productId = req.params.id;

  console.log(productId);

  res.send();
};

const addProduct: RequestHandler = (req, res, _next) => {
  const { title, price } = req.body;

  if (req.file === undefined) {
    const msg = "NO IMAGE!";

    return res.status(400).json({
      message: msg,
    });
  }

  const thumb = `/uploads/${req.file.filename}`;
  const filename = req.file?.originalname;

  if (title === "" || price === "") {
    const msg = `INVALID_DATATYPE!\nreq.body: ${req.body}`;

    return res.status(400).json({
      message: msg,
    });
  }

  createProduct(title, price, thumb, filename);

  res.send();
};

const updateProduct: RequestHandler = async (req, res, _next) => {
  const productId = req.params.id;
  editProduct(productId);

  res.send();
};

const deleteProduct: RequestHandler = async (req, res, _next) => {
  const productId = req.params.id;
  filterProduct(productId);

  res.send();
};

export { getProducts, getProduct, addProduct, updateProduct, deleteProduct };
