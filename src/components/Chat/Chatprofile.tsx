import styled from "styled-components";
import Profile from "./Profile";
import Title from "./Title";

const Chatprofile = () => {

    return (
        <ChatprofileWrapper>
            <Title text="Profile"/>
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