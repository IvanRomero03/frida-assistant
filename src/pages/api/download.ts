import type { NextApiRequest, NextApiResponse } from "next";
import { downloadFile } from "../../lib/utils";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        res.status(400).send(`Invalid method: ${req.method}`);
        return;
    }

    downloadFile(req, res);
}

export const config = {
    api: {
        bodyParser: false,
    },
};