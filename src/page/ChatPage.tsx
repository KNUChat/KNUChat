import Chatlist from "@components/Chat/Chatlist";
import Chatroom from "@components/Chat/Chatroom";
import CommonTemplate from "@template/CommonTemplate";

const ChatPage = () => {
    return (
      <>
        <CommonTemplate />
        <Chatlist/>
        <Chatroom/>
      </>
    );
  };
  
  export default ChatPage;