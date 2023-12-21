import React from "react";
import styled from "styled-components";

interface TitleProps {
  id: number | any;
}

const Title: React.FC<TitleProps> = ({ id }) => {
  
  return (
    <TitleWrapper>
      {id}
    </TitleWrapper>
  );
};

export default Title;

const TitleWrapper = styled.div`
  text-align: center;
  background-color: white;
  border-radius:10px 10px 10px 10px;
`;