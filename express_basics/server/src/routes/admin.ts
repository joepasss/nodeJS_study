import express from "express";
import multer from "multer";
import { rootDir } from "../utils/path";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { logger } from "../controllers/error";
import { ProductDataInterface } from "../types/product";
import {
  addProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/product";
import { getLogs } from "../controllers/server";

const formDate = () => {
  const date = new Date();

  const year = date.getFullYear().toString().slice(2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}${month}${day}`;
};

const adminRouter = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    filename(_req, file, done) {
      const dateSuffix = formDate();
      const uniqueSuffix = uuidv4();
      const fileExt = path.extname(file.originalname);

      const suffix = `${dateSuffix}_${uniqueSuffix}${fileExt}`;

      done(null, suffix);
    },
    destination(_req, _file, done) {
      done(null, path.join(rootDir, "uploads"));
    },
  }),
});

adminRouter.post(
  "/add-product",
  upload.single("thumb_image"),
  async (req, res, _next) => {
    const { title, price } = req.body;

    if (
      title === "" ||
      title === undefined ||
      price === "" ||
      price === undefined ||
      req.file === undefined
    ) {
      logger("invalid form data", "ERROR");
      return res.status(400).json({
        error: { message: "invalid form data" },
        data: undefined,
      });
    }

    const image: ProductDataInterface["image"] = {
      url: `/uploads/${req.file.filename}`,
      filename: req.file.originalname,
    };

    const newProduct: ProductDataInterface = {
      id: uuidv4(),
      title,
      price,
      image,
    };

    addProduct(newProduct)
      .then((response) => {
        return res.json(response);
      })
      .catch((err) => {
        logger(`cannot add product ${err}`, "ERROR");
        return res.status(400).json({
          error: { message: "cannot add product" },
        });
      });
  }
);

adminRouter.delete("/delete-product/:id", async (req, res, _next) => {
  const productId = req.params.id;

  if (productId === "" || productId === undefined) {
    logger(`cannot remove ${productId}`, "ERROR");
    return res.status(400).json({
      error: { message: "invalid url params" },
    });
  }

  deleteProduct(productId)
    .then((response) => {
      return res.json(response);
    })
    .catch((err) => {
      logger(`cannot remove ${productId}`, "ERROR");
      return res.status(400).json({
        error: { message: err },
      });
    });
});

adminRouter.put(
  "/update-product/:id",
  upload.single("thumb_image"),
  async (req, res, _next) => {
    const productId = req.params.id;
    const { title, price } = req.body;
    let url: string | undefined;
    let filename: string | undefined;

    if (req.file !== undefined) {
      url = `/uploads/${req.file.filename}`;
      filename = req.file.originalname;
    }

    updateProduct(productId, title, price, url, filename)
      .then((response) => {
        return res.json(response);
      })
      .catch((err) => {
        logger(`cannot update ${productId}`, "ERROR");
        return res.status(400).json({
          error: {
            message: err,
          },
        });
      });
  }
);

adminRouter.get("/logs", (_req, res, _next) => {
  getLogs()
    .then((logs) => {
      res.json({ error: undefined, data: logs });
    })
    .catch((err) => {
      console.error(`ERROR! ${err}`);
      res.status(500).json({ error: { message: "failed to get logs " } });
    });
});

export default adminRouter;
