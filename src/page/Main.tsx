import CommonTemplate from "@template/CommonTemplate";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "@store/useAuthStore";
import axios from "axios";

const Main = () => {
  const location = useLocation();
  const { setAuthToken } = useAuthStore();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");
    console.log(code);
    const fetchAuthToken = async () => {
      const response = await axios.get(`http://52.79.37.100:32100/oauth2?code=${code}`);
      console.log(response.data);
      console.log(response);
      console.log(response.headers);
      const authorizationHeader = response.headers.authorization;
      console.log(authorizationHeader);
    };
    fetchAuthToken();
    // setAuthToken(response);
    code && localStorage.setItem("authToken", "1");
    setAuthToken("1");

    // 받아온 code 값을 원하는 대로 사용하시면 됩니다.
  }, [location]);
  return (
    <>
      <CommonTemplate />
    </>
  );
};

export default Main;
