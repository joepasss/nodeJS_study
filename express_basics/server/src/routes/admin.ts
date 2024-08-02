import express from "express";
import { deleteProduct, addProduct } from "../controllers/products";
import multer from "multer";
import { rootDir } from "../utils/path";
import path from "path";
import { v4 as uuidv4 } from "uuid";

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

adminRouter.post("/add-product", upload.single("thumb"), addProduct);
adminRouter.delete("/delete-product/:id", deleteProduct);

export default adminRouter;
