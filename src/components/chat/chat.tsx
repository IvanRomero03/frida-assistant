import SearchBar from "../searchBar"
import Message from "./message"
import MessageContainer from "./messageContainter"


const Chat = () => {
    return (
        <div className="mb-20 flex flex-col h-screen pb-60">


            <MessageContainer />

            <div className="fixed w-10/12 bottom-10">
                <SearchBar />
            </div>



        </div>
    )
}

export default Chat