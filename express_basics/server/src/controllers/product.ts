import { ProductDataInterface } from "../types/product";
import fs from "fs";
import path from "path";
import { rootDir } from "../utils/path";
import { logger } from "./error";
import { ResponseInterface } from "../types/server";

const productsFilePath = path.join(rootDir, "src", "data", "products.json");

const getProducts = (): Promise<ProductDataInterface[]> => {
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

const addProduct = async (
  newProduct: ProductDataInterface
): Promise<ResponseInterface> => {
  try {
    const products = await getProducts();
    products.push(newProduct);

    await fs.promises.writeFile(
      productsFilePath,
      JSON.stringify(products),
      "utf-8"
    );

    logger(`"${newProduct.title}" added`, "CREATE");
    return {
      error: undefined,
      data: products,
    };
  } catch (err) {
    logger(`cannot add "${newProduct.title}" product`, "ERROR");
    return {
      error: {
        message: `cannot add "${newProduct.title}"`,
      },
      data: undefined,
    };
  }
};

const deleteImage = async (filePath: string) => {
  const uploadPath = path.join(rootDir, filePath);

  try {
    await fs.promises.unlink(uploadPath);
    logger(`${filePath} removed`, "DELETE");
  } catch (err) {
    logger(`failed remove ${filePath}`, "ERROR");
  }
};

const deleteProduct = async (productId: string): Promise<ResponseInterface> => {
  try {
    const products = await getProducts();
    const productIdx = products.findIndex((prod) => prod.id === productId);

    if (productIdx === -1) {
      logger(`${productId} product not found`, "ERROR");
      return {
        error: {
          message: `cannot remove ${productId} product`,
        },
        data: undefined,
      };
    }

    const newProducts = products.filter((product) => {
      return product.id !== productId;
    });

    await fs.promises.writeFile(
      productsFilePath,
      JSON.stringify(newProducts),
      "utf-8"
    );

    await deleteImage(products[productIdx].image.url);

    logger(`"${products[productIdx].title}" removed`, "DELETE");
    return {
      error: undefined,
      data: [products[productIdx]],
    };
  } catch (err) {
    logger(`cannot remove "${productId}" ${err}`, "ERROR");
    return {
      error: {
        message: `cannot remove "${productId}" product`,
      },
      data: undefined,
    };
  }
};

const updateProduct = async (
  productId: string,
  title?: string,
  price?: string,
  url?: string,
  filename?: string
): Promise<ResponseInterface> => {
  try {
    const products = await getProducts();
    const productIdx = products.findIndex((prod) => prod.id === productId);

    if (productIdx === -1) {
      logger(`${productId} product not found`, "ERROR");
      return {
        error: {
          message: `cannot update ${productId} product`,
        },
        data: undefined,
      };
    }

    const newProduct: ProductDataInterface = {
      ...products[productIdx],
      title: title ? title : products[productIdx].title,
      price: price ? price : products[productIdx].price,
      image: {
        url: url ? url : products[productIdx].image.url,
        filename: filename ? filename : products[productIdx].image.filename,
      },
    };

    if (url !== undefined || filename !== undefined) {
      await deleteImage(products[productIdx].image.url);
    }

    const newProducts = products.filter((prods) => prods.id !== productId);
    newProducts.push(newProduct);

    await fs.promises.writeFile(
      productsFilePath,
      JSON.stringify(newProducts),
      "utf-8"
    );

    logger(`${products[productIdx].title} updated!`, "UPDATE");
    return {
      error: undefined,
      data: [newProduct],
    };
  } catch (err) {
    logger(`cannot update "${productId}" ${err}`, "ERROR");
    return {
      error: {
        message: `cannot update "${productId} product`,
      },
      data: undefined,
    };
  }
};

export { getProducts, addProduct, deleteProduct, updateProduct };
