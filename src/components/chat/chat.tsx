import { api } from "rbrgs/utils/api";
import SearchBar from "../searchBar";
import Message from "./message";
import MessageContainer from "./messageContainter";

import { useState } from "react";

interface ChatProps {
  chatId: string;
  chatName: string;
}

const Chat: React.FC<ChatProps> = ({ chatId, chatName }) => {
  const [messages, setMessages] = useState<string[]>([
    "Hi! What do you want to learn now?",
  ]);
  const [input, setInput] = useState("");
  return (
    <div className="mb-20 flex h-screen flex-col pb-60">
      <MessageContainer
        chatId={chatId}
        chatName={chatName}
        messages={messages}
      />

      <div className="fixed bottom-10 w-10/12">
        <SearchBar
          chatId={chatId}
          input={input}
          setInput={setInput}
          setMessages={setMessages}
          messages={messages}
        />
      </div>
    </div>
  );
};

export default Chat;
