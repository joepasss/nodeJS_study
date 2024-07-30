import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="navigation">
      <ul className="navigation-container">
        <li className="navigation-item">
          <Link to={"/"}>SHOP</Link>
        </li>
        <li className="navigation-item">
          <Link to={"/add-product"}>ADD PRODUCT</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
