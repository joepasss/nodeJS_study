import Layout from "@layouts/Layout";
import Error from "@common/Error";
import { createBrowserRouter, Navigate } from "react-router-dom";
import React from "react";

const Shop = React.lazy(async () => await import("@shop/Shop"));
const AddProduct = React.lazy(
  async () => await import("@addProduct/AddProduct")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Shop />,
      },
      {
        path: "/add-product",
        element: <AddProduct />,
      },
      {
        path: "/error",
        element: <Error />,
      },
      {
        path: "*",
        element: <Navigate to="/error" replace={true} />,
      },
    ],
  },
]);

export default router;
