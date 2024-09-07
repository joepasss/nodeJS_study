import React, { useEffect, useState } from "react";

interface FormItemInterface<T> {
  data: T;
  error: string | undefined;
}

interface Props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  title?: string;
  price?: string;
  image?: File;
}

const ProductForm: React.FC<Props> = (props) => {
  const {
    handleSubmit,
    title: initialTitle = "",
    price: initialPrice = "",
    image: initialImage = null,
  } = props;

  const [isValid, setIsValid] = useState<boolean>(false);
  const [title, setTitle] = useState<FormItemInterface<string>>({
    data: initialTitle,
    error: undefined,
  });
  const [price, setPrice] = useState<FormItemInterface<string>>({
    data: initialPrice,
    error: undefined,
  });
  const [image, setImage] = useState<FormItemInterface<File | null>>({
    data: initialImage,
    error: undefined,
  });

  const productItems = [
    {
      data: title,
      placeholder: "product title",
      inputType: "text",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle({
          error: undefined,
          data: e.target.value,
        });
      },
    },
    {
      data: price,
      placeholder: "product price",
      inputType: "text",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrice({
          error: undefined,
          data: e.target.value,
        });
      },
    },
    {
      data: image,
      placeholder: "image",
      inputType: "file",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files !== null) {
          setImage({
            error: undefined,
            data: e.target.files[0],
          });
        }
      },
    },
  ];

  useEffect(() => {
    const isValid = (): boolean => {
      let isValid = true;

      productItems.forEach((item) => {
        if (
          item.data.data === "" ||
          item.data.data === null ||
          item.data.error !== undefined
        ) {
          isValid = false;
        }
      });

      return isValid;
    };

    setIsValid(isValid());
  }, [title, price, image]);

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      {productItems.map((item, idx) => {
        return (
          <div
            className={item.data.error ? "form-item" : "form-item error"}
            key={`${item.placeholder}-${idx}`}>
            <p className="form-item-placeholder">{item.placeholder}</p>
            <input
              type={item.inputType}
              className={`form-input product-${item.inputType}`}
              placeholder={item.placeholder}
              onChange={(e) => item.onChange(e)}
            />
            {item.data.error !== undefined && (
              <p className="form-element-error">{item.data.error}</p>
            )}
          </div>
        );
      })}

      <button
        className={isValid ? "submit-btn" : "submit-btn disable"}
        type="submit"
        disabled={!isValid}>
        SUBMIT
      </button>
    </form>
  );
};

export default ProductForm;
