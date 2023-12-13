import { useAuthStore } from "@store/useAuthStore";
import { ReactElement } from "react";
import { Navigate, useMatch } from "react-router-dom";

interface ProtectAuthProps {
  children: ReactElement;
}

const ProtectMain = ({ children }: ProtectAuthProps) => {
  //   const isBaseUrl = useMatch("/");
  //   const isMain = useMatch("/@me");

  const { authToken } = useAuthStore();
  const accessToken = localStorage.getItem("accessToken");

  const navigateUrl = () => {
    if (authToken && accessToken) {
      //   if (isBaseUrl || (isMain && !communityId && channelId)) {
      //   return <Navigate replace to="/" />;
      //   }
      return children;
    }
    return <Navigate replace to="/login" />;
  };

  return navigateUrl();
};

export default ProtectMain;
