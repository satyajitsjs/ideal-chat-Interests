import React from "react";
import ChatArea from "../Components/Chat/ChatArea";
import Header from "../Components/Headers/Header";
import Sidebar from "../Components/Sidebar/Sidebar";

export default function Chat() {
  return (
    <>
      <Header />
      <div className="chat-container">
        <Sidebar/>
        <ChatArea />
      </div>
    </>
  );
}
