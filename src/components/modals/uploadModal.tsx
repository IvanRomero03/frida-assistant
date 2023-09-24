import Modal from "./modal";
import { useState, useRef } from "react";
import Button from "../dashboard/Button";
import { SlDocs } from "react-icons/sl";
import { BsChatRight } from "react-icons/bs";
import { Formik, Form, Field } from "formik";
import { api } from "rbrgs/utils/api";
import { useSession } from "next-auth/react";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type variant = "LINK" | "PDF" | "TEXT";

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose }) => {

   
   
   
  

   

  const [option, setOption] = useState<variant>("LINK");
  const { mutateAsync: createDocument } = api.docs.create.useMutation({});
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [filename, setFilename] = useState<string>("");
  const {data:session} = useSession();
    
  const handleUpload = async ({link, text}: {link: string | undefined, text: string | undefined}) => {
    // upload to database using filename and appending gs://frida_file_bucket
    console.log(option, filename, link, text, inputRef.current?.files?.[0]);
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

      void res.json().then((data) => {
        if (data.success) {
          createDocument({
            name: filename,
            text: "",
            userId: session?.user?.id!,
            link: `https://storage.googleapis.com/${process.env.GCS_BUCKET}/${filename}`,
          });

        }
      });
    } else if (option == "LINK") {
      createDocument({
        name: "test",
        text: "",
        userId: session?.user?.id!,
        link: link,
      });
    } else if (option == "TEXT" && text != "") {
      createDocument({
        name: "test",
        text: text!, 
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

        <div className="flex w-full pr-5">
          <Formik
            initialValues={{ link: "", text: "", file: ""}}
            onSubmit={async (values, actions) => {
              console.log(values);
              actions.setSubmitting(true);
              handleUpload({link: values.link, text: values.text });
              // await createDocument({ ...values, name: "test" });
              // wait 500ms before submitting
              actions.setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="flex w-full ">
                <>
                  <div className="w-full pl-10">
                    {option == "LINK" && (
                      <>
                        <label className="mr-3 mt-6 font-semibold">
                          {"Link"}
                        </label>
                        <Field
                          name="link"
                          type="text"
                          className="bg-quaternary inset-1 w-5/6 rounded-lg bg-white p-1 pr-10 outline-blue-400 ring-1 focus:outline-none "
                        />
                      </>
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
                          name="file"
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
                      <div>
                        <label className="mr-3 mt-6 font-semibold">Text</label>
                        <Field
                          name="text"
                          component="textarea"
                          type="textarea"
                          className="bg-quaternary m-8 h-36 w-full rounded-lg bg-white p-1 pr-10 align-text-top  outline-blue-400 ring-1 focus:outline-none"
                        />
                      </div>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="flex h-8 flex-row rounded bg-blue-400 px-4 py-1 font-bold text-white hover:bg-blue-500"
                    disabled={isSubmitting}
                  >
                    <div className="self-center">Upload</div>
                  </button>
                </>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </div>
  );
};

export default UploadModal;
                                    