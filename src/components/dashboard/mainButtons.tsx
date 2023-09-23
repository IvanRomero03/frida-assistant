import { SlDocs } from 'react-icons/sl'
import Button from './Button'

const MainButtons = () => {
    return (
        <div className="fixed flex w-full ml-52 mt-5 gap-3">
            
            <Button label="My documents" icon = {SlDocs} />

            

            <div className='flex bg-white px-6 py-3 w-48'>
                <SlDocs />
                Chatbot

            </div>

        </div>
    )
}

export default MainButtons