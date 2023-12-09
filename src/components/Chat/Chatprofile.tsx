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
    margin-left: 3px;
    border-radius: 10px 10px 10px 10px;
    background-color:white;
`;

const ProfileWrapper = styled.div`
    display: inline-block;
    background-color:white;
    width:90%;
`;