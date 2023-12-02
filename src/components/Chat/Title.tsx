import React from "react";
import styled from "styled-components";

interface TitleProps {
  text: string;
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
`;