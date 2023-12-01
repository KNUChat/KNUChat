import styled from "styled-components";
import ChatproTitle from "./ChatproTitle";

const Chatprofile = () => {

    return (
        <ChatprofileWrapper>
            <ChatproTitle/>
        </ChatprofileWrapper>
    );
}

export default Chatprofile;

const ChatprofileWrapper = styled.div`
    text-align: center;
`;