import fs from "fs";
import path from "path";
import { rootDir } from "../utils/path";

interface ProductInterface {
  title: string;
  desc: string;
}

const productsFilePath = path.join(rootDir, "src", "data", "products.json");

const createProduct = (title: string, desc: string) => {
  fs.readFile(productsFilePath, "utf-8", (err, fileContent) => {
    if (err) {
      console.error("Error reading File...");
      return;
    }

    let newProducts: ProductInterface[];

    try {
      newProducts = JSON.parse(fileContent);
    } catch (err) {
      console.error("Error cannot parsing json...", err);
      return;
    }

    newProducts.push({ title, desc });

    fs.writeFile(productsFilePath, JSON.stringify(newProducts), (err) => {
      if (err) {
        console.error("Error writing file!", err);
      } else {
        console.log(`Product added!\ntitle: ${title} desc: ${desc}`);
      }
    });
  });
};

const fetchAllProduct = () => {
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

export { ProductInterface, createProduct, fetchAllProduct };
