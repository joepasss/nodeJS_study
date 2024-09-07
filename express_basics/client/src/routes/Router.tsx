import Layout from "@Components/common/Layout";
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import instance from "../axios/instance";
import { AxiosResponse } from "axios";
import { ProductDataInterface, ResponseInterface } from "src/types";

const ShopPage = React.lazy(async () => await import("@Pages/ShopPage"));
const AddProductPage = React.lazy(
  async () => await import("@Pages/AddProductPage")
);
const ProductPage = React.lazy(async () => await import("@Pages/ProductPage"));

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <h1>ERROR</h1>,
    children: [
      {
        path: "/",
        element: <ShopPage />,
        loader: async () => {
          try {
            const response =
              await instance.get<
                AxiosResponse<ResponseInterface<ProductDataInterface[]>>
              >("/api/products");
            return response.data;
          } catch (err) {
            console.log(err);
          }
        },
      },
      {
        path: "/add-product",
        element: <AddProductPage />,
      },
      {
        path: "/product/:id",
        element: <ProductPage />,
        loader: async ({ params }) => {
          try {
            const response = await instance.get<
              AxiosResponse<ResponseInterface<ProductDataInterface>>
            >(`/api/products/${params.id}`);

            return response.data;
          } catch (err) {
            console.log(err);
          }
        },
      },
    ],
  },
]);

export default Router;
