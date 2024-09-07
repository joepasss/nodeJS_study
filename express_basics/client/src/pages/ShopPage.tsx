import Products from "@Components/shop/Products";
import { useLoaderData } from "react-router-dom";
import { ProductDataInterface, ResponseInterface } from "src/types";

const ShopPage = () => {
  const { data, error } = useLoaderData() as ResponseInterface<
    ProductDataInterface[]
  >;

  if (!data || error || data.length <= 0) {
    return <div className="shop-page">no products!</div>;
  }

  return (
    <div className="shop-page">
      <Products items={data} />
    </div>
  );
};

export default ShopPage;
