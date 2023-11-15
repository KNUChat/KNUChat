import { ReactNode } from "react";
import styled from "styled-components";

interface ContentBoxProps {
  children?: ReactNode;
}

const ContentBox = ({ children }: ContentBoxProps) => {
  return (
    <ContentBoxWrapper>
      <>{children}</>
    </ContentBoxWrapper>
  );
};

export default ContentBox;

const ContentBoxWrapper = styled.div`
  background-color: #fafafa;
  width: 100%;
  height: 6rem;
  margin-top: 0.5rem;
  border-radius: 1rem;
`;
