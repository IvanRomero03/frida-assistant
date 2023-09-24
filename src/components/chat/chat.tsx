import { api } from "rbrgs/utils/api";
import SearchBar from "../searchBar"
import Message from "./message"
import MessageContainer from "./messageContainter"

interface ChatProps {
    chatId: string;
    chatName: string;
}

const Chat: React.FC<ChatProps> = ({ chatId, chatName }) => {


    return (
        <div className="mb-20 flex flex-col h-screen pb-60">


            <MessageContainer chatId={chatId} chatName={chatName} />

            <div className="fixed w-10/12 bottom-10">
                <SearchBar chatId={chatId}/>
            </div>



        </div>
    )
}

export default Chat