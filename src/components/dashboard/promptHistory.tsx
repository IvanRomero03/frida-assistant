
import { useSession } from "next-auth/react";
import { api } from "rbrgs/utils/api";
import { AiOutlinePlus } from "react-icons/ai";
import { BsChatRight } from "react-icons/bs"

interface PromptHistoryProps {
    handleClick: any;
}

const PromptHistory: React.FC<PromptHistoryProps> = ({ handleClick }) => {
    const { data: userId } = useSession();
    const { data: chats } = api.chats.getAll.useQuery({
        id: userId?.user.id || ""
    });

    const { data: sessionData } = useSession();



    return (
        <div className="bg-white w-52 h-screen pt-20 py-4 px-6">
            
            <div className="h-full flex flex-col justify-between ">
                <div>

                    

                    <div className="text-gray-500">
                        Prompt History
                    </div>

                    <div className="my-5 text-gray-800 pr-1 overflow-hidden">
                        {chats?.map((prompt, key) => (
                            <button key={key} className="flex flex-row gap-4 my-2" onClick={() => handleClick(prompt.id, prompt.name)}>
                                <BsChatRight className="self-center" />
                                <div className="overflow-hidden whitespace-nowrap hover:text-gray-500">
                                    {prompt.name}
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