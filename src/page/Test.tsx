// api 테스트용 페이지
import useGetUserProfile from "@hook/user/useGetUserProfile";
import styled from "styled-components";

const Test = () => {
  const { data } = useGetUserProfile();
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
