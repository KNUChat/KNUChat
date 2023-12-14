import styled from "styled-components";
import Google from "@/assets/GoogleLogo.svg";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  console.log(window.location);
  const handleGoogleLogin = () => {
    // navigate(`${baseURL}/oauth2/authorization/google`);
    navigate("/Redirect", {
      state: {
        url: `https://accounts.google.com/o/oauth2/v2/auth?client_id=331419415754-4aeh072kj79q7s4jek9944qivs9pbejq.apps.googleusercontent.com&redirect_uri=http://localhost:8080/oauth2/google/callback&response_type=code&scope=email`,
      },
    });
    console.log(window.location);
  };
  return (
    <LoginWrapper>
      <p>KNU Chat</p>
      <p>KNU Chat에 오신걸 환영 합니다!</p>
      <GoogleLoginButton onClick={() => handleGoogleLogin()}>
        <GoogleLogo />
        <p>구글 계정으로 로그인</p>
      </GoogleLoginButton>
    </LoginWrapper>
  );
};

export default Login;

const LoginWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const GoogleLoginButton = styled.button`
  width: 24rem;
  height: 4rem;
  border: 1px solid #878787;
  background-color: white;
  border-radius: 2rem;
  color: #878787;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const GoogleLogo = styled.div`
  background-image: url(${Google});
  width: 1.5rem;
  height: 1.5rem;
`;
