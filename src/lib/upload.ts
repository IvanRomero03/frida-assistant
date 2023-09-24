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

export const method3 = async (req: NextApiRequest, res: NextApiResponse) => {

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const form = formidable({ fileWriteStreamHandler: uploadStream });

    form.parse(req, () => {
        res.status(200).json("File upload complete");
    });
};
