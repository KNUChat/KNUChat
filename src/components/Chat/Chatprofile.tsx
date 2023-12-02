import styled from "styled-components";
import Title from "./Title";
import Profile from "./Profile";

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
    width: 100%;
`;

const ProfileWrapper = styled.div`
    background-color:white;
`;