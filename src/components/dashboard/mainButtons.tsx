import { SlDocs } from 'react-icons/sl'
import Button from './Button'
import { BsChatRight } from 'react-icons/bs'
import { useCallback, useState } from 'react'


interface buttonProps {
    variant: string;
    onClick: () => void;
}

const MainButtons: React.FC<buttonProps> = ({ variant, onClick }) => {


    return (
        <div className="fixed w-full flex flex-col justify-center z-50 py-2 pl-52 mt-5 gap-3">
            <div className='flex mx-auto bg-white p-1 rounded-md shadow-md'>
                <Button label="My documents" icon={SlDocs} selected={variant == "DOCS"} onClick={onClick} />
                <Button label="Chat Bot" icon={BsChatRight} selected={variant == "CHAT"} onClick={onClick} />

            </div>

        </div>
    )
}

export default MainButtons