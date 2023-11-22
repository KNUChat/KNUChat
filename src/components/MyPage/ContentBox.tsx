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
  width: calc(100% - 2rem);
  height: auto;
  min-height: 2rem;
  margin-top: 0.5rem;
  border-radius: 1rem;
  padding: 1rem;
  position: relative;
`;
