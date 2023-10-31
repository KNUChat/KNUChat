import Footer from "@components/Layout/Footer";
import Navbar from "@components/Layout/Navbar";
import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Layout = () => {
  return (
    <>
      <Helmet>
        <title>KNUChat</title>
      </Helmet>
      <LayoutWrapper>
        <Navbar />
        <Outlet />
        <Footer />
      </LayoutWrapper>
    </>
  );
};

export default Layout;

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
