import React from "react";

export default function Message({ text, sent }) {
  return (
    <div className={`message ${sent ? "sent" : "recived"}`}>
      <div className="message-bubble" >{text}</div>
    </div>
  );
}
