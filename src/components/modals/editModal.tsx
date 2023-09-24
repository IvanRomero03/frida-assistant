import { api } from "rbrgs/utils/api";
import Modal from "./modal"
import { useState } from "react";

interface EditModalProps {
    isOpen: boolean;
    onClose: () => void;
    onEdit?: () => void;
    chatId: string;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, onEdit, chatId }) => {
    const { mutateAsync: updateChat } = api.chats.update.useMutation();
    const [newName, setNewName] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const editName = async () => {
        setIsLoading(true);
        const asd = await updateChat({
            id: chatId, name: newName
        });

        setNewName("");
        setIsLoading(false);
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="mb-2">
                New Chat name
            </div>
            <div className="flex gap-2">
                <input readOnly={isLoading} type="text" className="bg-white ring-1 w-5/6 pr-10 outline-blue-400 inset-1 rounded-lg bg-quaternary p-1 focus:outline-none " onChange={(e) => {
                    setNewName(e.target.value)
                }} />
                <button onClick={editName} className="h-8 bg-blue-400 hover:bg-blue-500 text-white font-bold py-1 px-4 rounded flex flex-row">
                    Save
                </button>
            </div>
        </Modal>
    )
}

export default EditModal