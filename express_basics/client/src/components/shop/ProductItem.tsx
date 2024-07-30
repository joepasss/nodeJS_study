import { ProductDataInterface } from "@my_types/shop";
import React from "react";

interface Props {
  item: ProductDataInterface;
}

const ProductItem: React.FC<Props> = ({ item }) => {
  return (
    <div className="product-item">
      <div className="product-thumb">
        <img src={item.thumb} alt="img" />
      </div>
      <h4 className="product-title">{item.title}</h4>
      <p className="product-price">{item.price}$</p>
    </div>
  );
};

export default ProductItem;
