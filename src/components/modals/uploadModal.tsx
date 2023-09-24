import { FieldValues, useForm } from "react-hook-form";
import Modal from "./modal";
import Input from "./input";
import { useCallback, useState } from "react";
import Button from "../dashboard/Button";
import { SlDocs } from "react-icons/sl";
import { BsChatRight } from "react-icons/bs";
import UploadButton from "../documents/uploadButton";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { api } from "rbrgs/utils/api";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type variant = "LINK" | "PDF" | "TEXT";

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose }) => {
  const [option, setOption] = useState<variant>("LINK");
  const { mutateAsync: createDocument } = api.docs.create.useMutation({});
  const handleUpload = () => {
    console.log("upload");
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
            initialValues={{ link: "", text: "" }}
            onSubmit={async (values, actions) => {
              console.log(values);
              actions.setSubmitting(true);
              await createDocument({ ...values, name: "test" });
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

                    {option == "PDF" && <div>upload file</div>}

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
