import fs from "fs";
import path from "path";
import { rootDir } from "../utils/path";
import { ProductDataInterface } from "../types/shop";
import { v4 as uuidv4 } from "uuid";
import { logger } from "./logs";

const productsFilePath = path.join(rootDir, "src", "data", "products.json");

const fetchAllProduct = (): Promise<ProductDataInterface[]> => {
  return new Promise((resolve, _reject) => {
    fs.readFile(productsFilePath, "utf-8", (err, fileContent) => {
      if (err) {
        return resolve([]);
      }

      const prods = JSON.parse(fileContent);
      resolve(prods);
    });
  });
};

const createProduct = (
  title: string,
  price: number,
  thumb: string,
  filename: string | undefined
) => {
  fs.readFile(productsFilePath, "utf-8", (err, fileContent) => {
    if (err) {
      logger("cannot read file", "ERROR");
      return;
    }

    let newProducts: ProductDataInterface[];

    try {
      newProducts = JSON.parse(fileContent);
    } catch (err) {
      logger("cannot parsing json", "ERROR");
      return;
    }

    newProducts.push({
      id: uuidv4(),
      title,
      price,
      image: { thumb, filename },
    });

    fs.writeFile(productsFilePath, JSON.stringify(newProducts), (err) => {
      if (err) {
        logger("cannot write to file", "ERROR");
      } else {
        logger(`${title} product added`, "CREATE");
      }
    });
  });
};

const deleteUpload = (filepath: string) => {
  const uploadPath = path.join(rootDir, filepath);

  fs.unlink(uploadPath, (err) => {
    if (err) {
      logger(`cannot found ${uploadPath}`, "ERROR");
    } else {
      logger(`remove ${uploadPath} file`, "DELETE");
    }
  });
};

const filterProduct = async (id: string) => {
  const products = await fetchAllProduct();
  const newProducts = products.filter((product) => {
    return product.id !== id;
  });

  if (products.length === newProducts.length) {
    logger(`cannot found ${id} product`, "ERROR");
    return;
  }

  fs.writeFile(productsFilePath, JSON.stringify(newProducts), (err) => {
    if (err) {
      logger("cannot write to file", "ERROR");
    } else {
      logger(`${id} product removed`, "DELETE");
    }
  });

  const product = products.find((prod) => prod.id === id);
  const filePath = product ? product.image.thumb : undefined;

  if (filePath === undefined) {
    logger(`file not found`, "ERROR");
    return;
  }

  deleteUpload(filePath);
};

// @TODO PRODUCT UPDATE 하는 함수 만들기
const editProduct = (id: string) => {};

export { createProduct, fetchAllProduct, filterProduct, editProduct };
