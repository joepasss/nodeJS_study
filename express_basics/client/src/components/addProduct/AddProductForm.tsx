import React, { useState } from "react";
import instance from "../../axios/instance";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import ProductForm from "../common/ProductForm";

interface FormItemInterface<T> {
  data: T;
  error: string | undefined;
}

interface AddProductDataInterface {
  title: string;
  price: string;
  image: File | null;
}

const AddProductForm = () => {
  const [addProductFormData, setAddProductFormData] = useState<
    FormItemInterface<AddProductDataInterface | undefined>
  >({
    data: undefined,
    error: undefined,
  });

  

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isValid = true;

    if (!title.data.trim()) {
      setTitle((prev) => ({
        ...prev,
        error: "Title is required!",
      }));

      isValid = false;
    }

    const parsedPrice = parseFloat(price.data);
    if (!price.data || isNaN(parsedPrice)) {
      setPrice((prev) => ({
        ...prev,
        error: "Valid price is required!",
      }));

      isValid = false;
    } else if (parsedPrice < 0) {
      setPrice((prev) => ({
        ...prev,
        error: "Price must be a positive number!",
      }));

      isValid = false;
    }

    if (!image.data) {
      setImage((prev) => ({ ...prev, error: "Image is required!" }));

      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const formData = new FormData();
    formData.append("title", title.data);
    formData.append("price", price.data);

    if (image.data) {
      formData.append("thumb_image", image.data);
    }

    try {
      await instance.post("/api/admin/add-product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/");
    } catch (e) {
      console.error("There was an error adding the product!");

      if (isAxiosError(e)) {
        console.log(e.response);
      }
    }
  };

  return (
    <div className="add-product-form-container">
      <h4 className="header">ADD PRODUCT</h4>

      <ProductForm handleSubmit={handleSubmit} />
    </div>
  );
};

export default AddProductForm;
