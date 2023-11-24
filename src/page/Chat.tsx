import WebSocketProvider from '../websocket/WebSocketProvider';
import Chatting from '../components/Chat/Chatting';
import TextInputBox from '../components/Chat/TextInputBox';
 
const Chat = () => {
  return (
    <WebSocketProvider>
      <Chatting/>
      <TextInputBox />
    </WebSocketProvider>
  );
};

export default Chat;
