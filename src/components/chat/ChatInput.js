import React, { useState } from "react";

const ChatInput = ({ onSendMessage }) => {
  const [inputText, setInputText] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputText.trim() !== "") {
      onSendMessage(inputText);
      setInputText("");
    }
  };

  return (
    <form className="chat-input" onSubmit={handleSendMessage}>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button type="submit">SEND</button>
    </form>
  );
};
export default ChatInput;
