import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { ProductDataInterface, ResponseInterface } from "src/types";

const ProductPage = () => {
  const { data, error } =
    useLoaderData() as ResponseInterface<ProductDataInterface>;
  const [edit, setEdit] = useState<boolean>(false);

  if (!data || error) {
    return <div>ERROR!</div>;
  }
  console.log(data);

  const product = () => {
    if (edit) {
      return <form className="update-product-form"></form>;
    }

    return (
      <img
        src={`/api/${data.image.url}`}
        alt={data.image.filename}
        className="thumbnail"
      />
    );
  };

  return (
    <div className="product-page">
      <div className="header-container">
        <h4 className="header">
          {data.title} <p className="price">{data.price}</p>{" "}
        </h4>

        <button
          className={edit ? "circle active" : "circle"}
          onClick={() => setEdit((prev) => !prev)}>
          ✏️
        </button>
      </div>

      <div className="product-container">{product()}</div>
    </div>
  );
};

export default ProductPage;
