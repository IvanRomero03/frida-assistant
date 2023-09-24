import formidable from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import * as gcs from "./gcs";
import { PassThrough } from "stream";

const uploadStream = (file: formidable.File) => {
    const pass = new PassThrough();

    const stream = gcs.createWriteStream(
        file.originalFilename ?? file.newFilename,
        file.mimetype ?? undefined
    );
    pass.pipe(stream);

    return pass;
};

export const uploadFile = async (req: NextApiRequest, res: NextApiResponse) => {

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const form = formidable({ fileWriteStreamHandler: uploadStream });

    form.parse(req, () => {
        res.status(200).json("File upload complete");
    });
};

export const downloadFile = async (req: NextApiRequest, res: NextApiResponse) => {
    const { filename } = req.query;

    if (typeof filename !== "string") {
        res.status(400).json("Invalid filename");
        return;
    }

    const contents = await gcs.downloadFile(filename);

    res.status(200).send(contents[0]);
}

