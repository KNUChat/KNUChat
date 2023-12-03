import Footer from "@components/Layout/Footer";
import Navbar from "@components/Layout/Navbar";
import useModalStore from "@store/useModalStore";
import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { lazy, Suspense } from "react";

const Layout = () => {
  const { showModal, modalType } = useModalStore();
  const ExampleModal = lazy(() => import("@components/Common/ExampleModal"));
  const modalTable = {
    example: <ExampleModal />,
  };
  const component = modalType ? modalTable[modalType] : null;
  return (
    <>
      <Helmet>
        <title>KNUChat</title>
      </Helmet>
      <LayoutWrapper>
        {showModal && <Suspense fallback={null}>{component}</Suspense>}
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
