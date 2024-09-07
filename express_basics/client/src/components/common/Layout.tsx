import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";

const Layout = () => {
  return (
    <div className="layout">
      <Topbar />
      <Outlet />
    </div>
  );
};

export default Layout;
