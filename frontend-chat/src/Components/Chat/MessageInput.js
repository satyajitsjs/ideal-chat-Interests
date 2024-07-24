import React, { useState } from "react";

export default function MessageInput() {
  const {inputValue ,setInputValue} = useState("");
  const handelInputValue=(e)=>{
    setInputValue(e.target.value)
  }
  const handeldSendMessage = () =>{
    console.log("Message send")
  }
  return (
    <div className="message-input">
      <textarea
        placeholder="Type your message here ....."
        value={inputValue}
        onChange={handelInputValue}
      />
      <button onClick={handeldSendMessage}>Send</button>
    </div>
  );
}
