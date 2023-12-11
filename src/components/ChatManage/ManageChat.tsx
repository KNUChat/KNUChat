import styled from "styled-components";

interface Room {
    roomId: number;
    mentorId: number;
    menteeId: number;
    roomStatus: string;
}

interface ChatroomBoxProps {
    room: Room;
}

const ManageChat: React.FC<ChatroomBoxProps> = ({room}) => {

    return (
        <ManageChatWrapper>
            {room.roomId}
        </ManageChatWrapper>
    );
}

export default ManageChat;


const ManageChatWrapper = styled.div`
    border-radius: 0px 0px 10px 10px;
    background-color: #eeeeee;
`;