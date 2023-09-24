import { NextPage } from "next"
import Chat from "rbrgs/components/chat/chat";
import MainButtons from "rbrgs/components/dashboard/mainButtons"
import PromptHistory from "rbrgs/components/dashboard/promptHistory"
import DocGrid from "rbrgs/components/documents/docGrid";
import Documents from "rbrgs/components/documents/documents";
import { useCallback, useState } from "react";


const Dashboard: NextPage = () => {
    const [variant, setSelected] = useState("DOCS");

    const toggleVariant = useCallback(() => {
        setSelected(variant === 'DOCS' ? 'CHAT' : 'DOCS')
    }, [variant])

    return (
        <>
            <MainButtons variant={variant} onClick={toggleVariant} />

            <div className="bg-gray-100 h-screen w-full flex overflow-hidden">
                <PromptHistory />

                <div className="h-full pl-10 mt-32 w-full">
                    {variant == 'DOCS' ? <Documents /> : <Chat />}
                </div>

            </div>
        </>
    )
}
export default Dashboard