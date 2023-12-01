import styled from "styled-components";
import ChatproTitle from "./ChatproTitle";
import Profile from "./Profile";

const Chatprofile = () => {

    return (
        <ChatprofileWrapper>
            <ChatproTitle/>
            <ProfileWrapper>
                <Profile/>
            </ProfileWrapper>
        </ChatprofileWrapper>
    );
}

export default Chatprofile;

const ChatprofileWrapper = styled.div`
    text-align: center;
`;

const ProfileWrapper = styled.div`
    background-color:white;
`;