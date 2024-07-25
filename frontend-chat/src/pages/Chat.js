import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import ChatArea from "../Components/Chat/ChatArea";
import Header from "../Components/Headers/Header";
import Sidebar from "../Components/Sidebar/Sidebar";

const Chat = () => {
  const { friendId, username } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;

  const [selectedFriendId, setSelectedFriendId] = useState(friendId);
  const [selectedUsername, setSelectedUsername] = useState(username);

  useEffect(() => {
    setSelectedFriendId(friendId);
    setSelectedUsername(username);
  }, [friendId, username]);

  const handleSelectFriend = (friendId, username) => {
    setSelectedFriendId(friendId);
    setSelectedUsername(username);
  };

  const generateRoomName = (userId1, userId2) => {
    return [userId1, userId2].sort().join("-");
  };

  const roomName = generateRoomName(userId, selectedFriendId);

  return (
    <>
      <Header />
      <div className="chat-container">
        <Sidebar onSelectFriend={handleSelectFriend} />
        {selectedFriendId && (
          <ChatArea roomName={roomName} friendUsername={selectedUsername} />
        )}
      </div>
    </>
  );
};

export default Chat;