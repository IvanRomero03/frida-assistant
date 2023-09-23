import Modal from "./modal";

interface UploadModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose }) => {
    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose}>
                hi
            </Modal>
        </div>
    )
}

export default UploadModal;