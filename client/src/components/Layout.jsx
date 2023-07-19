import { Navbar, Footer } from ".";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="max-w-5xl">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
