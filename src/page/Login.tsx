import styled from "styled-components";
import Google from "@/assets/GoogleLogo.svg";

const Login = () => {
  return (
    <LoginWrapper>
      <p>KNU Chat</p>
      <p>KNU Chat에 오신걸 환영 합니다!</p>
      <GoogleLoginButton>
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
