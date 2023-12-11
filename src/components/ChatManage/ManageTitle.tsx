import React from "react";
import styled from "styled-components";
import { useChatStore } from "@store/useChatStore";

interface TitleProps {
    title: string | number;
  }

const ManageTitle: React.FC<TitleProps> = () => {
    const { checked } = useChatStore();
    return (
        <TitleWrapper>
            <div>{checked ? "Waiting Chat List":"Ended Chat List"}</div>
        </TitleWrapper>
  );
};

export default ManageTitle;

const TitleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    text-align: center;
    justify-content: center;
    background-color: white;
    border-radius:10px 10px 10px 10px;
`;