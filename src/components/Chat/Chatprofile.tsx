import styled from "styled-components";
import Profile from "./Profile";
import ButtonBox from "./ButtonBox";

const Chatprofile = () => {
    
    return (
        <ChatprofileWrapper>
            <ProfileWrapper>
                <Profile/>
            </ProfileWrapper>
            <ButtonBox/>
        </ChatprofileWrapper>
    );
}

export default Chatprofile;

const ChatprofileWrapper = styled.div`
    margin-top: 0.5rem;
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
    border-radius: 10px 10px 10px 10px;
    width: 100%;
`;