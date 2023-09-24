import { useEffect, useRef, useState } from "react";
import Message from "./message"
import { api } from "rbrgs/utils/api";
import { FiEdit } from "react-icons/fi";
import EditModal from "../modals/editModal";

interface MessageProps {
    chatId: string;
    chatName: string;
}
const MessageContainer: React.FC<MessageProps> = ({ chatId, chatName }) => {
    const { data: messages } = api.chats.getChatMessages.useQuery({
        id: chatId || ""
    });


    const [open, setOpen] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef?.current?.scrollIntoView();

    }, []);

    const editName = () => {

    }

    return (
        <>
            <EditModal isOpen={open} onClose={() => setOpen(false)} onEdit={editName} chatId={chatId}/>
            <div className="h-full pr-32 pl-10 pb-10 bg-gray-100 overflow-y-auto">
                <div className="font-bold text-gray-900">
                    {messages ? chatName : 'Chat'}
                    <button className="ml-2" onClick={() => setOpen(true)}>
                        <FiEdit />
                    </button>
                </div>

                <div className="text-gray-500 pb-1">
                    Chat bot for queries. Find, summarize, anilize information and more.
                </div>

                <div className="h-full mb-10 flex-col pb-10">
                    {messages?.map((message, key) => (
                        <Message message={message.text} key={key} date={message.createdAt} sentByGTP={message.fromGPT} />
                    ))}
                </div>


            </div>
        </>
    )
}

export default MessageContainer