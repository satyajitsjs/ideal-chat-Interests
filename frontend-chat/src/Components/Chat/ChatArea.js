import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import MessageInput from "./MessageInput";
import Message from "./Message";
import ApiURL from "../BaseURL/ApiURL";
import WsURL from "../BaseURL/WsURL";

const ChatArea = ({ roomName, friendId, friendUsername }) => {
  const [messages, setMessages] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const senderUsername = user.username;
  const senderUserid = user.id;
  const socket = useRef(null);
  const APIURL = ApiURL();
  const WSURL = WsURL();

  const fetchChatMessages = async () => {
    try {
      const response = await axios.get(
        `${APIURL}chat-messages/${encodeURIComponent(roomName)}/`,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data)
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
    }
  };

  const isMessageSentByCurrentUser = (sender) => {
    return (sender === senderUsername || sender === senderUserid) ? "sent" : "received";
  };

  const handleSendMessage = (message) => {
    console.log("Sending message:", message);
    console.log("Sender:", senderUsername);
    console.log("Recipient:", friendUsername);

    if (socket.current) {
      socket.current.send(
        JSON.stringify({
          message: message,
          sender: senderUsername,  // Check this value
          recipient: friendUsername // Check this value
        })
      );
    }
  };


  useEffect(() => {
    const pathname = window.location.pathname;
    if (pathname.includes("*")) {
      return;
    }
    fetchChatMessages();
    socket.current = new WebSocket(`${WSURL}chat/${encodeURIComponent(roomName)}/`);

    socket.current.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    socket.current.onclose = () => {
      console.log("WebSocket disconnected");
    };

    socket.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      if (socket.current) {
        socket.current.close();
      }
    };
  }, [roomName]);

  return (
    <div className="chat-area">
      <div className="chat-header">Chat with {friendUsername}</div>
      <div className="messages">
        {messages.map((message, index) => (
          <Message
            key={index}
            text={message.message}
            sent={isMessageSentByCurrentUser(message.sender)}
          />
        ))}
      </div>
      <MessageInput
        onSendMessage={handleSendMessage}
        senderUsername={senderUsername}
        friendUsername={friendUsername}
      />
    </div>
  );
};

export default ChatArea;
