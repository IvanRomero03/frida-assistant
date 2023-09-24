import { useEffect, useRef, useState } from "react";
import Message from "./message";
import { api } from "rbrgs/utils/api";
import { FiEdit } from "react-icons/fi";
import EditModal from "../modals/editModal";

interface MessageProps {
  chatId: string;
  chatName: string;
  messages: string[];
}
const MessageContainer: React.FC<MessageProps> = ({
  chatId,
  chatName,
  messages,
}) => {
  //   const { data: messages } = api.chats.getChatMessages.useQuery({
  //     id: chatId || "",
  //   });

  const [open, setOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef?.current?.scrollIntoView();
  }, []);

  const editName = () => {};

  return (
    <>
      <EditModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onEdit={editName}
        chatId={chatId}
      />
      <div className="h-full overflow-y-auto bg-gray-100 pb-10 pl-10 pr-32">
        <div className="font-bold text-gray-900">
          {messages ? chatName : "Chat"}
          <button className="ml-2" onClick={() => setOpen(true)}>
            <FiEdit />
          </button>
        </div>

        <div className="pb-1 text-gray-500">
          Chat bot for queries. Find, summarize, anilize information and more.
        </div>

        <div className="mb-10 h-full flex-col pb-10">
          {messages?.map((message, key) => (
            <Message message={message} key={key} sentByGTP={key % 2 == 0} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MessageContainer;
