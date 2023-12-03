// api 테스트용 페이지
import useGetUserProfile from "@hook/user/useGetUserProfile";
import styled from "styled-components";

import axios from "axios";

const Test = () => {
  const { data: userData } = useGetUserProfile();

  console.log(userData);

  // Axios를 이용한 GET 요청
  axios
    .get("http://52.79.37.100:31338/users/1")
    .then((response) => {
      // 요청이 성공했을 때의 처리
      console.log("응답 데이터:", response.data);
    })
    .catch((error) => {
      // 요청이 실패했을 때의 처리
      console.error("에러 발생:", error);
    });
  return (
    <TestWrapper>
      <h1>User</h1>
      <p>유저 프로필 데이터 들고 오기 </p>
      <h1>Record</h1>
    </TestWrapper>
  );
};

export default Test;

const TestWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
`;
