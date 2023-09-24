import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Chat from "rbrgs/components/chat/chat";
import MainButtons from "rbrgs/components/dashboard/mainButtons";
import PromptHistory from "rbrgs/components/dashboard/promptHistory";
import DocGrid from "rbrgs/components/documents/docGrid";
import Documents from "rbrgs/components/documents/documents";
import { api } from "rbrgs/utils/api";
import { useCallback, useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

const Dashboard: NextPage = () => {
  const [variant, setSelected] = useState("DOCS");
  const { mutateAsync: newChat } = api.chats.create.useMutation();
  const { data: userData } = useSession();
  const [chatId, setChatId] = useState<string>("");
  const [chatName, setChatName] = useState<string>("");

  const toggleVariant = useCallback(() => {
    setSelected(variant === "DOCS" ? "CHAT" : "DOCS");
  }, [variant]);

  const handleNewChat = async () => {
    const asd = await newChat({
      name: "New Chat",
      userId: userData?.user.id || "",
    });

    setChatId(asd.id);
    setChatName(asd.name);
    setSelected("CHAT");
  };

  const selectChat = (chatIdIn: string, chatName: string) => {
    setChatId(chatIdIn);
    setChatName(chatName);
    setSelected("CHAT");
  };

  return (
    <>
      <MainButtons variant={variant} onClick={handleNewChat} />
      <button
        className="fixed z-50 mb-6 ml-4 mt-4 flex w-36 rounded-sm p-2 ring-1 ring-gray-500 hover:bg-gray-200 "
        onClick={handleNewChat}
      >
        <AiOutlinePlus className="z-1 mr-2 self-center" />
        <div> New Chat </div>
      </button>

      <div className="flex h-screen w-full overflow-hidden bg-gray-100">
        <PromptHistory handleClick={selectChat} />

        <div className="mt-32 h-full w-full pl-10">
          {variant == "DOCS" ? (
            <Documents />
          ) : (
            <Chat chatId={chatId} chatName={chatName} />
          )}
        </div>
      </div>
    </>
  );
};
export default Dashboard;
