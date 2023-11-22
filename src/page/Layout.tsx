import Footer from "@components/Layout/Footer";
import Navbar from "@components/Layout/Navbar";
import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Layout = () => {
  return (
    <>
      <Helmet>
        <title>Mapic</title>
      </Helmet>
      <LayoutWrapper>
        <Navbar />
        <OutletWrapper>
          <Outlet />
        </OutletWrapper>
      </LayoutWrapper>
      <Footer />
    </>
  );
};

export default Layout;

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f5f5f7;
  width: 100%;
  height: auto;
`;

const OutletWrapper = styled.div`
  height: 100%;
  border-bottom: 1px solid black;
  display: flex;
  justify-content: center;
`;
