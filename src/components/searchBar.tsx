import { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { AiOutlineSend } from "react-icons/ai";
import { api } from "rbrgs/utils/api";
import axios from "axios";

interface SearchBarProps {
  search?: boolean;
  chatId: string;
  setInput: (input: string) => void;
  input: string;
  setMessages?: (messages: string[]) => void;
  messages?: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({
  search,
  chatId,
  setInput,
  input,
  setMessages,
  messages = [],
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const { mutateAsync: newChat } = api.chats.createMessage.useMutation();

  const handleSearch = async () => {
    // const asd = newChat({
    //   text: input,
    //   chatId: chatId,
    // });
    // @ts-ignore
    setMessages([...messages, input]);
    const asd = await axios.post(
      "https://bd69-54-205-129-33.ngrok.io/api/chatbot",
      {
        query: input,
      },
    );
    setInput("");
    console.log(asd.data.response);
    // @ts-ignore
    setMessages([...messages, input, asd.data.response]);
  };

  useEffect(() => {
    console.log(input);
  }, [input]);

  useEffect(() => {
    const a = async () => {
      const asd = await axios.post(
        "https://bd69-54-205-129-33.ngrok.io/api/chatbot_reset",
      );
      console.log(asd.data.response);
    };
    a();
  }, []);

  return (
    <div className="pr-10">
      <div className="max-h-18 shadow-0 mt-4 flex w-full flex-row justify-between rounded-lg bg-white px-1">
        {search && (
          <button
            onClick={handleSearch}
            className="ml-2  rounded-md py-1 pr-1 font-light text-blue-500"
          >
            <IoSearch size={24} />
          </button>
        )}
        <input
          className="max-h-18 w-full rounded-full bg-white p-1 text-gray-800 focus:text-gray-900 focus:outline-none"
          type="text"
          id="search"
          placeholder="Search"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setShowMenu(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        {!search && (
          <button
            onClick={handleSearch}
            className="ml-2  rounded-md py-1 pr-1 font-light text-blue-500"
          >
            <AiOutlineSend size={24} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
