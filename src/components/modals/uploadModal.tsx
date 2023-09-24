import { FieldValues, useForm } from "react-hook-form";
import Modal from "./modal";
import Input from "./input";
import { useCallback, useState, useRef } from "react";
import Button from "../dashboard/Button";
import { SlDocs } from "react-icons/sl";
import { BsChatRight } from "react-icons/bs";
import UploadButton from "../documents/uploadButton";
import { api } from "rbrgs/utils/api";

interface UploadModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type variant = "LINK" | "PDF" | "TEXT"

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose }) => {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [option, setOption] = useState<variant>("LINK");
    const [filename, setFilename] = useState<string>("");
    const {mutateAsync} = api.docs.create.useQuery();

    const { handleSubmit, register, setValue, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            link: '', text: ''
        }
    })

    handleSubmit((data) => {
        console.log(data)
    })

    const handleUpload = async () => {
        // upload to database using filename and appending gs://frida_file_bucket
        if (!inputRef.current?.files?.[0]) return;
        const file = inputRef.current?.files?.[0];
        
        inputRef.current.value = "";
        const formData = new FormData();
        formData.append("file", file);

        // upload to database using filename and appending gs://frida_file_bucket

        const res =  await fetch("../../api/upload", {
            method: "POST",
            body: formData,
        });

        res.json().then((data) => {
            if (data.success){
                
            }
        });
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
                            <div className="flex flex-row gap-4 items-center">
                                <label for="file_upload" className="h-8 bg-gray-400 hover:bg-gray-500 text-white font-bold py-1 px-4 rounded flex flex-row w-fit" >
                                    Select File
                                </label>
                                <input  
                                    id="file_upload"
                                    className="hidden"
                                    type="file"
                                    ref = {inputRef}
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;
                                        setFilename(file.name);}
                                    }
                                />
                                <p className="font-serif">
                                    {filename}
                                </p>
                            </div>
                        )}

                        {option == "TEXT" && (
                            <Input textArea label="Text" id="text" required register={register} errors={errors} />
                        )}
                    </div>

                    <button className="h-8 bg-blue-400 hover:bg-blue-500 text-white font-bold py-1 px-4 rounded flex flex-row" onClick={handleUpload}>
                        Upload
                    </button>

                </div>
            </Modal>
        </div>
    )
}

export default UploadModal;