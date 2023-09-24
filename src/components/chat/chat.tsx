import SearchBar from "../searchBar"


const Chat = () => {
    return (
        <div>
            <div className="font-bold text-gray-900">
                Chat
            </div>
            <div className="text-gray-500">
                Chat bot for queries. Find, summarize, anilize information and more.
            </div>
            <div className="fixed w-10/12  bottom-10">
                <SearchBar />
            </div>
        </div>
    )
}

export default Chat