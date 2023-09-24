import { useCallback, useState } from "react";
import { BsUpload } from "react-icons/bs";
import UploadModal from "../modals/uploadModal";

interface UploadButtonProps {
  modal?: boolean;
  handleUpload?: () => void;
  disabled?: boolean;
}

const UploadButton: React.FC<UploadButtonProps> = ({
  modal,
  handleUpload = () => {},
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);
  //const modal = document.getElementById("modal") as HTMLElement;
  const toggleOpen = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const handleAdd = useCallback(() => {
    console.log("added");
  }, [open]);

  return (
    <>
      {modal && <UploadModal isOpen={open} onClose={toggleOpen} />}
      <button
        type="submit"
        className="flex h-8 flex-row rounded bg-blue-400 px-4 py-1 font-bold text-white hover:bg-blue-500"
        onClick={modal ? toggleOpen : handleUpload}
        disabled={disabled}
      >
        {modal && <BsUpload className="mr-2 self-center" />}
        <div className="self-center">Upload</div>
      </button>
    </>
  );
};

export default UploadButton;
