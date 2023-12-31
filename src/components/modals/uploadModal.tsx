import Modal from "./modal";
import { useState, useRef } from "react";
import Button from "../dashboard/Button";
import { SlDocs } from "react-icons/sl";
import { BsChatRight } from "react-icons/bs";
import { Formik, Form, Field } from "formik";
import { api } from "rbrgs/utils/api";
import { useSession } from "next-auth/react";
import axios from "axios";

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
  const { data: session } = useSession();

  const handleUpload = async ({
    link,
    text,
  }: {
    link: string | undefined;
    text: string | undefined;
  }) => {
    // upload to database using filename and appending gs://frida_file_bucket
    if (option == "PDF") {
      if (!inputRef.current?.files?.[0]) return;
      const file = inputRef.current?.files?.[0];
      console.log("Uploading file");
      inputRef.current.value = "";
      const formData = new FormData();
      formData.append("file", file);

      // upload to database using filename and appending gs://frida_file_bucket

      const res = await fetch("../../api/upload", {
        method: "POST",
        body: formData,
      });

      console.log(res);

      void res.json().then(async (data) => {
        if (data.success) {
          console.log("Scrappign");

          const gcs_pdf_path = `https://storage.googleapis.com/frida_file_bucket/${filename}`;
          const res = await axios
            .post("https://bd69-54-205-129-33.ngrok.io/api/pdf_scrapper", {
              gcs_pdf_path,
            })
            .then((res) => {
              console.log(res.data);
              createDocument({
                name: filename,
                text: res.data.text,
                userId: session?.user?.id!,
                link: gcs_pdf_path,
                keywords: [],
                relevant_sentences: [],
              });
            });
        }
      });
    } else if (option == "LINK") {
      const url = link;
      const res = await axios
        .post("https://bd69-54-205-129-33.ngrok.io/api/web_scrapper", {
          url,
        })
        .then((res) => {
          console.log(res.data);
          createDocument({
            name: link!,
            text: res.data.text,
            userId: session?.user?.id!,
            link: link,
            keywords: [],
            relevant_sentences: [],
          });
        });
    } else if (option == "TEXT" && text != "") {
      const res = await axios.post(
        "https://bd69-54-205-129-33.ngrok.io/api/analyze",
        {
          text,
        },
      );

      await createDocument({
        name: "Input text",
        text: text!,
        userId: session?.user?.id!,
        link: "",
        summary: res.data.summary,
        keywords: res.data.keywords,
        main_emb: res.data.main_emb,
        relevant_sentences: res.data.relevant_sentences,
        ids: res.data.ids,
      });
      console.log(res.data);
    }

    setFilename("");
    setOption("LINK");
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
            initialValues={{ link: "", text: "", file: "" }}
            onSubmit={async (values, actions) => {
              console.log(values);
              actions.setSubmitting(true);
              handleUpload({ link: values.link, text: values.text });
              // await createDocument({ ...values, name: "test" });
              // wait 500ms before submitting
              actions.setSubmitting(false);
              values.link = "";
              values.text = "";
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
                          htmlFor="file_upload"
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
