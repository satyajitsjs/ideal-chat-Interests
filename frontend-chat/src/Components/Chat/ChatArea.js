import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import MessageInput from './MessageInput';
import Message from './Message';

const ChatArea = ({ friendId, friendUsername }) => {
  const [messages, setMessages] = useState([]);
  const userId = JSON.parse(localStorage.getItem('user')).id;
  const socket = useRef(null);

  const fetchChatMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/chat-messages/${friendId}/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching chat messages:', error);
    }
  };

  const isMessageSentByCurrentUser = (senderId) => {
    return senderId === userId ? 'sent' : 'received';
  };

  const handleSendMessage = (message) => {
    if (socket.current) {
      socket.current.send(JSON.stringify({
        message: message,
        sender: userId,
        recipient: friendId
      }));
    }
  };

  useEffect(() => {
    fetchChatMessages();

    socket.current = new WebSocket(`ws://localhost:8000/ws/chat/${friendId}/`);

    socket.current.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    socket.current.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      if (socket.current) {
        socket.current.close();
      }
    };
  }, [friendId]);

  return (
    <div className="chat-area">
      <div className="chat-header">Chat with {friendUsername}</div>
      <div className="messages">
        {messages.map((message) => (
          <Message
            key={message.id}
            text={message.message}
            sent={isMessageSentByCurrentUser(message.sender)}
          />
        ))}
      </div>
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatArea;
