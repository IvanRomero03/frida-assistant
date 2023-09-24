import { BsChatRight } from "react-icons/bs"

const PromptHistory = () => {
    const prompts = ["Search for word in text", "IDK", "Count words"]
    const handleClick = () => {

    }

    return (
        <div className="bg-white w-52 h-screen py-4 px-6">
            <div className="h-full flex flex-col justify-between">
                <div>
                    <div className="text-gray-500">
                        Prompt History
                    </div>

                    <div className="my-5 text-gray-800 pr-1 overflow-hidden">
                        {prompts.map((prompt, key) => (
                            <button key={key} className="flex flex-row gap-4 my-2" onClick={handleClick}>
                                <BsChatRight className="self-center" />
                                <div className="overflow-hidden whitespace-nowrap ">
                                    {prompt}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    User
                </div>

            </div>
        </div>
    )
}

export default PromptHistory