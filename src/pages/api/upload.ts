import type { NextApiRequest, NextApiResponse } from "next";
import { uploadFile } from "../../lib/utils";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        res.status(400).send(`Invalid method: ${req.method}`);
        return;
    }

    uploadFile(req, res);
}

export const config = {
    api: {
        bodyParser: false,
    },
};