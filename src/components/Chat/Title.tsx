import React from "react";
import styled from "styled-components";

interface TitleProps {
  name: string | number;
}

const Title: React.FC<TitleProps> = ({ name }) => {
  return (
    <TitleWrapper>
      {name}
    </TitleWrapper>
  );
};

export default Title;

const TitleWrapper = styled.div`
  text-align: center;
  background-color: white;
  border-radius:10px 10px 10px 10px;
`;