import { NextPage } from "next"
import MainButtons from "rbrgs/components/dashboard/mainButtons"
import PromptHistory from "rbrgs/components/dashboard/promptHistory"

const Dashboard: NextPage = () => {
    return (
        <>
            <div className="bg-gray-100 h-screen flex">
                <PromptHistory />
                <MainButtons />
            </div>
        </>
    )
}
export default Dashboard