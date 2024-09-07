import React from "react";
import instance from "../../axios/instance";
import { ProductDataInterface } from "src/types";
import { useNavigate } from "react-router-dom";

interface Props {
  item: ProductDataInterface;
}

const ProductItem: React.FC<Props> = ({ item }) => {
  const navigate = useNavigate();

  const removeHandler = async (id: string) => {
    try {
      await instance.delete(`/api/admin/delete-product/${id}`);
      navigate(0);
    } catch (err) {
      console.log(err);
    }
  };

  const onClickHandler = (id: string) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="product-item">
      <div className="product-remove" onClick={() => removeHandler(item.id)}>
        <p className="remove-text">x</p>
      </div>

      <div className="product-thumb" onClick={() => onClickHandler(item.id)}>
        <img src={`/api/${item.image.url}`} alt={item.image.filename} />
      </div>

      <h4 className="product-title" onClick={() => onClickHandler(item.id)}>
        {item.title}
      </h4>
      <p className="product-price" onClick={() => onClickHandler(item.id)}>
        {item.price}
      </p>
    </div>
  );
};

export default ProductItem;
