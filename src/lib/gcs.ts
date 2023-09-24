import { Storage } from "@google-cloud/storage";

const storage = new Storage({
    keyFilename: "GSC_KEYS.json",
});

const bucket = storage.bucket(process.env.GCS_BUCKET as string);

const destFileName = '';

export const createWriteStream = (filename: string, contentType?: string) => {
    const ref = bucket.file(filename);

    const stream = ref.createWriteStream({
        gzip: true,
        contentType: contentType,
    });

    return stream;
};

export const downloadFile = async (filename: string) => {
    const options = {
        destination:destFileName ,
      };
    // Downloads the file into a buffer in memory.
    const contents = await storage.bucket(process.env.GCS_BUCKET as string).file(filename).download(options);
  
      
    console.log(
        `gs://${process.env.GCS_BUCKET as string}/${filename} downloaded to ${destFileName}.`
      );

    return contents;
  };
  