const AddProduct = () => {
  return (
    <div className="add-product-container">
      <h4 className="header">ADD PRODUCT</h4>

      <form action="" className="add-product">
        <div className="form-item">
          <p className="form-item-placeholder">product name</p>
          <input
            type="text"
            className="form-item-input product-name"
            placeholder="product name"
          />
        </div>

        <div className="form-item">
          <p className="form-item-placeholder">price</p>
          <input
            type="text"
            className="form-item-input price"
            placeholder="price"
          />
        </div>

        <div className="form-item">
          <p className="form-item-placeholder">thumbnail url</p>
          <input
            type="text"
            className="form-item-input thumbnail-url"
            placeholder="thumbnail url"
          />
        </div>

        <button className="submit">ADD PRODUCT!</button>
      </form>
    </div>
  );
};

export default AddProduct;
