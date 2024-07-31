import { Outlet } from "react-router-dom";
import HeaderLayout from "./HeaderLayout";
import FooterLayout from "./FooterLayout";

const LayoutWebsite = () => {
  return (
    <div>
      <HeaderLayout />
      <div className="h-screen">
        <Outlet />
      </div>
      <FooterLayout />
    </div>
  );
};

export default LayoutWebsite;
