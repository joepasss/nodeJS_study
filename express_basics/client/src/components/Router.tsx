import Layout from "@layouts/Layout";
import Error from "@common/Error";
import { createBrowserRouter, Navigate } from "react-router-dom";
import React from "react";

const Shop = React.lazy(async () => await import("@shop/Shop"));

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
        element: <h1>ADD PRODUCT</h1>,
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
