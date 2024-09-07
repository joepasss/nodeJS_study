import React from "react";
import { ProductDataInterface } from "src/types";
import ProductItem from "./ProductItem";

interface Props {
  items: ProductDataInterface[];
}

const Products: React.FC<Props> = ({ items }) => {
  return (
    <div className="products">
      {items.map((item) => {
        return <ProductItem item={item} key={item.id} />;
      })}
    </div>
  );
};

export default Products;
