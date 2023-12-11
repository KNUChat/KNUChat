import styled from "styled-components";
import ManageProfile from "./MangeProfile";

const ChatManageProfile = () => {
    
    return (
        <ChatprofileWrapper>
            <ProfileWrapper>
                <ManageProfile/>
            </ProfileWrapper>
        </ChatprofileWrapper>
    );
}

export default ChatManageProfile;

const ChatprofileWrapper = styled.div`
    margin-top: 0.5rem;
    display: inline-block;
    text-align: center;
    border-radius: 10px 10px 10px 10px;
    background-color:#f5f5f7;
    width:100%;
`;

const ProfileWrapper = styled.div`
    display: inline-block;
    background-color:white;
    border-radius: 10px 10px 10px 10px;
    width: 100%;
`;