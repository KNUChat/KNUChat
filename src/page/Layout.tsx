import Footer from "@components/Layout/Footer";
import Navbar from "@components/Layout/Navbar";
import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Helmet>
        <title>KNUChat</title>
      </Helmet>
      <div>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default Layout;
