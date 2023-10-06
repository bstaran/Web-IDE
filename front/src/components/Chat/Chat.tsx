import { useEffect, useRef, useState } from "react";
import * as S from "./Chat.style";
import ChatBody from "./components/ChatBody";
import ChatFooter from "./components/ChatFooter";
import ChatHeader from "./components/ChatHeader";
import SockJS from "sockjs-client/dist/sockjs";
import Stomp, { Client } from "stompjs";

export interface receiveMessageType {
  receive: ChatMessage[];
}

export interface ChatMessage {
  type: string;
  email: string;
  containerId: string;
  content: string;
  sender: string;
}

export interface User {
  email: string;
  name: string;
  image: string;
}

function Chat() {
  const [messageList, setMessagesList] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    if (clientRef.current === null) {
      const socket = new SockJS("http://localhost:8080/ws/chat");
      const client = Stomp.over(socket);

      client.connect({}, () => {
        console.log('Connected to WebSocket');
        joinRoom("1");
      });
      clientRef.current = client;
    }
  }, []);

  /**
   * 채팅방 입장시 호출
   * @param room 입장하는 채팅방 id
   */
  const joinRoom = (room: string) => {
    subscribeToContainer(room);
    enterRoom(room);
  };

  const enterRoom = (room: string) => {
    if (clientRef.current) {
      const chatMessage: ChatMessage = {
        type: "ENTER",
        email: "Test@gmail.com",
        containerId: room,
        sender: "Tester",
        content: ""
      };
      clientRef.current.send(`/pub/enter-room/${room}`, {}, JSON.stringify(chatMessage));
    }
  };

  const subscribeToContainer = (room: string) => {
    if (clientRef.current) {
      clientRef.current.subscribe(`/sub/room/${room}`, (message) => {
        console.log(`Received message from ${room}:`, message);
        const receivedMessage = JSON.parse(message.body);
        handleReceiveMessage(receivedMessage);
      });
    }
  };

  // 👋 - 메세지 수신 핸들러(메세지 받아오는 핸들러)
  // 1. 받아온 데이터인 messagesList를 props로 넘겨줘서 <ChatBody/>에 뿌려줘한다.
  const handleReceiveMessage = (message: ChatMessage) => {
    console.log("handleReceiveMessage: ", message);
    setMessagesList((prevMessages) => [
      ...prevMessages, message,
    ]);
  };

  // 👋 - 메세지 전송 핸들러
  // 1. handleSendMessage 해당 메세지, setNewMessage만 <ChatFooter /> 에 넘겨줘서 작성한 값 업데이트
  const handleSendMessage = () => {

    if (newMessage.trim() !== "") {
      // 채팅방 빠져나올때 leave , 채팅방 들어갔을때 Enter , 채팅칠때
      // WebSocket을 통해 메시지 전송
      const chatMessage: ChatMessage = {
        type: "TALK",
        email: "Test@gmail.com",
        containerId: "1",
        sender: "Tester",
        content: newMessage
      };
      if (clientRef.current !== null) {
        console.log("handleSendMessage: ", chatMessage);
        clientRef.current.send("/pub/send-message", {}, JSON.stringify(chatMessage));
      }

      setNewMessage(""); // 메시지를 출력하고 나면 상태를 초기화
    }
  };

  return (
    <S.ChatWrapper>
      <ChatHeader />
      <ChatBody
          messageList={messageList}
      />
      <ChatFooter
        handleSendMessage={handleSendMessage}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
      />
    </S.ChatWrapper>
  );
}

export default Chat;
