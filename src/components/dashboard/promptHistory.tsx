
import { useSession } from "next-auth/react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsChatRight } from "react-icons/bs"

interface PromptHistoryProps {
    handleClick: () => void;
}

const PromptHistory: React.FC<PromptHistoryProps> = ({ handleClick }) => {
    const prompts = ["Search for word in text", "IDK", "Count words"]
    const { data: sessionData } = useSession();


    return (
        <div className="bg-white w-52 h-screen py-4 px-6">
            <div className="h-full flex flex-col justify-between">
                <div>
                    <button className="flex p-2 ring-1 ring-gray-500 w-full rounded-sm mb-6" onClick={handleClick}>
                        <AiOutlinePlus className="self-center mr-2" />
                        <div>
                            New Chat
                        </div>
                    </button>
                    <div className="text-gray-500">
                        Prompt History
                    </div>

                    <div className="my-5 text-gray-800 pr-1 overflow-hidden">
                        {prompts.map((prompt, key) => (
                            <button key={key} className="flex flex-row gap-4 my-2" onClick={handleClick}>
                                <BsChatRight className="self-center" />
                                <div className="overflow-hidden whitespace-nowrap hover:text-gray-500">
                                    {prompt}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    {sessionData?.user.name || "User"}
                </div>

            </div>
        </div>
    )
}

export default PromptHistory