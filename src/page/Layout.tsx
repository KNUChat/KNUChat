import Footer from "@components/Layout/Footer";
import Navbar from "@components/Layout/Navbar";
import useModalStore from "@store/useModalStore";
import { Helmet } from "react-helmet-async";
import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import { lazy, Suspense, useEffect } from "react";
import { useAuthStore } from "@store/useAuthStore";
import { useUserStore } from "@store/useUserStore";
import axios from "axios";

const Layout = () => {
  const { showModal, modalType } = useModalStore();
  const ExampleModal = lazy(() => import("@components/Common/ExampleModal"));
  const modalTable = {
    example: <ExampleModal />,
  };
  const location = useLocation();
  const { setAuthToken } = useAuthStore();
  const { setUserInfo, userInfo } = useUserStore();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");
    console.log(code);
    const fetchAuthToken = async () => {
      axios.defaults.withCredentials = true;
      const response = await axios.get(`http://52.79.37.100:32100/oauth2?code=${code}`, { withCredentials: true });
      console.log("Authorization", response?.headers?.get("authorization"));
      const authorizationHeader = response.headers.authorization;
      const cookies = response?.headers?.get("set-cookie");
      console.log("cookies", cookies);
      const token = authorizationHeader.replace("Bearer ", "");
      const base64Payload = token.split(".")[1];
      const base64 = base64Payload.replace(/-/g, "+").replace(/_/g, "/");
      const decodedJWT = JSON.parse(
        decodeURIComponent(
          window
            .atob(base64)
            .split("")
            .map(function (c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        )
      );
      setUserInfo({ id: decodedJWT.sub, expTime: decodedJWT.exp });
      console.log("decodedJWT", decodedJWT);
      console.log("userInfo", userInfo);

      code && localStorage.setItem("authToken", authorizationHeader);
      setAuthToken(authorizationHeader);
    };
    fetchAuthToken();

    // 받아온 code 값을 원하는 대로 사용하시면 됩니다.
  }, [location, setAuthToken, setUserInfo, userInfo]);
  const { authToken } = useAuthStore();
  const accessToken = localStorage.getItem("authToken");

  console.log("authToken", authToken, "accessToken", accessToken);

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
    </>
  );
};

export default Layout;

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f5f5f7;
  width: 100%;
  min-height: 100%;
  height: auto;
`;

const OutletWrapper = styled.div`
  height: 100%;
  border-bottom: 1px solid black;
  display: flex;
  justify-content: center;
`;
