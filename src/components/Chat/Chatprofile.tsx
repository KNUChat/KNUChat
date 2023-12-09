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
    display: inline-block;
    text-align: center;
    border-radius: 10px 10px 10px 10px;
    background-color:#f5f5f7;
    margin-left: 3px;
    width:100%;
`;

const ProfileWrapper = styled.div`
    display: inline-block;
    background-color:white;
    border-radius: 10px 10px 5px 5px;
    width: 100%;
`;