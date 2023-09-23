import { useCallback, useState } from "react"
import { BsUpload } from "react-icons/bs"
import UploadModal from "../modals/uploadModal"

const UploadButton = () => {
    const [open, setOpen] = useState(false)
    //const modal = document.getElementById("modal") as HTMLElement;
    const toggleOpen = useCallback(() => {
        setOpen(!open)
     
    }, [open])

    const handleAdd = useCallback(() => {
        console.log("added")
    },[open])
    
    return (
        <>
        <UploadModal isOpen={open} onClose={toggleOpen}/>
        <button className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-1 px-4 rounded flex flex-row" onClick={toggleOpen}>
            <BsUpload className="self-center mr-2" />
            <div className="self-center">
                Upload
            </div>

           

        </button>
        </>
    )
}

export default UploadButton