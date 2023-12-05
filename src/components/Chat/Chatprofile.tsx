import styled from "styled-components";
import Title from "./Title";
import Profile from "./Profile";
import ButtonBox from "./ButtonBox";

const Chatprofile = () => {

    return (
        <ChatprofileWrapper>
            <Title text="Profile"/>
            <ProfileWrapper>
                <Profile/>
            </ProfileWrapper>
            <ButtonBox/>
        </ChatprofileWrapper>
    );
}

export default Chatprofile;

const ChatprofileWrapper = styled.div`
    text-align: center;
    width: 100%;
    margin-left: 3px;
`;

const ProfileWrapper = styled.div`
    background-color:white;
`;