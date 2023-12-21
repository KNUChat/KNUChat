import { useAuthStore } from "@store/useAuthStore";
import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

interface ProtectAuthProps {
  children: ReactElement;
}

const ProtectAuth = ({ children }: ProtectAuthProps) => {
  const { authToken } = useAuthStore();
  const accessToken = localStorage.getItem("accessToken");

  return <>{authToken && accessToken ? <Navigate replace to="/" /> : children}</>;
};

export default ProtectAuth;
