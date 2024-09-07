import { Link } from "react-router-dom";

const Topbar = () => {
  return (
    <div className="topbar">
      <ul className="topbar-container">
        <li className="topbar-item">
          <Link to={"/"}>SHOP</Link>
        </li>
        <li className="topbar-item">
          <Link to={"/add-product"}>ADD PRODUCT</Link>
        </li>
      </ul>
    </div>
  );
};

export default Topbar;
