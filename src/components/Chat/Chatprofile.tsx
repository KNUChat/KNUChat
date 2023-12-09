import styled from "styled-components";
import Title from "./Title";
import Profile from "./Profile";
import ButtonBox from "./ButtonBox";
import { useChatStore } from "@store/useChatStore";

const Chatprofile = () => {
    const {selectedRoomId} = useChatStore();

    return (
        <ChatprofileWrapper>
            <Title text="Profile"/>
            <ProfileWrapper>
                <Profile key={selectedRoomId}/>
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
    width:100%;
`;

const ProfileWrapper = styled.div`
    display: inline-block;
    background-color:white;
    width: 90%;
`;