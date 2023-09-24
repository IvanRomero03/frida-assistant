import { BsChatRight } from "react-icons/bs"

const PromptHistory = () => {
    const prompts = ["Search for word", "IDK", "Count words"]

    return (
        <div className="bg-white w-52 h-screen py-4 px-6">
            <div className="h-full flex flex-col justify-between">
                <div>
                    <div className="text-gray-500">
                        Prompt History
                    </div>

                    <div className="my-5 text-gray-800">
                        {prompts.map((prompt, key) => (
                            <button className="flex flex-row gap-4 my-2">
                                <BsChatRight className="self-center" />
                                <div className="overflow-scroll">

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