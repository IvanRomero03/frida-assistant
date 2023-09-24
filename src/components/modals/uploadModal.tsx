import { FieldValues, useForm } from "react-hook-form";
import Modal from "./modal";
import Input from "./input";
import { useCallback, useState } from "react";
import Button from "../dashboard/Button";
import { SlDocs } from "react-icons/sl";
import { BsChatRight } from "react-icons/bs";
import UploadButton from "../documents/uploadButton";

interface UploadModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type variant = "LINK" | "PDF" | "TEXT"

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose }) => {
    const [option, setOption] = useState<variant>("LINK");


    const { handleSubmit, register, setValue, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            link: '', text: ''
        }
    })

    handleSubmit((data) => {
        console.log(data)
    })

    const handleUpload = () => {
        console.log("upload")
    }

    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose}>

                <div className="w-full flex flex-col justify-center  mt-5 gap-3 mb-10">
                    <div className='flex mx-auto bg-white p-1 rounded-md shadow-lg'>
                        <Button label="Link" icon={SlDocs} onClick={() => setOption("LINK")} selected={option == "LINK"} />
                        <Button label="PDF" icon={BsChatRight} onClick={() => setOption("PDF")} selected={option == "PDF"} />
                        <Button label="Text" icon={BsChatRight} onClick={() => setOption("TEXT")} selected={option == "TEXT"} />
                    </div>

                </div>

                <div className="flex w-full pr-5">
                    <div className="pl-10 w-full">
                        {option == "LINK" && (
                            <Input label="Link" id="link" required register={register} errors={errors} />
                        )}

                        {option == "PDF" && (
                            <div>
                                upload file
                            </div>
                        )}

                        {option == "TEXT" && (
                            <Input textArea label="Text" id="text" required register={register} errors={errors} />
                        )}
                    </div>

                    <UploadButton handleUpload={handleUpload} />
                </div>
            </Modal>
        </div>
    )
}

export default UploadModal;