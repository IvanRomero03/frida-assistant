import { SlDocs } from 'react-icons/sl'
import Button from './Button'
import { BsChatRight } from 'react-icons/bs'

const MainButtons = () => {
    return (
        <div className="fixed flex w-full ml-52 mt-5 gap-3">

            <Button label="My documents" icon={SlDocs} />
            <Button label="Chat Bot" icon={BsChatRight} />

        </div>
    )
}

export default MainButtons