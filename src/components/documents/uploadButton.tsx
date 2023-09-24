import { useCallback, useState } from "react"
import { BsUpload } from "react-icons/bs"
import UploadModal from "../modals/uploadModal"

interface UploadButtonProps {
    modal?: boolean
    handleUpload?: () => void
}

const UploadButton: React.FC<UploadButtonProps> = ({ modal, handleUpload }) => {
    const [open, setOpen] = useState(false)
    //const modal = document.getElementById("modal") as HTMLElement;
    const toggleOpen = useCallback(() => {
        setOpen(!open)

    }, [open])

    const handleAdd = useCallback(() => {
        console.log("added")
    }, [open])

    return (
        <>
            {modal && <UploadModal isOpen={open} onClose={toggleOpen} />}
            <button className="h-8 bg-blue-400 hover:bg-blue-500 text-white font-bold py-1 px-4 rounded flex flex-row" onClick={modal ? toggleOpen : handleUpload}>
                {modal && <BsUpload className="self-center mr-2" />}
                <div className="self-center">
                    Upload
                </div>

            </button>
        </>
    )
}

export default UploadButton