import { ReactNode } from "react";
import styled from "styled-components";

interface MyPageBoxProps {
  children: ReactNode;
}

const MyPageBox = ({ children }: MyPageBoxProps) => {
  return (
    <MyPageBoxWrapper>
      <>{children}</>
    </MyPageBoxWrapper>
  );
};

export default MyPageBox;

const MyPageBoxWrapper = styled.div`
  width: calc(100% - 3rem);
  /* height: calc(100% - 3rem); */
  height: auto;
  background-color: white;
  border-radius: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
`;
