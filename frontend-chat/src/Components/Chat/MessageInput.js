import React, { useState } from "react";

const MessageInput = ({ socket, senderUsername, friendUsername, onSendMessage }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="message-input">
      <textarea
        placeholder={`Type your message here, ${senderUsername}...`}
        value={inputValue}
        onChange={handleInputChange}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default MessageInput;