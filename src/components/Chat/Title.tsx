import React from "react";
import styled from "styled-components";

interface TitleProps {
  text: string | number;
}

const Title: React.FC<TitleProps> = ({ text }) => {
  return (
    <TitleWrapper>
      {text}
    </TitleWrapper>
  );
};

export default Title;

const TitleWrapper = styled.div`
  text-align: center;
  background-color: #F5F5F7;
`;