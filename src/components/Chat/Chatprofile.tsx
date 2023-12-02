import styled from "styled-components";
import Title from "./Title";
import ProfileTest from "./ProfileTest";

const Chatprofile = () => {

    return (
        <ChatprofileWrapper>
            <Title text="Profile"/>
            <ProfileWrapper>
                <ProfileTest/>
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