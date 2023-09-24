import { FieldValues, useForm } from "react-hook-form";
import Modal from "./modal";
import Input from "./input";
import { useCallback, useState, useRef } from "react";
import Button from "../dashboard/Button";
import { SlDocs } from "react-icons/sl";
import { BsChatRight } from "react-icons/bs";
import UploadButton from "../documents/uploadButton";
import { api } from "rbrgs/utils/api";
import { useSession } from "next-auth/react";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type variant = "LINK" | "PDF" | "TEXT";

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [option, setOption] = useState<variant>("LINK");
  const [filename, setFilename] = useState<string>("");
  const [inputText, setInputText] = useState<string>("");
  const { mutateAsync } = api.docs.create.useMutation();
  const { data: session } = useSession();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      link: "",
      text: "",
    },
  });

  handleSubmit((data) => {
    console.log(data);
  });

  const handleUpload = async () => {
    // upload to database using filename and appending gs://frida_file_bucket
    if (option == "PDF") {
      if (!inputRef.current?.files?.[0]) return;
      const file = inputRef.current?.files?.[0];

      inputRef.current.value = "";
      const formData = new FormData();
      formData.append("file", file);

      // upload to database using filename and appending gs://frida_file_bucket

      const res = await fetch("../../api/upload", {
        method: "POST",
        body: formData,
      });

      res.json().then((data) => {
        if (data.success) {
          mutateAsync({
            name: filename,
            text: "",
            userId: session?.user?.id!,
            link: `https://storage.googleapis.com/${process.env.GCS_BUCKET}/${filename}`,
          });
        }
      });
    } else if (option == "LINK") {
      mutateAsync({
        name: filename,
        text: "",
        userId: session?.user?.id!,
        link: filename,
      });
    } else if (option == "TEXT" && inputText != "") {
      mutateAsync({
        name: inputText.split(" ")[0]!,
        text: inputText, 
        userId: session?.user?.id!,
        link: "",
      });
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="mb-10 mt-5 flex w-full  flex-col justify-center gap-3">
          <div className="mx-auto flex rounded-md bg-white p-1 shadow-lg">
            <Button
              label="Link"
              icon={SlDocs}
              onClick={() => setOption("LINK")}
              selected={option == "LINK"}
            />
            <Button
              label="PDF"
              icon={BsChatRight}
              onClick={() => setOption("PDF")}
              selected={option == "PDF"}
            />
            <Button
              label="Text"
              icon={BsChatRight}
              onClick={() => setOption("TEXT")}
              selected={option == "TEXT"}
            />
          </div>
        </div>

        <div className="flex w-full gap-4 pr-5">
          <div className="w-full pl-10">
            {option == "LINK" && (
              <Input
                label="Link"
                id="link"
                required
                register={register}
                errors={errors}
              />
            )}

            {option == "PDF" && (
              <div className="flex flex-row items-center gap-4">
                <label
                  for="file_upload"
                  className="flex h-8 w-fit flex-row rounded bg-gray-400 px-4 py-1 font-bold text-white hover:bg-gray-500"
                >
                  Select File
                </label>
                <input
                  id="file_upload"
                  className="hidden"
                  type="file"
                  ref={inputRef}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setFilename(file.name);
                  }}
                />
                <p className="font-serif">{filename}</p>
              </div>
            )}

            {option == "TEXT" && (
              <input
                className="bg-quaternary h-36 w-5/6 w-full rounded-lg bg-white p-1 pr-10 align-text-top outline-blue-400  ring-1 focus:outline-none"
                id="text"
                onChange={(e) => {
                  const text = e.target.value;
                  if (!text) return;
                  setInputText(text);
                }}
              />
            )}
          </div>

          <button
            className="flex h-8 flex-row rounded bg-blue-400 px-4 py-1 font-bold text-white hover:bg-blue-500"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default UploadModal;
