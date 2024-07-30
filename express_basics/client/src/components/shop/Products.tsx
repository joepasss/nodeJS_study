import { ProductDataInterface } from "@my_types/shop";
import React, { Fragment } from "react";
import ProductItem from "./ProductItem";

interface Props {
  header: string;
  items: ProductDataInterface[];
}

const Products: React.FC<Props> = ({ items, header }) => {
  return (
    <Fragment>
      <h4 className="product-header">{header}</h4>
      <div className="product-container">
        {items.map((item, idx) => {
          return <ProductItem key={`${header}-${idx}`} item={item} />;
        })}
      </div>
    </Fragment>
  );
};

export default Products;
